/** 원의 각도 관련 유틸 클래스 */
class Angle{
    
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

    /**
     * canvas의 arc 메서드의 startAngle이 0 radian이 아니기 때문에 해당 호를 회전해 startAngle이 0 radian에서 시작하도록 보정
     * 보정한 상태에서 인자가 어떤 값을 가지는지 계산해 리턴
     * @param {number} radian - 변환하고자 하는 radian
     * @param {number} radianRotated - startAngle radian
     * @returns 
     */
    static normalizeRadian(radian, radianRotated = 0){
        return radian - radianRotated;
    }

}

export default Angle;