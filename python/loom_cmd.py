
import sys
import os
import argparse
import logging
from loom_cache import LoomCache
from loom_pipeline import LoomPipeline
import requests
from urlparse import urlparse
from progressbar import FileTransferSpeed, Percentage, Bar, ETA, ProgressBar
import loom_server
import loompy
import StringIO
import pandas as pd
import numpy as np

class VerboseArgParser(argparse.ArgumentParser):
	def error(self, message):
		self.print_help()
		sys.stderr.write('\nerror: %s\n' % message)
		sys.exit(2)

def connect_loom(dataset_path, filename):
	logging.debug("Looking for " + filename)
	if os.path.exists(filename):
		return loompy.connect(filename)
	logging.debug("Looking for " + os.path.join(dataset_path, filename))
	if os.path.exists(os.path.join(dataset_path, filename)):
		return loompy.connect(os.path.join(dataset_path, filename))
	return None

def tile_command(dataset_path, filename):
	ds = connect_loom(dataset_path, filename)
	if ds == None:
		logging.error("File not found")
		sys.exit(1)
	logging.info("Precomputing heatmap tiles")
	ds.prepare_heatmap()

def stats_command(dataset_path, filename):
	ds = connect_loom(dataset_path, filename)
	if ds == None:
		logging.error("File not found")
		sys.exit(1)
	logging.info("Computing statistics")
	ds.compute_stats()

def project_command(dataset_path, filename, perplexity):
	ds = connect_loom(dataset_path, filename)
	if ds == None:
		logging.error("File not found")
		sys.exit(1)
	logging.info("Projecting to 2D")
	ds.project_to_2d(axis=2, perplexity=perplexity)

def backspin_command(dataset_path, filename, n_genes):
	ds = connect_loom(dataset_path, filename)
	if ds == None:
		logging.error("File not found")
		sys.exit(1)
	ds.cluster(n_genes)

def list_command(dataset_path, server, username, password):
	cache = LoomCache(dataset_path)
	datasets = {}
	for ds in cache.list_datasets(username, password):
		if not datasets.has_key(ds["project"]):
			datasets[ds["project"]] = [ds["filename"]]
		else:
			datasets[ds["project"]].append(ds["filename"])
	for p in datasets.keys():
		print p + ":"
		for f in datasets[p]:
			print "   " + f

def clone_command(dataset_path, project, url, username, password):
	url_parts = urlparse(url)
	if project == None and len(url_parts.path.split("/")) < 3:
		logging.error("Project name was not given and URL did not include a project name")
		sys.exit(1)
	if project == None:
		temp = url_parts.path.split("/")
		if len(temp) != 4 or temp[1] != "clone":
			logging.error("Could not infer project name from URL (try with --project flag)")
			sys.exit(1)
		(_, _, project, fname) = temp
		project = project + "@" + url_parts.netloc.split(":")[0]
	else:
		fname = url_parts.path.split("/")[-1]
	if not fname.endswith(".loom"):
		logging.error("Not a valid .loom filename: " + fname)
		sys.exit(1)
	projdir = os.path.join(dataset_path, project)
	if not os.path.exists(projdir):
		os.mkdir(projdir)
	fpath = os.path.join(projdir, fname)

	logging.debug("Cloning from " + url)
	logging.debug("Cloning to " + fpath)
	try:
		response = requests.get(url, stream=True, auth=(username, password))
	
		if not response.ok:
			if response.status_code == 404:
				logging.warn("File not found")
				sys.exit(1)
			else:
				logging.error("Server error: " + str(response.status_code))
				sys.exit(1)
		total_bytes = int(response.headers.get('content-length'))

		widgets = [fname, ": ", Percentage(), ' ', Bar(), ' ', ETA(), ' ', FileTransferSpeed()]
		pbar = ProgressBar(widgets=widgets, maxval=total_bytes).start()
		i = 1024
		with open(fpath, 'wb') as f:
			for block in response.iter_content(1024):
				pbar.update(min(i, total_bytes))
				i += 1024			
				f.write(block)
		pbar.finish()

	except requests.ConnectionError:
		logging.error("Connection with the server could not be established")
		sys.exit(1)
	except requests.Timeout:
		logging.error("Connection timed out")
		sys.exit(1)
	except requests.TooManyRedirects:
		logging.error("Too many redirects")
		sys.exit(1)

