data/summary.js : data/summary.yaml
	python yaml_to_json.py data/summary.yaml > data/summary.js
