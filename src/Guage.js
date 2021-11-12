import Angle from "../lib/Angle.js";
import Point from "../lib/Point.js";


/** 게이지 차트 컴포넌트 */
class Guage{

    /**
     * 
     * @param {object} obj
     * @param {Element} obj.$parent - 부모 엘리먼트
     */
    constructor({ $parent }){
        
        this.$parent = $parent;

        this.$canvas = document.createElement('canvas');
        $parent.appendChild(this.$canvas);

        this.ctx = this.$canvas.getContext('2d');

        // 차트에서 사용되는 field
        this.chart = {
            center: null, // 원점 x좌표, y좌표
            radius: null, // 반지름

            degree: {
                START: 45,
                MID: 270,
                END: 135,
                TOTAL: 360 - (135 - 45),
            },
            radian: {
                START: null, // 캔버스 arc 메서드 인자로 사용되는 시작 radian
                END: null, // 캔버스 arc 메서드 인자로 사용되는 끝 radian
                TOTAL: null, // 270도 radian으로 환산한 값

                mid: null, // 다음 frame에 도착해야 하는 radian(점진적인 움직임을 위해)
                target: null, // 1초 후에 도착해야 하는 radain
            },
        };

        // requestAnimationFrame에서 사용되는 field
        this.raf = {
            id: null, 
            timestamp: 0,
            radianDiff: 0, // 현재 radian에서 얼마만큼 더 움직여야 하는지에 대한 radian
        };

        this.setCanvasSize();
        this.setAntiAliasing();

        this.initChart();
        this.setChartRadian();
        
        window.addEventListener('resize', this.onResize);

        this.render();
    }

    /**
     * 부모의 크기만큼 canvas 사이즈 지정
     */
    setCanvasSize(){

        this.$canvas.style.width = `${this.$parent.clientWidth}px`;
        this.$canvas.style.height = `${this.$parent.clientHeight}px`;
    }

    /**
     * 안티 앨리어싱 적용
     */
    setAntiAliasing(){

        const dpr = window.devicePixelRatio;
        const { width, height } = this.$canvas.style;
    
        this.$canvas.width = parseInt(width.replace('px')) * dpr;
        this.$canvas.height = parseInt(height.replace('px')) * dpr;

        this.ctx.scale(dpr, dpr);
    }

    /**
     * 게이지 차트에 사용되는 원의 중심 좌표, 반지름 정의
     */
    initChart(){

        const canvasWidth = this.$canvas.width;
        const canvasHeight = this.$canvas.height;

        this.chart.center = new Point(parseInt(canvasWidth / 2), parseInt(canvasHeight / 2));

        // 가로, 세로 길이 중 짧은 길이를 기준으로 반지름 정의
        const minSize = canvasHeight > canvasWidth ? canvasWidth : canvasHeight;
        this.chart.radius = parseInt(minSize / 7);
    }

    /**
     * degree로 정의되어 있는 각도를 radian으로 변경
     */
    setChartRadian(){

        const [START, MID, END, TOTAL] = Angle.getRandianFromDegree(
            this.chart.degree.START,
            this.chart.degree.MID, 
            this.chart.degree.END,
            this.chart.degree.TOTAL,
        );
        
        this.chart.radian = {
            START,
            END,
            TOTAL,
            mid: MID, 
            target: MID,
        };
    }

    /**
     * 리사이즈 시 차트 사이즈 재조정
     */
    onResize = () => {
        
        this.setCanvasSize();
        this.setAntiAliasing();
        
        this.initChart();
        
        this.render();
    }

    /**
     * 랜덤 데이터로 시뮬레이션 시작
     * @param {number} timestamp - requestAnimationFrame 사용 시 넘어오는 타임스탬프(단위: 밀리세컨즈)
     */
    startSimulate = (timestamp = 1000) => {
        
        const timeDiff = timestamp - this.raf.timestamp;
        
        // 1초가 지나면 새로운 radian 생성
        if(timeDiff >= 1000){
            // -30도 <= x < 30도 사이의 radian
            this.raf.radianDiff = Angle.getRandianFromDegree((Math.random() - 0.5) * 60);
            this.raf.timestamp = timestamp;
            
            // 목표로 움직일 새로운 radian
            let radianTarget = this.raf.radianDiff + this.chart.radian.mid;

            // 목표 radian이 2*PI 값보다 커졌을 경우가 존재하기 때문 
            radianTarget %= Angle.RADIAN_CIRCUMFERENCE;
            
            // 시작 radian <= x <= 끝 radian일 때, 게이지 차트를 벗어나기 때문에 종료
            if(radianTarget >= this.chart.radian.START && radianTarget <= this.chart.radian.END) {
                this.stopSimulate();
                return;
            }
            this.chart.radian.target = radianTarget;
        }
        // 새로운 radian을 생성한 후 바로 게이지 바를 움직이면 7-b 요구사항에 맞지 않는 것 같아 0.3초 이후부터 게이지 바를 움직이도록 정의
        else if(this.raf.radianDiff !== 0){
            
            // 0.01 radian(= 0.05... degree) 미만으로 움직여야 하는 경우 
            const isRemainSmall = Math.abs(this.raf.radianDiff) > 0 && Math.abs(this.raf.radianDiff) < 0.01;
            if(isRemainSmall) {
                this.chart.radian.mid += this.raf.radianDiff;
                this.raf.radianDiff = 0;
            }
            // 0.01 radian 이상일 때
            else{
                // 점진적으로 움직이는 모습을 위해 각 frame마다 간격 조절
                const move = Math.abs(timeDiff / 1000) * this.raf.radianDiff; 
                this.chart.radian.mid += move;
                this.raf.radianDiff -= move;
            } 
        }

        this.render();
        
        this.raf.id = requestAnimationFrame(this.startSimulate);
    }

    /**
     * 시뮬레이션 중지
     */
    stopSimulate() {
        cancelAnimationFrame(this.raf.id);
    }

    /**
     * 총 radian에서 현재 어느 정도 차지하는지에 대한 퍼센트 값을 계산
     * @returns {number} 퍼센트 값
     */
    calcPercent(){
        const current = (this.chart.radian.target + Angle.RADIAN_CIRCUMFERENCE - this.chart.radian.END ) % Angle.RADIAN_CIRCUMFERENCE;
        const percent = (current / this.chart.radian.TOTAL * 100).toFixed(1);
        return percent;
    }

    /**
     * canvas에 게이지 차트 렌더링
     */
    render(){
        
        this.ctx.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
        
        // 회색 호 - 크기 고정
        this.ctx.beginPath();
        this.ctx.lineWidth = parseInt(this.chart.radius/2);
        this.ctx.strokeStyle = 'lightgrey';
        this.ctx.arc(this.chart.center.x, this.chart.center.y, this.chart.radius, this.chart.radian.START, this.chart.radian.END, true);
        this.ctx.stroke();

        // 노란색 호 - 크기 유동적
        this.ctx.beginPath();
        this.ctx.strokeStyle = 'yellow';
        this.ctx.arc(this.chart.center.x, this.chart.center.y, this.chart.radius, this.chart.radian.mid, this.chart.radian.END, true);
        this.ctx.stroke();

        const percent = this.calcPercent();

        // 숫자 텍스트
        this.ctx.font = `800 ${this.chart.radius/2}px sans-serif`;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(percent, this.chart.center.x, this.chart.center.y);
        
        this.ctx.font = `600 ${this.chart.radius/4}px sans-serif`; 
        this.ctx.fillText('percent', this.chart.center.x, this.chart.center.y + (this.chart.radius / 2));
                
        this.ctx.closePath();
    }
}

export default Guage;