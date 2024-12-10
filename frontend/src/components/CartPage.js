import React, { useEffect, useState } from 'react';
import '../styles/CartPage.css';
import upiImage from '../static/upi.jpg';


export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    paymentMode: '',
    bankName: '',
    accountNumber: '',
    ifscCode: '',
    upiId: ''
  });
  const [orderSuccess, setOrderSuccess] = useState(false); // To track order success status
  const [totalAmount, setTotalAmount] = useState(0); // Track total amount
  const [gstAmount, setGstAmount] = useState(0); // Track GST amount
  const [taxAmount, setTaxAmount] = useState(0); // Track Tax amount

  // Check user login status and load cart items
  useEffect(() => {
    const userId = localStorage.getItem('userId'); // Fetch userId from localStorage
    if (userId) {
      setIsLoggedIn(true); // User is logged in
      const savedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
      fetchArtworkDetails(savedCart);
    } else {
      setIsLoggedIn(false); // User is logged out
      setCartItems([]); // Clear cart items
      setLoading(false); // No need to fetch anything
    }
  }, []);

  // Fetch detailed artwork info (including image URL) from backend
  const fetchArtworkDetails = async (savedCart) => {
    try {
      const detailedItems = await Promise.all(
        savedCart.map(async (item) => {
          const response = await fetch(`http://localhost:8080/api/artworks/${item.id}`);
          if (response.ok) {
            const data = await response.json();
            return { ...item, imageUrl: data.imagePath }; // Append image URL from backend
          } else {
            console.error('Failed to fetch artwork details');
            return item; // In case of failure, return the item as is
          }
        })
      );
      setCartItems(detailedItems);
      calculateCartTotal(detailedItems); // Calculate total after fetching items
    } catch (error) {
      console.error('Error fetching artwork details:', error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate total cart value, GST (10%) and tax (5%)
  const calculateCartTotal = (items) => {
    const subtotal = items.reduce((acc, item) => acc + parseFloat(item.cost), 0);
    const gst = (subtotal * 0.10); // 10% GST
    const tax = (subtotal * 0.05); // 5% Tax
    const total = subtotal + gst + tax;
    setTotalAmount(total);
    setGstAmount(gst);
    setTaxAmount(tax);
  };

  // Remove item from the cart
  const removeFromCart = (itemId) => {
    const updatedCart = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedCart);

    // Save the updated cart to localStorage
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    calculateCartTotal(updatedCart); // Recalculate total after removing an item
  };

  // Handle payment details change
  const handlePaymentChange = (e) => {
    setPaymentDetails({
      ...paymentDetails,
      [e.target.name]: e.target.value,
    });
  };

  const placeOrder = () => {
    if (!paymentDetails.paymentMode) {
      alert('Please select a payment mode.');
      return;
    }

    // If Credit/Debit Card is selected, ensure that card details are filled
    if (paymentDetails.paymentMode === 'CARD' && (!paymentDetails.cardNumber || !paymentDetails.expiry || !paymentDetails.cvv)) {
      alert('Please fill out all card details.');
      return;
    }

    // If Net Banking is selected, ensure that bank details are filled
    if (paymentDetails.paymentMode === 'NET_BANKING' && (!paymentDetails.bankName || !paymentDetails.accountNumber || !paymentDetails.ifscCode)) {
      alert('Please fill out all the net banking details.');
      return;
    }

    // If UPI is selected, ensure that UPI ID is filled
    if (paymentDetails.paymentMode === 'UPI' && !paymentDetails.upiId) {
      alert('Please enter your UPI ID.');
      return;
    }

    // Store the current totals for the alert and post-order action
    const subtotal = cartItems.reduce((acc, item) => acc + parseFloat(item.cost), 0);
    const gst = subtotal * 0.10; // 10% GST
    const tax = subtotal * 0.05; // 5% Tax
    const total = subtotal + gst + tax;

    // Simulate successful order
    setOrderSuccess(true);

    // Clear cart from localStorage
    localStorage.setItem('cartItems', JSON.stringify([]));
    setCartItems([]); // Clear cart from state

    // Update user orders count (fetch current orders from backend and update)
    const userId = localStorage.getItem('userId');
    fetch(`http://localhost:8080/api/users/${userId}`, {
      method: 'PATCH', // Assuming PATCH for updating the user's order count
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ incrementOrders: 1 }), // Incrementing orders by 1
    })
      .then(response => response.json())
      .then(() => {
        // Show alert for order success
        alert(`Order placed successfully! \nSubtotal: ₹${subtotal.toFixed(2)}\nGST (10%): ₹${gst.toFixed(2)}\nTax (5%): ₹${tax.toFixed(2)}\nTotal: ₹${total.toFixed(2)}`);

        // Optionally, you can redirect the user to another page or show a success message
        setTimeout(() => setOrderSuccess(false), 3000); // Hide success message after 3 seconds
      })
      .catch(error => console.error('Error updating orders:', error));
};


  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Your Cart</h1>
      <div className="cart-items">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <div className="cart-item-image-container">
              <img src={`http://localhost:8080${item.imageUrl}`} alt={item.artist} className="cart-item-image" />
            </div>
            <div className="cart-item-details">
              <h2>{item.artist}</h2>
              <p>Cost: {item.cost}</p>
              <button onClick={() => removeFromCart(item.id)}>Remove from Cart</button>
            </div>
          </div>
        ))}
      </div>

      <div className="order-summary">
        <h3>Order Summary</h3>
        <p>Subtotal: ₹{cartItems.reduce((acc, item) => acc + parseFloat(item.cost), 0)}</p>
        <p>GST (10%): ₹{gstAmount.toFixed(2)}</p>
        <p>Tax (5%): ₹{taxAmount.toFixed(2)}</p>
        <p>Total: ₹{totalAmount.toFixed(2)}</p>
      </div>

      <div className="payment-section">
        <h2>Payment Information</h2>
        <form>
          <label>Payment Mode</label>
          <select
            name="paymentMode"
            value={paymentDetails.paymentMode}
            onChange={handlePaymentChange}
            required
          >
            <option value="">Select Payment Mode</option>
            <option value="CARD">Credit/Debit Card</option>
            <option value="NET_BANKING">Net Banking</option>
            <option value="UPI">UPI</option>
          </select>

          {paymentDetails.paymentMode === 'CARD' && (
            <>
              <label>Card Number</label>
              <input
                type="text"
                name="cardNumber"
                value={paymentDetails.cardNumber}
                onChange={handlePaymentChange}
                placeholder="Enter your card number"
                required
              />
              <label>Expiry Date</label>
              <input
                type="text"
                name="expiry"
                value={paymentDetails.expiry}
                onChange={handlePaymentChange}
                placeholder="MM/YY"
                required
              />
              <label>CVV</label>
              <input
                type="text"
                name="cvv"
                value={paymentDetails.cvv}
                onChange={handlePaymentChange}
                placeholder="Enter CVV"
                required
              />
            </>
          )}

          {paymentDetails.paymentMode === 'NET_BANKING' && (
            <>
              <label>Bank Name</label>
              <input
                type="text"
                name="bankName"
                value={paymentDetails.bankName}
                onChange={handlePaymentChange}
                placeholder="Enter your bank name"
                required
              />
              <label>Account Number</label>
              <input
                type="text"
                name="accountNumber"
                value={paymentDetails.accountNumber}
                onChange={handlePaymentChange}
                placeholder="Enter your account number"
                required
              />
              <label>IFSC Code</label>
              <input
                type="text"
                name="ifscCode"
                value={paymentDetails.ifscCode}
                onChange={handlePaymentChange}
                placeholder="Enter your IFSC code"
                required
              />
            </>
          )}

          {paymentDetails.paymentMode === 'UPI' && (
            <>
              <label>UPI ID</label>
              <input
                type="text"
                name="upiId"
                value={paymentDetails.upiId}
                onChange={handlePaymentChange}
                placeholder="Enter your UPI ID"
                required
              />
            </>
          )}

         
        <div className="payment-image-container">
  <h3>Payment Help</h3>
  <img 
  src={upiImage} 
  alt="Payment Instructions" 
  className="payment-image" 
  style={{ width: '200px', height: 'auto', display: 'block', margin: '0 auto' }} 
/>


  <p>Refer to this image for payment details or instructions.</p>
</div>
<button type="button" onClick={placeOrder}>
            Place Order
          </button>
          
        </form>

        {orderSuccess && (
          <p style={{ color: 'green', textAlign: 'center' }}>Order placed successfully!</p>
        )}
      </div>
    </div>
  );
}
