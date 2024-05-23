import { React, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { Carousel } from '@mantine/carousel';
import { Grid, Image, Overlay, Text, Title, rem, Flex, Tabs, Box, List, ThemeIcon } from "@mantine/core";
import { IconBrandNordVpn, IconAirConditioning, IconCooker, IconWifi, IconDisabled, IconCheck } from '@tabler/icons-react';
import "../ActivitiesDetail.css";
import { Calendar } from '@mantine/dates';
import dayjs from 'dayjs';
import FormularioReserva from "./FormularioReserva";

const Equipamiento = ({ experiencia,reservaForm }) => {
    return (
        <Grid mt='xl' justify="center" style={{
            margin: 'var(--mantine-spacing-xl)',
        }}>
            <Grid.Col span={{ base: 11 }} offset={1} >
                <Title order={2}>Sobre la actividad </Title>
                <hr></hr>
                <Text size="lg">
                    {experiencia.informacion}
                </Text>
            </Grid.Col>
        </Grid>
    );

};
export default Equipamiento;