import axios from "axios";
import {UserFormUser, UserListUser} from "../../../components/pages/users/types";
import {AxiosResponseWithUserFormUser} from "./UserApiService.interfaces";

const rootUrl = process.env.NEXT_PUBLIC_API_BASE_URL + process.env.NEXT_PUBLIC_API_PATH + '/users';

function add(user: UserFormUser) {
  return new Promise<AxiosResponseWithUserFormUser>((resolve, reject) => {
    axios
      .post(
        rootUrl,
        user,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        })
      .then(response => {
        if (response.status === 201) {
          resolve(response);
        } else {
          reject();
        }
      })
      .catch(error => {
        reject(error);
      });
  });
}

function findAll() {
  return new Promise<UserListUser[]>((resolve, reject) => {
    axios
      .get(rootUrl)
      .then(response => {
        resolve(response.data['hydra:member']);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export {
  add,
  findAll
};
