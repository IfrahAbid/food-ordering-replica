import { Link } from "react-router-dom";

function Products() {
  const products = [
    {
      id: 1,
      name: "Chicken Pizza",
      price: 899,
      image: "/images/pizza.jpg"
    },
    {
      id: 2,
      name: "Zinger Burger",
      price: 499,
      image: "/images/burger.jpg"
    },
    {
      id: 3,
      name: "Chicken Wings",
      price: 599,
      image: "/images/fries.jpg"
    },
    {
      id: 4,
      name: "Loaded Fries",
      price: 399,
      image: "/images/fries.jpg"
    },
    {
      id: 5,
      name: "Cheese Pizza",
      price: 999,
      image: "/images/pizza.jpg"
    },
    {
      id: 6,
      name: "Crispy Burger",
      price: 549,
      image: "/images/burger.jpg"
    },
    {
      id: 7,
      name: "Chicken Platter",
      price: 799,
      image: "/images/fries.jpg"
    },
    {
      id: 8,
      name: "Special Pizza",
      price: 1099,
      image: "/images/pizza.jpg"
    }
  ];

  return (
    <section className="products">
      <h2>Popular Items</h2>

      <div className="product-list">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.name} />

            <h3>{product.name}</h3>

            <p>Rs. {product.price.toLocaleString()}</p>

            <Link to={`/product/${product.id}`}>
              <button>VIEW DETAILS</button>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Products;