# Plantilla: Prompt para GitHub Copilot (.prompt.md)

Prompt para generar un prompt file de GitHub Copilot (archivo `.prompt.md`).

## Objetivo

Crear un archivo reusable para Copilot (VS Code / JetBrains) con parámetros interactivos y un ejemplo de uso.

## Prompt (para tu IA)

Genera un archivo de prompt para GitHub Copilot en Markdown (`.prompt.md`). Debe incluir:

- Metadatos opcionales al inicio (ej. `mode`, `description`).
- Instrucciones claras y paso a paso.
- Campos interactivos `${input:...:placeholder}` para pedir código y audiencia.
- Un ejemplo de uso al final.

Devuelve solo el contenido Markdown listo para guardar como `.github/prompts/<nombre>.prompt.md`. Sugiere un nombre de archivo claro (ej. `explain-code.prompt.md`).

## Dónde colocarlo

En `.github/prompts/` dentro del workspace (el nombre debe terminar en `.prompt.md`).

## Cómo usarlo

1. Guardar el archivo en `.github/prompts/`.
2. En VS Code o JetBrains, abrir Copilot Chat y escribir `/nombre-del-prompt` (sin extensión).
3. Adjuntar archivos de contexto si es necesario y ejecutar.

## Ejemplo de salida esperada (contenido Markdown)

```markdown
---
mode: 'agent'
description: 'Explica código de forma clara y con ejemplos'
---

Explica el siguiente código de forma sencilla:

Código: ${input:code:Pegue aquí el código a explicar}

Audiencia: ${input:audience:¿Para quién es la explicación? (ej. principiantes)}

Por favor incluye:

- Resumen breve de qué hace el código
- Paso a paso de las partes principales
- Explicación de conceptos clave
- Un ejemplo de uso simple

Usa lenguaje claro y evita jerga innecesaria.
```
