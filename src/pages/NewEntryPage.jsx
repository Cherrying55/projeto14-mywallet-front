import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";


export default function NewEntryPage(){

    const [dados, setDados] = useState({value: "", description: ""});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    function alterardados(e){
        const newobj = {...dados};
        newobj[e.target.name] = e.target.value;
        setDados({...newobj});
    }

    function enviarentrada(e){
        setLoading(true);
        e.preventDefault();
        axios.post(`https://localhost:5000/users/${auth.id}/entries`,dados, {headers:{
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
        <h2>Nova entrada</h2>
        <form onSubmit={enviarentrada}>
            <input type="text" name="value" placeholder="Valor" onChange={alterardados} />
            <input type="text" name="decription" placeholder="Descrição" onChange={alterardados} />
            <button type="submit">Salvar entrada</button>
        </form>
        </>
    )
}