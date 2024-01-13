# Simple mod header

Go to the extension options and set the declarative rules to be:

```json
[
    {
        "action": {
            "responseHeaders": [
                {
                    "header": "content-type",
                    "operation": "set",
                    "value": "text/plain"
                }
            ],
            "type": "modifyHeaders"
        },
        "condition": {
            "resourceTypes": ["main_frame"],
            "urlFilter": "*csv"
        },
        "id": 1,
        "priority": 1
    }
]
```
