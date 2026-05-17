# Gravity Switch Design System

## Color Palette

### Primary Colors
- **Accent Cyan**: `#00e5ff` - Primary interactive elements, highlights
- **Accent Purple**: `#8b5cf6` - Secondary accents, gradients
- **Accent Pink**: `#ec4899` - Alternative highlights
- **Accent Amber**: `#f59e0b` - Warnings, warnings states

### Neutral Colors
- **Dark 900**: `#0a0e27` - Page backgrounds, dark surfaces
- **Dark 800**: `#1a1f3a` - Cards, containers
- **Dark 700**: `#2d3561` - Input backgrounds
- **Dark 600**: `#3f4680` - Hover states
- **White**: `#ffffff` with opacity variants (100%, 60%, 40%, etc.)

## Typography

### Heading Hierarchy
```
h1: 4xl bold (36px) - Page titles
h2: 3xl bold (30px) - Section titles  
h3: 2xl bold (24px) - Subsection titles
h4: xl bold (20px) - Card titles
p:  base (16px) - Body text
small: sm (14px) - Captions, metadata
```

### Usage Guidelines
- Use cyan accents for primary CTAs
- Use white for body text on dark backgrounds
- Maintain 1.4-1.6 line height for readability
- Always use accessible color contrast (WCAG AA minimum)

## Component Library

### Button States
- **Primary**: Cyan background, dark text, hover with cyan glow shadow
- **Secondary**: Dark background, white text, bordered, hover brightens
- **Outline**: Transparent with cyan border
- **Ghost**: No background, text only, subtle hover

### Button Sizes
- **sm**: 40px height, 12px horizontal padding
- **md**: 44px height, 16px horizontal padding (recommended for mobile)
- **lg**: 48px height, 24px horizontal padding
- **xl**: 56px height, 32px horizontal padding

### Card Variants
- **Default**: Dark 800 background, subtle border, dark shadow
- **Interactive**: Includes hover state with brighter colors and larger shadow

### Input Styling
- **Focus**: Cyan border with ring effect
- **Error**: Red border with red ring, error text below
- **Disabled**: Reduced opacity, no pointer events

### Badge Variants
- **Primary**: Cyan background with opacity, cyan text
- **Success**: Green background with opacity, green text
- **Danger**: Red background with opacity, red text
- **Warning**: Amber background with opacity, amber text

## Animations

### Timing
- Fast transitions: 150ms (hover states, small changes)
- Standard transitions: 200ms (color changes, slight movements)
- Page transitions: 300ms (fade in)
- Slide animations: 400ms (from off-screen)

### Easing Functions
- **ease-out**: For entrance animations (decelerate)
- **ease-in-out**: For smooth, natural motion
- **ease-in**: For exit animations (accelerate)
- **linear**: For continuous animations (spinners, pulses)

### Available Animations
```css
animate-fade-in        /* 300ms opacity 0 → 1 */
animate-slide-up       /* 400ms translate Y 20px → 0, opacity fade */
animate-slide-down     /* 400ms translate Y -20px → 0, opacity fade */
animate-glow-pulse     /* Infinite cyan glow pulse */
animate-float          /* Subtle floating motion */
animate-spin-slow      /* Slow 3s rotation */
```

## Spacing Scale (8px grid)

```
p-1: 4px    p-2: 8px   p-3: 12px   p-4: 16px
p-5: 20px   p-6: 24px  p-7: 28px   p-8: 32px
p-12: 48px  p-16: 64px
```

## Shadow System

### Card Shadows
- **shadow-card**: Default card shadow (subtle)
- **shadow-card-hover**: Elevated hover shadow
- **shadow-glow-sm**: Small cyan glow
- **shadow-glow-md**: Medium cyan glow (recommended)
- **shadow-glow-lg**: Large cyan glow (use sparingly)

## Responsive Breakpoints

```
mobile:  < 640px   (sm: 640px)
tablet:  640px-1024px (md: 768px, lg: 1024px)
desktop: > 1024px  (xl: 1280px, 2xl: 1536px)
```

### Mobile-First Approach
1. Design for mobile first
2. Use `md:`, `lg:` prefixes for larger screens
3. Touch targets minimum 44x44 pixels on mobile
4. Stack vertically on mobile, side-by-side on desktop

## Component Patterns

### Card Pattern
```tsx
<Card variant="interactive" padding="md">
  <h3 className="font-semibold text-white">Title</h3>
  <p className="text-sm text-white/60">Content</p>
</Card>
```

### Button Pattern
```tsx
<Button 
  variant="primary"
  size="md"
  isLoading={isLoading}
  onClick={handleClick}
>
  Click me
</Button>
```

### Badge Pattern
```tsx
<Badge variant="success" size="md">
  Active
</Badge>
```

### Input Pattern
```tsx
<Input
  label="Username"
  placeholder="Enter username"
  error={error}
  disabled={isDisabled}
  onChange={handleChange}
/>
```

## Accessibility Standards

- ✅ WCAG AA compliance for color contrast
- ✅ Minimum 44x44px touch targets on mobile
- ✅ Focus visible states on all interactive elements
- ✅ Semantic HTML (use appropriate heading levels)
- ✅ ARIA labels for icons and hidden content
- ✅ Proper form labels associated with inputs
- ✅ Keyboard navigation support
- ✅ Screen reader friendly

## Dark Mode Optimization
- All backgrounds use dark colors (900-700)
- All text uses white with opacity for hierarchy
- Cyan accents provide sufficient contrast
- Hover states are subtle but clear

## Performance Considerations
- Use Tailwind's built-in utilities (no custom arbitrary values)
- Limit animations to entrance/exit and hover states
- Use CSS transforms for animations (GPU accelerated)
- Avoid box-shadow on frequently animated elements

## Typography Stack
```css
font-family: Inter, ui-sans-serif, system-ui, -apple-system, 
             BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

## Next Steps
1. Review the implemented components in your pages
2. Adjust colors and spacing to match your brand
3. Test on real devices (especially mobile)
4. Collect user feedback on the new design
5. Document any custom component extensions

---

**Last Updated**: May 18, 2026
**Design Version**: 1.0
**Status**: Production Ready
