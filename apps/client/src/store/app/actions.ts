import {ActionTree} from 'vuex'
import {StateInterface} from '../index'
import {AppStateInterface} from './state'
import {createTodo, loadAllTimeRecords, loadAllTodos, loadConfig} from "../../services/app.service";

const actions: ActionTree<AppStateInterface, StateInterface> = {

  enableLoading(context){
    context.commit("incrementLoading");
  },

  disableLoading(context){
    context.commit("decrementLoading");
  },

  loadConfig(context) {
    return loadConfig().then(result => {
      context.commit("setConfig", result);
      return result;
    });
  },

  loadAllTimeRecords(context) {
    return loadAllTimeRecords().then(result => {
      context.commit("setAllTimeRecords", result);
      return result;
    });
  },

  loadAllTodos(context) {
    return loadAllTodos().then(result => {
      context.commit("setAllTodos", result);
      return result;
    });
  },

  createTodo(context, todo){
    return createTodo(todo).then(result => {
      context.commit("createTodo", result);
      return result;
    });
  }

}

export default actions
