const baseURL = import.meta.env.VITE_SERVER_URL;

// Helper to convert fetch response to JSON with error handling
function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error(`Bad Response: ${res.status} ${res.statusText}`);
  }
}

export default class ExternalServices {
  // Gets product data by category
  async getData(category) {
    try {
      const response = await fetch(`${baseURL}products/search/${category}`);
      const data = await convertToJson(response);
      return data.Result;
    } catch (error) {
      console.error("Error fetching category data:", error);
      throw error;
    }
  }

  // Gets a single product by ID
  async findProductById(id) {
    try {
      const response = await fetch(`${baseURL}product/${id}`);
      const data = await convertToJson(response);
      return data.Result;
    } catch (error) {
      console.error("Error fetching product by ID:", error);
      throw error;
    }
  }

  // Submits an order payload to the backend
  async checkout(payload) {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // You can add an Authorization header here if needed:
          // "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      };

      const response = await fetch(`${baseURL}checkout/`, options);
      return await convertToJson(response);
    } catch (error) {
      console.error("Checkout failed:", error);
      throw error;
    }
  }
}
