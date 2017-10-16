# Create an action within a scenario

Create a new scenario action.


## Definition

```
POST https://bnv.io/v1/scenarios/{SCENARIO_ID}/actions
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

| Parameter      | Description | Required | Default |
| :------------- | :---------- | :------- | :------ |
| `description`  | Descriptive information about the action | | |
| `importance`   | Weighting level to apply to evidence; one of: `low`, `medium`, or `high` | | |
| `sortOrder`    | Order this action should appear when listed within the scenario | | `false` |
| `title`        | Title of the action | ✓ | |


## Examples

### Request

```sh
curl -X POST 'https://bnv.io/api/scenarios/j8tj6h3s1yen5bpm/actions' \
  -u bnv_example_key: \
  -H 'Content-type: application/json' \
  -d '{"title":"Take care of business", "importance":"high", "sortOrder":0}'
```

### Response

```json
{
  "id": "j8tlhn9c1axghbmt",
  "scenarioId": "j8tj6h3s1yen5bpm",
  "title": "Take care of business",
  "description": null,
  "importance": "high",
  "sortOrder": 0
}
```
