import axios from "axios";



const axiosHelper = axios.create({
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

axiosHelper.interceptors.request.use((config)=>{


    /* const headerUsername = import.meta.env.VITE_REACT_APP_API_USERNAME;
    const headerPassword = import.meta.env.VITE_REACT_APP_API_PASSWORD;

    console.log("Username: " + headerUsername);
    console.log("Password: " + headerPassword);


    if(headerUsername && headerPassword){
        config.auth = {username: headerUsername , password: headerPassword};
    }
 */
    return config;

}, (error)=>{
    return Promise.reject(error);
})

export default axiosHelper;