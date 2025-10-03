#!/bin/bash

# Certificate Image Setup Script
# This script helps you set up your certificate images

echo "🔐 Certificate Image Setup for Security Portfolio"
echo "================================================"
echo ""

# Create certificates directory if it doesn't exist
mkdir -p public/certificates

echo "📁 Certificate images should be placed in: public/certificates/"
echo ""
echo "📋 Required filenames for your certificates:"
echo ""

# List all required certificate images
declare -a cert_files=(
    "google-cybersecurity-cert.jpg"
    "iso27001-lead-auditor.jpg"
    "google-ai-essentials.jpg"
    "aws-cloud-practitioner.jpg"
    "isc2-cc.jpg"
    "mastercard-cybersecurity.jpg"
    "tata-cybersecurity.jpg"
    "linkedin-siem.jpg"
    "cisco-cybersecurity.jpg"
    "linkedin-sql.jpg"
    "guvi-ai-india.jpg"
    "guvi-python-face-recognition.jpg"
)

# Check which files exist
echo "✅ Current status:"
for cert in "${cert_files[@]}"; do
    if [ -f "public/certificates/$cert" ]; then
        echo "   ✅ $cert - Found"
    else
        echo "   ❌ $cert - Missing"
    fi
done

echo ""
echo "📝 Instructions:"
echo "1. Save your certificate images with the exact filenames listed above"
echo "2. Place them in the public/certificates/ directory"
echo "3. Recommended image size: 400x300 pixels"
echo "4. Supported formats: JPG, PNG"
echo ""
echo "🔄 After adding images, refresh your browser to see them!"
echo ""

# Check if any images exist
if [ -f "public/certificates/placeholder-cert.jpg" ]; then
    echo "ℹ️  Note: Placeholder images will be shown until you add your actual certificates"
fi
