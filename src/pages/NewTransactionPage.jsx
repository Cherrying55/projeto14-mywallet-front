import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";


export default function NewTransactionPage(){
    const { tipo } = useParams();
    console.log(tipo);
    const [dados, setDados] = useState({value: "", description: "", type: tipo});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { auth } = useContext(AuthContext)
    
    if(!auth.token){
        navigate("/")
    }

    function alterardados(e){
        const newobj = {...dados};
        newobj[e.target.name] = e.target.value;
        setDados({...newobj});
    }

    function enviarentrada(e){
        setLoading(true);
        e.preventDefault();
        console.log(dados)
        axios.post(`https://mywallet-api-b8n4.onrender.com/transactions`,dados, {headers:{
            "Authorization": `Bearer ${auth.token}`
        }})
        .then(
            (res) => {
                
                navigate("/home")
            }
        )
        .catch(
            () => {setLoading(false)}
        )
    }
    return(
        <>
        <h2>Nova {tipo}</h2>
        <form onSubmit={enviarentrada}>
            <input data-test="registry-amount-input" type="text" name="value" placeholder="Valor" onChange={alterardados} />
            <input data-test="registry-name-input" type="text" name="description" placeholder="Descrição" onChange={alterardados} />
            <button data-test="registry-save" type="submit">Salvar {tipo}</button>
        </form>
        </>
    )
}