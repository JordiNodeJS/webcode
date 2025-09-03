# 🎨 Sistema de Colores WebSnack - UNIFICADO

> **⚠️ MIGRADO**: Este archivo ahora sigue el **[MASTER-COLOR-SYSTEM.md](../MASTER-COLOR-SYSTEM.md)** como única fuente de verdad.

## ✅ Reglas del Sistema de Colores Unificado

### 🎯 Paleta Principal (Actualizada)

| Color     | Hex       | Variable CSS          | Uso                              |
| --------- | --------- | ------------------- | -------------------------------- |
| Primary   | `#ff6680` | `--color-primary`   | Botones principales, brutalismo  |
| Secondary | `#ff8f66` | `--color-secondary` | Complementario, elementos cálidos |
| Accent    | `#9333ea` | `--color-accent`    | Destacados, contraste fuerte     |

### Estados de UI

| Estado  | Hex       | Variable CSS | Uso                   |
| ------- | --------- | ------------ | --------------------- |
| Success | `#10B981` | `--success`  | Confirmaciones, éxito |
| Warning | `#F59E0B` | `--warning`  | Advertencias          |
| Error   | `#EF4444` | `--error`    | Errores, validaciones |

### Colores Neutros

```css
--gray-50: #f9fafb;
--gray-100: #f3f4f6;
--gray-200: #e5e7eb;
--gray-300: #d1d5db;
--gray-400: #9ca3af;
--gray-500: #6b7280;
--gray-600: #4b5563;
--gray-700: #374151;
--gray-800: #1f2937;
--gray-900: #111827;
```

### Reglas de Uso

1. **Consistencia**: Usar siempre variables CSS, nunca valores hardcodeados
2. **Contraste**: Asegurar ratio mínimo 4.5:1 para textos
3. **Jerarquía**: Usar grises para establecer jerarquía visual
4. **Accesibilidad**: Verificar compatibilidad con daltonismo

### Combinaciones Prohibidas

❌ **Evitar estas combinaciones por problemas de accesibilidad:**

- Texto rojo sobre fondo verde
- Texto azul sobre fondo púrpura
- Combinaciones con contraste <4.5:1

✅ **Combinaciones recomendadas:**

- Primary sobre background
- Gray-900 sobre gray-50
- White sobre primary/secondary
