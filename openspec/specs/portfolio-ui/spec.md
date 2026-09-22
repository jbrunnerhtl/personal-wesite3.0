# portfolio-ui Specification

## Purpose
The site shell and presentation layer: design system and color modes, readable contrast, smooth scrolling, responsive navigation, bilingual content (EN/DE), hero entrance and count-up stats, contact options, the 404 page and the browser icon.

## Requirements

### Requirement: Design System with Color Modes
The system SHALL style the site from color tokens with dark, light and system color modes. The chosen mode SHALL persist across visits, be applied before first paint (no flash of the wrong mode), and follow the operating system live while in system mode. Solid, translucent surfaces SHALL be used instead of backdrop blur over the 3D canvas.

#### Scenario: User switches color mode
- **WHEN** the user activates the color mode toggle in the navigation bar
- **THEN** the mode cycles dark → light → system, the new mode is revealed with a circular transition from the toggle (or applied instantly when reduced motion is preferred or View Transitions are unsupported), and the choice is stored

#### Scenario: Returning visitor loads the page
- **WHEN** a visitor with a stored color mode opens the site
- **THEN** the page renders in that mode from the first paint

### Requirement: Readable Text Contrast
The system SHALL keep every text color token at a contrast ratio of at least 4.5:1 against both the page background and card surfaces, in both dark and light mode.

#### Scenario: User reads small secondary text
- **WHEN** small labels such as stat captions, years or the language pill are displayed in either color mode
- **THEN** their contrast against the background and cards is at least 4.5:1

### Requirement: Smooth Scrolling
The system SHALL provide smooth inertial scrolling with Lenis and smooth-scroll navigation to sections, and SHALL fall back to native scrolling when the user prefers reduced motion.

#### Scenario: User scrolls using mouse wheel or keyboard
- **WHEN** the user initiates a scroll
- **THEN** the page moves smoothly with momentum while keeping native scroll positions and keyboard navigation working

### Requirement: Responsive Navigation and Layout
The system SHALL adapt layout and navigation to every viewport from 320px to 2560px wide without horizontal overflow, scaling the rem-based layout up gently on screens 1920px and wider.

#### Scenario: User navigates on desktop
- **WHEN** viewing on screens 768px wide or larger
- **THEN** the navigation bar shows About, Projects, Skills and Contact, highlights the section in view with a sliding pill, and draws an underline from left to right on hover (on hover-capable devices) and on keyboard focus, which exits to the right on leave

#### Scenario: User navigates on mobile
- **WHEN** viewing on screens under 768px
- **THEN** a menu button opens a panel with the section links and GitHub link; it closes on selecting a link, tapping outside, pressing Escape, or growing past the breakpoint, and interactive targets are at least 40px

### Requirement: Bilingual Content
The system SHALL serve all copy in English and German at `/en` and `/de`, both prerendered, with the correct `lang` attribute, title, description and Open Graph locale per language. Requests without a locale prefix SHALL redirect to the stored language choice, else the browser's preferred supported language, else English.

#### Scenario: Visitor opens the root URL
- **WHEN** a visitor requests `/`
- **THEN** they are redirected to `/de` or `/en` based on their saved choice, then their Accept-Language header, then English

#### Scenario: User switches language
- **WHEN** the user selects DE or EN in the navigation bar
- **THEN** the copy cross-fades to the other language in place without a reload, keeping scroll position and the 3D scene, and the URL, `lang` attribute, title and saved choice are updated

### Requirement: Hero Entrance and Count-Up Stats
The system SHALL reveal the name in the hero with a CSS-only word animation that starts on first paint, and SHALL count the hero stats and other displayed counts up from zero once visible.

#### Scenario: Page loads
- **WHEN** the home page is first painted
- **THEN** the words of the name rise into view without waiting for JavaScript, with gradient text moving together with its glyphs and no clipped letters

#### Scenario: Stats come into view
- **WHEN** the hero stats fade in, or the follower and repository counts scroll into view
- **THEN** each number counts up to its value without shifting the layout, the server-rendered HTML contains the final values, and the final values are shown immediately when reduced motion is preferred

### Requirement: Contact Options
The system SHALL show the contact email address with a mailto action and a copy-to-clipboard button, alongside a link to the GitHub profile.

#### Scenario: User copies the email address
- **WHEN** the user activates the copy button next to the email address
- **THEN** the address is copied, a confirmation icon appears and "Copied!" is announced to screen readers for about two seconds

### Requirement: Localized Not Found Page
The system SHALL respond to unknown URLs with a styled, localized 404 page in the current color mode, returning HTTP status 404 and marked noindex.

#### Scenario: Visitor opens a missing page
- **WHEN** a visitor requests an unknown path such as `/de/missing` or an unsupported locale like `/fr`
- **THEN** a 404 page is shown in German for `/de/…` paths and in English otherwise, with a link back to that language's home page

### Requirement: Branded Browser Icon
The system SHALL use the GitHub profile picture as the browser tab icon and Apple touch icon.

#### Scenario: User views the site in a browser tab
- **WHEN** the site is open in a browser tab or saved to a phone's home screen
- **THEN** the round GitHub profile picture is shown as its icon
