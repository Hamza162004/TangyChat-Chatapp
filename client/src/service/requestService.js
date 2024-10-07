import instance from "./interceptor";


const requestNotification = async (user) => {
  try {
    const response = await instance.get('request/notification' , { user });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default { requestNotification };
