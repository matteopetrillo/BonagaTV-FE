<script setup>
import {loadScript} from '@paypal/paypal-js';
import {onMounted} from 'vue';

const props = defineProps({
    // Some kind of reference if you like
});

onMounted(async() => {
    try {
        const paypal = await loadScript({
            'client-id': ''
        });

        await paypal.Buttons({
            createOrder: function(data, actions) {
                return actions.order.create({
                    purchase_units: [{
                        amount: {
                            // e.g reference.price
                            value: '<your-price>',
                        },
                    }],
                });
            },
            onApprove: function(data, actions) {
                return actions.order.capture().then(function(orderData) {
                    // Successful capture!
                    // e.g. Inertia.post(route('order.update', reference.orderId)
                });
            },
            style: {
                // Adapt to your needs
                layout: 'vertical',
                color: 'gold',
                shape: 'rect',
                label: 'paypal',
            },
            // The following is optional and you can
            // limit the buttons to those you want to
            // provide
            fundingSource: paypal.FUNDING.PAYPAL,
        }).render('#paypal-button-container');
    } catch (error) {
        // Add proper error handling
        console.error(error);
    }
});
</script>

<template>
    <div id="paypal-button-container"></div>
</template>
