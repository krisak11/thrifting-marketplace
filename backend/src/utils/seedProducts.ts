import sequelize from "../config/database.js";
import Product from "../models/Product.js";
import Category from "../models/Category.js";



const seedProducts = async () => {
  await sequelize.sync({ force: false }); // ⚠️ Do NOT force-reset the database

  console.log("Seeding products...");

  // ✅ Fetch category IDs by name
  const jacketsCategory = await Category.findOne({ where: { name: "Jackets" } });
  const bootsCategory = await Category.findOne({ where: { name: "Boots" } });
  const jeansCategory = await Category.findOne({ where: { name: "Pants" } });

  if (!jacketsCategory || !bootsCategory || !jeansCategory) {
    console.error("❌ Error: Some categories were not found in the database!");
    process.exit(1);
  }

  // ✅ Seed products with correct category IDs
  await Product.bulkCreate([
    {
      name: "Vintage Jacket",
      description: "A stylish jacket",
      price: 50,
      quantity: 10,
      categoryId: jacketsCategory.id, // ✅ Correct categoryId
      tags: ["Vintage"],
      imageUrl: "/uploads/vintage-jacket.png",
    },
    {
      name: "Leather Boots",
      description: "Classic boots",
      price: 75,
      quantity: 5,
      categoryId: bootsCategory.id, // ✅ Correct categoryId
      tags: ["On-Sale"],
      imageUrl: "/uploads/leather-boots.png",
    },
    {
      name: "Denim Jeans",
      description: "Comfortable and durable",
      price: 40,
      quantity: 20,
      categoryId: jeansCategory.id, // ✅ Correct categoryId
      tags: ["New-Item"],
      imageUrl: "/uploads/denim-jeans.png",
    },
  ]);

  console.log("✅ Products seeded successfully!");
  process.exit();
};

seedProducts().catch((error) => {
  console.error("❌ Error seeding products:", error);
  process.exit(1);
});
