import { React, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { Carousel } from '@mantine/carousel';
import { Grid, Image, Overlay, Text, Title, rem, Flex, Tabs } from "@mantine/core";
import { IconBrandNordVpn } from '@tabler/icons-react';
import "../ExperienciesDetail.css";
import { Calendar } from '@mantine/dates';
import dayjs from 'dayjs';
const CarouselExperience = ({ experiencia }) => {

    return (<>
    
    <Grid.Col span={{ base: 12 }} style={{ position: "relative" }}>
        <div style={{ position: "absolute", zIndex: 200, bottom: "5%", width: "100%" }}>
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
          <Carousel slideSize="33.33%" height="100%" align="start" slideGap="xs" controlsOffset="md" loop>
          {experiencia.imagenes.map(imagen => {
            return (<Carousel.Slide><Image
                src={`data:image/jpeg;base64,${imagen.imagen}`}
                h={450}
                        w={800}
                alt="Norway"
            /></Carousel.Slide>)
        })}
            </Carousel>
        </Grid.Col>
    </>);
};

export default CarouselExperience;