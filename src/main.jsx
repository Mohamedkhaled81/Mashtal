import "./index.css";
import App from "./App.jsx";
import store from "./store.js";
import HomePage from "./pages/homePage.jsx";
import PlantsPage from "./pages/plantsPage.jsx";
import GiudesPage from "./pages/giudesPage.jsx";
import GiftsPage from "./pages/giftsPage.jsx";
import ContactPage from "./pages/contactPage.jsx";
import AboutPage from "./pages/aboutPage.jsx";
import NotFoundPage from "./pages/notFoundPage.jsx";
import ErrorPage from "./pages/errorPage.jsx";
import PlantDetailsPage from "./pages/plantDetailsPage.jsx";
import cartPage from "./pages/cartPage.jsx";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { Provider } from "react-redux";
import AuthPage from "./pages/loginSignUpPage.jsx";
import ProfilePage from "./pages/profilePage.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, Component: HomePage },
      { path: "profile", Component: ProfilePage},
      { path: "login-signUp", Component: AuthPage},
      { path: "plants", Component: PlantsPage},
      { path: "plants/:id", Component: PlantDetailsPage },
      { path: "plants/cart", Component: cartPage },
      { path: "cart", Component: cartPage },
      { path: "guides", Component: GiudesPage },
      { path: "gifts", Component: GiftsPage },
      { path: "contact", Component: ContactPage },
      { path: "loginSignUp", Component: AuthPage },
      { path: "about", Component: AboutPage },
      { path: "*", Component: NotFoundPage },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
      <RouterProvider router={router} />
  </Provider>,
);
