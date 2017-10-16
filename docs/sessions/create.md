# Create a session

Create a new session. An activation email is automatically sent to the email address associated with the target account.


## Definition

```
POST https://bnv.io/v1/session
```


## Authorization

This route is not authenticated.


## Parameters

### Path

*None*

### Query

*None*

### Body

| Parameter      | Description | Required | Default |
| :------------- | :---------- | :------- | :------ |
| `email`        | Email address associated with the account | ✓ | |
| `exchangeUrl`  | Scheme, authority, and path for session token exchange | | |


## Examples

### Request

```sh
curl -X POST https://bnv.io/v1/sessions \
  -H 'Content-type: application/json' \
  -d '{"email":"elon@tesla.com"}'
```

### Response

```json
{
  "id": "j8tgy6bz1ynkmyc0",
  "email": "elon@tesla.com"
}
```
