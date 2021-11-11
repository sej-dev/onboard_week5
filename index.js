import Guage from "./src/Guage.js";
import RandomCheckbox from "./src/RandomCheckbox.js";

/**
 * 게이지 차트 컴포넌트와 체크박스 컴포넌트 생성한 후,
 * 체크박스 change 이벤트 발생 시 게이지 차트 시뮬레이션 상태 변경
 */
window.addEventListener('DOMContentLoaded', () => {
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
});
