## Prerequisites
**Node.js**: Ensure you have Node.js installed (version 16 or above is recommended).

**PostgreSQL Database:** The project uses ElephantSQL for hosting a PostgreSQL database. Sign up and create a free PostgreSQL instance.

**Environment Variables:** Configure your .env file with your database credentials.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Environment Variables
Create a .env file in the root directory and add the following values:

```bash
DB_HOST= # Your PostgreSQL host (provided by ElephantSQL)
DB_PORT=5432 # Default PostgreSQL port
DB_USERNAME= # Your database username
DB_PASSWORD= # Your database password
DB_NAME= # Your database name
```
Replace the placeholders with your actual database credentials from ElephantSQL.




