function throttle(callback, time) {
    
    let throttlePause = false;
    
    return () => {

        if(throttlePause) return;
        
        throttlePause = true;
        
        setTimeout(() => {
            
            callback();
            throttlePause = false;
        }, time);
    }
}

export default throttle;

