import {GetterTree} from 'vuex'
import {StateInterface} from '../index'
import {AppStateInterface} from './state'
import {ClientConfig, CreateTimerecordDto} from "common-dto";
import {CreateTodoDto} from "@apps/server/src/todo/dto/create-todo.dto";

const getters: GetterTree<AppStateInterface, StateInterface> = {

  isLoading(state):boolean {
    return state.loadingCount > 0;
  },

  config(state):ClientConfig{
    return state.config;
  },

  timeRecords(state):CreateTimerecordDto[]{
    return state.timeRecords;
  },

  todos(state):CreateTodoDto[]{
    return state.todos;
  }

}

export default getters
