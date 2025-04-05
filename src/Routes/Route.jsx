
import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home";
import Error from "../Pages/Error";
import Create from "../Pages/CreateAccount"
import App from "../App";
import About from "../Pages/About";
import Catalogue from "../Pages/Catalogue";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,  
    errorElement: <Error />,
    children: [
      {
        index:true,
        element: <Home />
      },
      {
        path:"about",
        element:<About/>
      },
      {
        path:"catalogue",
        element:<Catalogue/>
      }

    ]
  }
]);
