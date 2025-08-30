# Makefile for Siko Blog
# Hugo-based static site generator

# Variables
HUGO_DIR = hugo-site
PUBLIC_DIR = $(HUGO_DIR)/public
BUILD_LOCK = $(HUGO_DIR)/.hugo_build.lock
RESOURCES_DIR = $(HUGO_DIR)/resources

# Default target
.PHONY: help
help:
	@echo "Siko Blog - Available commands:"
	@echo ""
	@echo "  make build    - Build the Hugo site"
	@echo "  make deploy   - Build and deploy to root directory"
	@echo "  make clean    - Remove all generated files"
	@echo "  make serve    - Start local development server"
	@echo "  make help     - Show this help message"
	@echo ""

# Build the Hugo site
.PHONY: build
build:
	@echo "Building Siko blog with Hugo..."
	cd $(HUGO_DIR) && hugo --minify
	@echo "Site built successfully!"
	@echo "Generated files are in: $(PUBLIC_DIR)/"

# Clean all generated files
.PHONY: clean
clean:
	@echo "Cleaning Hugo site..."
	cd $(HUGO_DIR) && hugo mod clean || true
	rm -rf $(PUBLIC_DIR)
	rm -rf $(RESOURCES_DIR)
	rm -f $(BUILD_LOCK)
	@echo "Hugo site cleaned!"
	@echo ""
	@echo "Cleaning deployed files from root..."
	rm -f index.html index.xml sitemap.xml favicon.ico
	rm -rf categories/ posts/ tags/
	@echo "Clean complete!"
	@echo ""
	@echo "All generated files removed. Source files preserved."
	@echo "Run 'make build' to rebuild the site."

# Deploy to root directory (for GitHub Pages)
.PHONY: deploy
deploy: clean build
	@echo "Deploying Hugo site to root directory..."
	rsync -av --exclude='hugo-site' --exclude='Makefile' --exclude='.git' $(PUBLIC_DIR)/ ./
	@echo "Deployment complete! Files copied to root directory."
	@echo "You can now serve the site with: make serve"

# Start local Python server
.PHONY: serve
serve:
	@echo "Starting local server at http://localhost:8000"
	python3 serve.py
