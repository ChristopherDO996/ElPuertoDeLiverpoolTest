# Technic test for El Puerto de Liverpool

This is a CRUD web application to manage store orders I built for a technical assessment for El Puerto de Liverpool.

## Local Environment Setup

### Prerequisites

- Docker

### Running the Application

1. Clone the repository:

```bash
git clone https://github.com/ChristopherDO996/ElPuertoDeLiverpoolTest.git
cd ElPuertoDeLiverpoolTest
```

2. Build project

```bash
docker-compose up --build -d
```

3. Verify containers:

```bash
docker-compose ps
```

## Architecture and Design

Dockerized monorepo architecture with three services:

- **backend**: Java 17 / Spring Boot 3 REST API with an MVC architecture.
- **frontend**: React 18 single-page application built using Bootstrap 5.
- **database**: MongoDB 6 document database

## Application Endpoints

- Frontend Dashboard: [http://localhost](http://localhost)
- Swagger API Documentation: [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)
- REST API: [http://localhost:8080/api/orders](http://localhost:8080/api/orders)
- MongoDB: [mongodb://localhost:27017](mongodb://localhost:27017)

## Author

- [Christopher Díaz Osorio](https://github.com/ChristopherDO996)
