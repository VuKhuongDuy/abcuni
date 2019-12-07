import axios from "axios";
import cookie from '../config/cookie.js'

let get = function(api){

}

let geta = function(api) {
    const data = axios
      .get(api, {
        headers: {
          Authorization: cookie.getTokenFromCookie(),
          Lang: Glo_MyLocale
        }
      })
      .then(result => {
        return result.data;
      })
      .catch(() => {});
  
    return data;
  };