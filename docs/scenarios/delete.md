# Delete a scenario

Delete a scenario.


## Definition

```
DELETE https://bnv.io/v1/scenarios/{SCENARIO_ID}
```


## Authorization

This route is authenticated. The requesting user must have the `Builder` permission.


## Parameters

### Path

| Parameter      | Description | Required | Default |
| :------------- | :---------- | :------- | :------ |
| `SCENARIO_ID`  | Identifier associated with the scenario | ✓ | |

### Query

*None*

### Body

*None*


## Examples

### Request

```sh
curl -X DELETE https://bnv.io/v1/scenarios/j8tj6h3s1yen5bpm \
  -u bnv_example_key:
```

### Response

```json
null
```
