import { React, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { Carousel } from '@mantine/carousel';
import { Grid, Image, Overlay, Text, Title, rem, Flex, Tabs } from "@mantine/core";
import { IconBrandNordVpn } from '@tabler/icons-react';
import "../ExperienciesDetail.css";
import { Calendar } from '@mantine/dates';
import dayjs from 'dayjs';


const Calendario = ({experiencia}) => {
    const dayRenderer = (date) => {
        const day = date.getDate();
        let tachado = false;
        experiencia.reservas.forEach(element => {
            if (fechaEstaEntre(date, new Date(element.fechaInicio), new Date(element.fechaFin))) {
                console.log(day);
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
        <Grid.Col span={{ base: 12 }} >
            <Calendar size="xl"
                renderDay={dayRenderer}
            />
        </Grid.Col>
    </Grid>);
};
export default Calendario;