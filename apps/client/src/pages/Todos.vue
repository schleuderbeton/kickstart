<script src="src/pages/Todos.ts" />
<template>
  <q-page class="text-center">
    <AddTodoDialog v-if="addTodoDialog.visible" :props="addTodoDialog"/>
    <h5>{{$t("todo.title")}}</h5>

<div class="q-pa-md">
          <q-table
            class="my-sticky-header-table"
            :title="$t(`todo.table-title`)"
            :data="allTodos"
            :columns="columns"
            row-key="name"
            @row-click="onRowClick"
            flat
            bordered
            >
              <!--Table HEADER              -->
              <template v-slot:top-right>
                <q-btn round icon="add" size="10px" color="black" @click="addBtnClick">
                  <q-tooltip class="bg-accent">Add todo ...</q-tooltip>
                </q-btn>
              </template>
              <!--Table COLUMN 'ACTIONS'            -->
              <template v-slot:body-cell-actions>
                <q-btn round icon="delete" size="sm" @click.stop="deleteBtnClick">
                  <q-tooltip class="bg-accent">Delete todo ...</q-tooltip>
                </q-btn>
                <q-btn round icon="expand_more" size="sm" @click.stop="expandMoreBtnClick">
                  <q-tooltip class="bg-accent">Show todo description ...</q-tooltip>
                </q-btn>
                <q-btn round icon="done" size="sm" @click.stop="doneBtnClick">
                  <q-tooltip class="bg-accent">Finish todo ...</q-tooltip>
                </q-btn>
              </template>
            </q-table>
        </div>

  </q-page>
</template>

<style lang="sass">
.my-sticky-header-table
  /* height or max-height is important */
  height: 310px

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: #c1f4cd

  thead tr th
    position: sticky
    z-index: 1
  thead tr:first-child th
    top: 0

  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
</style>