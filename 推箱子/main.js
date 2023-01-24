window.addEventListener('load', function () {
    var map = document.querySelector('.map'); // 获取地图
    var nextLevel = document.querySelector('.Next-level-bg');
    var info = {
        cle: 0, // 空地
        wall: 1, // 墙
        target: 2, // 目标
        box: 3, // 箱子
        fig: 4, // 人物
        boxTarget: 2 + 3,
        figTarget: 2 + 4,
        boxNum: 0,
        x: 0,
        y: 0
    };
    var arrMap = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 2, 0, 0, 0, 0, 0, 0, 2, 1],
        [1, 0, 3, 0, 0, 0, 0, 3, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 4, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 3, 0, 0, 0, 0, 0, 3, 1],
        [1, 2, 0, 0, 0, 0, 0, 0, 2, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];
    // 创建地图
    createMap(map, info, arrMap);
    // 获取地图信息
    getMapInfo(map, arrMap);
    function operation(e) {
        if (e.key == 'ArrowLeft') {
            // 前面是空地 或者 目标
            if (arrMap[info.x][info.y - 1] == info.cle || arrMap[info.x][info.y - 1] == info.target) {
                arrMap[info.x][info.y] -= info.fig;
                arrMap[info.x][info.y - 1] += info.fig;
            }
            // 前面是箱子 或者 箱子 + 目标
            else if (arrMap[info.x][info.y - 1] == info.box || arrMap[info.x][info.y - 1] == info.boxTarget) {
                // 箱子前面是空地 和 箱子+目标
                if (arrMap[info.x][info.y - 2] == info.cle || arrMap[info.x][info.y - 2] == info.target) {
                    arrMap[info.x][info.y] -= info.fig;
                    arrMap[info.x][info.y - 1] += info.fig - info.box;
                    arrMap[info.x][info.y - 2] += info.box;
                }
            }
        }
        else if (e.key == 'ArrowRight') {
            // 前面是空地 或者 目标
            if (arrMap[info.x][info.y + 1] == info.cle || arrMap[info.x][info.y + 1] == info.target) {
                arrMap[info.x][info.y] -= info.fig;
                arrMap[info.x][info.y + 1] += info.fig;
            }
            // 前面是箱子 或者 箱子 + 目标
            else if (arrMap[info.x][info.y + 1] == info.box || arrMap[info.x][info.y + 1] == info.boxTarget) {
                // 箱子前面是空地 和 箱子+目标
                if (arrMap[info.x][info.y + 2] == info.cle || arrMap[info.x][info.y + 2] == info.target) {
                    arrMap[info.x][info.y] -= info.fig;
                    arrMap[info.x][info.y + 1] += info.fig - info.box;
                    arrMap[info.x][info.y + 2] += info.box;
                }
            }
        }
        else if (e.key == 'ArrowUp') {
            // 前面是空地 或者 目标
            if (arrMap[info.x - 1][info.y] == info.cle || arrMap[info.x - 1][info.y] == info.target) {
                arrMap[info.x][info.y] -= info.fig;
                arrMap[info.x - 1][info.y] += info.fig;
            }
            // 前面是箱子 或者 箱子 + 目标
            else if (arrMap[info.x - 1][info.y] == info.box || arrMap[info.x - 1][info.y] == info.boxTarget) {
                // 箱子前面是空地 和 箱子+目标
                if (arrMap[info.x - 2][info.y] == info.cle || arrMap[info.x - 2][info.y] == info.target) {
                    arrMap[info.x][info.y] -= info.fig;
                    arrMap[info.x - 1][info.y] += info.fig - info.box;
                    arrMap[info.x - 2][info.y] += info.box;
                }
            }
        }
        else if (e.key == 'ArrowDown') {
            // 前面是空地 或者 目标
            if (arrMap[info.x + 1][info.y] == info.cle || arrMap[info.x + 1][info.y] == info.target) {
                arrMap[info.x][info.y] -= info.fig;
                arrMap[info.x + 1][info.y] += info.fig;
            }
            // 前面是箱子 或者 箱子 + 目标
            else if (arrMap[info.x + 1][info.y] == info.box || arrMap[info.x + 1][info.y] == info.boxTarget) {
                // 箱子前面是空地 和 箱子+目标
                if (arrMap[info.x + 2][info.y] == info.cle || arrMap[info.x + 2][info.y] == info.target) {
                    arrMap[info.x][info.y] -= info.fig;
                    arrMap[info.x + 1][info.y] += info.fig - info.box;
                    arrMap[info.x + 2][info.y] += info.box;
                }
            }
        }
        // 清空map里的数据
        map.innerHTML = '';
        // 重新创建地图
        createMap(map, info, arrMap);
        if (info.boxNum == 0) {
            nextLevel.style.display = 'block';
            document.body.removeEventListener('keydown', operation);
        }
    }
    document.body.addEventListener('keydown', operation);
})