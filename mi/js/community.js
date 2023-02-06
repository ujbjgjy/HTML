window.addEventListener('load', function () {
    function animate(obj, target, callback) {
        // 只保留一个定时器
        clearInterval(obj.timer);
        obj.timer = setInterval(function () {
            // 结束条件
            if (obj.offsetLeft == target) {
                clearInterval(obj.timer);
                // 回调函数
                callback && callback();
            }
            // 把剩余的距离分十份做步长
            var step = (target - obj.offsetLeft) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            obj.style.left = obj.offsetLeft + step + 'px';
        }, 15);
    }
    var wrap = document.querySelector('.main-poster-wrap');
    var poster = document.querySelector('.main-poster');
    var wrapWidth = wrap.offsetWidth;
    var num = 0;
    // 生成小圆点
    var dots = document.querySelector('.main-poster-dot');
    for (var i = 0; i < poster.children.length; i++) {
        var dot = document.createElement('li');
        dot.className = 'dot';
        dot.setAttribute('index', i);
        dots.appendChild(dot);
    }
    dots.children[0].classList.add('current');
    // 点击小圆点
    for (var i = 0; i < dots.children.length; i++) {
        dots.children[i].addEventListener('click', function () {
            for (var j = 0; j < dots.children.length; j++) {
                dots.children[j].classList.remove('current');
            }
            this.classList.add('current');
            num = this.getAttribute("index");
            animate(poster, -num * wrapWidth);
        });
    }
    // 轮播图
    var first = poster.children[0].cloneNode(true);
    poster.appendChild(first);
    function rotation() {
        // 移动到最后一张(也就是克隆的第一图片)，来瞬间切到第一张
        if (num == poster.children.length - 1) {
            num = 0;
            poster.style.left = 0;
            dots.children[num].classList.add('current');
        }
        num++;
        animate(poster, -num * wrapWidth);
        console.log(dots.children.length);
        for (var i = 0; i < dots.children.length; i++) {
            dots.children[i].classList.remove('current');
        }
        if (num > 1) dots.children[0].classList.add('current');
        else dots.children[num].classList.add('current');
    }
    var timer = setInterval(rotation, 5000);
    // // 鼠标悬停时停止轮播图
    // wrap.addEventListener('mouseenter', function () {
    //     clearInterval(timer);
    // });
    // wrap.addEventListener('mouseleave', function () {
    //     timer = setInterval(rotation, 2000);
    // });
})