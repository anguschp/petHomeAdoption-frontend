import 'bootstrap/dist/css/bootstrap.min.css';
import WebHeader from "./Component/WebHeader"
import WebFooter from "./Component/WebFooter";
import "./styles/app.css";
import {Outlet , Routes , Route} from 'react-router-dom';
import Home from './Component/mainPage/Home';
import Login from "./Component/LoginPage/Login.jsx"
import ContactUs from "./Component/contactPage/Contact-Us.jsx"
import NoResource from "./Component/Notfound.jsx";
import Dashboard from './Component/Dashboard.jsx';
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



function App() {

  return (
    <>
      <AuthProvider>
        <UtilProvider>
          <FavourListProvider>

          <WebHeader/>

          <main>
          <Routes>

              <Route path="/" element={<Home />}></Route>
              <Route path="/contact" element={<ContactUs />}></Route>
              <Route path="/loginpage" element={<Login />}></Route>
              <Route path="/loginSucess" element={<LoginSuccess />}></Route>
              <Route path="/*" element={<NoResource />}></Route>
              <Route path="/register" element={<Register/>}></Route>
              <Route path="/registerSuccess" element={<RegisterSuccess/>}></Route>
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute> }></Route>
              <Route path="/adoption" element={<ProtectedRoute><Adoption/></ProtectedRoute> }></Route>
              <Route path="/pet/:petId" element={<ProtectedRoute><PetDetails/></ProtectedRoute> }></Route>
              <Route path="/:userId/favourList" element={<ProtectedRoute><FavourMain/></ProtectedRoute> }></Route>


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
