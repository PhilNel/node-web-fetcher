BUCKET_NAME := web-scraper-artefacts-dev-af-south-1
LAMBDA_NAME := fetcher_lambda
DIST_DIR := dist
ZIP_FILE := $(LAMBDA_NAME).zip

install:
	npm ci

package:
	rm -rf $(DIST_DIR)
	mkdir -p $(DIST_DIR)
	cp -r src package.json package-lock.json $(DIST_DIR)
	cd $(DIST_DIR) && npm ci --omit=dev
	cd $(DIST_DIR) && zip -r ../$(LAMBDA_NAME).zip .

upload:
	aws s3 cp $(ZIP_FILE) s3://$(BUCKET_NAME)/$(LAMBDA_NAME).zip

deploy: install package upload