import { React, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { Carousel } from '@mantine/carousel';
import { Grid, Image,Alert, FileInput, ScrollArea, Combobox, Button, Input, InputBase, Group, TextInput, Overlay, Text, Title, rem, Flex, Tabs, NumberInput } from "@mantine/core";
import { IconBrandNordVpn } from '@tabler/icons-react';
import { url } from "../../utils";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useForm } from "@mantine/form";
import { useCombobox } from "@mantine/core";
import { IconInfoCircle } from '@tabler/icons-react';


const InsertarAlojamiento = () => {
    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
    });
    const [save,setSave]=useState(false);
    const [imagenes, setImagenes] = useState();
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            descripcion: '',
            banyos: '',
            habitaciones: '',
            informacion: '',
            localizacion: '',
            precio: '',
            tipoAlojamiento: '',
            titulo: '',
            imagenes: [],
            normas: [],
            equipamiento: []
        }
    });
    const [localizaciones, setLocalizaciones] = useState();
    const [localizacion, setLocalizacion] = useState();
    useEffect(() => {
        fetch(`${url()}/localidades`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                setLocalizaciones(data);
            })
            .catch(error => console.error('Error login:', error));
    }, []);
    const insertarAlojamiento = (values) => {
        console.log(values);
        console.log(localizacion);
    
        const readFiles = imagenes.map(file => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
    
                reader.onload = (e) => {
                    const arrayBuffer = e.target.result;
                    const byteArray = Array.from(new Uint8Array(arrayBuffer));
                    resolve({ imagen: byteArray });
                };
    
                reader.onerror = (e) => {
                    reject("Error reading file", e);
                };
    
                reader.readAsArrayBuffer(file);
            });
        });
    
        Promise.all(readFiles)
            .then(imagenesSave => {
                const requestOptions = {
                    method: 'POST',
                    body: JSON.stringify({
                        titulo: values.titulo,
                        banyos: values.banyos,
                        habitaciones: values.habitaciones,
                        descripcion: values.descripcion,
                        informacion: values.informacion,
                        imagenes: imagenesSave,
                        localizacion: localizacion,
                        precio: values.precio
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };
    
                fetch(`${url()}/experiencias/save`, requestOptions)
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
    return (<>
        <Title align="center" mb="md" mt="md">Nuevo Alojamiento</Title>
        {save?(<Alert variant="light" color="blue" title="Nuevo Alojamiento" mb="md" icon={<IconInfoCircle />}>
      Alojamiento insertado con éxito
    </Alert>):(null)}
        <form onSubmit={form.onSubmit(insertarAlojamiento)} >
            <Grid>
                <Grid.Col span={{ base: 6 }}>
                    <Group direction="column" spacing="md" mb="md">
                        <TextInput
                            required
                            size="md"
                            style={{ minWidth: "100%" }}
                            label="Título del alojamiento"
                            placeholder="Título del alojamiento"
                            radius="md"
                            {...form.getInputProps('titulo')}></TextInput>
                    </Group>
                    <Group direction="column" spacing="md" mb="md">
                        <TextInput
                            required
                            size="md"
                            style={{ minWidth: "100%" }}
                            label="Descripción del alojamiento"
                            placeholder="Descripción breve"
                            radius="md"
                            {...form.getInputProps('descripcion')}></TextInput>
                    </Group>
                    <Group direction="column" spacing="md" mb="md">
                        <NumberInput
                            required
                            size="md"
                            style={{ minWidth: "100%" }}
                            label="Número de Baños"
                            placeholder="Número de Baños"
                            radius="md"
                            {...form.getInputProps('banyos')}></NumberInput>
                    </Group>
                    <Group direction="column" spacing="md" mb="md">
                        <FileInput required
                            size="md"
                            style={{ minWidth: "100%" }}
                            label="Imágenes del alojamiento"
                            placeholder="Imágenes del alojamiento"
                            radius="md"
                            multiple value={imagenes} onChange={setImagenes} />
                    </Group>
                </Grid.Col>



                <Grid.Col span={{ base: 6 }} >
                    <Group direction="column" spacing="md" mb="md">
                        <TextInput
                            required
                            size="md"
                            style={{ minWidth: "100%" }}
                            label="Información del alojamiento"
                            placeholder="Información detallada"
                            radius="md"
                            {...form.getInputProps('informacion')}></TextInput>
                    </Group>
                    <Group direction="column" spacing="md" mb="md">
                        <NumberInput
                            required
                            size="md"
                            style={{ minWidth: "100%" }}
                            label="Número de habitaciones"
                            placeholder="Número de habitaciones"
                            radius="md"
                            {...form.getInputProps('habitaciones')}></NumberInput>
                    </Group>
                    <Group direction="column" spacing="md" mb="md">
                        {localizaciones ? (<Combobox
                            store={combobox}
                            onOptionSubmit={(val) => {
                                setLocalizacion(val);
                                combobox.closeDropdown();
                            }}
                        >
                            <Combobox.Target>
                                <InputBase
                                    component="button"
                                    type="button"
                                    required
                                    size="md"
                                    style={{ minWidth: "100%" }}
                                    label="Localidad"
                                    placeholder="Localidad"
                                    radius="md"
                                    pointer
                                    rightSection={<Combobox.Chevron />}
                                    rightSectionPointerEvents="none"
                                    onClick={() => combobox.toggleDropdown()}
                                    {...form.getInputProps('localizacion')}
                                >
                                    {localizacion || <Input.Placeholder>Localidad</Input.Placeholder>}
                                </InputBase>
                            </Combobox.Target>

                            <Combobox.Dropdown>
                                <ScrollArea.Autosize type="scroll" mah={200}>
                                    <Combobox.Options>{localizaciones.map((item) => (
                                        <Combobox.Option value={item.nombre} key={item.id}>
                                            {item.nombre}
                                        </Combobox.Option>
                                    ))}</Combobox.Options>
                                </ScrollArea.Autosize>
                            </Combobox.Dropdown>
                        </Combobox>) : (null)}
                    </Group>
                    <Group>
                    <NumberInput
                            required
                            size="md"
                            style={{ minWidth: "100%" }}
                            label="Precio por noche"
                            placeholder="Precio por noche"
                            radius="md"
                            {...form.getInputProps('precio')}></NumberInput>
                    </Group>
                </Grid.Col>
            </Grid>
            <Grid>
                <Grid.Col span={{ base: 4 }}></Grid.Col>
                <Grid.Col span={{ base: 4 }}>
            <Group spacing="md">
                <Button type="submit" variant="filled" style={{ minWidth: "100%" }}>Insertar Alojamiento</Button>
            </Group>
            </Grid.Col>
            <Grid.Col span={{ base: 4 }}></Grid.Col>
            </Grid>
        </form>
    </>)
};

export default InsertarAlojamiento;