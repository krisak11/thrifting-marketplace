import api from "./api.js"; // Import the API handler

// 📦 **Fetch all categories**
export const fetchCategoryById = async (parentId: number | null = null) => {
  try {
    const response = await api.get("/api/categories-images", {
        params: {parentId: parentId ?? ""}, // Append parentId to request
    });
    return response.data;
  } catch (error: unknown) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const fetchCategoryByName = async (categoryName: string) => {
    try {
        const encodedName = encodeURIComponent(categoryName); // Encode the category name
        const response = await api.get(`/api/categories-by-name/${encodedName}`);      return response.data;
    } catch (error: unknown) {
      console.error("Error fetching category:", error);
      throw error;
    }
  };
  