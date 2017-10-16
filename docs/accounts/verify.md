# Verify an account

Verify an active account and create the first session.


## Definition

```
GET https://bnv.io/v1/accounts/verifications
```


## Authorization

*None*


## Parameters

### Path

*None*

### Query

| Parameter      | Description | Required | Default |
| :------------- | :---------- | :------- | :------ |
| `token`        | JSON web token encoded with verification information | ✓ | |

`token` is created by the API; API consumers cannot manually create tokens.

### Body

*None*


## Examples

### Request

```sh
curl https://bnv.io/v1/accounts/verifications?token=eyJ.pZCI6k.eFT
```

### Response

```json
{
  "id": "j8t9c9z824rp3z9b",
  "accountId": "j8t7622labi1p8wd",
  "key": "bnv_example_key",
  "timeCreated": "2017-10-09T05:04:01.000Z",
  "timeUsed": null
}
```
