import {Component, Vue} from "vue-property-decorator";
import {ClientConfig, CreateTimerecordDto} from "common-dto";
import {CreateTodoDto} from "@apps/server/src/todo/dto/create-todo.dto";
import AddTodoDialog from "../components/AddTodoDialog.vue";
import {DialogProps} from "../components/AddTodoDialog";

@Component({
  components: {
    AddTodoDialog
  }
})
export default class Todos extends Vue {

  // dialog
  readonly addTodoDialog: DialogProps = {visible: false};

  // table definition
  readonly columns = [
    {
      name: 'title',
      required: true,
      label: 'todo',
      align: 'left',
      field: (row:CreateTodoDto) => row.title,
      sortable: true
    },
    {
      name: 'description',
      align: 'left',
      label: 'description',
      field: (row:CreateTodoDto) => row.description,
      sortable: true
    },
    {
      name: 'actions',
      align: 'center',
      label: 'actions',
    },
    // {
    //   name: 'completedAt',
    //   align: 'left',
    //   label: 'completed at',
    //   field: (row:CreateTodoDto) => row.completedAt,
    //   sortable: true
    // }
  ];

  addBtnClick(){
    console.log("ADD - click click click ...");
    this.addTodoDialog.visible = true;
    console.log("after dialog props.visible=true");
  }

  onRowClick(){
    console.log("ON ROW - click click click ...");
  }

  expandMoreBtnClick(){
    console.log("EXPAND MORE - click click click ...");
  }

  deleteBtnClick(){
    console.log("DELETE - click click click ...");
  }

  doneBtnClick(){
    console.log("DONE - click click click ...");
  }

  //TODO: what does this method
  get allTodos(): CreateTodoDto[] {
    console.log("TODO's get all records");
    return this.$store.getters["appStore/todos"];
  }

  created(){
    console.log("TODOS page created");

    // trigger um data vom server zu holen ...
    //dispatch event to load configuration from server
    this.$store.dispatch("appStore/loadAllTodos").catch(error => {
      this.$q.notify({
        type: 'negative',
        message: this.$t("errors.server.unavailable").toString()
      });
    });
  }

}
