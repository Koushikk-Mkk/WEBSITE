const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');

// Helper function to convert data to CSV format
function convertToCSV(data, headers) {
  if (!data || data.length === 0) {
    return headers.join(',') + '\n';
  }
  
  const csvRows = [];
  csvRows.push(headers.join(','));
  
  data.forEach(row => {
    const values = headers.map(header => {
      const value = row[header] !== undefined ? row[header] : '';
      // Escape commas and quotes in CSV
      if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
        return `"${value.replace(/"/g, '""')}"`;
      }
      return value;
    });
    csvRows.push(values.join(','));
  });
  
  return csvRows.join('\n');
}

// Bill-wise report (Individual order invoices)
router.get('/bill-wise', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    
    const reportData = orders.map(order => ({
      'Order ID': order.orderId,
      'Date': new Date(order.createdAt).toLocaleDateString('en-IN'),
      'Customer Name': order.customerName,
      'Customer Email': order.customerEmail,
      'Customer Phone': order.customerPhone,
      'Status': order.status,
      'Total Items': order.totalItems,
      'Total Amount (₹)': order.totalAmount,
      'City': order.shippingAddress?.city || '',
      'State': order.shippingAddress?.state || '',
      'Pincode': order.shippingAddress?.pincode || ''
    }));
    
    const csv = convertToCSV(reportData, [
      'Order ID', 'Date', 'Customer Name', 'Customer Email', 'Customer Phone',
      'Status', 'Total Items', 'Total Amount (₹)', 'City', 'State', 'Pincode'
    ]);
    
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="bill-wise-report-${Date.now()}.csv"`);
    res.send(csv);
  } catch (error) {
    console.error('Bill-wise report error:', error);
    res.status(500).json({ error: 'Failed to generate bill-wise report' });
  }
});

// Product-wise report (Sales by product)
router.get('/product-wise', async (req, res) => {
  try {
    const orders = await Order.find({ status: { $ne: 'cancelled' } });
    
    // Aggregate sales by product
    const productSales = {};
    
    orders.forEach(order => {
      order.items.forEach(item => {
        const productName = item.productName || 'Unknown Product';
        if (!productSales[productName]) {
          productSales[productName] = {
            'Product Name': productName,
            'Total Quantity Sold': 0,
            'Total Revenue (₹)': 0,
            'Number of Orders': 0,
            'Unit': item.unit || 'piece'
          };
        }
        productSales[productName]['Total Quantity Sold'] += item.quantity || 0;
        productSales[productName]['Total Revenue (₹)'] += (item.quantity || 0) * (item.price || 0);
        productSales[productName]['Number of Orders'] += 1;
      });
    });
    
    const reportData = Object.values(productSales).sort((a, b) => b['Total Revenue (₹)'] - a['Total Revenue (₹)']);
    
    const csv = convertToCSV(reportData, [
      'Product Name', 'Total Quantity Sold', 'Unit', 'Total Revenue (₹)', 'Number of Orders'
    ]);
    
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="product-wise-report-${Date.now()}.csv"`);
    res.send(csv);
  } catch (error) {
    console.error('Product-wise report error:', error);
    res.status(500).json({ error: 'Failed to generate product-wise report' });
  }
});

// Month-wise report (Sales by month)
router.get('/month-wise', async (req, res) => {
  try {
    const orders = await Order.find({ status: { $ne: 'cancelled' } });
    
    // Aggregate sales by month
    const monthlySales = {};
    
    orders.forEach(order => {
      const orderDate = new Date(order.createdAt);
      const monthKey = `${orderDate.getFullYear()}-${String(orderDate.getMonth() + 1).padStart(2, '0')}`;
      const monthName = orderDate.toLocaleString('en-IN', { month: 'long', year: 'numeric' });
      
      if (!monthlySales[monthKey]) {
        monthlySales[monthKey] = {
          'Month': monthName,
          'Total Orders': 0,
          'Total Revenue (₹)': 0,
          'Average Order Value (₹)': 0
        };
      }
      monthlySales[monthKey]['Total Orders'] += 1;
      monthlySales[monthKey]['Total Revenue (₹)'] += order.totalAmount || 0;
    });
    
    // Calculate average order value
    Object.keys(monthlySales).forEach(monthKey => {
      const month = monthlySales[monthKey];
      month['Average Order Value (₹)'] = month['Total Orders'] > 0
        ? (month['Total Revenue (₹)'] / month['Total Orders']).toFixed(2)
        : 0;
    });
    
    const reportData = Object.values(monthlySales).sort((a, b) => {
      const dateA = new Date(a['Month']);
      const dateB = new Date(b['Month']);
      return dateB - dateA;
    });
    
    const csv = convertToCSV(reportData, [
      'Month', 'Total Orders', 'Total Revenue (₹)', 'Average Order Value (₹)'
    ]);
    
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="month-wise-report-${Date.now()}.csv"`);
    res.send(csv);
  } catch (error) {
    console.error('Month-wise report error:', error);
    res.status(500).json({ error: 'Failed to generate month-wise report' });
  }
});

// Year-wise report (Sales by year)
router.get('/year-wise', async (req, res) => {
  try {
    const orders = await Order.find({ status: { $ne: 'cancelled' } });
    
    // Aggregate sales by year
    const yearlySales = {};
    
    orders.forEach(order => {
      const orderDate = new Date(order.createdAt);
      const year = orderDate.getFullYear().toString();
      
      if (!yearlySales[year]) {
        yearlySales[year] = {
          'Year': year,
          'Total Orders': 0,
          'Total Revenue (₹)': 0,
          'Average Order Value (₹)': 0
        };
      }
      yearlySales[year]['Total Orders'] += 1;
      yearlySales[year]['Total Revenue (₹)'] += order.totalAmount || 0;
    });
    
    // Calculate average order value
    Object.keys(yearlySales).forEach(year => {
      const yearData = yearlySales[year];
      yearData['Average Order Value (₹)'] = yearData['Total Orders'] > 0
        ? (yearData['Total Revenue (₹)'] / yearData['Total Orders']).toFixed(2)
        : 0;
    });
    
    const reportData = Object.values(yearlySales).sort((a, b) => parseInt(b['Year']) - parseInt(a['Year']));
    
    const csv = convertToCSV(reportData, [
      'Year', 'Total Orders', 'Total Revenue (₹)', 'Average Order Value (₹)'
    ]);
    
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="year-wise-report-${Date.now()}.csv"`);
    res.send(csv);
  } catch (error) {
    console.error('Year-wise report error:', error);
    res.status(500).json({ error: 'Failed to generate year-wise report' });
  }
});

module.exports = router;

