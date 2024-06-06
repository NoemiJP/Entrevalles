import Header from '../../components/Header/Header';
import React, { useState, useEffect } from 'react';
import { BackgroundImage, Alert, Card, Container, Image, Text, Badge, Button, Group, Grid, TextInput, PasswordInput, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import Footer from '../../components/Footer/Footer';
import { Calendar, DateInput } from '@mantine/dates';
import { Link, useNavigate } from 'react-router-dom';
import "./NewUser.css";
import { url } from '../../utils';
import { IconAlertCircle, IconInfoCircle } from '@tabler/icons-react';



function NewUser() {

    const [errorLogin, setErrorLogin] = useState();
    const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState(false);
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            nombre: '',
            apellidos: '',
            direccion: '',
            telefono: '',
            email: '',
            contrasenya: '',
            fechaNacimiento: new Date()
        },

        validate: {
            email: (value) => {
                if (!/^\S+@\S+$/.test(value)) {
                    return "El correo electronico debe ser de la forma correo@extension"
                }
                return null;
            },
            contrasenya: (value, values) => {
                if (value.length < 8) {
                    return 'La contraseña debe tener al menos 8 caracteres';
                }
                if (!/\d/.test(value)) {
                    return 'La contraseña debe contener al menos un número';
                }
                if (!/[A-Z]/.test(value)) {
                    return 'La contraseña debe contener al menos una letra mayúscula';
                }
                if (value !== values.confirmarContrasenya) {
                    return 'Las contraseñas no coinciden';
                }
                return null; // La contraseña es válida
            },
            confirmarContrasenya: (value, values) => {
                if (value !== values.contrasenya) {
                    return 'Las contraseñas no coinciden';
                }
                return null;
            },
            telefono: (value) => {
                if (!/^\d{9}$/.test(value)) {
                    return 'El número de teléfono debe tener 10 dígitos';
                }
                return null;
            }
        }

    });
    const registro = (values) => {
        console.log(values);
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                // Si la API requiere algún tipo de autenticación, puedes incluir las cabeceras correspondientes aquí
            },
            body: JSON.stringify({
                nombre: values.nombre,
                apellidos: values.apellidos,
                direccion: values.direccion,
                telefono: values.telefono,
                email: values.email,
                contrasenya: values.contrasenya,
                fechaNacimiento: values.fechaNacimiento


            }) // Convertir el objeto JavaScript a formato JSON
        };
        fetch(`${url()}/registro`, requestOptions)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                setShowAlert(true);
                setTimeout(() => {
                    navigate("/access");
                }, 2000); // Esperar 2 segundos antes de redirigir
            })
            .catch(error => console.error('Error registro:', error));
    };

    return (
        <>
            <Header></Header>
            {showAlert ? (

                <Alert variant="light" color="myColor" title="Registro exitoso" icon={<IconInfoCircle />}></Alert>

            ) : (null)}
            <Container size="xxl" className="mainContainerUser bodyUser"  >
                <Grid justify="center" align="center" >
                    <Grid.Col span={{ base: 6 }} offset={3}>
                        <Card shadow="sm" radius="md" withBorder mt="md" mb="md">
                            <form onSubmit={form.onSubmit(registro)} >
                                <Group direction="column" spacing="md" mb="md">

                                    <TextInput
                                        required
                                        size="md"
                                        style={{ minWidth: "100%" }}
                                        label="Nombre"
                                        placeholder="Nombre"
                                        radius="md"
                                        {...form.getInputProps('nombre')}></TextInput>

                                    <TextInput
                                        required
                                        size="md"
                                        style={{ minWidth: "100%" }}
                                        label="Apellidos"
                                        placeholder="Apellidos"
                                        radius="md"
                                        {...form.getInputProps('apellidos')}></TextInput>

                                    <TextInput
                                        required
                                        size="md"
                                        style={{ minWidth: "100%" }}
                                        label="Dirección"
                                        placeholder="Dirección"
                                        radius="md"
                                        {...form.getInputProps('direccion')}></TextInput>

                                    <TextInput
                                        required
                                        size="md"
                                        style={{ minWidth: "100%" }}
                                        label="Teléfono"
                                        placeholder="Teléfono"
                                        radius="md"
                                        {...form.getInputProps('telefono')}></TextInput>

                                    <TextInput
                                        required
                                        size="md"
                                        style={{ minWidth: "100%" }}
                                        label="Email"
                                        placeholder="Email"
                                        radius="md"
                                        {...form.getInputProps('email')}></TextInput>

                                    <PasswordInput
                                        required
                                        size="md"
                                        style={{ minWidth: "100%" }}
                                        label="Contraseña"
                                        placeholder="Contraseña"
                                        radius="md"
                                        {...form.getInputProps('contrasenya')}></PasswordInput>

                                    <PasswordInput
                                        required
                                        size="md"
                                        style={{ minWidth: "100%" }}
                                        label="Confirmar Contraseña"
                                        placeholder="Confirmar Contraseña"
                                        radius="md"
                                        {...form.getInputProps('confirmarContrasenya')}
                                    />

                                    <DateInput
                                        required
                                        size="md"
                                        style={{ minWidth: "100%" }}
                                        label="Fecha de nacimiento"
                                        placeholder="Fecha de nacimiento"
                                        radius="md"
                                        {...form.getInputProps('fechaNacimiento')}
                                    />

                                </Group>
                                <Group spacing="md">
                                    <Button color="myColor" type="submit" variant="filled" style={{ minWidth: "100%" }}>Registrarse</Button>
                                </Group>
                            </form>
                        </Card>
                    </Grid.Col>
                    <Grid.Col span={{ base: 3 }}></Grid.Col>
                </Grid>
            </Container>
            <Footer></Footer>
        </>
    );
}

export default NewUser;
