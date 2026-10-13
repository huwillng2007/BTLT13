// Khởi tạo ứng dụng Vue 3 (bản CDN, không cần Node.js/npm).
// So sánh: nếu dùng Vanilla JS, mỗi lần thêm/xoá giỏ hàng phải tự querySelector + cập nhật
// DOM thủ công - Vue tự động làm điều này nhờ reactivity.
const { createApp } = Vue;

createApp({
  // data(): dữ liệu "reactive" - khi giá trị đổi, mọi nơi dùng nó trong template tự cập nhật.
  data() {
    return {
      tuKhoa: '',  // từ khoá tìm kiếm, liên kết 2 chiều với ô input qua v-model
      cart: [],    // mảng các sản phẩm đã thêm vào giỏ
      products: [
        { id: 1, ten: 'Ốp lưng xanh điện',   anh: '../images/anh-op-lung-xanh-dien.webp', gia: 250000, moTa: 'Ốp silicon chống sốc, ôm máy vừa vặn.' },
        { id: 2, ten: 'Ốp lưng trong suốt',  anh: '../images/op-lung-trong-suot.jpg', gia: 150000, moTa: 'Trong suốt, không ố vàng, viền chống trầy.' },
        { id: 3, ten: 'Đế sạc không dây',    anh: '../images/de-sac-khong-day.webp', gia: 320000, moTa: 'Sạc không dây 15W, đèn báo trạng thái.' },
        { id: 4, ten: 'Tai nghe TWS Active', anh: '../images/tai-nghe.webp', gia: 590000, moTa: 'Bluetooth 5.3, pin 24 giờ, chống nước.' },
        { id: 5, ten: 'Cáp sạc Type-C 1m',   anh: '../images/cap-sac.jpg', gia: 90000,  moTa: 'Dây dù bện chắc, hỗ trợ sạc nhanh.' },
        { id: 6, ten: 'Củ sạc nhanh 20W',    anh: '../images/cu-sac-nhanh-20w.webp', gia: 180000, moTa: 'Nhỏ gọn, tự ngắt khi đầy pin.' },
        { id: 7, ten: 'Giá đỡ điện thoại',   anh: '../images/Gia-do-dien-thoai.jpg', gia: 120000, moTa: 'Gập gọn, chỉnh được nhiều góc nhìn.' },
        { id: 8, ten: 'Pin dự phòng 10000mAh', anh: '../images/sac-du-phong.webp', gia: 450000, moTa: 'Hai cổng ra, sạc nhanh 22.5W.' }
      ]
    };
  },

  // computed: giá trị tính toán từ data, tự tính lại khi data liên quan thay đổi.
  computed: {
    // Số lượng sản phẩm trong giỏ - hiển thị ở header: Giỏ hàng ({{ cartCount }})
    cartCount() {
      return this.cart.length;
    },
    // Tổng tiền = cộng giá của mọi sản phẩm trong giỏ
    tongTien() {
      return this.cart.reduce((tong, sp) => tong + sp.gia, 0);
    },
    // Danh sách sản phẩm đã lọc theo tuKhoa (không phân biệt hoa thường).
    // "UI = function của data": gõ tới đâu, danh sách render lại tới đó.
    danhSachLoc() {
      const tuKhoa = this.tuKhoa.trim().toLowerCase();
      return this.products.filter((sp) => sp.ten.toLowerCase().includes(tuKhoa));
    }
  },

  methods: {
    // Thêm sản phẩm vào giỏ: chỉ cần push vào mảng cart,
    // Vue tự cập nhật số lượng ở header và danh sách ở aside.
    themVaoGio(sanPham) {
      this.cart.push(sanPham);
    },
    // Xoá sản phẩm khỏi giỏ theo vị trí (index) bằng splice
    xoaKhoiGio(index) {
      this.cart.splice(index, 1);
    },
    // Định dạng số thành tiền VND, ví dụ 250000 -> "250.000 VND"
    dinhDangGia(so) {
      return so.toLocaleString('vi-VN') + ' VND';
    }
  }
}).mount('#app');
