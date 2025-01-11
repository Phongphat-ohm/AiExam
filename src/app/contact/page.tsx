"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import Background from "@/components/background";
export default function Contact() {

  // ตัวอย่างเวลาที่มีคนมาเสนอแนะ
  const suggestions = [
    {
      id: 1,
      name: "พี่ป้าย สุดหล่อเท่",
      message: "อะไรจะน่ารักเท่าแฟนเรา",
    },
    {
      id: 2,
      name: "พี่ออม ไงจะใครล่ะ",
      message: "ว้าวนี่มันเจ๋งไปป่าว",
    },
    {
      id: 3,
      name: "น้องโอม กินอร่อย",
      message: "มาม่าอร่อยมากครับผม",
    },

  ];

  return (
    <>
      <nav>
        <Navbar />
      </nav>

      <div className="min-h-screen bg-gradient-to-tr from-purple-100 via-blue-100 to-green-100 flex flex-col items-center justify-center relative">
        <div className="h-screen flex items-center justify-center">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-white p-10 rounded-lg shadow-lg max-w-3xl w-full z-10"
          >
            <h1 className="text-4xl font-bold text-gray-800 text-center mb-6">
              ติดต่อเรา
            </h1>
            <p className="text-center text-gray-600 mb-8">
              หากคุณมีคำถาม ข้อเสนอแนะ หรือปัญหาใด ๆ สามารถกรอกข้อมูลด้านล่างเพื่อติดต่อเราได้เลย!
            </p>


            <form className="space-y-6">

              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  ชื่อของคุณ
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="ชื่อ-นามสกุล"
                  className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  required
                />
              </div>


              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  อีเมลของคุณ
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="example@email.com"
                  className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  ข้อความ
                </label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="กรอกข้อความของคุณ..."
                  className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
                  required
                ></textarea>
              </div>


              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-center"
              >
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold rounded-md shadow-md hover:from-purple-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
                >
                  ส่งข้อความ
                </button>
              </motion.div>
            </form>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="bg-gray-100 p-8 rounded-lg shadow-lg max-w-4xl w-full mb-10"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            ข้อเสนอแนะจากผู้ใช้งาน
          </h2>
          <div className="space-y-4">
            {suggestions.map((suggestion) => (
              <div
                key={suggestion.id}
                className="bg-white p-4 rounded-md shadow-sm border border-gray-200"
              >
                <p className="text-gray-800">
                  <strong>{suggestion.name}</strong>:
                </p>
                <p className="text-gray-600 mt-1">{suggestion.message}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
      <Footer />
    </>
  );
}
