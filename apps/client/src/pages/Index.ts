import {Component, Vue} from "vue-property-decorator";
import {ClientConfig} from "common-dto";

@Component({})
export default class Index extends Vue {

  get clientConfig():ClientConfig{
    return this.$store.getters["appStore/config"];
  }

  created(){
    console.log("page created");
  }

}
