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
function coordinate() {
    var mapWidth = map.clientWidth;
    var arr = new Array(3);
    var i = 0;
    while (i < arr.length) {
        // 找不到赋值
        var x = getRand(0, mapWidth - 50);
        var y = getRand(50, 200);
        if (arr.indexOf(x) == -1) {
            // arr[i].x = x;
            // arr[i].y = y;
            i++;
        }
    }
    return arr;
}
// 生成文字
function createText() {
    var arrText = coordinate();
    for (var i = 0; i < arrText.length; i++) {
        var text = document.createElement('div');
        text.className = 'text';
        text.style.left = arrText[i] + 'px';
        text.innerHTML = getStr();
        map.appendChild(text);
    }
}


window.addEventListener('load', function () {
    var map = document.querySelector('.map');
    console.log(coordinate());
    createText();
    console.log(getStr());
});