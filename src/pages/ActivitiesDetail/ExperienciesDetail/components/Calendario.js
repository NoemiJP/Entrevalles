import { React, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { Carousel } from '@mantine/carousel';
import { Grid, Image, Overlay, Text, Title, List, ThemeIcon, rem, Flex, Tabs } from "@mantine/core";
import { IconBrandNordVpn, IconCircle } from '@tabler/icons-react';
import "../ActivitiesDetail.css";
import { Calendar } from '@mantine/dates';
import dayjs from 'dayjs';
import FormularioReserva from "./FormularioReserva";


const Calendario = ({ experiencia,reservaForm }) => {
    const dayRenderer = (date) => {
        const day = date.getDate();
        let tachado = false;
        experiencia.reservas.forEach(element => {
            if (fechaEstaEntre(date, new Date(element.fechaInicio), new Date(element.fechaFin))) {
                tachado = true;

            }
        });
        if (tachado) {
            return (
                <div style={{ textDecoration: "line-through", color: "#a5a5a5" }}>{day}</div>
            );
        } else {
            return (
                <div>{day}</div>
            );
        }
    };
    const fechaEstaEntre = (fecha, fechaInicio, fechaFin) => {
        return fecha >= fechaInicio && fecha <= fechaFin;
    }
    return (<Grid>

        <Grid.Col span={{ base: 4 }} offset={2}  mt="3%">
            <List withPadding mt='lg' icon={
                <ThemeIcon color="white" size={28} >
                    <IconCircle style={{ width: rem(28), height: rem(28), color: 'red', marginTop: rem(10) }} />
                </ThemeIcon>
            }>
                <List.Item><Text size="lg">Días Festivos / Fines de semana</Text></List.Item>
                <List.Item icon={
                    <ThemeIcon color="white" size={28} >
                        <IconCircle style={{ width: rem(28), height: rem(28), color: 'gray', marginTop: rem(10) }} />
                    </ThemeIcon>
                }><Text size="lg">Días Reservado</Text></List.Item>
                <List.Item icon={
                    <ThemeIcon color="white" size={28} >
                        <IconCircle style={{ width: rem(28), height: rem(28), color: 'black', marginTop: rem(10) }} />
                    </ThemeIcon>
                }><Text size="lg">Días Disponible</Text></List.Item>
            </List>
        </Grid.Col>
        <Grid.Col span={{ base: 3 }} offset={2}  mt="3%" >
            <Calendar size="xl"
                renderDay={dayRenderer}
            />
        </Grid.Col>
    </Grid>);
};
export default Calendario;