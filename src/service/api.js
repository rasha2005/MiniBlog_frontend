import { Api } from "../../utils/axiosConfig";
import { Endpoints } from "../../utils/enpoints";

export const registerUser = async (data) => {
    try {
      const response = await Api.post(Endpoints.createUser, data);
  
      return {
        success: response.data.success,
        token: response.data.token,
        message: response.data.message,
      };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Registration failed",
      };
    }
  };
  
  export const loginUser = async (data) => {
    try {
      const response = await Api.post(Endpoints.verifyUser, data);
  
      return {
        success: response.data.success,
        token: response.data.token,
        message: response.data.message,
      };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Login failed",
      };
    }
  };
  

  export const createPost = async (data) => {
    try {
      const response = await Api.post(Endpoints.createPost, data);
  
      return {
        success: true,
        post: response.data,
      };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Failed to create post",
      };
    }
  };

  export const getMyPosts = async () => {
    try {
      const response = await Api.get(Endpoints.getPosts);
  
      return {
        success: true,
        posts: response.data,
      };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Failed to fetch posts",
      };
    }
  };

  export const deletePost = async (id) => {
    try {
      const response = await Api.delete(`${Endpoints.posts}/${id}`);
      return response.data;
    } catch (error) {
      return {
        success: false,
        message: "Failed to delete post",
      };
    }
  };
  