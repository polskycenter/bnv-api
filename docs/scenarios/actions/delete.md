# Delete a scenario action

Delete a scenario action.


## Definition

```
DELETE https://bnv.io/v1/scenarios/{SCENARIO_ID}/actions/{ACTION_ID}
```


## Authorization

This route is authenticated. The requesting user must have the `Builder` permission.


## Parameters

### Path

| Parameter      | Description | Required | Default |
| :------------- | :---------- | :------- | :------ |
| `SCENARIO_ID`  | Identifier associated with the scenario | ✓ | |
| `ACTION_ID`    | Identifier associated with the action | ✓ | |

### Query

*None*

### Body

*None*


## Examples

### Request

```sh
curl -X DELETE https://bnv.io/api/scenarios/j8tj6h3s1yen5bpm/actions/j8tlhn9c1axghbmt \
  -u bnv_example_key:
```

### Response

```json
null
```
