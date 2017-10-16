# Get an account

Retrieve an active account. Confirmed and non-confirmed accounts are accessible.


## Definition

```
GET https://bnv.io/v1/accounts/{ACCOUNT_ID}
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

*None*


## Examples

### Request

```sh
curl https://bnv.io/v1/accounts/j8t7622labi1p8wd \
  -u bnv_example_key:
```

### Response

```json
{
  "id": "j8t7622labi1p8wd",
  "name": "Elon Musk",
  "email": "elon@tesla.com",
  "isBuilder": false,
  "isManager": false,
  "timeConfirmed": "2017-10-09T05:04:00.000Z",
  "timeCreated": "2017-10-09T05:03:15.007Z",
  "timeSuspended": null
}
```
