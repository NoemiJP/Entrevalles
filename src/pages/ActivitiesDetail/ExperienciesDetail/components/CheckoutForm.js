import { CardElement, useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, Image, NumberInput, Text, Badge, Button, Group, Title } from "@mantine/core";
import { React, useEffect, useState } from "react";
import { useUser } from '../../../../components/Usuario/UserProvider';
import { url } from '../../../../utils';
const CheckoutForm = ({ id, precioTotal, experiencia, huespedes, fechaInicio, fechaFin,clientSecret }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { user, updateUser } = useUser();
    const navigate = useNavigate();
    let params = useParams();
    const [reserva, setReserva] = useState();
    const realizarReserva = async () => {

    };
    const stripePayment = async (data) => {
        const { error } = stripe.confirmPayment({
            //`Elements` instance that was used to create the Payment Element
            elements,
            confirmParams: {
                return_url: `${window.location.origin}`,
            },
            redirect: 'if_required' 
        }).then(function(result) {
            if (result.error) {
                // Show error to your customer (for example, payment details incomplete)
                console.log(result.error.message);
            } else {
                console.log(result);
                navigate(`/confirmPayment/${data.id}/${user.id}?payment_intent=${result.paymentIntent.id}&tipo=actividad`);
            }
          });
    };
    const handleSubmit = async (event) => {
        // We don't want to let default form submission happen here,
        // which would refresh the page.
        event.preventDefault();
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify({
                actividad: experiencia.id,
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
        fetch(`${url()}/reservaAct`, requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                console.log('SUBMIT PAGO');
                if (!stripe || !elements) {
                    // Stripe.js hasn't yet loaded.
                    // Make sure to disable form submission until Stripe.js has loaded.
                    return;
                }

                stripePayment(data);

                

            })
            .catch(error => console.error('Error fetching users:', error));
    };
    return (
        <form onSubmit={handleSubmit}>
            <PaymentElement />
            <Button color="myColor" fullWidth mt="md" radius="md" disabled={!stripe} type="submit">
                Pagar Reserva
            </Button>
        </form>
    );
};

export default CheckoutForm;