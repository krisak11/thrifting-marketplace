import sequelize from '../config/database.js';
import Category from '../models/Category.js';

const createCategory = async (name: string, parentId?: number) => {
    const category = await Category.create({ name, parentId });
    console.log(`Created category: ${category.name} (ID: ${category.id})`);
    return category;
  };
  
  const seedCategories = async () => {
    await sequelize.sync({ force: true }); // Reset categories table
  
    console.log("Seeding categories...");
  
    // ✅ Create Parent Categories
    const tops = await createCategory("Tops");
    const bottoms = await createCategory("Bottoms");
    const outerwear = await createCategory("Outerwear");
    const dresses = await createCategory("Dresses & Formalwear");
    const shoes = await createCategory("Shoes");
    const accessories = await createCategory("Accessories");
    const activewear = await createCategory("Activewear");
    const undergarments = await createCategory("Undergarments & Sleepwear");
  
    // ✅ Create Mid-Level Categories
    await createCategory("T-Shirts", tops.id);
    await createCategory("Blouses & Shirts", tops.id);
    await createCategory("Sweaters & Knits", tops.id);
    await createCategory("Hoodies & Sweatshirts", tops.id);
    await createCategory("Tank Tops & Camis", tops.id);
  
    await createCategory("Pants", bottoms.id);
    await createCategory("Shorts", bottoms.id);
    await createCategory("Skirts", bottoms.id);
  
    await createCategory("Jackets", outerwear.id);
    await createCategory("Coats", outerwear.id);
    await createCategory("Blazers", outerwear.id);
    await createCategory("Vests", outerwear.id);
  
    await createCategory("Casual Dresses", dresses.id);
    await createCategory("Formal Dresses", dresses.id);
    await createCategory("Jumpsuits & Rompers", dresses.id);
    await createCategory("Suits & Sets", dresses.id);
  
    await createCategory("Sneakers", shoes.id);
    await createCategory("Boots", shoes.id);
    await createCategory("Flats", shoes.id);
    await createCategory("Heels", shoes.id);
    await createCategory("Sandals", shoes.id);
    await createCategory("Slippers", shoes.id);
  
    await createCategory("Bags", accessories.id);
    await createCategory("Hats", accessories.id);
    await createCategory("Belts", accessories.id);
    await createCategory("Scarves & Gloves", accessories.id);
    await createCategory("Sunglasses", accessories.id);
    await createCategory("Jewelry", accessories.id);
    await createCategory("Socks & Tights", accessories.id);
  
    await createCategory("Leggings & Joggers", activewear.id);
    await createCategory("Sports Bras & Tops", activewear.id);
    await createCategory("Active Shorts", activewear.id);
    await createCategory("Jackets & Hoodies", activewear.id);
  
    await createCategory("Bras", undergarments.id);
    await createCategory("Panties & Boxers", undergarments.id);
    await createCategory("Sleepwear", undergarments.id);
    await createCategory("Shapewear", undergarments.id);
  
    console.log("✅ Categories seeded successfully!");
    process.exit();
  };
  
  seedCategories().catch((error) => {
    console.error("❌ Error seeding categories:", error);
    process.exit(1);
  });
  