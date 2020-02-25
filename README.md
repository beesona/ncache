# nCache
nCache- A simple caching example using Containerized Node and Redis

### Dependencies to run locally
- NodeJS 12.16.1
- Typescript 3.8.2
- Docker 19.0.3.1

### Running Locally
```
git clone https://github.com/beesona/ncache.git
cd ncache
npm install
// NOTE: In the 2 managers, change the redis hosts from 'redis' to '127.0.0.1' (Later version will use env variables)
// If you have a running DockerNAT, you will have to use the NAT IP instead of localhost
docker container run --name=redis-1 -p 6379:6379 redis
npm start
```
- Navigate to your DockerNAT ip (or localhost if you don't have a DockerNAT) and port 3000 to access the page. (eg. 10.17.0.63:3000)
- Any src changes will need to stop the express server (CTRL+C) and rerun ```npm start```

### Deploying Containers and Running
```
// NOTE: In the 2 managers, ensure the redis hosts are 'redis' (Later version will use env variables)
cd <project-root-dir>
docker-compose up
```
- Navigate to your DockerNAT ip (or localhost if you don't have a DockerNAT) and port 3000 to access the page. (eg. 10.17.0.63:3000)
- Any changes will require the following (ran from the project root)
```
docker-compose down --rmi local
tsc
docker-compose up
```

### Using the application
There are two endpoints (currently) available for caching data.
1. /getdatabyid/{id}
  - use this endpoint to get account demographic data.
  - Example: **http://localhost:3000/getdatabyid/123456789**
2. /getdatabyurl/{uriEncodedUrl}
  - use this endpoint to cache and return any data serialized from the provided URL.
  - Example: **http://localhost:3000/getdatabyurl/http%3A%2F%2Fdev.intsvc.nelnet.net%2FHistoryNote%2Fapi%2Fv1%2Fhistorynotes%2F99%2F1%2F003823158%2Fabeeson%3FrequestId%3D5302fe94-7596-41f6-84a8-2977f5c3eecf**
