import sys
import pathlib

ROOT_DIR = pathlib.Path( pathlib.Path(__file__).parent.absolute(), '..', '..', '..' )

def parse_command_line_args():
  args = {}
  n_args = len(sys.argv)
  i = 1
  while(i < n_args):
    arg = sys.argv[i]
    arg = arg.split('=')
    if arg[0] in ('--co', '--no', '--no2', '--o3', '--so2', '--pm2_5', '--pm10', '--nh3'):
      vals = arg[1].split(' ')
      args[ arg[0] ] = vals
    else:
      args[ arg[0] ] = arg[1]
    i += 1
  return args