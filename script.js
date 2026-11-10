
/* ==========================================================================
   باشكا برغر — كل البيانات القابلة للتعديل في أعلى هذا الملف
   ========================================================================== */
(function () {
  "use strict";

  /* ===== 1) بيانات المحل ===== */
  const SHOP = {
    name: "منيو مطعم المثلث",
    whatsapp: "970XXXXXXXXX",
    phone: "05X-XXX-XXXX",
    phoneHref: "+970XXXXXXXXX",
    instagram: "https://instagram.com/",
    instagramHandle: "@pashka_burger",
    address: "حوسان - مثلث نحالين"
  };

  const CUR = "₪";

  /* ===== 2) الصور ===== */
  const u = (id, w) =>
    "https://images.unsplash.com/photo-" + id +
    "?auto=format&fit=crop&w=" + (w || 900) + "&q=80";

  const IMG = {
    burger: u("1626111740066-e595bce778f0"),
    smash: u("1688246780164-00c01647e78c"),
    chicken: u("1670237734838-821685a738b2"),
    sandwich: u("1721035993986-2547b311f9df"),
    fries: u("1526230427044-d092040d48dc"),
    redDrink: u("1600332098294-2e6fefaa6d66"),
    limeDrink: u("1608981618938-d8a334ae9e93")
  };

  /* ===== 3) الأقسام ===== */
  const CATS = [
    { id: "all", name: "الكل" },
    { id: "burger", name: "برغر" },
    { id: "masahab", name: "مسحب" },
    { id: "sandwich", name: "ساندويشات" },
    { id: "snacks", name: "سناكس" },
    { id: "drinks", name: "كوكتيل ومشروبات" }
  ];

  /* ===== 4) المنيو — أضف / عدّل / احذف أي صنف ===== */
  const ITEMS = [

    // قسم المسحب
    {
      id: "m1",
      cat: "masahab",
      name: "ساندويش مسحب",
      price: 12,
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU4dr2pUbA__CqpZCeMrADa38drqTAbL6lZ5qRgJ99bw&s=10",

      badge: "الأكثر طلبًا",
      desc: "ساندويش مسحب دجاج طازج مع الصوص والخضار."
    },
    {
      id: "m2",
      cat: "masahab",
      name: "وجبة مسحب",
      price: 20,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREoqs8jQaMOeZR1XGLVUcfRd8gsTF1i2vDaJ0MVdjVCg&s=10",
      desc: "وجبة مسحب مع بطاطا مقلية ومشروب كولا."
    },

    // قسم البرغر
    {
      id: "b1",
      cat: "burger",
      name: "برغر",
      price: null,
      img: IMG.burger,
      desc: "برغر شهي مع الخضار والصوص."
    },
    {
      id: "b2",
      cat: "burger",
      name: "وجبة برغر",
      price: null,
      img: IMG.smash,
      desc: "وجبة برغر تقدم مع البطاطا ومشروب كولا."
    },

    // قسم الساندويشات
    {
      id: "s1",
      cat: "sandwich",
      name: "ساندويش باشكا",
      price: null,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR983W4oDM8G3PKA7XKseflvbFeT43RsdotUFUo6CXz-Q&s=10",
      desc: "ساندويش باشكا المميز."
    },
    {
      id: "s2",
      cat: "sandwich",
      name: "ساندويش نقانق",
      price: null,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUv0_04ciKoKGWJU96f63Mv2lZ6dOAZRkuYtruhndwfA&s=10",
      desc: "ساندويش نقانق مع الإضافات والصوص."
    },
    {
      id: "s3",
      cat: "sandwich",
      name: "ساندويش جبنة",
      price: null,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoTy84a75JqASmL7Bu1BRL8X-ed1VrPnVB3RV2R3PtKA&s=10",
      desc: "ساندويش جبنة ساخنة ولذيذة."
    },

    // قسم السناكس
    {
      id: "f1",
      cat: "snacks",
      name: "وجبة باشكا",
      price: null,
      img: IMG.chicken,
      desc: "وجبة باشكا المميزة."
    },
    {
      id: "f2",
      cat: "snacks",
      name: "شنيتسل",
      price: null,
      img: IMG.chicken,
      desc: "قطع شنيتسل مقرمشة."
    },
    {
      id: "f3",
      cat: "snacks",
      name: "أصابع جاج",
      price: null,
      img: IMG.chicken,
      desc: "أصابع دجاج مقرمشة."
    },
    {
      id: "f4",
      cat: "snacks",
      name: "خبيصة",
      price: null,
      img: IMG.fries,
      desc: "خبيصة بطاطا مع الإضافات."
    },
    {
      id: "f5",
      cat: "snacks",
      name: "صحن بطاطا كبير",
      price: null,
      img: IMG.fries,
      desc: "صحن كبير من البطاطا المقلية."
    }

  ];

  /* ==========================================================================
     الكود الأساسي — لا تحتاج تعدّل ما تحته
     ========================================================================== */

  const $ = (s) => document.querySelector(s);

  const fmt = (n) => n == null ? "يحدد لاحقًا" : n + " " + CUR;

  const waLink = (t) =>
    "https://wa.me/" + SHOP.whatsapp +
    (t ? "?text=" + encodeURIComponent(t) : "");

  let active = "all";
  let cart = {};

  try {
    cart = JSON.parse(localStorage.getItem("pashkaCart") || "{}");
  } catch (e) {
    cart = {};
  }

  Object.keys(cart).forEach((id) => {
    if (!ITEMS.some((i) => i.id === id)) delete cart[id];
  });

  const save = () => {
    try {
      localStorage.setItem("pashkaCart", JSON.stringify(cart));
    } catch (e) {}
  };

  const find = (id) => ITEMS.find((i) => i.id === id);

  const count = () =>
    Object.values(cart).reduce((a, b) => a + b, 0);

  const total = () =>
    Object.keys(cart).reduce((s, id) => {
      const item = find(id);
      return s + (item && item.price != null ? item.price * cart[id] : 0);
    }, 0);

  /* --- الأقسام --- */
  function renderCats() {
    $("#catsTrack").innerHTML = CATS.map((c) =>
      '<button type="button" class="chip' +
      (c.id === active ? " on" : "") +
      '" data-cat="' + c.id +
      '" aria-pressed="' + (c.id === active) +
      '">' + c.name + "</button>"
    ).join("");
  }

  /* --- كرت الصنف (زر إضافة أو عدّاد) --- */
  const ctl = (id) =>
    cart[id]
      ? '<div class="step">' +
        '<button type="button" data-act="dec" data-id="' + id + '" aria-label="إنقاص">&minus;</button>' +
        '<span>' + cart[id] + '</span>' +
        '<button type="button" data-act="inc" data-id="' + id + '" aria-label="زيادة">+</button>' +
        '</div>'
      : '<button type="button" class="add" data-act="inc" data-id="' + id + '">+ أضف</button>';

  function renderGrid() {
    const list = ITEMS.filter((i) =>
      active === "all" || i.cat === active
    );

    $("#grid").innerHTML = list.map((i, n) =>
      '<article class="item" style="animation-delay:' +
      Math.min(n, 8) * 50 + 'ms">' +

      '<div class="item-media">' +
      '<img src="' + i.img + '" alt="' + i.name + '" loading="lazy">' +
      (i.badge ? '<span class="badge">' + i.badge + "</span>" : "") +
      "</div>" +

      '<div class="item-body">' +
      '<h3>' + i.name + "</h3>" +
      '<p>' + i.desc + "</p>" +

      '<div class="item-foot">' +
      '<span class="price">' + fmt(i.price) + '</span>' +
      '<span data-ctl="' + i.id + '">' + ctl(i.id) + '</span>' +
      "</div></div></article>"
    ).join("");
  }

  /* --- السلة --- */
  function setQty(id, q) {
    if (q <= 0) {
      delete cart[id];
    } else {
      cart[id] = Math.min(q, 30);
    }

    save();

    const holder = document.querySelector('[data-ctl="' + id + '"]');

    if (holder) {
      holder.innerHTML = ctl(id);
    }

    updateBar();

    if (!$("#overlay").hidden) {
      renderSheet();
    }
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
      if (!i) return "";

      return '<li>' +
        '<img src="' + i.img + '" alt="">' +

        '<div class="li-info">' +
        '<b>' + i.name + "</b>" +
        '<small>' + fmt(i.price == null ? null : i.price * cart[id]) + "</small>" +
        '</div>' +

        '<div class="step">' +
        '<button type="button" data-act="dec" data-id="' + id + '" aria-label="إنقاص">&minus;</button>' +
        '<span>' + cart[id] + '</span>' +
        '<button type="button" data-act="inc" data-id="' + id + '" aria-label="زيادة">+</button>' +
        '</div>' +

        "</li>";
    }).join("");

    $("#sheetTotal").textContent = fmt(total());
  }

  const openSheet = () => {
    renderSheet();
    $("#overlay").hidden = false;
    document.body.style.overflow = "hidden";
  };

  const closeSheet = () => {
    $("#overlay").hidden = true;
    document.body.style.overflow = "";
  };

  /* --- تجهيز رسالة الطلب --- */
  function buildMessage() {
    const name = $("#custName").value.trim();
    const note = $("#custNote").value.trim();

    const lines = [
      "🍔 *طلب جديد - " + SHOP.name + "*",
      "——————————"
    ];

    Object.keys(cart).forEach((id, n) => {
      const i = find(id);
      if (!i) return;

      lines.push(
        (n + 1) + ". " + i.name +
        " × " + cart[id] +
        " = " + fmt(i.price == null ? null : i.price * cart[id])
      );
    });

    lines.push(
      "——————————",
      "💵 *المجموع:* " + fmt(total())
    );

    if (name) {
      lines.push("👤 *الاسم:* " + name);
    }

    if (note) {
      lines.push("📝 *العنوان / ملاحظات:* " + note);
    }

    return lines.join("\n");
  }

  /* --- رسائل التنبيه --- */
  let toastTimer;

  function toast(msg) {
    const t = $("#toast");

    t.textContent = msg;
    t.hidden = false;

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
      t.hidden = true;
    }, 2200);
  }

  /* ==========================================================================
     الأحداث
     ========================================================================== */

  document.addEventListener("click", (e) => {

    const chip = e.target.closest(".chip");

    if (chip) {
      active = chip.dataset.cat;
      renderCats();
      renderGrid();
      return;
    }

    const b = e.target.closest("[data-act]");

    if (b) {
      const id = b.dataset.id;

      const next =
        (cart[id] || 0) +
        (b.dataset.act === "inc" ? 1 : -1);

      setQty(id, next);

      if (b.dataset.act === "inc" && next === 1) {
        toast("تمت إضافة " + find(id).name);
      }
    }
  });

  $("#cartBtn").addEventListener("click", openSheet);

  $("#cartBar").addEventListener("click", openSheet);

  $("#sheetClose").addEventListener("click", closeSheet);

  $("#overlay").addEventListener("click", (e) => {
    if (e.target.id === "overlay") {
      closeSheet();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !$("#overlay").hidden) {
      closeSheet();
    }
  });

  $("#sendBtn").addEventListener("click", () => {
    if (!count()) return;

    window.open(
      waLink(buildMessage()),
      "_blank",
      "noopener,noreferrer"
    );
  });

  /* ==========================================================================
     تعبئة بيانات المحل وتشغيل الموقع
     ========================================================================== */

  function init() {

    document.title =
      SHOP.name + " | برغر، مسحب، ساندويشات ومشروبات كوكتيل";

    $("#shopName").textContent = SHOP.name;
    $("#footName").textContent = SHOP.name;

    $("#heroImg").src = u(
      "1688246780164-00c01647e78c",
      1800
    );

    $("#topWa").href = waLink("مرحبا، بدي أستفسر عن المنيو");

    $("#year").textContent = new Date().getFullYear();

    $("#footInfo").innerHTML =
      "<li>📍 " + SHOP.address + "</li>" +

      '<li><a href="tel:' + SHOP.phoneHref +
      '" dir="ltr">📞 ' + SHOP.phone + "</a></li>" +

      '<li><a href="' + SHOP.instagram +
      '" target="_blank" rel="noopener noreferrer" dir="ltr">📸 ' +
      SHOP.instagramHandle + "</a></li>" +

      '<li><a href="' + waLink() +
      '" target="_blank" rel="noopener noreferrer">💬 واتساب</a></li>';

    renderCats();
    renderGrid();
    updateBar();
  }

  document.addEventListener("DOMContentLoaded", init);

})();
