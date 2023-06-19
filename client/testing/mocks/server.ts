import {setupServer} from "msw/node";
import {handlers} from "./handlers";

// Configures a request mocking server with the given request handlers.
export const server = setupServer(...handlers);
