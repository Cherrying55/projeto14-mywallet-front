import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import NewTransactionPage from "./pages/NewTransactionPage.jsx";
import GlobalStyle from "./assets/GlobalStyle.jsx";
import { AuthProvider } from "./contexts/AuthContext";

export default function App(){
    return(
        <>
        <GlobalStyle />
        <AuthProvider>
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/novatransaçao/:tipo" element={<NewTransactionPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
        </Routes>
        </BrowserRouter>
        </AuthProvider>
        </>
    )
}