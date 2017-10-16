# Update an account

Update an active account. Updates are expressed using [JSON Patch](https://tools.ietf.org/html/rfc6902).


## Definition

```
PATCH https://bnv.io/v1/accounts/{ACCOUNT_ID}
```


## Authorization

This route is authenticated. The requesting user must be the account owner or have the `Manager` permission.


## Parameters

### Path

| Parameter      | Description | Required | Default |
| :------------- | :---------- | :------- | :------ |
| `ACCOUNT_ID`   | Identifier associated with the account | ✓ | |

### Query

*None*

### Body

The body is expected to be one or more JSON patches.

Account owners can modify the following:

- `name`: Given and family name of the account holder

A `Manager` can modify the following:

- `isBuilder`: Boolean indicator for the `Builder` permission on the account
- `isManager`: Boolean indicator for the `Manager` permission on the account
- `name`: Given and family name of the account holder


## Examples

### Request

```sh
curl -X PATCH https://bnv.io/v1/accounts/j8t7622labi1p8wd \
  -u bnv_example_key: \
  -H 'Content-type: application/json' \
  -d '[{"op":"replace", "path":"/name", "value":"Elon Reeve Musk"}]'
```

### Response

```json
{
  "id": "j8t7622labi1p8wd",
  "name": "Elon Reeve Musk",
  "email": "elon@tesla.com",
  "isBuilder": false,
  "isManager": false,
  "timeConfirmed": null,
  "timeCreated": "2017-10-09T05:03:15.007Z",
  "timeSuspended": null
}
```
