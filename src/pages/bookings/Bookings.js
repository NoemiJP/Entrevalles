import { React, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useUser } from "../../components/Usuario/UserProvider";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { IconArrowRight, IconInfoCircle } from '@tabler/icons-react';
import { Container, Alert,rem, Card, Image, NumberInput, Text, Badge, Button, Group, Title, Grid, BackgroundImage } from "@mantine/core";
import { url } from '../../utils';
import './Bookings.css';

const Bookings = () => {

    const user = useUser();
    const [reservas, setReservas] = useState([]);

    useEffect(() => {
        console.log(user);
        fetch(`${url()}/reservas/${user.user.id}`)
            .then(response => response.json())
            .then(data => {
                setReservas(data);
            })
            .catch(error => console.error('Error fetching reservation:', error));
    }, [user]);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('es-ES', options);
    };

    return (
        <>
            <Header />
            <Container size="xs" style={{minHeight:"81vh"}}>
                {reservas && reservas.length > 0 ? (<Grid>
                    <Grid.Col span={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
                        {reservas.map((reserva) => {
                            return (
                                <Card shadow="sm" radius="md" mt="md" mb="md" withBorder>
                                    <Group justify="center" mt="md" mb="md" c={'#355D75'}>
                                        <Title order={3}>RESUMEN DE LA  RESERVA</Title>
                                    </Group>

                                    {reserva.experiencia ? (<Group direction="column" spacing="md" mb="md">
                                        <Text size="md" fw={500} >Localidad</Text>
                                        <IconArrowRight style={{ width: rem(16), height: rem(16), color: '#355D75' }} />
                                        <Text size="md">{reserva.experiencia.localizacion}</Text>
                                    </Group>) : (null)}

                                    {reserva.actividad ? (<Group direction="column" spacing="md" mb="md">
                                        <Text size="md" fw={500} >Localidad</Text>
                                        <IconArrowRight style={{ width: rem(16), height: rem(16), color: '#355D75' }} />
                                        <Text size="md">{reserva.actividad.localizacion}</Text>
                                    </Group>) : (null)}

                                    {reserva.experiencia ? (<Group direction="column" spacing="md" mb="md">
                                        <Text size="md" fw={500} >Alojamiento</Text>
                                        <IconArrowRight style={{ width: rem(16), height: rem(16), color: '#355D75' }} />
                                        <Text size="md">{reserva.experiencia.titulo}</Text>
                                    </Group>) : (null)}

                                    {reserva.actividad ? (<Group direction="column" spacing="md" mb="md">
                                        <Text size="md" fw={500} >Alojamiento</Text>
                                        <IconArrowRight style={{ width: rem(16), height: rem(16), color: '#355D75' }} />
                                        <Text size="md">{reserva.actividad.titulo}</Text>
                                    </Group>) : (null)}

                                    <Group direction="column" spacing="md" mb="md">
                                        <Text size="md" fw={500} >Fecha de entrada </Text>
                                        <IconArrowRight style={{ width: rem(16), height: rem(16), color: '#355D75' }} />
                                        <Text size="md">{formatDate(reserva.fechaInicio)}</Text>
                                    </Group>

                                    <Group direction="column" spacing="md" mb="md">
                                        <Text size="md" fw={500} >Fecha de salida </Text>
                                        <IconArrowRight style={{ width: rem(16), height: rem(16), color: '#355D75' }} />
                                        <Text size="md">{formatDate(reserva.fechaFin)}</Text>
                                    </Group>

                                    {reserva.huespedesTotales ? (<Group direction="column" spacing="md" mb="md">
                                        <Text size="md" fw={500} >Número de huéspedes</Text>
                                        <IconArrowRight style={{ width: rem(16), height: rem(16), color: '#355D75' }} />
                                        <Text size="md">{reserva.huespedesTotales}</Text>
                                    </Group>) : (null)}

                                    {reserva.personas ? (<Group direction="column" spacing="md" mb="md">
                                        <Text size="md" fw={500} >Número de personas</Text>
                                        <IconArrowRight style={{ width: rem(16), height: rem(16), color: '#355D75' }} />
                                        <Text size="md">{reserva.personas}</Text>
                                    </Group>) : (null)}

                                    {reserva.precioTotal ? (<Group direction="column" spacing="md" mb="md">
                                        <Text size="md" fw={500} >Precio pagado</Text>
                                        <IconArrowRight style={{ width: rem(16), height: rem(16), color: '#355D75' }} />
                                        <Text size="md">{reserva.precioTotal}€</Text>
                                    </Group>) : (null)}
                                    {reserva.precio ? (<Group direction="column" spacing="md" mb="md">
                                        <Text size="md" fw={500} >Precio pagado</Text>
                                        <IconArrowRight style={{ width: rem(16), height: rem(16), color: '#355D75' }} />
                                        <Text size="md">{reserva.precio}€</Text>
                                    </Group>):(null)}
                                    </Card>
                            )
                        })}
                    </Grid.Col>
                </Grid>) : (<Alert variant="light" color="myColor" title="No tiene ninguna reserva" icon={<IconInfoCircle />} />)}
            </Container>


            <Footer></Footer>
        </>
    );
}


export default Bookings;