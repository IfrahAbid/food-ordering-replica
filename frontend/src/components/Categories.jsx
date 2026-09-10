import { useState } from "react";

function Categories() {
  const [start, setStart] = useState(0);

  const categories = [
    { name: "Pizza", image: "/images/pizza1.jpg" },
    { name: "Burgers", image: "/images/burger1.jpg" },
    { name: "Chicken", image: "/images/chicken1.jpg" },
    { name: "Fries", image: "/images/fries1.jpg" },
    { name: "Sandwiches", image: "/images/sandwiches1.jpg" },
    { name: "Drinks", image: "/images/drink1.jpg" },
    { name: "Desserts", image: "/images/dessert1.jpg" },
    { name: "Deals", image: "/images/deal1.jpg" }
  ];

  function next() {
    if (start < categories.length - 4) {
      setStart(start + 2);
    }
  }

  function previous() {
    if (start > 0) {
      setStart(start - 2);
    }
  }

  return (
    <section className="explore-menu">
      <div className="menu-heading">
        <h2>Explore Menu</h2>

        <button onClick={() => window.location.href = "/menu"}>
          VIEW ALL
        </button>
      </div>

      <div className="category-slider">
        <button className="category-arrow" onClick={previous}>
          ❮
        </button>

        <div className="category-list">
          {categories.slice(start, start + 4).map((category) => (
            <div
              className="category-card"
              key={category.name}
              onClick={() => {
                window.location.href = `/menu#${category.name.toLowerCase()}`;
              }}
            >
              <img src={category.image} alt={category.name} />
              <h3>{category.name}</h3>
            </div>
          ))}
        </div>

        <button className="category-arrow" onClick={next}>
          ❯
        </button>
      </div>
    </section>
  );
}

export default Categories;