import { Routes, Route } from "react-router-dom";

import CandidateForm from "./screens/CandidateForm";
import Home from "./screens/Home";
import Navbar from "./components/Navbar";
import Login from "./screens/Login";
import CoverPage from "./screens/CoverPage";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useMoralis } from "react-moralis";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const {
    authenticate,
    isAuthenticated,
    isAuthenticating,
    user,
    account,
    logout,
  } = useMoralis();

  const login = async () => {
    if (!isAuthenticated) {
      await authenticate({ signingMessage: "Log in using Moralis" })
        .then(function (user) {
          console.log("logged in user:", user);
          // console.log(user!.get("ethAddress"));
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const logOut = async () => {
    await logout();
    console.log("logged out");
  };

  if (isAuthenticating) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <div>
        <Routes>
          <Route path="/" element={<div></div>} />
          <Route path="/*" element={<Navbar />} />
        </Routes>
      </div>

      <div>
        <Routes>
          <Route path="/" element={<CoverPage login={login} />} />
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/home" element={<Home />} />
          {/* <Route path="/add" element={<CandidateForm />} /> */}
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
