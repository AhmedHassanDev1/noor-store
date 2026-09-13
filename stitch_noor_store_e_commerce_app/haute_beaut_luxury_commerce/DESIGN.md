---
name: Haute Beauté Luxury Commerce
colors:
  surface: '#fff8f8'
  surface-dim: '#e4d7d9'
  surface-bright: '#fff8f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fef0f2'
  surface-container: '#f8ebed'
  surface-container-high: '#f3e5e7'
  surface-container-highest: '#eddfe1'
  on-surface: '#211a1c'
  on-surface-variant: '#554243'
  inverse-surface: '#362e30'
  inverse-on-surface: '#fbedef'
  outline: '#887173'
  outline-variant: '#dbc0c2'
  surface-tint: '#9f3d4d'
  primary: '#933344'
  on-primary: '#ffffff'
  primary-container: '#b24b5b'
  on-primary-container: '#ffecec'
  inverse-primary: '#ffb2ba'
  secondary: '#994250'
  on-secondary: '#ffffff'
  secondary-container: '#ff94a2'
  on-secondary-container: '#792938'
  tertiary: '#754a3e'
  on-tertiary: '#ffffff'
  tertiary-container: '#916255'
  on-tertiary-container: '#ffede8'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffd9dc'
  primary-fixed-dim: '#ffb2ba'
  on-primary-fixed: '#400010'
  on-primary-fixed-variant: '#802537'
  secondary-fixed: '#ffd9dc'
  secondary-fixed-dim: '#ffb2ba'
  on-secondary-fixed: '#400011'
  on-secondary-fixed-variant: '#7b2b39'
  tertiary-fixed: '#ffdbd1'
  tertiary-fixed-dim: '#f3b9aa'
  on-tertiary-fixed: '#31120a'
  on-tertiary-fixed-variant: '#653c31'
  background: '#fff8f8'
  on-background: '#211a1c'
  surface-variant: '#eddfe1'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 56px
    fontWeight: '400'
    lineHeight: 64px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 38px
    fontWeight: '400'
    lineHeight: 44px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 36px
    fontWeight: '500'
    lineHeight: 44px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 28px
    fontWeight: '500'
    lineHeight: 34px
    letterSpacing: 0em
  headline-md:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: 0em
  headline-sm:
    fontFamily: Playfair Display
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: 0em
  title-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: 0.01em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
    letterSpacing: 0.01em
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
    letterSpacing: 0.01em
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0.02em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.08em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.06em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-sm: 1rem
  margin: 2.5rem
  margin-mobile: 1.25rem
  space-xs: 0.375rem
  space-sm: 0.75rem
  space-md: 1.25rem
  space-lg: 2rem
  space-xl: 3rem
---

## Brand & Style
The design system delivers an editorial, high-end sensory experience tailored for luxury skincare, fragrance, and cosmetic clientele. The target audience values meticulous craftsmanship, clean formulations, and subtle indulgence. 

The aesthetic is grounded in **Warm Editorial Minimalism**: airy spatial compositions, delicate warm cream canvas tones, tactile rose and wine accents, and high-fashion editorial typographic hierarchy. It avoids visual clutter, heavy structural lines, or aggressive transactional cues in favor of tranquil white spaces, soft architectural layering, and gentle luminous depth reminiscent of cosmetic glass bottles and silk textures.

## Colors
The palette evokes botanical extracts, pressed petals, and refined cosmetic packaging:

- **Primary (`#B24B5B`)**: Soft Rose. Used for primary CTAs, key focal points, active state indicators, and signature branding.
- **Secondary (`#8F3A48`)**: Deep Rose-Wine. Used for hover states, focused editorial elements, and critical accents requiring higher contrast.
- **Tertiary (`#E0A899`)**: Delicate Rose Gold. Applied sparingly as metallic rim highlights, luxury badge surfaces, and focus rings.
- **Neutral (`#73696B`)**: Muted Mauve-Charcoal. Dedicated to secondary body copy, captions, and deactivated UI states.
- **Canvas & Surfaces**:
  - `canvas`: `#FAF7F2` (Warm, delicate alabaster cream).
  - `surface`: `#FFFFFF` (Crisp white for cards and structured panels).
  - `surface-tint`: `#FDF8F7` to `#F9ECEE` (Subtle blush washes for highlighted rows, chip fills, and subtle containers).
  - `border`: `#EFE4E5` (Whisper-thin, warm rose-tinted neutral separator).
  - `text-primary`: `#2A2426` (Dark velvety charcoal, preserving high contrast without harsh pure black).

## Typography
Typographic rhythm balances the haute-couture heritage of Playfair Display with the functional precision of Plus Jakarta Sans.

- **Headlines & Editorial Callouts**: Set in `Playfair Display` with natural sentence or title casing. Preserve optical kerning and tighter line heights for large display levels to maintain editorial polish.
- **Body & Operational Elements**: Set in `Plus Jakarta Sans` with relaxed leading for effortless reading across order logs, ingredient glossaries, and transaction details.
- **Labels, Badges, & Metadata**: Use uppercase tracking (`+0.06em` to `+0.08em`) on `label-sm` and `label-md` to mirror luxury beauty packaging taxonomy.

