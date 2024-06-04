import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Checkbox, Group, Card, Image, Alert, Text, Badge } from '@mantine/core';
import { IconLocation, IconInfoCircle } from '@tabler/icons-react';
import Footer from '../../components/Footer/Footer';
import { url } from '../../utils';
import Header from '../../components/Header/Header';
import { useSearchParams } from 'react-router-dom';

function ActivitiesPage() {
    const [actividades, setActividades] = useState([]);
    const [actividadesFiltradas, setActividadesFiltradas] = useState([]);
    const [firstTime,setFirstTime] = useState(true);
    const [filtros, setFiltros] = useState({
        localizacion: [],
        tipo_actividad: [],
        tipo_alojamiento: [],
    });
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const getDestino = () =>{
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
        if(destino != null && firstTime){
            console.log('Destino');
            handleFiltroChange('localizacion',[destino]);
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
    },[filtros]);

    

    const handleActividadClick = (id) => {
        console.log('Actividad clickeada:', id);
        navigate('/activities/' + id);
    };

    return (
        <>
            <Header />
            <div className='container-fluid contenedor'>
                <Grid mt="xl">
                    <Grid.Col span={{ base: 4, md: 4, lg: 2, xs: 12 }}>
                        <Group direction="column" spacing="lg">
                            <Checkbox.Group
                                label='LOCALIZACIÓN'
                                value={filtros.localizacion}
                                onChange={(value) => handleFiltroChange('localizacion', value)}
                            >
                                <Checkbox value="Langreo" label="Langreo" />
                                <Checkbox value="Mieres" label="Mieres" />
                                <Checkbox value="Laviana" label="Laviana" />
                                <Checkbox value="Gijon" label="Gijón" />
                            </Checkbox.Group>
                        </Group>

                        <Group mt="xl" direction="column" spacing="lg">
                            <Checkbox.Group
                                label='TIPO DE ACTIVIDAD'
                                value={filtros.tipo_actividad}
                                onChange={(value) => handleFiltroChange('tipo_actividad', value)}
                            >
                                <Checkbox value="Aire libre" label="Aire libre" />
                                <Checkbox value="Interior" label="Interior" />
                            </Checkbox.Group>
                        </Group>

                        <Group mt="xl" direction="column" spacing="lg">
                            <Checkbox.Group
                                label='ACTIVIDADES'
                                value={filtros.tipo_alojamiento}
                                onChange={(value) => handleFiltroChange('tipo_alojamiento', value)}
                            >
                                <Checkbox value="Senderismo y Trekking" label="Senderismo y Trekking" />
                                <Checkbox value="Ciclismo" label="Ciclismo" />
                                <Checkbox value="Escalada" label="Escalada" />
                                <Checkbox value="Kayak y Canotaje" label="Kayak y Canotaje" />
                                <Checkbox value="Deportes Acuáticos" label="Deportes Acuáticos" />
                                <Checkbox value="Museos y Galerías de Arte" label="Museos y Galerías de Arte" />
                                <Checkbox value="Cine o Teatro" label="Cine o Teatro" />
                                <Checkbox value="Spas y Centros de Bienestar" label="Spas y Centros de Bienestar" />
                                {/* Agrega más tipos de alojamiento aquí según tus necesidades */}
                            </Checkbox.Group>
                        </Group>
                    </Grid.Col>
                    <Grid.Col span={{ base: 8, md: 8, lg: 10, xs: 12 }}>
                        {actividadesFiltradas.length > 0 ? (
                            <Grid mb="md">
                                {actividadesFiltradas.map((actividad) => (
                                    <Grid.Col key={actividad.id} span={{ base: 12, md: 4, lg: 3, xs: 12, sm: 6 }}>
                                        <Card onClick={() => handleActividadClick(actividad.id)} style={{ cursor: 'pointer' }} shadow="sm" padding="lg" radius="md" withBorder>
                                            <Card.Section>
                                            {actividad.imagenes.length>0?( <Image
                                                        src={`data:image/jpeg;base64,${actividad.imagenes[0].imagen}`}
                                                        height={160}
                                                        alt="Norway"
                                                    />):(null)}
                                            </Card.Section>
                                            <Text size="xl" mt="md" c="dimmed">{actividad.titulo}</Text>
                                            <Text size="sm" mt="md" c="dimmed">{actividad.descripcion}</Text>
                                            <Text size="md" mt="md" fw={700}>{actividad.precio} € DESDE/NOCHE</Text>
                                            <Badge mt="md">{actividad.localizacion}</Badge>
                                            <Badge>{actividad.tipoActividad}</Badge>
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
