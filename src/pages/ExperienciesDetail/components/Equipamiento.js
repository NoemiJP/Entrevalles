import { React, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { Carousel } from '@mantine/carousel';
import { Grid, Image, Overlay, Text, Title, rem, Flex, Tabs, Box } from "@mantine/core";
import { IconBrandNordVpn, IconAirConditioning } from '@tabler/icons-react';
import "../ExperienciesDetail.css";
import { Calendar } from '@mantine/dates';
import dayjs from 'dayjs';

const Equipamiento = ({ experiencia }) => {
    const equipamiento = (tipo) => {
        return experiencia.equipamientos.filter(ele => ele.categoria == tipo);
    }
    return (
        <Grid mt='xl' justify="center" style={{
            margin: 'var(--mantine-spacing-xl)',
        }}>
            <Grid.Col span={{ base: 6 }} offset={1} >
                <Title order={2}>Sobre el alojamiento </Title>
                <hr></hr>
                <Text size="lg">
                    {experiencia.informacion}
                </Text>
                <Title order={2} mt='xl' >Equipamiento</Title>
                <hr></hr>
                <Text order={2} fw={500} size="xl"><IconAirConditioning style={{ width: rem(32), height: rem(32), marginRight: rem(10)}}></IconAirConditioning>
                General</Text>
                {equipamiento("General").map((ele) => {
                    return (<Text>{ele.tipo}</Text>);
                })}
                <hr></hr>
                <Text order={2}>Cocina</Text>
                {equipamiento("Cocina").map((ele) => {
                    return (<Text>{ele.tipo}</Text>);
                })}
                <hr></hr>
                <Text order={2}>Electrónica</Text>
                {equipamiento("Electrónica").map((ele) => {
                    return (<Text>{ele.tipo}</Text>);
                })}
                <hr></hr>
                <Text order={2}>Accesibilidad</Text>
                {equipamiento("Accesibilidad").map((ele) => {
                    return (<Text>{ele.tipo}</Text>);
                })}
            </Grid.Col>
            <Grid.Col span={{ base: 5 }} >

            </Grid.Col>
        </Grid>
    );

};
export default Equipamiento;