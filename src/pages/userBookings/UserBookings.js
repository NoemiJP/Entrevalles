import { React, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useUser } from "../../components/Usuario/UserProvider";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Container, rem, Card, Image, NumberInput, Text, Badge, Button, Group, Title, Grid, BackgroundImage } from "@mantine/core";
import { IconArrowRight } from '@tabler/icons-react';
import { url } from '../../utils';

const UserBookings = () => {

    const paramsUrl = useParams();
    const [reserva, setReserva] = useState(null);

    useEffect(() => {
        fetch(`${url()}/reserva/${paramsUrl.reservaId}`)
            .then(response => response.json())
            .then(data => {
                setReserva(data);
            })
            .catch(error => console.error('Error fetching reservation:', error));
    }, [paramsUrl.reservaId]);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('es-ES', options);
    };

    return (
        <>
            <Header />
            <Container size="xl">
            <Grid>
                <Grid.Row>
                    <Grid.Col span={{ xs: 12, sm: 8, md: 6, lg: 4 }}>
                        {reserva && (
                            <Card shadow="sm" radius="md" withBorder>
                                <Group direction="column" spacing="md" mb="md">
                                    <Title order={3}>RESUMEN DE LA RESERVA</Title>
                                    <Text size="md" fontWeight={500}>Localidad</Text>
                                    <Text size="md">{reserva.localidad}</Text>
                                    <Text size="md" fontWeight={500}>Fecha de entrada</Text>
                                    <Text size="md">{formatDate(reserva.fechaInicio)}</Text>
                                    <Text size="md" fontWeight={500}>Fecha de salida</Text>
                                    <Text size="md">{formatDate(reserva.fechaFin)}</Text>
                                    <Text size="md" fontWeight={500}>Número de huéspedes</Text>
                                    <Text size="md">{reserva.huespedesTotales}</Text>
                                    <Text size="md" fontWeight={500}>Precio pagado</Text>
                                    <Text size="md">{reserva.precioTotal}€</Text>
                                </Group>
                            </Card>
                        )}
                    </Grid.Col>
                </Grid.Row>
            </Grid>
        </Container>

            
            <Footer></Footer>
        </>
    );
}


export default UserBookings;