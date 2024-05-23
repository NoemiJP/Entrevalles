import Header from '../../components/Header/Header';
import React, { useState, useEffect } from 'react';
import Footer from '../../components/Footer/Footer';
import "./DiscoverPage.css";
import { Grid, Skeleton, Container, Title, Text } from '@mantine/core';
import { useParams } from 'react-router-dom';
import { url } from '../../utils';

function DiscoverPage() {
    const params = useParams();
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        fetch(`${url()}/blogs`)
            .then(response => response.json())
            .then(data => {
                data.forEach(element => {
                    if (element.imagen != null) {
                        console.log(element);
                        const imageUrl = `data:image/jpeg;base64,${element.imagen}`;
                        element.url = imageUrl;
                    }
                });
                setBlogs(data);
            })
            .catch(error => console.error('Error fetching blogs:', error));
    }, []

    );

    return (
        <>
            <Header></Header>
            {blogs ? (
                <Container size='xxl' mb='md' mt='md'>
                    <Title order={1} className="blogTitle" mb="md">Descubre Asturias</Title>
                    <Grid justify="center" align="center" gutter="md" overflow="hidden">

                        {blogs.map((element, index) => {
                            if (index % 2 == 0) {
                                return (<><Grid.Col span={{ base: 12, xs: 4 }} className="imageColumn">
                                    <img src={element.url} alt="Imagen 1" className="roundedImage" />
                                </Grid.Col>
                                    <Grid.Col span={{ base: 12, xs: 8 }} style={{ padding: '20px' }}>
                                        <Title order={3} className="title">{element.titulo}</Title>
                                        <Text className="text-align-justify">{element.texto}</Text>
                                    </Grid.Col></>)
                            } else {
                                return (<><Grid.Col span={{ base: 12, xs: 8 }} style={{ padding: '20px' }}>
                                    <Title order={3} className="title">{element.titulo}</Title>
                                    <Text className="text-align-justify">{element.texto}</Text>
                                </Grid.Col>
                                    <Grid.Col span={{ base: 12, xs: 4 }} className="imageColumn">
                                        <img src={element.url} alt="Imagen 2" className="roundedImage" />
                                    </Grid.Col></>)
                            }
                        })}
                    </Grid>
                </Container>
            ) : (null)}
            <Footer></Footer>
        </>
    );
}

export default DiscoverPage;