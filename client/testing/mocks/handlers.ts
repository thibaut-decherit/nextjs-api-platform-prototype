import {rest} from "msw";

export const handlers = [
  rest.get('https://example-endpoint.com/example', (request, response, context) => {
    return response(
      context.status(200),
      context.json({
        message: 'test message'
      })
    );
  })
];
