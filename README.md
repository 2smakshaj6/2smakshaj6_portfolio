# Akshaj's Portfolio

A modern, responsive portfolio website showcasing cybersecurity and software engineering expertise.

## 🚀 Live Demo
[View Portfolio](https://2smakshaj6.github.io/2smakshaj6_portfolio/)

## 📁 Project Structure
```
security-portfolio/
├── index.html          # Main HTML file
├── styles.css          # CSS styles
├── main.js            # JavaScript functionality
├── public/            # Static assets
│   ├── favicon.svg    # Custom AK logo favicon
│   ├── akj_profile.JPG # Profile picture
│   └── figurines/     # 404 page assets
├── scripts/           # Helper scripts
│   └── git-helper.sh  # Git workflow automation
├── 404.html          # Custom 404 error page
├── 500.html          # Custom 500 error page
└── robots.txt        # SEO configuration
```

## 🛠️ Development

### Local Development
```bash
# Start local server
python3 -c "
import http.server
import socketserver
from http.server import SimpleHTTPRequestHandler
import os

class CustomHandler(SimpleHTTPRequestHandler):
    def send_error(self, code, message=None):
        if code == 404:
            self.path = '/404.html'
            return SimpleHTTPRequestHandler.do_GET(self)
        else:
            return SimpleHTTPRequestHandler.send_error(self, code, message)

PORT = 8001
with socketserver.TCPServer(('', PORT), CustomHandler) as httpd:
    print(f'Server running at http://localhost:{PORT}/')
    print('Test 404: http://localhost:8001/nonexistent-page')
    httpd.serve_forever()
"
```

### Git Workflow
```bash
# Quick commit and push
./scripts/git-helper.sh quick "Your commit message"

# Check status
./scripts/git-helper.sh status

# Deploy to production
./scripts/git-helper.sh deploy
```

## 📱 Features

### Responsive Design
- **Desktop**: 3-column project grid, full navigation
- **Tablet**: 2-column project grid, hamburger menu
- **Mobile**: 1-column layout, slide-out navigation

### Interactive Elements
- Smooth scroll navigation
- Animated background
- Mobile hamburger menu
- Custom scrollbar styling
- Page load animations

### SEO & Performance
- Custom favicon (AK logo)
- Meta tags and descriptions
- robots.txt configuration
- Optimized images and assets

## 🎨 Customization

### Colors
- Primary: `#3b82f6` (Blue)
- Accent: `#f59e0b` (Amber)
- Background: `#0f172a` (Dark slate)

### Typography
- Headings: Inter, system fonts
- Body: Inter, system fonts
- Code: JetBrains Mono

## 📊 Version Control

### Commit History
- All changes are tracked with descriptive commit messages
- Feature branches for major updates
- Regular backups and deployments

### Deployment
- Automatic deployment via GitHub Pages
- Custom 404/500 error pages
- SSL/HTTPS enabled

## 🔧 Maintenance

### Regular Tasks
1. Update project information
2. Add new achievements
3. Update contact information
4. Test responsive design
5. Check for broken links

### Git Commands
```bash
# Check what's changed
git status

# Stage all changes
git add .

# Commit with message
git commit -m "Description of changes"

# Push to GitHub
git push origin main
```

## 📞 Contact
- **Email**: contact.me@smakshaj.com
- **LinkedIn**: [smakshaj](https://www.linkedin.com/in/smakshaj/)
- **GitHub**: [2smakshaj6](https://github.com/2smakshaj6)
- **Credly**: [akshaj-shivara-madhusudhan](https://www.credly.com/users/akshaj-shivara-madhusudhan/badges#credly)

---
*Last updated: $(date)*