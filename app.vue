<template>
  <div>
    <q-btn color="primary" label="Primary" />
    <QBtn color="secondary" label="Secondary" />
    <LazyQBtn color="amber" glossy label="Amber" />
    <NuxtWelcome />
  </div>
</template>
<script setup lang="ts">
import LogRocket from "logrocket";
LogRocket.init("ulrfwc/test");
LogRocket.identify("Gopi", {
  name: "GOPI",
  email: "test@test.com",
  subscriptionType: "pro",
});
</script>
