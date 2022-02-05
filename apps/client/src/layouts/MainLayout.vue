<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="q-toolbar-mobile-flex">

        <q-breadcrumbs active-color="white" style="font-size: 16px">
          <q-breadcrumbs-el
            class="cursor-pointer"
            icon="home"
            label="M7 - Proto"
            @click="navigateTo('/')"
          />
          <q-breadcrumbs-el
            class="cursor-pointer"
            :label="$route.params.environment"
            icon="widgets"
            @click="navigateTo(`/environment/${$route.params.environment}`)"
            v-if="$route.params.environment"
          />
          <q-breadcrumbs-el
            :label="$route.params.application"
            icon="build"
            v-if="$route.params.application"
          />
        </q-breadcrumbs>

        <div class="locale-changer">
          <q-select
            standout
            v-model="$i18n.locale"
            :options="locales"
            @input="value => {switchLocale(value)}"
            :option-label="lang => $t(`languages.${lang}`)">
            <template v-slot:prepend>
              <q-icon name="translate" />
            </template>
          </q-select>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container class="bg-grey-2">
      <router-view />
    </q-page-container>
    <q-inner-loading :showing="isLoading">
      <q-spinner-gears size="50px" color="primary" />
    </q-inner-loading>
  </q-layout>
</template>

<script src="./MainLayout.ts" />
