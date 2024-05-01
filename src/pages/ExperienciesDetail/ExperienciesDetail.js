import { React, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Header from "../../components/Header/Header";
import { Carousel } from '@mantine/carousel';
import { Grid, Image, Overlay, Text, Title, rem, Flex, Tabs } from "@mantine/core";
import { IconBrandNordVpn } from '@tabler/icons-react';
import "./ExperienciesDetail.css";
import { Calendar } from '@mantine/dates';
import dayjs from 'dayjs';

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
    const dayRenderer = (date) => {
        const day = date.getDate();
        let tachado = false;
        experiencia.reservas.forEach(element => {
            if(fechaEstaEntre(date,new Date(element.fechaInicio),new Date(element.fechaFin))){
            console.log(day);
            tachado = true;
            
            }
        });
        if(tachado){
            return (
                <div style={{textDecoration:"line-through",color:"#a5a5a5"}}>{day}</div>
            );
        } else{
        return (
            <div>{day}</div>
        );
        }
      };
    const fechaEstaEntre = (fecha, fechaInicio, fechaFin) => {
        return fecha >= fechaInicio && fecha <= fechaFin;
    }
    return (
        <>
            <Header></Header>
            {experiencia ? (
                <>
                    <div style={{ position: "absolute", zIndex: 200, marginTop: "18%", width: "100%" }}>
                        <Flex
                            mih={"90%"}
                            gap="md"
                            justify="flex-end"
                            align="flex-start"
                            direction="column"
                        >

                            <Title style={{ color: 'white', marginLeft: "15%" }}><IconBrandNordVpn style={{ color: 'white', width: rem(64), height: rem(64) }}></IconBrandNordVpn>   {experiencia.titulo}</Title>
                            <Text style={{ color: 'white', marginLeft: "19%" }} size="lg">{experiencia.localizacion}</Text>
                        </Flex>
                    </div>
                    <Grid>
                        <Grid.Col span={{ base: 12 }} >
                            <Carousel slideSize="33.33%" height="100%" align="start" slideGap="xs" controlsOffset="md" loop>
                                <Carousel.Slide><Image
                                    src='/assets/fot1.jpg'
                                    alt="Norway"
                                /></Carousel.Slide>
                                <Carousel.Slide><Image
                                    src='/assets/fot2.jpg' alt='link logotipo'
                                /></Carousel.Slide>
                                <Carousel.Slide><Image
                                    src='/assets/fot3.jpg' alt='link logotipo'
                                /></Carousel.Slide>
                                <Carousel.Slide><Image
                                    src='/assets/fot4.jpg'
                                    alt="Norway"
                                /></Carousel.Slide>
                                <Carousel.Slide><Image
                                    src='/assets/fot5.jpg'
                                    alt="Norway"
                                /></Carousel.Slide>
                                <Carousel.Slide><Image
                                    src='/assets/fot1.jpg'
                                    alt="Norway"
                                /></Carousel.Slide>
                                {/* ...other slides */}
                            </Carousel>
                        </Grid.Col>


                        <Grid.Col span={{ base: 12 }} >
                            <Tabs defaultValue="Equipamiento">
                                <Tabs.List justify="center">
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
                                        Calendario
                                    </Tabs.Tab>
                                </Tabs.List>

                                <Tabs.Panel value="Equipamiento">
                                    Gallery tab content
                                </Tabs.Panel>

                                <Tabs.Panel value="Localizacion">
                                    Messages tab content
                                </Tabs.Panel>

                                <Tabs.Panel value="Normas">
                                    Settings tab content
                                </Tabs.Panel>

                                <Tabs.Panel value="Calendario">
                                    <Grid>
                                    <Grid.Col span={{ base: 12 }} >
                                    <Calendar size="xl"
                                        renderDay={dayRenderer}
                                    />
                                    </Grid.Col>
                                    </Grid>
                                </Tabs.Panel>
                            </Tabs>
                        </Grid.Col>


                    </Grid>
                </>
            ) : (null)}
        </>)
};
export default ExperienciesDetail;