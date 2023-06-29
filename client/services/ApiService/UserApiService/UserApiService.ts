import axios from "axios";
import {UserFormUser, UserListUser} from "../../../components/pages/users/types";
import {getApiUrl} from "../ApiUrlService";
import {AxiosResponseWithUserFormUser} from "./UserApiService.interfaces";

const rootUrl = getApiUrl() + '/users';

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

function deleteOneById(id: string) {
  return new Promise<void>((resolve, reject) => {
    axios
      .delete(rootUrl + '/' + id)
      .then(response => {
        if (response.status < 300) {
          resolve();
        } else {
          reject();
        }
      })
      .catch(error => {
        if (error.response?.status === 404) {
          resolve();
        } else {
          reject(error);
        }
      });
  });
}

function editOneById(id: string, user: UserListUser) {
  return new Promise<AxiosResponseWithUserFormUser>((resolve, reject) => {
    axios
      .patch(
        rootUrl + '/' + id,
        user,
        {
          headers: {
            'Content-Type': 'application/merge-patch+json'
          }
        })
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
}

function findOneById(id: string) {
  return new Promise<UserListUser>((resolve, reject) => {
    axios
      .get(rootUrl + '/' + id)
      .then(response => {
        resolve(response.data);
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
  deleteOneById,
  editOneById,
  findOneById,
  paginatedFindAll
};