def fromcef_command(dataset_path, infile, outfile, project):
	if project != None:
		outfile = os.path.join(dataset_path, project, outfile)
	logging.info("Converting %s to %s" % (infile, outfile))
	loompy.create_from_cef(infile, outfile)

def fromcellranger_command(dataset_path, infolder, outfile, project):
	if project != None:
		outfile = os.path.join(dataset_path, project, outfile)
	logging.info("Converting %s to %s" % (infolder, outfile))
	loompy.create_from_cellranger(infile, outfile)

def csv_to_dict(s):
	stringFile = StringIO.StringIO(s)
	data = pd.DataFrame.from_csv(stringFile, sep=",", parse_dates=False, index_col=None)
	dataDict = data.to_dict(orient="list")
	return {key: np.array(dataDict[key]) for key in dataDict}
 
def fromsql_command(dataset_path, outfile, project, row_attrs, col_attrs, sql, txid):
	if project != None:
		outfile = os.path.join(dataset_path, project, outfile)
	logging.info("Creating " + outfile + " from SQL")

	with open(row_csv, 'r') as rf:
		row_attrs = csv_to_dict(rf.read())
	
	with open(col_csv, 'r') as cf:
		col_attrs = csv_to_dict(cf.read())

	pipeline = LoomPipeline()
	logging("Uploading row and col attrs to SQL")
	pipeline.upload(project, filename, transcriptome, col_attrs, row_attrs)
	logging("Creating loom file from SQL")
	pipeline.create_loom(dataset_path, project, filename, transcriptome)
	logging("Done")
	
class Empty(object):
	pass

