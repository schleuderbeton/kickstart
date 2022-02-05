<script src="src/pages/Index.ts" />
<template>
  <q-page class="text-center">
    <h5>{{$t("general.title")}}</h5>
    <div>{{clientConfig.name}} - v{{clientConfig.version}} ({{clientConfig.env}})</div>
  </q-page>
</template>
