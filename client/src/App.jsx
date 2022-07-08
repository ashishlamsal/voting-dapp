import { Routes, Route } from "react-router-dom";

import Home from "./screens/Home";
import Navbar from "./components/Navbar";
import CoverPage from "./screens/CoverPage";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
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
          <Route path="/" element={<CoverPage />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
