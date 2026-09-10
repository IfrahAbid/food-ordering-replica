import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const products = [
  { id: 1, name: "Pepperoni Pizza", category: "Pizza" },
  { id: 2, name: "Chicken Pizza", category: "Pizza" },
  { id: 3, name: "Cheese Pizza", category: "Pizza" },
  { id: 4, name: "Zinger Burger", category: "Burgers" },
  { id: 5, name: "Crispy Burger", category: "Burgers" },
  { id: 6, name: "Cheese Burger", category: "Burgers" },
  { id: 7, name: "Chicken Wings", category: "Chicken" },
  { id: 8, name: "Chicken Platter", category: "Chicken" },
  { id: 9, name: "Chicken Strips", category: "Chicken" },
  { id: 10, name: "Loaded Fries", category: "Fries" },
  { id: 11, name: "Cheese Fries", category: "Fries" },
  { id: 12, name: "Masala Fries", category: "Fries" },
  { id: 13, name: "Chicken Sandwich", category: "Sandwiches" },
  { id: 14, name: "Club Sandwich", category: "Sandwiches" },
  { id: 15, name: "Grilled Sandwich", category: "Sandwiches" },
  { id: 16, name: "Cold Drink", category: "Drinks" },
  { id: 17, name: "Fresh Lemonade", category: "Drinks" },
  { id: 18, name: "Iced Tea", category: "Drinks" },
  { id: 19, name: "Chocolate Cake", category: "Desserts" },
  { id: 20, name: "Chocolate Brownie", category: "Desserts" },
  { id: 21, name: "Ice Cream", category: "Desserts" },
  { id: 22, name: "Family Deal", category: "Deals" },
  { id: 23, name: "Friends Deal", category: "Deals" },
  { id: 24, name: "Special Deal", category: "Deals" }
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [orderType, setOrderType] = useState(
    localStorage.getItem("orderType") || "delivery"
  );

  const [branchOpen, setBranchOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(() => {
    const savedBranch = localStorage.getItem("selectedBranch");
    return savedBranch ? JSON.parse(savedBranch) : "";
  });

  const [branchConfirmed, setBranchConfirmed] = useState(false);
  const [deliveryOpen, setDeliveryOpen] = useState(false);

  const [searchText, setSearchText] = useState("");
  const [deliverySearch, setDeliverySearch] = useState("");
  const [deliveryLocation, setDeliveryLocation] = useState(
    localStorage.getItem("deliveryLocation") || ""
  );

  const [mapPosition, setMapPosition] = useState({
    lat: 33.6844,
    lon: 73.0479
  });

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  useEffect(() => {
    function updateUser() {
      setUser(JSON.parse(localStorage.getItem("user")) || null);
    }

    window.addEventListener("login", updateUser);

    return () => {
      window.removeEventListener("login", updateUser);
    };
  }, []);

  async function searchDeliveryLocation() {
    if (!deliverySearch.trim()) {
      return;
    }

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          deliverySearch
        )}`
      );

      const data = await response.json();

      if (data.length > 0) {
        const location = data[0];

        setMapPosition({
          lat: Number(location.lat),
          lon: Number(location.lon)
        });

        setDeliveryLocation(location.display_name);
        localStorage.setItem(
          "deliveryLocation",
          location.display_name
        );
      } else {
        setDeliveryLocation("Location not found");
      }
    } catch (error) {
      setDeliveryLocation("Unable to find location");
    }
  }

  function getCurrentLocation() {
    if (!navigator.geolocation) {
      setDeliveryLocation(
        "Location is not supported by your browser"
      );
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        setMapPosition({
          lat: lat,
          lon: lon
        });

        const currentLocation = `Current location: ${lat.toFixed(
          5
        )}, ${lon.toFixed(5)}`;

        setDeliveryLocation(currentLocation);
        localStorage.setItem(
          "deliveryLocation",
          currentLocation
        );
      },
      () => {
        setDeliveryLocation(
          "Unable to get your current location"
        );
      }
    );
  }

  const branches = [
    {
      name: "F-7 New Islamabad",
      address: "13-K Bhittai Road"
    },
    {
      name: "F-10 Markaz Islamabad",
      address: "Plot no 2-D Sector F-10 Islamabad"
    },
    {
      name: "I-8 Markaz Islamabad",
      address:
        "Shop No. 26, Pakland Plaza, I-8 Markaz, Islamabad"
    }
  ];

  function selectPickup() {
    setOrderType("pickup");
    localStorage.setItem("orderType", "pickup");

    setDeliveryLocation("");
    localStorage.removeItem("deliveryLocation");

    setBranchOpen(true);
  }

  function chooseBranch(branch) {
    setSelectedBranch(branch);
    localStorage.setItem(
      "selectedBranch",
      JSON.stringify(branch)
    );

    setBranchOpen(false);
  }

  function selectDelivery() {
    setOrderType("delivery");
    localStorage.setItem("orderType", "delivery");

    setSelectedBranch("");
    localStorage.removeItem("selectedBranch");

    setDeliveryOpen(true);
  }

  return (
    <>
      <nav className="navbar">

        <div className="nav-left">

          <button
            className="menu-button"
            onClick={() => setMenuOpen(true)}
          >
            ☰
          </button>

          <Link to="/" className="logo">
            🍔 CraveHub
          </Link>

        </div>

        <div className="search-box">

          🔍

          <input
            type="text"
            placeholder="Find in CraveHub"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

          {searchText && (
            <div className="search-results">

              {products
                .filter((product) =>
                  product.name
                    .toLowerCase()
                    .includes(searchText.toLowerCase())
                )
                .map((product) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    onClick={() => setSearchText("")}
                    className="search-result-item"
                  >
                    <span>{product.name}</span>
                    <small>{product.category}</small>
                  </Link>
                ))}

              {products.filter((product) =>
                product.name
                  .toLowerCase()
                  .includes(searchText.toLowerCase())
              ).length === 0 && (
                <p className="no-search-result">
                  No products found
                </p>
              )}

            </div>
          )}

        </div>

        <div className="order-options">

          <button
            className={
              orderType === "delivery" ? "active" : ""
            }
            onClick={selectDelivery}
          >
            Home Delivery
          </button>

          <button
            className={
              orderType === "pickup" ? "active" : ""
            }
            onClick={selectPickup}
          >
            Pick-up
          </button>

        </div>

        <div
          className="location-box"
          onClick={() => {
            if (orderType === "pickup") {
              setBranchOpen(true);
            } else {
              setDeliveryOpen(true);
            }
          }}
        >

          📍

          <input
            type="text"
            readOnly={orderType === "pickup"}
            value={
              orderType === "pickup" && selectedBranch
                ? selectedBranch.name
                : orderType === "delivery"
                ? deliveryLocation
                : ""
            }
            placeholder={
              orderType === "delivery"
                ? "Enter delivery location"
                : "Select pickup location"
            }
          />

        </div>

        <div className="nav-right">

          <Link to="/cart" className="nav-button">
            🛒 Cart
          </Link>

          {user ? (
            <>
              <span className="nav-button">
                {user.name}
              </span>

              <button
                className="nav-button"
                onClick={() => {
                  localStorage.removeItem("user");
                  setUser(null);
                  window.location.href = "/";
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="nav-button">
              Login
            </Link>
          )}

        </div>

      </nav>

      {menuOpen && (
        <div className="side-menu">

          <button
            className="close-menu"
            onClick={() => setMenuOpen(false)}
          >
            ✕
          </button>

          {user ? (
            <div className="menu-profile">
              👤
              <h3>{user.name}</h3>
              <p>Logged in</p>
            </div>
          ) : (
            <Link
              to="/login"
              className="menu-profile"
              onClick={() => setMenuOpen(false)}
            >
              👤
              <h3>Login to explore</h3>
            </Link>
          )}

          <hr />

          <div className="mobile-order-options">

            <button
              onClick={() => {
                selectDelivery();
                setMenuOpen(false);
              }}
            >
              🏠 Home Delivery
            </button>

            <button
              onClick={() => {
                selectPickup();
                setMenuOpen(false);
              }}
            >
              🥡 Pick-up
            </button>

          </div>

          <Link
            to="/menu"
            onClick={() => setMenuOpen(false)}
          >
            🍽️ Explore Menu
          </Link>

          <Link
            to="/orders"
            onClick={() => setMenuOpen(false)}
          >
            📦 Order History
          </Link>

          {user && user.role === "admin" && (
            <Link to="/admin-orders" onClick={() => setMenuOpen(false)}>
              Admin Orders
              </Link>
            )}

          <Link
            to="/branches"
            className="branch-locator-button"
            onClick={() => setMenuOpen(false)}
          >
            🏪 Branch Locator
          </Link>

          <hr />

          <Link
            to="/blog"
            onClick={() => setMenuOpen(false)}
          >
            Blog
          </Link>

          <Link
            to="/privacy"
            onClick={() => setMenuOpen(false)}
          >
            Privacy Policy
          </Link>

        </div>
      )}

      {branchOpen && (
        <div className="branch-overlay">

          <div className="branch-modal">

            <button
              className="branch-close"
              onClick={() => setBranchOpen(false)}
            >
              ✕
            </button>

            <h2>Choose a Pickup Branch</h2>

            <p>
              Select a branch for your pickup order.
            </p>

            <div className="branch-list">

              {branches.map((branch) => (
                <div
                  className="branch-item"
                  key={branch.name}
                  onClick={() => chooseBranch(branch)}
                >

                  <div>
                    <h3>{branch.name}</h3>
                    <p>{branch.address}</p>
                  </div>

                  <span>❯</span>

                </div>
              ))}

            </div>

          </div>

        </div>
      )}

      {selectedBranch &&
        !branchOpen &&
        !branchConfirmed && (
          <div className="branch-confirm-overlay">

            <div className="branch-confirm-modal">

              <button
                className="branch-confirm-close"
                onClick={() => {
                  setSelectedBranch("");
                  setBranchConfirmed(false);
                  localStorage.removeItem("selectedBranch");
                }}
              >
                ✕
              </button>

              <h2>
                Confirm Branch Selection
              </h2>

              <p>You have selected:</p>

              <h3>{selectedBranch.name}</h3>

              <p>{selectedBranch.address}</p>

              <p>
                Do you want to choose another branch?
              </p>

              <div className="branch-confirm-buttons">

                <button
                  className="change-branch"
                  onClick={() => {
                    setBranchConfirmed(false);
                    setBranchOpen(true);
                  }}
                >
                  Change branch
                </button>

                <button
                  className="proceed-branch"
                  onClick={() => {
                    setBranchConfirmed(true);
                  }}
                >
                  Proceed
                </button>

              </div>

            </div>

          </div>
        )}

      {deliveryOpen && (
        <div className="delivery-overlay">

          <div className="delivery-modal">

            <button
              className="delivery-close"
              onClick={() => setDeliveryOpen(false)}
            >
              ✕
            </button>

            <h2>Enter Address</h2>

            <p>
              Please allow location for free delivery and
              good food experience.
            </p>

            <div className="delivery-map">

              <iframe
                title="Delivery Map"
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${
                  mapPosition.lon - 0.03
                }%2C${
                  mapPosition.lat - 0.02
                }%2C${
                  mapPosition.lon + 0.03
                }%2C${
                  mapPosition.lat + 0.02
                }&layer=mapnik&marker=${
                  mapPosition.lat
                }%2C${mapPosition.lon}`}
              ></iframe>

              <div className="map-search">

                <input
                  type="text"
                  placeholder="Enter text to search"
                  value={deliverySearch}
                  onChange={(e) =>
                    setDeliverySearch(e.target.value)
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      searchDeliveryLocation();
                    }
                  }}
                />

                <button
                  onClick={searchDeliveryLocation}
                >
                  🔍
                </button>

              </div>

              <button
                className="location-button"
                onClick={getCurrentLocation}
              >
                📍
              </button>

            </div>

            <div className="selected-location">

              📍

              <span>
                {deliveryLocation ||
                  "Select your delivery location"}
              </span>

            </div>

          </div>

        </div>
      )}

    </>
  );
}

export default Navbar;