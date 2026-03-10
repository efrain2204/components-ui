# @efrain2204/ui-components

> A modern, reusable UI component library built with Angular, organized following **Atomic Design** principles.

---

## 📦 Installation

```bash
npm install @efrain2204/ui-components
```

---

## 🚀 Quick Start

Import the components you need directly into your Angular module or standalone component:

```typescript
import { ButtonComponent } from '@efrain2204/ui-components';

@Component({
  standalone: true,
  imports: [ButtonComponent],
  ...
})
```

---

## 🧱 Component Catalog

Components are organized following the **Atomic Design** methodology.

### ⚛️ Atoms
> Smallest, indivisible UI elements.

| Component | Selector | Status | Description |
|-----------|----------|--------|-------------|
| Button | `ui-button` | ✅ Stable | Primary action button |

---

### 🧩 Molecules
> Combinations of atoms that form simple functional units.

| Component | Selector | Status | Description |
|-----------|----------|--------|-------------|
| — | — | 🔜 Coming soon | — |

---

### 🦠 Organisms
> Complex UI sections composed of molecules and atoms.

| Component | Selector | Status | Description |
|-----------|----------|--------|-------------|
| — | — | 🔜 Coming soon | — |

---

## 🛠️ Development

### Initial Setup

```bash
# Create the workspace
ng new ui-workspace --no-create-application
cd ui-workspace

# Generate the library
ng generate library ui-components
```

### Creating Components

```bash
ng generate component button --project=ui-components
```

### Local Build

```bash
ng build ui-components
```

---

## 📤 Publishing

### First-time publish

```bash
npm login
ng build ui-components
cd dist/ui-components
npm publish --access=public
```

### Publishing updates

1. Bump the version in `projects/ui-components/package.json`
2. Build and publish:

```bash
ng build ui-components
cd dist/ui-components
npm publish
```

---

## 🔄 Updating in your project

```bash
npm update @efrain2204/ui-components
```

---

## 📁 Project Structure

```
ui-workspace/
├── projects/
│   └── ui-components/
│       ├── src/
│       │   └── lib/
│       │       ├── atoms/
│       │       ├── molecules/
│       │       └── organisms/
│       └── package.json
└── dist/
    └── ui-components/
```

---

## 📋 Versioning

This library follows [Semantic Versioning](https://semver.org/):

- `MAJOR` — breaking changes
- `MINOR` — new components or features
- `PATCH` — bug fixes

---

## 👤 Author

**Efrain** — [@efrain2204](https://www.npmjs.com/~efrain2204)

---

## 📄 License

MIT