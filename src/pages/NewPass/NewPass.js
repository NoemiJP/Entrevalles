import Header from '../../components/Header/Header';
import React, { useState, useEffect } from 'react';
import { BackgroundImage, Card, Image, Text, Badge, Button, Group, Grid, TextInput, PasswordInput, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import Footer from '../../components/Footer/Footer';
import { Calendar, DateInput } from '@mantine/dates';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function NewPass() {
    const navigate = useNavigate();
    const [errorLogin, setErrorLogin] = useState();
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            email: '',
            nuevaContrasenya:'',
            contrasenya:'',
        },

        validate: {
            email: (value) => {
                if (!/^\S+@\S+$/.test(value)) {
                    return "El correo electronico debe ser de la forma correo@extension"
                }
                return null;
            },
            contrasenya: (value) => {
                if (value.length < 8) {
                    return 'La contraseña debe tener al menos 8 caracteres';
                }
                if (!/\d/.test(value)) {
                    return 'La contraseña debe contener al menos un número';
                }
                if (!/[A-Z]/.test(value)) {
                    return 'La contraseña debe contener al menos una letra mayúscula';
                }
                return null; // La contraseña es válida
            },
            nuevaContrasenya: (value) => {
                if (value.length < 8) {
                    return 'La contraseña debe tener al menos 8 caracteres';
                }
                if (!/\d/.test(value)) {
                    return 'La contraseña debe contener al menos un número';
                }
                if (!/[A-Z]/.test(value)) {
                    return 'La contraseña debe contener al menos una letra mayúscula';
                }
                return null; // La contraseña es válida
            }
        },
    });
    const nueva = (values) => {
        if(!(values.contrasenya == values.nuevaContrasenya)){
            form.setFieldError('contrasenya', 'Las contraseñas no coinciden');
            return;
        }
        console.log(values);
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'

            },
            body: JSON.stringify({
                email: values.email,
                contrasenya: values.contrasenya,
                nuevaContrasenya: values.nuevaContrasenya
            })
        };
        fetch('/nueva', requestOptions)
            .then(response => {
                if (!response.ok) {
                    if (response.status === 404) {
                        form.setFieldError('email', 'El usuario no existe en el sistema');
                    }
                } else{
                    navigate('/');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
            })
            .catch(error => console.error('Error registro:', error));
    };

    return (
        <>
            <Header></Header>

            <BackgroundImage
                src="./assets/login.jpg">

                <Grid justify="center" align="center" >
                    <Grid.Col span={{ base: 6 }} offset={3} mt="7%">
                        <Card shadow="sm" radius="md" withBorder mb="7%" >
                            <form onSubmit={form.onSubmit(nueva)} >
                                <Group direction="column" spacing="md">


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
                                        label="Nueva contraseña"
                                        placeholder="Contraseña"
                                        radius="md"
                                        {...form.getInputProps('nuevaContrasenya')}></PasswordInput>

                                    <PasswordInput
                                        required
                                        size="md"
                                        style={{ minWidth: "100%" }}
                                        label="Verificar contraseña"
                                        placeholder="Contraseña"
                                        radius="md"
                                        {...form.getInputProps('contrasenya')}></PasswordInput>

                                    <Button type="submit" variant="filled">Nueva contraseña</Button>
                                </Group>
                            </form>
                        </Card>
                    </Grid.Col>
                    <Grid.Col span={{ base: 3 }}></Grid.Col>
                </Grid>
            </BackgroundImage>
            <Footer></Footer>
        </>
    );
}

export default NewPass;
