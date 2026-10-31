import env from "../config/env";
import { isStrong } from "../utils/validations/password";
import { db } from "./db";
import bcrypt from "bcrypt";

// const prisma = new PrismaClient();

async function main() {
  const adminName = "Admin";
  const adminEmail = "admin@example.com";
  const adminPassword = env.ADMIN_PASSWORD;

  if (!adminPassword || !isStrong(adminPassword)) {
    throw new Error(
      "ADMIN_PASSWORD should be strong and not be empty"
    );
  }

  // Generate a secure password hash
  const hashedPassword = await bcrypt.hash(adminPassword, 12);

  // Create or update the admin user
  const admin = await db.orm.public.User.create({
      name: adminName,
      email: adminEmail,
      passwordHash: hashedPassword,
      role: "ADMIN",
  });

  console.log("Admin user seeded successfully:", {
    id: admin.id,
    name: admin.name,
    email: admin.email,
    role: admin.role,
  });
}

main()
  .catch((error) => {
    console.error("Admin seeding failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await db.close();
  });