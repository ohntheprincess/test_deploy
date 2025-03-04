"use client";
import Evcardata from "./evcardata/page";
import Compare from "./compare_page/page";
import { useState } from "react";
import CalculatePage from "./calculate_page/page";
export default function Home() {
  const [page, setPage] = useState("homepage");
  const clickCarData = () => {
    document
      .getElementById("section-cardata")
      .scrollIntoView({ behavior: "smooth" });
  };

  // const clickCarData = () => {
  //   router.push("/evcardata#section-cardata"); // ไปที่ evcardata และเลื่อนลง
  // };
  const clickCarCompare = () => {
    document
      .getElementById("section-compare")
      .scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-white h-screen">
      <div className="flex justify-center items-center fixed top-0 left-0 w-full z-20">
        <nav className="bg-black rounded-2xl p-4 mt-2 text-gray-400 font-prompt antialiased">
          <ul className="flex flex-row">
            <li className="mx-4 text-mainblue">
              <button onClick={() => setPage("homepage")}>หน้าแรก</button>
            </li>
            <li className="mx-4">
              <button>แดชบอร์ด</button>
            </li>
            <li className="mx-4">
              <button onClick={clickCarData}>ข้อมูลรถยนต์ไฟฟ้า</button>
            </li>
            <li className="mx-4">
              <button onClick={clickCarCompare}>
                เปรียบเทียบข้อมูลรถยนต์ไฟฟ้า
              </button>
            </li>
            <li className="mx-4">
              <button>แผนที่แสดงจุดชาร์จ</button>
            </li>
            <li className="mx-4">
              <button onClick={() => setPage("calculate")}>สูตรคำนวณ</button>
            </li>
            <li className="mx-4">
              <button>แบบทดสอบ</button>
            </li>
          </ul>
        </nav>
      </div>
      {page === "homepage" ? (
        <div>
          <div className="grid grid-cols-2 font-prompt flex text-gray-400 w-full">
            <div className="bg-white flex flex-col p-8 justify-center items-center h-screen">
              <h1 className="text-2xl font-bold mb-4 text-black text-center">
                เลือกรถยนต์ไฟฟ้าที่เหมาะสมกับคุณ
              </h1>
              <p className="text-lg text-gray-600 mx-7 text-center">
                หากคุณกำลังมองหารถยนต์ไฟฟ้าแต่ยังไม่แน่ใจว่าจะเลือกรุ่นไหน
                <br />
                ที่จะสามารถตอบโจทย์ความต้องการของคุณที่สุด
                ลองใช้เครื่องมือช่วยเลือกของเรา!
              </p>
              <button className="border-2 p-3 mt-12 bg-white rounded-lg w-fit text-sm text-mainblue shadow-lg flex items-center space-x-2">
                <span>ทำแบบทดสอบเลย</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </button>
            </div>
            <div>
              <img src="/evcar.jpg" className="h-full"></img>
            </div>
          </div>
          <Evcardata />
          <Compare />
        </div>
      ) : (
        <></>
      )}
      {page === "calculate" ? (
        <>
          <CalculatePage />
        </>
      ) : (
        <></>
      )}
      <footer className="bg-blue1 text-white py-3 mt-3 font-prompt">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {/* Logo & About */}
            <div>
              <h2 className="text-lg md:text-2xl font-bold">Decision Support</h2>
              <p className="mt-1 text-blue4 text-sm md:text-base">
                ระบบสนับสนุนการตัดสินใจในการซื้อรถยนต์ไฟฟ้า
              </p>
              {/* <img src="/logo.png" className="w-1/3 h-auto"></img> */}
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
                  <a
                    key={index}
                    href="#"
                    className="hover:text-white transition"
                  >
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
              <p className="text-blue3 text-sm">โทร: 099-497-9301</p>

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
    </div>
  );
}
