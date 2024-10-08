import instance from "./interceptor";

const getMessages = async (chatId) => {
  try {
    const response = await instance.get(`message/${chatId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default {getMessages}