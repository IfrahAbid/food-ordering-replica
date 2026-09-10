import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function OrderHistory() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [orders, setOrders] = useState([]);

  useEffect(() => {
  if (!user) return;

  function getOrders() {
    fetch(`http://localhost:5000/api/orders?email=${user.email}`, {
      cache: "no-store",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Orders from backend:", data);
        setOrders(data);
      })
      .catch((error) => {
        console.log("Error fetching orders:", error);
      });
  }

  getOrders();

  const interval = setInterval(getOrders, 3000);

  return () => clearInterval(interval);
}, []);

  return (
    <section className="order-history">
      <h1>Order History</h1>

      {!user ? (
        <div className="order-message">
          <h2>Please Login First</h2>
          <p>Login to view your previous orders.</p>

          <Link to="/login" className="order-button">
            Login
          </Link>
        </div>
      ) : orders.length === 0 ? (
        <div className="order-message">
          <h2>No Orders Yet</h2>
          <p>You haven't placed any orders yet.</p>

          <Link to="/menu" className="order-button">
            Place Your First Order
          </Link>
        </div>
      ) : (
        orders.map((order) => (
          <div className="order-card" key={order._id}>
            <h2>Order #{order._id}</h2>

            <p><strong>Name:</strong> {order.name}</p>
            <p><strong>Phone:</strong> {order.phone}</p>
            <p><strong>Email:</strong> {order.email}</p>
            <p>
              <strong>Order Type:</strong>{" "}
              {order.orderType === "pickup" ? "Pick-up" : "Delivery"}
              </p>
              
              <p>
                <strong>
                  {order.orderType === "pickup" ? "Pickup Branch" : "Delivery Address"}:
                  </strong>{" "}
                  {order.address}
                </p>

            <h3>Items</h3>

            {order.items.map((item) => (
              <p key={item._id}>
                {item.name} × {item.quantity} — Rs.{" "}
                {(item.price * item.quantity).toLocaleString()}
              </p>
            ))}

            <p className="order-status">
              <strong>Status:</strong>{" "}
              {order.status === "Pending" && "🟡 Pending"}
              {order.status === "Confirmed" && "🟢 Confirmed"}
              {order.status === "Preparing" && "🟠 Preparing"}
              {order.status === "Delivered" && "🔵 Delivered"}
            </p>

            <h3>Total: Rs. {order.total.toLocaleString()}</h3>
          </div>
        ))
      )}

      <div className="order-home">
        <Link to="/" className="order-button">
          Back to Home
        </Link>
      </div>
    </section>
  );
}

export default OrderHistory;