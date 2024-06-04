import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import React, { useState, useEffect } from 'react';
import { DateInput } from '@mantine/dates';
import './HomePage.css';
import { Button } from '@mantine/core';
import { createTheme, MantineProvider } from '@mantine/core';
import { Container, Title, TextInput, Autocomplete, rem, Combobox, ScrollArea,Grid, Input, InputBase } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { IconLocation, IconMountain, IconBrandInstagram, IconBrandFacebook } from '@tabler/icons-react';
import { useInputState } from '@mantine/hooks';
import { useCombobox } from "@mantine/core";
import { url } from '../../utils';

function HomePage() {
    const icon = <IconLocation style={{ width: rem(16), height: rem(16) }} />;
    const iconTipo = <IconMountain style={{ width: rem(16), height: rem(16) }} />;
    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
    });
    const [tipoBusqueda, setTipoBusqueda] = useState();
    const [tiposBusqueda, setTiposBusqueda] = useState(["Alojamientos", "Actividades"]);
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
        if(tipoBusqueda == "Alojamientos"){
        navigate('/digs?destino=' + destino);
        } else{
            navigate('/activities?destino=' + destino); 
        }
        console.log(destino);
    };

    const experienciasNavigate = () => {
        navigate('/digs');
    }

    return (
        <>
            <Header />
            <Container size="xxl"  className="mainContainer body"  >
                        <Grid justify="center" align="center">
                        <Grid.Col span={{ base: 12 }} >
                        <Title order={1} align="center"  style={{ color:"white", fontFamily: "Raleway" }}>ENTRE VALLES Y MONTAÑAS</Title>
                        </Grid.Col>
                        <Grid.Col span={{ xs: 12, sm: 8, md: 6, lg: 4}} >
                            <Combobox
                            store={combobox}
                            onOptionSubmit={(val) => {
                                setTipoBusqueda(val);
                                combobox.closeDropdown();
                            }}
                        >
                            <Combobox.Target>
                                <InputBase
                                    component="button"
                                    type="button"
                                    leftSection={iconTipo}
                                    size="md"
                                    style={{  minWidth: "100%"}}
                                    placeholder="Tipo de búsqueda"
                                    radius="md"
                                    pointer
                                    rightSection={<Combobox.Chevron />}
                                    rightSectionPointerEvents="none"
                                    onClick={() => combobox.toggleDropdown()}
                                >
                                    {tipoBusqueda || <Input.Placeholder>Tipo de búsqueda</Input.Placeholder>}
                                </InputBase>
                            </Combobox.Target>

                            <Combobox.Dropdown>
                                <ScrollArea.Autosize type="scroll">
                                    <Combobox.Options>{tiposBusqueda.map((item) => (
                                        <Combobox.Option value={item} key={item}>
                                            {item}
                                        </Combobox.Option>
                                    ))}</Combobox.Options>
                                </ScrollArea.Autosize>
                            </Combobox.Dropdown>
                        </Combobox>
                        </Grid.Col>
                        <Grid.Col span={{ xs: 12, sm: 8, md: 6, lg: 4}}>
                                <Autocomplete
                                    leftSectionPointerEvents="none"
                                    leftSection={icon}
                                    placeholder="Destino"
                                    radius="md"
                                    size="md"
                                    pointer
                                    data={localidadesAsturias}
                                    value={destino}
                                    onChange={setDestino}
                                />
                            </Grid.Col>
                            <Grid.Col span={{xs: 12, sm: 8, md: 6, lg: 4}}>
                                <Button variant="filled" color="#3a5265"  fullWidth size="md" radius="md" onClick={buscar}>Buscar</Button>
                                </Grid.Col>
                                </Grid>
                    
            </Container>
            <Footer />
            </>
    );
}

export default HomePage;
