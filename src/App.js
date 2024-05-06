import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './Components/Root Layout/RootLayout';
import SignUp from './Components/SignUp/SignUp';
import LogIn from './Components/LogIn/LogIn';
import Home from './Components/Home/Home';

function App() {
  const router = createBrowserRouter([{
    path: "/",
    element: <RootLayout />,
    children: [
      { index:true, element: <SignUp /> },
      { path: "/login", element: <LogIn /> },
      { path: "/home", element: <Home /> },
      // { path: "/profile", element: <Profile /> },
      // { path: "/account", element: <Account /> },
      // { path: "/dashboard", element: <Dashboard /> },
      // { path: "/logout", element: <Logout /> },
      // { path: "*", element: <NotFound /> },
    ]
  }]);
  return (
    <div className="App">
    <RouterProvider router={router}/>
    </div>
  );
}

export default App;
