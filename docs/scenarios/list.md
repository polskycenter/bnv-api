# List all scenarios

List all scenarios. Scenarios are sorted by title in ascending order.


## Definition

```
GET https://bnv.io/v1/scenarios
```


## Authorization

This route is authenticated.


## Parameters

### Path

*None*

### Query

| Parameter      | Description | Required | Default |
| :------------- | :---------- | :------- | :------ |
| `limit`   | Number of scenarios to return |  | `30` |
| `offset`   | Number used as cursor for pagination |   | |

### Body

*None*


## Examples

### Request

```sh
curl https://bnv.io/v1/scenarios \
  -u bnv_example_key:
```

### Response

```json
[
  {
    "id": "j8tj6h3s1yen5bpm",
    "title": "Good calculator",
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
  },
  {
    "id": "j8tj6h3s1yen5bpm",
    "title": "Another calculator",
    "description": null,
    "engine": "basic",
    "actions": [],
    "prior": 0.5,
    "importanceWeights": {
      "low": 0.5,
      "medium": 1,
      "high": 2
    },
    "evidenceLevels": {
      "min": 0.42,
      "low": 0.47,
      "medium": 0.5,
      "high": 0.58,
      "max": 0.61
    },
    "timeCreated": "2017-10-01T01:00:00.426Z",
    "timeUpdated": "2017-10-02T01:00:00.000Z"
  }
]
```
