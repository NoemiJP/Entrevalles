import { React, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { Carousel } from '@mantine/carousel';
import { Grid, Image, Overlay, Text, Title, rem, Flex, Tabs, Box, List, ThemeIcon } from "@mantine/core";
import { IconBrandNordVpn, IconAirConditioning, IconCooker,IconX, IconWifi, IconDisabled, IconCheck } from '@tabler/icons-react';
import "../ActivitiesDetail.css";
import { Calendar } from '@mantine/dates';
import dayjs from 'dayjs';
import FormularioReserva from "./FormularioReserva";

const Normas = ({ experiencia,reservaForm }) => {
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
                <Text order={2}  fw={500} size="xl">
                    Política de cancelación</Text>
                    <Text order={2} mt='lg'>
                    Cancelando con más de 5 días de antelación, se hará un reembolso del 100% de la estancia.</Text>
                <Text order={2} fw={500} size="xl" mt="lg">
                    Restricciones</Text>
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
            </Grid.Col>
        </Grid>
    );
};
export default Normas;