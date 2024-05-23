import { React, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { Carousel } from '@mantine/carousel';
import { Grid, Image,Alert, FileInput, ScrollArea, Combobox, Button, Input, InputBase, Group, TextInput, Overlay, Text, Title, rem, Flex, Tabs, NumberInput } from "@mantine/core";
import { IconBrandNordVpn } from '@tabler/icons-react';
import { url } from "../../utils";
import { IconInfoCircle } from '@tabler/icons-react';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useForm } from "@mantine/form";
import { useCombobox } from "@mantine/core";


const InsertarBlog = () => {
    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
    });
    const [save,setSave]=useState(false);
    const [imagenes, setImagenes] = useState();
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            texto: '',
            titulo: '',
            imagenes: [],
        }
    });

    
    const insertarBlog = (values) => {
        console.log(values);
        console.log(imagenes);
        const readFiles = 
            new Promise((resolve, reject) => {
                const reader = new FileReader();
    
                reader.onload = (e) => {
                    const arrayBuffer = e.target.result;
                    const byteArray = Array.from(new Uint8Array(arrayBuffer));
                    resolve(byteArray );
                };
    
                reader.onerror = (e) => {
                    reject("Error reading file", e);
                };
    
                reader.readAsArrayBuffer(imagenes);
            });
        
    
        readFiles
            .then(imagenesSave => {
                const requestOptions = {
                    method: 'POST',
                    body: JSON.stringify({
                        texto: values.texto,
                        titulo: values.titulo,
                        imagen: imagenesSave
                       
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };
    
                fetch(`${url()}/blog/save`, requestOptions)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then(data => {
                        setSave(true);
                        setImagenes([]);
                        form.reset();
                    })
                    .catch(error => console.error('Error:', error));
            })
            .catch(error => console.error('Error reading files:', error));
    };
    return (
    <>
        <Title align="center" mb="md" mt="md">Nuevo Post</Title>
        {save?(<Alert variant="light" color="blue" title="Nueva Entrada Blog" icon={<IconInfoCircle />}>
      Entrada insertada con éxito
    </Alert>):(null)}
        <form onSubmit={form.onSubmit(insertarBlog)} >
            <Grid>
                <Grid.Col span={{ base: 12 }}>
                    <Group direction="column" spacing="md" mb="md">
                        <TextInput
                            required
                            size="md"
                            style={{ minWidth: "100%" }}
                            label="Título de la entrada"
                            placeholder="Título de la entrada"
                            radius="md"
                            {...form.getInputProps('titulo')}></TextInput>
                    </Group>
                    <Group direction="column" spacing="md" mb="md">
                        <TextInput
                            required
                            size="md"
                            style={{ minWidth: "100%" }}
                            label="Texto de la publicación"
                            placeholder="Texto de la publicación"
                            radius="md"
                            {...form.getInputProps('texto')}></TextInput>
                    </Group>
                    
                    <Group direction="column" spacing="md" mb="md">
                        <FileInput required
                            size="md"
                            style={{ minWidth: "100%" }}
                            label="Imagen de la publicación"
                            placeholder="Imagen de la publicación"
                            radius="md"
                            value={imagenes} onChange={setImagenes} />
                    </Group>
                </Grid.Col>
</Grid> 

            <Grid>
                <Grid.Col span={{ base: 4 }}></Grid.Col>
                <Grid.Col span={{ base: 4 }}>
            <Group spacing="md">
                <Button type="submit" variant="filled" style={{ minWidth: "100%" }}>Insertar Blog</Button>
            </Group>
            </Grid.Col>
            <Grid.Col span={{ base: 4 }}></Grid.Col>
            </Grid>
        </form>
    </>)
};

export default InsertarBlog;