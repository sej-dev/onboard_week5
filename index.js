import Guage from "./src/Guage.js";
import RandomCheckbox from "./src/RandomCheckbox.js";

const guageChart = new Guage({
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