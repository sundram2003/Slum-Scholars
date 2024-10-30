import axios from "axios";

const BASE_URL = "http://localhost:4000/api/v1";

const isValidObjectId = (id) => {
  const objectIdPattern = /^[0-9a-fA-F]{24}$/;
  return objectIdPattern.test(id);
};

export const homeEndPoints = {
  CONTACTUS_API: `${BASE_URL}/home/contactUs`,
};
export const getAllPayments = async () => {
  try {
    const response = await axios.get(`${BASE_URL.replace('/api/v1', '')}/api/payment`);
    return response;
  } catch (error) {
    console.error('Error fetching payments:', error);
    throw error;
  }
};
export const getAllVolunteers = async () => {
  try {
    console.log('Making request to:', `${BASE_URL}/volunteer/all`);
    const response = await axios.get(`${BASE_URL}/volunteer/all`);
    console.log('Response received:', response);
    return response;
  } catch (error) {
    console.error('Error in getAllVolunteers:', error);
    throw error;
  }
};

export const updateVolunteerStatus = async (volunteerId, status) => {
  try {
    if (!isValidObjectId(volunteerId)) {
      throw new Error('Invalid volunteer ID format');
    }
    console.log('Making update request to:', `${BASE_URL}/volunteer/${volunteerId}/status`);
    const response = await axios.put(`${BASE_URL}/volunteer/${volunteerId}/status`, { status });
    console.log('Update response received:', response);
    return response;
  } catch (error) {
    console.error('Error in updateVolunteerStatus:', error);
    throw error;
  }
};
export const createPost = async (postData) => {
  try {
    const response = await axios.post(`${BASE_URL}/posts/create`, postData);
    return response;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

export const getAllPosts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/posts/all`);
    return response;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

export const deletePost = async (postId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/posts/${postId}`);
    return response;
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
};