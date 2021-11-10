/** 랜덤 데이터 체크박스 컴포넌트 */
class RandomCheckbox{
    /**
     * 
     * @param {object} obj
     * @param {Element} obj.$parent - 부모 엘리먼트
     * @param {function} obj.onChange - change 이벤트 리스너
     */
    constructor({ $parent, onChange }){

        this.$parent = $parent;

        this.$self = document.createElement('div');
        this.$self.className = 'simulate';

        const $input = document.createElement('input');
        $input.type = 'checkbox'
        $input.id = 'chk-simulate';
        
        const $label = document.createElement('label');
        $label.for = 'chk-simulate';
        $label.innerText = '랜덤 데이터 생성';

        this.$self.appendChild($input);
        this.$self.appendChild($label);

        $parent.appendChild(this.$self);
        
        this.$self.addEventListener('change', onChange);
    }

}

export default RandomCheckbox;