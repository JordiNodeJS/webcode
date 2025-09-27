/**
 * @deprecated This location is deprecated. 
 * 
 * The ContactForm component has been moved to its proper location:
 * 
 * NEW LOCATION: @/components/features/contact/ContactForm
 * OLD LOCATION: @/app/contacto/components/ContactForm (deprecated)
 * 
 * Please update your imports to use the new canonical location:
 * 
 * ```tsx
 * // ✅ CORRECT - Use this import
 * import { ContactForm } from '@/components/features/contact/ContactForm';
 * 
 * // ❌ DEPRECATED - Avoid this import
 * import { ContactForm } from '@/app/contacto/components/ContactForm';
 * ```
 * 
 * Reason for move: Components with business logic should be in 
 * src/components/features/ according to WEBCODE project architecture.
 * The app/ directory should only contain routes and layouts.
 */

// Re-export for temporary compatibility - will be removed in future versions
export { ContactForm } from "@/components/features/contact/ContactForm";