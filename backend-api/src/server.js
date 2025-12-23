const app = require("./app");
const { checkDb } = require("./db");

const port = process.env.PORT || 4000;

(async () => {
  try {
    await checkDb();
    app.listen(port, () => {
      console.log(`API running on http://localhost:${port}`);
    });
  } catch (e) {
    console.error("Failed to start server (DB connect error):", e.message);
    process.exit(1);
  }
})();
