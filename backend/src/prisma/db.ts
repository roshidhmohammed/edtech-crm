import 'dotenv/config';
import postgres from '@prisma/orm-postgres/runtime';
import { contractFromJson } from '@prisma/orm-postgres/static';
import type { Contract } from './contract.d';
import contractJson from './contract.json' with { type: 'json' };
// import dotenv from "dotenv";
import env from '../config/env.js';

export const contract = contractFromJson<Contract>(contractJson);

// const environment = process.env.NODE_ENV === "production" ? "production" : "development"

// dotenv.config({path:`.env.${environment}`})

export const db = postgres({
  contract,
  url: env['DATABASE_URL']!,
});
