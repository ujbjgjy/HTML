window.addEventListener('load', function () {
    var foucus = document.querySelector('.foucus');
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var num = 0;
    var circlenum = 0;
    // 获取图片宽度
    var foucusWidth = foucus.offsetWidth;
    // 当鼠标经过了foucus 就把箭头显示出
    foucus.addEventListener('mouseenter', function () {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer);
        timer = null;
    })
    foucus.addEventListener('mouseleave', function () {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        timer = setInterval(function () {
            // 手动调用点击事件
            arrow_r.click();
        }, 2000);
    })
    // 动态生成小圆点
    //  需要获取有多少图片
    var ul = foucus.querySelector('ul');
    var circle = foucus.querySelector('.circle');
    var i = 0;
    for (i = 0; i < ul.children.length; i++) {
        var li = document.createElement('li');
        circle.appendChild(li);
        // 添加索引号，用自定义属性
        li.setAttribute('index', i);
        // 给所有的小圆圈添加点击事件
        li.addEventListener('click', function () {
            // 在点击时清除掉之的类名
            for (var j = 0; j < circle.children.length; j++) {
                circle.children[j].className = '';
            }
            this.className = 'current';
            // 点击移动图片
            //  移动距离：索引号 * 图片宽度
            //  移动的是ul
            var index = this.getAttribute('index');
            num = circlenum = index;
            animaTion(ul, -index * foucusWidth);
        })
    }
    // 添加类名
    circle.children[0].className = 'current';
    // 复制节点
    var first = ul.children[0].cloneNode(true); // 深拷贝
    //  添加节点
    ul.appendChild(first);
    // 点击右箭头播放一张图
    //  播放一张图片 num+1
    var flag = true;
    arrow_r.addEventListener('click', function () {
        if (flag) {
            flag = false;
            // 判断如果到最后一张，重头播放
            //  只中间不会有变化 下标4 并且num变成0
            if (num == ul.children.length - 1) {
                num = 0;
                ul.style.left = 0;
            }
            // 0 + 1  
            num++;
            animaTion(ul, -num * foucusWidth, function () {
                flag = true;
            });
            // 圆圈变色
            //  清除之前的圆圈颜色
            //  不能用num 因为num会跳到复制的元素上
            for (var i = 0; i < circle.children.length; i++) {
                circle.children[i].className = '';
            }
            circlenum++;
            if (circlenum == circle.children.length) {
                circlenum = 0;
            }
            circle.children[circlenum].className = 'current';
        }
    })
    // 点击左箭头播放一张图
    //  播放一张图片 num - 1
    arrow_l.addEventListener('click', function () {
        if (flag) {
            flag = false;
            // 从4开始播放，4是第一，如果小于的话说明到了复制的图片要再重头播放
            // 左边最后一张是下标0, 所以第一张可以理解为最后一张
            if (num == 0) {
                // 重头播放 也就是4 下标3,num也要变成3
                num = ul.children.length - 1;
                ul.style.left = -num * foucusWidth + 'px';
            }
            // 4-1 
            num--;
            animaTion(ul, -num * foucusWidth, function () {
                flag = true;
            });
            // 圆圈变色
            //  清除之前的圆圈颜色
            //  不能用num 因为num会跳到复制的元素上
            for (var i = 0; i < circle.children.length; i++) {
                circle.children[i].className = '';
            }
            circlenum++;
            if (circlenum == circle.children.length) {
                circlenum = 0;
            }
            circle.children[circlenum].className = 'current';
        }
    })
    var timer = setInterval(function () {
        // 手动调用点击事件
        arrow_r.click();
    }, 2000);
});

// jQuery 
$(function () {
    let flag = true;
    let recomTop = $('.recom').offset().top;
    $(window).scroll(() => {
        if ($(document).scrollTop() >= recomTop) {
            $('.fixedtool').fadeIn();
        }
        else {
            $('.fixedtool').fadeOut();
        }
        if (flag) {
            $('.floor>div').each((i, ele) => {
                if ($(document).scrollTop() >= $(ele).offset().top) {
                    $('.fixedtool li').eq(i).addClass('current').siblings().removeClass('current');
                }
            });
        }
    });
    $('.fixedtool li').click(function () {
        flag = false;
        $(this).addClass('current').siblings().removeClass('current');
        let current = $('.floor>div').eq($(this).index()).offset().top;
        $('html, body').stop().animate({
            scrollTop: current
        }, () => {
            flag = true;
        });
    });
});