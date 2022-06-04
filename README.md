# MT4 - Challenge

## Development

### Installation

#### Environment variables
```bash
cp ./database/.env.example ./database/.env.dev
```

#### Start the containers
````bash
docker-compose -f docker-compose.dev.yml up -d
````

#### Run the api
First go into your api container `docker exec -it api_challenge bash`.  
Install the dependencies `npm install` and run `npm run api` 

### Reset the database

#### Remove the database container
```bash
docker-compose -f docker-compose.dev.yml stop database
docker-compose -f docker-compose.dev.yml rm --force database
```

#### Remove the database volume folder
```bash
rm -rf ./database/dbms-data
```

#### Restart the database container
```bash
docker-compose -f docker-compose.dev.yml up -d database
```
