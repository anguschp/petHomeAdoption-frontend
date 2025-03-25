
import {config} from '../config-dev';
import axiosHelper from '../axiosHelper';

const headerObject = {
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      params:null,
      
      withCredentials: true
    };


export async function getPetList(params) {
    //console.log(config.API_BASE_URL);
    return await axiosHelper.get(`${config.API_BASE_URL}/pet/petlist` , {params} , headerObject);    
}

export async function getAppParams(utilArray)
{   
    console.log("Firing getparam api")
    if(utilArray != null)
    {
        //headerObject.params = {items:params};
        
    }
    return await axiosHelper.get(`${config.API_BASE_URL}/util/getList`  , headerObject);    
}


export async function getPetById(params)
{
    return await axiosHelper.get(`${config.API_BASE_URL}/pet/${params}` , headerObject);
}

export async function loginRquest(loginData) {
    console.log("Login form data: " + loginData);
    return await axiosHelper.post(`${config.API_BASE_URL}/user/login` , loginData, headerObject);
}


export async function getFavourPetListFromDB(userId)
{
    console.log("Fetch user favour list from database")
    console.log(userId);
    return await axiosHelper.get(`${config.API_BASE_URL}/${userId}/favourList/fullList` , headerObject)
}

export async function addPetToFavour(userId , petId)
{
    console.log("Add pet to favour");
    const requestObject = {petId: petId}
    headerObject.headers['Content-Type'] = "application/json"
    return await axiosHelper.post(`${config.API_BASE_URL}/${userId}/favourList/addPet` , requestObject , headerObject)
}


export async function RemovePetFromFavour(userId , petId)
{
    console.log("Remove pet to favour");
    const requestObject = {petId: petId}
    headerObject.headers['Content-Type'] = "application/json"
    return await axiosHelper.post(`${config.API_BASE_URL}/${userId}/favourList/removePet` , requestObject , headerObject)
}


export async function registerRequestAPI(formData) {
    console.log("Register form  data: " + JSON.stringify(formData));
    return await axiosHelper.post(`${config.API_BASE_URL}/user/register` , formData , headerObject);
}

export async function logoutRequestAPI() {
    return await axiosHelper.post(`${config.API_BASE_URL}/user/logout` , headerObject);
}

