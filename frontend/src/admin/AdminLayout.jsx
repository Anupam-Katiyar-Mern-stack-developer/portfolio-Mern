
import { Outlet, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineViewGrid,
  HiOutlineFolder,
  HiOutlineCode,
  HiOutlineBriefcase,
  HiOutlineAcademicCap,
  HiOutlineDocumentText,
  HiOutlineMail,
  HiOutlineCog,
  HiOutlineMenuAlt3,
  HiOutlineX,
  HiOutlineChevronDoubleLeft,
  HiOutlineChevronDoubleRight,
  HiOutlineLogout,
  HiOutlineSearch,
  HiOutlineBell,
  HiOutlineUserCircle,
   HiChat,
} from "react-icons/hi";
import API from "../api/axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import socket from '../socket/socket'

const menus = [
  {
    title: "Dashboard",
    path: "/admin",
    icon: <HiOutlineViewGrid size={22} />,
  },
  {
    title: "Projects",
    path: "/admin/projects",
    icon: <HiOutlineFolder size={22} />,
  },
  {
    title: "Skills",
    path: "/admin/skills",
    icon: <HiOutlineCode size={22} />,
  },
  {
    title: "Experience",
    path: "/admin/experience",
    icon: <HiOutlineBriefcase size={22} />,
  },
  {
    title: "Education",
    path: "/admin/education",
    icon: <HiOutlineAcademicCap size={22} />,
  },
  {
    title: "Resume",
    path: "/admin/resume",
    icon: <HiOutlineDocumentText size={22} />,
  },
  {
    title: "Messages",
    path: "/admin/messages",
    icon: <HiOutlineMail size={22} />,
  },
  {
    title: "Settings",
    path: "/admin/settings",
    icon: <HiOutlineCog size={22} />,
  },
  {
    title: "Live chat",
    path: "/admin/chat",
    icon: < HiChat size={22} />,
  },
];

