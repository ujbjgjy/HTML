window.addEventListener('load', function () {
    var map = document.querySelector('.map'); // 获取地图
    var info = {
        cle: 0, // 空地
        wall: 1, // 墙
        target: 2, // 目标
        box: 3, // 箱子
        fig: 4, // 人物
        boxTarget: 2 + 3,
        figTarget: 2 + 4,
        x: 0,
        y: 0
    };
    console.log(info.figTarget);
    var arrMap = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 2, 0, 0, 0, 0, 0, 0, 2, 1],
        [1, 0, 3, 0, 0, 0, 0, 3, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 2, 3, 2, 2, 6, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 3, 0, 0, 0, 0, 3, 0, 1],
        [1, 2, 0, 0, 0, 0, 0, 0, 2, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];
    // 创建地图
    createMap(map, info, arrMap);
    console.log(info.x, info.y);
    // 获取地图信息
    getMapInfo(map, arrMap);
    document.body.addEventListener('keydown', function (e) {
        if (e.key == 'ArrowLeft') {
            // 前面是空地 移动
            if (arrMap[info.x][info.y - 1] == info.cle) {
                arrMap[info.x][info.y ] -= info.fig;
                arrMap[info.x][info.y - 1] += info.fig;
            }
            // 前面是目标
            else if (arrMap[info.x][info.y - 1] == info.target) {
                arrMap[info.x][info.y ] -= info.fig;
                arrMap[info.x][info.y - 1] += info.fig;
            }
            // 前面是箱子
            else if (arrMap[info.x][info.y - 1] == info.box) {
                // 箱子前面是空地
                if (arrMap[info.x][info.y - 2] == info.cle) {
                    arrMap[info.x][info.y] -= info.fig;
                    arrMap[info.x][info.y - 1] += info.fig - info.box;
                    arrMap[info.x][info.y - 2] = info.box;  
                }
                // 箱子前是目标的话
                else if (arrMap[info.x][info.y - 2] == info.target) {
                    arrMap[info.x][info.y] -= info.fig;
                    arrMap[info.x][info.y - 1] += info.fig - info.box;
                    arrMap[info.x][info.y - 2] += info.box;
                } 
            }
        }
        else if (e.key == 'ArrowRight') {
            arrMap[info.x][info.y ] = info.cle;
            arrMap[info.x][info.y + 1] = info.fig;
        }
        else if (e.key == 'ArrowUp') {
            arrMap[info.x][info.y ] = info.cle;
            arrMap[info.x - 1][info.y] = info.fig;
        }
        else if (e.key == 'ArrowDown') {
            arrMap[info.x][info.y ] = info.cle;
            arrMap[info.x + 1][info.y] = info.fig;
        }
        map.innerHTML = '';
        createMap(map, info, arrMap);
        getMapInfo(map, arrMap);
    });
})