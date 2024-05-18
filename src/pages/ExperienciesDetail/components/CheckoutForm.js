import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, Image, NumberInput, Text, Badge, Button, Group, Title } from "@mantine/core";
import { React, useEffect, useState } from "react";
import { useUser } from '../../../components/Usuario/UserProvider';
const CheckoutForm = ({ id, precioTotal, experiencia, huespedes, fechaInicio, fechaFin }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { user, updateUser } = useUser();
    const navigate = useNavigate();
    let params = useParams();
    const [reserva, setReserva] = useState();
    const realizarReserva = async () => {

    };
    const handleSubmit = async (event) => {
        // We don't want to let default form submission happen here,
        // which would refresh the page.
        event.preventDefault();
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify({
                experiencia: experiencia.id,
                fechaInicio: fechaInicio,
                fechaFin: fechaFin,
                huespedesTotales: huespedes,
                precioTotal: precioTotal,
                usuario: user.id
            }),
            headers: {
                'Content-Type': 'application/json'

            }
        };
        fetch('/reservar', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                console.log('SUBMIT PAGO');
                if (!stripe || !elements) {
                    // Stripe.js hasn't yet loaded.
                    // Make sure to disable form submission until Stripe.js has loaded.
                    return;
                }

                const result = stripe.confirmPayment({
                    //`Elements` instance that was used to create the Payment Element
                    elements,
                    confirmParams: {
                        return_url: `${window.location.origin}/confirmPayment/${data.id}/${user.id}`,
                    },
                });

                if (result.error) {
                    // Show error to your customer (for example, payment details incomplete)
                    console.log(result.error.message);
                } else {
                }
            })
            .catch(error => console.error('Error fetching users:', error));
    };
    return (
        <form onSubmit={handleSubmit}>
            <PaymentElement />
            <Button color="blue" fullWidth mt="md" radius="md" disabled={!stripe} type="submit">
                Pagar Reserva
            </Button>
        </form>
    );
};

export default CheckoutForm;