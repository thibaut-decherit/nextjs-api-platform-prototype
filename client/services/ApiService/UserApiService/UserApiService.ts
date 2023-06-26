import axios from "axios";
import {UserFormUser, UserListUser} from "../../../components/pages/users/types";
import {AxiosResponseWithUserFormUser} from "./UserApiService.interfaces";

const rootUrl = (process.env.NEXT_PUBLIC_API_BASE_URL as string) + (process.env.NEXT_PUBLIC_API_PATH as string) + '/users';

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

function paginatedFindAll(
  itemsPerPage = 5,
  pageNumber = 1
) {
  const url =
    rootUrl +
    `?itemsPerPage=${itemsPerPage}` +
    `&page=${pageNumber}`;

  return new Promise<{
    results: UserListUser[];
    totalItemsCount: number
  }>((resolve, reject) => {
    axios
      .get(url)
      .then(response => {
        resolve({
          results: response.data['hydra:member'],
          totalItemsCount: response.data['hydra:totalItems']
        });
      })
      .catch(error => {
        reject(error);
      });
  });
}

export {
  add,
  paginatedFindAll
};
