<script src="./AddTodoDialog.ts"/>
<template>

  <q-dialog v-model="props.visible" persistent>
    <q-card style="width: 700px; max-width: 80vw;">
      <q-card-section>
        <div class="text-h6">TODO</div>
      </q-card-section>
      <q-separator/>
      <q-card-section>
        <div class="q-pa-md q-gutter-sm">
          <q-input v-model="newTodo.title" label="Title" autofocus dense/>
          <q-input
              v-model="newTodo.description"
              label="Description"
              filled
              type="textarea"
              dense
          />
          <q-input color="grey-3" v-model="newTodo.dueDate" label="Due Date" placeholder="YYYY-MM-DD">
            <template v-slot:append>
              <q-icon name="event" @click="clickDatePickerIcon"/>
            </template>
          </q-input>
        </div>
      </q-card-section>
      <q-separator/>
      <q-card-actions align="left">
        <q-btn color="green" label="Add TODO" @click="addBtnClick" v-close-popup>
          <q-tooltip class="bg-accent">Add TODO ...</q-tooltip>
        </q-btn>
        <q-btn flat icon="close" @click="cancelBtnClick" v-close-popup>
          <q-tooltip class="bg-accent">Cancel / Close</q-tooltip>
        </q-btn>
      </q-card-actions>

    </q-card>
  </q-dialog>

</template>
