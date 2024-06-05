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



const InsertarExperiencia = () => {
    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
    });
    const comboboxTipo = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
    });
    const comboboxDeporte = useCombobox({
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
            precio:'',
            imagenes: [],
            normas: [],
            equipamiento: []
        }
    });
    const [localizaciones, setLocalizaciones] = useState();
    const [localizacion, setLocalizacion] = useState();
    const [tipoActividad, setTipoActividad] = useState();
    const [tiposActividad, setTiposActividad] = useState(["Aire libre","Interior"]);
    const [tipoDeporte, setTipoDeporte] = useState();
    const [tiposDeportes, setTiposDeportes] = useState(["Montaña","Aventura", "Acuáticas","Aéreas","Tierra","Invierno","Spas"]);
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
                        descripcion: values.descripcion,
                        informacion: values.informacion,
                        imagenes: imagenesSave,
                        localizacion: localizacion,
                        precio:values.precio,
                        tipoActividad:tipoActividad,
                        tipoDeporte: tipoDeporte
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };
    
                fetch(`${url()}/actividades/save`, requestOptions)
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
        <Title align="center" mb="md" mt="md">Nueva Actividad</Title> {save?(<Alert variant="light" color="blue" title="Nueva Actividad" mb="md" icon={<IconInfoCircle />}>
      Actividad insertada con éxito
    </Alert>):(null)}
        <form onSubmit={form.onSubmit(insertarAlojamiento)} >
            <Grid>
                <Grid.Col span={{ base: 6 }}>
                    <Group direction="column" spacing="md" mb="md">
                        <TextInput
                            required
                            size="md"
                            style={{ minWidth: "100%" }}
                            label="Título de la actividad"
                            placeholder="Título de la actividad"
                            radius="md"
                            {...form.getInputProps('titulo')}></TextInput>
                    </Group>
                    <Group direction="column" spacing="md" mb="md">
                        <TextInput
                            required
                            size="md"
                            style={{ minWidth: "100%" }}
                            label="Descripción de la actividad"
                            placeholder="Descripción breve"
                            radius="md"
                            {...form.getInputProps('descripcion')}></TextInput>
                    </Group>
                    <Group direction="column" spacing="md" mb="md">
                        <FileInput required
                            size="md"
                            style={{ minWidth: "100%" }}
                            label="Imágenes de la actividad"
                            placeholder="Imágenes de la actividad"
                            radius="md"
                            multiple value={imagenes} onChange={setImagenes} />
                    </Group>
                    <Group>
                    <NumberInput
                            required
                            size="md"
                            style={{ minWidth: "100%" }}
                            label="Precio de la actividad"
                            placeholder="Precio de la actividad"
                            radius="md"
                            {...form.getInputProps('precio')}></NumberInput>
                    </Group>
                </Grid.Col>



                <Grid.Col span={{ base: 6 }} >
                    <Group direction="column" spacing="md" mb="md">
                        <TextInput
                            required
                            size="md"
                            style={{ minWidth: "100%" }}
                            label="Informaciónde la actividad"
                            placeholder="Información detallada"
                            radius="md"
                            {...form.getInputProps('informacion')}></TextInput>
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
                    <Group direction="column" spacing="md" mb="md">
                        {tiposActividad ? (<Combobox
                            store={comboboxTipo}
                            onOptionSubmit={(val) => {
                                setTipoActividad(val);
                                comboboxTipo.closeDropdown();
                            }}
                        >
                            <Combobox.Target>
                                <InputBase
                                    component="button"
                                    type="button"
                                    required
                                    size="md"
                                    style={{ minWidth: "100%" }}
                                    label="Tipo de Actividad"
                                    placeholder="Tipo de Actividad"
                                    radius="md"
                                    pointer
                                    rightSection={<Combobox.Chevron />}
                                    rightSectionPointerEvents="none"
                                    onClick={() => comboboxTipo.toggleDropdown()}
                                >
                                    {tipoActividad || <Input.Placeholder>Tipo de Actividad</Input.Placeholder>}
                                </InputBase>
                            </Combobox.Target>

                            <Combobox.Dropdown>
                                <ScrollArea.Autosize type="scroll" mah={200}>
                                    <Combobox.Options>{tiposActividad.map((item) => (
                                        <Combobox.Option value={item} key={item}>
                                            {item}
                                        </Combobox.Option>
                                    ))}</Combobox.Options>
                                </ScrollArea.Autosize>
                            </Combobox.Dropdown>
                        </Combobox>) : (null)}
                    </Group>


                    <Group direction="column" spacing="md" mb="md">
                        {tiposDeportes ? (<Combobox
                            store={comboboxDeporte}
                            onOptionSubmit={(val) => {
                                setTipoDeporte(val);
                                comboboxDeporte.closeDropdown();
                            }}
                        >
                            <Combobox.Target>
                                <InputBase
                                    component="button"
                                    type="button"
                                    required
                                    size="md"
                                    style={{ minWidth: "100%" }}
                                    label="Ocio"
                                    placeholder="Ocio"
                                    radius="md"
                                    pointer
                                    rightSection={<Combobox.Chevron />}
                                    rightSectionPointerEvents="none"
                                    onClick={() => comboboxDeporte.toggleDropdown()}
                                >
                                    {tipoDeporte || <Input.Placeholder>Ocio</Input.Placeholder>}
                                </InputBase>
                            </Combobox.Target>

                            <Combobox.Dropdown>
                                <ScrollArea.Autosize type="scroll" mah={200}>
                                    <Combobox.Options>{tiposDeportes.map((item) => (
                                        <Combobox.Option value={item} key={item}>
                                            {item}
                                        </Combobox.Option>
                                    ))}</Combobox.Options>
                                </ScrollArea.Autosize>
                            </Combobox.Dropdown>
                        </Combobox>) : (null)}
                    </Group>
                </Grid.Col>
            </Grid>
             <Grid>
                <Grid.Col span={{ base: 4 }}></Grid.Col>
                <Grid.Col span={{ base: 4 }}>
            <Group spacing="md">
                <Button type="submit" variant="filled" style={{ minWidth: "100%" }}>Insertar Actividad</Button>
            </Group>
            </Grid.Col>
            <Grid.Col span={{ base: 4 }}></Grid.Col>
            </Grid>
        </form>
    </>)
};

export default InsertarExperiencia;