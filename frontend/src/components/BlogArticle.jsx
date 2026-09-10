import { useParams, Link } from "react-router-dom";

function BlogArticle() {
  const { id } = useParams();

  const blogs = {
    "best-burgers": {
      title: "Best Burgers at CraveHub",
      text: "Explore our delicious burgers made with fresh ingredients and tasty sauces. Our burgers are prepared to give you a crispy, juicy and flavorful experience.",
    },

    "pizza-lovers": {
      title: "Pizza Lovers Guide",
      text: "Discover our popular pizzas and find the perfect choice for your next meal. From cheesy favorites to delicious chicken and pepperoni toppings, there is something for everyone.",
    },

    "family-meals": {
      title: "Family Meals at CraveHub",
      text: "Enjoy delicious meals with your family and friends with our special deals. Our family meals are made for sharing and are perfect for gatherings and special occasions.",
    }
  };

  const blog = blogs[id];

  if (!blog) {
    return <h1>Blog Not Found</h1>;
  }

  return (
    <section className="blog-article">
      <h1>{blog.title}</h1>

      <p>{blog.text}</p>

      <Link to="/blog">
        <button>BACK TO BLOG</button>
      </Link>
    </section>
  );
}

export default BlogArticle;