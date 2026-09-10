import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const navigate = useNavigate();

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      window.location.href = "/login";
    }
  }, [user]);

  const [name, setName] = useState(
    user ? user.name : ""
  );

  const [phone, setPhone] = useState("");

  const [address, setAddress] = useState(() => {
    const orderType = localStorage.getItem("orderType") || "delivery";

    if (orderType === "pickup") {
      const branch = JSON.parse(
        localStorage.getItem("selectedBranch")
      );

      return branch
        ? `${branch.name} - ${branch.address}`
        : "";
    }

    return localStorage.getItem("deliveryLocation") || "";
  });

  const cart =
    JSON.parse(localStorage.getItem("cart")) || [];

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  async function placeOrder() {
    if (!name || !phone || !address) {
      alert("Please fill in all details.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          },
          body: JSON.stringify({
            name,
            email: user.email,
            phone,
            orderType:
              localStorage.getItem("orderType") ||
              "delivery",
            address,
            items: cart,
            total
          })
        }
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.removeItem("cart");

        window.dispatchEvent(
          new Event("cartUpdated")
        );

        navigate("/order-success", {
          state: {
            orderId: data._id
          }
        });
      } else {
        alert(
          data.message ||
            "Error placing order."
        );
      }
    } catch (error) {
      console.log("Error:", error);
      alert("Could not place order.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="checkout-page">
      <div className="checkout-container">
        <h1>Checkout</h1>

        <h2>Customer Details</h2>

        <div className="checkout-form">
          <label>Full Name</label>

          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />

          <label>Phone Number</label>

          <input
            type="text"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
            }
          />

          <label>
            {localStorage.getItem("orderType") ===
            "pickup"
              ? "Pickup Branch"
              : "Delivery Address"}
          </label>

          <textarea
            placeholder={
              localStorage.getItem("orderType") ===
              "pickup"
                ? "Pickup branch"
                : "Enter your delivery address"
            }
            value={address}
            onChange={(e) =>
              setAddress(e.target.value)
            }
          ></textarea>

          <button
            className="place-order-button"
            onClick={placeOrder}
            disabled={loading}
          >
            {loading
              ? "PLACING ORDER..."
              : "PLACE ORDER"}
          </button>
        </div>

        <div className="order-summary">
          <h2>Order Summary</h2>

          {cart.map((item, index) => (
            <div
              className="summary-item"
              key={index}
            >
              <span>
                {item.name} × {item.quantity}
              </span>

              <span>
                Rs.{" "}
                {(
                  item.price * item.quantity
                ).toLocaleString()}
              </span>
            </div>
          ))}

          <hr />

          <h3>
            Total: Rs.{" "}
            {total.toLocaleString()}
          </h3>
        </div>
      </div>
    </section>
  );
}

export default Checkout;
