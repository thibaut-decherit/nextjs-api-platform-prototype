import _ from "lodash";
import type {ParsedUrlQuery} from "querystring";

export default class NextRouterHelper {
  /**
   * Allow search related states specified in the config parameter to remain synced with URL query params in case the
   * latter change because of navigation (e.g. back/forward or click on the current page's link in the navbar).
   */
  static syncStatesWithQueryParams(
    config: {
      [key: string]: {
        defaultValue: number | string | string[] | null;
        setStateFunction: (newState: number | string | string[] | null) => void;
      }
    },
    queryParams: ParsedUrlQuery
  ) {
    Object.keys(config).forEach(queryParamName => {
      const queryParam: string | string[] | null = _.get(queryParams, queryParamName, null);
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
