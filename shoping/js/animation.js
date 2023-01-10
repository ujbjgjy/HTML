function animaTion(obj, target, callback) {
    // 清除之前调用函数时的定时器
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        // 得到步长：(目标距离 - 当前距离) / 10 
        //  做缓速的效果 就是步长再不断变小
        var step = (target - obj.offsetLeft) / 10;
        // 如果是正数取大，如果负数取小
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        // 如果到了指定的距离停止定时器        
        if (obj.offsetLeft == target) {
            // 停止定时器
            clearInterval(obj.timer);
            // 执行回调函数
            //  如果参有函数调用
            if (callback) {
                callback();
            }
        }
        // 移动盒子：当前位置 + 步长
        obj.style.left = obj.offsetLeft + step + 'px';
    }, 15);
};