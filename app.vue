<template>
  <q-layout>
    <!-- Header -->
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          My Nuxt 3 + Quasar App
        </q-toolbar-title>
        <q-btn flat label="Home" to="/" />
        <q-btn flat label="About" to="/about" />
        <q-btn flat label="Contact" to="/contact" />
      </q-toolbar>
    </q-header>

    <!-- Main content -->
    <q-page-container>
      <router-view /> <!-- Здесь будет рендериться контент из index.vue или других страниц -->
    </q-page-container>

    <!-- Footer -->
    <q-footer elevated>
      <q-toolbar>
        <q-toolbar-title>
          Footer Content
        </q-toolbar-title>
        <div class="q-mr-md-auto">© 2025 My Nuxt 3 + Quasar App</div>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { QLayout, QHeader, QToolbar, QToolbarTitle, QBtn, QFooter, QPageContainer } from 'quasar';
</script>
