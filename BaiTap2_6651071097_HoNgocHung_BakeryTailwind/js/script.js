// Tailwind chỉ cung cấp class giao diện, KHÔNG có sẵn hành vi như Bootstrap,
// nên phải tự viết JS để đóng/mở menu trên di động.

const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

// Bấm hamburger: đổi qua lại class hidden <-> flex để ẩn/hiện menu
menuToggle.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
  mobileMenu.classList.toggle('flex');
  const isOpen = !mobileMenu.classList.contains('hidden');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

// Bấm vào một mục menu thì tự đóng menu
mobileMenu.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
    mobileMenu.classList.remove('flex');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

// Hiệu ứng nhỏ: form đặt bánh hiện thông báo thay vì tải lại trang
const orderForm = document.getElementById('order-form');
const orderMsg = document.getElementById('order-msg');
orderForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const ten = orderForm.elements['ten'].value.trim();
  orderMsg.textContent = `Cảm ơn ${ten}! Bếp Bánh sẽ liên hệ bạn sớm.`;
  orderMsg.classList.remove('hidden');
  orderForm.reset();
});
