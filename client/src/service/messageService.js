import instance from "./interceptor";

const getMessages = async (chatId,page=1) => {
  try {
    const response = await instance.get(`message/${chatId}?page=${page}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default {getMessages}