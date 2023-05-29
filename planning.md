## Endpoints
GET https://www.ourapi.com/api/v1/stats/101 – This will get the stats for player 101
POST https://www.ourapi.com/api/v1/stats – This will create the stats a player
PUT https://www.ourapi.com/api/v1/stats/101 – This will update the stats for player 101
DELETE https://www.ourapi.com/api/v1/stats/101 – This will delete the stats for player 101

Each record will contain:
- an ID of the MLB player
- Total HomeRuns
- RBI
- OBP
- OPS

I will store entries in a JSON file to test. I will eventually incoporate a database.