
import Footer from "./Components/Footer"
import Header from "./Components/Header"
import './Styles/App.css'
import {Outlet} from "react-router"
import Create from "./Pages/CreateAccount"
import '@fontsource/inter/400.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthProvider } from './Context/Auth';
import { Container } from "@mui/material"

const theme = createTheme({
  typography: {
    fontFamily: 'Inter, sans-serif',
  },
});

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <div className="app-container">
          <Header />
          <div className="main-content">
            <Outlet />
          </div>
          <Footer />
        </div>
      </ThemeProvider>
    </AuthProvider>
  );
}


export default App
