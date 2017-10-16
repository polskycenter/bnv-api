# Create a new scenario

Create a new scenario ("calculator"). A confirmation email is automatically sent to the given email address.


## Definition

```
POST https://bnv.io/v1/scenarios
```


## Authorization

This route is authenticated. The requesting user must have the `Builder` permission.


## Parameters

### Path

*None*

### Query

*None*

### Body

| Parameter                  | Description | Required | Default |
| :------------------------- | :---------- | :------- | :------ |
| `description`              | Descriptive information about the scenario | | |
| `engine`                   | Compute engine slug supporting this calculator; one of: `basic` | | `basic` |
| `evidenceLevels.min`       | Lowest evidence probability (between 0 and 1, inclusive) | ✓ | |
| `evidenceLevels.low`       | Low evidence probability (between 0 and 1, inclusive; higher than `min`) | ✓ | |
| `evidenceLevels.medium`    | Medium evidence probability (between 0 and 1, inclusive; higher than `low`) | ✓ | |
| `evidenceLevels.high`      | High evidence probability (between 0 and 1, inclusive; higher than `medium`) | ✓ | |
| `evidenceLevels.max`       | Highest evidence probability (between 0 and 1, inclusive; higher than `high`) | ✓ | |
| `importanceWeights.low`    | Weighting factor for low importance actions (0+) | ✓ | |
| `importanceWeights.medium` | Weighting factor for medium importance actions (0+, higher than `medium`) | ✓ | |
| `importanceWeights.high`   | Weighting factor for high importance actions (0+, higher than `high`) | ✓ | |
| `prior`                    | Result probability before evidence taken into account | ✓ | |
| `title`                    | Title of the scenario | ✓ | |


## Examples

### Request

```sh
curl -X POST https://bnv.io/v1/scenarios \
  -u bnv_example_key: \
  -H 'Content-type: application/json' \
  -d '{"title":"test 001", "prior":0.45, "importanceWeights":{"low":0.5,"medium":1,"high":2}, "evidenceLevels":{"min":0.4,"low":0.45,"medium":0.5,"high":0.55,"max":0.6}}'
```

### Response

```json
{
  "id": "j8tj6h3s1yen5bpm",
  "title": "Good calculator",
  "description": null,
  "engine": "basic",
  "actions": [],
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
  "timeUpdated": "2017-10-15T19:34:00.426Z"
}
```
