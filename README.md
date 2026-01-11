# 📄 Professional CV Application

A modern, multilingual CV/Resume web application built with Angular 19. This application provides a dynamic, professional portfolio showcasing skills, experience, education, and achievements with internationalization support.

![Angular](https://img.shields.io/badge/Angular-19.2-DD0031?style=flat&logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=flat&logo=typescript)
![License](https://img.shields.io/badge/license-MIT-green)

## 🌟 Features

- **📱 Responsive Design** - Optimized for all device sizes
- **🌍 Multilingual Support** - Turkish (TR) and English (EN) languages
- **🖨️ Print-Ready** - Dedicated print layout for PDF generation
- **🎨 Modern UI** - Clean, professional design with custom styling
- **🔄 Dynamic Content** - JSON-based content management
- **♿ Accessible** - Following web accessibility best practices
- **⚡ Fast Performance** - Optimized build with Angular's latest architecture

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- Angular CLI (v19.2.12)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd my-cv
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm start
   # or
   ng serve
   ```

4. **Open your browser**
   Navigate to `http://localhost:4200/`

## 📂 Project Structure

```
my-cv/
├── src/
│   ├── app/
│   │   ├── components/          # UI Components
│   │   │   ├── about/           # About section
│   │   │   ├── awards/          # Awards & certifications
│   │   │   ├── contact-info/    # Contact information
│   │   │   ├── education/       # Education history
│   │   │   ├── experience/      # Work experience
│   │   │   ├── header/          # Page header
│   │   │   ├── print-page/      # Print layout
│   │   │   └── technical-skills/# Technical skills showcase
│   │   ├── models/              # TypeScript interfaces
│   │   │   ├── AwardInterface.ts
│   │   │   ├── CvDataInterface.ts
│   │   │   ├── EducationInterface.ts
│   │   │   ├── ExperienceInterface.ts
│   │   │   ├── PersonalInfoInterfaces.ts
│   │   │   └── TechnicalSkillsInterface.ts
│   │   ├── pipes/               # Custom Angular pipes
│   │   ├── app.component.*      # Root component
│   │   ├── app.config.ts        # App configuration
│   │   └── app.routes.ts        # Routing configuration
│   ├── services/                # Application services
│   │   ├── cv.service.ts        # CV data service
│   │   ├── translate.service.ts # Translation service
│   │   └── translate_pipe.ts    # Translation pipe
│   ├── assets/
│   │   ├── cv-data.json         # CV content data
│   │   └── i18n/                # Translation files
│   │       ├── en.json          # English translations
│   │       └── tr.json          # Turkish translations
│   ├── styles/                  # Global styles
│   ├── index.html               # Main HTML file
│   ├── main.ts                  # Application entry point
│   └── styles.css               # Global CSS
├── docs/                        # Documentation
├── public/                      # Static assets
├── dist/                        # Production build output
├── angular.json                 # Angular configuration
├── package.json                 # npm dependencies
├── tsconfig.json                # TypeScript configuration
└── README.md                    # This file
```

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start development server at `http://localhost:4200` |
| `npm run build` | Build project for production (output: `dist/`) |
| `npm run watch` | Build with watch mode for development |
| `npm test` | Run unit tests with Karma |
| `ng generate component <name>` | Generate a new component |
| `ng generate service <name>` | Generate a new service |
| `ng build --configuration production` | Production build with optimizations |

## 🎨 Technology Stack

### Core Framework

- **Angular 19.2** - Modern web framework
- **TypeScript 5.7** - Type-safe JavaScript
- **RxJS 7.8** - Reactive programming
- **Zone.js 0.15** - Change detection

### Development Tools

- **Angular CLI 19.2** - Command-line interface
- **Karma** - Test runner
- **Jasmine** - Testing framework

### Styling

- Custom CSS with modern design patterns
- Google Fonts (Roboto, Montserrat)
- Responsive grid layouts

## 🌐 Internationalization (i18n)

The application supports multiple languages through a custom translation service:

- **Supported Languages**: Turkish (TR), English (EN)
- **Translation Files**: Located in `src/assets/i18n/`
- **Language Switching**: Via URL parameter or language selector
- **Default Language**: Turkish (TR)

### Changing Language

Add the language code to the URL:

- English: `http://localhost:4200/en`
- Turkish: `http://localhost:4200/tr` (default)

## 📝 Content Management

### Updating CV Data

Edit the `src/assets/cv-data.json` file to update your CV content:

```json
{
  "personalInfo": { ... },
  "technicalSkills": [ ... ],
  "experiences": [ ... ],
  "education": [ ... ],
  "awards": [ ... ]
}
```

### Adding Translations

Update translation files in `src/assets/i18n/`:

- `en.json` - English translations
- `tr.json` - Turkish translations

## 🖨️ Print/PDF Generation

The application includes a print-optimized layout:

1. Open the application in your browser
2. Use browser's print function (Ctrl+P / Cmd+P)
3. Select "Save as PDF" as destination
4. Adjust print settings as needed

The print stylesheet automatically formats the content for professional PDF output.

## 🏗️ Building for Production

```bash
# Build with production configuration
npm run build

# Output will be in dist/my-cv/
# Deploy the contents of this folder to your web server
```

### Build Optimizations

- Tree-shaking for smaller bundle size
- Ahead-of-Time (AOT) compilation
- Output hashing for cache busting
- CSS and JS minification
- Bundle size budgets enforced

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run tests in headless mode
ng test --watch=false --browsers=ChromeHeadless
```

## 📦 Deployment

The application can be deployed to any static hosting service:

- **GitHub Pages**
- **Netlify**
- **Vercel**
- **Firebase Hosting**
- **AWS S3 + CloudFront**

Simply build the project and upload the `dist/my-cv/` folder.

## 🔧 Configuration

### Angular Configuration

Main configuration files:

- `angular.json` - Angular CLI configuration
- `tsconfig.json` - TypeScript compiler options
- `tsconfig.app.json` - App-specific TypeScript config
- `tsconfig.spec.json` - Test-specific TypeScript config

### Environment Settings

Update content and styling:

- CV Data: `src/assets/cv-data.json`
- Translations: `src/assets/i18n/*.json`
- Global Styles: `src/styles.css`
- Component Styles: Individual `*.component.css` files

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📧 Contact

For questions or feedback, please refer to the contact information in the CV.

## 🙏 Acknowledgments

- Built with [Angular](https://angular.dev/)
- Icons and fonts from Google Fonts
- Inspired by modern CV/Resume designs

---

**Made with ❤️ using Angular 19**
