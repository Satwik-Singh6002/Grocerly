import React, { createContext, useContext, useState } from "react";

// Combined product data with unique ids and categories
const allProducts = [
  // OilAndGhee
  {
    id: "oil-1",
    name: "Fortune Sunflower Oil 1L",
    price: 130,
    imageUrl:
      "https://m.media-amazon.com/images/I/41wYtZkL69L._UF1000,1000_QL80_.jpg",
    tag: "Best Seller",
    category: "Oil & Ghee",
  },
  // ...[rest of your Oil & Ghee products]
  {
    id: "oil-9",
    name: "Nature Fresh Acti Lite Oil 1L",
    price: 135,
    imageUrl:
      "https://m.media-amazon.com/images/I/81QrG08A71L._UF1000,1000_QL80_.jpg",
    tag: "Low Absorption",
    category: "Oil & Ghee",
  },

  // Rice
  {
    id: "rice-1",
    name: "India Gate Basmati Rice 1kg",
    price: 125,
    imageUrl: "https://m.media-amazon.com/images/I/81mHz4XKK0L.jpg",
    tag: "Basmati",
    category: "Rice",
  },
  // ...[rest of your Rice products]
  {
    id: "rice-9",
    name: "Tilda Basmati Rice 1kg",
    price: 220,
    imageUrl: "https://m.media-amazon.com/images/I/71SRL6dUx0L._UF1000,1000_QL80_.jpg",
    tag: "Export Quality",
    category: "Rice",
  },

  // Snacks
  {
    id: "snack-01",
    name: "Kurkure Masala Munch 100g",
    imageUrl:
      "https://tiimg.tistatic.com/fp/1/007/694/100-vegetarian-fantastic-crunch-spicy-combo-kurkure-masala-munch-089.jpg",
    price: 20,
    tag: "Best Seller",
    category: "Snacks",
  },
  // ...[rest of your Snacks products]
  {
    id: "snack-09",
    name: "Pringles Original 107g",
    imageUrl:
      "https://www.bbassets.com/media/uploads/p/l/100550_16-pringles-original.jpg",
    price: 99,
    tag: "Premium",
    category: "Snacks",
  },

  // Spices
  {
    id: "spice-1",
    name: "Everest Red Chilli Powder 200g",
    price: 65,
    tag: "Bestseller",
    imageUrl:
      "https://www.jiomart.com/images/product/original/490000128/everest-tikhalal-chilli-powder-200-g-product-images-o490000128-p490000128-0-202203151831.jpg",
    category: "Spices",
  },
  // ...[rest of your Spices products]
  {
    id: "spice-9",
    name: "MDH Rajmah Masala 100g",
    price: 47,
    tag: "Rich Flavor",
    imageUrl: "https://m.media-amazon.com/images/I/61sUPHRHVxL._UF894,1000_QL80_.jpg",
    category: "Spices",
  },

  // Vegetables
  {
    id: "veg-1",
    name: "Fresh Tomatoes (1kg)",
    price: 40,
    imageUrl:
      "https://m.media-amazon.com/images/I/61ZJhcdG7LL._UF894,1000_QL80_.jpg",
    tag: "Daily Use",
    category: "Vegetables",
  },
  // ...[rest of your Vegetables products]
  {
    id: "veg-9",
    name: "Brinjal (500g)",
    price: 38,
    imageUrl:
      "https://www.jiomart.com/images/product/original/590003544/brinjal-black-big-500-g-product-images-o590003544-p590003544-0-202410011659.jpg?im=Resize=(420,420)",
    tag: "Tasty Pick",
    category: "Vegetables",
  },

  // ----- New Category: FrozenFoods -----
  {
    id: "frozen-1",
    name: "McCain French Fries (750g)",
    price: 120,
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkZRz4Z9CFPX3oynhkK0Cx-cCg38mJXYOlIA&s",
    tag: "Crispy",
    category: "Frozen Foods",
  },
  {
    id: "frozen-2",
    name: "Sumeru Green Peas (500g)",
    price: 85,
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGHanaxYx74IS-IMLbrHWE1MuCxVgSBq-tLA&s",
    tag: "Fresh Frozen",
    category: "Frozen Foods",
  },
  {
    id: "frozen-3",
    name: "Godrej Yummiez Chicken Nuggets (400g)",
    price: 180,
    imageUrl: "https://m.media-amazon.com/images/I/61p3fjlJl0L.jpg",
    tag: "Best Seller",
    category: "Frozen Foods",
  },
  {
    id: "frozen-4",
    name: "ITC Master Chef Veg Patty (500g)",
    price: 110,
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6eRXNEzTP_Z1uiZGKRmQlQqg2iBViXZreKQ&s",
    tag: "Snack Time",
    category: "Frozen Foods",
  },
  {
    id: "frozen-5",
    name: "Mother Dairy Ice Cream Vanilla (1L)",
    price: 160,
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTFpMvvJGBq7hbByeFAIWB5uVM74dh58fRhA&s",
    tag: "Dessert",
    category: "Frozen Foods",
  },
  {
    id: "frozen-6",
    name: "McCain Aloo Tikki (420g)",
    price: 105,
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHx-fDfksaR18P1cDY73TAHvT_aTmJATD_TQ&s",
    tag: "Popular",
    category: "Frozen Foods",
  },
  {
    id: "frozen-7",
    name: "Safal Mixed Veg (500g)",
    price: 70,
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa6mugqQd6fNj2sIdBhHhTlSwLnzzVjaDC_Q&s",
    tag: "Healthy Mix",
    category: "Frozen Foods",
  },
  {
    id: "frozen-8",
    name: "Amul Frozen Paneer (200g)",
    price: 90,
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuHgn-wVz0T5IOg-dklTTuAtDFF4bBAKGEHQ&s",
    tag: "Protein Rich",
    category: "Frozen Foods",
  },
  {
    id: "frozen-9",
    name: "Vadilal Ice Cream Choco Bar (70ml)",
    price: 25,
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_CfVs11yqZY-HnXNGr_2ONIg-WIXVaxvOJw&s",
    tag: "Kids Favorite",
    category: "Frozen Foods",
  },

  // ----- New Category: Fruit -----
  {
    id: "fruit-1",
    name: "Fresh Apples (1kg)",
    price: 180,
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuuNjANsr--1acwUzfK8cT2DFXibiktnzlyw&s",
    tag: "Bestseller",
    category: "Fruit",
  },
  {
    id: "fruit-2",
    name: "Bananas (Dozen)",
    price: 60,
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1ZmGkn6WbrNqrTGlyK0zv0F2p4c6R6_-Icg&s",
    tag: "Daily Use",
    category: "Fruit",
  },
  {
    id: "fruit-3",
    name: "Seedless Grapes (500g)",
    price: 90,
    imageUrl: "https://m.media-amazon.com/images/I/71xGBrNnv2L.jpg",
    tag: "Sweet Pick",
    category: "Fruit",
  },
  {
    id: "fruit-4",
    name: "Kiwis Imported (3 pcs)",
    price: 120,
    imageUrl:
      "https://www.jiomart.com/images/product/original/590009674/kiwi-imported-3-pcs-pack-product-images-o590009674-p590317377-1-202408070949.jpg?im=Resize=(420,420)",
    tag: "Exotic",
    category: "Fruit",
  },
  {
    id: "fruit-5",
    name: "Fresh Papaya (Medium)",
    price: 75,
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTda2i4bz29qWYeRC6pBCi5xDz3EcHtsVR3LA&s",
    tag: "Immunity Boost",
    category: "Fruit",
  },
  {
    id: "fruit-6",
    name: "Fresh Mangoes (1kg)",
    price: 140,
    imageUrl:
      "https://m.media-amazon.com/images/I/31cXlUcvRVL._UF894,1000_QL80_.jpg",
    tag: "Seasonal",
    category: "Fruit",
  },
  {
    id: "fruit-7",
    name: "Oranges Imported (1kg)",
    price: 110,
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAV8YmdiUIR1WMsH9GSK5QE_ZRXC55NG6ifQ&s",
    tag: "Vitamin C",
    category: "Fruit",
  },
  {
    id: "fruit-8",
    name: "Pomegranate (500g)",
    price: 95,
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8E59K88g7bJk3jNIIbdnNWOLihPjARBH9OA&s",
    tag: "Rich in Iron",
    category: "Fruit",
  },
  {
    id: "fruit-9",
    name: "Strawberries (200g)",
    price: 85,
    imageUrl:
      "https://www.bbassets.com/media/uploads/p/l/10000263_15-fresho-strawberry.jpg",
    tag: "Fresh Pick",
    category: "Fruit",
  },
  // ... existing products ...

// Dal & Pulses
{
  id: "dal-1",
  name: "Toor Dal (Arhar) 1kg",
  price: 120,
  imageUrl:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjXYkxP6Zy5N3MJ9-Y60q2fBZJb1QpKwOthw&s",
  tag: "Popular",
  category: "Dal & Pulses",
},
{
  id: "dal-2",
  name: "Moong Dal 1kg",
  price: 110,
  imageUrl:
    "https://m.media-amazon.com/images/I/51vOw3aI7vL._SX466_.jpg",
  tag: "Healthy",
  category: "Dal & Pulses",
},
{
  id: "dal-3",
  name: "Chana Dal 1kg",
  price: 105,
  imageUrl:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJbCGf-OwKTxDMjPB5z0dH5u9Uln6zCU2i1A&s",
  tag: "Rich Protein",
  category: "Dal & Pulses",
},
{
  id: "dal-4",
  name: "Urad Dal 1kg",
  price: 115,
  imageUrl:
    "https://m.media-amazon.com/images/I/51qILi+uP0L._SX466_.jpg",
  tag: "Fiber Rich",
  category: "Dal & Pulses",
},
{
  id: "dal-5",
  name: "Masoor Dal 1kg",
  price: 100,
  imageUrl:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTigCyxN9txBxjyfLSQVLpRka5D7f-2-v54rg&s",
  tag: "Bestseller",
  category: "Dal & Pulses",
},
{
  id: "dal-6",
  name: "Rajma 1kg",
  price: 130,
  imageUrl:
    "https://m.media-amazon.com/images/I/61K2Z5bQ8eL._SX466_.jpg",
  tag: "High Fiber",
  category: "Dal & Pulses",
},
{
  id: "dal-7",
  name: "Black Chana 1kg",
  price: 115,
  imageUrl:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq6L_W6C5tyFZPPLymnY79xgFwT8nsRyOLzw&s",
  tag: "Rich Protein",
  category: "Dal & Pulses",
},
{
  id: "dal-8",
  name: "Kabuli Chana 1kg",
  price: 120,
  imageUrl:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiz5ZkAQ0xb9LUiVK3l-TuJHplORWLo7qNmQ&s",
  tag: "Nutritious",
  category: "Dal & Pulses",
},
{
  id: "dal-9",
  name: "Green Moong Whole 1kg",
  price: 110,
  imageUrl:
    "https://m.media-amazon.com/images/I/51HZ5A1E75L._SX466_.jpg",
  tag: "Healthy Choice",
  category: "Dal & Pulses",
},

// Dairy
{
  id: "dairy-1",
  name: "Amul Full Cream Milk 1L",
  price: 60,
  imageUrl:
    "https://m.media-amazon.com/images/I/71qP5Kn52QL._SL1500_.jpg",
  tag: "Fresh",
  category: "Dairy",
},
{
  id: "dairy-2",
  name: "Mother Dairy Paneer 200g",
  price: 90,
  imageUrl:
    "https://m.media-amazon.com/images/I/51MpSc1t0rL._SX679_.jpg",
  tag: "Soft",
  category: "Dairy",
},
{
  id: "dairy-3",
  name: "Amul Butter 500g",
  price: 220,
  imageUrl:
    "https://m.media-amazon.com/images/I/81HnVLmT4oL._SX679_.jpg",
  tag: "Creamy",
  category: "Dairy",
},
{
  id: "dairy-4",
  name: "Amul Cheese Slices 200g",
  price: 130,
  imageUrl:
    "https://m.media-amazon.com/images/I/61gYMrDdS-L._SX679_.jpg",
  tag: "Tasty",
  category: "Dairy",
},
{
  id: "dairy-5",
  name: "Nestle Everyday Milk Powder 500g",
  price: 210,
  imageUrl:
    "https://m.media-amazon.com/images/I/61zFdrsi6uL._SX679_.jpg",
  tag: "Nutritious",
  category: "Dairy",
},
{
  id: "dairy-6",
  name: "Amul Fresh Cream 200ml",
  price: 90,
  imageUrl:
    "https://m.media-amazon.com/images/I/61qptlpSKDL._SX679_.jpg",
  tag: "Rich",
  category: "Dairy",
},
{
  id: "dairy-7",
  name: "Britannia Yogurt 500g",
  price: 65,
  imageUrl:
    "https://m.media-amazon.com/images/I/71B+HPv5rhL._SX679_.jpg",
  tag: "Healthy",
  category: "Dairy",
},
{
  id: "dairy-8",
  name: "Amul Ice Cream Vanilla 1L",
  price: 160,
  imageUrl:
    "https://m.media-amazon.com/images/I/71osG2zNUmL._SX679_.jpg",
  tag: "Dessert",
  category: "Dairy",
},
{
  id: "dairy-9",
  name: "Nestle Milkmaid 400g",
  price: 150,
  imageUrl:
    "https://m.media-amazon.com/images/I/71v0B8uVufL._SX679_.jpg",
  tag: "Sweetener",
  category: "Dairy",
},
// Atta & Flour
{
  id: "atta-1",
  name: "Aashirvaad Whole Wheat Atta 5kg",
  price: 220,
  imageUrl:
    "https://m.media-amazon.com/images/I/61OQyq8Y1DL._SX679_.jpg",
  tag: "Premium",
  category: "Atta & Flour",
},
{
  id: "atta-2",
  name: "Pillsbury Chakki Fresh Atta 5kg",
  price: 210,
  imageUrl:
    "https://m.media-amazon.com/images/I/71LwoZ6KQ1L._SX679_.jpg",
  tag: "Fresh",
  category: "Atta & Flour",
},
{
  id: "atta-3",
  name: "Rajdhani Besan 1kg",
  price: 110,
  imageUrl:
    "https://m.media-amazon.com/images/I/51KshTbJqPL._SX679_.jpg",
  tag: "Quality",
  category: "Atta & Flour",
},
{
  id: "atta-4",
  name: "Golden Harvest Maida 1kg",
  price: 55,
  imageUrl:
    "https://m.media-amazon.com/images/I/61UOKa4qGoL._SX679_.jpg",
  tag: "Soft Flour",
  category: "Atta & Flour",
},
{
  id: "atta-5",
  name: "Shakti Bhog Suji 1kg",
  price: 50,
  imageUrl:
    "https://m.media-amazon.com/images/I/51pCx2avF1L._SX679_.jpg",
  tag: "Fine Quality",
  category: "Atta & Flour",
},
{
  id: "atta-6",
  name: "Annapurna Whole Wheat Atta 10kg",
  price: 430,
  imageUrl:
    "https://m.media-amazon.com/images/I/71WJzKZ4n8L._SX679_.jpg",
  tag: "Family Pack",
  category: "Atta & Flour",
},
{
  id: "atta-7",
  name: "Aashirvaad Sharbati Atta 5kg",
  price: 230,
  imageUrl:
    "https://m.media-amazon.com/images/I/71yx4jhRXfL._SX679_.jpg",
  tag: "Premium Quality",
  category: "Atta & Flour",
},
{
  id: "atta-8",
  name: "Pillsbury Sooji (Rava) 1kg",
  price: 65,
  imageUrl:
    "https://m.media-amazon.com/images/I/51MNhRGzqzL._SX679_.jpg",
  tag: "Fine Grain",
  category: "Atta & Flour",
},
{
  id: "atta-9",
  name: "Rajdhani Wheat Flour 5kg",
  price: 210,
  imageUrl:
    "https://m.media-amazon.com/images/I/71yUR3OS61L._SX679_.jpg",
  tag: "Trusted",
  category: "Atta & Flour",
},

// Beverages
{
  id: "bev-1",
  name: "Coca-Cola 1.25L",
  price: 60,
  imageUrl:
    "https://m.media-amazon.com/images/I/61G4AFOdtRL._SX679_.jpg",
  tag: "Popular",
  category: "Beverages",
},
{
  id: "bev-2",
  name: "Tata Tea Premium 500g",
  price: 180,
  imageUrl:
    "https://m.media-amazon.com/images/I/71v2tRZkN0L._SX679_.jpg",
  tag: "Quality Tea",
  category: "Beverages",
},
{
  id: "bev-3",
  name: "Nescafe Classic Coffee 200g",
  price: 150,
  imageUrl:
    "https://m.media-amazon.com/images/I/61NEkD+gAfL._SX679_.jpg",
  tag: "Instant Coffee",
  category: "Beverages",
},
{
  id: "bev-4",
  name: "Paper Boat Mango Drink 1L",
  price: 90,
  imageUrl:
    "https://m.media-amazon.com/images/I/61dLXJ9V5DL._SX679_.jpg",
  tag: "Natural",
  category: "Beverages",
},
{
  id: "bev-5",
  name: "Real Fruit Juice Orange 1L",
  price: 110,
  imageUrl:
    "https://m.media-amazon.com/images/I/71mkxVtqTfL._SX679_.jpg",
  tag: "Fresh Juice",
  category: "Beverages",
},
{
  id: "bev-6",
  name: "Red Bull Energy Drink 250ml",
  price: 120,
  imageUrl:
    "https://m.media-amazon.com/images/I/71XP06xWfJL._SX679_.jpg",
  tag: "Energy Boost",
  category: "Beverages",
},
{
  id: "bev-7",
  name: "Tropicana Mixed Fruit Juice 1L",
  price: 140,
  imageUrl:
    "https://m.media-amazon.com/images/I/71RhIQcCRxL._SX679_.jpg",
  tag: "Healthy",
  category: "Beverages",
},
{
  id: "bev-8",
  name: "Kinley Mineral Water 1L",
  price: 20,
  imageUrl:
    "https://m.media-amazon.com/images/I/51LHqtP3RRL._SX679_.jpg",
  tag: "Pure Water",
  category: "Beverages",
},
{
  id: "bev-9",
  name: "Sprite 1.25L",
  price: 60,
  imageUrl:
    "https://m.media-amazon.com/images/I/61fXy7sWuqL._SX679_.jpg",
  tag: "Refreshing",
  category: "Beverages",
},

// Bakery
{
  id: "bakery-1",
  name: "Britannia Butter Cake 300g",
  price: 70,
  imageUrl:
    "https://m.media-amazon.com/images/I/71SjdvyT89L._SX679_.jpg",
  tag: "Soft & Fresh",
  category: "Bakery",
},
{
  id: "bakery-2",
  name: "Dukes Plain Croissant 75g",
  price: 35,
  imageUrl:
    "https://m.media-amazon.com/images/I/61qAcyZ6qJL._SX679_.jpg",
  tag: "Flaky",
  category: "Bakery",
},
{
  id: "bakery-3",
  name: "Britannia Good Day Cashew Cookies 60g",
  price: 40,
  imageUrl:
    "https://m.media-amazon.com/images/I/71cKaNQHYhL._SX679_.jpg",
  tag: "Crunchy",
  category: "Bakery",
},
{
  id: "bakery-4",
  name: "Mrs. Bector's Little Debbie 100g",
  price: 30,
  imageUrl:
    "https://m.media-amazon.com/images/I/71A1T3c1h8L._SX679_.jpg",
  tag: "Sweet Treat",
  category: "Bakery",
},
{
  id: "bakery-5",
  name: "Britannia Treat Cake 300g",
  price: 65,
  imageUrl:
    "https://m.media-amazon.com/images/I/71EvnI-MDxL._SX679_.jpg",
  tag: "Delicious",
  category: "Bakery",
},
{
  id: "bakery-6",
  name: "Dukes Choco Chip Cookies 100g",
  price: 50,
  imageUrl:
    "https://m.media-amazon.com/images/I/71UYRvdRmNL._SX679_.jpg",
  tag: "Chocolatey",
  category: "Bakery",
},
{
  id: "bakery-7",
  name: "Britannia Little Debbie Treat 60g",
  price: 25,
  imageUrl:
    "https://m.media-amazon.com/images/I/71IwnE3HY6L._SX679_.jpg",
  tag: "Tasty",
  category: "Bakery",
},
{
  id: "bakery-8",
  name: "Britannia Swiss Roll 45g",
  price: 20,
  imageUrl:
    "https://m.media-amazon.com/images/I/71-mjF30qOL._SX679_.jpg",
  tag: "Soft Roll",
  category: "Bakery",
},
{
  id: "bakery-9",
  name: "Dukes Milk Cake 200g",
  price: 90,
  imageUrl:
    "https://m.media-amazon.com/images/I/61ac4l1iKBL._SX679_.jpg",
  tag: "Rich & Creamy",
  category: "Bakery",
},

// ... existing other categories ...

];

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState(allProducts);

  const searchProducts = (query) => {
    if (!query) {
      setSearchResults(allProducts);
      return;
    }
    const lowerQuery = query.toLowerCase();
    const filtered = allProducts.filter((product) =>
      product.name.toLowerCase().includes(lowerQuery)
    );
    setSearchResults(filtered);
  };

  return (
    <ProductContext.Provider
      value={{ allProducts, searchResults, searchProducts }}
    >
      {children}
    </ProductContext.Provider>
  );
};
