import { React, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Header from "../../components/Header/Header";
const ExperienciesDetail = () => {
    let params = useParams();
    const [experiencia, setExperiencia] = useState();
    useEffect(() => {
        fetch('/experiencias/' + params["id"])
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setExperiencia(data);
            })
            .catch(error => console.error('Error fetching users:', error));
    }, []);
    return (
        <>
            <Header></Header>
            {experiencia?(
            <div>
                {experiencia.titulo}</div>):(null)}
        </>)
};
export default ExperienciesDetail;