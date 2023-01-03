import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";

export default function LoginPage(){
    const [dados, setDados] = useState({email: "", password: ""});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    function fazerlogin(e){
        e.preventDefault();
        setLoading(true);
        axios.post("https://localhost:5000/users", dados)
        .then(
            (res) => {
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