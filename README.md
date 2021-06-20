bnv-api
=======

Building the New Venture Calculators: RESTful HTTP API


## Getting started

### Prerequisites

- [AWS SES](https://aws.amazon.com/ses/) and associated IAM credentials
- [SQLite3](https://www.sqlite.org/index.html)
- [Node.js 14.x+](https://nodejs.org/en/download/)

### Install

First, set environment parameters for the following:

| Variable                | Description |
| :---------------------- | :------------- |
| `BNV__AWS_KEYID`        | AWS Key ID for use with SES |
| `BNV__AWS_SECRET`       | AWS Secret Access Key associated with the Key ID |
| `BNV__AWS_SES_EMAIL`    | Email address authorized to send sign-in and account confirmation emails |
| `BNV__ENVIRONMENT`      | `production`, `test`, or `dev` |
| `BNV__HOST_API`         | The scheme and authority hosting the BNV web API |
| `BNV__HOST_CLIENT`      | The scheme and authority hosting the BNV web client |
| `BNV__SECRET`           | Cryptographically-strong string used to sign JWT tokens |
| `BNV__SQLITES`          | Path to SQLite3 database file |
| `NODE_ENV`              | `production` or any other string; `production` squelches debug logging |

Clone the repository:

```sh
git clone git@github.com:polskycenter/bnv-api.git
```

Move into the repository and install dependencies:

```sh
cd bnv-api
npm install
```

Run migrations in `./etc/database`. The current setup script, `2.0.0.js`, creates the first user account with all permissions enabled so that all future users can be created by the API itself. Update the parameters found in that script (e.g. `email`) as appropriate prior to execution.

```sh
node ./etc/database/2.0.0.js
```

Finally, start the service:

```sh
node index
```


## API

### Introduction

The API provides access to account, scenario, and session resources used by the Building the New Venture client application. This API is built upon concepts commonly described as representational state transfer (REST) over HTTP with JSON as the data format.

This API does **not** provide [Transport Layer Security](https://en.wikipedia.org/wiki/Transport_Layer_Security). Deployments are expected to run this API behind an Infrastructure-as-a-Service load balancer (such as an [AWS ALB](http://docs.aws.amazon.com/elasticloadbalancing/latest/application/introduction.html)) or a reverse proxy (such as [Nginx](https://nginx.org)) that can enforce symmetric encryption.

### Authentication

The API authenticates most requests using session "keys". An API consumer first creates a key by providing an email address. Once activated, API requests send the key via [HTTP Basic Auth](https://en.wikipedia.org/wiki/Basic_access_authentication). Provide the API key as the HTTP Basic Auth `username`; no `password` is required.

A given account cannot have more then two active keys. Keys are intended to be kept secret; never share a key in a public setting or over an insecure network.

### Permissions

By default, all active accounts have "read" access to scenarios (also called "calculators"). In addition, accounts can be granted the following permissions:

- `Builder`: Can create, delete, and modify scenarios
- `Manager`: Can create, delete, modify, and view all accounts

### Token exchange

User accounts do not require a password to create a session. Instead, the user activates their account and all sessions by clicking a link sent via email.

By default, emailed links are resolved directly by the API. This is useful for a developer who wants access to the newly-created, raw authentication key. However, when integrating the API with a web-based application, it is useful to save the key inside a client-session store (e.g. cookies). For this reason, both the account activation and session creation routes offer an optional `exchangeUrl` parameter. When `exchangeUrl` is used, the link sent in the email will instead point to the `exchangeUrl` with an additional `token` query parameter &ndash; rather than the API itself. The `exchangeUrl` is expected to retrieve that `token` parameter and send it to the appropriate API route on behalf of the user. Thus, the client application itself receives the newly-created, raw authentication key. To prevent key leakage to arbitrary endpoints, the `exchangeUrl` must be hosted on the same domain as `BNV__HOST_CLIENT`.

### Response Codes

| Code  | Description |
| :---- | :---------- |
| `200` | The request succeeded; a representation of the resource may be provided in the response |
| `201` | The request succeeded and a resource was modified; a representation may be provided in the response body |
| `301` | Permanent redirect |
| `302` | Temporary redirect |
| `304` | The request was valid but the underlying resource was not modified; additional information may be provided in the response body |
| `400` | Invalid request; missing or incorrectly formatted parameters |
| `401` | Unauthorized; invalid, missing, or expired authorization key |
| `403` | Forbidden; the requester does not have access to the underlying resource |
| `404` | Not found; the requested resource does not exist, cannot be located, or is not within the authorization scope |
| `409` | Conflict; the resource cannot be modified due to a state-based restriction |
| `410` | Gone; the resource cannot be accessed or modified because it has been inactivated, terminated, or removed |
| `422` | Bad request; correctly formatted but invalid parameters |
| `429` | Request rate limit exceeded; wait and try again |
| `500` | Processing error; notify `help@bnv.io` |
| `502` | Infrastructure error; notify `help@bnv.io` |
| `503` | Service unavailable; internal latency spike, expected to heal automatically |
| `504` | Infrastructure error; notify `help@bnv.io` |

### Resources

**Accounts**

- [`create`](./docs/accounts/create.md)
- [`delete`](./docs/accounts/delete.md)
- [`get`](./docs/accounts/get.md)
- [`list`](./docs/accounts/list.md)
- [`update`](./docs/accounts/update.md)
- [`verify`](./docs/accounts/verify.md)

**Scenarios**

- [`create`](./docs/scenarios/create.md)
- [`delete`](./docs/scenarios/delete.md)
- [`get`](./docs/scenarios/get.md)
- [`list`](./docs/scenarios/list.md)
- [`update`](./docs/scenarios/update.md)
- Actions
    - [`delete`](./docs/scenarios/actions/delete.md)
    - [`post`](./docs/scenarios/actions/post.md)
    - [`update`](./docs/scenarios/actions/update.md)

**Sessions**

- [`activate`](./docs/sessions/activate.md)
- [`create`](./docs/sessions/create.md)
- [`delete`](./docs/sessions/delete.md)
- [`list`](./docs/sessions/list.md)


## Development

To start the API in development mode, shell into the project directory and run:

```sh
npm run dev
```

### Debug

The [debug](https://www.npmjs.com/package/debug) module provides runtime logging. Omit the `DEBUG` environment variable to squelch all logging. Set `DEBUG` to the desired resource (e.g. `DEBUG=@polskycenter/bnv-api:[resource:...]`) to restrict logging to specific events. Or, use `DEBUG=*` to get all debug output from everywhere, including dependencies.

```sh
DEBUG=@polskycenter/bnv-api* node index
```

### Tests

To run all available tests:

```sh
npm test
```

### AWS SES IAM policy

Emails sent by the API via SES require the underlying IAM user to have a policy that allows the `ses:SendEmail` permission for the email address specified in the environment configuration:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "EnableSES",
      "Effect": "Allow",
      "Resource": "arn:aws:ses:us-east-1:ACCOUNT_ID:identity/BNV__AWS_SES_EMAIL",
      "Action": ["ses:SendEmail"],
      "Condition": {
        "StringEquals": {
          "ses:FromAddress": "BNV__AWS_SES_EMAIL"
        }
      }
    }
  ]
}
```

### Versioning

This project follows [semantic versioning](http://semver.org/).

### Deployment

For process and log management, consider [PM2](http://pm2.keymetrics.io/).

### Contribute

PRs are welcome! PRs must pass tests prior to merge. For bugs, please include a failing test which passes when your PR is applied. To enable a git hook that runs `npm test` prior to pushing, `cd` into your repo and run:

```sh
touch .git/hooks/pre-push
chmod +x .git/hooks/pre-push
echo "npm test" > .git/hooks/pre-push
```


## License

- This project is licensed under the [ISC License](./LICENSE)
