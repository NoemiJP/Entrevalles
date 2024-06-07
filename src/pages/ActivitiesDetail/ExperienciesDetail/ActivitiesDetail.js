import { React, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Header from "../../../components/Header/Header";
import { Carousel } from '@mantine/carousel';
import { Grid, Image, Overlay, Text, Title, rem, Flex, Tabs } from "@mantine/core";
import { IconBrandNordVpn } from '@tabler/icons-react';
import "./ActivitiesDetail.css";
import Calendario from "./components/Calendario";
import Equipamiento from "./components/Equipamiento";
import Localizacion from "./components/Localizacion";
import Normas from "./components/Normas";
import CarouselExperience from "./components/CarouselExperience";
import { Calendar } from '@mantine/dates';
import dayjs from 'dayjs';
import FormularioReserva from "./components/FormularioReserva";
import Footer from "../../../components/Footer/Footer";
import { url } from "../../../utils";

const ActivitiesDetail = () => {
    let params = useParams();
    const [experiencia, setExperiencia] = useState();
    useEffect(() => {
        fetch(`${url()}/actividad/` + params["id"])
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
                    <Grid mb="md">
                        <CarouselExperience experiencia={experiencia}></CarouselExperience>
                        <Grid.Col span={{ xs:12,sm:12,md:7,lg:7,xl:7 }} >
                            <Tabs color="myColor" defaultValue="Equipamiento">
                                <Tabs.List justify="center">
                                    <Tabs.Tab value="Equipamiento">
                                        Información
                                        
                                    </Tabs.Tab>
                                 
                                    <Tabs.Tab value="Calendario" >
                                        Reservas
                                    </Tabs.Tab>
                                </Tabs.List>

                                <Tabs.Panel value="Equipamiento">
                                    <Equipamiento experiencia={experiencia}></Equipamiento>
            </Tabs.Panel>

             

                                <Tabs.Panel value="Calendario">
                                    <Calendario experiencia={experiencia}></Calendario>
                                </Tabs.Panel>
                            </Tabs>
                        </Grid.Col>
                        <Grid.Col span={{ xs:12,sm:12,md:3,lg:3,xl:3 }} offset={{xs:0,sm:0,md:1,lg:1,xl:1}} mt="4%">
                            <FormularioReserva experiencia={experiencia}></FormularioReserva>
                        </Grid.Col>


                    </Grid>
                </>
            ) : (null)}
            <Footer/>
        </>)
};
export default ActivitiesDetail;