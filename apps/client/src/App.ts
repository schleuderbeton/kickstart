import 'reflect-metadata';
import {Component, Vue, Watch} from "vue-property-decorator";
import {AxiosRequestConfig} from "axios";

@Component({})
export default class App extends Vue {

  beforeCreate() {
    const notifyError = (message:string) => {
      this.$q.notify({
        type: 'negative',
        position: 'bottom-left',
        message: message,
        closeBtn: true,
        timeout: 0
      });
    };
    //catch all unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      console.log("unhandledrejection", event.reason)
      notifyError(event.reason);
      event.preventDefault();
    });
    //catch all unhandled errors
    window.addEventListener('error', event => {
      console.log("unhandledrejection", event.message)
      notifyError(event.message);
    });
  }

  created() {
    //connect requests/responses of axios "front" instance to app store for global loading indicator
    this.$axiosFront.interceptors.request.use((config: AxiosRequestConfig) => {
      this.$store.dispatch("appStore/enableLoading");
      return config;
    });
    this.$axiosFront.interceptors.response.use( response => {
      this.$store.dispatch("appStore/disableLoading");
      return response;
    }, error => {
      this.$store.dispatch("appStore/disableLoading");
      throw error;
    });

    //dispatch event to load configuration from server
    this.$store.dispatch("appStore/loadConfig").catch(error => {
      this.$q.notify({
        type: 'negative',
        message: this.$t("errors.server.unavailable").toString()
      });
    });
  }

  @Watch("$i18n.locale")
  onLocaleChange(locale: string) {
    console.log("locale change", locale)
  }
}
