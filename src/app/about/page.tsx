"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import Background from "@/components/background";

export default function About() {
  return (
    <>
      <nav>
        <Navbar />
      </nav>


        <div className="relative min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center overflow-hidden">
          <div className="absolute w-96 h-96 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-30 blur-3xl -top-40 -left-40"></div>
          <div className="absolute w-96 h-96 bg-gradient-to-r from-green-300 to-blue-400 rounded-full opacity-30 blur-3xl -bottom-40 -right-40"></div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-white p-12 rounded-3xl shadow-2xl max-w-4xl text-center space-y-8 z-10 transform transition-all duration-500 hover:scale-105"
          >
            <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
              เกี่ยวกับเรา
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed">
              <strong className="text-secondary">E-Xammy</strong>{" "}
              คือแพลตฟอร์มที่พัฒนาขึ้นเพื่อสร้างประสบการณ์ใหม่ในการเรียนรู้และใช้งานเทคโนโลยีสมัยใหม่
              ทีมงานของเราร่วมมือกันเริ่มพัฒนาเว็บไซต์นี้เมื่อวันที่{" "}
              <strong className="text-accent">12 ธันวาคม พ.ศ. 2567</strong>
              ด้วยความมุ่งมั่นและความตั้งใจแม้จะต้องเผชิญกับความท้าทายมากมายตลอดเส้นทาง
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              ด้วยความพยายามและความสามัคคี
              เราสามารถนำเสนอเว็บไซต์ที่ตอบโจทย์การเรียนรู้และสร้างแรงบันดาลใจให้แก่ผู้ใช้งานทุกคน
              เราหวังว่าแพลตฟอร์มนี้จะเป็นส่วนหนึ่งของการพัฒนาความรู้และทักษะของคุณ
            </p>

            <div className="flex justify-center gap-8">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-24 h-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 avatar"
              >
                <img src="/images/icon/smile.png" alt="smile-icon-1" />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-24 h-24 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2 avatar"
              >
                <img src="/images/icon/smile.png" alt="smile-icon-2" />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-24 h-24 rounded-full ring ring-accent ring-offset-base-100 ring-offset-2 avatar"
              >
                <img src="/images/icon/smile.png" alt="smile-icon-3" />
              </motion.div>
            </div>
          </motion.div>
        </div>

      <Footer />
    </>
  );
}
