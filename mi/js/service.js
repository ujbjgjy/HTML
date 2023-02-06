window.addEventListener('load', function () {
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
    var focus = document.querySelector('.promotion');
    var container = focus.querySelector('.container');
    var dot = focus.querySelector('.promotion_dot');
    console.log(dot);
    var i = 0;
    // 自定义属性
    // 动态生成圆点
    for (i = 0; i < container.children.length; i++) {
        var div = document.createElement('div');
        div.setAttribute('index', i);
        dot.appendChild(div);
    }
    dot.children[0].className = 'yuan_bg';
    var first = container.children[0].cloneNode(true);
    container.appendChild(first);
    var num = 0;
    for (i = 0; i < dot.children.length; i++) {
        dot.children[i].addEventListener('click', function () {
            for (var j = 0; j < dot.children.length; j++) {
                dot.children[j].className = '';
            }
            this.className = 'yuan_bg';
            num = this.getAttribute('index');
            animaTion(container, -num * focus.offsetWidth);
            console.log(num);
        });
    }
    this.setInterval(function () {
        if (num == container.children.length - 1) {
            num = 0;
            container.style.left = 0;
        }
        for (i = 0; i < dot.children.length; i++) {
            dot.children[i].className = '';
        }
        if (num == dot.children.length) {
            dot.children[num - 1].className = 'yuan_bg';
        }
        else {
            dot.children[num].className = 'yuan_bg';
        }
        num++;
        animaTion(container, -num * focus.offsetWidth);
    }, 5000);
})