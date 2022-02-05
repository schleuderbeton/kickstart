<script src="src/pages/Timerecords.ts" />
<template>
  <q-page class="text-center">
    <h5>{{$t("m7.title")}}</h5>
    <div>{{clientConfig.name}} - v{{clientConfig.version}} ({{clientConfig.env}})</div>

<div class="q-pa-md">
          <q-table
            class="my-sticky-header-table"
            title="Time Records"
            :data="allTimeRecords"
            :columns="columns"
            row-key="name"
            flat
            bordered
          />
        </div>

  </q-page>
</template>
