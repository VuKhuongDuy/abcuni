import axios from "axios";
import {serverPath} from './config';
import * as cookie from './cookie'

let getAxios = function(url) {
    url = serverPath + url;
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
  url = serverPath + url;
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

let deleteAxios = function(url) {
  url = serverPath + url;
  const data = axios.delete(
      url, 
      {
        headers: {
          Authorization: cookie.getToken()
        }
      } 
    ).then(result => {
      return result.data;
    })
    .catch(() => {});

  return data;
};

let putAxios = function(url, body) {
  url = serverPath + url;
  const data = axios.put(
      url, 
      body,
      {
        headers: {
          Authorization: cookie.getToken(),
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
