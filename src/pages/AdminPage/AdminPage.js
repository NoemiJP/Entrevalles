import { React, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { Carousel } from '@mantine/carousel';
import { Grid, Image,Container, Overlay, Text, Title, rem, Flex, Tabs } from "@mantine/core";
import { IconBrandNordVpn } from '@tabler/icons-react';
import { url } from "../../utils";
import './AdminPage.css';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import InsertarExperiencia from "./InsertarExperiencia";
import InsertarAlojamiento from "./InsertarAlojamiento";
import InsertarBlog from "./InsertarBlog";


const AdminPage = () => {
    return (<><Header></Header>
    <Container  size="xxl" className="mainContainerAdmin bodyAdmin" >
        <Grid mb="md">
            <Grid.Col span={{ base: 12 }} >
                <Tabs color="myColor" defaultValue="Alojamiento" >
                    <Tabs.List justify="center" >
                        <Tabs.Tab value="Alojamiento">
                            Insertar Alojamiento

                        </Tabs.Tab>
                        <Tabs.Tab value="Experiencia" >
                            Insertar Actividad
                        </Tabs.Tab>
                        <Tabs.Tab value="Blog" >
                            Insertar entrada Blog
                        </Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="Alojamiento">
                    <InsertarAlojamiento></InsertarAlojamiento>
                    </Tabs.Panel>


                    <Tabs.Panel value="Experiencia">
                    <InsertarExperiencia></InsertarExperiencia>
                    </Tabs.Panel>

                    <Tabs.Panel value="Blog">
                    <InsertarBlog></InsertarBlog>
                    </Tabs.Panel>
                </Tabs>
            </Grid.Col></Grid></Container>
        <Footer></Footer></>)
}

export default AdminPage;