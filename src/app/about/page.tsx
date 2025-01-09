import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function About() {
  return (
    <>
      {/* Navbar */}
      <nav>
        <Navbar />
      </nav>

      {/* Main Content */}
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-10 rounded-lg shadow-lg max-w-3xl text-center">
          <h1 className="text-4xl font-bold text-[#464D77] mb-6">
            เกี่ยวกับเรา
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            <strong>E-Xammy</strong>{" "}
            คือแพลตฟอร์มที่พัฒนาขึ้นเพื่อสร้างประสบการณ์ใหม่ในการเรียนรู้และใช้งานเทคโนโลยีสมัยใหม่
            ทีมงานของเราร่วมมือกันเริ่มพัฒนาเว็บไซต์นี้เมื่อวันที่{" "}
            <strong>12 ธันวาคม พ.ศ. 2567</strong>
            ด้วยความมุ่งมั่นและความตั้งใจแม้จะต้องเผชิญกับความท้าทายมากมายตลอดเส้นทาง
          </p>
          <p className="mt-4 text-lg text-gray-700">
            ด้วยความพยายามและความสามัคคี
            เราสามารถนำเสนอเว็บไซต์ที่ตอบโจทย์การเรียนรู้และสร้างแรงบันดาลใจให้แก่ผู้ใช้งานทุกคน
            เราหวังว่าแพลตฟอร์มนี้จะเป็นส่วนหนึ่งของการพัฒนาความรู้และทักษะของคุณ
          </p>
          <div className="avatar">
            <div className="avatar">
              <div className="w-24 rounded-full">
                <img src="/images/icon/smile.png" />
              </div>
            </div>
            <div className="avatar">
              <div className="w-24 rounded-full">
                <img src="/images/icon/smile.png" />
              </div>
            </div>
            <div className="avatar">
              <div className="w-24 rounded-full">
                <img src="/images/icon/smile.png" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}
