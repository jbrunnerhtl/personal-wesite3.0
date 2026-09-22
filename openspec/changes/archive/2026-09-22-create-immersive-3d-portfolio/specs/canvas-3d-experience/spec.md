## ADDED Requirements

### Requirement: Liquid Chrome Background Orb
The system SHALL render a procedurally distorted chrome orb as a fixed background layer behind the page content, using a metallic, iridescent physical material lit by a procedural studio environment (no downloaded HDR map). The orb SHALL NOT capture pointer events, so it never blocks interaction with the content.

#### Scenario: User moves the pointer
- **WHEN** the user moves the mouse anywhere over the page
- **THEN** the orb leans gently towards the pointer on top of its slow idle rotation, using frame-rate-independent damping

#### Scenario: User switches color mode
- **WHEN** the resolved color mode changes between dark and light
- **THEN** the environment lighting and particle colors switch to that mode's palette and the environment map is re-baked

### Requirement: Scroll-Synchronized Orb Choreography
The system SHALL move, scale and dim the orb along keyframed poses tied to the smoothed scroll progress, with a separate choreography per layout (portrait/mobile, tablet/small laptop, desktop) chosen from the canvas size.

#### Scenario: User scrolls through the page
- **WHEN** the user scrolls from the hero through About, Projects, Skills and Contact
- **THEN** the orb glides between keyframed positions without stutter, and a scrim dims the scene over the first ~700px of scrolling so text stays readable

#### Scenario: Viewport changes layout bucket
- **WHEN** a tablet is rotated or the window is resized across a layout boundary
- **THEN** the orb switches to that layout's choreography (e.g. tucked into the top-right corner on tablets, beside the text column on wide desktops)

### Requirement: On-Demand Rendering
The system SHALL render the 3D scene only when it can change on screen: at full frame rate while the hero is visible, at half frame rate past the hero while the user scrolls or moves the pointer (plus a short settle period), and not at all otherwise. The scene's animation clock SHALL advance only on rendered frames, so pausing never causes a visible jump.

#### Scenario: User reads mid-page without interacting
- **WHEN** the hero is scrolled out of view and there has been no scroll or pointer input for the settle period
- **THEN** the canvas renders no frames and the page runs at the display's full frame rate

#### Scenario: User resumes scrolling mid-page
- **WHEN** the user scrolls again after the scene was paused
- **THEN** rendering resumes from the frozen state without the orb's shape or rotation jumping

### Requirement: Deferred and Conditional 3D Loading
The system SHALL load the 3D scene's code only after the browser is idle following the first render, and SHALL show a static gradient background instead of loading 3D at all when the user prefers reduced motion, has data saving enabled, the device reports 2 GB of memory or less or 2 CPU cores or fewer, or WebGL is unavailable. The device pixel ratio SHALL be capped at 1.5.

#### Scenario: Page loads on a capable device
- **WHEN** the page first loads
- **THEN** the initial JavaScript excludes three.js, and the canvas fades in over the same static gradient once the 3D code has loaded during idle time

#### Scenario: User prefers reduced motion
- **WHEN** the operating system's reduced-motion preference is enabled
- **THEN** no 3D code is downloaded and the static gradient background is shown

#### Scenario: Browser does not support WebGL
- **WHEN** WebGL initialization fails or is disabled
- **THEN** the static gradient background remains without throwing unhandled exceptions
