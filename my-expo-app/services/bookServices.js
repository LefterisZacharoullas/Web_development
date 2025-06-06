import axios from 'axios';
import { config } from "@/services/appwrite"
import api from './api'; 

const bookServices = {

  // Get all the books
  async getbooks(){
    try {
      const response = await api.get(`${config.endpoint}/user/books`);
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
  },

  // Add book
  // Must be a { "book_name": "string", "last_page": 0 }
  async postbook(obj){
    try {
      const res = await axios.post(`${config.endpoint}/books`, obj);
      console.log("Successful post", res.data);
      return res.data;
    } catch (error) {
      console.error("Error", error);
      return { error: error.message };
    }
  },

  async deletebook(id){
    try{
      const res = await axios.delete(`${config.endpoint}/books/${id}`)
      console.log("Successful delete", res.data)
      return res.data
    } catch (error) {
      console.error("Error" , error)
      return {error: error.message}
    }
  }

}

export default bookServices