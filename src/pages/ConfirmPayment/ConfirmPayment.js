import { React, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Container } from "@mantine/core";
import { Card, Image, NumberInput, Text, Badge, Button, Group, Title, Grid, BackgroundImage } from "@mantine/core";

const ConfirmPayment = () => {
    
    let paramsUrl = useParams();
    const params = new URLSearchParams(window.location.search);
    const [paymentDetails,setPaymentDetails] = useState();
    const [reserva,setReserva] = useState();
    useEffect(() => {
        fetch('/confirmPayment/'+params.get("payment_intent"))
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setPaymentDetails(data);
            })
            .catch(error => console.error('Error fetching users:', error));
            fetch('/reserva/' + paramsUrl["reservaId"])
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setReserva(data);
            })
            .catch(error => console.error('Error fetching users:', error));
        }, []);
    return (
        <>
<Header></Header>
<BackgroundImage
                src="./assets/login.jpg"
                position="center"
                size="cover"
                repeat="no-repeat"
                height="100vh"
                maxHeight="100vh">

                <Grid justify="center" align="center" >
                    <Grid.Col span={{ base: 6 }} offset={3} mt="11%"  mb="11%" >
                      {reserva?(  <Card shadow="sm" radius="md" withBorder >

                            <Group justify="center" mt="md" mb="xs">
                                <Title order={3}>RESUMEN DEL PAGO</Title>
                            </Group>
                     

                        </Card>):(null)}

                    </Grid.Col>
                    <Grid.Col span={{ base: 3 }}></Grid.Col>
                </Grid>
            </BackgroundImage>
<Footer></Footer>
</>
    )};

export default ConfirmPayment;