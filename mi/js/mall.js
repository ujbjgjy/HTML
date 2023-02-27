window.addEventListener('load', function () {
    var foucus = document.querySelector('.main');
    var dots = document.querySelector('.yuandian');;
    var num = 1;

    // 生成小圆点
    for (var i = 0; i < 5; i++) {
        var dot = document.createElement('div');
        dot.setAttribute('index', i + 1);
        dots.appendChild(dot);
    }
    dots.children[0].classList.add('current');
    // 点击小圆点
    for (var i = 0; i < 5; i++) {
        dots.children[i].addEventListener('click', function () {
            for (var j = 0; j < 5; j++) {
                dots.children[j].classList.remove('current');
            }
            this.classList.add('current');
            num = this.getAttribute('index');
            foucus.style.backgroundImage = 'url(http://rp5i9wyrx.hn-bkt.clouddn.com/foucus_' + num + '.jpg)';
        });
    }
    var timer = setInterval(function () {
        if (num == 5) {
            num = 0;
        }
        num++;
        foucus.style.backgroundImage = 'url(http://rp5i9wyrx.hn-bkt.clouddn.com/foucus_' + num + '.jpg)';
        for (var j = 0; j < 5; j++) {
            dots.children[j].classList.remove('current');
        }
        dots.children[num - 1].classList.add('current');
    }, 10000);
    // 左右箭头
    var arrow_l = document.querySelector('.arrow_left');
    var arrow_r = document.querySelector('.arrow_right');
    arrow_l.addEventListener('click', function () {
        if (num == 1) {
            num = 6;
        }
        num--;
        foucus.style.backgroundImage = 'url(upload/foucus_' + num + '.jpg)';
        for (var j = 0; j < 5; j++) {
            dots.children[j].classList.remove('current');
        }
        dots.children[num - 1].classList.add('current');
    });
    arrow_r.addEventListener('click', function () {
        if (num == 5) {
            num = 0;
        }
        num++;
        foucus.style.backgroundImage = 'url(upload/foucus_' + num + '.jpg)';
        for (var j = 0; j < 5; j++) {
            dots.children[j].classList.remove('current');
        }
        dots.children[num - 1].classList.add('current');
    });
    // 表单
    var search = document.querySelector('.search');
    var sec = search.querySelector('.sec')
    var ipt = search.querySelector('input');
    var searchText = search.querySelector('.search-text');
    console.log(ipt);
    ipt.addEventListener('focus', function () {
        search.style.border = '1px solid #ff6700';
        sec.style.borderLeft = '1px solid #ff6700';
        searchText.style.display = 'block';
    });
    ipt.addEventListener('blur', function () {
        search.style.border = '1px solid #e0e0e0';
        sec.style.borderLeft = '1px solid #e0e0e0';
        searchText.style.display = 'none';
    });
})