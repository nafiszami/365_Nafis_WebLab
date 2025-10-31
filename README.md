# Task Management API

**Qazi Ibnul Nafis**  
**Roll: 365**  
**Jahangirnagar University**  
**Department of Computer Science and Engineering**  
**3rd Year, 2nd Semester 2024**  
**CSE 362 – Web Programming II LAB**

---

## Project Overview

A lightweight **Node.js + Express** REST API that manages **5 tasks** with the following fields:

- `id` (Number)
- `title` (String)
- `completed` (Boolean)
- `priority` (`low` | `medium` | `high`)
- `createdAt` (JavaScript `Date` object)

All routes are cleanly separated using **Express Router**, include **robust error handling**, and are **fully tested with Postman**.

---

## Project Structure

```
task-management/
├── src/
│   ├── index.js              # Server entry point
│   └── routes/
│       └── tasks.js          # GET /tasks & /task/:id routes
├── package.json
├── .gitignore
├── README.md                 # This file
├── tasks-response.json       # Saved response from /tasks
└── api-responses.txt         # All Postman test results
```

---

## Setup & Run Instructions (Verified)

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd task-management

# 2. Install dependencies
npm install

# 3. Start the server
npm start
```

**Server runs at:** `http://localhost:3000`  
**Verified on:** Windows 11, Node.js v24.11.0, npm v10.8.1

---

## API Endpoints

| Method | Endpoint      | Description                      | Example Response                           |
|--------|---------------|----------------------------------|--------------------------------------------|
| GET    | `/`           | Home page                        | `"Task Management API is running!"`        |
| GET    | `/tasks`      | Returns 5 tasks with all fields  | See `tasks-response.json`                  |
| GET    | `/task/:id`   | Get a single task by ID          | Task object or error                       |
| GET    | `/health`     | Health check with server uptime  | `{ "status": "healthy", "uptime": 123.45 }`|

---

## `/task/:id` – Error Handling

| Input Example | Status Code | Response                           |
|---------------|-------------|------------------------------------|
| `/task/1`     | 200         | Task object                        |
| `/task/999`   | 404         | `{ "error": "Task not found" }`    |
| `/task/abc`   | 400         | `{ "error": "Invalid ID format" }` |
| `/task/-5`    | 400         | `{ "error": "Invalid ID format" }` |

---

## Testing with Postman

1. **Start the server:**
   ```bash
   npm start
   ```

2. **Test each endpoint:**
   - `GET /tasks` → Save response → `tasks-response.json`
   - `GET /task/1`, `GET /task/999`, `GET /task/abc`, `GET /health`

**All responses are documented in:** `api-responses.txt`

---

## Git & Branching

```bash
git checkout features/routes
```

- `.gitignore` excludes: `node_modules/`, `.env`, logs, OS files
- **Clean commit history:**
  - `chore: initial setup + .gitignore`
  - `refactor: move routes to src/routes/tasks.js`
  - `feat: add error handling for invalid IDs`
  - `docs: add README with full lab documentation`

---

## Deliverables (All Included)

| File                    | Purpose                                    |
|-------------------------|--------------------------------------------|
| `tasks-response.json`   | Saved output of GET `/tasks`               |
| `api-responses.txt`     | Full Postman test results                  |
| `README.md`             | Complete project documentation             |
| `src/routes/tasks.js`   | Router with 400 & 404 error handling       |
| `.gitignore`            | Excludes unnecessary files                 |

---

## Troubleshooting

| Issue                          | Solution                              |
|--------------------------------|---------------------------------------|
| Cannot find module 'express'   | Run `npm install`                     |
| Permission denied on `.git`    | Run PowerShell as Administrator       |
| Server not starting            | Check console for errors              |

---
## License

This project is for educational purposes as part of CSE 362 coursework.