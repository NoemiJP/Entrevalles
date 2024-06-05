import { React, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { Carousel } from '@mantine/carousel';
import { Grid, Image, Overlay, Text, Title, rem, Flex, Tabs, Box, List, ThemeIcon } from "@mantine/core";
import { IconBrandNordVpn, IconAirConditioning, IconCooker, IconX, IconWifi, IconDisabled, IconCheck } from '@tabler/icons-react';
import "../ExperienciesDetail.css";
import { Calendar } from '@mantine/dates';
import dayjs from 'dayjs';
import FormularioReserva from "./FormularioReserva";

const Normas = ({ experiencia, reservaForm }) => {
    const restricciones = (tipo) => {
        return experiencia.restricciones.filter(ele => ele.permitido == tipo);
    }
    return (
        <Grid mt='xl' justify="center" style={{
            margin: 'var(--mantine-spacing-xl)',
        }}>
            <Grid.Col span={{ base: 11 }} offset={1} >
                <Title order={2}>Normas de la casa</Title>
                <hr></hr>
                <Text order={2} fw={500} size="xl">
                    Política de cancelación</Text>
                <Text order={2} mt='lg'>
                    <p>Entendemos que a veces surgen imprevistos y es necesario cancelar una reserva. A continuación, te presentamos nuestra política de cancelación:</p>

                    <p>Cancelando con más de 5 días de antelación, se hará un reembolso del 100% de la estancia.</p>

                    <p>Lamentablemente, no podemos ofrecer reembolsos por cancelaciones realizadas dentro de los 5 días previos a la fecha de llegada.</p>

                    <p>Apreciamos tu comprensión y cooperación en este asunto.</p></Text>
                <Text order={2} fw={500} size="xl" mt="lg">
                    Restricciones</Text>
                    <Text order={2} mt='lg'>
                <p>Para asegurar una experiencia agradable para todos nuestros huéspedes, queremos informarte sobre las siguientes restricciones:</p>

                <p>Edad mínima: Todos los huéspedes deben tener al menos 18 años de edad, a menos que estén acompañados por un adulto.</p>

                <p>Consumo de alcohol: El consumo de alcohol está permitido únicamente para personas mayores de 21 años y está sujeto a las leyes locales y regulaciones del establecimiento.</p>

                <p>Uso de instalaciones: Algunas áreas y servicios pueden tener restricciones de uso o acceso.Por favor, consulta con el personal si tienes alguna pregunta sobre estas restricciones.</p >

                <p>Gracias por tu atención a estas restricciones, las cuales están diseñadas para garantizar una experiencia segura y placentera para todos nuestros huéspedes.</p >
                </Text>
                
                <Grid>
                    <Grid.Col span={{ base: 6 }} >
                        <List withPadding mt='lg' icon={
                            <ThemeIcon color="white" size={24} >
                                <IconCheck style={{ width: rem(16), height: rem(16), color: 'blue' }} />
                            </ThemeIcon>
                        }>
                            {restricciones(true).map((ele) => {
                                return (

                                    <List.Item>{ele.nombre}</List.Item>
                                );
                            })}
                        </List>
                    </Grid.Col>
                    <Grid.Col span={{ base: 6 }}>
                        <List withPadding mt='lg' icon={
                            <ThemeIcon color="white" size={24} >
                                <IconX style={{ width: rem(16), height: rem(16), color: 'red' }} />
                            </ThemeIcon>
                        }>
                            {restricciones(false).map((ele) => {
                                return (

                                    <List.Item>{ele.nombre}</List.Item>
                                );
                            })}
                        </List>
                    </Grid.Col>
                </Grid>
            </Grid.Col >
        </Grid >
    );
};
export default Normas;