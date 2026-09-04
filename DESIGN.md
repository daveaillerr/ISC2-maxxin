---
name: ISC2 CC Preparation Engine
description: An all-in-one preparation hub for ISC2 CC certification
colors:
  isc2-green: "#00A859"
  isc2-green-light: "#10B981"
  isc2-blue: "#002D62"
  isc2-blue-light: "#0B3B60"
  amber-flag: "#D97706"
  canvas: "#FFFFFF"
  canvas-warm: "#F8FAFC"
  slate-primary: "#0F172A"
  slate-secondary: "#334155"
  slate-muted: "#64748B"
  border: "#E2E8F0"
  border-strong: "#CBD5E1"
typography:
  display:
    fontFamily: "'Inter', 'Plus Jakarta Sans', system-ui, sans-serif"
    fontWeight: 700
  body:
    fontFamily: "'Inter', 'Plus Jakarta Sans', system-ui, sans-serif"
    fontWeight: 400
rounded:
  sm: "0.125rem"
  lg: "0.5rem"
  xl: "0.75rem"
  2xl: "1rem"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.isc2-green}"
    textColor: "{colors.canvas}"
    rounded: "{rounded.lg}"
    padding: "12px 24px"
  card:
    backgroundColor: "{colors.canvas}"
    rounded: "{rounded.2xl}"
---

# Design System: ISC2 CC Preparation Engine

## Overview

**Creative North Star: "The Certification Sandbox"**

Clean, focused, and academic. A distraction-free environment that prioritizes clarity and comprehension over decorative flair. The interface is designed to emulate the seriousness of a certification exam while offering encouraging metrics and study aids. Decorative elements are minimized so that the content—questions, explanations, and scores—remains the undisputed focal point.

**Key Characteristics:**
- Content-first layouts with generous negative space
- High-contrast typography for readability during long study sessions
- Restrained component feel with subtle boundaries

## Colors

Crisp and purposeful. Slate and White form the canvas, Green drives success and primary action, and Amber draws attention to flagged items.

### Primary
- **Success Green** (#00A859): The definitive action color. Used for primary buttons, correct answers, and passing scores.
- **Action Hover** (#10B981): Lighter green used exclusively for hover states on primary actions.

### Secondary
- **Deep Blue** (#002D62): Foundational brand color, used sparingly for strong structural elements or branding accents.

### Neutral
- **Slate Primary** (#0F172A): Deepest slate for all primary headings and standard text, ensuring high legibility.
- **Slate Secondary** (#334155): Used for secondary body text and descriptions.
- **Warm Canvas** (#F8FAFC): The main background color, providing a soft contrast to stark white cards.
- **Pure Canvas** (#FFFFFF): Used for component backgrounds (cards, inputs) to make them stand out from the warm canvas.
- **Standard Border** (#E2E8F0): Subtle structure for cards and inputs.

### Accent
- **Flag Amber** (#D97706): Used to indicate flagged questions for review and mid-range performance warnings.

### Named Rules
**The Semantic Color Rule.** Colors carry meaning. Green always means success or forward action. Amber always means caution or flagged. Do not use these colors for mere decoration.

## Typography

**Display Font:** 'Inter', 'Plus Jakarta Sans', sans-serif
**Body Font:** 'Inter', 'Plus Jakarta Sans', sans-serif

**Character:** Highly legible, modern, and unornamented. Optimized for scanning and reading long blocks of technical text without fatigue.

### Hierarchy
- **Display** (700, 3xl-5xl): Hero sections and major dashboard numbers.
- **Title** (700, xl-2xl): Section headers and card titles.
- **Body** (400, sm-base): Question text, explanations, and general reading.
- **Label** (600, xs-sm): Uppercase domain tags, stats labels, and small UI markers.

## Layout

A max-width container (max-w-7xl) centered on the screen, creating a contained, predictable reading area. Density is loose on dashboards (bento grids, large cards) but tightens up in the exam view to keep navigation and questions closely associated.

## Elevation & Depth

Flat-by-default with shadows used strictly for interactive states (hover) and prominent floating elements.

### Shadow Vocabulary
- **Resting state:** No shadow. Cards and inputs rely on subtle borders (1px solid #E2E8F0).
- **Hover state** (`shadow-md` / `shadow-lg`): Used when interacting with clickable cards or primary buttons.

### Named Rules
**The Flat Canvas Rule.** Surfaces are flat at rest. Depth is a response to interaction or a marker of floating UI (like modals or sticky navs), never a baseline decoration.

## Shapes

Soft but structural. The interface uses a mixed radius strategy: large sweeping corners for large structural cards (rounded-2xl) and sharper, utilitarian corners for interactive exam elements (rounded-sm) to keep the testing environment feeling precise.

## Components

Refined and restrained (subtle borders, minimal padding, quiet state changes).

### Buttons
- **Shape:** Large action buttons use rounded-lg (8px); compact utility buttons use rounded-sm (2px).
- **Primary:** Success Green background with white text.
- **Hover:** Lightens to #10B981 and occasionally uses a slight scale transform.
- **Secondary / Utility:** Dark Slate or outlined with subtle hover states.

### Cards / Containers
- **Corner Style:** rounded-2xl (16px) for dashboard bento boxes.
- **Background:** Pure Canvas (#FFFFFF) against the Warm Canvas background.
- **Border:** 1px solid #E2E8F0.
- **Hover:** Elevates slightly (shadow-lg) and sometimes reveals an accent border.

### Exam Options (Inputs)
- **Style:** Flex containers with rounded-sm, standard border.
- **Focus/Selected:** Changes background to a pale green tint (bg-isc2-green/5) and highlights the border with Success Green.
- **Practice Feedback:** Changes to a red tint and border if incorrect.

## Do's and Don'ts

### Do:
- **Do** use Success Green (#00A859) exclusively for primary progression or correct states.
- **Do** rely on `rounded-sm` (2px) in the exam session to maintain a focused, rigorous feel.
- **Do** use ample whitespace in dashboards to prevent cognitive overload.

### Don't:
- **Don't** add shadows to resting elements; use borders to define boundaries.
- **Don't** use Deep Blue (#002D62) for primary calls to action (keep it for branding).
- **Don't** clutter the exam view with unnecessary decorative elements.
