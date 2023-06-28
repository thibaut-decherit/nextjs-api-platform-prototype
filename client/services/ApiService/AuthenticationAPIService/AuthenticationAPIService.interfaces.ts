import {AxiosResponse} from "axios";

export interface GetJWTResponse extends AxiosResponse {
  data: {
    token: string;
    [key: string]: unknown;
  };
  headers: {
    [key: string]: string
  };
}
