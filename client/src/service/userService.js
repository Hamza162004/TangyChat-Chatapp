import axios from 'axios'
const baseURL = import.meta.env.VITE_API_URL;

const signupAPI = async (name , username , bio , password , avatar)=>{
    // const response = await fetch(`${baseURL}/user/signup`,{
    //     method:'POST',
    //     headers: getHeader(),
    //     body: JSON.stringify({ name,username,bio,password,avatar})
    // })
    // const data = await response.json();
    // console.log(data)
    // return data

    const response = await axios.post(`${baseURL}/user/signup`,{
        name , username , password , bio , avatar
    })
    return response.data
}

export {signupAPI}