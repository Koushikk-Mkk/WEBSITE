#!/bin/bash

# Create the complete folder structure for Maadhuri Shop Backend

echo "🌾 Creating Maadhuri Shop Backend Structure..."
echo ""

# Create main directories
mkdir -p models
mkdir -p routes
mkdir -p config
mkdir -p middleware
mkdir -p public
mkdir -p docs
mkdir -p scripts

echo "✅ Created directories:"
echo "   📁 models/"
echo "   📁 routes/"
echo "   📁 config/"
echo "   📁 middleware/"
echo "   📁 public/"
echo "   📁 docs/"
echo "   📁 scripts/"
echo ""

# Check if files exist in current directory
echo "📋 Expected files in root directory:"
echo "   📄 server.js"
echo "   📄 package.json"
echo "   📄 .env"
echo "   📄 .env.example"
echo "   📄 .gitignore"
echo "   📄 README.md"
echo ""

echo "📋 Expected files in models/"
echo "   📄 Product.js"
echo "   📄 Order.js"
echo ""

echo "📋 Expected files in routes/"
echo "   📄 products.js"
echo "   📄 orders.js"
echo "   📄 cart.js"
echo "   📄 contact.js"
echo ""

echo "📋 Expected files in docs/"
echo "   📄 HOSTINGER-DEPLOYMENT.md"
echo "   📄 COMPLETE-GUIDE.md"
echo "   📄 QUICK-START.md"
echo "   📄 API-DOCS.md"
echo ""

# Create .gitignore if it doesn't exist
if [ ! -f .gitignore ]; then
    cat > .gitignore << 'EOF'
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Environment variables (NEVER COMMIT!)
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# IDE
.vscode/
.idea/
*.swp
*.swo
*~
.DS_Store

# Logs
logs/
*.log

# OS
Thumbs.db
.DS_Store

# Build
dist/
build/

# Testing
coverage/
.nyc_output/
EOF
    echo "✅ Created .gitignore"
fi

# Create .env if doesn't exist (but .env.example should)
if [ ! -f .env ] && [ ! -f .env.example ]; then
    cat > .env.example << 'EOF'
# Server Configuration
NODE_ENV=development
PORT=5000

# MongoDB
MONGODB_URI=mongodb://localhost:27017/maadhuri-shop

# Email
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
ADMIN_EMAIL=admin@maadhuri.shop

# Frontend
CORS_ORIGIN=http://localhost:3000
API_BASE_URL=http://localhost:5000

# WhatsApp
WHATSAPP_PHONE_NUMBER=919876543210
EOF
    echo "✅ Created .env.example"
fi

echo ""
echo "✨ Complete Folder Structure:"
echo ""
tree -L 2 -a 2>/dev/null || find . -maxdepth 2 -type f -o -type d | grep -v node_modules | head -30

echo ""
echo "🚀 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Copy all provided files to their respective folders"
echo "2. Run: npm install"
echo "3. Run: npm run dev"
echo ""
