# nCache
nCache- A simple caching example using Containerized Node and Redis

### Dependencies to run locally
- NodeJS 12.16.1
- Typescript 3.8.2
- Docker 19.0.3.1

### Running Locally
**Note**: If using Docker Desktop for Windows, make sure you are pointing to Linux Containers.
```
git clone https://github.com/beesona/ncache.git
cd ncache
npm install
docker container run --name=redis-1 -p 6379:6379 redis
npm start
```
- Navigate to localhost:3000 to access the page.
- Any src changes will need to stop the express server (CTRL+C) and rerun ```npm start```

### Deploying Containers and Running
**Note**: If using Docker Desktop for Windows, make sure you are pointing to Linux Containers.
```
cd <project-root-dir>
docker-compose up
```
- Navigate to localhost:3030 to access the page. (**NOTE**: The docker-compose.yml points the node app to 3030 instead of 3000)
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
