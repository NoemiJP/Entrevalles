import { React, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Header from "../../components/Header/Header";
import { Carousel } from '@mantine/carousel';
import { Grid, Image, Overlay, Text, Title, rem, Flex, Tabs } from "@mantine/core";
import { IconBrandNordVpn } from '@tabler/icons-react';
import "./ExperienciesDetail.css";
import Calendario from "./components/Calendario";
import Equipamiento from "./components/Equipamiento";
import Localizacion from "./components/Localizacion";
import Normas from "./components/Normas";
import CarouselExperience from "./components/CarouselExperience";
import { Calendar } from '@mantine/dates';
import dayjs from 'dayjs';
import FormularioReserva from "./components/FormularioReserva";
const ExperienciesDetail = () => {
    let params = useParams();
    const [experiencia, setExperiencia] = useState();
    useEffect(() => {
        fetch('/experiencias/' + params["id"])
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setExperiencia(data);
            })
            .catch(error => console.error('Error fetching users:', error));
    }, []);

    return (
        <>
            <Header></Header>
            {experiencia ? (
                <>
                    <Grid>             
                      <CarouselExperience experiencia={experiencia}></CarouselExperience>
                        <Grid.Col span={{ base: 7 }} >
                            <Tabs defaultValue="Equipamiento">
                                <Tabs.List justify="center" style={{minWidth:"180%"}}>
                                    <Tabs.Tab value="Equipamiento">
                                        Equipamiento
                                    </Tabs.Tab>
                                    <Tabs.Tab value="Localizacion" >
                                        Localización
                                    </Tabs.Tab>
                                    <Tabs.Tab value="Normas" >
                                        Normas
                                    </Tabs.Tab>
                                    <Tabs.Tab value="Calendario" >
                                        Reservas
                                    </Tabs.Tab>
                                </Tabs.List>

                                <Tabs.Panel value="Equipamiento">
                                <Equipamiento experiencia={experiencia}></Equipamiento>
                                </Tabs.Panel>

                                <Tabs.Panel value="Localizacion">
                                <Localizacion experiencia={experiencia}></Localizacion>
                                </Tabs.Panel>

                                <Tabs.Panel value="Normas">
                                <Normas experiencia={experiencia}></Normas>
                                </Tabs.Panel>

                                <Tabs.Panel value="Calendario">
                                  <Calendario experiencia={experiencia}></Calendario>
                                </Tabs.Panel>
                            </Tabs>
                        </Grid.Col>
                        <Grid.Col span={{ base: 3 }} offset={1} mt="4%">
<FormularioReserva experiencia={experiencia}></FormularioReserva>
            </Grid.Col>


                    </Grid>
                </>
            ) : (null)}
        </>)
};
export default ExperienciesDetail;