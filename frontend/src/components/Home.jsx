import { Link } from "react-router-dom";
import Products from "./Products";
import Categories from "./Categories";
import Footer from "./Footer";
import { useState, useEffect } from "react";

function Home() {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [showAllBlogs, setShowAllBlogs] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribeMessage, setSubscribeMessage] = useState("");
  const [subscribeLoading, setSubscribeLoading] = useState(false);

  const API_URL = "https://food-ordering-replica-production.up.railway.app";

  async function handleSubscribe(e) {
    e.preventDefault();
    setSubscribeMessage("");

    if (!email.trim()) {
      setSubscribeMessage("Please enter your email address.");
      return;
    }

    try {
      setSubscribeLoading(true);

      const response = await fetch(`${API_URL}/subscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Subscription failed.");
      }

      setSubscribeMessage("Subscribed successfully!");
      setEmail("");
    } catch (error) {
      setSubscribeMessage(
        error.message || "Something went wrong. Please try again."
      );
    } finally {
      setSubscribeLoading(false);
    }
  }

  const banners = [
    {
      title: "Pizza Special",
      text: "Delicious pizza at an amazing price!",
      image: "/images/pizza.jpg"
    },
    {
      title: "Burger Deal",
      text: "Fresh and tasty burgers for you!",
      image: "/images/burger.jpg"
    },
    {
      title: "Family Deal",
      text: "Enjoy delicious food with your family!",
      image: "/images/fries.jpg"
    }
  ];

  function nextBanner() {
    setCurrentBanner((currentBanner + 1) % banners.length);
  }

  function previousBanner() {
    setCurrentBanner(
      (currentBanner - 1 + banners.length) % banners.length
    );
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((currentBanner) =>
        (currentBanner + 1) % banners.length
      );
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="home">

      <section className="hero">
        <button className="prev-button" onClick={previousBanner}>
          ❮
        </button>

        <img
          src={banners[currentBanner].image}
          alt={banners[currentBanner].title}
        />

        <div className="hero-content">
          <h1>{banners[currentBanner].title}</h1>
          <p>{banners[currentBanner].text}</p>
        </div>

        <button className="next-button" onClick={nextBanner}>
          ❯
        </button>
      </section>

      <div className="banner-dots">
        {banners.map((banner, index) => (
          <span
            key={index}
            onClick={() => setCurrentBanner(index)}
          >
            {currentBanner === index ? "●" : "○"}
          </span>
        ))}
      </div>

      <Categories />

      <section className="info-section">

        <div className="info-card">
          <img src="/images/tasty.jpg" alt="Fresh Taste" />
          <h2>Fresh Taste, Every Time</h2>
        </div>

        <div className="info-card">
          <img src="/images/quality.jpg" alt="Quality Food" />
          <h2>Quality Food Made for You</h2>
        </div>

        <div className="info-card">
          <img src="/images/delicious.jpg" alt="Delicious Food" />
          <h2>Delicious Moments, Happy Hearts</h2>
        </div>

      </section>

      <section className="app-section">

        <div className="app-image">
          <img src="/images/phone.jpg"/>
        </div>

        <div className="app-content">
          <h2>Download Our Mobile App</h2>

          <p>
            Order your favorite food faster and easier with our mobile app.
          </p>

          <div className="app-buttons">

            <a
              href="https://play.google.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              GET IT ON
              <strong>Google Play</strong>
            </a>

            <a
              href="https://www.apple.com/app-store/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download on the
              <strong>App Store</strong>
            </a>

          </div>
        </div>

      </section>

      <section className="blogs-section">
  <div className="blogs-heading">
    <h2>Blogs</h2>

    <button onClick={() => setShowAllBlogs(!showAllBlogs)}>
      {showAllBlogs ? "SHOW LESS" : "VIEW ALL"}
    </button>
  </div>

  <div className="blog-list">

    <div className="blog-card">
      <img src="/images/burgerblog.jpeg"/>
      <h3>Best Burgers at CraveHub</h3>
      <p>
        Explore our delicious burgers made with fresh ingredients and tasty sauces.
      </p>
    </div>

    <div className="blog-card">
      <img src="/images/pizzablog.jpeg" />
      <h3>Pizza Lovers Guide</h3>
      <p>
        Discover our popular pizzas and find the perfect choice for your next meal.
      </p>
    </div>

    {showAllBlogs && (
      <div className="blog-card">
        <img src="/images/familyblog.jpeg"/>
        <h3>Family Meals at CraveHub</h3>
        <p>
          Enjoy delicious meals with your family and friends with our special deals.
        </p>
      </div>
    )}

  </div>
</section>

<section className="subscribe-section">
  <h2>Special Offers & News</h2>
  <p>Subscribe now for news, promotions and more delivered right to your inbox</p>

  <form className="subscribe-box" onSubmit={handleSubscribe}>
    <input
      type="email"
      placeholder="Enter your email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
    <button type="submit" disabled={subscribeLoading}>
      {subscribeLoading ? "SUBSCRIBING..." : "SUBSCRIBE"}
    </button>
  </form>

  {subscribeMessage && (
    <p className="subscribe-message">{subscribeMessage}</p>
  )}
</section>

<Footer />

      <Link to="/menu" className="fixed-order-button">
      ORDER NOW
      </Link>

    </div>
  );
}

export default Home;