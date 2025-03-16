
import {config} from '../config-dev';
import axiosHelper from '../axiosHelper';


const headerObject = {
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      withCredentials: true,
    };


export async function getPetList(params) {
    //console.log(config.API_BASE_URL);
    return await axiosHelper.get(`${config.API_BASE_URL}/pet/petlist` , {params});    
}

export async function loginRquest(loginData) {
    console.log("Login data: " + JSON.stringify(loginData));
    return await axiosHelper.post(`${config.API_BASE_URL}/user/login` , loginData, headerObject);
}

export async function registerRequestAPI(formData) {
    console.log("Register form  data: " + JSON.stringify(formData));
    return await axiosHelper.post(`${config.API_BASE_URL}/user/register` , formData);
}

export async function logoutRequestAPI() {
    return await axiosHelper.post(`${config.API_BASE_URL}/user/logout`);
}

