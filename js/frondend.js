// js phần component
document.addEventListener("DOMContentLoaded", () => {
  const includeElements = document.querySelectorAll("[data-include]");

  includeElements.forEach(async el => {
    const file = el.getAttribute("data-include");
    if (!file) return;

    try {
      // Thêm timestamp để tránh cache + dùng no-store
      const response = await fetch(`${file}?v=${Date.now()}`, { cache: "no-store" });
      if (!response.ok) throw new Error(`Không tìm thấy file: ${file}`);

      const text = await response.text();
      el.innerHTML = text;

      // ✅ Gọi lại hàm responsive nếu cần sau khi innerHTML xong
      if (typeof initResponsive === "function") {
        initResponsive(el); // hoặc truyền cả el nếu muốn scoped
      }

    } catch (err) {
      el.innerHTML = `
        <div style="color: red; padding: 1rem; background: #fff0f0; border: 1px solid red;">
          ⚠ Không tải được component: <strong>${file}</strong>
        </div>
      `;
      console.error("Lỗi khi fetch:", file, err);
    }
  });
});

// js thêm width và height vào bất kì thẻ img
document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll("img");

  images.forEach((img) => {
    // Nếu ảnh đã load rồi thì gán trực tiếp
    if (img.complete) {
      setDimensions(img);
    } else {
      // Nếu chưa load, chờ load xong rồi mới xử lý
      img.addEventListener("load", function () {
        setDimensions(img);
      });
    }
  });

  function setDimensions(img) {
    if (!img.hasAttribute("width")) {
      img.setAttribute("width", img.naturalWidth);
    }
    if (!img.hasAttribute("height")) {
      img.setAttribute("height", img.naturalHeight);
    }
  }
});

// js banner chỗ trang chủ
$(document).ready(function () {
  const $banner = $(".slide-cmt");

  if ($banner.length) {
    const $images = $banner.children("div");
    const currentCount = $images.length;

    if (currentCount < 2) {
      const clonesNeeded = 3 - currentCount;

      for (let i = 0; i < clonesNeeded; i++) {
        const $clone = $images.eq(0).clone();
        $banner.append($clone);
      }
    }
    $banner.slick({
      infinite: true,
      speed: 500,
      dots: false,
      autoplay: true,
      arrows: false,
      touchMove: false,
    });
  } else {
    console.log("Không tìm thấy .slide-cmt – Slick không khởi tạo.");
  }
});


