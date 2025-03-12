export default function Footer() {
  return (
    <footer className="bg-mainblue text-white py-6 font-prompt">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {/* Logo & About */}
          <div>
            <h2 className="text-lg md:text-2xl font-bold">Decision Support</h2>
            <p className="mt-1 text-blue4 text-sm md:text-base">
              ระบบสนับสนุนการตัดสินใจในการซื้อรถยนต์ไฟฟ้า
            </p>
          </div>

          {/* Navigation (2 แถว) */}
          <div>
            <h3 className="text-lg font-semibold">เมนู</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-1 text-blue3 text-sm">
              {[
                "หน้าแรก",
                "ข้อมูลรถยนต์ไฟฟ้า",
                "เปรียบเทียบข้อมูล",
                "แผนที่จุดชาร์จ",
                "แบบทดสอบ",
                "ติดต่อเรา",
              ].map((item, index) => (
                <a key={index} href="#" className="hover:text-white transition">
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* Contact & Social Media */}
          <div>
            <h3 className="text-lg font-semibold">ติดต่อเรา</h3>
            <p className="mt-1 text-blue3 text-sm">
              อีเมล: ap.evcars@gmail.com
            </p>

            <div className="flex space-x-3 mt-2">
              <a href="#" className="text-blue3 hover:text-white transition">
                <i className="fab fa-facebook fa-sm"></i>
              </a>
              <a href="#" className="text-blue3 hover:text-white transition">
                <i className="fab fa-twitter fa-sm"></i>
              </a>
              <a href="#" className="text-blue3 hover:text-white transition">
                <i className="fab fa-instagram fa-sm"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-blue2 mt-3 pt-2 text-center text-blue3 text-xs">
          &copy; {new Date().getFullYear()} OhnPriab&PrabPluem. สงวนลิขสิทธิ์.
        </div>
      </div>
    </footer>
  );
}
