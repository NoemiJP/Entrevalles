import { React, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { Carousel } from '@mantine/carousel';
import { Grid, Image, Overlay, Text, Title, rem, Flex, Tabs, Box, List, ThemeIcon } from "@mantine/core";
import { IconBrandNordVpn, IconAirConditioning, IconCooker, IconWifi, IconDisabled, IconCheck } from '@tabler/icons-react';
import "../ExperienciesDetail.css";
import { Calendar } from '@mantine/dates';
import dayjs from 'dayjs';
import FormularioReserva from "./FormularioReserva";

const Equipamiento = ({ experiencia,reservaForm }) => {
    const equipamiento = (tipo) => {
        return experiencia.equipamientos.filter(ele => ele.categoria == tipo);
    }
    return (
        <Grid mt='xl' justify="center" style={{
            margin: 'var(--mantine-spacing-xl)',
        }}>
            <Grid.Col span={{ base: 11 }} offset={1} >
                <Title order={2}>Sobre el alojamiento </Title>
                <hr></hr>
                <Text size="lg" style={{ textAlign: 'justify' }}>
                    {experiencia.informacion}
                </Text>
                <Title order={2} mt='xl' >Equipamiento</Title>
                <hr></hr>
                <Text order={2} fw={500} size="xl"><IconAirConditioning style={{ width: rem(32), height: rem(32), marginRight: rem(10) }}></IconAirConditioning>
                    General</Text>
                                            
                    <List withPadding mt='lg' icon={
                            <ThemeIcon color="white" size={24} >
                                <IconCheck style={{ width: rem(16), height: rem(16), color: 'blue' }} />
                            </ThemeIcon>
                        }>
                {equipamiento("General").map((ele) => {
                    return (

                            <List.Item>{ele.tipo}</List.Item>
                        );
                })}
                </List>
                <hr></hr>
                <Text order={2} fw={500} size="xl"><IconCooker style={{ width: rem(32), height: rem(32), marginRight: rem(10) }}></IconCooker>Cocina</Text>
                <List withPadding mt='lg' icon={
                        <ThemeIcon color="white" size={24} >
                            <IconCheck style={{ width: rem(16), height: rem(16), color: 'blue' }} />
                        </ThemeIcon>
                    }>
                {equipamiento("Cocina").map((ele) => {

                    return (
                        <List.Item>{ele.tipo}</List.Item>
                    );
                })}
                </List>
                <hr></hr>
                <Text order={2} fw={500} size="xl"><IconWifi style={{ width: rem(32), height: rem(32), marginRight: rem(10) }}></IconWifi>Electrónica</Text>
                <List withPadding mt='lg' icon={
                        <ThemeIcon color="white" size={24} >
                            <IconCheck style={{ width: rem(16), height: rem(16), color: 'blue' }} />
                        </ThemeIcon>
                    }>
                {equipamiento("Electrónica").map((ele) => {
                    return (
                        <List.Item>{ele.tipo}</List.Item>
                    );
                })}
                </List>
                <hr></hr>
                <Text order={2} fw={500} size="xl"><IconDisabled style={{ width: rem(32), height: rem(32), marginRight: rem(10) }}></IconDisabled>Accesibilidad</Text>
                <List withPadding mt='lg' icon={
                        <ThemeIcon color="white" size={24} >
                            <IconCheck style={{ width: rem(16), height: rem(16), color: 'blue' }} />
                        </ThemeIcon>
                    }>
                {equipamiento("Accesibilidad").map((ele) => {
                    return (
                        <List.Item>{ele.tipo}</List.Item>
                    );
                })}
                </List>
            </Grid.Col>
        </Grid>
    );

};
export default Equipamiento;