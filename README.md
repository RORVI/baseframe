# GraphQL & REST Backend Platform

A robust, testable, and extensible backend API project built with **Node.js**, **Express**, **GraphQL (Apollo Server)**, **Sequelize**, and **SQLite**. Initially designed as a coding challenge, the project evolved into a technical demonstration of scalable architecture, API best practices, and modern tooling integration.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Seed the Database
```bash
npm run db:reset
```

> Or to wipe everything clean and start fresh:
```bash
npm run db:nuke
```

### 3. Start the Application
```bash
npm start
```

Runs on: [http://localhost:3001](http://localhost:3001)

---

## 🧬 GraphQL

### Playground
GraphQL is served at:
```
http://localhost:3001/graphql
```

Supports both query and mutation operations, powered by Apollo Server Express. Includes custom error logging and middleware context injection (like `profile_id`).

### Voyager
GraphQL Voyager is available at:
```
http://localhost:3001/voyager
```

A powerful visual explorer for your GraphQL schema.

---

## 📘 REST API Documentation

Swagger UI available at:
```
http://localhost:3001/api-docs
```

### Generate Documentation
```bash
npm run generate:openapi
npm run generate:postman-collection
```
Docs are saved in `src/docs/`.

---

## 🧪 Tests
```bash
npm run test
npm run test:coverage
```

Coverage report lives in:
```
coverage/lcov-report/index.html
```

Full unit test coverage for:
- Profile, Contract, Job services
- Admin + Balance logic

---

## 📂 Project Structure
```
src/
├── controllers/        # REST route handlers
├── graphql/            # Modular GraphQL types + resolvers
│   ├── types/
│   ├── resolvers/
│   └── index.js
├── routes/             # REST route definitions
├── database/
│   ├── models/
│   ├── migrations/
│   └── seeders/
├── services/           # Business logic layer
├── middleware/         # Request context injection, logging, etc.
├── utils/              # Logger, helpers
├── docs/               # OpenAPI + Postman
└── tests/              # Jest unit/integration tests
```

---

## 🔧 Scripts
| Script                                | Description                                    |
| ------------------------------------- | ---------------------------------------------- |
| `npm start`                           | Start app with nodemon                         |
| `npm run db:migrate`                  | Run DB migrations                              |
| `npm run db:seed`                     | Seed DB with mock data                         |
| `npm run db:reset`                    | Reset and reseed DB                            |
| `npm run db:nuke`                     | Delete DB file and rebuild                     |
| `npm run generate:openapi`            | Generate OpenAPI docs                          |
| `npm run generate:postman-collection` | Convert OpenAPI to Postman                     |
| `npm run test`                        | Run all Jest tests                             |
| `npm run test:coverage`               | Generate test coverage report                  |

---

## 🛠 Stack
- Node.js 20+
- Express.js
- GraphQL (Apollo Server)
- Sequelize ORM + SQLite
- Swagger UI
- Jest + Supertest
- Winston Logger
- GraphQL Voyager

---

## ✅ Functional Highlights

### REST Endpoints
- `GET /contracts`
- `GET /contracts/:id`
- `GET /jobs/unpaid`
- `POST /jobs/:job_id/pay`
- `POST /balances/deposit/:userId`
- `GET /admin/best-profession`
- `GET /admin/best-clients`

### GraphQL API
- Full CRUD for Profile, Contract, Job
- Nested resolvers for relationships (e.g. jobs in contract)
- Modular schema definitions and scalars
- Custom error logging and profiling
- Schema visualizer with Voyager

---

## 🧠 Advanced Features
- Sequelize-managed DB transactions for monetary operations
- Authentication simulation via `profile_id` header
- Logging via Winston to `/src/logs`
- Swagger/OpenAPI + Postman auto-generation
- Scalable GraphQL structure with separate type & resolver modules

---

## ✅ TODO (Completed & Upcoming)
- [x] REST + GraphQL hybrid coexistence
- [x] Modular GraphQL schema design (type + resolver separation)
- [x] Full CRUD GraphQL operations
- [x] Logging for GraphQL layer
- [x] Voyager visualizer integration
- [ ] Integrate DataLoader for batching and caching
- [ ] Add input validation using GraphQL scalars or directives
- [ ] GraphQL subscriptions for real-time updates
- [ ] Role-based auth (client vs contractor)
- [ ] Auditing logs per mutation

---

## 🐳 Docker
```bash
docker build -t backend-api .
docker run -p 3001:3001 backend-api
```

Uses Alpine-based Node image for minimal footprint.

---

## 🤓 Final Thoughts
This project goes beyond the original scope to showcase real-world backend craftsmanship: modularity, testability, tooling integration, and API versatility.

Ready for battle.

---

Made with ☕ and persistence by [Ovidiu](https://github.com/ovidiuroman)
