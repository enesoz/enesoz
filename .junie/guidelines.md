# Style Guidelines for CV Project

This document outlines the style guidelines to follow when making changes to the CV project.

## CSS Guidelines

1. Use a consistent color scheme:
   - Primary color: #3498db (blue)
   - Secondary color: #2c3e50 (dark blue)
   - Text color: #333333
   - Light gray: #7f8c8d
   - Background: #ffffff

2. Naming conventions:
   - Use kebab-case for CSS class names (e.g., `.header-section`)
   - Use descriptive class names that reflect the purpose of the element

3. Layout:
   - Use CSS Grid for main layouts
   - Use Flexbox for alignment within components
   - Ensure responsive design with appropriate media queries

4. Spacing:
   - Use consistent spacing (margin and padding) throughout the application
   - Use multiples of 5px for spacing (5px, 10px, 15px, etc.)

## HTML Guidelines

1. Structure:
   - Use semantic HTML elements (header, section, article, etc.)
   - Maintain proper nesting of elements

2. Accessibility:
   - Include appropriate ARIA attributes
   - Ensure proper contrast for text readability
   - Use alt text for images

## TypeScript Guidelines

1. Naming conventions:
   - Use camelCase for variables and methods
   - Use PascalCase for classes and interfaces
   - Use descriptive names that reflect the purpose

2. Code organization:
   - Group related functionality together
   - Keep methods short and focused on a single task
   - Use interfaces for type definitions

3. Documentation:
   - Add comments for complex logic
   - Document public methods and interfaces

## Angular Guidelines

1. Component structure:
   - Follow Angular's recommended component structure
   - Keep components small and focused on a single responsibility

2. Services:
   - Use services for shared functionality
   - Inject services where needed rather than duplicating code

3. Internationalization:
   - Use Angular's i18n or ngx-translate for translations
   - Ensure all user-facing text is translatable
