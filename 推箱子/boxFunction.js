// 定义行和列
var col = 10;
var row = 10;
// 创建地图
function createMap(map, info, arrMap) {
    info.boxNum = 0;
    for (var i = 0; i < col; i++) {
        for (var j = 0; j < row; j++) {
            var div = document.createElement('div');
            div.setAttribute('index', arrMap[info.level][i][j]);
            map.appendChild(div);
            switch (arrMap[info.level][i][j]) {
                case info.cle:
                    div.className = 'cle';
                    break;
                case info.wall:
                    div.className = 'wall';
                    break;
                case info.target:
                    div.className = 'target';
                    break;
                case info.box:
                    div.className = 'box';
                    info.boxNum++;
                    break;
                case info.fig:
                    div.className = 'fig';
                    info.x = i;
                    info.y = j;
                    break;
                case info.boxTarget:
                    div.className = 'boxTarget';
                    break;
                case info.figTarget:
                    div.className = 'figTarget';
                    info.x = i;
                    info.y = j;
                    break;
                default:
                    console.log('error');
                    break;
            }
        }
    }
}

// 获取地图信息
function getMapInfo(map, arrMap, info) {
    var arrEle = map.querySelectorAll('div');
    for (var i = 0; i < col; i++) {
        for (var j = 0; j < row; j++) {
            arrMap[info.level][i][j] = parseInt(arrEle[i * row + j].getAttribute('index'));
        }
    }
}

// 播放音频
function playAudio(direction, info, arrMap) {
    var m_boxTarget = new Audio('./audio/boxTarget.mp3');
    if (direction == 'ArrowLeft') {
        if (info.y < 2) return -1;
        if (arrMap[info.level][info.x][info.y - 2] == info.boxTarget && arrMap[info.level][info.x][info.y - 1] != info.cle) {
            m_boxTarget.pause();
            m_boxTarget.currentTime = 0;
            m_boxTarget.play();
        }
    }
    else if (direction == 'ArrowRight') {
        if (info.y + 2 >= row) return -1;
        if (arrMap[info.level][info.x][info.y + 2] == info.boxTarget && arrMap[info.level][info.x][info.y + 1] != info.cle) {
            m_boxTarget.pause();
            m_boxTarget.currentTime = 0;
            m_boxTarget.play();
        }
    }
    else if (direction == 'ArrowUp') {
        if (info.x < 2) return -1;
        if (arrMap[info.level][info.x - 2][info.y] == info.boxTarget && arrMap[info.level][info.x - 1][info.y] != info.cle) {
            m_boxTarget.pause();
            m_boxTarget.currentTime = 0;
            m_boxTarget.play();
        }
    }
    else if (direction == 'ArrowDown') {
        if (info.x + 2 >= row) return -1;
        if (arrMap[info.level][info.x + 2][info.y] == info.boxTarget && arrMap[info.level][info.x + 1][info.y] != info.cle) {
            m_boxTarget.pause();
            m_boxTarget.currentTime = 0;
            m_boxTarget.play();
        }
    }
}

// 复制数组
function copyArray(arr1, arr2) {
    for(var k = 0; k < arr2.length; k++) {
        arr1[k] = new Array();
        for (var i = 0; i < arr2[0].length; i++) {
            arr1[k][i] = new Array();
            for (var j = 0; j < arr2[0][0].length; j++) {
                arr1[k][i][j] = arr2[k][i][j];
            }
        }
    }
}
