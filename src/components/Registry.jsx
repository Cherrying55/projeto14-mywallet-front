import styled from "styled-components"


export default function Registry(props){
    return(
        <RegContainer>
            <div>
            <h3>{props.day}</h3>
            <h2 data-test="registry-name">{props.description}</h2>
            </div>
            <Valor  data-test="registry-amount" type={props.type}>{props.value}</Valor>
        </RegContainer>
    )
}

const Valor = styled.h1`
color: ${props => props.type === "entrada" ? "green" : "red" };
font-family: 'Raleway';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 19px;
text-align: right;
margin: 0;
`

const RegContainer = styled.div`
width: 100%;
display: flex;
justify-content: space-between;

div{
    display: flex;
    gap: 8px;

}

h3{
    font-family: 'Raleway';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 19px;
display: flex;
align-items: center;
color: #C6C6C6;
}

h2{
    font-family: 'Raleway';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 19px;
display: flex;
align-items: center;
color: #000000;
margin: 0;
}
`