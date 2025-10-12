/**
 * Cliente de Notion API
 * Configuración y cliente singleton para interactuar con Notion
 */

import { Client } from "@notionhq/client";
import type {
  DatabaseQueryParameters,
  DatabaseQueryResponse,
} from "./api-types";

if (!process.env.NOTION_API_KEY) {
  throw new Error(
    "NOTION_API_KEY no está configurada en las variables de entorno",
  );
}

if (!process.env.NOTION_DATABASE_ID) {
  throw new Error(
    "NOTION_DATABASE_ID no está configurada en las variables de entorno",
  );
}

// Cliente singleton de Notion
export const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

// ID de la base de datos de blog
export const DATABASE_ID = process.env.NOTION_DATABASE_ID;

/**
 * Ejecuta una consulta a la API de Notion para consultar una base de datos.
 * En @notionhq/client v5.1.0, las bases de datos se consultan mediante dataSources.query()
 * usando data_source_id en lugar de database_id
 */
export async function queryDatabase(
  params: DatabaseQueryParameters,
): Promise<DatabaseQueryResponse> {
  // Convertir database_id a data_source_id para la API v5
  const { database_id, ...rest } = params;
  const res = await (notion as any).dataSources.query({
    data_source_id: database_id,
    ...rest,
  });
  return res as DatabaseQueryResponse;
}
