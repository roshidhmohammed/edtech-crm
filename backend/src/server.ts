import app from "./app";
import { db } from "./prisma/db";
import env from "./config/env";

const PORT = Number(env.PORT) ;

type HttpServer = ReturnType<typeof app.listen>;

let server: HttpServer | undefined;
let shuttingDown = false;

async function main(): Promise<void> {
  try {
    // Verify the database connection
    const select = db.raw.sql`SELECT 1 AS ok`
      .returnsRow({ ok: "pg/int4@1" })
      .build();

    await db.query(select);

    console.log("Database connection successful");

    // Start the HTTP server only after the database is ready
    server = app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

    server.on("error", (error) => {
      console.error("HTTP server error:", error);
      process.exitCode = 1;
    });
  } catch (error) {
    console.error("Application startup failed:", error);
    process.exitCode = 1;
  }
}

async function shutdown(signal: string): Promise<void> {
  if (shuttingDown) {
    return;
  }

  shuttingDown = true;

  console.log(`${signal} received. Starting graceful shutdown...`);

  try {
    if (server) {
      await new Promise<void>((resolve, reject) => {
        server!.close((error) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
      });

      console.log("HTTP server closed");
    }

    // Disconnect the database here using the cleanup method
    // documented by your database client.

    process.exitCode = 0;
  } catch (error) {
    console.error("Error during shutdown:", error);
    await db.close()
    process.exitCode = 1;
  }
}

process.once("SIGTERM", () => {
  void shutdown("SIGTERM");
});

process.once("SIGINT", () => {
  void shutdown("SIGINT");
});

void main()