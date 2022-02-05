import {Component, Vue} from "vue-property-decorator";
import {ClientConfig, CreateTimerecordDto} from "common-dto";

@Component({})
export default class Timerecords extends Vue {

  readonly columns = [
    {
      name: 'serviceID',
      required: true,
      label: 'DL',
      align: 'left',
      field: (row:CreateTimerecordDto) => row.service_id,
      sortable: true
    },
    {
      name: 'workingCode',
      align: 'left',
      label: 'Code',
      field: (row:CreateTimerecordDto) => row.working_code,
      sortable: true
    },
    {
      name: 'workingDescription',
      align: 'left',
      label: 'Description',
      field: (row:CreateTimerecordDto) => row.working_description,
      sortable: false
    },
    {
      name: 'workingMinutes',
      align: 'left',
      label: 'Minutes',
      field: (row:CreateTimerecordDto) => row.working_time_minutes,
      sortable: false
    },
    {
      name: 'workingDate',
      align: 'left',
      label: 'Working Date',
      field: (row:CreateTimerecordDto) => row.createdAt,
      sortable: true
    },
  ];



  get clientConfig():ClientConfig{
    console.log("TIMERECORDS get ClientConfig");
    return this.$store.getters["appStore/config"];
  }

  get allTimeRecords(): CreateTimerecordDto[]{
    console.log("TIMERECORDS get all records");
    return this.$store.getters["appStore/timeRecords"];
  }

  created(){
    console.log("TIMERECORDS page created");

    // trigger um data vom server zu holen ...
    //dispatch event to load configuration from server
    this.$store.dispatch("appStore/loadAllTimeRecords")
        .then(results => {
          // ----- test part (then) >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
          console.log("data fetched from server");
          console.log(this.allTimeRecords);
    })
        .catch(error => {
      this.$q.notify({
        type: 'negative',
        message: this.$t("errors.server.unavailable").toString()
      });
    });
  }

}
