
import {config} from '../config-dev';
import axiosHelper from '../axiosHelper';
import axios from 'axios';

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
    console.log("fetch util list from database")
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
    console.log(headerObject)
    return await axiosHelper.post(`${config.API_BASE_URL}/${userId}/favourList/removePet` , requestObject , headerObject)
}


export async function registerRequestAPI(formData) {
    console.log("Register form  data: " + JSON.stringify(formData));
    return await axiosHelper.post(`${config.API_BASE_URL}/user/register` , formData , headerObject);
}

export async function logoutRequestAPI() {
    return await axiosHelper.post(`${config.API_BASE_URL}/user/logout` , headerObject);
}


export async function submitApplicationAPI(userId){
    console.log("Apply pet adoption from favour list");
    console.log(headerObject)
    return await axiosHelper.post(`${config.API_BASE_URL}/${userId}/submitApplication` , null , headerObject);
}


export async function fetchUserApplications(userId, sorting) {
    // Create a new config object for each request to avoid mutation issues
    const requestConfig = {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        params: sorting,  // Pass sorting as params
        withCredentials: true  // Ensure cookies are sent
    };

    console.log("fetch user applications with config:", requestConfig);
    return await axiosHelper.get(`${config.API_BASE_URL}/${userId}/fetchApplications`, requestConfig);
}


export async function fetchAllApplications(listCriteria) {
    

    const requestConfig = {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        params: listCriteria,  // Pass sorting as params
        withCredentials: true  // Ensure cookies are sent
    };

    console.log("fetch all applications for admin:", requestConfig);
    return await axiosHelper.get(`${config.API_BASE_URL}/admin/applicationsRecord`, requestConfig);
}

export async function getApplicationDetailsById(id)
{
    const requestConfig = {
        headers: {
            "Content-Type": "application/json",
        },
        params: {},  // Pass sorting as params
        withCredentials: true  // Ensure cookies are sent
    };

    console.log("fetch application reviewer:", requestConfig);
    return await axiosHelper.get(`${config.API_BASE_URL}/admin/ApplicationDetails/${id}`, requestConfig); 
}

export async function updateApplication(appId, data) {
    const requestConfig = {
        headers: {
            "Content-Type": "application/json",
        },
        data: data,  // Send data in the request body
        withCredentials: true
    };

    console.log("Update Application:", requestConfig);
    return await axiosHelper.put(
        `${config.API_BASE_URL}/admin/ApplicationDetails/action/${appId}`,
        data,  // Axios typically takes data as second parameter
        requestConfig  // Config as third parameter
    );
}