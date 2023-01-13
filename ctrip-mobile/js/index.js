window.addEventListener('load', function () {
    var focus = document.querySelector('.focus');
    var ul = focus.children[0];
    var ol = focus.children[1];
    var w = focus.offsetWidth;
    var index = 0;
    var timer = setInterval(function () {
        index++;
        ul.style.transition = 'All .3s';
        var translatex = -index * w;
        ul.style.transform = 'translateX(' + translatex + 'px)';
    }, 1000);
    // 等着过渡完成之后，再去判断 监听过渡完成的事件 transitionend
    ul.addEventListener('transitionend', function () {
        // 返回第一个图片，中间不要显示过渡
        if (index >= 3) {
            index = 0;
            ul.style.transition = '';
            var translatex = -index * w;
            ul.style.transform = 'translateX(' + translatex + 'px)';
        }
        // 如果手指拖动时会变成-index,把返回到第二张图片
        else if (index < 0) {
            index = 2;
            ul.style.transition = '';
            var translatex = -index * w;
            ul.style.transform = 'translateX(' + translatex + 'px)';
        }
        // 过渡完成后小圆点也要发生变化的
        //  获取类名并删除类名
        ol.querySelector('.current').classList.remove('current');
        //  ol里面子元素第index的元素添加类名
        ol.children[index].classList.add('current');
    });
    // 滑动轮播图
    var startX = 0;
    var moveX = 0;
    //  获取初始的手指坐标
    ul.addEventListener('touchstart', function (e) {
        startX = e.targetTouches[0].pageX;
        clearInterval(timer);
    });
    ul.addEventListener('touchmove', function (e) {
        // 手指移动的距离 = 移动后的距离 - 当前距离 
        moveX = e.targetTouches[0].pageX - startX;
        ul.style.transition = 'none';
        var translatex = -index * w + moveX;
        ul.style.transform = 'translateX(' + translatex + 'px)';
    });
    ul.addEventListener('touchend', function () {
        // 往左滑x为负 往右滑y为正
        if (Math.abs(moveX) > 50) {
            // 往右滑 右 - 左
            if (moveX > 0) {
                index--;
            }
            else {
                index++;
            }
            ul.style.transition = 'all .3s';
            var translatex = -index * w;
            ul.style.transform = 'translateX(' + translatex + 'px)';
        }
        else {
            ul.style.transition = 'none';
            var translatex = -index * w;
            ul.style.transform = 'translateX(' + translatex + 'px)';
        }
    });
    // 返回顶部
    var goBack = document.querySelector('.goBack');
    var nav = document.querySelector('.nav');
    // 事件: scroll 页面滚动事件
    // 页面被卷去的头部 window.pageYOffset
    window.addEventListener('scroll', function () {
        if (window.pageYOffset >= nav.offsetTop) {
            goBack.style.display = 'block';
        }
        else {
            goBack.style.display = 'none';
        }
    });
    goBack.addEventListener('click', function () {
        window.scroll(0, 0);
    });
})