# CloudLightningBackground - Componente Alternativo

## 🌩️ Descripción

`CloudLightningBackground` es una alternativa al componente `WavesBackground` inspirada en el efecto interactivo de [Onlook.com](https://onlook.com). Utiliza canvas HTML5 y JavaScript para crear un fondo dinámico con nubes vaporosas que se iluminan cuando el cursor pasa por encima, simulando un efecto de relámpagos.

## ✨ Características

- **🌙 Soporte completo para modo claro y oscuro**: Se adapta automáticamente al tema activo
- **☁️ Nubes vaporosas**: Partículas que simulan nubes con movimiento suave
- **⚡ Iluminación interactiva**: Efecto de resplandor que sigue al cursor del usuario
- **🎨 Efectos adaptativos**: Colores y opacidades diferentes según el tema
- **🚀 Optimizado para performance**: Pausado automáticamente cuando no está visible
- **📱 Responsive**: Funciona en dispositivos móviles con optimizaciones específicas
- **♿ Accesible**: Respeta `prefers-reduced-motion` y tiene etiquetas ARIA## 🎯 Casos de Uso

### Intercambio Directo con WavesBackground

```tsx
// Antes: WavesBackground
import { WavesBackground } from "@/components/landing/hero";

<WavesBackground />;

// Después: CloudLightningBackground
import { CloudLightningBackground } from "@/components/landing/hero";

<CloudLightningBackground />;
```

### Uso en HeroSection

```tsx
// src/components/landing/hero/HeroSection.tsx
import { CloudLightningBackground } from "./Hero.CloudLightningBackground";

const HeroSection = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Navigation */}
      <HeaderNavigation />

      {/* Fondo alternativo con efecto de relámpagos */}
      <CloudLightningBackground />

      <div className="container relative z-10 mx-auto px-4 py-20 md:py-32">
        {/* Contenido del hero */}
      </div>
    </div>
  );
};
```

## ⚙️ Configuración

El componente incluye una configuración interna que puede ajustarse según las necesidades:

```tsx
const CONFIG = {
  PARTICLE_COUNT: 80, // Número de partículas de nube
  LIGHT_RADIUS: 200, // Radio de iluminación del cursor
  LIGHT_INTENSITY: 0.8, // Intensidad del efecto de relámpago
  PARTICLE_MIN_SIZE: 20, // Tamaño mínimo de partículas
  PARTICLE_MAX_SIZE: 60, // Tamaño máximo de partículas
  // ... más opciones
};
```

## 🎨 Personalización de Colores por Tema

### Modo Oscuro (Dark)

```tsx
CLOUD_COLOR: { r: 150, g: 150, b: 200 },     // Gris azulado suave
LIGHTNING_COLOR: { r: 180, g: 200, b: 255 }, // Azul claro brillante
BACKGROUND_COLOR: "rgba(15, 23, 42, 0.95)",  // Slate oscuro
LIGHT_OPACITY: 0.8,                          // Alta intensidad
CLOUD_BASE_OPACITY: 0.1,                     // Nubes muy sutiles
```

### Modo Claro (Light)

```tsx
CLOUD_COLOR: { r: 200, g: 220, b: 240 },     // Azul grisáceo claro
LIGHTNING_COLOR: { r: 100, g: 150, b: 255 }, // Azul más intenso
BACKGROUND_COLOR: "rgba(248, 250, 252, 0.95)", // Slate claro
LIGHT_OPACITY: 0.6,                          // Intensidad moderada
CLOUD_BASE_OPACITY: 0.3,                     // Nubes más visibles
```

## 📱 Optimizaciones Móviles

- **Reducción de opacidad**: En dispositivos móviles se reduce al 80% para ahorrar batería
- **Partículas optimizadas**: Menor número de partículas en pantallas pequeñas
- **Touch-friendly**: No depende exclusivamente del mouse, funciona con touch

## 🚀 Performance

- **Intersection Observer**: Se pausa automáticamente cuando no está visible
- **RequestAnimationFrame**: Utiliza la API nativa para animaciones suaves
- **Canvas optimizado**: Configuraciones específicas para mejorar el renderizado
- **Memory management**: Limpieza automática de recursos al desmontar

## 🎪 Comparación con WavesBackground

| Característica            | WavesBackground      | CloudLightningBackground |
| ------------------------- | -------------------- | ------------------------ |
| **Tecnología**            | SVG + CSS Animations | Canvas + JavaScript      |
| **Interactividad**        | ❌ Estático          | ✅ Sigue al cursor       |
| **Efecto Visual**         | Olas abstractas      | Nubes con relámpagos     |
| **Soporte de Tema**       | ✅ Automático CSS    | ✅ Dinámico con useTheme |
| **Performance**           | Ligero               | Moderado (optimizado)    |
| **Personalización**       | Limitada             | Alta                     |
| **Atmósfera Modo Oscuro** | Suave y minimalista  | Dramática y misteriosa   |
| **Atmósfera Modo Claro**  | Elegante y limpia    | Sofisticada y dinámica   |

## 🔧 Instalación y Uso

1. **El componente ya está creado** en:

   ```
   src/components/landing/hero/Hero.CloudLightningBackground.tsx
   ```

2. **Los estilos CSS** están incluidos en:

   ```
   src/app/globals.css (sección "CLOUD LIGHTNING BACKGROUND STYLES")
   ```

3. **Import y uso**:

   ```tsx
   import { CloudLightningBackground } from "@/components/landing/hero";

   <CloudLightningBackground />;
   ```

## 🐛 Troubleshooting

### El efecto no se ve

- Verifica que el contenedor padre tenga `position: relative`
- Asegúrate de que el componente tenga altura (`min-h-screen` o similar)

### Performance en dispositivos lentos

- El componente se auto-optimiza, pero puedes reducir `PARTICLE_COUNT`
- Verifica que `prefers-reduced-motion` esté funcionando

### No funciona en móviles

- El efecto funciona con touch, pero es menos visible para ahorrar batería
- Puedes ajustar la opacidad en la media query de `globals.css`

## 🎨 Inspiración y Efectos Visuales

Este componente está inspirado en el efecto de fondo interactivo de [onlook.com](https://onlook.com), pero adaptado para trabajar tanto en modo claro como oscuro:

### 🌙 Modo Oscuro

- **Fondo**: Gradiente oscuro slate que evoca una tormenta nocturna
- **Nubes**: Grises azuladas muy sutiles, apenas visibles
- **Iluminación**: Azul brillante intenso que simula relámpagos
- **Sensación**: Dramática, misteriosa, como una tormenta eléctrica

### ☀️ Modo Claro

- **Fondo**: Gradiente claro slate que simula un cielo matutino
- **Nubes**: Azul grisáceo claro, más visibles naturalmente
- **Iluminación**: Azul más profundo que contrasta elegantemente
- **Sensación**: Sofisticada, dinámica, como nubes iluminadas por el sol

### 🖱️ Interactividad

- **Estado reposo**: Nubes sutiles con movimiento suave
- **Al pasar cursor**: Las nubes se iluminan en un radio de 200px
- **Efecto progresivo**: La intensidad decrece exponencialmente desde el centro

---

**🎯 Resultado**: Un fondo que se adapta perfectamente al tema activo, manteniendo la experiencia interactiva y atmosférica en ambos modos.

**¿Necesitas más personalización?** El código está bien documentado y es fácil de modificar para ajustar colores, comportamientos o efectos adicionales.
