Make sure your pc has docker and docker compose installed.

Step 1. cd production

Step 2. docker compose -p jwt up -d

Step 3. cd jwt-backend

Step 4. npx sequelize-cli db:migrate

4.1 change column id to postID in table Post

Step 5. Add data to database in file decentralization-database

Step 6. create connection in DBeaver

DB_HOST=localhost
DB_DATABASE_NAME=decentralization
DB_USERNAME=root
DB_PASSWORD=123456
DB_PORT=3306

Step 7. open http://localhost/

Link demo: http://14.225.211.71/
