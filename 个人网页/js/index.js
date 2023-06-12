window.addEventListener("load", function () {
  // 打字效果
  function typeWriterEffect(elementId, text, speed = 100) {
    let index = 0;
    const element = document.getElementById(elementId);

    function typeWriter() {
      element.textContent += text.charAt(index);
      index++;
      if (index < text.length) {
        setTimeout(typeWriter, speed);
      }
    }

    typeWriter();
  }
  // 排他思想
  function navExclusive(ele) {
    document.querySelector(".right-nav .cur").classList.remove("cur");
    ele.classList.add("cur");
  }

  // 个人介绍
  function introduce() {
    const colorArr = ["#ff65f4", "#92d050", "#ffc535", "#00b0f0", "#ce93bf"];
    const numArr = [82, 54, 43, 30, 60];
    const span = document.querySelectorAll(".box-introduce li span");
    const is = document.querySelectorAll(".box-introduce li div i");
    span.forEach((ele, i) => {
      ele.style.color = colorArr[i];
      is[i].style.backgroundColor = colorArr[i];
    });

    let count = 0;
    let timeId = setInterval(function () {
      if (count >= 100) clearInterval(timeId);

      count++;
      let i = 0;
      for (i = 0; i < 5; i++) {
        if (count <= numArr[i]) {
          is[i].style.width = count + "%";
        }
      }
    }, 15);
  }

  /**
   * 背景模块
   */
  function background() {
    const bg = document.createElement("div");
    bg.className = "bg";
    document.body.appendChild(bg);

    let w = window.innerWidth;
    let h = window.innerHeight
    let num = w / 100 * 20;
    for (let i = 0; i < num; i++) {
      let star = document.createElement('div');
      star.className = 'star';
      star.style.left = w * Math.random() - 50 + 'px';
      star.style.top = h * Math.random() - 50 + 'px';
      star.style.transform = 'scale(' + Math.random() * 1.2 + ')';
      star.style.animationDelay = 5 * Math.random() + 's';
      document.querySelector(".bg").appendChild(star);
    }
    window.addEventListener('resize', function () {
      let stars = document.querySelectorAll('.star');
      for (let starNum = 0; starNum < stars.length; starNum++) {
        stars[starNum].remove();
      }
      w = window.innerWidth;
      h = window.innerHeight
      num = w / 100 * 20;
      for (let i = 0; i < num; i++) {
        let star = document.createElement('div');
        star.className = 'star';
        star.style.left = w * Math.random() - 50 + 'px';
        star.style.top = h * Math.random() - 50 + 'px';
        star.style.transform = 'scale(' + Math.random() * 1.2 + ')';
        star.style.animationDelay = 5 * Math.random() - 4 + 's';
        bg.appendChild(star);
      }
    });

    // 给css添加动画
    const scrW = screen.width;
    const scrH = screen.height;
    const lineTop = scrW / 3;
    const style = document.createElement("style");
    for (let i = 0; i < 15; i++) {
      const line = document.createElement('div');
      line.className = 'line';
      line.style.top = scrH / 3 * Math.random() + 'px';
      line.style.animationName = 'move' + i;
      line.style.animationDelay = 10 * Math.random() + 's';
      document.querySelector(".bg").appendChild(line);
      style.append('@keyframes move' + i + `{100% {right: ${scrW}px;top: ` + (lineTop + line.offsetTop) + 'px;}}');
    }

    document.querySelector("head").appendChild(style);
  };

  /**
   * nav模块
   */
  function nav() {
    // 首页
    const homePage = document.querySelector(".home-page");
    // 个人介绍
    const homeIntroduce = document.querySelector(".home-introduce");
    // 我的爱好
    const homeHobby = document.querySelector(".home-hobby");
    // 联系方式
    const homeContact = document.querySelector(".home-contact");
    // nav
    const nav = document.querySelector(".nav");

    const pTop = homePage.offsetTop;
    const iTop = homeIntroduce.offsetTop;
    const hTop = homeHobby.offsetTop;
    const cTop = homeContact.offsetTop;

    // nav 打字效果
    const navText = "欢迎来到我的网站!";
    typeWriterEffect("logo-text", navText, 200);

    const rightNav = document.querySelector(".right-nav");

    rightNav.addEventListener("click", function (e) {
      const ele = e.target;

      if (ele.tagName == "A") {
        // 排它思想
        navExclusive(ele);

        const index = ele.dataset.index;

        if (index == 1) {
          document.documentElement.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
          });
        } else if (index == 2) {

          document.documentElement.scroll({
            top: iTop,
            left: 0,
            behavior: 'smooth'
          });
        } else if (index == 3) {
          document.documentElement.scroll({
            top: hTop,
            left: 0,
            behavior: 'smooth'
          });
        } else if (index == 4)
          document.documentElement.scroll({
            top: cTop,
            left: 0,
            behavior: 'smooth'
          });
      }

    });
  };

  /**
   * 页面滚动
   */
  function pageScroll() {
    // 首页
    const homePage = document.querySelector(".home-page");
    // 个人介绍
    const homeIntroduce = document.querySelector(".home-introduce");
    // 我的爱好
    const homeHobby = document.querySelector(".home-hobby");
    // 联系方式
    const homeContact = document.querySelector(".home-contact");
    // nav
    const nav = document.querySelector(".nav");
    // nav > a
    const navAs = document.querySelectorAll(".nav .right-nav a");

    const pTop = homePage.offsetTop;
    const iTop = homeIntroduce.offsetTop;
    const hTop = homeHobby.offsetTop;
    const cTop = homeContact.offsetTop;

    // 页面时间
    document.querySelector(".date-td").innerHTML = new Date().toLocaleTimeString();
    setInterval(() => {
      document.querySelector(".date-td").innerHTML = new Date().toLocaleTimeString();
    }, 1000);

    scrollHome();
    let flag = true;

    window.addEventListener("scroll", function () {
      scrollHome();
      const n = document.documentElement.scrollTop;

      if (n >= iTop && n < hTop) {
        if (flag) {
          introduce();

          const p = document.querySelector(".box-introduce p")
          p.style.transform = "translateX(0)";
          flag = false;
        }
      } else {
        flag = true;
      }
    });
    function scrollHome() {
      const n = document.documentElement.scrollTop;
      if (n == 0) {                       // n == 0;
        nav.classList.remove("styleNav");

      } else if (n >= pTop && n < iTop) { // n == pTop
        nav.classList.add("styleNav");

        navExclusive(navAs[0]);
      } else if (n >= iTop && n < hTop) { // n == iTop
        nav.classList.add("styleNav");

        navExclusive(navAs[1]);
      } else if (n >= hTop && n < cTop) { // n == hTop
        nav.classList.add("styleNav");

        navExclusive(navAs[2]);
      } else {                            // n == cTop
        nav.classList.add("styleNav");

        navExclusive(navAs[3]);
      }
    }
  }

  /**
   * 留言板
   */
  function messageForm() {
    const message = document.querySelector(".message-form");

    message.addEventListener("submit", function (e) {
      e.preventDefault();
      var contactInput = document.getElementById("contact-input");
      var titleInput = document.getElementById("title-input");
      var messageInput = document.getElementById("message-input");

      // 清空输入框
      contactInput.value = "";
      titleInput.value = "";
      messageInput.value = "";
    })
  }


  /*-----------------------*/
  (function () {
    // 背景
    background();
    // nav
    nav();
    // 页面滚动
    pageScroll();
    // 留言板
    messageForm();
  }());

});