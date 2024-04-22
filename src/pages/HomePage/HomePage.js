import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import React, { useState, useEffect } from 'react';
import { DateInput } from '@mantine/dates';
import './HomePage.css';
import { Button } from '@mantine/core';
import { createTheme, MantineProvider } from '@mantine/core';
import { TextInput, rem } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { IconLocation } from '@tabler/icons-react';
import { useInputState } from '@mantine/hooks';
function HomePage() {
    const icon = <IconLocation style={{ width: rem(16), height: rem(16) }} />;
    const theme = createTheme({
        /** Put your mantine theme override here */
    });
    const [experiencias, setExperiencias] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fechaInicio, setFechaInicio] = useState();
    const [fechaFin, setFechaFin] = useState();
    const [destino,setDestino] = useState();
    const navigate = useNavigate();
    const experienciasNavigate = () => {
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
    const buscar = () => {
        console.log('Buscar clickado');
        console.log(destino);
    };
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
                            <TextInput
                                leftSectionPointerEvents="none"
                                leftSection={icon}
                                placeholder="Destino"
                                radius="md"
                                size="md"
                                onChange={(event) =>
                                    setDestino(event.currentTarget.value)
                                  }
                            />
                        </div>
                        <div className='col-2'><DateInput
                            value={fechaInicio}
                            onChange={setFechaInicio}
                            radius="md"
                            size="md"
                            placeholder="Fecha Inicio"
                        /></div>
                        <div className='col-2'><DateInput
                            value={fechaFin}
                            onChange={setFechaFin}
                            radius="md"
                            size="md"
                            placeholder="Fecha Fin"
                        /></div>
                        <div className='col-3'><TextInput
                            placeholder="Personas"
                            radius="md"
                            size="md"
                        /></div>
                        <div className='col-2'><Button variant="filled" color="#3a5265" size="md" radius="md" onClick={buscar}>Buscar</Button></div>
                    </div>
                    <div className='row pad'>
                        <div className='col-2 offset-5'>
                            <input type="button" className='buscar redondo' value="Experiencias" onClick={experienciasNavigate}></input>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <Footer></Footer>
            </div>
        </div>
    );
}

export default HomePage;