.PHONY: install package fetch lint upload deploy clean

BUCKET_NAME := web-scraper-artefacts-dev-af-south-1
LAMBDA_NAME := node-fetcher-lambda
DIST_DIR := dist
ZIP_FILE := $(LAMBDA_NAME).zip

install:
	npm ci

package:
	rm -rf $(DIST_DIR)
	mkdir dist
	npx tsc
	cp -r src package.json package-lock.json $(DIST_DIR)
	cd $(DIST_DIR) && npm ci --omit=dev
	cd $(DIST_DIR) && zip -r ../$(LAMBDA_NAME).zip .

fetch:
	npm run fetch

lint:
	npm run lint

upload:
	aws s3 cp $(ZIP_FILE) s3://$(BUCKET_NAME)/$(LAMBDA_NAME).zip

clean:
	rm -rf $(DIST_DIR) $(ZIP_FILE) node_modules

deploy: install package upload