## 1. Project Setup

- [x] 1.1 Initialize Next.js project with TypeScript, Tailwind CSS and App Router
- [x] 1.2 Install three, @react-three/fiber, @react-three/drei, framer-motion, lenis and lucide-react; remove canvas-confetti
- [x] 1.3 Define color tokens for dark and light mode with Tailwind v4 `@theme inline`

## 2. 3D Background

- [x] 2.1 Render the chrome orb with GPU distortion and procedural studio lighting per color mode
- [x] 2.2 Drive scroll/pointer choreography from a render-free motion store with per-layout keyframes
- [x] 2.3 Render on demand (full rate in hero, half rate while interacting, idle otherwise) with a pausable scene clock
- [x] 2.4 Defer loading the 3D chunk until idle; use the static gradient for reduced motion, Save-Data, weak devices and no WebGL

## 3. Shell, Navigation and Modes

- [x] 3.1 Set up Lenis smooth scrolling with a reduced-motion fallback
- [x] 3.2 Build the navigation bar (active pill, left-to-right hover underline) and the mobile menu
- [x] 3.3 Add dark / light / system color modes with pre-paint script and circular reveal
- [x] 3.4 Raise text contrast to ≥ 4.5:1 in both modes
- [x] 3.5 Make every section responsive from 320px to 2560px without horizontal overflow

## 4. Content

- [x] 4.1 Replace invented content with data verified against github.com/jbrunnerhtl; live GitHub stats with fallback
- [x] 4.2 Build Hero (CSS name reveal, count-up stats), About with timeline, Projects, More repositories and Skills
- [x] 4.3 Remove Prolog and the Prolog project; feature the Online Shop; add PL/SQL
- [x] 4.4 Build Contact with visible email, mailto and copy button, plus GitHub link

## 5. Internationalization and Extras

- [x] 5.1 Serve `/en` and `/de` from an `app/[lang]` root layout with typed dictionaries and a locale proxy
- [x] 5.2 Switch language in place without remounting the page or 3D scene
- [x] 5.3 Add the localized, themed 404 page via `global-not-found.tsx`
- [x] 5.4 Use the GitHub avatar as favicon and Apple touch icon

## 6. Verification

- [x] 6.1 Type check, lint and production build pass
- [x] 6.2 Verify layouts, language switch, menu, 404, count-ups and frame rates in the browser
