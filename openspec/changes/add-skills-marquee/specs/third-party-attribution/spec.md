## ADDED Requirements

### Requirement: Logo Credits
The system SHALL provide, reachable from the footer on every locale, a credits notice stating that brand icons come from Simple Icons (CC0), that trademarks belong to their owners and that their use does not imply endorsement. The notice SHALL also include the license attribution for every displayed icon whose license requires it (at least Rust — CC BY-SA 4.0; Git — Git Logo by Jason Long, CC BY 3.0; OpenJDK — BSD-3-Clause; GNU Bash — MIT; Apache Maven — Apache-2.0).

#### Scenario: Visitor looks for logo licenses
- **WHEN** the visitor activates the logo credits link in the footer
- **THEN** the credits notice is shown in the current language, with the Simple Icons source, the trademark disclaimer and each required per-icon attribution

#### Scenario: A licensed icon is added or removed
- **WHEN** the set of displayed icons changes
- **THEN** the credits list contains exactly the attributions required by the icons currently displayed
