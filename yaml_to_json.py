import sys

import simplejson
import yaml

yaml_in = yaml.load(open(sys.argv[1]).read())

print 'window.DATA = %s;' % simplejson.dumps(yaml_in)