if __name__ == '__main__':
	def_dir = os.environ.get('LOOM_PATH')
	if def_dir == None:
		def_dir = os.path.join(os.path.expanduser("~"),"loom-datasets")

	# Handle the special case of no arguments, and create a fake args object with default settings
	if len(sys.argv) == 1:
		args = Empty()
		setattr(args, "debug", False)
		setattr(args, "dataset_path", def_dir)
		setattr(args, "port", 8003)
		setattr(args, "command", "server")
		setattr(args, "show_browser", True)
	else:
		parser = VerboseArgParser(description='Loom command-line tool.')
		parser.add_argument('--debug', action="store_true")
		parser.add_argument('--dataset-path', help="Path to datasets directory (default: %s)" % def_dir , default=def_dir)
		subparsers = parser.add_subparsers(title="subcommands", dest="command")   

		# loom server
		server_parser = subparsers.add_parser('server', help="Launch loom server (default command)")
		server_parser.add_argument('--show-browser', help="Automatically launch browser", action="store_true")
		server_parser.add_argument('-p','--port', help="Port", type=int, default=80)

		# loom list
		list_parser = subparsers.add_parser('list', help="List datasets")
		list_parser.add_argument('--server', help="Remote server hostname")	
		list_parser.add_argument('-u','--username', help="Username")	
		list_parser.add_argument('-p','--password', help="Password")	

		# loom put
		put_parser = subparsers.add_parser('put', help="Submit dataset to remote server")
		put_parser.add_argument("file", help="Loom file to upload")
		put_parser.add_argument('--project', help="Project name", required=True)
		put_parser.add_argument('--server', help="Remote server hostname", required=True)
		put_parser.add_argument('-u','--username', help="Username")	
		put_parser.add_argument('-p','--password', help="Password")	

		# loom clone
		clone_parser = subparsers.add_parser('clone', help="Clone a remote dataset")
		clone_parser.add_argument("url", help="URL of the loom file to clone")
		clone_parser.add_argument('--project', help="Project name")
		clone_parser.add_argument('-u','--username', help="Username")	
		clone_parser.add_argument('-p','--password', help="Password")	
		
		# loom project
		project_parser = subparsers.add_parser('project', help="Compute non-linear projection to 2D")
		project_parser.add_argument("file", help="Loom input file")
		project_parser.add_argument('--perplexity', help="Perplexity", type=int, default=20)

		# loom tile
		tile_parser = subparsers.add_parser('tile', help="Precompute heatmap tiles")
		tile_parser.add_argument("file", help="Loom input file")

		# loom stats
		stats_parser = subparsers.add_parser('stats', help="Compute standard aggregate statistics")
		stats_parser.add_argument("file", help="Loom input file")

		# loom backspin
		backspin_parser = subparsers.add_parser('backspin', help="Perform clustering using BackSPIN")
		backspin_parser.add_argument("file", help="Loom input file")
		backspin_parser.add_argument('-n','--n-genes', help="Number of genes to use for clustering", type=int, default=1000)

		# loom from-cef
		cef_parser = subparsers.add_parser('from-cef', help="Create loom file from data in CEF format")
		cef_parser.add_argument('-o','--outfile', help="Name of output file", required=True)
		cef_parser.add_argument('-i','--infile', help="Name of input file in CEF format", required=True)
		cef_parser.add_argument('--project', help="Project name")

		# loom from-cellranger
		cellranger_parser = subparsers.add_parser('from-cellranger', help="Create loom file from data in cellranger format")
		cellranger_parser.add_argument('-o','--outfile', help="Name of output file", required=True)
		cellranger_parser.add_argument('-i','--infolder', help="Folder containing the cellranger files", required=True)
		cellranger_parser.add_argument('--project', help="Project name")

		# loom from-sql
		sql_parser = subparsers.add_parser('from-sql')
		sql_parser.add_argument('-o','--outfile', help="Name of output file", required=True)
		sql_parser.add_argument('-c','--col-attrs', help="Column (cell) attributes CSV file", required=True)
		sql_parser.add_argument('-r','--row-attrs', help="Row (gene) attributes CSV file")
		sql_parser.add_argument('-s','--sql', help="SQL server hostname", required=True)
		sql_parser.add_argument('-t','--transcriptome', help="Transcriptome", required=True)
		sql_parser.add_argument('--project', help="Project name")

		args = parser.parse_args()

	if args.debug:
		logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')
	else:
		logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
	
	if not os.path.exists(args.dataset_path):
		logging.info("Creating dataset directory: " + args.dataset_path)
		os.mkidr(args.dataset_path)

	if args.command == "list":
		list_command(args.dataset_path, args.server, args.username, args.password)
	elif args.command == "clone":
		clone_command(args.dataset_path, args.project, args.url, args.username, args.password)
	elif args.command == "server":
		loom_server.start_server(args.dataset_path, args.show_browser, args.port, args.debug)
	elif args.command == "stats":
		stats_command(args.dataset_path, args.file)
	elif args.command == "project":
		project_command(args.dataset_path, args.file, args.perplexity)
	elif args.command == "tile":
		tile_command(args.dataset_path, args.file)
	elif args.command == "backspin":
		backspin_command(args.dataset_path, args.file, args.n_genes)
	elif args.command == "from_cef":
		fromcef_command(args.dataset_path, args.infile, args.outfile, args.project)
	elif args.command == "from_cellranger":
		fromcellranger_command(args.dataset_path, args.infolder, args.outfile, args.project)
	elif args.command == "from_sql":
		fromsql_command(args.dataset_path, args.outfile, args.project, args.row_attrs, args.col_attrs, args.sql, args.transcriptome)