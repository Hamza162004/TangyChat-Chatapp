import instance from "./interceptor";

const signupAPI = async (formData) => {
    const response = await instance.post("user/signup", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials:true
    });
  
    return response.data;
  };

  export default { signupAPI };

  