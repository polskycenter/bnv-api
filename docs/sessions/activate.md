# Activate a session

Activate a previously created session.


## Definition

```
GET https://bnv.io/v1/sessions/activations
```


## Authorization

*None*


## Parameters

### Path

*None*

### Query

| Parameter      | Description | Required | Default |
| :------------- | :---------- | :------- | :------ |
| `token`        | JSON web token encoded with activation information | ✓ | |

`token` is created by the API; API consumers cannot manually create tokens.

### Body

*None*


## Examples

### Request

```sh
curl https://bnv.io/v1/sessions/activations?token=eyJ.pZCI6k.eFT
```

### Response

```json
{
  "id": "j8tgy6bz1ynkmyc0",
  "accountId": "j8t7622labi1p8wd",
  "key": "bnv_example_key",
  "timeCreated": "2017-10-09T05:04:01.000Z",
  "timeUsed": null
}
```
