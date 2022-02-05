import axios, {AxiosError, AxiosInstance} from 'axios'
import {boot} from 'quasar/wrappers'

// export const axiosFront = axios.create({withCredentials: true});
export const axiosFront = axios.create();


export const getError = (error:AxiosError):string | any => {
    //fixme: doesn't work if message is array (eg: field validation error from nestjs)
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      // console.log(axiosError.response.data.message);
      // console.log(axiosError.response.status);
      // console.log(axiosError.response.headers);
      // return error.response.data.message;
      return error.response.data;
    } else if (error.request) {
      // The request was made but no response was received
      // `axiosError.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      // console.log(axiosError.request);
      return "No response";
    } else {
      // Something happened in setting up the request that triggered an Error
      // console.log('Error', axiosError.message);
      return error.message;
    }
}

declare module 'vue/types/vue' {
  interface Vue {
    $axios: AxiosInstance;
    $axiosFront: AxiosInstance
  }
}

export default boot(({Vue}) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  Vue.prototype.$axios = axios;
  Vue.prototype.$axiosFront = axiosFront;
})
