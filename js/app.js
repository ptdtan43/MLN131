/* Bài thuyết trình MLN131: trò chơi mở đầu, các màn lý thuyết, trò chơi ôn tập, hỏi đáp.
   Không cần cài đặt gì: mở index.html là chạy. */
(function () {
  'use strict';

  var C = window.CONTENT;
  var IMG = window.IMAGES || {};
  var stage = document.getElementById('stage');
  var bar = document.getElementById('bar');
  var barFill = document.getElementById('bar-fill');
  var barTitle = document.getElementById('bar-title');
  var notesEl = document.getElementById('notes');
  var notesBtn = document.getElementById('notes-btn');
  var prevBtn = document.getElementById('prev');
  var nextBtn = document.getElementById('next');

  /* ---------- tiện ích ---------- */
  function h(tag, attrs) {
    var e = document.createElement(tag);
    var a = attrs || {};
    Object.keys(a).forEach(function (k) {
      var v = a[k];
      if (v === false || v == null) return;
      if (k === 'class') e.className = v;
      else if (k.indexOf('on') === 0) e.addEventListener(k.slice(2), v);
      else if (v === true) e.setAttribute(k, '');
      else e.setAttribute(k, v);
    });
    for (var i = 2; i < arguments.length; i++) append(e, arguments[i]);
    return e;
  }
  function append(e, k) {
    if (k == null || k === false) return;
    if (Array.isArray(k)) { k.forEach(function (x) { append(e, x); }); return; }
    e.append(k.nodeType ? k : document.createTextNode(k));
  }
  function lines(arr) {
    var f = document.createDocumentFragment();
    arr.forEach(function (t, i) { if (i) f.append(document.createElement('br')); f.append(t); });
    return f;
  }
  function shuffle(arr, notSame) {
    var a = arr.slice(), tries = 0, i, j, t;
    do {
      for (i = a.length - 1; i > 0; i--) { j = Math.floor(Math.random() * (i + 1)); t = a[i]; a[i] = a[j]; a[j] = t; }
      tries++;
    } while (notSame && tries < 20 && a.every(function (x, k) { return x === arr[k]; }));
    return a;
  }
  function rise(root) {
    var n = 0;
    root.querySelectorAll('[data-r]').forEach(function (e) {
      e.classList.add('r');
      e.style.setProperty('--i', Math.min(n++, 9));
    });
  }
  function shake(e) {
    e.classList.remove('shake');
    void e.offsetWidth;
    e.classList.add('shake');
  }
  var shownId = null;
  function go(id) {
    try { location.hash = '#/' + id; } catch (e) { /* khung xem có thể chặn đổi địa chỉ */ }
    if (shownId !== id) show(id);
  }

  /* ---------- ảnh (chỉ hiện khi đã có ảnh thật trong assets/images.js) ---------- */
  function shot(key) {
    var d = key && IMG[key];
    if (!d || !d.file) return null;
    var fig = h('figure', { class: 'shot', 'data-r': true });
    var img = h('img', { src: d.file, alt: d.alt || '', loading: 'lazy' });
    img.addEventListener('error', function () { fig.remove(); });
    fig.append(img);
    var cap = [d.caption, d.credit && ('Ảnh: ' + d.credit), d.license].filter(Boolean).join(' · ');
    if (cap) fig.append(h('figcaption', null, cap));
    return fig;
  }

  /* ---------- danh sách màn hình ---------- */
  var T = C.theory;
  var screens = [
    { id: 'mo-dau', field: 'red', group: 'mo-dau', bar: false, render: renderHero },
    { id: 'tro-choi', field: 'black', group: 'mo-dau', bar: false, render: renderGame }
  ];
  T.forEach(function (s, i) {
    screens.push({ id: 'bai-' + (i + 1), field: s.field, group: 'bai', bar: true, render: function () { return renderTheory(s, i); }, slide: s, n: i });
  });
  screens.push(
    { id: 'on-tap', field: 'gold', group: 'on-tap', bar: false, render: renderReview },
    { id: 'hoi-dap', field: 'red', group: 'hoi-dap', bar: false, render: renderQA },
    { id: 'nguon', field: 'black', group: 'nguon', bar: false, render: renderCredits }
  );

  /* ---------- màn mở đầu ---------- */
  function renderHero() {
    var d = C.hero;
    return h('section', { class: 'screen hero', 'aria-labelledby': 'h1' },
      h('h1', { class: 'display hero-title', id: 'h1' }, lines(d.title)),
      h('div', { class: 'hero-foot' },
        h('div', null,
          h('p', { class: 'lead', 'data-r': true }, d.lead),
          h('p', { class: 'hero-place', 'data-r': true }, d.place)),
        h('button', { class: 'btn', type: 'button', 'data-r': true, onclick: function () { go('tro-choi'); } }, d.action)));
  }

  /* ---------- trò chơi 1: bỏ qua hay kế thừa ---------- */
  function renderGame() {
    var g = C.game, cards = g.cards, i = 0, right = 0, wrong = 0, picked = null;
    var root = h('section', { class: 'screen', 'aria-labelledby': 'h1' });

    function draw() {
      root.textContent = '';
      if (i >= cards.length) return drawEnd();
      var c = cards[i];
      var verdict = h('div', { role: 'status', 'aria-live': 'polite' });
      var skip = h('button', { class: 'choice choice-skip', type: 'button', onclick: function () { pick('skip'); } }, 'Bỏ qua');
      var keep = h('button', { class: 'choice choice-keep', type: 'button', onclick: function () { pick('keep'); } }, 'Kế thừa');
      function pick(a) {
        if (picked) return;
        picked = a;
        var ok = a === c.answer;
        if (ok) right++; else wrong++;
        skip.disabled = keep.disabled = true;
        (a === 'skip' ? skip : keep).classList.add('picked');
        var label = c.answer === 'skip' ? 'bỏ qua' : 'kế thừa';
        verdict.append(h('div', { class: 'verdict ' + (ok ? 'is-right' : 'is-wrong') },
          h('strong', null, (ok ? 'Đúng. ' : 'Chưa đúng. ') + 'Đáp án: ' + label + '.'),
          h('p', null, c.why),
          h('button', { class: 'btn', type: 'button', onclick: function () { i++; picked = null; draw(); } }, i + 1 >= cards.length ? 'Xem kết quả' : 'Thẻ tiếp theo')));
        verdict.firstChild.querySelector('button').focus();
      }
      root.append(
        h('div', { class: 'game-top' },
          h('h1', { class: 'lead', id: 'h1', 'data-r': true }, g.title + ' ' + g.how),
          h('p', { class: 'score-line', 'data-r': true }, 'Thẻ ' + (i + 1) + ' trên ' + cards.length)),
        h('div', { class: 'game-card', 'data-r': true }, h('p', null, c.text)),
        h('div', { class: 'choices', 'data-r': true }, skip, keep),
        verdict);
      rise(root);
    }

    function drawEnd() {
      root.append(h('div', { class: 'endcard' },
        h('div', null,
          h('p', { class: 'score-line', 'data-r': true }, 'Cả lớp đúng ' + right + ' trên ' + cards.length + ' thẻ.'),
          h('h1', { class: 'display', id: 'h1', 'data-r': true }, g.endTitle)),
        h('div', { class: 'hero-foot' },
          h('p', { class: 'lead', 'data-r': true }, g.endLead),
          h('button', { class: 'btn', type: 'button', 'data-r': true, onclick: function () { go('bai-1'); } }, g.endAction))));
      rise(root);
    }

    draw();
    return root;
  }

  /* ---------- màn lý thuyết ---------- */
  function poster(items, dense) {
    return h('ul', { class: 'poster' + (dense ? ' dense' : '') },
      items.map(function (it) {
        return h('li', { 'data-r': true }, h('p', { class: 'p-head' }, it[0]), h('p', { class: 'p-body' }, it[1]));
      }));
  }

  function renderTheory(s, idx) {
    var main = h('div', { class: 'slide-main' }, h('h2', { class: 'head', id: 'h1', 'data-r': true }, lines(s.title)));

    if (s.layout === 'bridge') {
      main.append(
        h('div', { class: 'cols2' }, s.cols.map(function (c) {
          return h('div', { class: 'panel', 'data-r': true }, h('h3', null, c.head), h('p', null, c.body));
        })),
        h('p', { class: 'lead', 'data-r': true }, s.lead));
    } else if (s.layout === 'poster') {
      main.append(poster(s.items, s.dense));
      if (s.example) main.append(h('p', { class: 'example', 'data-r': true }, h('strong', null, 'Ví dụ.'), s.example));
    } else if (s.layout === 'statement') {
      main.append(h('div', { class: 'statement-wrap' },
        h('p', { class: 'lead', 'data-r': true }, s.lead),
        h('ul', { class: 'points' }, s.points.map(function (p) {
          return h('li', { 'data-r': true }, s.pointsLabel ? h('strong', null, s.pointsLabel) : null, p);
        }))));
    } else if (s.layout === 'compare') {
      main.append(
        h('div', { class: 'cols2' }, s.sides.map(function (c) {
          return h('div', { class: 'panel', 'data-r': true }, h('h3', null, c.head), h('p', null, c.body));
        })),
        h('p', { class: 'lead', 'data-r': true }, s.lead));
    } else if (s.layout === 'timeline') {
      main.append(h('ul', { class: 'timeline' }, s.rows.map(function (r) {
        return h('li', { 'data-r': true }, h('p', { class: 't-year' }, r[0]), h('p', { class: 't-text' }, r[1]));
      })));
    } else if (s.layout === 'figures') {
      main.append(
        h('div', { class: 'figures' }, s.figures.map(function (f) {
          return h('div', { class: 'fig', 'data-r': true }, h('span', { class: 't-year' }, f[0]), h('p', null, f[1]));
        })),
        h('p', { class: 'dirs-title', 'data-r': true }, s.directionsTitle),
        h('ul', { class: 'dirs' }, s.directions.map(function (d) { return h('li', { 'data-r': true }, d); })));
    } else if (s.layout === 'close') {
      var sec = h('section', { class: 'screen closeup', 'aria-labelledby': 'h1' },
        h('h2', { class: 'display', id: 'h1', 'data-r': true }, lines(s.title)),
        h('div', { class: 'close-foot' },
          h('p', { class: 'lead', 'data-r': true }, s.lead),
          h('button', { class: 'btn', type: 'button', 'data-r': true, onclick: function () { go('on-tap'); } }, s.action)));
      return sec;
    }

    if (s.cite) main.append(h('p', { class: 'cite', 'data-r': true }, s.cite));
    var pic = shot(s.img);
    var sec2 = h('section', { class: 'screen' }, h('div', { class: 'slide' + (pic ? ' has-img' : '') }, main, pic));
    sec2.setAttribute('aria-labelledby', 'h1');
    return sec2;
  }

  /* ---------- trò chơi 2: ôn tập ---------- */
  function renderReview() {
    var R = C.review, step = 0, mistakes = 0;
    var root = h('section', { class: 'screen', 'aria-labelledby': 'h1' });
    var body = h('div', { class: 'board' });
    var tabs = h('div', { class: 'rounds', 'aria-label': 'Các vòng chơi' });
    root.append(h('h1', { class: 'head', id: 'h1', 'data-r': true }, R.title), tabs, body);

    function paintTabs() {
      tabs.textContent = '';
      R.rounds.forEach(function (n, k) {
        var cls = 'round-tab' + (k === step ? ' is-current' : k < step ? ' is-done' : '');
        tabs.append(h('span', { class: cls, 'aria-current': k === step ? 'step' : false }, n));
      });
    }
    function status() { return h('p', { class: 'status', role: 'status', 'aria-live': 'polite' }); }
    function next() { step++; start(); }

    function start() {
      paintTabs();
      body.textContent = '';
      if (step === 0) body.append(matchRound());
      else if (step === 1) body.append(clozeRound());
      else if (step === 2) body.append(orderRound());
      else endRound();
      rise(root);
    }

    function matchRound() {
      var m = R.match, pairs = m.pairs, left = pairs.map(function (p, i) { return { i: i, t: p[0] }; });
      var right = shuffle(pairs.map(function (p, i) { return { i: i, t: p[1] }; }));
      var sel = null, solved = 0, st = status();
      var lb = [], rb = [];
      function mk(item, side) {
        var b = h('button', { class: 'tile', type: 'button' }, item.t);
        b.addEventListener('click', function () {
          if (b.classList.contains('is-ok')) return;
          if (side === 'L') {
            lb.forEach(function (x) { x.b.classList.remove('is-sel'); });
            sel = item; b.classList.add('is-sel'); st.textContent = '';
            return;
          }
          if (!sel) { st.textContent = 'Chọn một mục ở cột trái trước.'; return; }
          if (sel.i === item.i) {
            var lbtn = lb.filter(function (x) { return x.item.i === sel.i; })[0].b;
            lbtn.classList.remove('is-sel'); lbtn.classList.add('is-ok'); b.classList.add('is-ok');
            sel = null; solved++; st.textContent = '';
            if (solved === pairs.length) { st.textContent = 'Ghép đúng cả ' + pairs.length + ' cặp.'; setTimeout(next, 900); }
          } else {
            mistakes++; b.classList.add('is-bad'); shake(b);
            setTimeout(function () { b.classList.remove('is-bad'); }, 600);
            st.textContent = 'Chưa khớp, thử lại.';
          }
        });
        return b;
      }
      left.forEach(function (it) { lb.push({ item: it, b: mk(it, 'L') }); });
      right.forEach(function (it) { rb.push({ item: it, b: mk(it, 'R') }); });
      return h('div', { class: 'board' },
        h('h2', { class: 'lead', 'data-r': true }, m.title),
        h('p', { class: 'how', 'data-r': true }, m.how),
        h('div', { class: 'match', 'data-r': true },
          h('div', { class: 'match-col' }, lb.map(function (x) { return x.b; })),
          h('div', { class: 'match-col' }, rb.map(function (x) { return x.b; }))),
        st);
    }

    function clozeRound() {
      var z = R.cloze, st = status(), active = 0;
      var vals = z.items.map(function () { return null; });
      var locked = z.items.map(function () { return false; });
      var blanks = [], chips = [];
      function paint() {
        blanks.forEach(function (b, i) {
          b.textContent = vals[i] || ' ';
          b.classList.toggle('is-active', i === active && !locked[i]);
        });
        chips.forEach(function (c) {
          c.disabled = vals.indexOf(c.dataset.w) >= 0;
        });
      }
      var paras = z.items.map(function (it, i) {
        var b = h('button', { class: 'blank', type: 'button', 'aria-label': 'Chỗ trống ' + (i + 1) });
        b.addEventListener('click', function () {
          if (locked[i]) return;
          if (vals[i]) vals[i] = null;
          b.classList.remove('is-bad');
          active = i; paint();
        });
        blanks.push(b);
        return h('p', { 'data-r': true }, it.before, b, it.after);
      });
      z.bank.forEach(function (w) {
        var c = h('button', { class: 'chip', type: 'button' }, w);
        c.dataset.w = w;
        c.addEventListener('click', function () {
          if (locked[active]) {
            var n = vals.findIndex(function (v, k) { return !v && !locked[k]; });
            if (n < 0) return;
            active = n;
          }
          vals[active] = w; blanks[active].classList.remove('is-bad');
          var nx = vals.findIndex(function (v, k) { return !v && !locked[k]; });
          if (nx >= 0) active = nx;
          paint();
        });
        chips.push(c);
      });
      var check = h('button', { class: 'btn', type: 'button' }, 'Kiểm tra');
      check.addEventListener('click', function () {
        var bad = 0, empty = 0;
        z.items.forEach(function (it, i) {
          if (locked[i]) return;
          if (!vals[i]) { empty++; return; }
          if (vals[i] === it.answer) { locked[i] = true; blanks[i].classList.add('is-ok'); }
          else { bad++; blanks[i].classList.add('is-bad'); shake(blanks[i]); }
        });
        if (empty) { st.textContent = 'Còn ' + empty + ' chỗ trống chưa điền.'; return; }
        if (bad) {
          mistakes += bad;
          st.textContent = 'Có ' + bad + ' chỗ chưa đúng. Bấm vào chỗ đó để điền lại.';
          z.items.forEach(function (it, i) { if (!locked[i] && vals[i]) { /* giữ lại để người chơi tự sửa */ } });
          return;
        }
        st.textContent = 'Điền đúng hết.';
        setTimeout(next, 900);
      });
      paint();
      return h('div', { class: 'board' },
        h('h2', { class: 'lead', 'data-r': true }, z.title),
        h('p', { class: 'how', 'data-r': true }, z.how),
        h('div', { class: 'cloze' }, paras),
        h('div', { class: 'bank', 'data-r': true }, chips),
        h('div', { class: 'row-actions', 'data-r': true }, check),
        st);
    }

    function orderRound() {
      var o = R.order, st = status(), pos = 0;
      var idx = o.items.map(function (_, i) { return i; });
      var placed = h('div', { class: 'placed' });
      var pool = h('div', { class: 'order-col' });
      shuffle(idx, true).forEach(function (i) {
        var b = h('button', { class: 'tile', type: 'button' }, o.items[i]);
        b.addEventListener('click', function () {
          if (i === pos) {
            b.remove();
            placed.append(h('div', { class: 'tile is-ok' }, h('span', { class: 'yr' }, o.reveal[i]), h('span', null, o.items[i])));
            pos++; st.textContent = '';
            if (pos === o.items.length) { st.textContent = 'Xếp đúng thứ tự.'; setTimeout(next, 1000); }
          } else {
            mistakes++; b.classList.add('is-bad'); shake(b);
            setTimeout(function () { b.classList.remove('is-bad'); }, 600);
            st.textContent = 'Chưa phải mốc sớm nhất còn lại, thử lại.';
          }
        });
        pool.append(b);
      });
      return h('div', { class: 'board' },
        h('h2', { class: 'lead', 'data-r': true }, o.title),
        h('p', { class: 'how', 'data-r': true }, o.how),
        h('div', { class: 'order', 'data-r': true },
          h('div', { class: 'order-col' }, h('h3', null, 'Còn lại'), pool),
          h('div', { class: 'order-col' }, h('h3', null, 'Đã xếp'), placed)),
        st);
    }

    function endRound() {
      body.append(
        h('p', { class: 'score-line', 'data-r': true }, R.endTitle + ' Số lần chọn chưa đúng: ' + mistakes + '.'),
        h('div', { class: 'row-actions', 'data-r': true },
          h('button', { class: 'btn', type: 'button', onclick: function () { go('hoi-dap'); } }, R.endAction),
          h('button', { class: 'btn btn-quiet', type: 'button', onclick: function () { step = 0; mistakes = 0; start(); } }, 'Chơi lại')));
    }

    start();
    return root;
  }

  /* ---------- hỏi đáp ---------- */
  function qaBlock(b) {
    return h('div', { class: 'qa-block' },
      h('h2', null, b.title),
      h('div', { class: 'qa-text' }, b.items.map(function (it) {
        return h('p', { 'data-r': true }, h('span', { class: 'q' }, it[0]), it[1]);
      })));
  }
  function renderQA() {
    var q = C.qa;
    return h('section', { class: 'screen', 'aria-labelledby': 'h1' },
      h('h1', { class: 'head', id: 'h1', 'data-r': true }, q.title),
      qaBlock(q.exam),
      qaBlock(q.more),
      h('p', { class: 'cite', 'data-r': true }, C.source));
  }

  /* ---------- nguồn ---------- */
  function renderCredits() {
    var keys = Object.keys(IMG);
    return h('section', { class: 'screen', 'aria-labelledby': 'h1' },
      h('h1', { class: 'head', id: 'h1', 'data-r': true }, 'Nguồn nội dung và ảnh'),
      h('ul', { class: 'credits-list' },
        h('li', { 'data-r': true }, C.source),
        keys.length
          ? keys.map(function (k) {
              var d = IMG[k];
              return h('li', { 'data-r': true }, [d.caption || d.alt, d.credit && ('Ảnh: ' + d.credit), d.license, d.source].filter(Boolean).join(' · '));
            })
          : h('li', { 'data-r': true }, 'Trang chưa có ảnh minh họa. Ảnh thật có nguồn sẽ được ghi ở đây.')));
  }

  /* ---------- điều hướng ---------- */
  var current = 0;
  function hashId() { return (location.hash || '').replace(/^#\//, '') || 'mo-dau'; }
  function indexFromId(id) {
    for (var i = 0; i < screens.length; i++) if (screens[i].id === id) return i;
    return 0;
  }
  function show(forcedId) {
    current = indexFromId(forcedId || hashId());
    var s = screens[current];
    shownId = s.id;
    document.body.setAttribute('data-field', s.field);
    document.body.classList.toggle('no-bar', !s.bar);
    stage.textContent = '';
    var el = s.render();
    stage.append(el);
    rise(el);
    document.querySelectorAll('.links a').forEach(function (a) {
      if (a.dataset.group === s.group) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
    bar.hidden = !s.bar;
    notesEl.hidden = true;
    notesBtn.setAttribute('aria-expanded', 'false');
    if (s.bar) {
      var pct = Math.round(((s.n + 1) / T.length) * 100);
      barFill.style.width = pct + '%';
      barTitle.textContent = (s.n + 1) + ' / ' + T.length + ' · ' + s.slide.short;
      prevBtn.disabled = false;
      nextBtn.textContent = s.n === T.length - 1 ? 'Ôn tập' : 'Tiếp';
      fillNotes(s.slide);
    }
    window.scrollTo(0, 0);
    document.title = (s.slide ? s.slide.short + ' · ' : '') + 'MLN131 Nhóm 1';
  }
  function fillNotes(sl) {
    notesEl.textContent = '';
    notesEl.append(h('h2', null, 'Gợi ý nói'), h('ul', null, sl.notes.map(function (n) { return h('li', null, n); })));
  }
  function step(d) {
    var s = screens[current];
    if (!s.bar) return;
    var n = s.n + d;
    if (n < 0) { go('tro-choi'); return; }
    if (n >= T.length) { go('on-tap'); return; }
    go('bai-' + (n + 1));
  }
  prevBtn.addEventListener('click', function () { step(-1); });
  nextBtn.addEventListener('click', function () { step(1); });
  notesBtn.addEventListener('click', function () {
    notesEl.hidden = !notesEl.hidden;
    notesBtn.setAttribute('aria-expanded', String(!notesEl.hidden));
  });
  document.addEventListener('keydown', function (e) {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    var tag = (e.target && e.target.tagName) || '';
    if (tag === 'INPUT' || tag === 'TEXTAREA') return;
    if (e.key === 'ArrowRight' || e.key === 'PageDown') { step(1); }
    else if (e.key === 'ArrowLeft' || e.key === 'PageUp') { step(-1); }
    else if (e.key === 'n' || e.key === 'N') { if (screens[current].bar) notesBtn.click(); }
    else if (e.key === 'f' || e.key === 'F') {
      if (document.fullscreenElement) document.exitFullscreen().catch(function () {});
      else if (document.documentElement.requestFullscreen) document.documentElement.requestFullscreen().catch(function () {});
    }
  });
  window.addEventListener('hashchange', function () { if (hashId() !== shownId) show(); });
  show();
})();
