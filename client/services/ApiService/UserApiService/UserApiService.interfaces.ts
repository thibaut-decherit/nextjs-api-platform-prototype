import {AxiosResponse} from 'axios';
import {UserFormUser} from "../../../components/pages/users/types";

export interface AxiosResponseWithUserFormUser extends AxiosResponse {
  data: UserFormUser
}
