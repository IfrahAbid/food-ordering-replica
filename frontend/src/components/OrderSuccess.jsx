import { Link, useLocation } from "react-router-dom";

function OrderSuccess() {
  const location = useLocation();
  const orderId = location.state?.orderId;

  return (
    <section className="order-success">
      <div className="success-box">
        <div className="success-icon">✓</div>

        <h1>Order Confirmed!</h1>

        <p>Your order has been placed successfully.</p>

        {orderId && (
          <p>
            <strong>Order ID:</strong> {orderId}
          </p>
        )}

        <div className="success-buttons">
          <Link to="/orders" className="order-button">
            View Order History
          </Link>

          <Link to="/menu" className="order-button">
            Continue Shopping
          </Link>
        </div>
      </div>
    </section>
  );
}

export default OrderSuccess;