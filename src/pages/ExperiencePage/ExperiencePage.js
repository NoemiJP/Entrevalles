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

function ExperiencePage() {
    const [experiencias, setExperiencias] = useState([]);
    const [localizacion, setLocalizacion] = useState();
    const [equipamiento, setEquipamiento] = useState();
    const [alojamiento, setAlojamiento] = useState();
    const icon = <IconInfoCircle />;
    const navigate = useNavigate();
    useEffect(() => {
        const postData = {
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
    }, []);
    useEffect(() => {
        const postData = {
            localizacion: localizacion?.length > 0 ? localizacion : null,
            equipamiento: equipamiento?.length > 0 ? equipamiento : null,
            alojamiento: alojamiento?.length > 0 ? alojamiento : null
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
    }, [localizacion, equipamiento, alojamiento]);
    const detalleExperiencia = (id) => {
        navigate('/experiencies/' + id);
    }
    return (
        <>
            <Header></Header>

            <div className='container-fluid contenedor'>
               {experiencias?( <Grid mt="xl">
                    <Grid.Col span={{ base: 4, md: 4, lg: 2, xs: 5 }} >
                        <Grid>
                            <Grid.Col span={{ base: 4, md: 3, lg: 6, xs: 6, sm: 5 }} >
                                <Checkbox.Group
                                    label='LOCALIDADES'
                                    value={localizacion} onChange={setLocalizacion}
                                >

                                    <Group mt="xs">
                                        <Checkbox value="Langreo" label="Langreo" />
                                        <Checkbox value="Mieres" label="Mieres" />
                                        <Checkbox value="Laviana" label="Laviana" />
                                        <Checkbox value="Gijon" label="Gijón" />
                                    </Group>
                                </Checkbox.Group>
                            </Grid.Col>
                        </Grid>
                        <Grid>
                            <Grid.Col span={{ base: 4, md: 4, lg: 6, xs: 6, sm: 5 }} >
                                <Checkbox.Group
                                    label='EQUIPAMIENTO'
                                    value={equipamiento} onChange={setEquipamiento}
                                >
                                    <Group mt="md">
                                        <Checkbox value="Piscina" label="Piscina" />
                                        <Checkbox value="Ascensor" label="Ascensor" />
                                        <Checkbox value="Aparcamiento" label="Aparcamiento" />
                                        <Checkbox value="Aire acondicionado" label="Aire acondicionado" />
                                        <Checkbox value="Aceptan animales" label="Aceptan animales" />
                                        <Checkbox value="Vistas al mar" label="Vistas al mar" />
                                        <Checkbox value="Vistas a la montaña" label="Vistas a la montaña" />
                                    </Group>
                                </Checkbox.Group>
                            </Grid.Col>
                        </Grid>

                        <Grid>
                            <Grid.Col span={{ base: 4, md: 4, lg: 6, xs: 6, sm: 5 }} >
                                <Checkbox.Group
                                    label='TIPO DE ALOJAMIENTO'
                                    value={alojamiento} onChange={setAlojamiento}
                                >
                                    <Group mt="md">
                                        <Checkbox value="hotel" label="Hotel" />
                                        <Checkbox value="camping" label="Camping" />
                                        <Checkbox value="casa" label="Casa" />
                                        <Checkbox value="apartamento" label="Apartamento" />
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
                                                    <Badge ><IconBed style={{ width: rem(16), height: rem(16) }} />  {element.habitaciones}</Badge>
                                                    {element.banios ? (
                                                        <Badge ><IconBath style={{ width: rem(16), height: rem(16) }} />  {element.banios}</Badge>
                                                    ) : (null)}
                                                    <Badge ><IconLocation style={{ width: rem(16), height: rem(16) }} />  {element.localizacion}</Badge>

                                                </Group>

                                            </Card>
                                        </Grid.Col>)
                                    })}


                                </Grid>
                        ) : (<Alert variant="light" color="blue" title="No hay alojamientos disponibles para su búsqueda" icon={icon}>
                        </Alert>)}
                    </Grid.Col>
                </Grid>):(null)}
            </div>

            <Footer></Footer>
        </>
    );
}

export default ExperiencePage;