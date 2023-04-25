import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NewExitPage(){

    const [dados, setDados] = useState({value: "", description: "", type: "saida"});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    function alterardados(e){
        const newobj = {...dados};
        newobj[e.target.name] = e.target.value;
        setDados({...newobj});
    }

    function enviarsaida(e){
        setLoading(true);
        e.preventDefault();
        axios.post(`https://mywallet-api-b8n4.onrender.com/transactions`, dados, {headers:{
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
        <h2>Nova saída</h2>
        <form onSubmit={enviarsaida}>
            <input type="text" name="value" placeholder="Valor" onChange={alterardados} />
            <input type="text" name="decription" placeholder="Descrição" onChange={alterardados} />
            <button type="submit">Salvar saída</button>
        </form>
        </>
    )
}