export default function AdminLayout() {
  const navigate = useNavigate();

  const [mobileMenu, setMobileMenu] = useState(false);
  const [collapse, setCollapse] = useState(false);
  const [admin, setAdmin] = useState({});
  const [notificationCount, setNotificationCount] = useState(0);
  const handleLogout = async () => {
    try {
      await API.post("/auth/logout");

      localStorage.removeItem("token");
      localStorage.removeItem("admin");

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

 useEffect(() => {

    socket.on("receive-message", (msg) => {

        if (msg.sender === "visitor") {

            setNotificationCount(prev => prev + 1);

        }

    });

    return () => {

        socket.off("receive-message");

    };

}, []);


  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex overflow-hidden">
      {/* ========================= */}
      {/* MOBILE OVERLAY */}
      {/* ========================= */}

      <AnimatePresence>
        {mobileMenu && (
          <motion.div
            onClick={() => setMobileMenu(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* ========================= */}
      {/* SIDEBAR */}
      {/* ========================= */}

      <motion.aside
        initial={false}
        animate={{ width: collapse ? 90 : 270 }}
        transition={{ duration: 0.3 }}
        className={`
    fixed
    top-0
    left-0
    h-screen
    z-50
    bg-white/95
    backdrop-blur-xl
    border-r
    border-gray-300
    flex
    flex-col
    overflow-hidden

    transform
    transition-transform
    duration-300

    ${mobileMenu ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
  `}
      >
        {/* LOGO */}

        <div className="h-20 flex items-center justify-between px-5 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div
              className="
              w-11
              h-11
              rounded-xl
              bg-gradient-to-br
              from-cyan-400
              via-blue-500
              to-indigo-600
              flex
              items-center
              justify-center
              text-xl
              font-bold
              "
            >
              A
            </div>

            {!collapse && (
              <div>
                <h2 className="font-bold text-lg">Admin</h2>

                <p className="text-slate-400 text-xs">Portfolio CMS</p>
              </div>
            )}
          </div>

          <button
            onClick={() => setCollapse(!collapse)}
            className="
            hidden
            lg:flex
            w-9
            h-9
            rounded-lg
            items-center
            justify-center
            hover:bg-blue-400
            transition
            "
          >
            {collapse ? (
              <HiOutlineChevronDoubleRight />
            ) : (
              <HiOutlineChevronDoubleLeft />
            )}
          </button>
        </div>

        {/* MENU */}

        <div className="flex-1 overflow-y-auto overflow-x-hidden py-5 px-3">
          <div className="space-y-2">
            {menus.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/admin"}
                className={({ isActive }) => `
                group
                flex
                items-center
                gap-4
                rounded-xl
                px-4
                py-3
                transition-all
                duration-300

                ${isActive
                    ? "bg-gradient-to-r from-blue-600 to-cyan-500 shadow-lg shadow-cyan-500/20"
                    : "hover:bg-amber-100"
                  }
                `}
                onClick={() => setMobileMenu(false)}
              >
                <div className="text-xl">{item.icon}</div>

                {!collapse && <span className="font-medium">{item.title}</span>}
              </NavLink>
            ))}
          </div>
        </div>

        {/* BOTTOM */}

        <div className="border-t border-gray-300 p-4">
          <button
            className="
            w-full
            flex
            items-center
            gap-4
            rounded-xl
            px-4
            py-3
            hover:bg-red-500/20
            transition
            " onClick={handleLogout}
          >
            <HiOutlineLogout size={22} />

            {!collapse && <span>Logout</span>}
          </button>
        </div>
      </motion.aside>

      {/* ========================= */}
      {/* MAIN */}
      {/* ========================= */}

      <div
        className={`
    flex-1
    transition-all
    duration-300
    overflow-y-auto
    h-screen

    ${collapse ? "lg:ml-[90px]" : "lg:ml-[270px]"}
  `}
      >
        {/* NAVBAR */}

        <header
          className="
    sticky
    top-0
    z-40
    bg-white/90
    backdrop-blur-xl
    border-b
    border-gray-300
    shadow-sm
  "
        >
          <div
            className="
            h-20
            px-6
            flex
            items-center
            justify-between
            "
          >
            <div className="flex items-center gap-4">
              <button
                onClick={() => setMobileMenu(true)}
                className="
                lg:hidden
                w-10
                h-10
                rounded-lg
                bg-gray-400
                flex
                items-center
                justify-center
                "
              >
                <HiOutlineMenuAlt3 size={24} />
              </button>

              <div
                className="
                hidden
                md:flex
                items-center
                gap-3
                bg-white
                rounded-xl
                px-4
                h-12
                border
                border-slate-800
                w-[350px]
                "
              >
                <HiOutlineSearch className="text-slate-500" size={20} />

                <input
                  type="text"
                  placeholder="Search..."
                  className="
                  bg-transparent
                  outline-none
                  w-full
                  text-sm
                  placeholder:text-slate-500
                  "
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                className="
relative
w-11
h-11
rounded-xl
bg-white
border
border-gray-300
flex
items-center
justify-center
"
              >

                <HiOutlineBell size={22} />

                {notificationCount > 0 && (

                  <span
                    className="
absolute
-top-1
-right-1
bg-red-600
text-white
text-[10px]
font-bold
rounded-full
w-5
h-5
flex
items-center
justify-center
">

                    {notificationCount}

                  </span>

                )}

              </button>

              <div
                className="
                flex
                items-center
                gap-3
                bg-white
                border
                border-gray-300
                rounded-xl
                px-3
                py-2
                "
              >
                <HiOutlineUserCircle size={38} className="text-cyan-400" />

                <div className="hidden md:block">
                  <h4 className="font-semibold">
                    {admin?.name}
                  </h4>

                  <p className="text-xs text-slate-400">
                    {admin?.role || "Super Admin"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* PAGE */}

        <main className="p-6 md:p-8 overflow-y-auto min-h-[calc(100vh-80px)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
