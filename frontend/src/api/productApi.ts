import api from "./api"; // Import the API handler

// ✅ API calls for Products
export const fetchProducts = async (category: string) => {
  try {
    const response = await api.get(`/products?category=${category}`);
    return response.data;
  } catch (error: unknown) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
