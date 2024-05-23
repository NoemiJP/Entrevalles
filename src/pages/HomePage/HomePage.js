import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import React, { useState, useEffect } from 'react';
import { DateInput } from '@mantine/dates';
import './HomePage.css';
import { Button } from '@mantine/core';
import { createTheme, MantineProvider } from '@mantine/core';
import { TextInput,Autocomplete, rem } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { IconLocation,IconBrandInstagram,IconBrandFacebook } from '@tabler/icons-react';
import { useInputState } from '@mantine/hooks';
import { url } from '../../utils';

function HomePage() {
    const icon = <IconLocation style={{ width: rem(16), height: rem(16) }} />;
    const theme = createTheme({});
    const [experiencias, setExperiencias] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fechaInicio, setFechaInicio] = useState();
    const [fechaFin, setFechaFin] = useState();
    const [destino, setDestino] = useState('');
    const [localidadesAsturias, setLocalidadesAsturias] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Obtener localidades de Asturias desde la base de datos
        fetch(`${url()}/localidades`)
            .then(response => response.json())
            .then(data => {
                const localidades = data.map(localidad => localidad.nombre);
                setLocalidadesAsturias(localidades);
                setLoading(true);
            })
            .catch(error => console.error('Error fetching localidades:', error));

        // Obtener experiencias
        fetch(`${url()}/experiencias`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setExperiencias(data);
                setLoading(true);
            })
            .catch(error => console.error('Error fetching experiencias:', error));
    }, []);

    const buscar = () => {
        console.log('Buscar clickado');
        console.log(destino);
    };

    const experienciasNavigate = () => {
        navigate('/experiencies');
    }

    return (
        <div className='contenedor no-pad'>
            <Header />
            <div className="body no-pad">
                <div className='centrado-vertical'>
                    <div className='row'>
                        <div className='col-12 d-flex justify-content-center'>
                            <h1 className='titulo'>ENTRE VALLES Y MONTAÑAS</h1>
                        </div>
                        <div className='row pad'>
                            <div className='col-3'>
                                <Autocomplete
                                    leftSectionPointerEvents="none"
                                    leftSection={icon}
                                    placeholder="Destino"
                                    radius="md"
                                    size="md"
                                    data={localidadesAsturias}
                                    value={destino}
                                    onChange={setDestino}
                                />
                            </div>
                            <div className='col-2'>
                                <DateInput
                                    value={fechaInicio}
                                    onChange={setFechaInicio}
                                    radius="md"
                                    size="md"
                                    placeholder="Fecha Inicio"
                                />
                            </div>
                            <div className='col-2'>
                                <DateInput
                                    value={fechaFin}
                                    onChange={setFechaFin}
                                    radius="md"
                                    size="md"
                                    placeholder="Fecha Fin"
                                />
                            </div>
                            <div className='col-3'>
                                <TextInput
                                    placeholder="Personas"
                                    radius="md"
                                    size="md"
                                />
                            </div>
                            <div className='col-2'>
                                <Button variant="filled" color="#3a5265" size="md" radius="md" onClick={buscar}>Buscar</Button>
                            </div>
                        </div>
                        <div className='row pad'>
                            <div className='col-2 offset-5'>
                                <input type="button" className='buscar redondo' value="Experiencias" onClick={experienciasNavigate} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default HomePage;
