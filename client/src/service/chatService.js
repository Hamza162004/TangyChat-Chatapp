import instance from "./interceptor";

const getChats = async (user) => {
  try {
    const response = await instance.get('chat/getMyChats' , { user });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default { getChats };
