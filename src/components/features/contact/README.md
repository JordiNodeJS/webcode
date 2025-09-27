# Contact Feature Components

## Overview

This directory contains all components related to the contact functionality of the WEBCODE application.

## Components

### ContactForm.tsx

The main contact form component that handles user inquiries and service requests.

**Features:**
- Form validation using Zod schema
- GDPR compliance with explicit consent
- Service type selection
- Success/error state handling
- Integration with `/api/contact` endpoint

**Moved from:** `src/app/contacto/components/ContactForm.tsx`
**Reason for move:** Better organization following project architecture - business logic components should be in `src/components/features/` rather than in `app/` directory.

## Usage

```tsx
import { ContactForm } from '@/components/features/contact/ContactForm';

export default function ContactPage() {
  return (
    <div>
      <ContactForm />
    </div>
  );
}
```

## Dependencies

- React Hook Form for form management
- Zod for validation
- Lucide React for icons
- shadcn/ui components for UI elements
- Magic UI BorderBeam for visual enhancement
- Next.js Link for navigation

## Architecture Notes

This feature follows the WEBCODE project conventions:
- Named exports for components
- Client component for interactivity
- Proper TypeScript interfaces
- Biome-compliant code formatting
- Accessible form design