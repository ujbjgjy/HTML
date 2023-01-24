// 定义行和列
var col = 10;
var row = 10;
// 创建地图
function createMap(map, info, arrMap) {
    info.boxNum = 0;
    for (var i = 0; i < col; i++) {
        for (var j = 0; j < row; j++) {
            var div = document.createElement('div');
            div.setAttribute('index', arrMap[i][j]);
            map.appendChild(div);
            switch (arrMap[i][j]) {
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
                    div.innerHTML = '箱子';
                    info.boxNum++;
                    break;
                case info.fig:
                    div.className = 'fig';
                    info.x = i;
                    info.y = j;
                    break;
                case info.boxTarget:
                    div.className = 'boxTarget';
                    div.innerHTML = 'b和t';
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
function getMapInfo(map, arrMap) {
    var arrEle = map.querySelectorAll('div');
    for (var i = 0; i < col; i++) {
        for (var j = 0; j < row; j++) {
            arrMap[i][j] = parseInt(arrEle[i * row + j].getAttribute('index'));
        }
    }
}