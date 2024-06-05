import Header from '../../components/Header/Header';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ExperiencePage.css';
import { Grid } from '@mantine/core';
import { Checkbox, Group } from '@mantine/core';
import { Card, Image, Alert, Text, Badge, ScrollArea, Button, rem, useMantineTheme } from '@mantine/core';
import { IconLocation, IconBed, IconInfoCircle, IconBath } from '@tabler/icons-react';
import { useInputState } from '@mantine/hooks';
import Footer from '../../components/Footer/Footer';
import { url } from '../../utils';
import { useSearchParams } from 'react-router-dom';

function ExperiencePage() {
    const [experiencias, setExperiencias] = useState([]);
    const [firstTime, setFirstTime] = useState(false);
    const [filtros, setFiltros] = useState({
        localizacion: [],
        equipamiento: [],
        alojamiento: [],
    });
    const icon = <IconInfoCircle />;
    const navigate = useNavigate();
    
        const [searchParams] = useSearchParams();
    const getDestino = () =>{
            return searchParams.get('destino');
    }
    const handleFiltroChange = (tipo, value) => {
        console.log('Handle Filtro');
        setFiltros(prevFiltros => ({
            ...prevFiltros,
            [tipo]: value,
        }));
    };
    useEffect(() => {
        console.log('Effect');
        const destino = getDestino();
        console.log('Destino',destino);
        const postData = {
            localizacion: filtros.localizacion?.length > 0 ? filtros.localizacion : destino==null?null:[destino],
            equipamiento: filtros.equipamiento?.length > 0 ? filtros.equipamiento : null,
            alojamiento: filtros.alojamiento?.length > 0 ? filtros.alojamiento : null
        };
        // Configuración de la solicitud
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                // Si la API requiere algún tipo de autenticación, puedes incluir las cabeceras correspondientes aquí
            },
            body: JSON.stringify(postData) // Convertir el objeto JavaScript a formato JSON
        };
        fetch(`${url()}/experiencias`, requestOptions)
            .then(response => response.json())
            .then(data => {
                setExperiencias(data);
            })
            .catch(error => console.error('Error fetching users:', error));
    }, [filtros]);
    const detalleExperiencia = (id) => {
        navigate('/experiencies/' + id);
    }
    return (
        <>
            <Header></Header>

            <div className='container-fluid contenedor'>
               {experiencias?( <Grid mt="xl" mb="md">
                    <Grid.Col span={{ base: 4, md: 4, lg: 2, xs: 5 }} >
                        <Grid>
                            <Grid.Col span={{ base: 4, md: 3, lg: 6, xs: 6, sm: 5 }} >
                                <Checkbox.Group 
                                    label='LOCALIDADES'
                                    value={filtros.localizacion} onChange={(value) => handleFiltroChange('localizacion', value)}
                                >

                                    <Group mt="xs">
                                        <Checkbox color="myColor" value="Oviedo" label="Oviedo" />
                                        <Checkbox color="myColor" value="Cudillero" label="Cudillero" />
                                        <Checkbox color="myColor" value="Castrillón" label="Castrillón" />
                                        <Checkbox color="myColor"value="Gijon" label="Gijón" />
                                        <Checkbox color="myColor" value="Caravia" label="Caravia" />
                                        <Checkbox color="myColor" value="Ribadedeva" label="Ribadedeva" />
                                        <Checkbox color="myColor" value="Villaviciosa" label="Villaviciosa" />
                                        <Checkbox color="myColor" value="Llanes" label="Llanes" />
                                        <Checkbox color="myColor" value="Avilés" label="Avilés" />
                                    </Group>
                                </Checkbox.Group>
                            </Grid.Col>
                        </Grid>
                        <Grid>
                            <Grid.Col span={{ base: 4, md: 4, lg: 6, xs: 6, sm: 5 }} >
                                <Checkbox.Group mt="md"
                                    label='EQUIPAMIENTO'
                                    value={filtros.equipamiento} onChange={(value) => handleFiltroChange('equipamiento', value)}
                                >
                                    <Group mt="md">
                                        <Checkbox color="myColor" value="Piscina" label="Piscina" />
                                        <Checkbox color="myColor" value="Ascensor" label="Ascensor" />
                                        <Checkbox color="myColor" value="Aparcamiento" label="Aparcamiento" />
                                        <Checkbox color="myColor" value="Aire acondicionado" label="Aire acondicionado" />
                                        <Checkbox color="myColor" value="Aceptan animales" label="Aceptan animales" />
                                        <Checkbox color="myColor" value="Vistas al mar" label="Vistas al mar" />
                                        <Checkbox color="myColor" value="Vistas a la montaña" label="Vistas a la montaña" />
                                    </Group>
                                </Checkbox.Group>
                            </Grid.Col>
                        </Grid>

                        <Grid>
                            <Grid.Col span={{ base: 4, md: 4, lg: 6, xs: 6, sm: 5 }} >
                                <Checkbox.Group mt="md"
                                    label='TIPO DE ALOJAMIENTO'
                                    value={filtros.alojamiento} onChange={(value) => handleFiltroChange('alojamiento', value)}
                                >
                                    <Group mt="md">
                                        <Checkbox color="myColor" value="Hotel" label="Hotel" />
                                        <Checkbox color="myColor" value="Albergue" label="Albergue" />
                                        <Checkbox color="myColor" value="Casa" label="Casa" />
                                        <Checkbox color="myColor" value="Apartamento" label="Apartamento" />
                                    </Group>
                                </Checkbox.Group>
                            </Grid.Col>
                        </Grid>

                    </Grid.Col>
                    <Grid.Col span={{ base: 8, md: 8, lg: 10, xs: 7 }}>
                        {experiencias.length != 0 ? (
                                <Grid mb="md">
                                    {experiencias.map((element) => {
                                        return (<Grid.Col span={{ base: 12, md: 4, lg: 3, xs: 12, sm: 6 }} key={element.id} >
                                            <Card onClick={() => { detalleExperiencia(element.id) }} style={{ cursor: 'pointer' }} shadow="sm" padding="lg" radius="md" withBorder>
                                                <Card.Section>
                                                   {element.imagenes.length>0?( <Image
                                                        src={`data:image/jpeg;base64,${element.imagenes[0].imagen}`}
                                                        height={160}
                                                        alt="Norway"
                                                    />):(null)}
                                                </Card.Section>

                                                <Group justify="space-between" mt="md" mb="xs">
                                                    <Text fw={500}>{element.titulo}</Text>
                                                </Group>

                                                <Text size="sm" mt="md" c="dimmed">
                                                    {element.descripcion}
                                                </Text>

                                                <Text size="md" mt="md" fw={700} >
                                                    {element.precio} € DESDE/NOCHE
                                                </Text>
                                                <Group justify="flex-start" mt="md" mb="xs">
                                                    <Badge color="myColor"><IconBed style={{ width: rem(16), height: rem(16) }} />  {element.habitaciones}</Badge>
                                                    {element.banios ? (
                                                        <Badge color="myColor"><IconBath style={{ width: rem(16), height: rem(16) }} />  {element.banios}</Badge>
                                                    ) : (null)}
                                                    <Badge color="myColor"><IconLocation style={{ width: rem(16), height: rem(16) }} />  {element.localizacion}</Badge>

                                                </Group>

                                            </Card>
                                        </Grid.Col>)
                                    })}


                                </Grid>
                        ) : (<Alert variant="light" color="myColor" title="No hay alojamientos disponibles para su búsqueda" icon={icon}>
                        </Alert>)}
                    </Grid.Col>
                </Grid>):(null)}
            </div>

            <Footer></Footer>
        </>
    );
}

export default ExperiencePage;