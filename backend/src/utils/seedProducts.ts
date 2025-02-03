import sequelize from "../config/database.js";
import Product from "../models/Product.js";
import Category from "../models/Category.js";

const seedProducts = async () => {
  await sequelize.sync({ force: false }); // Do NOT force-reset the database

  console.log("Seeding products...");

  // ✅ Fetch category IDs dynamically by name
  const categoryMap: Record<string, number | null> = {
    "Jackets": null,
    "Coats": null,
    "Vests": null,
    "Sweaters & Knits": null,
    "Blouses & Shirts": null,
    "T-Shirts": null,
    "Tank Tops & Camis": null,
    "Pants": null,
    "Shorts": null,
    "Skirts": null,
    "Dresses & Formalwear": null,
    "Boots": null,
    "Flats": null,
    "Heels": null,
    "Sneakers": null,
    "Sandals": null,
    "Sleepwear": null,
    "Belts": null,
    "Jewelry": null,
    "Sunglasses": null,
    "Undergarments & Sleepwear": null
  };

  for (const category in categoryMap) {
    const foundCategory = await Category.findOne({ where: { name: category } });
    if (foundCategory) {
      categoryMap[category] = foundCategory.id;
    } else {
      console.error(`❌ Category not found: ${category}`);
    }
  }

  // ✅ Seed products with correct category IDs
  await Product.bulkCreate([
  
    { name: "Black Fur Coat", description: "Elegant warm fur coat", price: 120, quantity: 5, categoryId: categoryMap["Coats"], tags: ["Luxury", "Winter"], imageUrl: "/uploads/black-fur-coat.webp" },
    { name: "White Fur Coat", description: "Chic fur coat for cold days", price: 130, quantity: 4, categoryId: categoryMap["Coats"], tags: ["Winter"], imageUrl: "/uploads/white-fur-coat.webp" },
    { name: "Malika Coat", description: "Long stylish coat", price: 110, quantity: 6, categoryId: categoryMap["Coats"], tags: ["Trendy"], imageUrl: "/uploads/malika-coat.webp" },
    { name: "Camel Coat", description: "Classic camel-colored coat", price: 125, quantity: 7, categoryId: categoryMap["Coats"], tags: ["Classic"], imageUrl: "/uploads/camel_coats.png" },

    { name: "Vintage Jacket", description: "A stylish vintage jacket", price: 90, quantity: 5, categoryId: categoryMap["Jackets"], tags: ["Vintage"], imageUrl: "/uploads/vintage-jacket.png" },
    { name: "Black Waistcoat", description: "Classic black waistcoat", price: 75, quantity: 6, categoryId: categoryMap["Vests"], tags: ["Formal"], imageUrl: "/uploads/black_waistcoat.webp" },

    { name: "Miska Sweater Dress", description: "Cozy sweater dress", price: 60, quantity: 10, categoryId: categoryMap["Dresses & Formalwear"], tags: ["Winter"], imageUrl: "/uploads/miska-sweater-dress-cream.webp" },
    { name: "Giya Dress Blue", description: "Chic blue evening dress", price: 85, quantity: 5, categoryId: categoryMap["Dresses & Formalwear"], tags: ["Elegant"], imageUrl: "/uploads/giya-dress-blue.webp" },
    { name: "Giya Dress White Gold", description: "Stylish white-gold dress", price: 95, quantity: 3, categoryId: categoryMap["Dresses & Formalwear"], tags: ["Luxury"], imageUrl: "/uploads/giya-dress-white-gold.webp" },

    { name: "Leather Boots", description: "Classic leather boots", price: 75, quantity: 6, categoryId: categoryMap["Boots"], tags: ["Winter"], imageUrl: "/uploads/leather-boots.png" },

    { name: "Denim Jeans", description: "Durable and stylish jeans", price: 40, quantity: 12, categoryId: categoryMap["Pants"], tags: ["Casual"], imageUrl: "/uploads/denim-jeans.png" },
    { name: "Jeans Black", description: "Trendy black denim jeans", price: 50, quantity: 8, categoryId: categoryMap["Pants"], tags: ["Trendy"], imageUrl: "/uploads/jeans-black.webp" },
    { name: "Jean Shorts Aveny", description: "Summer blue jean shorts", price: 30, quantity: 10, categoryId: categoryMap["Shorts"], tags: ["Summer"], imageUrl: "/uploads/jean-shorts-aveny-blue.webp" },

    { name: "Tank Top Fauna Black", description: "Classic black tank top", price: 20, quantity: 15, categoryId: categoryMap["Tank Tops & Camis"], tags: ["Casual"], imageUrl: "/uploads/tank-top-fauna-black.webp" },

    { name: "Noelle Blouse", description: "Elegant blouse", price: 50, quantity: 10, categoryId: categoryMap["Blouses & Shirts"], tags: ["Formal"], imageUrl: "/uploads/noelle-blouse-karmamia.webp" },

    { name: "Pink T-Shirt", description: "Soft cotton t-shirt", price: 15, quantity: 20, categoryId: categoryMap["T-Shirts"], tags: ["Casual"], imageUrl: "/uploads/pink-tshirt.png" },
    { name: "Nelenia T-Shirt Black", description: "Stylish black t-shirt", price: 18, quantity: 12, categoryId: categoryMap["T-Shirts"], tags: ["Casual"], imageUrl: "/uploads/nelenia-tshirt-black.webp" },

    { name: "Bracelet Lydia Gold", description: "Small gold bracelet", price: 30, quantity: 12, categoryId: categoryMap["Jewelry"], tags: ["Luxury"], imageUrl: "/uploads/bracelet-lydia-small-gold.webp" },
    { name: "Necklace Chase Hege Golden", description: "Elegant golden necklace", price: 45, quantity: 6, categoryId: categoryMap["Jewelry"], tags: ["Luxury"], imageUrl: "/uploads/necklace-chase-hege-golden.webp" },

    { name: "Sunglasses Paiha Meteorite", description: "Stylish dark sunglasses", price: 35, quantity: 10, categoryId: categoryMap["Sunglasses"], tags: ["Summer"], imageUrl: "/uploads/sunglasses-paiha-meteorite.webp" },

    { name: "Winther Belt Black", description: "Classic black belt", price: 25, quantity: 10, categoryId: categoryMap["Belts"], tags: ["Essential"], imageUrl: "/uploads/winther-belt-black.webp" },
    { name: "Winther Belt Black on Gold Blouse", description: "Stylish black belt with gold buckle", price: 30, quantity: 8, categoryId: categoryMap["Belts"], tags: ["Luxury"], imageUrl: "/uploads/winther-belt-black-on-gold-blouse.jpg" },

    { name: "Ichi Eldie Purse", description: "Elegant small purse", price: 55, quantity: 5, categoryId: categoryMap["Bags"], tags: ["Luxury"], imageUrl: "/uploads/ichi-eldie-purse.webp" },

    { name: "Bodypiece Brown", description: "Stylish brown bodypiece", price: 35, quantity: 10, categoryId: categoryMap["T-Shirts"], tags: ["Trendy"], imageUrl: "/uploads/bodypiece-brown.webp" },
    { name: "Bodypiece Kayita Black", description: "Elegant black bodypiece", price: 40, quantity: 8, categoryId: categoryMap["T-Shirts"], tags: ["Elegant"], imageUrl: "/uploads/bodypiece-kayita-black.webp" },
    { name: "Bodypiece Sleeveless Brown", description: "Sleeveless brown bodypiece", price: 38, quantity: 9, categoryId: categoryMap["Tank Tops & Camis"], tags: ["Trendy"], imageUrl: "/uploads/bodypiece-sleeveless-brown.webp" },
    { name: "Bodypiece V Cream", description: "V-neck cream bodypiece", price: 42, quantity: 7, categoryId: categoryMap["T-Shirts"], tags: ["Luxury"], imageUrl: "/uploads/bodypiece-v-cream.webp" },

    { name: "Freya Signature White Bra", description: "Elegant white bra", price: 25, quantity: 15, categoryId: categoryMap["Undergarments & Sleepwear"], tags: ["Comfort"], imageUrl: "/uploads/bra-freya-signature-white.png" },
    { name: "Padded Freya Fancies Bra", description: "Padded pink bra", price: 30, quantity: 12, categoryId: categoryMap["Undergarments & Sleepwear"], tags: ["Luxury"], imageUrl: "/uploads/bra-padded-freya-fancies.png" },
    { name: "Bralette Freya Pink", description: "Soft pink bralette", price: 28, quantity: 14, categoryId: categoryMap["Undergarments & Sleepwear"], tags: ["Casual"], imageUrl: "/uploads/bralette-freya-pink.png" },

    { name: "Cardigan Black with Gold Buttons", description: "Black cardigan with gold detailing", price: 55, quantity: 8, categoryId: categoryMap["Sweaters & Knits"], tags: ["Elegant"], imageUrl: "/uploads/cardigan-black-gold-buttons.webp" },

    { name: "Comfort Pants Cream", description: "Soft and comfortable cream pants", price: 45, quantity: 12, categoryId: categoryMap["Pants"], tags: ["Relaxed"], imageUrl: "/uploads/comfort-pants-cream.webp" },
    { name: "Comfort Pants Wide White", description: "Wide-leg white pants", price: 48, quantity: 10, categoryId: categoryMap["Pants"], tags: ["Casual"], imageUrl: "/uploads/comfort-pants-wide-white.webp" },
    
    { name: "Cosabella Bella Plus Sleepwear", description: "Luxury sleepwear set", price: 60, quantity: 6, categoryId: categoryMap["Sleepwear"], tags: ["Luxury"], imageUrl: "/uploads/cosabella-bella-plus-sleepwear.png" },

    { name: "Dress Pants Merle Black", description: "Formal black dress pants", price: 55, quantity: 9, categoryId: categoryMap["Pants"], tags: ["Formal"], imageUrl: "/uploads/dresspants-merle-black.webp" },

    { name: "Fauna Turtleneck White", description: "Cozy white turtleneck", price: 40, quantity: 10, categoryId: categoryMap["Sweaters & Knits"], tags: ["Winter"], imageUrl: "/uploads/fauna-turtleneck-white.webp" },

    { name: "Henva Blouse Blue", description: "Elegant blue blouse", price: 48, quantity: 10, categoryId: categoryMap["Blouses & Shirts"], tags: ["Casual"], imageUrl: "/uploads/henva-blouse-blue.webp" },

    { name: "Jean Skirt Aveny Black", description: "Trendy black jean skirt", price: 35, quantity: 12, categoryId: categoryMap["Skirts"], tags: ["Trendy"], imageUrl: "/uploads/jean-skirt-aveny-black.webp" },
    { name: "Jeans Sinem Blue", description: "Classic blue jeans", price: 50, quantity: 8, categoryId: categoryMap["Pants"], tags: ["Casual"], imageUrl: "/uploads/jeans-sinem-blue.webp" },

    { name: "Kelly Dress Green", description: "Chic green dress", price: 85, quantity: 6, categoryId: categoryMap["Dresses & Formalwear"], tags: ["Elegant"], imageUrl: "/uploads/kelly-dress-green.webp" },

    { name: "Leather Leggings", description: "Trendy leather leggings", price: 65, quantity: 8, categoryId: categoryMap["Pants"], tags: ["Trendy"], imageUrl: "/uploads/leather-leggings.png" },
    { name: "Leggings Tabea Black", description: "Stretchy black leggings", price: 40, quantity: 12, categoryId: categoryMap["Pants"], tags: ["Activewear"], imageUrl: "/uploads/leggings-tabea-black.webp" },

    { name: "Liz Shorts Sleepwear Pink", description: "Comfortable pink sleep shorts", price: 25, quantity: 10, categoryId: categoryMap["Sleepwear"], tags: ["Comfort"], imageUrl: "/uploads/liz-shorts-sleepwear-pink.png" },

    { name: "Lotte Top Black", description: "Trendy black top", price: 32, quantity: 10, categoryId: categoryMap["Blouses & Shirts"], tags: ["Casual"], imageUrl: "/uploads/lotte-top-black.webp" },
    { name: "Lotte Top White", description: "Classic white top", price: 32, quantity: 10, categoryId: categoryMap["Blouses & Shirts"], tags: ["Casual"], imageUrl: "/uploads/lotte-top-white.webp" },

    { name: "Mitine Top Red", description: "Red fitted top", price: 28, quantity: 10, categoryId: categoryMap["Blouses & Shirts"], tags: ["Trendy"], imageUrl: "/uploads/mitine-top-red.webp" },
    { name: "Mylle Sweater Gray", description: "Cozy gray sweater", price: 50, quantity: 9, categoryId: categoryMap["Sweaters & Knits"], tags: ["Winter"], imageUrl: "/uploads/mylle-sweater-gray.webp" },

    { name: "Palma Mesh Top Black", description: "Stylish mesh top", price: 35, quantity: 8, categoryId: categoryMap["Blouses & Shirts"], tags: ["Trendy"], imageUrl: "/uploads/palma-meshtop-black.webp" },

    { name: "Panties HW Fantasie Smoothease", description: "Comfortable seamless panties", price: 15, quantity: 20, categoryId: categoryMap["Undergarments & Sleepwear"], tags: ["Comfort"], imageUrl: "/uploads/panties-hw-fantasie-smoothease.jpg" },

    { name: "Ranjat Shirt Red", description: "Casual red t-shirt", price: 20, quantity: 15, categoryId: categoryMap["T-Shirts"], tags: ["Casual"], imageUrl: "/uploads/ranjat-shirt-red.webp" },

    { name: "Shorts Saidi", description: "Relaxed fit shorts", price: 28, quantity: 12, categoryId: categoryMap["Shorts"], tags: ["Casual"], imageUrl: "/uploads/shorts-saidi.webp" },

    { name: "Skirt Estera Pleated", description: "Pleated stylish skirt", price: 40, quantity: 10, categoryId: categoryMap["Skirts"], tags: ["Trendy"], imageUrl: "/uploads/skirt-estera-pleated.jpg" },
    { name: "Skirt Umeko", description: "Casual and comfortable skirt", price: 38, quantity: 10, categoryId: categoryMap["Skirts"], tags: ["Casual"], imageUrl: "/uploads/skirt-umeko.webp" },

    { name: "Tamara Top Black", description: "Trendy black top", price: 30, quantity: 10, categoryId: categoryMap["Blouses & Shirts"], tags: ["Trendy"], imageUrl: "/uploads/tamara-top-black.webp" },

    { name: "Varga T-Shirt White", description: "Classic white t-shirt", price: 18, quantity: 15, categoryId: categoryMap["T-Shirts"], tags: ["Casual"], imageUrl: "/uploads/varga-tshirt-white.webp" },



]);

  console.log("✅ Products seeded successfully!");
  process.exit();
};

seedProducts().catch((error) => {
  console.error("❌ Error seeding products:", error);
  process.exit(1);
});
