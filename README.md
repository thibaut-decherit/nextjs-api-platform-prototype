# nextjs-api-platform-prototype

Explores some features of Next.JS such as server side rendering. Also explores some features of
[React Hook Form](https://react-hook-form.com/) and [React Query](https://tanstack.com/query/v3/).

## Setup
### Install dependencies
`yarn --cwd client/`
`composer install -d server/`

### Create `client/.env.local` (see `client/.env.your_env.local.dist`)
Customize all empty variables.

### Create `server/.env.local` (see `server/.env.your_env.local.dist`)
Customize all empty variables.

If you use MariaDB, `DB_VERSION` should start with `mariadb-` then the version number, else only specifying the version
number should suffice.

### Setup LexikJWTAuthenticationBundle
`php server/bin/console lexik:jwt:generate-keypair`

### Setup database
`php server/bin/console doctrine:database:create`
`php server/bin/console doctrine:migration:migrate`

## Run in dev env
Run in dedicated terminals:
- `php -t server/public -S localhost:8000`, the port must be the same as the one specified in `NEXT_PUBLIC_API_BASE_URL`
(in `client/.env.your_env.local.dist`)
- `yarn --cwd client/ dev`

You can now access the application at http://localhost:3000/login.\
The Next.JS server will act as a proxy for API requests to http://localhost:8000 to allow the auth cookie to be 'shared'
between the two origins even though they don't share a domain. It should not be an issue in production as both servers
should share a domain (e.g. the Next.JS app could be on https://example.com and the API on https://api.example.com and
`AUTH_COOKIES_DOMAIN` value could be `example.com`).
