import axios from "axios";
import * as cookie from './cookie'

let getAxios = function(url) {
    const data = axios
      .get(url, {
        headers: {
          Authorization: cookie.getToken(),
        }
      })
      .then(result => {
        return result.data;
      })
      .catch(() => {});
  
    return data;
};

let postAxios = function(url, body){
  const data = axios.post(
    url,
    body,
    {
      headers: {
        Authorization: cookie.getToken()
      }
    }
  ).then(result => {
    return result.data;
  })
  .catch(()=>{})

  return data;
}

let deleteAxios = function(api) {
  const data = axios
    .delete(api, {
      headers: {
        Authorization: cookie.getToken(),
        Lang: Glo_MyLocale
      }
    })
    .then(result => {
      return result.data;
    })
    .catch(() => {});

  return data;
};

let putAxios = function(api) {
  const data = axios
    .put(
      api,
      {},
      {
        headers: {
          Authorization: cookie.getToken(),
          Lang: Glo_MyLocale
        }
      }
    )
    .then(result => {
      return result.data;
    })
    .catch(() => {});

  return data;
};

export { getAxios, postAxios, deleteAxios, putAxios };
