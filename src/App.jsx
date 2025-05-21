
import Footer from "./Components/Footer"
import Header from "./Components/Header"
import './Styles/App.css'
import {Outlet} from "react-router"
import Create from "./Pages/LoginPage"
import '@fontsource/inter/400.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthProvider } from './Context/Auth';
import { Container } from "@mui/material"
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react"

function App() {
  useEffect(() => {
  AOS.init({
    duration: 1000,
    once: true,
  });
}, []);
  return (
    <AuthProvider>

        <div className="app-container">
          <Header />
          <div className="main-content">
            <Outlet />
          </div>
          <Footer />
        </div>

    </AuthProvider>
  );
}


export default App
