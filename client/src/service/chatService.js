import instance from "./interceptor";

const getChats = async (search) => {
  try {
    const response = await instance.get(`chat/getMyChats?search=${search}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getChatDetails = async (chatId, populate = false) => {
  try {
    const response = await instance.get(`chat/${chatId}?populate=${populate}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default { getChats, getChatDetails };
