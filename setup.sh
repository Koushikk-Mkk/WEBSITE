#!/bin/bash

# Maadhuri Shop - Backend Setup Script
# Run this to set up your development environment locally

echo "🌾 Maadhuri Shop Backend Setup"
echo "=============================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ NPM version: $(npm --version)"
echo ""

# Create directory structure
echo "📁 Creating directory structure..."
mkdir -p models routes

echo "✅ Directories created:"
echo "   - models/"
echo "   - routes/"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
echo "This may take a few minutes..."
echo ""
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo ""
echo "✅ Dependencies installed successfully!"
echo ""

# Create .env file
echo "🔐 Creating .env file..."
cat > .env << 'EOF'
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/maadhuri-shop
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
ADMIN_EMAIL=admin@maadhuri.shop
WHATSAPP_PHONE_NUMBER=919876543210
CORS_ORIGIN=http://localhost:3000
API_BASE_URL=http://localhost:5000
EOF

echo "✅ .env file created (edit with your values)"
echo ""

# Create sample data insertion script
cat > seed-db.js << 'EOF'
const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const SAMPLE_PRODUCTS = [
  {
    name: 'Organic Turmeric Powder',
    category: 'Spices',
    description: '100% pure turmeric powder from organic farms',
    price: 250,
    quantity: 500,
    unit: 'gm',
    inStock: true,
    rating: 4.5,
    reviews: 120
  },
  {
    name: 'Kashmiri Saffron',
    category: 'Spices',
    description: 'Premium Kashmiri saffron for authentic taste',
    price: 1500,
    quantity: 100,
    unit: 'gm',
    inStock: true,
    rating: 5,
    reviews: 85
  },
  {
    name: 'Organic Basmati Rice',
    category: 'Grains',
    description: 'Long grain aged basmati rice',
    price: 400,
    quantity: 1000,
    unit: 'gm',
    inStock: true,
    rating: 4.8,
    reviews: 200
  },
  {
    name: 'Cold Pressed Coconut Oil',
    category: 'Oils',
    description: 'Virgin coconut oil, cold pressed',
    price: 350,
    quantity: 500,
    unit: 'ml',
    inStock: true,
    rating: 4.7,
    reviews: 150
  },
  {
    name: 'Organic Almonds',
    category: 'Dry Fruits',
    description: 'Premium organic raw almonds',
    price: 800,
    quantity: 250,
    unit: 'gm',
    inStock: true,
    rating: 4.6,
    reviews: 95
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/maadhuri-shop');
    console.log('✓ Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('✓ Cleared existing products');

    // Insert sample products
    const inserted = await Product.insertMany(SAMPLE_PRODUCTS);
    console.log(`✓ Inserted ${inserted.length} sample products`);

    console.log('\nSample Products:');
    inserted.forEach(product => {
      console.log(`  - ${product.name} (₹${product.price})`);
    });

    await mongoose.disconnect();
    console.log('\n✓ Database seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
EOF

echo "✅ Sample data insertion script created (seed-db.js)"
echo ""

echo "📝 Next Steps:"
echo "=============="
echo ""
echo "1. Edit .env file with your configuration:"
echo "   - MONGODB_URI (MongoDB connection string)"
echo "   - EMAIL_USER and EMAIL_PASSWORD (Gmail credentials)"
echo "   - WHATSAPP_PHONE_NUMBER (your WhatsApp business number)"
echo ""
echo "2. Start MongoDB (if using local):"
echo "   - For macOS/Linux: mongod"
echo "   - For Windows: Run MongoDB from Services"
echo ""
echo "3. Seed the database with sample products:"
echo "   npm run seed"
echo ""
echo "4. Start development server:"
echo "   npm run dev"
echo ""
echo "5. Test the API:"
echo "   curl http://localhost:5000/api/health"
echo "   curl http://localhost:5000/api/products"
echo ""
echo "✨ Setup complete! Happy coding!"
echo ""
