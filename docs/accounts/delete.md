# Delete an account

Delete (inactivate) an account.


## Definition

```
DELETE https://bnv.io/v1/accounts/{ACCOUNT_ID}
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
curl -X DELETE https://bnv.io/v1/accounts/j8t7622labi1p8wd \
  -u bnv_example_key:
```

### Response

```json
null
```
