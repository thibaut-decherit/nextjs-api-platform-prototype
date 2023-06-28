import axios from "axios";
import _ from "lodash";
import {Credentials} from "../../../types";
import {GetJWTResponse} from "./AuthenticationAPIService.interfaces";
import {GetJWTOnSuccessCallback} from "./AuthenticationAPIService.types";

const rootUrl = (process.env.NEXT_PUBLIC_API_BASE_URL as string) + (process.env.NEXT_PUBLIC_API_PATH as string);

function getJWT(
  credentials: Credentials,
  onSuccess?: GetJWTOnSuccessCallback
) {
  return new Promise<void>((resolve, reject) => {
    axios
      .post(rootUrl + '/login_check', credentials)
      .then((response: GetJWTResponse) => {
        if (_.has(response, 'data.token') && _.has(response, 'headers.app-user-front-end-data-json')) {
          if (typeof onSuccess === 'function') {
            onSuccess(response);
          }

          return resolve();
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
  getJWT,
  GetJWTOnSuccessCallback
};
