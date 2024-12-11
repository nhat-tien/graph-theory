
export const Tooltip = {
   mounted(el :HTMLElement, binding: any) {
    const tooltipElementHTMLString = `
      <div style="width: max-content; background-color: #fff; color: #000; font-size: 0.8rem; padding: 0.2em 0.5em; border-radius: 5px; border: 1px solid hsl(153, 47%, 60%)">
          ${binding.value ?? ""}
      </div>
    `
    let tooltip =  document.createElement("div");
    tooltip.innerHTML = tooltipElementHTMLString.trim();
    tooltip.style.position = "absolute";
    tooltip.style.animation = "appear 0.2s linear";
    switch (binding.arg) {
      case "top":
        tooltip.style.top = "-100%";
        tooltip.style.left= "50%";
        tooltip.style.transform= "translateX(-50%)";
        break;
      case "bottom":
        tooltip.style.top = "-100%";
        tooltip.style.left= "0";
        break;
      case "right": 
        tooltip.style.top = "0";
        tooltip.style.left= "100%";
        break;
      case "left": 
        tooltip.style.top = "0";
        tooltip.style.left= "-100%";
        break;
    }

    const handleMouseEnter = () => {
      el.style.position = "relative";
      el.appendChild(tooltip);
    };

    const handleMouseLeave = () => {
      el.style.position = ''; 
      el.removeChild(tooltip);
    };

    el.addEventListener("mouseenter",handleMouseEnter);
    el.addEventListener("mouseleave",handleMouseLeave);
  },
}
