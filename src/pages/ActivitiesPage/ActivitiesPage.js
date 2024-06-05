import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Checkbox, Group, Card, Image, Alert, Text, Badge, rem } from '@mantine/core';
import { IconLocation, IconHomeEco } from '@tabler/icons-react';
import Footer from '../../components/Footer/Footer';
import { url } from '../../utils';
import Header from '../../components/Header/Header';
import { useSearchParams } from 'react-router-dom';

function ActivitiesPage() {
    const [actividades, setActividades] = useState([]);
    const [actividadesFiltradas, setActividadesFiltradas] = useState([]);
    const [firstTime, setFirstTime] = useState(true);
    const [filtros, setFiltros] = useState({
        localizacion: [],
        tipo_actividad: [],
        tipo_alojamiento: [],
    });
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const getDestino = () => {
        return searchParams.get('destino');
    };
    useEffect(() => {
        fetch(`${url()}/activities`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setActividades(data);
                setActividadesFiltradas(data);
            })
            .catch(error => console.error('Error fetching activities:', error));
    }, []);
    const handleFiltroChange = (tipo, value) => {
        setFiltros(prevFiltros => ({
            ...prevFiltros,
            [tipo]: value,
        }));
    };

    useEffect(() => {
        const destino = getDestino();
        if (destino != null && firstTime) {
            console.log('Destino');
            handleFiltroChange('localizacion', [destino]);
            setFirstTime(false);
        }
        setActividadesFiltradas(actividades.filter(actividad => {
            return (
                filtros.localizacion.length === 0 || filtros.localizacion.includes(actividad.localizacion)
            ) && (
                    filtros.tipo_actividad.length === 0 || filtros.tipo_actividad.includes(actividad.tipoActividad)
                ) && (
                    filtros.tipo_alojamiento.length === 0 || filtros.tipo_alojamiento.includes(actividad.tipoDeporte)
                );
        }));
    }, [filtros]);



    const handleActividadClick = (id) => {
        console.log('Actividad clickeada:', id);
        navigate('/activities/' + id);
    };

    return  (
        <>
            <Header />
            <div className='container-fluid contenedor'>
                <Grid mt="xl" mb="md">
                    <Grid.Col span={{ base: 4, md: 4, lg: 2, xs: 5 }}>
                        <Grid>
                            <Grid.Col span={{ base: 4, md: 3, lg: 6, xs: 6, sm: 5 }}>
                                <Checkbox.Group
                                    label='LOCALIZACIÓN'
                                    value={filtros.localizacion}
                                    onChange={(value) => handleFiltroChange('localizacion', value)}
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
                            <Grid.Col span={{ base: 4, md: 4, lg: 6, xs: 6, sm: 5 }}>
                                <Checkbox.Group mt="md"
                                    label='TIPO DE ACTIVIDAD'
                                    value={filtros.tipo_actividad}
                                    onChange={(value) => handleFiltroChange('tipo_actividad', value)}
                                >
                                    <Group mt="md">
                                        <Checkbox value="Aire libre" label="Aire libre" />
                                        <Checkbox value="Interior" label="Interior" />
                                    </Group>
                                </Checkbox.Group>
                            </Grid.Col>
                        </Grid>

                        <Grid>
                            <Grid.Col span={{ base: 4, md: 4, lg: 6, xs: 6, sm: 5 }}>
                                <Checkbox.Group mt="md"
                                    label='ACTIVIDADES'
                                    value={filtros.tipo_alojamiento}
                                    onChange={(value) => handleFiltroChange('tipo_alojamiento', value)}
                                >
                                    <Group mt="md">
                                        <Checkbox value="Montaña" label="Montaña" />
                                        <Checkbox value="Aventura" label="Aventura" />
                                        <Checkbox value="Acuáticas" label="Acuáticas" />
                                        <Checkbox value="Aéreas" label="Aéreas" />
                                        <Checkbox value="Tierra" label="Tierra" />
                                        <Checkbox value="Invierno" label="Invierno" />
                                        <Checkbox value="Spas" label="Spas" />
                                    </Group>
                                </Checkbox.Group>
                            </Grid.Col>
                        </Grid>
                    </Grid.Col>
                    <Grid.Col span={{ base: 8, md: 8, lg: 10, xs: 7 }}>
                        {actividadesFiltradas.length > 0 ? (
                            <Grid mb="md">
                                {actividadesFiltradas.map((actividad) => (
                                    <Grid.Col key={actividad.id} span={{ base: 12, md: 4, lg: 3, xs: 12, sm: 6 }}>
                                        <Card onClick={() => handleActividadClick(actividad.id)} style={{ cursor: 'pointer' }} shadow="sm" padding="lg" radius="md" withBorder>
                                            <Card.Section>
                                                {actividad.imagenes.length > 0 ? (
                                                    <Image
                                                        src={`data:image/jpeg;base64,${actividad.imagenes[0].imagen}`}
                                                        height={160}
                                                        alt="Activity"
                                                    />
                                                ) : (null)}
                                            </Card.Section>
                                            <Text size="xl" mt="md" c="dimmed">{actividad.titulo}</Text>
                                            <Text size="sm" mt="md" c="dimmed">{actividad.descripcion}</Text>
                                            <Text size="md" mt="md" fw={700}>{actividad.precio} €</Text>
                                            <Group justify="flex-start" mt="md" mb="xs">
                                            <Badge><IconLocation style={{ width: rem(16), height: rem(16) }} />  {actividad.localizacion}</Badge>
                                            <Badge><IconHomeEco style={{ width: rem(16), height: rem(16) }} /> {actividad.tipoActividad}</Badge>
                                            </Group> 
                                        </Card>
                                    </Grid.Col>
                                ))}
                            </Grid>
                        ) : (
                            <Alert variant="light" color="blue" title="No hay actividades disponibles para su búsqueda" />
                        )}
                    </Grid.Col>
                </Grid>
            </div>
            <Footer />
        </>
    );
}

export default ActivitiesPage;
