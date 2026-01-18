import { createHooks } from "@css-hooks/preact";

const selectors = [
  "&:hover",
  "&:active",
  "&:focus",
  "&:focus-visible",
  "@media (min-width: 100ch)",
  "@media (prefers-color-scheme: dark)",
];

export const { styleSheet, on } = createHooks(...selectors);

// Inject stylesheet
const sheet = new CSSStyleSheet();
sheet.replaceSync(styleSheet());
document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];

export function hooks(styles) {
    let finalStyle = {};
    for (const [key, value] of Object.entries(styles)) {
        if (key.startsWith('&') || key.startsWith('@')) {
            // It's a hook
            // on(key, value) returns a style object.
            const hookStyle = on(key, value);
            Object.assign(finalStyle, hookStyle);
        } else {
            // regular style
            finalStyle[key] = value;
        }
    }
    return finalStyle;
}
