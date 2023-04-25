import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import styled from "styled-components";
import AuthContext from "../contexts/AuthContext";

export default function LoginPage(){
    const [dados, setDados] = useState({email: "", password: ""});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { auth, login } = useContext(AuthContext);

    if(auth.token){
        navigate("/home")
    }


    function fazerlogin(e){
        e.preventDefault();
        setLoading(true);
        axios.post("https://mywallet-api-b8n4.onrender.com/sign-in", dados)
        .then(
            (res) => {
                login(res.data);
                console.log(res.data);
                navigate("/home");
                
            
            }
        )
        .catch(
            () => {setLoading(false)}
        )
    }

    function alterardados(e){
        const newobj = {...dados};
        newobj[e.target.name] = e.target.value;
        setDados({...newobj});
    }

    return(
        <Container>
        <h1>MyWallet</h1>
        <form onSubmit={fazerlogin}>
            <input data-test="email" type="email" name="email" placeholder="E-mail" onChange={alterardados} />
            <input data-test="password" type="password" name="password" placeholder="Senha" onChange={alterardados} />
            <button data-test="sign-in-submit" type="submit">Entrar</button>
        </form>
        <Link to="/sign-up">
            Primeira vez? Cadastre-se!
        </Link>
        </Container>
    )
}

const Container = styled.div`
display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        width: 100%;
`