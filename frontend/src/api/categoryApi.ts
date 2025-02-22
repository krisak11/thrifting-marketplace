import api from "./api.js"; // Import the API handler

// 📦 **Fetch all categories**
export const fetchCategories = async () => {
  try {
    const response = await api.get("/api/categories-images");
    return response.data;
  } catch (error: unknown) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};
