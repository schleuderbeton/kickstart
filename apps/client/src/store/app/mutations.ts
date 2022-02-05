import {MutationTree} from 'vuex'
import {AppStateInterface} from './state'
import Vue from "vue";
import {plainToClass, plainToInstance} from "class-transformer";
import {ClientConfig, CreateTimerecordDto} from "common-dto";
import {CreateTodoDto} from "@apps/server/src/todo/dto/create-todo.dto";

const mutation: MutationTree<AppStateInterface> = {

  incrementLoading(state:AppStateInterface) {
    Vue.set(state, 'loadingCount', state.loadingCount + 1);
  },

  decrementLoading(state:AppStateInterface) {
    Vue.set(state, 'loadingCount', Math.max(0, state.loadingCount - 1));
  },

  setConfig(state:AppStateInterface, config: any) {
    Vue.set(state, "config", plainToClass(ClientConfig, config));
  },

  setAllTimeRecords(state:AppStateInterface, timeRecords: []) {
    // umwandlung der objects into todo - effektiv zuordnen
    // vue.set -> setzt den array im richtigen type auf den state
    Vue.set(state, "timeRecords", plainToInstance(CreateTimerecordDto, timeRecords));
  },

  setAllTodos(state:AppStateInterface, todos: []){
    Vue.set(state, "todos", plainToInstance(CreateTodoDto, todos));
  }

}

export default mutation
