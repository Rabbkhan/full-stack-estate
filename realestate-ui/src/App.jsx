import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ListPage from "./routes/listPage/ListPage";
import  { Layout, RequireAuth } from "./routes/layout/layout";
import SinglePage from "./routes/singlePage/SinglePage";
import ProfilePage from "./routes/profilePage/profilePage";
import Login from "./routes/login/Login";
import Register from "./routes/register/Register";
import HomePage from "./routes/homepage/HomePage";
import NewPostPage from './routes/newPostPage/NewPostPage'
import ProfileUpdatePage from "./routes/profileUpdatePage/ProfileUpdatePage";
import  { Toaster } from 'react-hot-toast';


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children:[
        {
          path:"/",
          element:<HomePage/>
        },
        {
          path:"/list",
          element:<ListPage/>
        },
        {
          path:"/:id",
          element:<SinglePage/>
        },
        {
          path:"/profile",
          element:<ProfilePage/>
        },
        {
          path:"/profile/update",
          element:<ProfileUpdatePage/>
        },
        {
          path:"/add",
          element:<NewPostPage/>
        },
        {
          path:"/login",
          element:<Login/>
        },
        {
          path:"/register",
          element:<Register/>
        }
      ]
    },

    {
      path: "/",
      element: <RequireAuth />,
      children:[
       
        {
          path:"/profile",
          element:<ProfilePage/>
        },
        {
          path:"/profile/update",
          element:<ProfileUpdatePage/>
        }
      ]
    }
  ]);

  return (
<>
    <RouterProvider router={router}/>
    <Toaster />
</>

  );
}

export default App;