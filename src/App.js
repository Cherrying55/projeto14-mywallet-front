import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import NewExitPage from "./pages/NewExitPage.jsx";
import NewEntryPage from "./pages/NewEntryPage.jsx";
import GlobalStyle from "./assets/GlobalStyle.jsx";

export default function App(){
    return(
        <>
        <GlobalStyle />
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/newentry" element={<NewEntryPage />} />
            <Route path="/newexit" element={<NewExitPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
        </Routes>
        </BrowserRouter>
        </>
    )
}