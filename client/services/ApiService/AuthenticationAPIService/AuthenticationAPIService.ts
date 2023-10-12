import axios from "axios";
import _ from "lodash";
import {Credentials} from "@/types";
import {getApiUrl} from "@/services/ApiService/ApiUrlService";
import {GetJWTResponse} from "./AuthenticationAPIService.interfaces";

const rootUrl = getApiUrl();

function getJWT(
  credentials: Credentials
) {
  return new Promise<GetJWTResponse>((resolve, reject) => {
    axios
      .post(rootUrl + '/login_check', credentials)
      .then((response: GetJWTResponse) => {
        if (_.has(response, 'data.token') && _.has(response, 'headers.app-user-front-end-data-json')) {
          return resolve(response);
        }

        reject('error');
      })
      .catch(error => {
        if (_.has(error, 'response.status') && error.response.status === 401) {
          return reject('bad credentials');
        }

        if (_.has(error, 'message') && error.message === 'Network Error') {
          return reject('network error');
        }

        reject('error');
      });
  });
}

export {
  getJWT
};
