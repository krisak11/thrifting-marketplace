import api from "./api"; // Import the existing API handler

export const fetchProducts = async (categoryId?: number, tags?: string[]) => {
  try {
    const queryParams: { [key: string]: string } = {};

    if (categoryId) queryParams.category = categoryId.toString();
    if (tags && tags.length > 0) queryParams.tag = tags.join(","); // Convert tags array to comma-separated string

    const response = await api.get("/products", { params: queryParams }); // ✅ Axios handles query params automatically
    return response.data;
  } catch (error: unknown) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
