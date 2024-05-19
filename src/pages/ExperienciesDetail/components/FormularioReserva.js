import { React, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { Carousel } from '@mantine/carousel';
import { Card, Image, NumberInput, Text, Badge, Button, Group, Title } from "@mantine/core";
import { IconBrandNordVpn } from '@tabler/icons-react';
import "../ExperienciesDetail.css";
import { Calendar, DateInput } from '@mantine/dates';
import dayjs from 'dayjs';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from "./CheckoutForm";
import { useUser } from "../../../components/Usuario/UserProvider";
import { url } from "../../../utils";

const FormularioReserva = ({ experiencia }) => {
    const { user, updateUser } = useUser();
    const [fechaInicio, setFechaInicio] = useState(new Date());
    const [fechaFin, setFechaFin] = useState(new Date());
    const [adultos, setAdultos] = useState(2);
    const [niños, setNiños] = useState(0);
    const [mascotas, setMascotas] = useState(0);
    const [mostrarPrecio, setMostrarPrecio] = useState(false);
    const [precioTotal, setPrecioTotal] = useState(0);
    const [huespedes, setHuespedes] = useState(0);
    const [dias, setDias] = useState(0);
    const [usuarioError,setUsuarioError] = useState("");
    const stripePromise = loadStripe('pk_test_51PFatYRxV1RVND84NS81925iyGjIsEdL10igwkgPlHcPwWWxBCxxm5eN9vnOqjp5fsg1FaY4nuFoSqNAAp9uu2jY002xmZtHtR');
    const [options,setOptions] = useState({clientSecret:null});
    useEffect(() => {
        if(precioTotal != 0){
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify({
                precio: precioTotal *100
            }),
            headers: {
                'Content-Type': 'application/json'

            }
        };
        fetch(`${url()}/payment`,requestOptions)
            .then(response => response.text())
            .then(data => {
                console.log(data);
                setOptions({clientSecret: data});
                console.log(options);
            })
            .catch(error => console.error('Error fetching users:', error));
        }
    }, [precioTotal]);
    const buscar = () => {
        if(user.id == null){
            setUsuarioError("Debe iniciar sesión antes de reservar");
            return;
        }
        console.log(adultos);
        setHuespedes(adultos + niños + mascotas);
        let dias = calcularDiferenciaFechas(fechaInicio, fechaFin)
        setDias(dias);
        setPrecioTotal(dias * experiencia.precio);
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
                Reservar
            </Button>
            {usuarioError?(<div>{usuarioError}</div>):(null)}
            {options.clientSecret != null ? (<>
                <Group justify="space-between" mt="md" mb="xs">
                    <Text>Número de noches</Text><Text>{dias}</Text></Group>
                <Group justify="space-between" mt="md" mb="xs"><Text>Huéspedes</Text><Text>{huespedes}</Text></Group>
                <Group justify="space-between" mt="md" mb="xs" style={{minWidth: "100%"}}> <Text fw={700}>Precio Total</Text><Text fw={700}>{precioTotal} €</Text>
                </Group> 
                <Elements stripe={stripePromise} options={options}>
                        <CheckoutForm id={experiencia.id} experiencia={experiencia} fechaInicio={fechaInicio} fechaFin={fechaFin} huespedes={huespedes} precioTotal={precioTotal} clientSecret={options}  />
                    </Elements></>)
                : (null)}
        </Card>
    );
};
export default FormularioReserva;