# Get an scenario

Retrieve a scenario ("calculator") and associated actions.


## Definition

```
GET https://bnv.io/v1/scenarios/{SCENARIO_ID}
```


## Authorization

This route is authenticated.


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
curl https://bnv.io/v1/scenarios/j8tj6h3s1yen5bpm \
  -u bnv_example_key:
```

### Response

```json
{
  "id": "j8tj6h3s1yen5bpm",
  "title": "test 001",
  "description": null,
  "engine": "basic",
  "actions": [
    {
      "id": "j8tlhn9c1axghbmt",
      "scenarioId": "j8tj6h3s1yen5bpm",
      "title": "Take care of business",
      "description": null,
      "importance": "high",
      "sortOrder": 0
    }
  ],
  "prior": 0.45,
  "importanceWeights": {
    "low": 0.5,
    "medium": 1,
    "high": 2
  },
  "evidenceLevels": {
    "min": 0.4,
    "low": 0.45,
    "medium": 0.5,
    "high": 0.55,
    "max": 0.6
  },
  "timeCreated": "2017-10-15T19:34:00.426Z",
  "timeUpdated": "2017-10-16T01:58:30.426Z"
}
```
