# Delete a session

Delete a session.


## Definition

```
DELETE https://bnv.io/v1/sessions/{SESSION_ID}
```


## Authorization

This route is authenticated. The requesting user must be the owner of the account linked to the session.


## Parameters

### Path

| Parameter      | Description | Required | Default |
| :------------- | :---------- | :------- | :------ |
| `SESSION_ID`   | Identifier associated with the session | ✓ | |

### Query

*None*

### Body

*None*


## Examples

### Request

```sh
curl -X DELETE https://bnv.io/v1/sessions/j8tgy6bz1ynkmyc0 \
  -u bnv_example_key:
```

### Response

```json
null
```
