<template>

<div id="paypal-button-container"></div>

</template>

<script>
import { loadScript } from '@paypal/paypal-js';
import { onMounted } from 'vue';

export default {
    name: 'PaypalButtons',

    async mounted() {
        const paypalSdk = await loadScript({
            'clientId': 'AZ-KdqJRqNOlHsDUsjH5ul8HB1bpb3X_5KjPrWWvRNHZyNgzNNqhFdSMNYO9_HFWdZysQgqAugN4WoxX',
            currency: 'EUR'
        });
        paypalSdk.Buttons().render('#paypal-button-container');
    }



}

</script>