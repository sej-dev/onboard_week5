import Guage from "./src/Guage.js";
import RandomCheckbox from "./src/RandomCheckbox.js";

window.addEventListener('DOMContentLoaded', () => {
    const guageChart = new Guage({
        $parent: document.querySelector("#app"),
    });
    new Guage({
        $parent: document.querySelector("#app"),
    });new Guage({
        $parent: document.querySelector("#app"),
    });new Guage({
        $parent: document.querySelector("#app"),
    });new Guage({
        $parent: document.querySelector("#app"),
    });new Guage({
        $parent: document.querySelector("#app"),
    });new Guage({
        $parent: document.querySelector("#app"),
    });new Guage({
        $parent: document.querySelector("#app"),
    });new Guage({
        $parent: document.querySelector("#app"),
    });new Guage({
        $parent: document.querySelector("#app"),
    });new Guage({
        $parent: document.querySelector("#app"),
    });new Guage({
        $parent: document.querySelector("#app"),
    });new Guage({
        $parent: document.querySelector("#app"),
    });new Guage({
        $parent: document.querySelector("#app"),
    });new Guage({
        $parent: document.querySelector("#app"),
    });
    
    
    const randomCheckbox = new RandomCheckbox({
        $parent: document.querySelector('#app'),
        onChange: (evt) => {
            const isSimulateMode = evt.target.checked;
            if(isSimulateMode) guageChart.startSimulate();
            else guageChart.stopSimulate();
        }
    });
});
