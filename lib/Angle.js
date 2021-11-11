/** 원의 각도 관련 유틸 클래스 */
class Angle{
    
    static CIRCUMFERENCE = 2 * Math.PI;

    /**
     * degree를 radian으로 변환
     * @param  {array} degrees 
     * @returns {number|array} 인자가 1개인 경우 변환 값 반환, 인자가 여러 개인 경우 변환 배열 반환
     */
    static getRandianFromDegree(...degrees){
        if(degrees.length === 1) return degrees[0] * Math.PI / 180;

        return degrees.map(degree => degree * Math.PI / 180);
    }

    /**
     * radian을 degree로 변환
     * @param  {array} radians 
     * @returns {number|array} 인자가 1개인 경우 변환 값 반환, 인자가 여러 개인 경우 변환 배열 반환
     */
    static getDegreeFromRadian(...radians){
        if(radians.length === 1) return radians[0] * 180 / Math.PI;

        return radians.map(radian => radian * 180 / Math.PI);
    }

}

export default Angle;