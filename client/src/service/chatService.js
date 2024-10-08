import instance from "./interceptor";

const getChats = async (search , user) => {
  try {
    const response = await instance.get(`chat/getMyChats?search=${search}` , { user });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default { getChats };
