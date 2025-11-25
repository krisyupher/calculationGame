# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Sum Memory Game** - an interactive browser-based game where players watch numbers appear sequentially, memorize them, and calculate their sum. The game has customizable difficulty settings and provides immediate feedback on answer correctness.

## Technology Stack

- **Frontend:** Angular 18 with TypeScript
- **Testing:** Jest test framework following TDD methodology
- **Build Tools:** Webpack for bundling and module management
- **Transpilation:** Babel for JavaScript/TypeScript transformation
- **Code Quality:** ESLint, Prettier, and Angular best practices
- **Styling:** SCSS with CSS variables for theming (dark mode theme)
- **Version Control:** Git with conventional commits
- **Fonts:** Google Fonts (Inter)
- **Architecture:** Component-based with container/presentational pattern separation

## Development Workflow

This project follows a structured development process using specialized Claude Code agents:

### 1. **Architecture Planning** (`.claude/agents/architecture-planner.md`)
   - Use when designing new features or refactoring systems
   - Applies Scrum architecture with container/presentational component separation
   - Establishes scope rules and data flow patterns
   - Ensures component responsibilities are well-defined
   - Considers build architecture: Webpack bundling and Babel transpilation
   - Includes linting strategy using ESLint and code formatting with Prettier

### 2. **Test-Driven Development** (`.claude/agents/tdd-guide.md`)
   - Write tests BEFORE implementation code
   - Follow red-green-refactor cycle
   - Unit tests using Jest with 80%+ coverage goal
   - Each test represents a specific behavior requirement
   - Jest configuration for Angular 18 component and service testing

### 3. **Angular Development** (`.claude/agents/angular-developer.md`)
   - Implement features following TDD principles
   - Use Angular best practices (dependency injection, reactive forms, RxJS)
   - Proper lifecycle management and change detection strategies
   - Component-based architecture with OnPush change detection where applicable

### 4. **Security Audit** (`.claude/agents/security-auditor.md`)
   - Review code for vulnerabilities before deployment
   - Check for input validation, XSS prevention, and data exposure risks
   - Validate dependency security
   - Focus on client-side security concerns for this Angular application

### 5. **Git Workflow** (`.claude/agents/git-workflow-manager.md`)
   - Commit changes using conventional commits specification
   - Proper commit types: feat, fix, docs, style, refactor, perf, test, chore
   - Scope-based commits reflecting codebase areas: game-state, settings, ui, animations, etc.
   - Generate clean, semantic version-aware git history

## Build and Code Quality Tools

### Build Tools
- **Webpack**: Module bundler for optimized production builds and development builds
- **Babel**: JavaScript/TypeScript transpiler for modern syntax transformation and compatibility
- **Angular 18 CLI**: Build tooling integrated with Webpack for development and production

### Code Quality
- **ESLint**: JavaScript/TypeScript linting with Angular-specific rules (TypeScript parser)
- **Prettier**: Automatic code formatting (2-space indentation, single quotes, semicolons)
- **.eslintrc.json**: Configure ESLint rules for Angular 18 projects
- **.babelrc**: Configure Babel presets and plugins for Angular and TypeScript

### Testing
- **Jest**: JavaScript testing framework with Angular preset support
- **@angular/core/testing**: Angular testing utilities (TestBed, ComponentFixture)

### Running Build, Lint, Format, and Test Commands

```bash
# Development build with Webpack
npm run build:dev

# Production build with Webpack
npm run build:prod

# Format code with Prettier
npm run format

# Lint code with ESLint
npm run lint

# Fix linting issues automatically
npm run lint:fix

# Run tests with Jest
npm test

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test -- game.service.spec.ts

# All quality checks (lint, format, test)
npm run quality:check
```

## Running the Application

This is an Angular 18 application with Webpack bundling and Jest testing:

