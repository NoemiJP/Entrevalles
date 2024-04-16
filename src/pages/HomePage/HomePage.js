import Header from '../../components/Header/Header';
import React, { useState, useEffect } from 'react';
import './HomePage.css';

import { useNavigate } from 'react-router-dom';
function HomePage() {
    const [experiencias, setExperiencias] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const experienciasNavigate = () =>{
        navigate('/experiencies');
    }
    useEffect(() => {
        fetch('/experiencias')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setExperiencias(data);
                setLoading(true);
            })
            .catch(error => console.error('Error fetching users:', error));
    }, []);
    return (
        <div className='contenedor no-pad'>
            <Header titulo="Prueba"></Header>
            <div className="color body align-items-center d-flex justify-content-center  no-pad">
                <div className='row'>
                    <div className='col-12 d-flex justify-content-center'>
                        <h1 className='titulo'>ENTRE VALLES Y MONTAÑAS</h1>
                    </div>
                    <div className='row pad'>
                        <div className='col-3'>
                            <input type="text" className='texto'></input>
                        </div>
                        <div className='col-2'><input type="text" className='texto'></input></div>
                        <div className='col-2'><input type="text" className='texto'></input></div>
                        <div className='col-3'><input type="text" className='texto'></input></div>
                        <div className='col-2'><input type="button" className='buscar' value="Buscar"></input></div>
                    </div>
                    <div className='row pad'>
                        <div className='col-2 offset-5'>
                        <input type="button" className='buscar redondo' value="Experiencias" onClick={experienciasNavigate}></input>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;