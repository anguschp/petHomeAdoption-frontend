import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAppParams } from '../api/apiAgent';
import { useAuth } from '../context-store/AuthContext.jsx'
import { useNavigate } from 'react-router-dom';


const UtilContext = createContext({
  breeds: [],
  genders: [],
  loading: true,
  error: null
});



export const useUtils = () => {
  const context = useContext(UtilContext);
  if (!context) {
    throw new Error('useUtils must be used within a UtilProvider');
  }
  return context;
};

const fetchUtils = async (paramsList) => {


  try {
    const response = await getAppParams(paramsList);
    
    if (response.status !== 200) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = response.data;
    console.log("check data: " + JSON.stringify(data))
    
    // Validate response structure
    if (!data.breedList || !data.genderList) {
      throw new Error('Invalid API response structure');
    }
    
    return data;

  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

export const UtilProvider = ({ children }) => {

    const {isAuthenticated} = useAuth();
    const navigate = useNavigate();
    

  const [utils, setUtils] = useState({
    breeds: [],
    genders: [],
    loading: true,
    error: null
  });

  useEffect(() => {
    
    const paramsList = ["breed", "gender"];
    

    const loadData = async () => {

    if(!isAuthenticated)
    {
        navigate("/loginpage")
    }else
    {
        try {

            const { breedList, genderList } = await fetchUtils(paramsList);
            
            setUtils({
              breeds: breedList,
              genders: genderList,
              loading: false,
              error: null
            });
            
          } catch (error) {
            setUtils(prev => ({
              ...prev,
              loading: false,
              error: error.message || 'Failed to fetch data'
            }));
          }
    }
      
    };

    loadData();
  }, [isAuthenticated]);

  return (
    <UtilContext.Provider value={utils}>
      {children}
    </UtilContext.Provider>
  );
};