// 动画函数
function animate(obj, target, callback) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        // 终止条件
        if (obj.offsetLeft == target) {
            // 停止动画
            clearInterval(obj.timer);
            // 回调函数
            callback && callback();
        }
        // 剩余路长分为十份
        var step = (target - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        obj.style.left = obj.offsetLeft + step + 'px';
    }, 15);
}
//排他思想
function exclusive(dots) {
    for (var i = 0; i < dots.children.length; i++) {
        dots.children[i].classList.remove('yuan_bg');
    }
}

window.addEventListener('load', function () {
    // 关闭通知
    (function closeNotify() {
        var notify = document.querySelector('.notify');
        var close = document.querySelector('.close-button');
        close.onclick = function () {
            notify.style.display = 'none';
        }
    }());

    // 轮播图
    (function rotation() {
        // 获取元素
        var focus = document.querySelector('.promotion'); // 焦点图
        var imgs = document.querySelector('.container');
        var dots = document.querySelector('.promotion_dot'); // 小点
        // 动态生成小点
        for (var i = 0; i < imgs.children.length; i++) {
            // 只是创建了元素，但是还得指添加的地方
            var dot = document.createElement('div');
            dot.setAttribute('index', i);
            dots.appendChild(dot);
            dot.addEventListener('click', function () {
                exclusive(dots);
                this.classList.add('yuan_bg');
                num = this.getAttribute('index');
                animate(imgs, -num * focusWidth);
            });
        }
        dots.children[0].classList.add('yuan_bg');
        // 播放图片
        var num = 0; // 通过num来播放图片
        var focusWidth = focus.offsetWidth;
        var firstImg = imgs.children[0].cloneNode(true);
        imgs.appendChild(firstImg);
        var playImg = setInterval(function () {
            if (num == imgs.children.length - 1) {
                num = 0;
                focus.offsetLeft = 0;
            }
            num++;
            animate(imgs, -num * focusWidth);
            exclusive(dots);
            dots.children[num % dots.children.length].classList.add('yuan_bg');
        }, 10000);
    }());

    // 底部模块
    (function footer() {
        var tab_list = document.querySelector('.wenti_tab_list');
        var itme = document.querySelectorAll('.wenti_tab_itme');
        for (var i = 0; i < tab_list.children.length; i++) {
            tab_list.children[i].setAttribute('index', i);
            tab_list.children[i].onmouseover = function () {
                for (var i = 0; i < tab_list.children.length; i++) {
                    tab_list.children[i].classList.remove('wenti_current');
                }
                this.classList.add('wenti_current');
                for (var i = 0; i < itme.length; i++) {
                    itme[i].style.display = 'none';
                }
                itme[this.getAttribute('index')].style.display = 'block';
            }
        }
    }());
});
