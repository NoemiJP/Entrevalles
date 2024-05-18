import Header from '../../components/Header/Header';
import React, { useState, useEffect } from 'react';
import './DigsPage.css';
import { Container } from '@mantine/core';
import Footer from '../../components/Footer/Footer';

function DigsPage() {

    return (
        <>

            <Header></Header>
            <Container size="xxl" className="mainContainer body"  >
            </Container>
            <Footer/>
        </>
    );
}

export default DigsPage;