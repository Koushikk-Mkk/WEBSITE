import React, { useState, useEffect } from 'react';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Product Service
export const ProductService = {
  async getAll(filters = {}) {
    const params = new URLSearchParams(filters);
    const response = await fetch(`${API_BASE_URL}/products?${params}`);
    return response.json();
  },

  async getById(id) {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    return response.json();
  },

  async getByCategory(category) {
    const response = await fetch(`${API_BASE_URL}/products/category/${category}`);
    return response.json();
  },

  async getFeatured() {
    const response = await fetch(`${API_BASE_URL}/products/featured/all`);
    return response.json();
  }
};

// Cart Service
export const CartService = {
  async addItem(item) {
    const response = await fetch(`${API_BASE_URL}/cart/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    });
    return response.json();
  },

  async removeItem(productId) {
    const response = await fetch(`${API_BASE_URL}/cart/remove`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId })
    });
    return response.json();
  },

  async updateItem(productId, quantity) {
    const response = await fetch(`${API_BASE_URL}/cart/update`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, quantity })
    });
    return response.json();
  }
};

// Order Service
export const OrderService = {
  async create(orderData) {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    });
    return response.json();
  },

  async getById(orderId) {
    const response = await fetch(`${API_BASE_URL}/orders/${orderId}`);
    return response.json();
  },

  async getByEmail(email) {
    const response = await fetch(`${API_BASE_URL}/orders/customer/${email}`);
    return response.json();
  }
};

// Contact Service
export const ContactService = {
  async sendMessage(data) {
    const response = await fetch(`${API_BASE_URL}/contact/send-message`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return response.json();
  },

  async subscribe(email) {
    const response = await fetch(`${API_BASE_URL}/contact/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    return response.json();
  }
};

// Custom Hook: useCart
export const useCart = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.productId === product.productId);
    
    if (existingItem) {
      setCart(cart.map(item =>
        item.productId === product.productId
          ? { ...item, quantity: item.quantity + product.quantity }
          : item
      ));
    } else {
      setCart([...cart, product]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.productId !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item =>
        item.productId === productId ? { ...item, quantity } : item
      ));
    }
  };

  const getTotalAmount = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const clearCart = () => {
    setCart([]);
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    getTotalAmount,
    getTotalItems,
    clearCart
  };
};

// Custom Hook: useProducts
export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = async (filters = {}) => {
    try {
      setLoading(true);
      setError(null);
      const data = await ProductService.getAll(filters);
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchByCategory = async (category) => {
    try {
      setLoading(true);
      setError(null);
      const data = await ProductService.getByCategory(category);
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    products,
    loading,
    error,
    fetchProducts,
    fetchByCategory
  };
};

// Example Component: ProductList
export const ProductList = ({ category }) => {
  const { products, loading, error, fetchProducts, fetchByCategory } = useProducts();

  useEffect(() => {
    if (category) {
      fetchByCategory(category);
    } else {
      fetchProducts();
    }
  }, [category]);

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="product-grid">
      {products.map(product => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

// Example Component: ProductCard
export const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      productId: product._id,
      productName: product.name,
      price: product.price,
      quantity: 1,
      unit: product.unit
    });
    alert('Added to cart!');
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p className="category">{product.category}</p>
      <p className="description">{product.description}</p>
      <div className="price">₹{product.price}/{product.unit}</div>
      <div className="rating">⭐ {product.rating} ({product.reviews} reviews)</div>
      <button 
        onClick={handleAddToCart}
        disabled={!product.inStock}
      >
        {product.inStock ? 'Add to Cart' : 'Out of Stock'}
      </button>
    </div>
  );
};

// Example Component: Checkout Form
export const CheckoutForm = ({ cart, onSuccess }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    shippingAddress: {
      street: '',
      city: '',
      state: '',
      pincode: '',
      country: 'India'
    }
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('address.')) {
      const field = name.split('.')[1];
      setFormData({
        ...formData,
        shippingAddress: { ...formData.shippingAddress, [field]: value }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const orderData = {
        ...formData,
        items: cart,
        totalAmount: cart.reduce((total, item) => total + (item.price * item.quantity), 0)
      };

      const response = await OrderService.create(orderData);

      if (response.success) {
        // Redirect to WhatsApp with order message
        window.open(response.whatsappLink, '_blank');
        onSuccess(response.orderId);
      } else {
        alert('Error creating order: ' + response.error);
      }
    } catch (error) {
      alert('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      <h2>Checkout</h2>

      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          name="customerName"
          value={formData.customerName}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          name="customerEmail"
          value={formData.customerEmail}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Phone</label>
        <input
          type="tel"
          name="customerPhone"
          value={formData.customerPhone}
          onChange={handleInputChange}
          required
        />
      </div>

      <h3>Shipping Address</h3>

      <div className="form-group">
        <label>Street</label>
        <input
          type="text"
          name="address.street"
          value={formData.shippingAddress.street}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>City</label>
          <input
            type="text"
            name="address.city"
            value={formData.shippingAddress.city}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>State</label>
          <input
            type="text"
            name="address.state"
            value={formData.shippingAddress.state}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Pincode</label>
          <input
            type="text"
            name="address.pincode"
            value={formData.shippingAddress.pincode}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      <button type="submit" disabled={loading}>
        {loading ? 'Creating Order...' : 'Place Order & Contact via WhatsApp'}
      </button>
    </form>
  );
};