1. Install dependencies: `npm install`
2. Development server: `ng serve` or `npm start` (runs on http://localhost:4200)
3. Development build with Webpack: `npm run build:dev`
4. Production build with Webpack optimization: `npm run build:prod`
5. Run tests with Jest: `npm test`
6. Run specific test file: `npm test -- game.service.spec.ts`
7. Generate Jest coverage report: `npm test -- --coverage`
8. Watch mode for development: `npm run dev` or `ng serve --poll`

## Project Structure

The application follows Angular's standard structure with component-based architecture:

```
src/
  app/
    components/
      game-container/          # Container component - smart, handles logic
        game-container.component.ts
        game-container.component.html
        game-container.component.scss
        game-container.component.spec.ts

      game-screens/            # Presentational components - dumb, receive props
        start-screen/
        settings-screen/
        countdown-screen/
        playing-screen/
        input-screen/
        result-screen/

    services/
      game.service.ts          # Game logic and state management
      game.service.spec.ts

      settings.service.ts      # Settings persistence
      settings.service.spec.ts

    models/
      game.model.ts            # Type definitions and interfaces
      settings.model.ts

    app.component.ts           # Root component
    app.module.ts              # Module configuration

  assets/                       # Static assets
  styles/                       # Global SCSS
    variables.scss             # Design tokens and CSS variables
    animations.scss            # Global animations

  main.ts                       # Angular bootstrap
  environment.ts               # Environment configuration

angular.json                    # Angular 18 CLI configuration
tsconfig.json                   # TypeScript configuration
tsconfig.spec.json              # TypeScript test configuration
.eslintrc.json                  # ESLint configuration
.eslintignore                   # ESLint ignore patterns
.prettierrc                      # Prettier configuration
.prettierignore                 # Prettier ignore patterns
webpack.config.js               # Webpack bundler configuration
.babelrc                         # Babel transpiler configuration
jest.config.js                  # Jest test runner configuration
package.json                    # NPM dependencies and scripts
```

### Architecture Pattern: Container/Presentational

**Container Component** (Smart Component):
- Handles business logic and state management
- Manages game flow and configuration
- Subscribes to services using RxJS observables
- Passes data to presentational components via @Input
- Receives events from presentational components via @Output

**Presentational Components** (Dumb Components):
- Pure, stateless UI rendering components
- Receive data only through @Input properties
- Emit user actions through @Output event emitters
- No direct service dependencies
- Fully reusable and testable in isolation

## Key Code Patterns

### Dependency Injection
All services are injected into components/services using Angular's DI pattern:
```typescript
constructor(private gameService: GameService) {}
```

### Observable Streams with RxJS
Game state and configuration are exposed as observables:
- `gameState$`: BehaviorSubject tracking current game state
- `settings$`: Observable for game settings
- Use `async` pipe in templates for automatic subscription management
- Proper cleanup with `takeUntil` operator in component subscriptions

### Container Component State Management
The game container manages:
- Game flow orchestration (start → countdown → playing → input → result)
- Service subscriptions and event handling
- Communication with presentational screen components
- Configuration updates and persistence

### Presentational Components
Each screen component receives:
- `@Input()` data from parent container
- `@Output()` events for user interactions (button clicks, form submissions)
- Examples: start-screen emits `startGame` event, input-screen emits `submitAnswer` event

### Game Service Responsibilities
- Generate random number sequences
- Calculate correct sums
- Validate user answers
- Manage timing and game configuration
- Handle settings persistence via localStorage

### Settings Service Responsibilities
- Load/save settings to localStorage
- Provide settings as observable stream
- Validate setting ranges and constraints
- Apply default values

### Animation Patterns
- Number pop-in animation: `pop-in` keyframe with cubic-bezier easing
- Screen transitions: `fadeIn` animation on screen load
- Countdown pulse: `pulse` animation for visual feedback
- Use Angular's built-in animation module or CSS animations for simplicity

## Build and Testing Configuration

### Webpack Configuration (`webpack.config.js`)
- Entry point: `src/main.ts`
- Output: `dist/` directory
- Module resolution for TypeScript files
- SCSS loader for styling
- Development and production optimization settings
- Source maps for debugging

### Babel Configuration (`.babelrc`)
- Preset: `@babel/preset-typescript` for TypeScript support
- Preset: `@babel/preset-angular` for Angular compatibility
- Target modern browsers with appropriate polyfills
- Optional chaining and nullish coalescing support

### Jest Configuration (`jest.config.js`)
- Preset: `jest-preset-angular`
- Test environment: jsdom for DOM testing
- Module name mapper for path aliases (`@app/*`, `@services/*`)
- Coverage thresholds: 80% statements, branches, functions, lines
- Setup files for Angular testing module initialization
- Transform TypeScript files using `ts-jest`

### ESLint and Prettier Integration
- ESLint rules enforce code quality and Angular best practices
- Prettier formats code automatically on save (2-space indentation)
- Pre-commit hooks run linting and formatting before commits
- CI/CD pipeline runs full quality checks

## Common Development Tasks

### Adding a New Feature

1. **Plan Architecture** - Use `.claude/agents/architecture-planner.md`:
   - Design container vs presentational component structure
   - Define scope boundaries and data flow
   - Establish clear component responsibilities

2. **Write Tests First** - Use `.claude/agents/tdd-guide.md`:
   - Write unit tests for services (game logic) using Jest
   - Write component tests for UI behavior with Jest and Angular TestBed
   - Jest matcher syntax: `expect()`, `.toEqual()`, `.toBeDefined()`, etc.
   - Use Jest mocks and spies for service testing
   - Ensure 80%+ code coverage with Jest coverage reports

3. **Implement with Angular** - Use `.claude/agents/angular-developer.md`:
   - Create service with business logic
   - Create container component for state management
   - Create presentational components for UI
   - Follow Angular best practices and dependency injection

4. **Security Review** - Use `.claude/agents/security-auditor.md`:
   - Check for input validation issues
   - Verify XSS prevention in templates
   - Review any API calls or data handling

5. **Commit Changes** - Use `.claude/agents/git-workflow-manager.md`:
   - Use conventional commits format
   - Scope format: `feat(game-state): add difficulty selector`
   - Ensure commit messages follow specification

### Adjust Game Difficulty
1. Update default config in `game.service.ts`
2. Update settings interface in `game.model.ts`
3. Add validation in `settings.service.ts`
4. Write tests for new difficulty levels
5. Update input-screen component if needed

### Add Persistent Settings Storage
Settings persistence is handled by `settings.service.ts`:
- Uses localStorage to save user preferences
- Loads on service initialization
- Observable stream for reactive updates

### Change Animations
Update animation definitions in `src/styles/animations.scss`:
- Modify keyframe definitions for existing animations
- Add new animations and update component references
- Test animations in each affected component

### Update Color Scheme
Change design tokens in `src/styles/variables.scss`:
- Update CSS custom properties (--accent-color, --success-color, etc.)
- Test color changes across all screen components
- Verify contrast ratios for accessibility

## Workflow Checklist for New Work

When starting any new feature or fix:

- [ ] Use **architecture-planner** to design component structure
- [ ] Use **tdd-guide** to write tests defining expected behavior
- [ ] Use **angular-developer** to implement following tests
- [ ] Run `npm run lint:fix` to fix linting issues
- [ ] Run `npm run format` to format code with Prettier
- [ ] Run `npm test` to verify all tests pass
- [ ] Use **security-auditor** to review for vulnerabilities
- [ ] Use **git-workflow-manager** to create proper commits
- [ ] Verify `npm run quality:check` passes before push
