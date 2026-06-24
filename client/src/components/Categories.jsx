function Categories() {
  const categories = [
    "Mobiles",
    "Laptops",
    "Fashion",
    "Shoes",
    "Watches",
    "Gaming",
    "Books",
    "Accessories",
    "Electronics",
    "Home Appliances",
  ];

  return (
    <div className="categories">
      {categories.map((cat) => (
        <button key={cat}>
          {cat}
        </button>
      ))}
    </div>
  );
}

export default Categories;