import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";


export default function SignUpPage(){
    const [dados, setDados] = useState({nome: "", email: "", password: "", confirmpassword: ""});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    function fazerlogin(e){
        e.preventDefault();
        setLoading(true);
        if(dados.confirmpassword === dados.password){
            let dadossemconfirm = {...dados};
            delete dadossemconfirm.confirmpassword;
            console.log(dadossemconfirm);
            axios.post("https://mywallet-api-b8n4.onrender.com/sign-up", dadossemconfirm)
        .then(
            (res) => {
                navigate("/");
            }
        )
        .catch(
            () => {setLoading(false)}
        )
        }
        else{
            setLoading(false);
            alert("Confirme a senha corretamente")
        }
        
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
            <input data-test="name" type="text" name="nome" placeholder="Nome" onChange={alterardados} />
            <input data-test="email" type="email" name="email" placeholder="E-mail" onChange={alterardados} />
            <input data-test="password" type="password" name="password" placeholder="Senha" onChange={alterardados} />
            <input data-test="conf-password" type="password" name="confirmpassword" placeholder="Confirme a senha" onChange={alterardados} />
            <button data-test="sign-up-submit" type="submit">Cadastrar</button>
        </form>
        <Link to="/">
            Já tem uma conta? Entre agora!
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