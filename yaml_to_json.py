import os
import sys

import simplejson
import yaml

file_name = sys.argv[1]

yaml_in = yaml.load(open(file_name).read())

var_name = os.path.split(file_name)[-1].split('.')[0]

result = []
for dataset in yaml_in:
    # should only be one key/val
    result.append({
        'title': dataset.keys()[0],
        'entries': dataset.values()[0],
    })

print 'window.Review.%s = %s;' % (var_name, simplejson.dumps(result))
