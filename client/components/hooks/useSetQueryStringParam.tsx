import {useRouter} from "next/router";

const useSetQueryStringParam = () => {
  const router = useRouter();
  return (name: string, value: string, action: 'push'|'replace' = 'replace') => {
    router[action]({
      query: {...router.query, [name]: value}
    });
  };
}

useSetQueryStringParam.propTypes = {};

export default useSetQueryStringParam;
