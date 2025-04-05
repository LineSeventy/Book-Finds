
import Footer from "./Components/Footer"
import Header from "./Components/Header"

import {Outlet} from "react-router"
import Create from "./Pages/CreateAccount"
function App() {


  return (
    <>
  <Header/>
  <Outlet/>

  <Footer/>
    </>
  )
}

export default App
