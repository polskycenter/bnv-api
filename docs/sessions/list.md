# List sessions

List all active sessions associated with the requesting account. All confirmed and non-confirmed sessions are provided. Sessions are sorted by time created in descending order.


## Definition

```
GET https://bnv.io/v1/sessions
```


## Authorization

This route is authenticated. The response includes only sessions associated with the authenticated account.


## Parameters

### Path

*None*

### Query

*None*

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
    "id": "j8tgy6bz1ynkmyc0",
    "accountId": "j8t7622labi1p8wd",
    "key": "bnv_example_key",
    "timeCreated": "2017-10-09T05:04:01.000Z",
    "timeUsed": "2017-10-07T21:26:44.820Z"
  },
  {
    "id": "j8s8zb4s6r4w2egh",
    "accountId": "j8t7622labi1p8wd",
    "key": "bnv_other_key",
    "timeCreated": "2017-10-01T04:25:13.756Z",
    "timeUsed": "2017-10-02T21:22:50.747Z"
  }
]
```
