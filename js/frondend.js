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
        });
    } else {
        console.log("Không tìm thấy .sidebar__banner – Slick không khởi tạo.");
    }
});


