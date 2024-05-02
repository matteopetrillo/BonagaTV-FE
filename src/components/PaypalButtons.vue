<template>

<div id="paypal-button-container"></div>

</template>

<script>
import { loadScript } from '@paypal/paypal-js';
import { baseURL } from '@/services/api.js'
import { mapGetters } from 'vuex';

export default {
    name: 'PaypalButtons',
    computed: {
      ...mapGetters([
        'getIdSpecialEvent'
      ])
    }, data() {
        return {
            idOrdine: null
        }
    },
    async mounted() {

        const idEvento = this.$store.getters.getSpecialEvent.idEvento;

        const paypalSdk = await loadScript({
            'clientId': 'AZ-KdqJRqNOlHsDUsjH5ul8HB1bpb3X_5KjPrWWvRNHZyNgzNNqhFdSMNYO9_HFWdZysQgqAugN4WoxX',
            currency: 'EUR'
        });
        paypalSdk.Buttons({

            onClick: (data) => {

            },
            createOrder: function(data,actions) {
                return fetch(baseURL+"/ordine/crea-ordine?id="+idEvento, {
                    method: "POST", headers: {"Content-Type": "application/json"}
                })
                .then((response) => {return response.json()})
                .then((res) => {
                    this.idOrdine = res.idOrdine
                    return res.idOrdine
                })
                .catch((error) => {console.log(error)});
            },

            onApprove: function(data,actions) {
                const id = data.orderID
                return fetch(baseURL+"/ordine/conferma-ordine?id="+id, {
                    method: "POST", headers: {"Content-Type":"application/json"}
                })
                .then((response) => { return response.json()})
                .then((details) => {
                    console.log(details)
                    
                })
                .catch((error) => {console.log(error)})
            },

            onError: function(err) {
                console.log(err)
            }


        }).render('#paypal-button-container')
        .catch((error) => {console.log(error)});
    }



}

</script>