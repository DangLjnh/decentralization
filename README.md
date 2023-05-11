Make sure your pc has docker and docker compose installed.

Step 1. cd production
Step 2. docker compose -p jwt up -d
Step 3. cd jwt-backend
Step 4. npx sequelize-cli db:migrate
Step 5. Add data to database by create connection in DBeaver
Step 6. Create connection
DB_HOST=localhost
DB_DATABASE_NAME=decentralization
DB_USERNAME=root
DB_PASSWORD=123456
DB_PORT=3309

Step 7. open http://localhost:3000/
