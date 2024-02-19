<template class="page">
    <ion-content id="container">
        <div class="containerCalendar">
            <ion-list>
                <ion-accordion-group multiple="true" :value="['start']" mode="ios">
                    <ion-accordion value="start">
                        <ion-item slot="header">
                            <ion-label>{{ fechaText }}</ion-label>
                        </ion-item>
                        <ion-datetime slot="content" locale="es-ES" presentation="date" :value="today"
                            :highlighted-dates="highlightedDates" class="eventos" @ionChange="onChangeDate"></ion-datetime>
                    </ion-accordion>
                </ion-accordion-group>
            </ion-list>
        </div>

        <ion-fab slot="fixed" vertical="bottom" horizontal="end">
            <ion-fab-button @click="showLoading">
                <ion-icon :icon="addCircle"></ion-icon>
            </ion-fab-button>
        </ion-fab>
        <ion-infinite-scroll-content>
            <strong>Eventos</strong>
            <Eventos></Eventos>
        </ion-infinite-scroll-content>
    </ion-content>
</template>
<script>
import { IonDatetime, IonIcon, IonFabButton, IonFab, IonContent, IonInfiniteScrollContent, IonAccordionGroup, IonAccordion, IonItem, IonLabel, IonNote, IonList, loadingController } from '@ionic/vue';
import { addCircle } from 'ionicons/icons';
import Eventos from './Eventos.vue';
import axios from 'axios';

export default {
    components: { IonDatetime, IonIcon, IonFab, IonFabButton, IonContent, Eventos, IonInfiniteScrollContent, IonAccordionGroup, IonAccordion, IonItem, IonLabel, IonNote, IonList },
    data() {
        let year = new Date().toLocaleDateString('es-MX', { year: "numeric" })
        let month = new Date().toLocaleDateString('es-MX', { month: '2-digit' })
        let day = new Date().toLocaleDateString('es-MX', { day: '2-digit' })
        let hours = new Date().toLocaleDateString('es-MX', { hour: "2-digit", minute: '2-digit', second: '2-digit' })

        let hour = hours.split(', ')
        let date = year + '-' + month + '-' + day

        let today = date + 'T' + hour[1]
        let nuevaFecha = new Date(today)

        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

        const fechaText = nuevaFecha.toLocaleDateString("es-MX", options)

        const loading = loadingController.create({
            message: 'Cargando Información',
            spinner: 'lines-small'
        });

        const highlightedDates = [
            {
                date: '2024-02-05',
                textColor: '#FFF',
                backgroundColor: '#0277bdbd',
            },
            {
                date: '2024-02-11',
                textColor: '#FFF',
                backgroundColor: '#0277bdbd',
            },
            {
                date: '2024-02-20',
                textColor: '#FFF',
                backgroundColor: '#0277bdbd',
            },
            {
                date: '2024-02-23',
                textColor: '#FFF',
                backgroundColor: '#0277bdbd',
            },
        ];
        return { highlightedDates, IonIcon, addCircle, today, IonFab, IonFabButton, IonContent, Eventos, IonInfiniteScrollContent, IonAccordionGroup, IonAccordion, IonItem, IonLabel, IonNote, IonList, fechaText, loading, options };
    },
    methods: {
        onChangeDate(ev) {
            let nuevaFecha = new Date(ev.detail.value)
            this.fechaText = nuevaFecha.toLocaleDateString("es-MX", this.options)
            this.getPhone(7)
        },
        getPhones() {
            axios.get('https://api.restful-api.dev/objects')
                .then(response => {
                    console.log(response.data)
                })
                .catch(error => {
                    console.log(error)
                })
        },
        getPhone(id) {
            axios.get('https://api.restful-api.dev/objects/10')
                .then(response => {
                    console.log(response.data)
                })
                .catch(error => {
                    console.log(error)
                })
        },
        showLoading() {
            this.loading.then((r) => {
                r.present()
                setTimeout(() => {
                    this.hideLoading()
                    console.log("Delayed for 1 second.");
                }, "3000");
            });
        },
        hideLoading() {
            this.loading.then((r) => {
                r.dismiss()
            });
        }
    },
    mounted() {
        this.getPhones()
    }
};
</script>

<style scoped>
#container {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: -webkit-center;
}

ion-datetime::part(calendar-day today) {
    color: var(--primary);
}

ion-datetime::part(calendar-day active),
ion-datetime::part(calendar-day active):focus {
    background-color: var(--secondary);
    border-color: var(--secondary);
    color: #fff;
}

ion-datetime {
    --background: #ffffff;

    border-radius: 16px;
    box-shadow: var(--primary) 0px 10px 15px -3px;
}

ion-fab-button {
    --background: var(--primary);
    --background-activated: var(--primary);
    --background-hover: var(--primary);
    --border-radius: 15px;
    --box-shadow: 0px 1px 2px 0px var(--primary), 0px 1px 3px 1px var(--primary);
    --color: rgb(255, 255, 255);
}

#page {
    background-color: black;
}

.eventos {
    margin-top: 10px;
    margin-bottom: 25px;
}

.containerCalendar {
    position: sticky;
    top: 0;
    z-index: 1;
    background-color: white;
    margin-bottom: 15px;
}

ion-datetime {
    --background: rgb(255, 255, 255);
    --background-rgb: 255, 255, 255;
    --ion-color-tint: rgb(218, 216, 255);
    /* --wheel-highlight-background: rgb(218, 216, 255); --moradito shido */
    --wheel-highlight-background: var(--secondary-trasnparent);
    --wheel-fade-background-rgb: 255, 255, 255;
}

ion-datetime::part(wheel-item) {
    color: var(--secondary);
}

ion-datetime::part(wheel-item active) {
    color: #fff;
}

ion-label {
    font-weight: 600;
    color: var(--secondary) !important
}

ion-header {
    box-shadow: none;
}

ion-toolbar{
    box-shadow: none;
}
</style>