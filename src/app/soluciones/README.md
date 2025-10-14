# Soluciones Digitales - WEBCODE

Esta carpeta contiene las páginas individuales de cada solución/servicio ofrecido por WEBCODE.

## Estructura

```
/soluciones/
├── page.tsx                    # Página índice con todas las soluciones
├── web-development/
│   └── page.tsx               # Desarrollo web profesional
├── e-commerce/
│   └── page.tsx               # Tiendas online y e-commerce
├── seo/
│   └── page.tsx               # SEO & Marketing digital
├── consulting/
│   └── page.tsx               # Consultoría tecnológica
└── layout.tsx                  # Layout compartido
```

## Nomenclatura

**IMPORTANTE:** Para evitar confusión:
- `/soluciones/` - Páginas individuales detalladas de cada solución (anteriormente `/services/`)
- `/servicios` - Página general de listado de servicios (mantenida por compatibilidad)

## URLs Disponibles

- `/soluciones` - Índice de todas las soluciones
- `/soluciones/web-development` - Desarrollo Web
- `/soluciones/e-commerce` - E-commerce & Tiendas Online
- `/soluciones/seo` - SEO & Marketing Digital
- `/soluciones/consulting` - Consultoría Tecnológica

## Estilo Visual

Todas las páginas utilizan el **estilo general de WEBCODE** (suave con gradientes pasteles):
- Bordes suaves (`border border-border/30`)
- Gradientes de fondo (`bg-gradient-to-br from-white/95 via-white/90 to-slate-50/95`)
- Efectos glow en hover con gradientes de colores
- Tipografía semi-bold (`font-bold` y `font-semibold`)
- Sombras suaves con efecto elevación (`hover:shadow-2xl hover:-translate-y-2`)
- Colores del sistema: primary (#ff6680), secondary (#ff8f66), accent (#9333ea)
- Componente reutilizable: `SolucionCard`

## Componentes Comunes

- `Button` de shadcn/ui con estilos brutalistas aplicados
- `Link` de Next.js para navegación
- Metadata SEO completa con OpenGraph

## Próximos Pasos

- Añadir imágenes/ilustraciones a cada página
- Implementar testimonios de clientes
- Crear casos de estudio específicos
- Añadir formularios de contacto específicos por servicio

