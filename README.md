# StatusPage for WisniowaSU Services

[![Netlify Status](https://api.netlify.com/api/v1/badges/3ccca4a9-e4e2-416f-8467-044fa25c9f8b/deploy-status)](https://app.netlify.com/sites/wisniowastatus/deploys)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/d40bf80f9df443daaf49ad417e7f49a3)](https://www.codacy.com/manual/fastfend/status-wisniowasu?utm_source=github.com&utm_medium=referral&utm_content=fastfend/status-wisniowasu&utm_campaign=Badge_Grade)
[![HitCount](http://hits.dwyl.com/fastfend/status-wisniowasu.svg)](http://hits.dwyl.com/fastfend/status-wisniowasu)
[Demo Page](https://status.wisniowasu.pl/)

![Strona](https://github.com/fastfend/status-wisniowasu/raw/master/github/image.jpg)

## Benefits

- Static page, so no backend requried
- You can host it anywhere you want eg. Netlify
- Proffesional design
- Status categories

## Requirements

- UptimeRobot account and readonly API key
- Static page hosting eg. Netlify

## Usage

1. Setup hosting
2. Get your API key from UptimeRobot
3. In file monitors.json replace "api_key"
4. For each monitor you must get it's ID

### monitor.json template

```json
{
  "api_key": "YOUR_API_KEY",
  "monitors": [
    {
      "type": "standalone",
      "id": "YOUR_MONITOR_ID",
      "title": "Single status element title",
      "subtitle": "Single status element subtitle"
    },
    {
      "type": "group",
      "title": "Group status element title",
      "monitors": [
        {
          "id": "YOUR_MONITOR_ID",
          "title": "Single substatus element title"
        },
        {
          "id": "YOUR_MONITOR_ID",
          "title": "Single substatus element title"
        },
        {
          "id": "YOUR_MONITOR_ID",
          "title": "Single substatus element title"
        }
      ]
    }
  ]
}
```

## How to get Monitor ID

Click desired monitor on your UptimeRobot Dashboard
and your ID sholud be in browser URL like:

<https://uptimerobot.com/dashboard#>YOUR_MONITOR_ID
