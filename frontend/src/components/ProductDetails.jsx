import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function ProductDetails() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState(
  JSON.parse(localStorage.getItem("cart")) || []
);

  const [products, setProducts] = useState([]);

  useEffect(() => {
  fetch("http://localhost:5000/api/products")
    .then((response) => response.json())
    .then((data) => {
      setProducts(data);
    })
    .catch((error) => {
      console.log("Error fetching products:", error);
    });
}, []);

  const product = products.find(
    (product) => product.id === Number(id)
  );

  if (!product) {
    return <h1>Product Not Found</h1>;
  }

  return (
    <section className="product-details">
      <div className="product-details-image">
        <img src={product.image} alt={product.name} />
      </div>

      <div className="product-details-content">
        <h1>{product.name}</h1>

        <h2>Rs. {product.price.toLocaleString()}</h2>

        <p>{product.description}</p>

        <div className="quantity">
          <button onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>
            -
          </button>

          <span>{quantity}</span>

          <button onClick={() => setQuantity(quantity + 1)}>
            +
          </button>
        </div>

        <button
        className="add-cart-button"
        onClick={() => {
          const existingProduct = cart.find(
            (item) => item.id === product.id
          );
          let newCart;
          if (existingProduct) {
            newCart = cart.map((item) =>
              item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
          );
        } else {
          newCart = [...cart, { ...product, quantity }];
        }
        setCart(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
        alert("Product added to cart!");
      }}
          >
            ADD TO CART
          </button>
      </div>
    </section>
  );
}

export default ProductDetails;