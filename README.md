# MT4 - Challenge

## Installation

### Development
```bash
cp ./database/.env.example ./database/.env.dev

docker-compose -f docker-compose.dev.yml up -d

docker exec -it api_challenge bash

npm install

npm run api
```
