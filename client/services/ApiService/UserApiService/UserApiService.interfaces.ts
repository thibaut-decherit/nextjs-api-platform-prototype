import {UserFormUser} from "@/components/pages/users/types";
import {AxiosResponse} from 'axios';

export interface AxiosResponseWithUserFormUser extends AxiosResponse {
  data: UserFormUser
}
