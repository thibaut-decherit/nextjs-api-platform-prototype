import _ from "lodash";

export default class NextRouterHelper {
  /**
   * Allow search related states specified in the config parameter to remain synced with URL query params in case the
   * latter change because of navigation (e.g. back/forward or click on the current page's link in the navbar).
   */
  static syncStatesWithQueryParams(
    config: {
      [key: string]: {
        defaultValue: number | string | null;
        /*
        The first supported type is for proper setState() functions from useState(), the second one is for 'fake'
        setState() functions wrapping useReducer() dispatch().
        Use the first one if your state supports number | string | null types.
        If your state only supports string or number, use the second one with a reducer supporting
        number | string | null but enforcing your state type by casting the 'fake' setState() parameter to the expected
        type (number or string), or by assigning a default value of the expected type if the parameter of the 'fake'
        setState() is null.
         */
        setStateFunction: (newState: number | string | null) => void;
      }
    },
    queryParams: URLSearchParams
  ) {
    Object.keys(config).forEach(queryParamName => {
      const queryParam: number | string | null = _.get(queryParams, queryParamName, null);
      if (queryParam !== null) {
        // query param is still in the URL, so we ensure the related state has the same value.
        config[queryParamName].setStateFunction(queryParam);
      } else {
        // Search param is no longer in the URL, so we set the related state back to its default value.
        config[queryParamName].setStateFunction(config[queryParamName].defaultValue);
      }
    });
  }
}
