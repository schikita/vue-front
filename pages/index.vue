<template>
  <q-page-container>
    <q-page class="q-pa-md">
      <q-btn label="Test KeyCloak" @click="login()"></q-btn>

      <q-page-scroller position="bottom">
        <q-btn fab icon="keyboard_arrow_up" color="red"></q-btn>
      </q-page-scroller>
    </q-page>
  </q-page-container>
</template>

<style lang="scss" scoped></style>

<script setup lang="ts">
import Keycloak from "keycloak-js";
function login() {
  console.log("----> ", useNuxtApp().$keycloak);
  (useNuxtApp().$keycloak as Keycloak).login();
}
</script>
