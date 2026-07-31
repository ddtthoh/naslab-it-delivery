/* ============================================================
   NASLAB Member Portal — Auth screens · 前端交互
   纯静态演示。所有校验都只是「即时提示」,后端必须原样再校验一次。
   IT 接线的地方全部标了 [接线]。
   ============================================================ */

(function () {
  "use strict";

  /* ---- 本机预览:官网链接指向我们自己的官网稿 ------------------------ */
  /* HTML 里写死的是 https://naslabtec.com —— **交付给 IT 的就该是这个,不要改 HTML**。
     只有在 localhost / 局域网 IP 打开时才在运行时改写到本机官网稿(:4190),
     否则点一下「← 返回官网」就跳出设计稿,门户和官网连不成一条验收动线。
     线上域名不匹配,这段直接跳过,交付内容不受影响。 */
  /* ⚠️ 提成具名函数并挂到 window:i18n 换语言时会整段重写「条款/隐私」那类
     带链接的句子(innerHTML),把已改写的 href 冲回 naslabtec.com ——
     所以 i18n.js 每次 apply() 完都要再调一次这个函数(幂等,重复跑无害)。 */
  window.NASLAB_REWRITE_LINKS = function () {
    var h = location.hostname;
    var local =
      h === "localhost" || h === "127.0.0.1" ||
      /^10\./.test(h) || /^192\.168\./.test(h) ||
      /^172\.(1[6-9]|2\d|3[01])\./.test(h);
    var base = null;
    if (local) base = location.protocol + "//" + h + ":4190";
    /* 公网预览:官网和门户同域(站根 = 官网,/portal/ = 门户),回官网就是回站根 */
    else if (/\.higgsfield\.app$/.test(h)) base = location.origin;
    if (!base) return;
    var PROD = "https://naslabtec.com";
    document.querySelectorAll('a[href^="' + PROD + '"]').forEach(function (a) {
      a.href = base + a.getAttribute("href").slice(PROD.length);
    });
  };
  window.NASLAB_REWRITE_LINKS();

  /* ---- 语言下拉 ---------------------------------------------------- */
  document.querySelectorAll(".langwrap").forEach(function (wrap) {
    var btn = wrap.querySelector(".lang");
    var menu = wrap.querySelector(".langmenu");
    if (!btn || !menu) return;
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      var open = menu.hidden;
      menu.hidden = !open;
      btn.setAttribute("aria-expanded", String(open));
    });
  });
  document.addEventListener("click", function (e) {
    document.querySelectorAll(".langmenu").forEach(function (m) {
      if (!m.hidden && !m.closest(".langwrap").contains(e.target)) {
        m.hidden = true;
        m.closest(".langwrap").querySelector(".lang").setAttribute("aria-expanded", "false");
      }
    });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    document.querySelectorAll(".langmenu").forEach(function (m) { m.hidden = true; });
  });

  /* ---- 左幕视频:进页面播一次,不循环 -------------------------------- */
  /* 浏览器拦掉自动播放(或不支持)时退回静图,免得左幕永远停在空地板上。 */
  (function () {
    var v = document.querySelector(".auth__aside-media");
    if (!v) return;
    var aside = v.closest(".auth__aside");
    var giveUp = function () { aside.classList.add("is-noautoplay"); };
    /* 只有浏览器**真的拒绝**自动播放(NotAllowedError)才立刻退静图;
       其它 reject 多半是数据没到位被打断(AbortError)—— 等 canplay 再试一次,
       否则慢网上会被误判成「放不了」。(锁时代踩过的坑,原样保留。) */
    var attempt = function (isRetry) {
      var p = v.play();
      if (!p || typeof p.catch !== "function") return;
      p.catch(function (err) {
        if ((err && err.name === "NotAllowedError") || isRetry) return giveUp();
        v.addEventListener("canplay", function once() {
          v.removeEventListener("canplay", once);
          attempt(true);
        });
      });
    };
    attempt(false);
    v.addEventListener("error", giveUp);
  })();

  /* ---- 密码显隐 ---------------------------------------------------- */
  var EYE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M1.8 12S5.4 5.2 12 5.2 22.2 12 22.2 12 18.6 18.8 12 18.8 1.8 12 1.8 12Z"/><circle cx="12" cy="12" r="3.1"/></svg>';
  var EYE_OFF = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9.9 5.5A9.9 9.9 0 0 1 12 5.2c6.6 0 10.2 6.8 10.2 6.8a18 18 0 0 1-3.3 4.3M6.3 6.4A18.2 18.2 0 0 0 1.8 12S5.4 18.8 12 18.8a9.7 9.7 0 0 0 4.2-.9"/><path d="M9.9 9.9a3.1 3.1 0 0 0 4.3 4.3"/><path d="M3 3l18 18"/></svg>';

  document.querySelectorAll(".field__reveal").forEach(function (btn) {
    btn.innerHTML = EYE;
    btn.addEventListener("click", function () {
      var input = document.getElementById(btn.dataset.for);
      if (!input) return;
      var hidden = input.type === "password";
      input.type = hidden ? "text" : "password";
      btn.innerHTML = hidden ? EYE_OFF : EYE;
      btn.setAttribute("aria-label", hidden ? "Hide password" : "Show password");
    });
  });

  /* ---- 密码强度(纯提示,不改后端规则:最少 6 位)-------------------- */
  document.querySelectorAll("[data-pwmeter]").forEach(function (meter) {
    var input = document.getElementById(meter.dataset.pwmeter);
    if (!input) return;
    input.addEventListener("input", function () {
      var v = input.value;
      var score = 0;
      if (v.length >= 6) score++;
      if (v.length >= 10) score++;
      if (/[A-Z]/.test(v) && /[a-z]/.test(v)) score++;
      if (/\d/.test(v) && /[^A-Za-z0-9]/.test(v)) score++;
      meter.dataset.level = v ? String(score) : "0";
    });
  });

  /* ---- Captcha 刷新 ------------------------------------------------- */
  /* [接线] 线上是 <img src="/captcha"> + 一条 Refresh 链接。
     这里保留同一套结构,刷新 = 给 src 换一个时间戳绕过缓存。 */
  document.querySelectorAll(".captcha__refresh").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var img = document.getElementById(btn.dataset.for);
      btn.classList.add("is-spinning");
      setTimeout(function () { btn.classList.remove("is-spinning"); }, 380);
      if (!img) return;
      var base = (img.dataset.src || img.src).split("?")[0];
      img.src = base + "?t=" + Date.now();
    });
  });

  /* ---- 即时校验 ----------------------------------------------------- */
  function setError(input, msg) {
    var box = document.getElementById(input.id + "-error");
    if (!box) return;
    box.textContent = msg || "";
    box.classList.toggle("is-on", Boolean(msg));
    input.setAttribute("aria-invalid", msg ? "true" : "false");
  }

  /* 校验文案走 i18n(assets/i18n.js 的 NASLAB_T);没加载时回退英文原句。 */
  var T = window.NASLAB_T || function (k) {
    return ({errEmailReq:"Please enter your email address.",
      errEmailBad:"That doesn't look like a valid email address.",
      errPwReq:"Please enter your password.", errPwShort:"Password must be at least 6 characters.",
      errPwConfirmReq:"Please confirm your password.", errPwMismatch:"The two passwords don't match.",
      errCapReq:"Please enter the characters shown.", pleaseWait:"Please wait…"})[k] || k;
  };

  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function validate(form) {
    var ok = true;
    var email = form.querySelector('input[type="email"]');
    if (email) {
      var v = email.value.trim();
      if (!v) { setError(email, T("errEmailReq")); ok = false; }
      else if (!EMAIL_RE.test(v)) { setError(email, T("errEmailBad")); ok = false; }
      else setError(email, "");
    }

    var pw = form.querySelector('input[name="password"]');
    if (pw) {
      if (!pw.value) { setError(pw, T("errPwReq")); ok = false; }
      else if (pw.value.length < 6) { setError(pw, T("errPwShort")); ok = false; }
      else setError(pw, "");
    }

    var pw2 = form.querySelector('input[name="password_confirmation"]');
    if (pw2 && pw) {
      if (!pw2.value) { setError(pw2, T("errPwConfirmReq")); ok = false; }
      else if (pw2.value !== pw.value) { setError(pw2, T("errPwMismatch")); ok = false; }
      else setError(pw2, "");
    }

    var cap = form.querySelector('input[name="captcha"]');
    if (cap) {
      if (!cap.value.trim()) { setError(cap, T("errCapReq")); ok = false; }
      else setError(cap, "");
    }
    return ok;
  }

  document.querySelectorAll("form[data-auth]").forEach(function (form) {
    /* 失焦时才提示,不要边打字边报错 */
    form.querySelectorAll(".input").forEach(function (input) {
      input.addEventListener("blur", function () {
        if (input.value) validate(form);
      });
    });

    form.addEventListener("submit", function (e) {
      /* [接线] 演示稿一律拦截提交。
         真接后端时:删掉这段 preventDefault,让 <form action method> 正常提交,
         或改成 fetch()。字段 name 已与线上一致,后端不用改。 */
      e.preventDefault();
      if (!validate(form)) return;

      var btn = form.querySelector('button[type="submit"]');
      var label = btn.querySelector("span");
      var original = label.textContent;
      btn.disabled = true;
      label.textContent = btn.dataset.loading || T("pleaseWait");

      setTimeout(function () {
        btn.disabled = false;
        label.textContent = original;
        var done = document.querySelector(".done");
        if (done) {                       // 忘记密码:切成「已寄出」态
          form.style.display = "none";
          var head = document.querySelector(".auth__head");
          if (head) head.style.display = "none";
          done.classList.add("is-on");
        } else {
          alert("设计演示稿 —— 这里由 IT 接后端。\n表单字段名已与线上一致,后端无需改动。");
        }
      }, 900);
    });
  });
})();
