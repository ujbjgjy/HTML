window.addEventListener('load', function () {
    var map = document.querySelector('.map'); // 获取地图
    var nextLevel = document.querySelector('.Next-level-bg');
    var btnAgain = nextLevel.querySelector('.btn');
    var tips = document.querySelector(('.tips'));
    tips.flag = true;
    console.log(btnAgain);
    var info = {
        cle: 0, // 空地
        wall: 1, // 墙
        target: 2, // 目标
        box: 3, // 箱子
        fig: 4, // 人物
        boxTarget: 2 + 3,
        figTarget: 2 + 4,
        boxNum: 0,
        level: 0,
        x: 0,
        y: 0
    };
    var arrMap = [
        [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
            [0, 0, 0, 1, 2, 1, 0, 0, 0, 0],
            [1, 1, 1, 1, 3, 1, 1, 1, 0, 0],
            [1, 2, 0, 3, 4, 3, 2, 1, 0, 0],
            [1, 1, 1, 3, 1, 1, 1, 1, 0, 0],
            [0, 0, 1, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 1, 2, 1, 0, 0, 0, 0, 0],
            [0, 0, 1, 1, 1, 0, 0, 0, 0, 0]
        ],
        [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
            [0, 1, 0, 4, 2, 2, 2, 1, 0, 0],
            [0, 1, 0, 0, 0, 1, 1, 1, 1, 0],
            [1, 1, 1, 3, 0, 0, 0, 0, 1, 0],
            [1, 0, 0, 0, 0, 0, 0, 0, 1, 0],
            [1, 0, 3, 0, 1, 3, 1, 0, 1, 0],
            [1, 0, 0, 0, 1, 0, 0, 0, 1, 0],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        ],
        [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
            [0, 1, 0, 0, 0, 0, 0, 1, 1, 1],
            [1, 1, 3, 1, 1, 1, 0, 0, 0, 1],
            [1, 0, 4, 0, 3, 0, 0, 3, 0, 1],
            [1, 0, 2, 2, 1, 0, 3, 0, 1, 1],
            [1, 1, 2, 2, 1, 0, 0, 0, 1, 0],
            [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ],
        [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
            [0, 0, 1, 4, 0, 1, 1, 1, 0, 0],
            [0, 0, 1, 0, 3, 0, 0, 1, 0, 0],
            [0, 1, 1, 1, 0, 1, 0, 1, 1, 0],
            [0, 1, 2, 1, 0, 1, 0, 0, 1, 0],
            [0, 1, 2, 3, 0, 0, 1, 0, 1, 0],
            [0, 1, 2, 0, 0, 0, 3, 0, 1, 0],
            [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        ],
        [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
            [0, 0, 1, 1, 0, 0, 1, 0, 4, 1],
            [0, 0, 1, 0, 0, 0, 1, 0, 0, 1],
            [0, 0, 1, 3, 0, 3, 0, 3, 0, 1],
            [0, 0, 1, 0, 3, 1, 1, 0, 0, 1],
            [1, 1, 1, 0, 3, 0, 1, 0, 1, 1],
            [1, 2, 2, 2, 2, 2, 0, 0, 1, 0],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        ],
        [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 1, 1, 1, 1, 0, 0],
            [0, 1, 1, 1, 0, 0, 4, 1, 0, 0],
            [0, 1, 0, 0, 3, 2, 0, 1, 1, 0],
            [0, 1, 0, 0, 2, 3, 2, 0, 1, 0],
            [0, 1, 1, 1, 0, 5, 3, 0, 1, 0],
            [0, 0, 0, 1, 0, 0, 0, 1, 1, 0],
            [0, 0, 0, 1, 1, 1, 1, 1, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ],
        [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
            [0, 0, 0, 1, 2, 2, 1, 0, 0, 0],
            [0, 0, 1, 1, 0, 2, 1, 1, 0, 0],
            [0, 0, 1, 0, 0, 3, 2, 1, 0, 0],
            [0, 1, 1, 0, 3, 0, 0, 1, 1, 0],
            [0, 1, 0, 0, 1, 3, 3, 0, 1, 0],
            [0, 1, 0, 0, 4, 0, 0, 0, 1, 0],
            [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ],
        [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 1, 1, 1, 1, 1, 0],
            [0, 0, 0, 1, 0, 0, 0, 0, 1, 0],
            [0, 1, 1, 1, 3, 3, 3, 0, 1, 0],
            [0, 1, 4, 0, 3, 2, 2, 0, 1, 0],
            [0, 1, 0, 3, 2, 2, 2, 1, 1, 0],
            [0, 1, 1, 1, 1, 0, 0, 1, 0, 0],
            [0, 0, 0, 0, 1, 1, 1, 1, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ],
        [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
            [1, 0, 3, 3, 3, 1, 1, 0, 0, 0],
            [1, 0, 0, 1, 2, 2, 1, 1, 1, 0],
            [1, 1, 0, 0, 2, 2, 3, 0, 1, 0],
            [0, 1, 0, 4, 0, 0, 0, 0, 1, 0],
            [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        ],
        [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
            [0, 1, 0, 2, 0, 2, 2, 2, 1, 0],
            [0, 1, 3, 1, 0, 2, 2, 2, 1, 0],
            [0, 1, 0, 0, 0, 0, 1, 1, 1, 0],
            [0, 1, 0, 3, 3, 3, 0, 0, 1, 0],
            [1, 1, 0, 3, 0, 1, 0, 0, 1, 0],
            [1, 0, 0, 0, 3, 0, 3, 0, 1, 0],
            [1, 0, 0, 0, 1, 0, 0, 4, 1, 0],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        ],
    ];
    var copyArr = [];
    copyArray(copyArr, arrMap);
    // 创建地图
    createMap(map, info, arrMap);
    function operation(e) {
        if (e.key == 'ArrowLeft' || (e.key == 'a' || e.key == 'A')) {
            // 前面是空地 或者 目标
            if (arrMap[info.level][info.x][info.y - 1] == info.cle || arrMap[info.level][info.x][info.y - 1] == info.target) {
                arrMap[info.level][info.x][info.y] -= info.fig;
                arrMap[info.level][info.x][info.y - 1] += info.fig;
            }
            // 前面是箱子 或者 箱子 + 目标
            else if (arrMap[info.level][info.x][info.y - 1] == info.box || arrMap[info.level][info.x][info.y - 1] == info.boxTarget) {
                // 箱子前面是空地 和 箱子+目标
                if (arrMap[info.level][info.x][info.y - 2] == info.cle || arrMap[info.level][info.x][info.y - 2] == info.target) {
                    arrMap[info.level][info.x][info.y] -= info.fig;
                    arrMap[info.level][info.x][info.y - 1] += info.fig - info.box;
                    arrMap[info.level][info.x][info.y - 2] += info.box;
                    playAudio(e.key, info, arrMap);
                }
            }
        }
        else if (e.key == 'ArrowRight' || (e.key == 'd' || e.key == 'D')) {
            // 前面是空地 或者 目标
            if (arrMap[info.level][info.x][info.y + 1] == info.cle || arrMap[info.level][info.x][info.y + 1] == info.target) {
                arrMap[info.level][info.x][info.y] -= info.fig;
                arrMap[info.level][info.x][info.y + 1] += info.fig;
            }
            // 前面是箱子 或者 箱子 + 目标
            else if (arrMap[info.level][info.x][info.y + 1] == info.box || arrMap[info.level][info.x][info.y + 1] == info.boxTarget) {
                // 箱子前面是空地 和 箱子+目标
                if (arrMap[info.level][info.x][info.y + 2] == info.cle || arrMap[info.level][info.x][info.y + 2] == info.target) {
                    arrMap[info.level][info.x][info.y] -= info.fig;
                    arrMap[info.level][info.x][info.y + 1] += info.fig - info.box;
                    arrMap[info.level][info.x][info.y + 2] += info.box;
                    playAudio(e.key, info, arrMap);
                }
            }
        }
        else if (e.key == 'ArrowUp' || (e.key == 'w' || e.key == 'W')) {
            // 前面是空地 或者 目标
            if (arrMap[info.level][info.x - 1][info.y] == info.cle || arrMap[info.level][info.x - 1][info.y] == info.target) {
                arrMap[info.level][info.x][info.y] -= info.fig;
                arrMap[info.level][info.x - 1][info.y] += info.fig;
            }
            // 前面是箱子 或者 箱子 + 目标
            else if (arrMap[info.level][info.x - 1][info.y] == info.box || arrMap[info.level][info.x - 1][info.y] == info.boxTarget) {
                // 箱子前面是空地 和 箱子+目标
                if (arrMap[info.level][info.x - 2][info.y] == info.cle || arrMap[info.level][info.x - 2][info.y] == info.target) {
                    arrMap[info.level][info.x][info.y] -= info.fig;
                    arrMap[info.level][info.x - 1][info.y] += info.fig - info.box;
                    arrMap[info.level][info.x - 2][info.y] += info.box;
                    playAudio(e.key, info, arrMap);
                }
            }
        }
        else if (e.key == 'ArrowDown' || (e.key == 's' || e.key == 'S')) {
            // 前面是空地 或者 目标
            if (arrMap[info.level][info.x + 1][info.y] == info.cle || arrMap[info.level][info.x + 1][info.y] == info.target) {
                arrMap[info.level][info.x][info.y] -= info.fig;
                arrMap[info.level][info.x + 1][info.y] += info.fig;
            }
            // 前面是箱子 或者 箱子 + 目标
            else if (arrMap[info.level][info.x + 1][info.y] == info.box || arrMap[info.level][info.x + 1][info.y] == info.boxTarget) {
                // 箱子前面是空地 和 箱子+目标
                if (arrMap[info.level][info.x + 2][info.y] == info.cle || arrMap[info.level][info.x + 2][info.y] == info.target) {
                    arrMap[info.level][info.x][info.y] -= info.fig;
                    arrMap[info.level][info.x + 1][info.y] += info.fig - info.box;
                    arrMap[info.level][info.x + 2][info.y] += info.box;
                    playAudio(e.key, info, arrMap);
                }
            }
        }
        else if (e.key == 'Escape') {
            copyArray(arrMap, copyArr);
            map.innerHTML = '';
            createMap(map, info, arrMap);
        }
        // 清空map里的数据
        map.innerHTML = '';
        // 重新创建地图
        createMap(map, info, arrMap);
        if (info.boxNum == 0) {
            info.level++;
            if (info.level >= arrMap.length) {
                nextLevel.style.display = 'block';
                document.body.removeEventListener('keydown', operation);
            }
            else {
                document.body.removeEventListener('keydown', operation);
                setTimeout(function () {
                    map.innerHTML = '';
                    createMap(map, info, arrMap);
                    document.body.addEventListener('keydown', operation);
                    if (tips.flag) {
                        tips.style.display = 'none';
                        tips.flag = false;
                    }
                }, 1000);
            }
        }
    }
    document.body.addEventListener('keydown', operation);
    // 当点击重新开始时要做的
    //  1. 隐藏当前的窗口
    //  2. 重新添加事件
    //  3. 重制地图
    btnAgain.addEventListener('click', function () {
        nextLevel.style.display = 'none';
        copyArray(arrMap, copyArr);
        info.level = 0;
        map.innerHTML = '';
        createMap(map, info, arrMap);
        document.body.addEventListener('keydown', operation);
    });
})