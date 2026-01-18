import { useEffect, useState } from 'preact/hooks';
import { html } from 'htm/preact';
import { hooks } from '@/utils/hooks.js';

export default function AvatarList() {
    const [robotIds, setRobotIds] = useState([]);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    useEffect(() => {
        const ids = Array.from({ length: 5 }, (_, i) => i + 1).sort(() => Math.random() - 0.5);
        setRobotIds(ids);
    }, []);

    const avatars = [
        { src: "/images/tobias-schmidt-avatar.64x64.webp", alt: "Tobias Schmidt" },
        ...robotIds.slice(0, 4).map(id => ({ src: `/images/robots/robot-portrait-${id}.64x64.webp`, alt: "Robot" }))
    ];

    return html`
        <div
            style=${hooks({ display: 'flex', width: 'fit-content' })}
            onMouseLeave=${() => setHoveredIndex(null)}
        >
             ${avatars.map((avatar, index) => {
                 const isHovered = hoveredIndex === index;
                 const isAnyHovered = hoveredIndex !== null;
                 const isOtherHovered = isAnyHovered && !isHovered;

                 return html`
                    <img
                        src=${avatar.src}
                        alt=${avatar.alt}
                        width="64"
                        height="64"
                        style=${hooks({
                            width: "calc(0.85 * var(--x-3))",
                            height: "calc(0.85 * var(--x-3))",
                            borderRadius: "50%",
                            border: "var(--border)",
                            backgroundColor: "var(--color-surface)",
                            objectFit: "cover",
                            position: "relative",
                            zIndex: isHovered ? "calc(var(--z-500) + 1)" : `calc(var(--z-500) - ${index})`,
                            marginInlineStart: index > 0 ? "calc(-0.25 * var(--x-3))" : "0",
                            transition: "filter var(--t-1) ease, opacity var(--t-1) ease, scale var(--t-2) ease, translate var(--t-3) ease",
                            scale: isHovered ? "1.15" : "1",
                            filter: isOtherHovered ? "blur(5px)" : "none",
                            opacity: isOtherHovered ? "0.85" : "1",
                        })}
                        onMouseEnter=${() => setHoveredIndex(index)}
                    />
                 `;
             })}
        </div>
    `;
}
