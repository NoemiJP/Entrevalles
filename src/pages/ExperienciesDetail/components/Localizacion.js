import React,{useEffect,useState} from "react";
import { MapContainer, TileLayer,useMap } from 'react-leaflet';
import { Map as mapElement } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import { Grid, Card, Text } from '@mantine/core';
import L from 'leaflet';
const Localizacion = () => {
    let map = null;
    useEffect(() => {
        if (map == null) {
            map = L.map('map').setView([43.3614, -5.8506], 10); // Coordenadas de Asturias y nivel de zoom

            // Agregar el mapa base de OpenStreetMap
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
                maxZoom: 18,
            }).addTo(map);
            map.invalidateSize();
        }
    }, []);

    useEffect(() => {
        if (map != null) {
            
            map.invalidateSize();
        }
    }, [map]);

    return (
        <Grid justify="center" mt="md">
            <Grid.Col span={{ base: 11 }} offset={1} mt="md">
                <Card shadow="sm" padding="md" radius="md" style={{ width: '100%', maxWidth: '800px', height: '500px' }}>
                    <div id="map" style={{ width: '100%', height: '100%' }}></div>
                    <Text align="center" size="lg" marginTop="md">Principado de Asturias</Text>
                </Card>
            </Grid.Col>
        </Grid>
    );
};

export default Localizacion;