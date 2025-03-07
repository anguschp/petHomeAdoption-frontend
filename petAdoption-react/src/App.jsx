import 'bootstrap/dist/css/bootstrap.min.css';
import WebHeader from "./Component/WebHeader"
import WebFooter from "./Component/WebFooter";
import "./styles/app.css";
import {Outlet , Routes , Route} from 'react-router-dom';
import Home from './Component/mainPage/Home';
import Login from "./Component/Login"
import ContactUs from "./Component/Contact-Us"
import NoResource from "./Component/Notfound.jsx";



function App() {

  return (
    <>
    
    <WebHeader/>

    <main>
     <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/contact" element={<ContactUs />}></Route>
        <Route path="/*" element={<NoResource />}></Route>

			</Routes>
    </main>

    <WebFooter/>
    </>
  )
}

export default App
