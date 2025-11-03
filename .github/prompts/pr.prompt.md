# Prompt para crear una Pull Request con el CLI de GitHub (gh)

Objetivo
- Crea una Pull Request en GitHub usando el CLI `gh` siguiendo las convenciones del proyecto WEBCODE (Conventional Commits, pnpm, checklist de calidad).

Instrucciones para la AI / operador
1. Reemplaza las variables entre {{}} por los valores reales:
    - {{branch}}: rama feature/fix/ chore creada y subida (ej: feat/ui/header-cta)
    - {{base}}: rama objetivo (ej: main o develop)
    - {{type}}: feat | fix | chore | docs | refactor | test
    - {{scope}}: ámbito o módulo (ej: header, auth, checkout)
    - {{short-title}}: breve título tipo "mejora botón CTA"
    - {{body-details}}: descripción extendida de cambios y contexto
    - {{reviewers}}: lista separada por comas de reviewers (ej: @alice,@bob)
    - {{assignees}}: lista separada por comas de assignees (opcional)
    - {{labels}}: etiquetas separadas por comas (ej: type:feat,area:ui,p0)

2. Flujo recomendado (local):
    - git checkout -b {{type}}/{{scope}}/{{short-titleSlug}}
    - Hacer cambios, tests, format
    - git add -A
    - git commit -m "{{type}}({{scope}}): {{short-title}}" -m "{{body-details}}" 
      (Usar Conventional Commits. Primer línea corta (<72 chars), cuerpo explicativo opcional)
    - git push --set-upstream origin {{branch}}

3. Verificaciones automáticas (obligatorias antes de crear PR):
    - Ejecutar: pnpm install
    - Ejecutar: pnpm lint (debe pasar sin warnings en este proyecto)
    - Ejecutar: pnpm test
    - Ejecutar: pnpm build (si aplica)
    - Confirmar que no hay archivos grandes sin trackear y que package lock no cambió innecesariamente.

4. Plantilla de título y cuerpo de PR (usar exactamente este formato):
    - Título: {{type}}({{scope}}): {{short-title}}
    - Cuerpo (markdown):
      ```
      Resumen
      - Qué: Breve resumen de los cambios (1–2 líneas).
      - Por qué: Motivación y contexto.

      Cambios principales
      - Lista de puntos con lo más relevante.

      Cómo probar
      1. Pasos para reproducir / probar localmente
      2. Comandos: pnpm install && pnpm test && pnpm lint

      Issues relacionados
    - Closes issue (si aplica)

      Checklist
      - [ ] Cumple con Conventional Commits
      - [ ] pnpm lint (sin errores ni warnings)
      - [ ] pnpm test (todos los tests pasan)
      - [ ] Build OK (si aplica)
      - [ ] Accesibilidad: controles semánticos y labels
      - [ ] Responsive & dark mode verificados
      - [ ] Añadidos cambios en docs o changelog (si aplica)
      ```

5. Comando ejemplo final con gh
    - PR listo para revisión (no draft):
      gh pr create \
         --base {{base}} \
         --head {{branch}} \
         --title "{{type}}({{scope}}): {{short-title}}" \
         --body-file - \
         --label "{{labels}}" \
         --reviewer {{reviewers}} \
         --assignee {{assignees}}
      (Pegar el cuerpo de PR por stdin o usar --body-file path/to/file)

    - Para crear PR como draft:
      gh pr create --draft ... (mismos flags)

6. Etiquetas y reviewers
    - Añadir etiquetas que reflejen tipo y prioridad: type:feat|fix, area:{scope}, p0|p1|p2
    - Añadir reviewers técnicos y de diseño si toca (usar @username)

7. Mensajería y commits
    - Si hay múltiples commits, squash cuando la PR esté aprobada (preferible mantener historial limpio).
    - Usar mensajes claros; en caso de merge por squash, conservar el Conventional Commit en el título final.

8. Mensaje que la AI debe imprimir tras crear PR
    - URL de la PR
    - Estado (draft | open)
    - Labels aplicadas
    - Reviewers y assignees asignados
    - Resultado de checks (lint/tests) si se ejecutaron

Ejemplo rápido (con valores):
- git checkout -b feat/header/cta-improve
- git commit -m "feat(header): mejorar CTA" -m "Mejora accesibilidad y diseño responsive"
- git push --set-upstream origin feat/header/cta-improve
- gh pr create --base main --head feat/header/cta-improve --title "feat(header): mejorar CTA" --body-file pr_body.md --label "type:feat,area:ui" --reviewer @alice --assignee @team

Notas finales
- Siempre aplicar la checklist de WEBCODE antes de crear la PR.
- Mantener idioma español en título y cuerpo cuando el cambio sea para el mercado ES.
- Si el flujo automático falla, devolver pasos manuales y errores detectados.

Fin del prompt.