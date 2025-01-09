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
            ติดต่อได้ที่
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed">
          </p>
          <p className="mt-4 text-lg text-gray-700">
          </p>
          <div className="avatar">
            <div className="w-24 rounded-full">
              <img src="/images/icon/smile.png" />
            </div>
          </div>
          <div className="w-24 rounded-full">
            <img src="/images/icon/smile.png" />
          </div>
        </div>
        <div className="w-24 rounded-full">
          <img src="/images/icon/smile.png" />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}
