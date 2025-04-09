
export const handleUnauthorizedError = (navigate) => {


    // Clear authentication tokens
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("loggedInUserId");
    localStorage.removeItem("role");
    
    // Logout message
    console.log("Authorization failed or authentication expired");
    
    // Navigate to login
    navigate("/loginpage");
};