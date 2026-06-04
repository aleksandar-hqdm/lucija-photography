(function () {
  document.getElementById("year").textContent = "2026";

  var photos = (window.PHOTOS || []);
  var gallery = document.getElementById("gallery");
  var empty = document.getElementById("gallery-empty");

  if (!photos.length) {
    if (empty) empty.hidden = false;
    return;
  }

  photos.forEach(function (p, i) {
    var fig = document.createElement("figure");
    fig.dataset.index = i;
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
  });

  // Lightbox
  var lb = document.getElementById("lightbox");
  var lbImg = document.getElementById("lb-img");
  var cur = 0;

  function open(i) {
    cur = i;
    render();
    lb.hidden = false;
    document.body.style.overflow = "hidden";
  }
  function close() {
    lb.hidden = true;
    document.body.style.overflow = "";
  }
  function step(d) {
    cur = (cur + d + photos.length) % photos.length;
    render();
  }
  function render() {
    var p = photos[cur];
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
