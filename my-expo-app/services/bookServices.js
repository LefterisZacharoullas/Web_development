import axios from 'axios';
import { config } from "@/services/appwrite"

// Get all the books
export const getbooks = async () => {
  try {
    const response = await axios.get(`${config.endpoint}/books`);
    console.log("Succesfull Api", response.data)
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data || error.message);
    } else {
      console.error("Unknown error:", error);
    }
    return { error: error.message };
  }
};

// Add book
// Must be a { "book_name": "string", "last_page": 0 }
export const postbook = async (obj) => {
  try {
    const res = await axios.post(`${config.endpoint}/books`, obj);
    console.log("Successful post", res.data);
    return res.data;
  } catch (error) {
    console.error("Error", error);
    return { error: error.message };
  }
};
