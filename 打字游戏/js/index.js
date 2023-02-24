// 随机生成数字
function getRand(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
// 生成随机字符
function getStr() {
    var arrStr = [];
    var arrRand = [];
    // 生成26个字母   
    for (var i = 97; i < 97 + 26; i++) {
        arrStr.push(String.fromCharCode(i));
    }
    // 生成随机数
    for (var i = 0; i < 5; i++) {
        // 0~25之间
        var index = getRand(0, 26);
        arrRand.push(arrStr[index]);
    }
    return arrRand;
}




window.addEventListener('load', function () {
    var str = getStr();
});