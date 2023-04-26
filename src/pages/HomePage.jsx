import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Registry from "../components/Registry";
import AuthContext from "../contexts/AuthContext";

export default function HomePage(){

    const [saldo, setSaldo] = useState(0);
    const navigate = useNavigate();
    const [transactions, setTransactions] = useState([]);
    const { auth, login } = useContext(AuthContext);
    const [ positivos, setPositivos] = useState("");
    const [ negativos, setNegativos] = useState("");

    if(!auth.token){
        navigate("/")
    }

    

    useEffect(() => {
        axios.get("https://mywallet-api-b8n4.onrender.com/transactions", {headers:{
            "Authorization": `Bearer ${auth.token}`
        }})
        .then(
            (res) => {setTransactions(res.data);
                setPositivos(res.data.filter(r => r.type === "entrada"));
                setNegativos(res.data.filter(r => r.type === "saida"));
            }
        )
        .catch(
            (err) =>  {alert(err.response.status)}
        )
    }, [])

    function logout(){
        login({});
        navigate("/");
    }
    
    function soma (positivos,negativos){
        let soma = 0;
        for(const i of positivos){
            soma = soma + parseFloat(i.value);
        }
        for(const i of negativos){
            soma = soma - parseFloat(i.value);
        }
        return soma.toFixed(2);
    }

    return(
        <Container>
        <NewEntryHeader>
            <h2 data-test="user-name">Olá, {auth.nome}</h2>
            <ion-icon name="exit-outline" onClick={logout}></ion-icon>
        </NewEntryHeader>
        <BigContainer>
            {transactions.length > 0 ?
            <>
            <RegistryContainer>
                {
                    transactions.map(
                        (t) => <Registry day={t.day} description={t.description} value={t.value} type={t.type} />
                    )
                
                
                }
            </RegistryContainer>
            <Saldo resultado={soma(positivos,negativos)}>
            <h3>SALDO</h3>
            <span data-test="total-amount">{soma(positivos,negativos)}</span>
        </Saldo>
        </>
            :
            <NoTransactions>Não há registros de entrada ou saída</NoTransactions>
            }
            
            
        </BigContainer>
        <ButtonContainer>
            <button data-test="new-income" onClick={() => {navigate("/nova-transacao/entrada")}}>
                <ion-icon name="add-circle-outline"></ion-icon>
                <h4>Nova entrada</h4>
            </button>
            <button data-test="new-expense" onClick={() => {navigate("/nova-transacao/saida")}}>
                <ion-icon name="remove-circle-outline"></ion-icon>
                <h4>Nova saída</h4>
            </button>
        </ButtonContainer>
        </Container>
    )
}

const NewEntryHeader = styled.header`
display: flex;
justify-content: space-between;
height: 56px;
padding-top: 25px;
padding-left: 24px;
padding-right: 24px;
width: 90%;
margin-bottom: 22px;


h2{
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 700;
    font-size: 26px;
    line-height: 31px;
    color: #FFFFFF;
    margin: 0;
}

ion-icon{
    font-size: 22px;
    color: white;
}
`

const BigContainer = styled.div`
height: 67%;
width: 90%;
background: white;
display: flex;
flex-direction: column;
align-items: center;
padding-top: 23px;
padding-bottom: 10px;
justify-content: ${props => props.nenhum? "center" : "space-between"}
`

const ButtonContainer = styled.div`
width: 90%;
display: flex;
margin-bottom: 16px;
gap: 6%;
margin-top: 16px;

button{
    background: #A328D6;
    border-radius: 5px;
    height: 114px;
    width: 47%;
    display: flex;
    flex-direction: column;
    gap: 32px;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 10px;
}

button ion-icon{
    font-size: 20px;
    color: white;
}

button h4{
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 700;
    font-size: 17px;
    line-height: 20px;
    color: #FFFFFF;
}
`

const Saldo = styled.div`
display: flex;
justify-content: space-between;
width: 100%;
padding-left: 3%;
padding-right: 3%;

h3{
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 700;
    font-size: 17px;
    line-height: 20px;
    color: #000000;
}

span{
font-family: 'Raleway';
font-style: normal;
font-weight: 400;
font-size: 17px;
line-height: 20px;
text-align: right;
color: ${props => props.resultado > 0 ? "green" : "red"}
}
`

const RegistryContainer = styled.div`
width: 100%;
padding-left: 3%;
padding-right: 3%;
display: flex;
flex-direction: column;
gap: 21px;
`

const Container = styled.div`
display: flex;
        flex-direction: column;
        align-items: center;
        height: 100vh;
        width: 100%;
`

const NoTransactions = styled.div`
display: flex;
align-items: center;
justify-content: center;
height: 100%;
width: 100%;
color: #868686;
font-family: 'Raleway';
font-style: normal;
font-weight: 400;
font-size: 20px;
`