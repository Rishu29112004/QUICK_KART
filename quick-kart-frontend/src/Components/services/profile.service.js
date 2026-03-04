import axiosInstance from "./url.service";

export const profileServices = {
  getMyProfile: async (id) => {
    try {
      const response = await axiosInstance.get(`/api/profile/getProfile/${id}`);
      return response.data;
    } catch (error) {
      console.error("Get my profile error:", error);
      throw error;
    }
  },


  updateProfile: async (id, formData)=>{
    try{
        const response = await axiosInstance.put(`/api/profile/profileUpdate/${id}`,formData)
        return response.data
    }catch (error){
        console.error("Update profile services error:", error)
        throw error
    }
  }
  
};
