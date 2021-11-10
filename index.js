import Guage from "./src/Guage.js";
import RandomCheckbox from "./src/RandomCheckbox.js";

window.addEventListener('DOMContentLoaded', () => {
    const guages = [];
    const $app = document.querySelector("#app");
    for (let i = 0; i < 20; i++) {
        guages.push( new Guage({ $parent: $app }) );
    }
    
    const randomCheckbox = new RandomCheckbox({
        $parent: document.querySelector('#app'),
        onChange: (evt) => {
            const isSimulateMode = evt.target.checked;
            if(isSimulateMode) guages.forEach(guage => guage.startSimulate());
            else guages.forEach(guage => guage.startSimulate());
        }
    });
});
