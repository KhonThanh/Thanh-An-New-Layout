// js phần component
document.addEventListener("DOMContentLoaded", () => {
    const includeElements = document.querySelectorAll("[data-include]");

    includeElements.forEach(async el => {
        const file = el.getAttribute("data-include");
        if (!file) return;

        try {
            const response = await fetch(file);
            if (!response.ok) throw new Error("File not found");

            const text = await response.text();
            el.innerHTML = text;
        } catch (err) {
            el.innerHTML = `<p style="color: red;">Không tải được file: ${file}</p>`;
            console.error(err);
        }
    });
});


// js banner chỗ trang chủ
$(document).ready(function () {
    const $banner = $(".sidebar__banner");

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
        console.log("Không tìm thấy .sidebar__banner – Slick không khởi tạo.");
    }
});

// js cho banner trang con
$(document).ready(function () {
    const $banner = $(".big__banner");

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
        console.log("Không tìm thấy .big__banner – Slick không khởi tạo.");
    }
});

// js cho phần sản phẩm

$(document).ready(function () {
    const $banner = $(".bestprice-slide__product");

    if ($banner.length) {
        const $images = $banner.children("div");
        const currentCount = $images.length;

        if (currentCount < 2) {
            const clonesNeeded = 6 - currentCount;

            for (let i = 0; i < clonesNeeded; i++) {
                const $clone = $images.eq(0).clone();
                $banner.append($clone);
            }
        }
        $banner.slick({
            infinite: true,
            slidesToShow: 5,
            slidesToScroll: 3,
            speed: 500,
            dots: false,
            autoplay: true,
            arrows: false,
            touchMove: false,
            responsive: [
                {
                    breakpoint: 1120,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 3,
                    }
                },
                {
                    breakpoint: 761,
                    settings:{
                        slidesToShow: 3,
                        slidesToScroll: 3,
                    }
                }
            ]
        });
    } else {
        console.log("Không tìm thấy .sidebar__banner – Slick không khởi tạo.");
    }
});

// js cho phần header

$(document).ready(function () {
    const $banner = $(".top-bar__content");

    if ($banner.length) {
        $banner.slick({
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            speed: 500,
            dots: false,
            autoplay: true,
            arrows: false,
            touchMove: false,
        });
    } else {
        console.log("Không tìm thấy .top-bar__content – Slick không khởi tạo.");
    }
});

// js gán witdh và height vào bất kì img nào
document.addEventListener("DOMContentLoaded", () => {
    const updateSize = (img) => {
      // Bỏ qua nếu là SVG inline
      if (!(img instanceof HTMLImageElement)) return;
  
      const isSVG = img.src.endsWith(".svg");
      if (!img.hasAttribute("width") || !img.hasAttribute("height")) {
        if (img.complete) {
          if (!isSVG) {
            img.setAttribute("width", img.naturalWidth);
            img.setAttribute("height", img.naturalHeight);
          }
        } else {
          img.addEventListener("load", () => {
            if (!isSVG) {
              img.setAttribute("width", img.naturalWidth);
              img.setAttribute("height", img.naturalHeight);
            }
          }, { once: true });
        }
      }
    };
  
    const allImages = document.querySelectorAll("img");
    if (allImages.length === 0) {
      console.warn("⚠️ Không phát hiện ảnh nào trên trang!");
    }
  
    allImages.forEach(updateSize);
  
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          mutation.addedNodes.forEach((node) => {
            if (node.tagName === "IMG") {
              updateSize(node);
            } else if (node.querySelectorAll) {
              node.querySelectorAll("img").forEach(updateSize);
            }
          });
        } else if (
          mutation.type === "attributes" &&
          mutation.target.tagName === "IMG" &&
          mutation.attributeName === "src"
        ) {
          updateSize(mutation.target);
        }
      });
    });
  
    const mainContent = document.querySelector("main") || document.body;
    observer.observe(mainContent, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["src"],
    });
  });