## Layout & Spacing
The layout employs an open, generous fluid-grid architecture across three breakpoints:

- **Desktop (1200px+)**: 12-column layout with `2.5rem` margins and `1.5rem` gutters. Admin surfaces utilize spacious multi-pane dashboard configurations with generous card interior padding (`space-lg`).
- **Tablet (768px - 1199px)**: 8-column layout with `2rem` margins and `1rem` gutters. Multi-column data panels collapse to stacked 4-column structures.
- **Mobile (Up to 767px)**: 4-column layout with `1.25rem` outer canvas margins and `1rem` gutters. Dense metric panels collapse into horizontal swipe carousels.

Spacing leans toward expansive breathing room: section divides honor `space-xl`, while related inputs and labels cluster tightly with `space-xs` and `space-sm`.

## Elevation & Depth
Depth is rendered through translucent light layering and diffused chromatic ambient drop shadows:

- **Base Level (Canvas)**: `#FAF7F2` sits flat as the foundational backdrop.
- **Level 1 (Cards & Data Panels)**: Crisp `#FFFFFF` surfaces layered with a low-opacity warm-wine ambient blur: `0 8px 30px -4px rgba(143, 58, 72, 0.05)`, encased in a delicate `1px solid #EFE4E5` rim.
- **Level 2 (Hover States, Floating Menus & Dropdowns)**: Elevated with `0 14px 38px -6px rgba(143, 58, 72, 0.08), 0 4px 12px -2px rgba(42, 36, 38, 0.03)`.
- **Level 3 (Modals & Drawers)**: Accompanied by a tinted scrim `rgba(42, 36, 38, 0.35)` with an 8px backdrop blur. Elevation shadow expands to `0 24px 48px -12px rgba(42, 36, 38, 0.16)`.
- **Rose-Gold Accents**: Subtle inset glazes (`inset 0 1px 0 rgba(224, 168, 153, 0.35)`) added to action buttons and featured cards create an unboxing feel.

## Shapes
Forms celebrate curvature without compromising structural order:
- Standard UI elements (cards, summary boxes, alert toasts) leverage `rounded-xl` (1.5rem / 24px) for an organic, modern luxury cosmetic contour.
- Interactive form controls (inputs, secondary buttons, select toggles) adopt `rounded-lg` (1rem / 16px).
- Status badges, category pills, and micro tags use full pill geometry (`rounded-full` / 9999px) to echo perfume flacon curves and compact powders.

## Components

### Buttons
- **Primary**: Solid `#B24B5B` fill with crisp `#FFFFFF` typography (`label-md`). Hover transitions smoothly to `#8F3A48` with a subtle elevation shift. Padding: `12px 24px`, radius: `rounded-lg`. An optional hairline inner highlight `inset 0 1px 0 rgba(255, 255, 255, 0.25)` imparts soft luster.
- **Secondary**: `#FDF8F7` blush background, `#B24B5B` text, and a `1px solid #EFE4E5` border. On hover, shifts to `#F9ECEE`.
- **Ghost**: Transparent fill, `#2A2426` text, underline accent in `#B24B5B` on hover.

### Chips & Badges
- Luxury SKU status pills, inventory chips, and tags use `rounded-full` contours.
- Standard Chip: `#FDF8F7` background, `#2A2426` text, and `#EFE4E5` border.
- Active/Featured Chip: `#F9ECEE` fill, `#8F3A48` text, `#B24B5B` micro-border.

### Cards
- Set on `#FFFFFF` with `rounded-xl` corners and `1px solid #EFE4E5` boundary.
- Generous internal padding (`space-lg`). Header zones separate with an ultra-fine border or float naturally using typographic hierarchy without rule lines.

### Input Fields & Controls
- **Text Inputs**: Height `48px`, `#FFFFFF` surface, `1px solid #EFE4E5` border, `rounded-lg`. Placeholder in `#73696B`. Focused state engages a soft ring: `0 0 0 3px rgba(178, 75, 91, 0.15)` with a `#B24B5B` border.
- **Checkboxes & Radios**: 20px diameter/width, `rounded-sm` for checkboxes, fully circular for radios. Inactive: `#FFFFFF` fill, `#EFE4E5` border. Active: `#B24B5B` fill with `#FFFFFF` check/dot mark.

### Data Tables & Product Listings
- Seamless horizontal borders using `#EFE4E5`.
- Alternating row selection or mouse-over state applies a whisper-light `#FDF8F7` wash.
- Header cells styled in `label-sm` with muted `#73696B` uppercase lettering.

### Luxury E-Commerce Specifics
- **Product Thumbnail Previewers**: Generous aspect ratio cards (3:4 or 1:1) framed in soft `#F9ECEE` backdrops to let bottle and packaging photography stand out.
- **Stock & Inventory Gauges**: Delicate 4px track bars in `#F9ECEE` with primary fills shifting gracefully from `#B24B5B` (healthy stock) to `#8F3A48` (reserve/limited collection).