# Create an account

Create a new account. A confirmation email is automatically sent to the given email address.


## Definition

```
POST https://bnv.io/v1/accounts
```


## Authorization

This route is authenticated. The requesting user must have the `Manager` permission.


## Parameters

### Path

*None*

### Query

*None*

### Body

| Parameter      | Description | Required | Default |
| :------------- | :---------- | :------- | :------ |
| `email`        | Email address for the new account | ✓ | |
| `exchangeUrl`  | Scheme, authority, and path for session token exchange | | |
| `isBuilder`    | Add the `Builder` permission to the account | | `false` |
| `isManager`    | Add the `Manager` permission to the account | | `false` |
| `name`         | Given and family name of the account holder | ✓ | |


## Examples

### Request

```sh
curl -X POST https://bnv.io/v1/accounts \
  -u bnv_example_key: \
  -H 'Content-type: application/json' \
  -d '{"email":"elon@tesla.com", "name":"Elon Musk"}'
```

### Response

```json
{
  "id": "j8t7622labi1p8wd",
  "name": "Elon Musk",
  "email": "elon@tesla.com",
  "isBuilder": false,
  "isManager": false,
  "timeConfirmed": null,
  "timeCreated": "2017-10-09T05:03:15.007Z",
  "timeSuspended": null
}
```
