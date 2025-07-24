# CV Project Development Guidelines

This document provides essential information for developers working on the CV project, including build instructions, testing information, and style guidelines.

## Build and Configuration

### Project Setup

1. **Prerequisites**:
   - Node.js (v18+)
   - npm (v9+)
   - Angular CLI (v19+)

2. **Installation**:
   ```bash
   npm install
   ```

3. **Development Server**:
   ```bash
   npm start
   ```
   This will start the development server at `http://localhost:4200/`.

4. **Production Build**:
   ```bash
   npm run build
   ```
   The build artifacts will be stored in the `dist/my-cv` directory.

### Configuration Details

- **Angular Configuration**: The project uses Angular v19.2.0 with standard Angular CLI configuration in `angular.json`.
- **TypeScript Configuration**: 
  - The project uses strict TypeScript settings with additional strict checks enabled.
  - Configuration is split between `tsconfig.json` (base), `tsconfig.app.json` (app-specific), and `tsconfig.spec.json` (test-specific).

## Testing

### Testing Framework

The project uses Jasmine for testing with Karma as the test runner, which is the standard testing setup for Angular applications.

### Running Tests

```bash
npm test
```

This command will execute the unit tests via Karma in a browser.

### Writing Tests

#### Component Testing Example

Here's an example of how to test a component with dependencies:

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header-component-ts';
import { TranslateService } from '../../../services/translate_service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { PersonalInfo } from '../../models/PersonalInfoInterfaces';

// Mock data for testing
const mockPersonalInfo: PersonalInfo = {
  name: 'John',
  surname: 'Doe',
  location: 'New York',
  titles: ['Developer', 'Designer'],
  about: {
    languages: [
      { name: 'English', level: 'Native' },
      { name: 'Spanish', level: 'Intermediate' }
    ],
    experience: '5 years',
    militaryObligation: 'Completed'
  }
};

// Mock services
class MockTranslateService {
  getCurrentLang() {
    return 'en';
  }
  
  setLanguage(lang: string) {
    return of(true);
  }
}

class MockRouter {
  navigate(commands: any[]) {
    return Promise.resolve(true);
  }
}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let translateService: TranslateService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [
        { provide: TranslateService, useClass: MockTranslateService },
        { provide: Router, useClass: MockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    translateService = TestBed.inject(TranslateService);
    router = TestBed.inject(Router);
    
    // Set input property
    component.personalInfo = mockPersonalInfo;
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with the current language from the service', () => {
    expect(component.currentLang).toBe('en');
  });

  it('should switch language when switchLanguage is called', () => {
    // Spy on the router navigate method
    const navigateSpy = spyOn(router, 'navigate').and.callThrough();
    // Spy on the translateService setLanguage method
    const setLanguageSpy = spyOn(translateService, 'setLanguage').and.returnValue(of(true));
    
    // Call the method
    component.switchLanguage('tr');
    
    // Verify the router was called with the correct parameters
    expect(navigateSpy).toHaveBeenCalledWith(['tr']);
    // Verify the translate service was called with the correct parameters
    expect(setLanguageSpy).toHaveBeenCalledWith('tr');
    // Verify the current language was updated
    expect(component.currentLang).toBe('tr');
  });
});
```

#### Testing Services with HTTP

For services that make HTTP requests, use `HttpClientTestingModule`:

```typescript
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TranslateService } from './translate_service';

describe('TranslateService', () => {
  let service: TranslateService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TranslateService]
    });
    service = TestBed.inject(TranslateService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should load translations', () => {
    const mockTranslations = { 'header.about': 'About' };
    
    service.loadTranslations('en').subscribe(result => {
      expect(result).toBeTrue();
    });
    
    const req = httpMock.expectOne('/assets/i18n/en.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockTranslations);
    
    expect(service.translate('header.about')).toBe('About');
  });
});
```

### Test Coverage

To generate a test coverage report:

```bash
ng test --code-coverage
```

The coverage report will be available in the `coverage/` directory.

## Project Structure

The project follows a standard Angular architecture:

- `src/app`: Main application code
  - `components`: UI components organized by feature
  - `models`: TypeScript interfaces/classes for data models
- `src/assets`: Static assets including i18n files
- `src/services`: Service classes for shared functionality
- `src/styles`: Global styles

## Internationalization (i18n)

The project uses a custom translation service for internationalization:

- Translation files are stored in `src/assets/i18n/{lang}.json`
- The default language is Turkish ('tr')
- Currently supported languages are English ('en') and Turkish ('tr')
- The `TranslateService` handles loading and retrieving translations
- The `TranslatePipe` is used in templates to translate keys

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
