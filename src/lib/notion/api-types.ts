/**
 * Tipos extendidos para la API de Notion
 * Estos tipos complementan los tipos oficiales de @notionhq/client
 */

import type { Client } from "@notionhq/client";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

// Tipo extendido del cliente con el método query
export interface ExtendedNotionClient extends Client {
  databases: Client["databases"] & {
    query: (args: DatabaseQueryParameters) => Promise<DatabaseQueryResponse>;
  };
}

// Parámetros para la consulta de base de datos
export interface DatabaseQueryParameters {
  database_id: string;
  filter?: DatabaseFilter;
  sorts?: DatabaseSort[];
  page_size?: number;
  start_cursor?: string;
}

// Respuesta de consulta de base de datos
export interface DatabaseQueryResponse {
  results: PageObjectResponse[];
  has_more: boolean;
  next_cursor: string | null;
}

// Filtros de base de datos
export type DatabaseFilter =
  | CheckboxFilter
  | RichTextFilter
  | TitleFilter
  | MultiSelectFilter
  | AndFilter
  | OrFilter;

export interface CheckboxFilter {
  property: string;
  checkbox: {
    equals: boolean;
  };
}

export interface RichTextFilter {
  property: string;
  rich_text: {
    equals?: string;
    contains?: string;
  };
}

export interface TitleFilter {
  property: string;
  title: {
    contains: string;
  };
}

export interface MultiSelectFilter {
  property: string;
  multi_select: {
    contains: string;
  };
}

export interface AndFilter {
  and: DatabaseFilter[];
}

export interface OrFilter {
  or: DatabaseFilter[];
}

// Ordenación de base de datos
export interface DatabaseSort {
  property: string;
  direction: "ascending" | "descending";
}
