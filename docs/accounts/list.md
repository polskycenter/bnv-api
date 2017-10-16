# List all accounts

List all active accounts. All confirmed and non-confirmed accounts are provided. Accounts are sorted by email address in ascending order.


## Definition

```
GET https://bnv.io/v1/accounts
```


## Authorization

This route is authenticated. The requesting user must have the `Manager` permission.


## Parameters

### Path

*None*

### Query

| Parameter      | Description | Required | Default |
| :------------- | :---------- | :------- | :------ |
| `limit`   | Number of accounts to return |  | `30` |
| `offset`   | Number used as cursor for pagination |   | |

### Body

*None*


## Examples

### Request

```sh
curl https://bnv.io/v1/accounts \
  -u bnv_example_key:
```

### Response

```json
[
  {
    "id": "j8t7622labi1p8wd",
    "name": "Elon Musk",
    "email": "elon@tesla.com",
    "isBuilder": false,
    "isManager": false,
    "timeConfirmed": "2017-10-09T05:04:00.000Z",
    "timeCreated": "2017-10-09T05:03:15.007Z",
    "timeSuspended": null
  },
  {
    "id": "j8s1zxt8h2t73ydd",
    "name": "Oprah Winfrey",
    "email": "oprah@o.com",
    "isBuilder": true,
    "isManager": false,
    "timeConfirmed": "2017-10-02T05:04:00.000Z",
    "timeCreated": "2017-10-01T05:03:15.007Z",
    "timeSuspended": null
  }
]
```
