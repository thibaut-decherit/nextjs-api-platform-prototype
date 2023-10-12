import {AxiosPromise, AxiosResponse} from "axios";
import _ from "lodash";
import {Dispatch, SetStateAction} from "react";
import {ApiPlatformConstraintViolation} from "@/types";

/**
 * @param {function} axiosCallback
 * @param {array} axiosCallbackParams
 * @param {?function} onSuccess
 * @param {?object} stateErrors
 * @param {?function} setStateErrors
 * @param {?function} onError Called on error only if it's not a validation error.
 */
const submit = async (
  axiosCallback: (...parameters: any[]) => AxiosPromise,
  axiosCallbackParams: unknown[],
  onSuccess?: (response: AxiosResponse) => void,
  stateErrors?: { [key: string]: string[] },
  setStateErrors?: Dispatch<SetStateAction<{ [key: string]: string[] }>>,
  onError?: (error: unknown) => void
) => {
  try {
    await axiosCallback(...axiosCallbackParams)
      .then(response => {
        if (typeof onSuccess === 'function') {
          onSuccess(response);
        }
      })
      .catch(error => {
        /*
        Handles constraint violations returned by API Platform.
        Calls setStateErrors() callback to pass them to the consumer component.
         */
        if (
          typeof stateErrors === 'object'
          && typeof setStateErrors === 'function'
          && error.response?.status === 422
          && error.response?.data?.violations
        ) {
          const errorMessages: { [key: string]: string[] } = _.cloneDeep<{ [key: string]: string[] }>(
            stateErrors
          );

          // Clears error messages from previous submit attempt.
          _.forEach(Object.keys(errorMessages), key => {
            errorMessages[key] = [];
          });

          error.response?.data?.violations.forEach((violation: ApiPlatformConstraintViolation) => {
            errorMessages[violation.propertyPath].push(violation.message);
          });

          setStateErrors(_.cloneDeep(errorMessages));
        } else if (typeof onError === 'function') {
          onError(error);
        }
      });
  } catch (error: any) {
    if (typeof onError === 'function') {
      onError(error);
    }
  }
};

export {
  submit
};
