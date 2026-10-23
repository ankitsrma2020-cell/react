# react reviewer notes

## Architecture
This is a Vite + React 19 + TypeScript dashboard application, with client-side routing handled by `react-router-dom` in `src/App.tsx`. Pages are composed from reusable feature components under `src/components`, including dashboard charts/cards, profile forms, and tables; shared primitives live under `src/components/ui`. Styling combines feature-specific CSS class names with Tailwind utility classes, and `@` resolves to `src` via `vite.config.ts` and `tsconfig.json`.

## Conventions
- Use functional React components with typed props; components are generally named exports, e.g. `AnalyticsCharts` and `MetricCards` in `src/components/dashboard/AnalyticsCharts.tsx` and `MetricCards.tsx`.
- Keep feature components grouped by domain (`dashboard`, `profile`, `tables`) and reuse UI primitives such as `Card`, `Button`, and `Input` from `src/components/ui`.
- Use `NavLink` for sidebar navigation and `useNavigate` for imperative redirects/actions, as shown in `src/components/dashboard/Sidebar.tsx` and `Navbar.tsx`.
- Route protection is centralized in `ProtectedRoutes` in `src/App.tsx`; authenticated pages should remain nested beneath that route rather than implementing separate guards.
- Prefer explicit TypeScript prop and data types. Examples include `MetricProps`, `ProfileValues`, and typed component props in `src/components/dashboard/MetricCards.tsx` and `src/components/profile/ProfileForm.tsx`.
- Reusable form fields are factored into small local components (`Field` in `src/components/profile/ProfileForm.tsx`), and controlled inputs update the parent object through callbacks.
- Icons come from `lucide-react`; charts use `recharts` with configuration and fixture data colocated in each chart component.
- The project uses single quotes, semicolon-free TypeScript/JS, and ESLint covers `ts`/`tsx` files through `eslint.config.js`.

## Intentional non-standard choices
- Dashboard and table content is currently hard-coded fixture data (`lineData`, `pieData`, `salesData`, `tasks`, and `people`) in the relevant component files; do not assume every displayed value is backed by an API.
- Styling intentionally mixes semantic CSS classes such as `chart-card` and `profile-field` with Tailwind utilities such as `flex flex-col` in `Navbar.tsx`.
- Authentication/theme behavior is browser-local rather than server-backed: routing calls `isAuthenticated()` and the navbar persists theme state through `localStorage`.

## Watch out for
- Keep route paths consistent and case-sensitive. `Sidebar.tsx` links Orders to `/orders`, while `App.tsx` declares `/Orders`; this currently prevents the intended route from matching.
- Verify interactive controls have behavior before treating them as complete: the mobile menu button in `Navbar.tsx`, task controls in `Tasks.tsx`, and social indicators in `ProfileCard.tsx` have no handlers.
- Preserve controlled-form invariants in `ProfileForm.tsx`: first/last-name changes intentionally recompute `username`; avoid updating those fields independently.
- Check labels against control configuration: the “Company (disabled)” field in `ProfileForm.tsx` is rendered without `disabled`, despite its label.
- Avoid breaking the `@` alias by adding imports or moving files without updating both `vite.config.ts` and TypeScript path configuration.