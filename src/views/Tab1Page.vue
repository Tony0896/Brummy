<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Agenda</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tab 1</ion-title>
        </ion-toolbar>
      </ion-header>

      <Calendar></Calendar>
    </ion-content>
  </ion-page>
</template>

<script setup >
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import Calendar from '../components/Calendar.vue';
</script>

<style scoped>
ion-title {
  font-weight: bold;
}
</style>