// 获取随机数字
function getRand(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
// 获取随机字符
function getStr() {
    var arrStr = [];
    var arrRand = [];
    // 生成26个字母   
    for (var i = 97; i < 97 + 26; i++) {
        arrStr.push(String.fromCharCode(i));
    }
    // 生成随机数
    for (var i = 0; i < getRand(3, 7); i++) {
        // 0~25之间
        var index = getRand(0, 26);
        arrRand.push(arrStr[index]);
    }
    return arrRand.join('');
}
// 获取多个随机坐标
function coordinate(map) {
    var mapWidth = map.clientWidth;
    var arr = new Array(3);
    var i = 0;
    while (i < arr.length) {
        // 找不到赋值
        arr[i] = new Object();
        var x = getRand(0, mapWidth - 50);
        var y = getRand(50, 300);
        if (arr.indexOf(x) == -1) {
            arr[i].x = x;
            arr[i].y = -y;
            i++;
        }
    }
    return arr;
}
// 动画函数
function animaTion(obj, target, callback) {
    // 清除之前调用函数时的定时器
    clearInterval(obj.timer);
    var step = 1;
    obj.timer = setInterval(function () {
        // 如果到了指定的距离停止定时器    
        if (obj.offsetTop >= target) {
            clearInterval(obj.timer);
            // 执行回调函数
            callback && callback();
        }
        // 移动盒子：当前位置 + 步长
        obj.style.top = obj.offsetTop + step + 'px';
    }, 15);
}
// 生成文字
function createText(map) {
    var arrText = coordinate(map);
    for (var i = 0; i < arrText.length; i++) {
        var text = document.createElement('div');
        text.className = 'text';
        text.style.left = arrText[i].x + 'px';
        text.style.top = arrText[i].y + 'px';
        text.innerHTML = getStr();
        animaTion(text, 500);
        map.appendChild(text);
    }
}
// 获取只在map里显示的方块并返回所有方块
function getTextAll(map) {
    var textAll = map.querySelectorAll('.text');
    var arrText = [];
    for (var i = 0; i < textAll.length; i++) {
        if (textAll[i].offsetTop > -20 && textAll[i].offsetTop < 500) {
            arrText.push(textAll[i]);
        }
    }
    return arrText;
}
// 遍历数组，如果有相同的字符减去相同的的字符，如果为空清除方块
//  (1) 删除头一个字符
function clearChar(str) {
    var arr = [];
    for (var i = 1; i < str.length; i++) {
        arr.push(str[i]);
    }
    return arr.join('');
}
function clearText(textAll, char, info) {
    if (textAll.length == 0) return -1;
    for (var i = 0; i < textAll.length; i++) {
        var flag = false; // 假没有相同的,一直循环 
        var textStr = textAll[i].innerHTML;
        var count = 3; // 有三次机会打错
        for (var j = 0; j < textStr.length;) {
            if (textStr[0] == char) {
                // 只在页面中找到相同的就不要i循环了
                flag = true;
                textAll[i].innerHTML = clearChar(textStr);
                if (textAll[i].innerHTML == '') {
                    textAll[i].remove();
                    info.score++;
                    info.niganma.play();
                }
                j++;
            }
            else { // 第i个第一个字符不相同进行下方格来判断
                count--;
                if (count == 0) break;
            }
        }
        // 有相同的
        if (flag) return;
    }
}

window.addEventListener('load', function () {
    // 获取元素
    var map = document.querySelector('.map');
    var menu = document.querySelector('.menu');
    var bg = document.querySelector('.bg');
    var fenshu = document.querySelector('.fenshu');
    // 定义变量
    var info = {
        grade: [true, 50, 150, 200, 300, 500], // 速度的等级
        nowGrade: 1, // 当前的等级
        score: 0, // 得分
        speed: 10000, // 定时器的开启时间
        niganma: new Audio('audio/你干嘛.mp3'), // 加载音频
        ji: new Audio('audio/鸡.mp3') // 加载音频
    }; // 分数;
    // 生成随机的方块
    createText(map);
    var timerCreateText = setInterval(openText, info.speed);
    // 每过1秒计算是否有超出map的text，有就游戏结束
    var timerClearText = setInterval(closeText, 1000);
    // 要给定时器添加的个函数
    function closeText() {
        var div = document.querySelectorAll('div');
        for (var i = 0; i < div.length; i++) {
            if (div[i].offsetTop >= 480) {
                map.innerHTML = '';
                var menu = document.querySelector('.menu');
                menu.style.display = 'block';
                bg.style.display = 'block';
                clearInterval(timerCreateText);
                clearInterval(timerClearText);
                return;
            }
        }
    }
    function openText() {
        createText(map);
    }
    // 给文档添加键事件
    document.addEventListener('keypress', function (e) {
        // 获取只在map里显示的方块并返回所有方块
        var textAll = getTextAll(map);
        // 遍历数组，如果有相同的字符减去相同的的字符，如果为空清除方块
        clearText(textAll, e.key, info);
        fenshu.children[0].innerHTML = info.score;
        // 分数如果等于10,就减短定时器开启时间
        if (info.grade[0] && info.score == info.grade[info.nowGrade]) {
            if (info.nowGrade >= 5) info.grade[0] = false;
            info.speed -= 1000;
            info.nowGrade++;
            clearInterval(timerCreateText)
            timerCreateText = setInterval(openText, info.speed);
        }
    });
    // 点击菜单重新开始
    var restart = menu.children[0];
    var over = menu.children[1];
    restart.addEventListener('click', function () {
        // 菜单消失
        menu.style.display = 'none';
        bg.style.display = 'none';
        info.score = 0;
        fenshu.children[0].innerHTML = info.score;
        // 生成随机的方块
        createText(map);
        timerCreateText = setInterval(openText, 10000);
        // 每过1秒计算是否有超出map的text，有就游戏结束
        timerClearText = setInterval(closeText, 1000);
    });
    over.addEventListener('click', function () {
        location.href = 'http://ujbj.space3v.work/';
    });
});