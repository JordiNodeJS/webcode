/**
 * Ejemplos de uso del componente AnimatedLogo
 *
 * Este archivo muestra cómo usar el componente AnimatedLogo con diferentes props
 */

// 1. Uso básico con valores por defecto (tamaño lg)
// <AnimatedLogo />

// 2. Diferentes tamaños predefinidos
// <AnimatedLogo size="sm" />  // Pequeño: 128px → 160px → 192px
// <AnimatedLogo size="md" />  // Mediano: 160px → 192px → 224px
// <AnimatedLogo size="lg" />  // Grande (por defecto): 192px → 256px → 320px
// <AnimatedLogo size="xl" />  // Extra grande: 224px → 320px → 384px

// 3. Tamaño personalizado (sobrescribe el size)
// <AnimatedLogo width="300px" height="300px" />

// 4. Sin animación (logo estático)
// <AnimatedLogo disabled={true} />

// 5. Con clase adicional y título personalizado
// <AnimatedLogo
//   size="xl"
//   className="hover:scale-105 transition-transform"
//   title="Logo WEBCODE Interactivo"
// />

// 6. Combinando múltiples props
// <AnimatedLogo
//   size="md"
//   disabled={false}
//   className="opacity-80"
//   title="Logo personalizado"
// />

/**
 * Props disponibles:
 *
 * size?: 'sm' | 'md' | 'lg' | 'xl'
 *   - Controla el tamaño predefinido del logo
 *   - Por defecto: 'lg' (mantiene los valores originales)
 *
 * className?: string
 *   - Clases CSS adicionales para el contenedor
 *   - Por defecto: '' (vacío)
 *
 * width?: string
 * height?: string
 *   - Dimensiones personalizadas (sobrescriben size)
 *   - Ejemplo: "200px", "10rem", etc.
 *
 * disabled?: boolean
 *   - Deshabilita la animación de rotación
 *   - Por defecto: false
 *
 * title?: string
 *   - Texto del atributo title (accesibilidad)
 *   - Por defecto: "Logo animado WEBCODE"
 */
