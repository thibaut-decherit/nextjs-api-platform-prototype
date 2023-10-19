// TODO: replace `process.env` and `process?.env` calls in the code by import from this file. Test the behavior of `?.`

const NEXT_PUBLIC_API_BASE_URL = process?.env?.NEXT_PUBLIC_API_PROXY_BASE_URL;
const NEXT_PUBLIC_API_PATH = process?.env?.NEXT_PUBLIC_API_PATH;
const NEXT_PUBLIC_API_PROXY_BASE_URL = process?.env?.NEXT_PUBLIC_API_PROXY_BASE_URL;
const NEXT_PUBLIC_ENV = process?.env?.NEXT_PUBLIC_ENV;

module.exports = {
    NEXT_PUBLIC_API_BASE_URL,
    NEXT_PUBLIC_API_PATH,
    NEXT_PUBLIC_API_PROXY_BASE_URL,
    NEXT_PUBLIC_ENV
}
