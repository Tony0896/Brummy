<template class="page">
    <ion-content id="container">
        <div class="containerCalendar">
            <ion-list>
                <ion-accordion-group :value="['start']">
                    <ion-accordion value="start">
                        <ion-item slot="header">
                            <ion-label>10-10-2022</ion-label>
                        </ion-item>
                        <ion-datetime slot="content" locale="es-ES" presentation="date" :value="today"
                            :highlighted-dates="highlightedDates" class="eventos"></ion-datetime>
                    </ion-accordion>
                </ion-accordion-group>
            </ion-list>
        </div>

        <ion-fab slot="fixed" vertical="bottom" horizontal="end">
            <ion-fab-button>
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
import { IonDatetime, IonIcon, IonFabButton, IonFab, IonContent, IonInfiniteScrollContent, IonAccordionGroup, IonAccordion, IonItem, IonLabel, IonNote, IonList } from '@ionic/vue';
import { addCircle } from 'ionicons/icons';
import Eventos from './Eventos.vue';

export default {
    components: { IonDatetime, IonIcon, IonFab, IonFabButton, IonContent, Eventos, IonInfiniteScrollContent, IonAccordionGroup, IonAccordion, IonItem, IonLabel, IonNote, IonList },
    setup() {
        let year = new Date().toLocaleDateString('es-MX', { year: "numeric" })
        let month = new Date().toLocaleDateString('es-MX', { month: '2-digit' })
        let day = new Date().toLocaleDateString('es-MX', { day: '2-digit' })
        let hours = new Date().toLocaleDateString('es-MX', { hour: "2-digit", minute: '2-digit', second: '2-digit' })

        let hour = hours.split(', ')
        let date = year + '-' + month + '-' + day

        let today = date + 'T' + hour[1]
        console.log(today)

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
                width: '30px',
                height: '29px'
            },
        ];

        return { highlightedDates, IonIcon, addCircle, today, IonFab, IonFabButton, IonContent, Eventos, IonInfiniteScrollContent, IonAccordionGroup, IonAccordion, IonItem, IonLabel, IonNote, IonList };
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

ion-datetime.md::part(calendar-day active),
ion-datetime.md::part(calendar-day active):focus {
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
</style>