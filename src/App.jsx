import Header from "./components/header";
import NavBar from "./components/navBar";
import Footer from "./components/footer";
import { Outlet } from "react-router";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./services/firebase/firebase";
import { setUser } from "./redux/userSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        dispatch(
          setUser({
            uid: firebaseUser.uid,
            name: firebaseUser.displayName,
            email: firebaseUser.email,
            photo: firebaseUser.photoURL,
          }),
        );
      } else {
        dispatch(setUser(null));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);
  return (
    <>
      <Header></Header>
      <NavBar></NavBar>
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  );
}

export default App;
