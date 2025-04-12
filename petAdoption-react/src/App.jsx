import 'bootstrap/dist/css/bootstrap.min.css';
import WebHeader from "./Component/WebHeader"
import WebFooter from "./Component/WebFooter";
import "./styles/app.css";
import {Outlet , Routes , Route} from 'react-router-dom';
import Home from './Component/mainPage/Home';
import Login from "./Component/LoginPage/Login.jsx"
import ContactUs from "./Component/contactPage/Contact-Us.jsx"
import NoResource from "./Component/Notfound.jsx";
import Dashboard from './Component/UserDashboard/Dashboard.jsx';
import LoginSuccess from './Component/LoginPage/LoginSuccess.jsx';
import Register from './Component/Registration/Register.jsx';
import RegisterSuccess from './Component/Registration/RegisterSuccess.jsx';
import { AuthProvider } from './context-store/AuthContext.jsx';
import { ProtectedRoute } from './Component/ProtectedRoute.jsx';
import Adoption from './Component/AdoptionPage/Adoption.jsx';
import PetDetails from "./Component/petDetails/PetInfoDetail.jsx"
import {UtilProvider} from './context-store/UtilConext.jsx'
import FavourMain from './Component/FavourList/FavourMain.jsx'
import FavourListProvider from "./context-store/FavourContext.jsx"
import { AdminRoute } from './Component/AdminRoute.jsx';
import ApplicationManager from './Component/ApplicationManager/ApplicationManager.jsx'
import ApplicationReviewer from './Component/ApplicationReviewer/ApplicationReviewer.jsx';
import { useEffect, useRef, useState } from 'react';



function App() {

  const headerRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  useEffect(() => {
    setHeaderHeight(headerRef.current.clientHeight);
  }, [headerHeight]);


  const mainMinHeight = `calc(100vh - ${headerHeight}px)`;


  return (
    <>
      <AuthProvider>
        <UtilProvider>
          <FavourListProvider>

          <WebHeader innerRef={headerRef}/>

          {console.log("header height: " + headerHeight)}
          <main style={{ minHeight: mainMinHeight }}>

            <Routes>


              <Route path="/" element={<Home />}></Route>
              <Route path="/contact" element={<ContactUs />}></Route>
              <Route path="/loginpage" element={<Login props={headerHeight}/>}></Route>
              <Route path="/loginSucess" element={<LoginSuccess />}></Route>
              <Route path="/*" element={<NoResource />}></Route>
              <Route path="/register" element={<Register props={headerHeight}/>}></Route>
              <Route path="/registerSuccess" element={<RegisterSuccess/>}></Route>
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute> }></Route>
              <Route path="/adoption" element={<ProtectedRoute><Adoption/></ProtectedRoute> }></Route>
              <Route path="/pet/:petId" element={<ProtectedRoute><PetDetails/></ProtectedRoute> }></Route>
              <Route path="/:userId/favourList" element={<ProtectedRoute><FavourMain/></ProtectedRoute> }></Route>
              <Route path="/:userId/favourList" element={<ProtectedRoute><FavourMain/></ProtectedRoute> }></Route>
              <Route path="/admin/applicationManager" element={<AdminRoute><ApplicationManager/></AdminRoute> }></Route>
              <Route path="/application/:applicationId" element={<AdminRoute><ApplicationReviewer/></AdminRoute> }></Route>


            </Routes>
            
          </main>

          <WebFooter/>

          </FavourListProvider>
          </UtilProvider>
      </AuthProvider>
    
    
    </>
  )
}

export default App
