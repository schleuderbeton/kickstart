import {axiosFront, getError} from "../boot/axios";
import {CreateTodoDto} from "@apps/server/src/todo/dto/create-todo.dto";

export function loadConfig() {
  return new Promise((resolve, reject) => {
    axiosFront.get('./api/config/client').then(response => {
      resolve(response.data);
    }).catch(error =>{
      const e = getError(error);
      reject(`Error loading client configuration: ${e.message || e}`);
    });
  });
}

export function loadAllTimeRecords() {
  return new Promise((resolve, reject) => {
    axiosFront.get('./api/timerecords').then(response => {
      resolve(response.data);
    }).catch(error =>{
      const e = getError(error);
      reject(`Error loading ALL time records: ${e.message || e}`);
    });
  });
}

export function loadAllTodos() {
  return new Promise((resolve, reject) => {
    axiosFront.get('./api/todos').then(response => {
      resolve(response.data);
    }).catch(error => {
      const e = getError(error);
      reject(`Error loading ALL todos: ${e.message || e}`);
    });
  });
}

export function createTodo(todo: CreateTodoDto) {
  return new Promise((resolve, reject) => {
    axiosFront.post('./api/todos', todo).then(response => {
      resolve(response.data);
    }).catch(error => {
      const e = getError(error);
      reject(`Error creating new todos: ${e.message || e}`);
    });
  });
}
