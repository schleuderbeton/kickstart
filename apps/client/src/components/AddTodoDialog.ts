import {Component, Prop, Vue} from "vue-property-decorator";
import {Todo} from "@apps/server/src/todo/schemas/todo.schema";
import {CreateTodoDto} from "@apps/server/src/todo/dto/create-todo.dto";

export interface DialogProps {
    visible: boolean;
}

@Component({})
export default class AddTodoDialog extends Vue {

    @Prop({ required: true })
    readonly props: DialogProps;
    newTodo: CreateTodoDto;

    addBtnClick(){
        console.log("ADD - in dialog clicked ... ");
        console.log("--title: ".concat(this.newTodo.title));
        console.log("--description: ".concat(this.newTodo.description));
        console.log("--duedate: ".concat(this.newTodo.dueDate.toString()));
        // create todo

    }

    cancelBtnClick(){
        console.log("CANCEL - in dialog clicked ...");
        //clear newTodo
    }

    clickDatePickerIcon(){
        console.log("DATEPICKER ICON - in dialog clicked ...");
    }

    created() {
        console.log("TODO-DIALOG page created");
        // create new todo object
        this.newTodo = new CreateTodoDto();
        // var newTodo = new Todo();
        // var newTodo = new CreateTodoDto();
    }

}