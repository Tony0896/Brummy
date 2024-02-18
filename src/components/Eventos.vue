<template class="page">
    <div class="scroll">
        <div class="containerEvents">
            <div class="colorEvent">&emsp;</div>
            <div>
                <ion-card>
                    <ion-card-header>
                        <ion-card-title>08:30</ion-card-title>
                        <ion-card-subtitle>
                            Vacuna
                        </ion-card-subtitle>
                    </ion-card-header>

                    <ion-card-content>
                        Here's a small text description for the card content. Nothing more, nothing less.
                    </ion-card-content>
                </ion-card>
            </div>
        </div>
        <div class="containerEvents">
            <div class="colorEvent">&emsp;</div>
            <div>
                <ion-card>
                    <ion-card-header>
                        <ion-card-title>08:30</ion-card-title>
                        <ion-card-subtitle>
                            Vacuna
                        </ion-card-subtitle>
                    </ion-card-header>

                    <ion-card-content>
                        Here's a small text description for the card content. Nothing more, nothing less.
                    </ion-card-content>
                </ion-card>
            </div>
        </div>
        <div class="containerEvents">
            <div class="colorEvent">&emsp;</div>
            <div>
                <ion-card>
                    <ion-card-header>
                        <ion-card-title>08:30</ion-card-title>
                        <ion-card-subtitle>
                            Vacuna
                        </ion-card-subtitle>
                    </ion-card-header>

                    <ion-card-content>
                        Here's a small text description for the card content. Nothing more, nothing less.
                    </ion-card-content>
                </ion-card>
            </div>
        </div>
        <div class="containerEvents">
            <div class="colorEvent">&emsp;</div>
            <div>
                <ion-card>
                    <ion-card-header>
                        <ion-card-title>08:30</ion-card-title>
                        <ion-card-subtitle>
                            Vacuna
                        </ion-card-subtitle>
                    </ion-card-header>

                    <ion-card-content>
                        Here's a small text description for the card content. Nothing more, nothing less.
                    </ion-card-content>
                </ion-card>
            </div>
        </div>
    </div>
    
</template>
<script>
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/vue';
export default {
    components: { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle },
    setup() {

    }
};
</script>

<style scoped>
ion-card-header {
    display: flex;
    flex-direction: row;
}

ion-card {
    margin-left: 0px;
}

ion-card-subtitle{
    margin: auto auto auto 10px;
}

.containerEvents {
    display: flex;
    flex-direction: row;
    padding: 1px;
}

.colorEvent {
    background-color: cadetblue;
    margin: 10px 0px;
}


</style>