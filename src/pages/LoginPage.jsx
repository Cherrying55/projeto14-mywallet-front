import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import styled from "styled-components";
import AuthContext from "../contexts/AuthContext";

export default function LoginPage(){
    const [dados, setDados] = useState({email: "", password: ""});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);


    function fazerlogin(e){
        e.preventDefault();
        setLoading(true);
        axios.post("https://localhost:5000/sign-in", dados)
        .then(
            (res) => {
                navigate("/home");
                login(res.data);
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
            <input type="email" name="email" placeholder="E-mail" onChange={alterardados} />
            <input type="password" name="password" placeholder="Senha" onChange={alterardados} />
            <button type="submit">Entrar</button>
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