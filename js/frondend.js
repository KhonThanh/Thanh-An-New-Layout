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

//  kiểm tra phần danh mục
document.addEventListener("DOMContentLoaded", function () {
  const content = document.querySelector(".article-content");
  const tocList = document.querySelector(".toc-list");
  const tocToggle = document.querySelector(".toc-toggle");
  const tocWrapper = document.querySelector(".toc-wrapper");

  // ✅ Kiểm tra đủ 4 phần tử mới chạy
  if (!content || !tocList || !tocToggle || !tocWrapper) return;

  const headings = content.querySelectorAll("h1, h2, h3, h4, h5, h6");

  headings.forEach((heading) => {
    const rawText = heading.innerText.trim();

    // ✅ Chuyển sang ID không dấu, cách bằng "-"
    const id = rawText
      .normalize("NFD")                     // tách dấu
      .replace(/[\u0300-\u036f]/g, "")     // xoá dấu tiếng Việt
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")        // xoá ký tự đặc biệt
      .replace(/\s+/g, "-")                // khoảng trắng → "-"
      .replace(/-+/g, "-");                // gộp dấu -

    heading.id = id;

    const li = document.createElement("li");
    li.innerHTML = `<a href="#${id}">${heading.innerText}</a>`;
    tocList.appendChild(li);
  });

  tocToggle.addEventListener("click", function () {
    tocWrapper.classList.toggle("show");
  });
});
