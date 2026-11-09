/* ==========================================================================
   باشكا برغر — كل البيانات القابلة للتعديل في أعلى هذا الملف
   ========================================================================== */
(function () {
  "use strict";

  /* ===== 1) بيانات المحل ===== */
  const SHOP = {
    name: "منيو مطعم المثلث",
    whatsapp: "970XXXXXXXXX", // رقم واتساب بالصيغة الدولية بدون + أو 00
    phone: "05X-XXX-XXXX",
    phoneHref: "+970XXXXXXXXX",
    instagram: "https://instagram.com/",
    instagramHandle: "@pashka_burger",
    address: "حوسان - مثلث نحالين",
  };
  const CUR = "₪";

  /* ===== 2) الصور (Unsplash المجانية) — لاستبدالها: "images/اسم.jpg" ===== */
  const u = (id, w) => "https://images.unsplash.com/photo-" + id + "?auto=format&fit=crop&w=" + (w || 900) + "&q=80";
  const IMG = {
    burger: u("1626111740066-e595bce778f0"),
    smash: u("1688246780164-00c01647e78c"),
    chicken: u("1670237734838-821685a738b2"),
    sandwich: u("1721035993986-2547b311f9df"),
    fries: u("1526230427044-d092040d48dc"),
    redDrink: u("1600332098294-2e6fefaa6d66"),
    limeDrink: u("1608981618938-d8a334ae9e93"),
  };

  /* ===== 3) الأقسام ===== */
  const CATS = [
    { id: "all", name: "الكل" },
    { id: "burger", name: "برغر" },
    { id: "masahab", name: "مسحب" },
    { id: "sandwich", name: "ساندويشات" },
    { id: "snacks", name: "سناكس" },
    { id: "drinks", name: "كوكتيل ومشروبات" },
  ];

  /* ===== 4) المنيو — أضف / عدّل / احذف أي صنف (الأسعار أمثلة) ===== */
  const ITEMS = [
    { id: "b1", cat: "burger", name: "باشكا برغر كلاسيك", price: 22, img: IMG.burger, badge: "الأكثر طلبًا",
      desc: "قطعة لحم مشوية، جبنة، خس، طماطم وصوص باشكا الخاص." },
    { id: "b2", cat: "burger", name: "باشكا دبل", price: 30, img: IMG.smash,
      desc: "قطعتين لحم مع جبنة مضاعفة وصوص باشكا لأصحاب الشهية الكبيرة." },
    { id: "b3", cat: "burger", name: "برغر دجاج كريسبي", price: 24, img: IMG.chicken,
      desc: "صدر دجاج مقرمش مع خس وجبنة وصوص مايونيز." },
    { id: "b4", cat: "burger", name: "سموش برغر", price: 26, img: IMG.smash, badge: "جديد",
      desc: "لحم مهروس على الشواية بحواف مقرمشة وجبنة ذائبة." },

    { id: "m1", cat: "masahab", name: "ساندويش مسحب دجاج", price: 18, img: IMG.sandwich, badge: "الأكثر طلبًا",
      desc: "دجاج مسحّب متبّل مع خضار وصوص الثوم في خبز طازج." },
    { id: "m2", cat: "masahab", name: "ساندويش مسحب لحم", price: 22, img: IMG.sandwich,
      desc: "لحم مسحّب طري مع بصل وطحينة وخضار مخلل." },
    { id: "m3", cat: "masahab", name: "وجبة مسحب", price: 28, img: IMG.chicken,
      desc: "ساندويش مسحب مع بطاطا مقلية ومشروب غازي." },

    { id: "s1", cat: "sandwich", name: "ساندويش دجاج مشوي", price: 16, img: IMG.sandwich,
      desc: "دجاج مشوي، خس، طماطم وصوص الثوم." },
    { id: "s2", cat: "sandwich", name: "ساندويش جبنة مشوية", price: 12, img: IMG.sandwich,
      desc: "جبنة ذائبة في خبز محمّص مقرمش." },

    { id: "f1", cat: "snacks", name: "بطاطا مقلية", price: 10, img: IMG.fries,
      desc: "بطاطا ذهبية مقرمشة مع الكاتشب." },
    { id: "f2", cat: "snacks", name: "بطاطا بالجبنة", price: 14, img: IMG.fries,
      desc: "بطاطا مقلية مغطاة بصوص الجبنة الساخن." },

    { id: "d1", cat: "drinks", name: "كوكتيل فراولة", price: 14, img: IMG.redDrink, badge: "الأكثر طلبًا",
      desc: "فراولة طازجة مع عصير وثلج، منعش وحلو." },
    { id: "d2", cat: "drinks", name: "موهيتو ليمون ونعناع", price: 14, img: IMG.limeDrink,
      desc: "ليمون طازج ونعناع وصودا باردة." },
    { id: "d3", cat: "drinks", name: "كوكتيل توت", price: 15, img: IMG.redDrink,
      desc: "مزيج توت ملوّن مع ثلج وطعم غني." },
  ];

  /* ==========================================================================
     الكود (لا تحتاج تعدّل ما تحته)
     ========================================================================== */
  const $ = (s) => document.querySelector(s);
  const fmt = (n) => n + " " + CUR;
  const waLink = (t) => "https://wa.me/" + SHOP.whatsapp + (t ? "?text=" + encodeURIComponent(t) : "");

  let active = "all";
  let cart = {};
  try { cart = JSON.parse(localStorage.getItem("pashkaCart") || "{}"); } catch (e) { cart = {}; }
  Object.keys(cart).forEach((id) => { if (!ITEMS.some((i) => i.id === id)) delete cart[id]; });

  const save = () => { try { localStorage.setItem("pashkaCart", JSON.stringify(cart)); } catch (e) {} };
  const find = (id) => ITEMS.find((i) => i.id === id);
  const count = () => Object.values(cart).reduce((a, b) => a + b, 0);
  const total = () => Object.keys(cart).reduce((s, id) => s + find(id).price * cart[id], 0);

  /* --- الأقسام --- */
  function renderCats() {
    $("#catsTrack").innerHTML = CATS.map((c) =>
      '<button type="button" class="chip' + (c.id === active ? " on" : "") + '" data-cat="' + c.id +
      '" aria-pressed="' + (c.id === active) + '">' + c.name + "</button>").join("");
  }

  /* --- كرت الصنف (زر إضافة أو عدّاد) --- */
  const ctl = (id) =>
    cart[id]
      ? '<div class="step"><button type="button" data-act="dec" data-id="' + id + '" aria-label="إنقاص">&minus;</button><span>' +
        cart[id] + '</span><button type="button" data-act="inc" data-id="' + id + '" aria-label="زيادة">+</button></div>'
      : '<button type="button" class="add" data-act="inc" data-id="' + id + '">+ أضف</button>';

  function renderGrid() {
    const list = ITEMS.filter((i) => active === "all" || i.cat === active);
    $("#grid").innerHTML = list.map((i, n) =>
      '<article class="item" style="animation-delay:' + Math.min(n, 8) * 50 + 'ms">' +
      '<div class="item-media"><img src="' + i.img + '" alt="' + i.name + '" loading="lazy">' +
      (i.badge ? '<span class="badge">' + i.badge + "</span>" : "") + "</div>" +
      '<div class="item-body"><h3>' + i.name + "</h3><p>" + i.desc + "</p>" +
      '<div class="item-foot"><span class="price">' + fmt(i.price) + '</span><span data-ctl="' + i.id + '">' + ctl(i.id) +
      "</span></div></div></article>").join("");
  }

  /* --- السلة --- */
  function setQty(id, q) {
    if (q <= 0) delete cart[id]; else cart[id] = Math.min(q, 30);
    save();
    const holder = document.querySelector('[data-ctl="' + id + '"]');
    if (holder) holder.innerHTML = ctl(id);
    updateBar();
    if (!$("#overlay").hidden) renderSheet();
  }

  function updateBar() {
    const c = count();
    $("#cartCount").hidden = c === 0;
    $("#cartCount").textContent = c;
    $("#cartBar").hidden = c === 0;
    $("#cbCount").textContent = c;
    $("#cbTotal").textContent = fmt(total());
  }

  function renderSheet() {
    const ids = Object.keys(cart);
    $("#empty").hidden = ids.length > 0;
    $("#orderForm").hidden = ids.length === 0;
    $("#sheetFoot").hidden = ids.length === 0;
    $("#lines").innerHTML = ids.map((id) => {
      const i = find(id);
      return '<li><img src="' + i.img + '" alt=""><div class="li-info"><b>' + i.name + "</b><small>" + fmt(i.price * cart[id]) +
        '</small></div><div class="step"><button type="button" data-act="dec" data-id="' + id + '" aria-label="إنقاص">&minus;</button><span>' +
        cart[id] + '</span><button type="button" data-act="inc" data-id="' + id + '" aria-label="زيادة">+</button></div></li>';
    }).join("");
    $("#sheetTotal").textContent = fmt(total());
  }

  const openSheet = () => { renderSheet(); $("#overlay").hidden = false; document.body.style.overflow = "hidden"; };
  const closeSheet = () => { $("#overlay").hidden = true; document.body.style.overflow = ""; };

  function buildMessage() {
    const name = $("#custName").value.trim();
    const note = $("#custNote").value.trim();
    const lines = ["🍔 *طلب جديد - " + SHOP.name + "*", "——————————"];
    Object.keys(cart).forEach((id, n) => {
      const i = find(id);
      lines.push((n + 1) + ". " + i.name + " × " + cart[id] + " = " + fmt(i.price * cart[id]));
    });
    lines.push("——————————", "💵 *المجموع:* " + fmt(total()));
    if (name) lines.push("👤 *الاسم:* " + name);
    if (note) lines.push("📝 *العنوان / ملاحظات:* " + note);
    return lines.join("\n");
  }

  let toastTimer;
  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg; t.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => (t.hidden = true), 2200);
  }

  /* --- الأحداث --- */
  document.addEventListener("click", (e) => {
    const chip = e.target.closest(".chip");
    if (chip) { active = chip.dataset.cat; renderCats(); renderGrid(); return; }

    const b = e.target.closest("[data-act]");
    if (b) {
      const id = b.dataset.id;
      const next = (cart[id] || 0) + (b.dataset.act === "inc" ? 1 : -1);
      setQty(id, next);
      if (b.dataset.act === "inc" && next === 1) toast("تمت إضافة " + find(id).name);
    }
  });

  $("#cartBtn").addEventListener("click", openSheet);
  $("#cartBar").addEventListener("click", openSheet);
  $("#sheetClose").addEventListener("click", closeSheet);
  $("#overlay").addEventListener("click", (e) => { if (e.target.id === "overlay") closeSheet(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !$("#overlay").hidden) closeSheet(); });
  $("#sendBtn").addEventListener("click", () => {
    if (!count()) return;
    window.open(waLink(buildMessage()), "_blank", "noopener,noreferrer");
  });

  /* --- تعبئة بيانات المحل --- */
  function init() {
    document.title = SHOP.name + " | برغر، مسحب، ساندويشات ومشروبات كوكتيل";
    $("#shopName").textContent = SHOP.name;
    $("#footName").textContent = SHOP.name;
    $("#heroImg").src = u("1688246780164-00c01647e78c", 1800);
    $("#topWa").href = waLink("مرحبا، بدي أستفسر عن المنيو");
    $("#year").textContent = new Date().getFullYear();
    $("#footInfo").innerHTML =
      "<li>📍 " + SHOP.address + "</li>" +
      '<li><a href="tel:' + SHOP.phoneHref + '" dir="ltr">📞 ' + SHOP.phone + "</a></li>" +
      '<li><a href="' + SHOP.instagram + '" target="_blank" rel="noopener noreferrer" dir="ltr">📸 ' + SHOP.instagramHandle + "</a></li>" +
      '<li><a href="' + waLink() + '" target="_blank" rel="noopener noreferrer">💬 واتساب</a></li>';
    renderCats();
    renderGrid();
    updateBar();
  }
  document.addEventListener("DOMContentLoaded", init);
})();
