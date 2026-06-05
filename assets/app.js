(function () {
  document.getElementById("year").textContent = "2026";

  var photos = (window.PHOTOS || []);
  var gallery = document.getElementById("gallery");
  var empty = document.getElementById("gallery-empty");

  if (!photos.length) {
    if (empty) empty.hidden = false;
    return;
  }

  var figures = [];
  photos.forEach(function (p, i) {
    var fig = document.createElement("figure");
    fig.dataset.index = i;
    fig.dataset.cat = p.category || "";
    var img = document.createElement("img");
    img.src = "images/" + p.src;
    img.alt = p.alt || "Lucija Spasevska photography";
    img.loading = "lazy";
    fig.appendChild(img);
    if (p.caption) {
      var cap = document.createElement("figcaption");
      cap.textContent = p.caption;
      fig.appendChild(cap);
    }
    fig.addEventListener("click", function () { open(i); });
    gallery.appendChild(fig);
    figures.push(fig);
  });

  // Category filters
  var current = "all";
  var bar = document.getElementById("filters");
  var VALID = ["theater", "music", "sports", "ceremony", "exhibition", "kids", "food"];

  function applyFilter(cat) {
    current = cat;
    if (bar) {
      bar.querySelectorAll(".filter").forEach(function (x) {
        x.classList.toggle("active", x.dataset.cat === cat);
      });
    }
    figures.forEach(function (f) {
      f.style.display = (cat === "all" || f.dataset.cat === cat) ? "" : "none";
    });
  }

  if (bar) {
    bar.addEventListener("click", function (e) {
      var b = e.target.closest(".filter");
      if (!b) return;
      applyFilter(b.dataset.cat);
      if (history.replaceState) {
        history.replaceState(null, "", b.dataset.cat === "all" ? "#" : "#" + b.dataset.cat);
      }
    });
  }

  // Allow deep links like .../#food to open a category directly
  var initial = (location.hash || "").replace("#", "");
  if (VALID.indexOf(initial) >= 0) applyFilter(initial);

  function visibleIndices() {
    var out = [];
    photos.forEach(function (p, i) {
      if (current === "all" || p.category === current) out.push(i);
    });
    return out;
  }

  // Lightbox (navigates within the currently filtered set)
  var lb = document.getElementById("lightbox");
  var lbImg = document.getElementById("lb-img");
  var list = [];
  var pos = 0;

  function open(i) {
    list = visibleIndices();
    pos = list.indexOf(i);
    if (pos < 0) { list = [i]; pos = 0; }
    render();
    lb.hidden = false;
    document.body.style.overflow = "hidden";
  }
  function close() {
    lb.hidden = true;
    document.body.style.overflow = "";
  }
  function step(d) {
    pos = (pos + d + list.length) % list.length;
    render();
  }
  function render() {
    var p = photos[list[pos]];
    lbImg.src = "images/" + p.src;
    lbImg.alt = p.alt || "Lucija Spasevska photography";
  }

  lb.querySelector(".lb-close").addEventListener("click", close);
  lb.querySelector(".lb-prev").addEventListener("click", function (e) { e.stopPropagation(); step(-1); });
  lb.querySelector(".lb-next").addEventListener("click", function (e) { e.stopPropagation(); step(1); });
  lb.addEventListener("click", function (e) { if (e.target === lb) close(); });
  document.addEventListener("keydown", function (e) {
    if (lb.hidden) return;
    if (e.key === "Escape") close();
    else if (e.key === "ArrowLeft") step(-1);
    else if (e.key === "ArrowRight") step(1);
  });
})();
