import { Link } from "react-router-dom";

function Blog() {
  return (
    <section className="blog-page">
      <h1>Blog</h1>

      <p>Discover food, offers and updates from CraveHub.</p>

      <div className="blog-list">

        <div className="blog-card">
          <img
            src="/images/burgerblog.jpeg"
            alt="Best Burgers at CraveHub"
          />

          <h2>Best Burgers at CraveHub</h2>

          <p>
            Explore our delicious burgers made with fresh ingredients
            and tasty sauces.
          </p>

          <Link to="/blog/best-burgers">
            <button>READ MORE</button>
          </Link>
        </div>

        <div className="blog-card">
          <img
            src="/images/pizzablog.jpeg"
            alt="Pizza Lovers Guide"
          />

          <h2>Pizza Lovers Guide</h2>

          <p>
            Discover our popular pizzas and find the perfect choice
            for your next meal.
          </p>

          <Link to="/blog/pizza-lovers">
            <button>READ MORE</button>
          </Link>
        </div>

        <div className="blog-card">
          <img
            src="/images/familyblog.jpeg"
            alt="Family Meals at CraveHub"
          />

          <h2>Family Meals at CraveHub</h2>

          <p>
            Enjoy delicious meals with your family and friends with
            our special deals.
          </p>

          <Link to="/blog/family-meals">
            <button>READ MORE</button>
          </Link>
        </div>

      </div>
    </section>
  );
}

export default Blog;