import {Component, Vue} from 'vue-property-decorator'
import {changeLocale, supportedLocales} from "../boot/i18n";
import {ClientConfig} from "common-dto";

@Component({})
export default class MainLayout extends Vue {
  leftDrawerOpen = false;

  locales = supportedLocales;

  created() {
    //todo: set page title with quasar Meta plugin (should work but didn't work last time tried)
    //watch state for client config to set page title
    this.$store.watch((state, getters) => {
        return getters["appStore/config"];
      }, (config: ClientConfig) => {
        if (!config) {
          return;
        }
        let title = this.$t("general.title").toString();
        if (config.env !== "production") {
          title = `[${config.env}] ${title}`;
        }
        document.title = title;
      },
      {immediate: true}
    );
  }

  get isLoading() {
    return this.$store.getters['appStore/isLoading'];
  }

  navigateTo(route: string) {
    this.$router.push({path: route}).catch(()=>{});
  }

  switchLocale(locale: string) {
    console.log("locale", locale)
    changeLocale(locale);
  }
}
