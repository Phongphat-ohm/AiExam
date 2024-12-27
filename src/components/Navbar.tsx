import Link from "next/link";

export default function Navbar() {
  return (
    <>
      <div className="navbar bg-[#464D77] text-white fixed">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <li><Link href={"/"}>หน้าหลัก</Link></li>
              <li><Link href={"/signup"}>สมัครสมาชิก</Link></li>
              <li><Link href={"/about"}>เกี่ยวกับเรา</Link></li>
              <li><Link href={"contact"}>ติดต่อเรา</Link></li>
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">E-Xammy</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li><Link href={"/"}>หน้าหลัก</Link></li>
            <li><Link href={"/signup"}>สมัครสมาชิก</Link></li>
            <li><Link href={"/about"}>เกี่ยวกับเรา</Link></li>
            <li><Link href={"contact"}>ติดต่อเรา</Link></li>
          </ul>
        </div>
        <div className="navbar-end">
          <Link href="/signin" className="p-2 px-6 rounded-lg bg-[#F9DB6D] shadow text-black">เข้าสู่ระบบ</Link>
        </div>
      </div>
    </>
  );
}