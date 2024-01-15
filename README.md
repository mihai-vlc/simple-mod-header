# Simple mod header

Go to the extension options and set the declarative rules to be:

Allowed host permissions:

```json
["<all_urls>"]
```

Dynamic rules:

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
            "urlFilter": "*csv|"
        },
        "id": 1,
        "priority": 1
    }
]
```

## Development

```shell

npm install

# build dist folder
npm run build

# build dist folder in watch mode
npm run dev
```
