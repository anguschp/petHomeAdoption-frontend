import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { 
    getFavourPetListFromDB,
    addPetToFavour,
    RemovePetFromFavour
} from '../api/apiAgent';
import { useNavigate } from 'react-router-dom';

// Update context shape to include refresh function
const favourContext = createContext({
    favourPet: [],
    addPet: (petId) => {},
    removePet: (petId) => {},
    refreshFavourList: () => {} // New function to expose
});

export const useFavourList = () => {
    const context = useContext(favourContext);
    if (!context) {
        throw new Error('useFavourList must be used within a FavourListProvider');
    }
    return context;
};

const fetchFavourList = async (userId) => {
    try {
        const response = await getFavourPetListFromDB(userId);
        console.log("Favour list result: " + JSON.stringify(response.data));
        return response.data;
    } catch (err) {
        console.error("Error fetching favour list:", err);
        throw err;
    }
};

const FavourListProvider = ({ children }) => {
    const navigate = useNavigate();
    const { userId } = useAuth();
    const [favourList, setFavourList] = useState({
        favourPet: [],
    });

    // Moved out of useEffect and made available to other components
    const refreshFavourList = useCallback(async () => {

        console.log("Refresh favour list")
        if (!userId) {
            setFavourList({ favourPet: [] });
            return;
        }


        try {
            const result = await fetchFavourList(userId);
            if (result.status === 302 || result.status === 401) {
                navigate("/loginpage");
            } else {
                setFavourList({ favourPet: result });
            }
        } catch (err) {
            console.error("Failed to load favour list:", err);
            if (err.status === 401) {
                localStorage.removeItem("isAuthenticated");
                localStorage.removeItem("loggedInUserId");
                console.log("Authorized failed or authentication expired");
                navigate("/loginpage");
            }
        }
    }, [userId, navigate]);

    // Add pet to both state and DB
    const addPet = useCallback(async (petId) => {
        if (!userId) return;
        
        try {
            await addPetToFavour(userId, petId);
            await refreshFavourList(); // Use the refresh function instead of direct fetch
        } catch (err) {
            console.error("Failed to add pet to favorites:", err);
            if (err.status === 401) {
                localStorage.removeItem("isAuthenticated");
                localStorage.removeItem("loggedInUserId");
                console.log("Authorized failed or authentication expired");
                navigate("/loginpage");
            }
        }
    }, [userId, navigate, refreshFavourList]);

    // Remove pet from both state and DB
    const removePet = useCallback(async (petId) => {
        if (!userId) return;

        try {
            await RemovePetFromFavour(userId, petId);
            await refreshFavourList(); // Use the refresh function instead of direct fetch
        } catch (err) {
            console.error("Failed to remove pet from favorites:", err);
            if (err.status === 401) {
                localStorage.removeItem("isAuthenticated");
                localStorage.removeItem("loggedInUserId");
                navigate("/loginpage");
            }
        }
    }, [userId, navigate, refreshFavourList]);

    // Initial load
    useEffect(() => {
        refreshFavourList();
    }, [refreshFavourList]);

    return (
        <favourContext.Provider value={{
            favourPet: favourList.favourPet,
            addPet,
            removePet,
            refreshFavourList // Expose the refresh function
        }}>
            {children}
        </favourContext.Provider>
    );
};

export default FavourListProvider;