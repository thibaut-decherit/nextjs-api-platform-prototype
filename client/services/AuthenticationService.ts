import {Credentials} from "../types";
import {getJWT} from "./ApiService/AuthenticationAPIService/AuthenticationAPIService";

const login = (
  credentials: Credentials
) => {
  return new Promise<void>((resolve, reject) => {
    getJWT(credentials)
      .then(() => {
        resolve();
      })
      .catch((error: Error) => {
        reject(error);
      })
  });
};

export {
  login
};
