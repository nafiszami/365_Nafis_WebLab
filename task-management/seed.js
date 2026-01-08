const db = require('./src/config/db'); // adjust path if needed


const tasks = [
  { title: "Setup Node.js Project", description: "Initialize folder, install npm", status: "completed" },
  { title: "Install Express.js", description: "Install express and setup server.js", status: "completed" },
  { title: "Create Tasks Routes", description: "Add basic CRUD routes", status: "pending" },
  { title: "Connect to MySQL Database", description: "Add mysql2 pool connection", status: "completed" },
  { title: "Implement POST /tasks", description: "Insert tasks into database", status: "pending" },
  { title: "Implement GET /tasks", description: "Fetch tasks list", status: "pending" },
  { title: "Add Pagination", description: "Add page and limit query parameters", status: "pending" },
  { title: "Add Search by Title", description: "Enable SQL LIKE search", status: "pending" },
  { title: "Implement Soft Delete", description: "Add deleted_at column and logic", status: "pending" },
  { title: "Create Deleted Tasks Route", description: "GET /tasks/deleted", status: "pending" },
  { title: "Add Restore Task Feature", description: "PUT /tasks/:id/restore", status: "pending" },
  { title: "Write Seed Script", description: "Insert sample tasks", status: "completed" },
  { title: "Configure Winston Logging", description: "Log database errors", status: "pending" },
  { title: "Test API in Postman", description: "CRUD + pagination + search", status: "pending" },
  { title: "Prepare LAB 3 Submission", description: "Take screenshots and upload", status: "pending" }
];

async function seed() {
  try {
    console.log("Checking existing tasks...");

    const [existing] = await db.query("SELECT COUNT(*) AS count FROM tasks");
    if (existing[0].count > 0) {
      console.log("❌ Tasks already exist. Skipping seeding.");
      process.exit(0);
    }

    console.log("Seeding tasks into database...");

    for (const t of tasks) {
      await db.query(
        "INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)",
        [t.title, t.description, t.status]
      );
    }

    console.log("✅ Seeding completed successfully!");
    process.exit(0);

  } catch (err) {
    console.error("❌ Error seeding database:", err);
    process.exit(1);
  }
}

seed();
