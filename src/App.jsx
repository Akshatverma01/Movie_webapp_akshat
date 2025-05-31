// import './App.css'
import Typography from "@mui/material/Typography";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./components/home";
import Moviedetails from "./components/Moviedetails";

function App() {
  return (
    <div
      style={{
        maxWidth: "100vw",
        padding: 0,
        margin: 0,
        display: "flex",
        justifyContent: "flex-start",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <nav style={{ backgroundColor: "#3a3a99", width: "100%" }}>
        <Typography variant="h6" color="white" sx={{ ml: 2 }}>
          OrgzitStream.com
        </Typography>
      </nav>
      <Routes>
        <Route path="/"  index element={<Home />} />
        <Route path="/movie" element={<Moviedetails />} />
      </Routes>
    </div>
  );
}

export default App;
