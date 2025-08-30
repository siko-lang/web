# Siko Programming Language Blog

This blog is now built using [Hugo](https://gohugo.io/), a fast static site generator.

# Siko Programming Language Blog

This blog is now built using [Hugo](https://gohugo.io/), a fast static site generator.

## 📁 Repository Structure

### **Source Files (tracked in Git):**
```
├── build.sh              # Build script
├── deploy.sh              # Deploy script (optional)
├── hugo-site/            # Hugo site directory
│   ├── content/posts/    # 📝 Blog posts (Markdown files)
│   ├── themes/siko/      # 🎨 Custom Siko theme
│   ├── static/           # 🖼️  Static assets (logo, CSS, etc.)
│   └── hugo.toml         # ⚙️  Site configuration
├── .gitignore            # Git ignore rules
└── README-hugo.md        # This documentation
```

### **Generated Files (ignored by Git):**
```
└── hugo-site/
    ├── public/           # 🚫 Generated static site (after build)
    └── .hugo_build.lock  # 🚫 Hugo build lock file
```

**Note:** The `.gitignore` file ensures that only source files are tracked, not generated content.

## Adding New Blog Posts

1. Create a new markdown file in `hugo-site/content/posts/`:
   ```bash
   cd hugo-site
   hugo new content posts/your-post-title.md
   ```

2. Edit the post with your content. The file will have front matter like:
   ```yaml
   +++
   title = 'Your Post Title'
   date = 2025-08-30T10:00:00+02:00
   draft = false
   +++

   Your post content here...
   ```

3. For code blocks, use:
   ````markdown
   ```siko
   fn main() {
     println("Hello, Siko!");
   }
   ```
   ````

## Development

To run the development server:
```bash
cd hugo-site
hugo server --buildDrafts
```

The site will be available at `http://localhost:1313/web/`

## Building for Production

Use the build script:
```bash
./build.sh
```

Or manually:
```bash
cd hugo-site
hugo --minify
```

The generated static site will be in `hugo-site/public/`

## Cleaning

To remove all generated files and build artifacts:
```bash
./clean.sh
```

This removes:
- `hugo-site/public/` (generated site)
- `hugo-site/resources/` (Hugo resources)
- `hugo-site/.hugo_build.lock` (build lock)
- Any files deployed to root directory

## Deployment

Copy the contents of `hugo-site/public/` to your web server.

For GitHub Pages, you can:
1. Copy `public/` contents to the root of your repository
2. Or use GitHub Actions to build and deploy automatically

## Existing Posts

Your existing blog posts have been converted to:
- `hugo-site/content/posts/implicits-effect-handlers.md`
- `hugo-site/content/posts/siko-language-redesign.md`

## Theme Customization

The custom theme is in `hugo-site/themes/siko/`. You can modify:
- `layouts/baseof.html` - Base template
- `layouts/home.html` - Homepage layout
- `layouts/posts/single.html` - Individual post layout

Your existing CSS and assets have been preserved in `hugo-site/static/`.
