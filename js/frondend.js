// js phần component
document.addEventListener("DOMContentLoaded", () => {
  const includeElements = document.querySelectorAll("[data-include]");

  includeElements.forEach(async el => {
    const file = el.getAttribute("data-include");
    if (!file) return;

    try {
      const response = await fetch(`${file}?v=${Date.now()}`, { cache: "no-store" });
      if (!response.ok) throw new Error(`Không tìm thấy file: ${file}`);

      const text = await response.text();
      el.innerHTML = text;

      if (typeof initResponsive === "function") {
        initResponsive(el);
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
    if (img.complete) {
      setDimensions(img);
    } else {
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

  if (!content || !tocList || !tocToggle || !tocWrapper) return;

  const headings = content.querySelectorAll("h1, h2, h3, h4, h5, h6");

  headings.forEach((heading) => {
    const rawText = heading.innerText.trim();

    const id = rawText
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

    heading.id = id;

    const li = document.createElement("li");
    li.innerHTML = `<a href="#${id}">${heading.innerText}</a>`;
    tocList.appendChild(li);
  });

  tocToggle.addEventListener("click", function () {
    tocWrapper.classList.toggle("show");
  });
});

// js hiển thị cmt khi quá 4 hoặc ẩn đi
// js mở đóng popup đánh giá
function openReviewPopup() {
  document.getElementById('popupReview').style.display = 'block';
}

function closePopup() {
  document.getElementById('popupReview').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function () {
  const popup = document.getElementById('popupReview');
  if (popup) {
    popup.addEventListener('click', function (e) {
      if (e.target.classList.contains('popup-overlay')) {
        closePopup();
      }
    });
  }
});



const stars = document.querySelectorAll('.popup-stars .star');
stars.forEach(star => {
  star.addEventListener('click', function () {
    const value = this.dataset.value;
    stars.forEach(s => {
      s.classList.toggle('active', s.dataset.value <= value);
    });
  });
});

// js chỗ phần sản phẩm chi tiết
$('.slider-for').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  fade: true,
  asNavFor: '.slider-nav'
});

$('.slider-nav').slick({
  slidesToShow: 3,
  slidesToScroll: 2,
  asNavFor: '.slider-for',
  dots: false,
  centerMode: true,
  focusOnSelect: true,
  arrows: false,
});

// mở và đong cái menu mobile
function openMenuMobile() {
  document.getElementById('menuMobile').style.display = 'block';
}

function openSearchFunction() {
  const el = document.getElementById('statusAllelement');
  if (!el) return;

  if (el.style.display === 'block') {
    el.style.display = 'none';
  } else {
    el.style.display = 'block';
  }
}

function closeMenu() {
  document.getElementById('menuMobile').style.display = 'none';
}

document.addEventListener('click', function (event) {
  const menuMobile = document.getElementById('menuMobile');
  const menuMobileContent = document.getElementById('menuMobileContent');
  const tabs = document.querySelectorAll('.nav__icon-item');
  const contents = document.querySelectorAll('.mobile-menu__list'); // sửa tên class

  if (!menuMobile || !menuMobileContent || !tabs.length || !contents.length) return;

  // Xử lý click vào tab
  tabs.forEach(tab => {
    tab.addEventListener('click', function () {
      const tabNum = this.getAttribute('data-tab'); // khai báo biến

      tabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');

      contents.forEach(content => {
        if (content.getAttribute('data-tab') === tabNum) {
          content.classList.add('active');
        } else {
          content.classList.remove('active');
        }
      });
    });
  });

  // Xử lý click ra ngoài content để đóng menu
  if (menuMobile.contains(event.target)) {
    if (menuMobileContent.contains(event.target)) {
      console.log('Bạn vừa bấm vào phần nội dung menu');
    } else {
      closeMenu(); // bồ nhớ định nghĩa hàm này ở đâu đó
    }
  }
});

// js phần thông báo nếu input trống
document.addEventListener('DOMContentLoaded', function () {
  const wrapper = document.querySelector('.res-product');
  if (!wrapper) return; // Không có .res-product thì thoát luôn

  const nameInput = document.querySelector('input[placeholder="Họ và tên"]');
  const phoneInput = document.querySelector('input[placeholder="Số điện thoại"]');
  const sendButton = document.getElementById('findProduct');

  if (nameInput && phoneInput && sendButton) {
    sendButton.addEventListener('click', function (e) {
      e.preventDefault();
      let isValid = true;

      if (!nameInput.value.trim()) {
        nameInput.value = '';
        nameInput.placeholder = "mời bạn điền thông tin";
        nameInput.classList.add('input-error');
        isValid = false;
      } else {
        nameInput.classList.remove('input-error');
      }

      if (!phoneInput.value.trim()) {
        phoneInput.value = '';
        phoneInput.placeholder = "mời bạn điền thông tin điện thoại";
        phoneInput.classList.add('input-error');
        isValid = false;
      } else {
        phoneInput.classList.remove('input-error');
      }

      if (isValid) {
        console.log("Gửi form thành công!");
      }
    });
  } else {
    console.warn('Thiếu input hoặc nút gửi — kiểm tra lại HTML.');
  }
});

