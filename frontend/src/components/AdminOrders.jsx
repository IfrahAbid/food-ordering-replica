import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AdminOrders() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      return;
    }

    fetch("https://food-ordering-replica-production.up.railway.app/api/orders", {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then((response) => response.json())
      .then((data) => {
        setOrders(data);
      })
      .catch((error) => {
        console.log("Error fetching orders:", error);
      });
  }, []);

  async function updateStatus(orderId, status) {
    try {
      const response = await fetch(
        `https://food-ordering-replica-production.up.railway.app/api/orders/${orderId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          },
          body: JSON.stringify({ status })
        }
      );

      const updatedOrder = await response.json();

      if (!response.ok) {
        alert(updatedOrder.message || "Could not update order status.");
        return;
      }

      setOrders(
        orders.map((order) =>
          order._id === updatedOrder._id ? updatedOrder : order
        )
      );
    } catch (error) {
      console.log("Error updating status:", error);
    }
  }

  if (!user || user.role !== "admin") {
    return (
      <section className="admin-orders">
        <h1>Access Denied</h1>
        <p>Only admin users can view orders.</p>
        <Link to="/" className="order-button">
          Back to Home
        </Link>
      </section>
    );
  }

  return (
    <section className="admin-orders">
      <h1>Admin Orders</h1>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div className="admin-order-card" key={order._id}>
            <h2>Order #{order._id}</h2>

            <p><strong>Name:</strong> {order.name}</p>
            <p><strong>Phone:</strong> {order.phone}</p>

            <p>
              <strong>Order Type:</strong>{" "}
              {order.orderType === "pickup" ? "Pick-up" : "Delivery"}
            </p>

            <p>
              <strong>
                {order.orderType === "pickup"
                  ? "Pickup Branch"
                  : "Delivery Address"}:
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

            <h3>Total: Rs. {order.total.toLocaleString()}</h3>

            <p>
              <strong>Status:</strong> {order.status}
            </p>

            <select
              value={order.status}
              onChange={(e) => updateStatus(order._id, e.target.value)}
            >
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Preparing">Preparing</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))
      )}
    </section>
  );
}

export default AdminOrders;
