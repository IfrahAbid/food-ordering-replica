import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Menu() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const sectionId = window.location.hash.substring(1);

    if (sectionId) {
      setTimeout(() => {
        const section = document.getElementById(sectionId);

        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }, 300);
    }
  }, []);

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

  const categories = [
    "Pizza",
    "Burgers",
    "Chicken",
    "Fries",
    "Sandwiches",
    "Drinks",
    "Desserts",
    "Deals"
  ];

  const matchingProducts = products.filter((product) =>
  (selectedCategory === "All" || product.category === selectedCategory) &&
  product.name.toLowerCase().includes(search.toLowerCase())
);

  return (
    <section className="all-menu">
      <h1>Explore Menu</h1>

      <div className="category-buttons">
        <button
        className={selectedCategory === "All" ? "active-category" : ""}
        onClick={() => setSelectedCategory("All")}
        >
          All
          </button>
          
          {categories.map((category) => (
            <button
            key={category}
            className={selectedCategory === category ? "active-category" : ""}
            onClick={() => setSelectedCategory(category)}
            >
              {category}
              </button>
            ))}
          </div>

     <input
     className="menu-search"
     type="text"
     placeholder="Search food..."
     value={search}
     onChange={(e) => setSearch(e.target.value)}
     />

     {matchingProducts.length === 0 && (
      <p className="no-products">No products found</p>
      )}

      {categories.map((category) => {
        const filteredProducts = products
        .filter((product) => product.category === category)
        .filter((product) =>
          selectedCategory === "All" || product.category === selectedCategory
      )
      .filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
    );

        if (filteredProducts.length === 0) {
          return null;
        }

        return (
          <div
            className="menu-category"
            id={category.toLowerCase()}
            key={category}
          >
            <h2>{category}</h2>

            <div className="menu-products">
              {filteredProducts.map((product) => (
                <div className="menu-product" key={product.id}>
                  <img src={product.image} alt={product.name} />

                  <div className="menu-product-content">
                    <h3>{product.name}</h3>

                    <p>{product.description}</p>

                    <h4>Rs. {product.price.toLocaleString()}</h4>

                    <span>Starting Price</span>

                    <Link to={`/product/${product.id}`}>
                      <button>VIEW DETAILS</button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}

export default Menu;