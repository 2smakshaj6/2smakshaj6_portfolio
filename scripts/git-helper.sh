#!/bin/bash

# Git Helper Script for Portfolio Maintenance
# Usage: ./scripts/git-helper.sh [command]

case "$1" in
    "status")
        echo "📊 Git Status:"
        git status
        echo ""
        echo "📈 Recent Commits:"
        git log --oneline -5
        ;;
    "commit")
        if [ -z "$2" ]; then
            echo "❌ Please provide a commit message"
            echo "Usage: ./scripts/git-helper.sh commit 'Your commit message'"
            exit 1
        fi
        echo "🔄 Staging changes..."
        git add .
        echo "💾 Committing with message: $2"
        git commit -m "$2"
        echo "✅ Commit successful!"
        ;;
    "push")
        echo "🚀 Pushing to GitHub..."
        git push origin main
        echo "✅ Push successful!"
        ;;
    "quick")
        if [ -z "$2" ]; then
            echo "❌ Please provide a commit message"
            echo "Usage: ./scripts/git-helper.sh quick 'Your commit message'"
            exit 1
        fi
        echo "⚡ Quick commit and push..."
        git add .
        git commit -m "$2"
        git push origin main
        echo "✅ Quick commit and push successful!"
        ;;
    "backup")
        echo "💾 Creating backup branch..."
        timestamp=$(date +"%Y%m%d_%H%M%S")
        git checkout -b "backup_$timestamp"
        git push origin "backup_$timestamp"
        git checkout main
        echo "✅ Backup created: backup_$timestamp"
        ;;
    "deploy")
        echo "🚀 Deploying to production..."
        git add .
        git commit -m "Deploy: $(date)"
        git push origin main
        echo "✅ Deployed to GitHub!"
        echo "🌐 Your portfolio is live at: https://2smakshaj6.github.io/2smakshaj6_portfolio/"
        ;;
    *)
        echo "🛠️  Portfolio Git Helper"
        echo ""
        echo "Available commands:"
        echo "  status    - Show git status and recent commits"
        echo "  commit    - Stage and commit changes"
        echo "  push      - Push to GitHub"
        echo "  quick     - Quick commit and push"
        echo "  backup    - Create backup branch"
        echo "  deploy    - Deploy to production"
        echo ""
        echo "Examples:"
        echo "  ./scripts/git-helper.sh status"
        echo "  ./scripts/git-helper.sh commit 'Update projects section'"
        echo "  ./scripts/git-helper.sh quick 'Fix mobile menu'"
        echo "  ./scripts/git-helper.sh deploy"
        ;;
esac
