    import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
    import { useAuth } from './AuthContext';
    import { 
        getFavourPetListFromDB,
        addPetToFavour,
        RemovePetFromFavour
    } from '../api/apiAgent';


    // Update context shape to include actions
    const favourContext = createContext({
    favourPet: [],
    addPet: (petId) => {},
    removePet: (petId) => {}
    });

    export const useFavourList = () => {
    const context = useContext(favourContext);
    if (!context) {
        throw new Error('useFavourList must be used within a FavourListProvider');
    }
    return context;
    };

    // Existing fetch function
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
    const { userId } = useAuth();
    const [favourList, setFavourList] = useState({
        favourPet: [],
    });



    // Add pet to both state and DB
    const addPet = useCallback(async (petId) => {

        console.log("Add pet trigger: ")
        console.log(userId)

        if (!userId) return;
        
        try {

        await addPetToFavour(userId, petId);

        const refetchReult = await fetchFavourList(userId);

        setFavourList(prev => ({
            favourPet: refetchReult
        }));
        } catch (err) {
        console.error("Failed to add pet to favorites:", err);
        }
    }, [userId]);




    // Remove pet from both state and DB
    const removePet = useCallback(async (petId) => {

        console.log("removePet trigger:");
        console.log(userId);

        if (!userId) return;

        try {

        console.log("remove checking: " + userId  + " with " + petId)
        await RemovePetFromFavour(userId, petId);

        const refetchReult = await fetchFavourList(userId);

        setFavourList(prev => ({
            favourPet: refetchReult
        }));
        } catch (err) {
        console.error("Failed to remove pet from favorites:", err);
        }
    }, [userId]);



    useEffect(() => {
        const loadFavourList = async () => {
        if (!userId) {
            setFavourList({ favourPet: [] });
            return;
        }

        try {
            const result = await fetchFavourList(userId);
            setFavourList({ favourPet: result });
        } catch (err) {
            console.error("Failed to load favour list:", err);
        }
        };

        loadFavourList();
    }, [userId]);

    return (
        <favourContext.Provider value={{
        favourPet: favourList.favourPet,
        addPet,
        removePet
        }}>
        {children}
        </favourContext.Provider>
    );
    };

    export default FavourListProvider;