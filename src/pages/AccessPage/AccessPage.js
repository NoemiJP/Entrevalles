import Header from '../../components/Header/Header';
import React, { useState, useEffect } from 'react';
import './AccessPage.css';
import { Container, BackgroundImage, Card, Image, Text, Badge, Button, Group, Grid, TextInput, PasswordInput, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import Footer from '../../components/Footer/Footer';
import { Link } from 'react-router-dom';
import { useUser } from '../../components/Usuario/UserProvider';
import { useNavigate } from 'react-router-dom';
import { url } from '../../utils';

function AccessPage() {
    const { user, updateUser } = useUser();
    const [email, setEmail] = useState();
    const [contrasenya, setContrasenya] = useState();
    const [errorLogin, setErrorLogin] = useState();
    const navigate = useNavigate();
    
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            email: '',
            contrasenya: '',
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
        fetch(`${url()}/login`, requestOptions)
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
                updateUser(data);
                console.log(user);
                navigate("/");
            })
            .catch(error => console.error('Error login:', error));
    };

    return (
       <>
            <Header></Header>

            <Container size="xxl"  className="mainContainerPass bodyPass"  >
                <Grid justify="center" align="center">
                    <Grid.Col span={{ base: 12 }} mt="7%" >
                        <Card  shadow="sm" radius="md" withBorder mb="7%" >
                            
                        <Group justify="center" mt="md" mb="xs">
                                <Text fw={500}>INICIO SESIÓN</Text>
                            </Group>
                        
                            <form onSubmit={form.onSubmit(login)} >
                            
                                <Group mt="md" mb="xs">
                                    <TextInput
                                        withAsterisk
                                        size="md"
                                        style={{ minWidth: "50vh" }}
                                        label="Email"
                                        placeholder="Email"
                                        radius="md"
                                        {...form.getInputProps('email')}></TextInput>
                                </Group>

                                <Group mt="md" mb="xs">
                                    <PasswordInput
                                        withAsterisk
                                        size="md"
                                        style={{ minWidth: "50vh" }}
                                        label="Contraseña"
                                        placeholder="Contraseña"
                                        radius="md"
                                        {...form.getInputProps('contrasenya')}

                                    />
                                </Group>
                                <Group mt="md" mb="xs" >
                                <Link fw={500} to="/newpass">¿Olvidaste la contraseña?</Link>
                                </Group>

                                {errorLogin ? (<Group mt="md" mb="xs">
                                    <Text fw={500}>{errorLogin}</Text>
                                </Group>) : (null)}
                                <Button color="myColor" fullWidth mt="md" radius="md" type='submit'>
                                    Acceder
                                </Button>
                                <Group justify="center" mt="md" mb="xs">
                                    <Text fw={500} style={{color:"#476d87"}}>¿Aún no tienes cuenta? <Link fw={500} to="/newuser">Regístrate</Link></Text>
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

export default AccessPage;