const filters = document.querySelector("[data-project-filters]");

if (filters) {
    const buttons = Array.from(filters.querySelectorAll("[data-filter]"));
    const projects = Array.from(document.querySelectorAll("[data-category]"));
    const status = filters.querySelector("[role='status']");

    function showProjects(selected) {
        let visibleCount = 0;

        for (const project of projects) {
            project.hidden = selected !== "all" && project.dataset.category !== selected;
            if (!project.hidden) visibleCount += 1;
        }

        for (const button of buttons) {
            button.setAttribute("aria-pressed", String(button.dataset.filter === selected));
        }

        status.textContent = visibleCount === 1 ? "1 project" : visibleCount + " projects";
    }

    for (const button of buttons) {
        button.addEventListener("click", () => showProjects(button.dataset.filter));
    }

    showProjects("all");
    filters.hidden = false;
}

const portrait = document.querySelector("[data-portrait]");
const portraitEffects = matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");

if (portrait && portraitEffects.matches) {
    const image = portrait.querySelector("img");
    const lens = image.cloneNode();
    lens.className = "portrait-lens";
    lens.alt = "";
    lens.setAttribute("aria-hidden", "true");
    lens.removeAttribute("fetchpriority");
    portrait.append(lens);

    portrait.addEventListener("pointermove", (event) => {
        if (event.pointerType !== "mouse" || !portraitEffects.matches) return;
        const bounds = portrait.getBoundingClientRect();

        portrait.style.setProperty("--lens-x", (event.clientX - bounds.left) + "px");
        portrait.style.setProperty("--lens-y", (event.clientY - bounds.top) + "px");
        portrait.setAttribute("data-lens-active", "");
    }, { passive: true });

    portrait.addEventListener("pointerleave", () => portrait.removeAttribute("data-lens-active"));
}
