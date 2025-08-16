import app from "@/app";
import { ENV } from "@/config/env";
import { db } from "@/config/database";

const server = app.listen(ENV.PORT, () => {
  console.log(`Server running on port ${ENV.PORT} in ${ENV.NODE_ENV} mode`);
});

// Graceful shutdown handler
const shutdown = async () => {
  console.log("Shutdown signal received");

  // Add connection draining
  app.disable("connection"); // Stop accepting new connections

  server.close(async () => {
    console.log("HTTP server closed");

    try {
      console.log("Database connections closed");

      process.exit(0);
    } catch (err) {
      console.log("Error during shutdown:", err);
      process.exit(1);
    }
  });

  // Force shutdown after 30 seconds
  setTimeout(() => {
    console.log(
      "Could not close connections in time, forcefully shutting down",
    );
    process.exit(1);
  }, 30000);
};

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);

export default server;
