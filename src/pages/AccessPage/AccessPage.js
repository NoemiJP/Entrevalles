import Header from '../../components/Header/Header';
import React, { useState, useEffect } from 'react';
import './AccessPage.css';
import { Card, Image, Text, Badge, Button, Group, Grid, TextInput, PasswordInput } from '@mantine/core';
import { useForm } from '@mantine/form';
function AccessPage() {
    const [email, setEmail] = useState();
    const [contrasenya, setContrasenya] = useState();
    const [errorLogin,setErrorLogin] = useState();
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
          email: '',
          contrasenya: '',
        },
    
        validate: {
          email: (value) => {
            if(!/^\S+@\S+$/.test(value)){
                return "El correo electronico debe ser de la forma correo@extension"
            }
            return null;},
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
        }
        },
      });
    const login = (values) => {
        console.log(values);
        
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                // Si la API requiere algún tipo de autenticación, puedes incluir las cabeceras correspondientes aquí
            },
            body: JSON.stringify({
                email: values.email,
                contrasenya: values.contrasenya
            }) // Convertir el objeto JavaScript a formato JSON
        };
        fetch('/login', requestOptions)
            .then(response => {
                if (!response.ok) {
                    if (response.status === 401) {
                        // Manejar el error de autenticación aquí
                        setErrorLogin("La combinación de usuario y contraseña no es correcta");
                    }
                } else {
                    setErrorLogin(null);
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
            })
            .catch(error => console.error('Error login:', error));
      };
    return (
        <>
            <Header></Header>
            <Grid justify="center" align="center" >
                <Grid.Col span={{ base: 6 }} offset={3} mt="15%">
                    <Card shadow="sm" radius="md" withBorder>

                        <Group justify="center" mt="md" mb="xs">
                            <Text fw={500}>INICIO SESIÓN</Text>
                        </Group>
                        <form onSubmit={form.onSubmit(login)} >
                        <Group mt="md" mb="xs">
                                <TextInput
                                    withAsterisk
                                    size="md"
                                    style={{ minWidth: "100%" }}
                                    label="Email"
                                    placeholder="Email"
                                    radius="md"
                                    {...form.getInputProps('email')}></TextInput>
                        </Group>

                        <Group mt="md" mb="xs">
                            <PasswordInput
                                withAsterisk
                                style={{ minWidth: "100%" }}
                                label="Contraseña"
                                placeholder="Contraseña"
                                {...form.getInputProps('contrasenya')}
                            />
                        </Group>
                        {errorLogin?(<Group mt="md" mb="xs">
                        <Text fw={500}>{errorLogin}</Text>
                        </Group>):(null)}
                        <Button color="blue" fullWidth mt="md" radius="md" type='submit'>
                            Acceder
                        </Button>
                        </form>
                    </Card>
                </Grid.Col>
                <Grid.Col span={{ base: 3 }}></Grid.Col>
            </Grid>
        </>
    );
}

export default AccessPage;