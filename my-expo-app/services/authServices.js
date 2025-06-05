import axios from "axios";
import { config } from "@/services/appwrite";
import AsyncStorage from "@react-native-async-storage/async-storage";

const authServices = {
  // Login function
  async login(username, password) {
    try {
      const params = new URLSearchParams();
      params.append("username", username);
      params.append("password", password);

      const response = await axios.post(
        `${config.endpoint}/auth/token`,
        params,
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );

      const { access_token } = response.data;
      await AsyncStorage.setItem("token", access_token);
      return { success: true, token: access_token };
    } catch (error) {
      return { error: error.message };
    }
  },
  // Logout function
  async logout() {
    try {
      await AsyncStorage.removeItem("token");
      return { success: true };
    } catch (error) {
      return { error: error.message };
    }
  },
  // Check if user is logged in
  async isLoggedIn() {
    try {
      const token = await AsyncStorage.getItem("token");
      return token !== null;
    } catch (error) {
      return false;
    }
  },
  // Register function
  async register(username, password, email) {
    if (!username || !password) {
      return { error: "Username and password are required." };
    }
    try {
      const params = new URLSearchParams();
      params.append("username", username);
      params.append("password", password);
      params.append("email", email || ""); // Optional email field

      const response = await axios.post(
        `${config.endpoint}/auth/signup`,
        params,
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );

      return { success: true, user: response.data };
    } catch (error) {
      return { error: error.message };
    }
  }
}

export default authServices; // Export the authServices object