import { React, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { Carousel } from '@mantine/carousel';
import { Card, Image, NumberInput, Text, Badge, Button, Group, Title } from "@mantine/core";
import { IconBrandNordVpn } from '@tabler/icons-react';
import "../ExperienciesDetail.css";
import { Calendar, DateInput } from '@mantine/dates';
import dayjs from 'dayjs';


const FormularioReserva = ({ experiencia }) => {
    const [fechaInicio, setFechaInicio] = useState(new Date());
    const [fechaFin, setFechaFin] = useState(new Date());
    const [adultos, setAdultos] = useState(2);
    const [niños, setNiños] = useState(0);
    const [mascotas, setMascotas] = useState(0);
    const [mostrarPrecio, setMostrarPrecio] = useState(false);
    const [precioTotal, setPrecioTotal] = useState(0);
    const [huespedes, setHuespedes] = useState(0);
    const [dias, setDias] = useState(0);
    const buscar = () => {
        console.log(adultos);
        setHuespedes(adultos + niños + mascotas);
        let dias = calcularDiferenciaFechas(fechaInicio, fechaFin)
        setDias(dias);
        setPrecioTotal(dias * experiencia.precio);
        setMostrarPrecio(true);
    };
    useEffect(() => {
        fechaFin.setDate(fechaFin.getDate() + 1);
        setFechaFin(fechaFin);
    }, []);

    const calcularDiferenciaFechas = (fecha1, fecha2) => {

        // Calcular la diferencia en milisegundos
        const diffMs = Math.abs(fecha2 - fecha1);

        // Convertir la diferencia de milisegundos a días
        const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

        return diffDays;
    };
    const cambiarFechaFin = (value) => {
        setFechaFin(value);
        setMostrarPrecio(false);
    };
    const cambiarFechaInicio = (value) => {
        setFechaInicio(value);
        setMostrarPrecio(false);
    };
    const cambiarAdultos = (value) => {
        setAdultos(value);
        setMostrarPrecio(false);
    };
    const cambiarNiños = (value) => {
        setNiños(value);
        setMostrarPrecio(false);
    };
    const cambiarMascotas = (value) => {
        setMascotas(value);
        setMostrarPrecio(false);
    };
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section justify="center" mt="xs">
                <Group justify="center">
                    <Text fw={500} size="lg">Buscar disponibilidad</Text>
                </Group>
            </Card.Section>
            <hr></hr>
            <Group justify="space-between" mt="md" mb="xs">
                <DateInput
                    value={fechaInicio}
                    onChange={(e) => cambiarFechaInicio(e)}
                    radius="md"
                    size="md"
                    placeholder="Fecha Inicio"
                />
                <DateInput
                    value={fechaFin}
                    onChange={(e) => cambiarFechaFin(e)}
                    radius="md"
                    size="md"
                    placeholder="Fecha Fin"
                />
            </Group>
            <Group mt="md" mb="xs">

                <NumberInput
                    style={{ minWidth: "100%" }}
                    size="md"
                    radius="md"
                    label="Adultos"
                    defaultValue={2}
                    allowNegative={false}
                    value={adultos}
                    onChange={(e) => cambiarAdultos(e)}
                />
            </Group>
            <Group mt="md" mb="xs">

                <NumberInput
                    style={{ minWidth: "100%" }}
                    size="md"
                    radius="md"
                    label="Niños"
                    defaultValue={0}
                    allowNegative={false}
                    value={niños}
                    onChange={(e) => cambiarNiños(e)}
                />
            </Group>
            <Group mt="md" mb="xs">

                <NumberInput
                    style={{ minWidth: "100%" }}
                    size="md"
                    radius="md"
                    label="Mascotas"
                    defaultValue={0}
                    allowNegative={false}
                    value={mascotas}
                    onChange={(e) => cambiarMascotas(e)}
                />
            </Group>

            <Button color="blue" fullWidth mt="md" onClick={buscar} radius="md">
                Buscar
            </Button>
            {mostrarPrecio ? (<>
                <Group justify="space-between" mt="md" mb="xs">
                    <Text>Número de noches</Text><Text>{dias}</Text></Group>
                <Group justify="space-between" mt="md" mb="xs"><Text>Huéspedes</Text><Text>{huespedes}</Text></Group>
                <Group justify="space-between" mt="md" mb="xs"> <Text fw={700}>Precio Total</Text><Text fw={700}>{precioTotal} €</Text>
                </Group> <Button color="blue" fullWidth mt="md" onClick={buscar} radius="md">
                    RESERVAR
                </Button></>)
                : (null)}
        </Card>
    );
};
export default FormularioReserva;