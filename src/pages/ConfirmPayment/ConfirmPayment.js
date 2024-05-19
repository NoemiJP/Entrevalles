import { React, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useUser } from "../../components/Usuario/UserProvider";
import './ConfirmPayment.css';
import { Container, rem, Card, Image, NumberInput, Text, Badge, Button, Group, Title, Grid, BackgroundImage } from "@mantine/core";
import { IconArrowRight } from '@tabler/icons-react';
import { url } from "../../utils";
const ConfirmPayment = () => {

    let paramsUrl = useParams();
    const { user, updateUser } = useUser();
    const params = new URLSearchParams(window.location.search);
    const [paymentDetails, setPaymentDetails] = useState();
    const [reserva, setReserva] = useState();
    useEffect(() => {
        fetch(`${url()}/login/`  + paramsUrl["userId"])
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data); 
                updateUser(data);
            })
            .catch(error => console.error('Error login:', error));
        fetch(`${url()}/confirmPayment/` + params.get("payment_intent"))
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setPaymentDetails(data);
            })
            .catch(error => console.error('Error fetching users:', error));
        fetch(`${url()}/reserva/` + paramsUrl["reservaId"])
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setReserva(data);
            })
            .catch(error => console.error('Error fetching users:', error));
    }, []);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('es-ES', options);
    };

    return (
        <>
           {user.nombre != null ? (<> <Header></Header>
            <Container size="xxl" className="mainContainerPayment payment"  >
               <Grid justify="center" align="center" overflow="hidden" >
                    <Grid.Col span={{ base: 12 }} mt="7%">
                        {reserva ? (<Card shadow="sm" radius="md" withBorder  >

                            <Group justify="center" mt="md" mb="md" c={'#355D75'}>
                                <Title order={3}>RESUMEN DE LA  RESERVA</Title>
                            </Group>

                            <Group direction="column" spacing="md" mb="md">
                                <Text size="md" fw={500} >Localidad</Text>
                                <IconArrowRight style={{ width: rem(16), height: rem(16), color:'#355D75' }} />  
                                <Text size="md">{reserva.experiencia.localizacion}</Text>
                            </Group>

                            <Group direction="column" spacing="md" mb="md">
                                <Text size="md" fw={500} >Alojamiento</Text>
                                <IconArrowRight style={{ width: rem(16), height: rem(16), color:'#355D75' }} />
                                <Text size="md">{reserva.experiencia.titulo}</Text>
                            </Group>

                            <Group direction="column" spacing="md" mb="md">
                                <Text size="md" fw={500} >Fecha de entrada </Text>
                                <IconArrowRight style={{ width: rem(16), height: rem(16), color:'#355D75' }} />
                                <Text size="md">{formatDate(reserva.fechaInicio)}</Text>
                            </Group>

                            <Group direction="column" spacing="md" mb="md">
                            <Text size="md" fw={500} >Fecha de salida </Text>
                            <IconArrowRight style={{ width: rem(16), height: rem(16), color:'#355D75' }} />
                            <Text size="md">{formatDate(reserva.fechaFin)}</Text>
                            </Group>

                            <Group direction="column" spacing="md" mb="md">
                            <Text size="md" fw={500} >Número de huéspedes</Text>
                            <IconArrowRight style={{ width: rem(16), height: rem(16), color:'#355D75' }} />
                            <Text size="md">{reserva.huespedesTotales}</Text>
                            </Group>
                            
                            <Group direction="column" spacing="md" mb="md">
                            <Text size="md" fw={500} >Precio pagado</Text>
                            <IconArrowRight style={{ width: rem(16), height: rem(16), color:'#355D75'}} />
                            <Text size="md">{reserva.precioTotal}€</Text>
                            </Group>
                        </Card>) : (null)}

                    </Grid.Col>
                    <Grid.Col span={{ base: 3 }}></Grid.Col>
                </Grid>
            </Container>
            <Footer></Footer></>):(null)}
        </>
    );
}


export default ConfirmPayment;