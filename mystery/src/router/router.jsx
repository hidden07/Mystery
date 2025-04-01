import { createBrowserRouter } from "react-router-dom";
import Home from "../components/Home/Home";
import Login from "../components/Login/login";
import Hidden from "../components/pages/Hidden";
import Mystery from "../components/pages/Mystery";
import Question from "../components/pages/Question";
import FinalChoice from "../components/pages/FinalChoice";
import About from "../components/pages/About";
import Secret from "../components/pages/Secret";
import Thankyou from "../components/pages/Thankyou";
import App, { ProtectedRoute } from "../App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, 
    children: [
      { path: "login", element: <Login /> }, 
      {
        path: "",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "home",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "hidden",
        element: (
          <ProtectedRoute>
            <Hidden />
          </ProtectedRoute>
        ),
      },
      {
        path: "mystery",
        element: (
          <ProtectedRoute>
            <Mystery />
          </ProtectedRoute>
        ),
      },
      {
        path: "question",
        element: (
          <ProtectedRoute>
            <Question />
          </ProtectedRoute>
        ),
      },
      {
        path: "final-choice",
        element: (
          <ProtectedRoute>
            <FinalChoice />
          </ProtectedRoute>
        ),
      },
      {
        path: "about",
        element: (
          <ProtectedRoute>
            <About />
          </ProtectedRoute>
        ),
      },
      {
        path: "secret",
        element: (
          <ProtectedRoute>
            <Secret />
          </ProtectedRoute>
        ),
      },
      {
        path: "thankyou",
        element: (
          <ProtectedRoute>
            <Thankyou />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
