# Update a scenario action

Update a scenario action. Updates are expressed using [JSON Patch](https://tools.ietf.org/html/rfc6902).


## Definition

```
PATCH https://bnv.io/v1/scenarios/{SCENARIO_ID}/actions/{ACTION_ID}
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

The body is expected to be one or more JSON patches that modify the following:

- `description`: Descriptive information about the action
- `importance`: Weighting level to apply to evidence; one of: `low`, `medium`, or `high`
- `sortOrder`: Order this action should appear when listed within the scenario
- `title`: Title of the action


## Examples

### Request

```sh
curl -X PATCH https://bnv.io/api/scenarios/j8tj6h3s1yen5bpm/actions/j8tlhn9c1axghbmt \
  -u bnv_example_key: \
  -H 'Content-type: application/json' \
  -d '[{"op":"replace", "path":"/title", "value":"Taking better care of business"}]'
```

### Response

```json
{
  "id": "j8tlhn9c1axghbmt",
  "scenarioId": "j8tj6h3s1yen5bpm",
  "title": "Taking better care of business",
  "description": null,
  "importance": "high",
  "sortOrder": 0
}
```
