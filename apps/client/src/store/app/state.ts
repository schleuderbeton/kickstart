import {ClientConfig, CreateTimerecordDto} from "common-dto";
import {CreateTodoDto} from "@apps/server/src/todo/dto/create-todo.dto";

export interface AppStateInterface {
  loadingCount:number;
  config:ClientConfig;
  timeRecords:CreateTimerecordDto[];
  todos:CreateTodoDto[];
}

function state (): AppStateInterface {
  return {
    loadingCount: 0,
    config: {} as any,
    timeRecords: [],
    todos: []
  }
}

export default state
