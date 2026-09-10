const mongoose = require("mongoose");
require("dotenv").config();

const Product = require("./models/Product");

const products = [
  {
    id: 1,
    name: "Pepperoni Pizza",
    description: "A crispy thin crust topped with beef pepperoni, mozzarella cheese, and rich sauce.",
    price: 1480,
    category: "Pizza",
    image: "/images/pepronipizza.jpeg"
  },
  {
    id: 2,
    name: "Chicken Pizza",
    description: "Delicious chicken pizza prepared with fresh toppings and mozzarella cheese.",
    price: 1299,
    category: "Pizza",
    image: "/images/chickenpizza.jpeg"
  },
  {
    id: 3,
    name: "Cheese Pizza",
    description: "Freshly baked pizza loaded with delicious melted cheese.",
    price: 999,
    category: "Pizza",
    image: "/images/cheezepizza.jpeg"
  },
  {
    id: 4,
    name: "Zinger Burger",
    description: "Crispy chicken fillet with fresh vegetables and special sauce.",
    price: 499,
    category: "Burgers",
    image: "/images/zingerburger.jpeg"
  },
  {
    id: 5,
    name: "Patty Burger",
    description: "Crispy chicken burger served with fresh ingredients and delicious sauce.",
    price: 549,
    category: "Burgers",
    image: "/images/pattyburger.jpeg"
  },
  {
    id: 6,
    name: "Cheese Burger",
    description: "Juicy chicken burger topped with melted cheese and fresh vegetables.",
    price: 599,
    category: "Burgers",
    image: "/images/cheezeburger.jpeg"
  },
  {
    id: 7,
    name: "Chicken Wings",
    description: "Crispy and flavorful chicken wings prepared fresh for you.",
    price: 599,
    category: "Chicken",
    image: "/images/chickenwings.jpeg"
  },
  {
    id: 8,
    name: "Chicken Platter",
    description: "A tasty combination of delicious chicken items served together.",
    price: 799,
    category: "Chicken",
    image: "/images/chickenplatter.jpeg"
  },
  {
    id: 9,
    name: "Chicken Strips",
    description: "Tender and crispy chicken strips served with our special sauce.",
    price: 549,
    category: "Chicken",
    image: "/images/chickenstrips.jpeg"
  },
  {
    id: 10,
    name: "Loaded Fries",
    description: "Crispy fries loaded with delicious toppings and sauces.",
    price: 399,
    category: "Fries",
    image: "/images/loaderfries.jpeg"
  },
  {
    id: 11,
    name: "Cheese Fries",
    description: "Golden crispy fries covered with melted cheese.",
    price: 449,
    category: "Fries",
    image: "/images/cheezefries.jpeg"
  },
  {
    id: 12,
    name: "Masala Fries",
    description: "Crispy fries seasoned with our special spicy masala.",
    price: 299,
    category: "Fries",
    image: "/images/masalafries.jpeg"
  },
  {
    id: 13,
    name: "Chicken Sandwich",
    description: "Fresh sandwich filled with crispy chicken and vegetables.",
    price: 499,
    category: "Sandwiches",
    image: "/images/chickensandwich.jpeg"
  },
  {
    id: 14,
    name: "Club Sandwich",
    description: "A delicious layered sandwich with chicken, cheese and fresh vegetables.",
    price: 599,
    category: "Sandwiches",
    image: "/images/clubsandwich.jpeg"
  },
  {
    id: 15,
    name: "Grilled Sandwich",
    description: "Grilled sandwich prepared with tasty chicken and melted cheese.",
    price: 549,
    category: "Sandwiches",
    image: "/images/grillsandwich.jpeg"
  },
  {
    id: 16,
    name: "Cold Drink",
    description: "Refreshing chilled soft drink served cold.",
    price: 150,
    category: "Drinks",
    image: "/images/colddrink.jpeg"
  },
  {
    id: 17,
    name: "Fresh Lemonade",
    description: "Fresh and refreshing lemonade perfect with any meal.",
    price: 250,
    category: "Drinks",
    image: "/images/freshlemonade.jpeg"
  },
  {
    id: 18,
    name: "Iced Tea",
    description: "Refreshing chilled iced tea with a delicious taste.",
    price: 220,
    category: "Drinks",
    image: "/images/icedtea.jpeg"
  },
  {
    id: 19,
    name: "Chocolate Cake",
    description: "Soft and delicious chocolate cake with rich chocolate flavor.",
    price: 399,
    category: "Desserts",
    image: "/images/chocolatecake.jpeg"
  },
  {
    id: 20,
    name: "Chocolate Brownie",
    description: "Warm and delicious chocolate brownie for a perfect sweet treat.",
    price: 299,
    category: "Desserts",
    image: "/images/chocolatebrownie.jpeg"
  },
  {
    id: 21,
    name: "Ice Cream",
    description: "Creamy and refreshing ice cream served with your favorite meal.",
    price: 250,
    category: "Desserts",
    image: "/images/icecream.jpeg"
  },
  {
    id: 22,
    name: "Family Deal",
    description: "A delicious combination of pizza, burgers, fries and drinks for the family.",
    price: 2499,
    category: "Deals",
    image: "/images/familydeal.jpeg"
  },
  {
    id: 23,
    name: "Friends Deal",
    description: "A tasty meal deal made for sharing with friends.",
    price: 1799,
    category: "Deals",
    image: "/images/friendsdeal.jpeg"
  },
  {
    id: 24,
    name: "Special Deal",
    description: "Enjoy a special combination of our favorite food items at a great price.",
    price: 1999,
    category: "Deals",
    image: "/images/specialdeal.jpeg"
  }
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    await Product.deleteMany();
    await Product.insertMany(products);

    console.log("24 products added successfully");

    mongoose.connection.close();
  })
  .catch((error) => {
    console.log("Error:", error.message);
  });