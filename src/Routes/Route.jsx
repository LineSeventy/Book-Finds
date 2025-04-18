import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home";
import Error from "../Pages/Error";
import Create from "../Pages/CreateAccount"
import App from "../App";
import About from "../Pages/About";
import Catalogue from "../Pages/Catalogue";
import BookDetail from "../Pages/BookDetail"; 
import SignUp from "../Pages/Signup"
import AccountInfo from "../Pages/AccountInfo";
import SubscriptionPayment from "../Pages/SubscriptionPayment";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,  
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "about",
        element: <About />
      },
      {
        path: "catalogue",
        element: <Catalogue />
      },
      {
        path: "catalogue/:bookId", // Use book.id as the parameter
        element: <BookDetail />
      },
      {
        path:"create",
        element: <Create/>
      },
      {
        path:"SignUp",
        element:<SignUp/>
      },
      {
        path: "account",
        element: <AccountInfo />
      },
      {
        path:"subscription",
        element:<SubscriptionPayment/>
      }
    ]
  }
]);
