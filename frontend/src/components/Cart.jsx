import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();

  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  function updateQuantity(index, newQuantity) {
    if (newQuantity < 1) return;

    const updatedCart = [...cart];
    updatedCart[index].quantity = newQuantity;

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  }

  function removeItem(index) {
    const updatedCart = cart.filter((_, i) => i !== index);

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  }

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <section className="cart-page">
      <h1>Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item, index) => (
              <div className="cart-item" key={index}>
                <img src={item.image} alt={item.name} />

                <div className="cart-item-info">
                  <h2>{item.name}</h2>
                  <p>Rs. {item.price.toLocaleString()}</p>

                  <div className="cart-quantity">
                    <button
                      onClick={() =>
                        updateQuantity(index, item.quantity - 1)
                      }
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() =>
                        updateQuantity(index, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="remove-cart-button"
                    onClick={() => removeItem(index)}
                  >
                    Remove
                  </button>
                </div>

                <h3>
                  Rs. {(item.price * item.quantity).toLocaleString()}
                </h3>
              </div>
            ))}
          </div>

          <div className="cart-total">
            <h2>Total: Rs. {total.toLocaleString()}</h2>

            <button
            className="checkout-button"
            onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
              </button>
          </div>
        </>
      )}
    </section>
  );
}

export default Cart;