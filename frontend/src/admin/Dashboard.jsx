import { motion } from "framer-motion";

import {
  FolderOpen,
  Code2,
  BriefcaseBusiness,
  Mail,
  Eye,
  Download,
  Sparkles,
  Clock3,
} from "lucide-react";
import API from "../api/axios";
import { useState } from "react";
import { useEffect } from "react";


const stats = [
  {
    title: "Projects",
    value: 18,
    icon: <FolderOpen size={22} />,
    color: "from-sky-500 to-cyan-500",
    growth: "+12%",
  },
  {
    title: "Skills",
    value: 34,
    icon: <Code2 size={22} />,
    color: "from-violet-500 to-fuchsia-500",
    growth: "+8%",
  },
  {
    title: "Experience",
    value: 5,
    icon: <BriefcaseBusiness size={22} />,
    color: "from-emerald-500 to-green-500",
    growth: "+4%",
  },
  {
    title: "Messages",
    value: 42,
    icon: <Mail size={22} />,
    color: "from-rose-500 to-pink-500",
    growth: "+18%",
  },
];





const activities = [
  {
    title: "New Portfolio Project Added",
    time: "10 mins ago",
    color: "bg-sky-500",
  },
  {
    title: "Resume Updated",
    time: "1 hour ago",
    color: "bg-emerald-500",
  },
  {
    title: "Client Message Received",
    time: "2 hours ago",
    color: "bg-violet-500",
  },
  {
    title: "Skill Updated",
    time: "Yesterday",
    color: "bg-orange-500",
  },
];

const messages = [
  {
    name: "John Smith",
    email: "john@gmail.com",
    status: "New",
  },
  {
    name: "Rahul",
    email: "rahul@gmail.com",
    status: "Read",
  },
  {
    name: "David",
    email: "david@gmail.com",
    status: "Pending",
  },
];

export default function Dashboard() {

  const [latestContacts, setLatestContacts] = useState([]);
  const [selectedMessage, setSelctedMessage] = useState(null);
  const [open, setOpen] = useState(false);
  const [activity, setActivity] = useState([]);

  const [counts, setCounts] = useState({
    projectCount: 0,
    skillCount: 0,
    experienceCount: 0,
    messageCount: 0,
    visitorCount: 0,
    resumeDownloadCount: 0,
  });

  const fetchDashboard = async () => {
    try {
      const res = await API.get("/dashboard");
      setCounts(res.data);

      setLatestContacts(res.data.latestContacts);
      setActivity(res.data.activities)

    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {


    fetchDashboard();
  }, []);

  const handleView = async (message) => {
    try {
      await API.put(`/messages/${message._id}`);
      setSelctedMessage({
        ...message,
        status: "Read",
      });

      setOpen(true);
      fetchDashboard();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="space-y-8 px-2 sm:px-0">
      {/* HEADER */}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl bg-gradient-to-r from-sky-600 to-blue-700 p-10 text-white overflow-hidden relative"
      >
        <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-white/10 blur-3xl"></div>

        <div className="relative z-10 flex flex-col xl:flex-row justify-between gap-8">
          <div>
            <span className="rounded-full bg-white/20 px-4 py-2 text-sm">
              Welcome Back 👋
            </span>

            <h1 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-black leading-tight">Portfolio Dashboard</h1>

            <p className="mt-4 max-w-xl text-sm sm:text-base text-blue-100">
              Manage projects, skills, resume, contacts and monitor your
              portfolio analytics from one place.
            </p>

            <button className="mt-8 rounded-xl bg-white px-7 py-3 font-semibold text-sky-700 transition hover:scale-105">
              Manage Portfolio
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full xl:w-auto">
            <div className="rounded-2xl bg-white/15 backdrop-blur-md p-6">
              <Eye size={22} className="text-4xl" />
              <h2 className="mt-5 text-3xl font-bold">{counts.visitorCount}</h2>
              <p>Total Visitors</p>
            </div>

            <div className="rounded-2xl bg-white/15 backdrop-blur-md p-6">
              <Download size={20} className="text-4xl" />
              <h2 className="mt-5 text-3xl font-bold">{counts.resumeDownloadCount}</h2>
              <p>Resume Downloads</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* STATS */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <motion.div

          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          whileHover={{ y: -8 }}
          className="rounded-3xl bg-white border border-slate-200 p-5 sm:p-7 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500">Projects</p>

              <h2 className="mt-3 text-4xl font-black text-slate-800">
                {counts.projectCount}
              </h2>
            </div>

            <div
              className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-500text-3xl text-white`}
            >
              <FolderOpen size={22} />
            </div>
          </div>

          <div className="mt-7 flex items-center gap-2">
            <Download size={20} className="text-green-600" />
            <span
              className={`font-semibold ${counts?.growth?.projects?.growth >= 0
                ? "text-green-600"
                : "text-red-600"
                }`}
            >
              {counts?.growth?.projects?.growth > 0 ? "+" : ""}
              {counts?.growth?.projects?.growth || 0}%
            </span>

            <span className="text-slate-400">this month</span>
          </div>
        </motion.div>

        <motion.div

          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          whileHover={{ y: -8 }}
          className="rounded-3xl bg-white border border-slate-200 p-5 sm:p-7 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500">Skills</p>

              <h2 className="mt-3 text-4xl font-black text-slate-800">
                {counts.skillCount}
              </h2>
            </div>

            <div
              className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500 text-3xl text-white`}
            >
              <Code2 size={22} />
            </div>
          </div>

          <div className="mt-7 flex items-center gap-2">
            <Download size={20} className="text-green-600" />

            <span
              className={`font-semibold ${counts?.growth?.skills.growth >= 0
                ? "text-green-600"
                : "text-red-600"
                }`}
            >
              {counts?.growth?.skills?.growth > 0 ? "+" : ""}
              {counts?.growth?.skills?.growth || 0}%
            </span>

            <span className="text-slate-400">this month</span>
          </div>
        </motion.div>


        <motion.div

          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          whileHover={{ y: -8 }}
          className="rounded-3xl bg-white border border-slate-200 p-5 sm:p-7 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500">Experience</p>

              <h2 className="mt-3 text-4xl font-black text-slate-800">
                {counts.experienceCount}
              </h2>
            </div>

            <div
              className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-emerald-500 to-green-500 text-3xl text-white`}
            >
              <BriefcaseBusiness size={22} />
            </div>
          </div>

          <div className="mt-7 flex items-center gap-2">
            <Download size={20} className="text-green-600" />

            <span
              className={`font-semibold ${counts?.growth?.experiences?.growth >= 0
                ? "text-green-600"
                : "text-red-600"
                }`}
            >
              {counts?.growth?.experiences?.growth > 0 ? "+" : ""}
              {counts?.growth?.experiences?.growth || 0}%
            </span>

            <span className="text-slate-400">this month</span>
          </div>
        </motion.div>

        <motion.div

          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          whileHover={{ y: -8 }}
          className="rounded-3xl bg-white border border-slate-200 p-5 sm:p-7 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500">Messages</p>

              <h2 className="mt-3 text-4xl font-black text-slate-800">
                {counts.messageCount}
              </h2>
            </div>

            <div
              className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 text-3xl text-white`}
            >
              <Mail size={22} />
            </div>
          </div>

          <div className="mt-7 flex items-center gap-2">
            <Download size={20} className="text-green-600" />
            <span
              className={`font-semibold ${counts?.growth?.messages?.growth >= 0
                ? "text-green-600"
                : "text-red-600"
                }`}
            >
              {counts?.growth?.messages?.growth > 0 ? "+" : ""}
              {counts?.growth?.messages?.growth || 0}%
            </span>

            <span className="text-slate-400">this month</span>

          </div>
        </motion.div>

      </div>

      {/* MIDDLE */}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-7">
        {/* PERFORMANCE */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="xl:col-span-2 rounded-3xl bg-white border border-slate-200 p-8 shadow-sm"
        >
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Performance</h2>

              <p className="text-slate-500 mt-2">Portfolio Overview</p>
            </div>

            <button className="rounded-xl bg-sky-600 px-5 py-2 text-white">
              Export
            </button>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="rounded-2xl bg-slate-50 p-6">
              <Eye size={22} className="text-4xl text-sky-600" />

              <h3 className="mt-5 text-2xl sm:text-3xl font-black">{counts.visitorCount}</h3>

              <p className="text-slate-500">Visitors</p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-6">
              <Mail size={22} className="text-4xl text-violet-600" />

              <h3 className="mt-5 text-2xl sm:text-3xl font-black">{counts.messageCount}</h3>

              <p className="text-slate-500">Contact Requests</p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-6">
              <Download size={20} className="text-4xl text-green-600" />

              <h3 className="mt-5 text-2xl sm:text-3xl font-black">{counts.resumeDownloadCount}</h3>

              <p className="text-slate-500">Resume Downloads</p>
            </div>
          </div>

          <div className="mt-10 h-72 rounded-2xl border-2 border-dashed border-slate-300 flex items-center justify-center">
            <div className="text-center">
              <Sparkles size={20} className="mx-auto text-5xl text-sky-600" />

              <h2 className="mt-4 text-xl font-bold">Chart Component Here</h2>

              <p className="text-slate-500 mt-2">
                Recharts Graph will be added.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ACTIVITY */}

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="rounded-3xl bg-white border border-slate-200 p-8 shadow-sm"
        >
          <h2 className="text-2xl font-bold">Recent Activity</h2>

          <div className="mt-8 space-y-8">
            {activity.map((item) => (
              <div key={item._id} className="flex gap-4">

                <div className="h-4 w-4 rounded-full mt-2 bg-sky-500"></div>

                <div>

                  <h4 className="font-semibold">
                    {item.title}
                  </h4>

                  <div className="mt-2 flex items-center gap-2 text-slate-500">
                    <Clock3 size={18} />
                    {new Date(item.createdAt).toLocaleString()}
                  </div>

                </div>

              </div>
            ))}
          </div>
        </motion.div>

      </div>

      {/* MESSAGES */}

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl bg-white border border-slate-200 shadow-sm overflow-hidden w-full"
      >
        <div className="border-b p-7">
          <h2 className="text-2xl font-bold">Latest Messages</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-[700px] w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="p-5 text-left">Name</th>

                <th className="p-5 text-left">Email</th>

                <th className="p-5 text-left">Status</th>

                <th className="p-5 text-right">Action</th>
              </tr>
            </thead>

            <tbody>
              {latestContacts.map((item) => (
                <tr key={item._id} className="border-t hover:bg-slate-50">
                  <td className="p-5 font-semibold">{item.name}</td>

                  <td className="p-5">{item.email}</td>

                  <td className="p-5">
                    <span className="rounded-full bg-sky-100 px-4 py-2 text-sm text-sky-700">
                      {item.status}
                    </span>
                  </td>

                  <td className="p-5 text-right">
                    <button
                      onClick={() => handleView(item)}
                      className="rounded-xl bg-sky-600 px-4 py-2 text-white hover:bg-sky-700"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>


      </motion.div>

      {open && selectedMessage && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

          <div className="bg-white rounded-3xl shadow-xl w-full max-w-2xl">

            <div className="flex justify-between items-center border-b p-6">

              <h2 className="text-2xl font-bold">
                Contact Message
              </h2>

              <button
                onClick={() => setOpen(false)}
                className="text-2xl"
              >
                ×
              </button>

            </div>

            <div className="p-6 space-y-5">

              <div>

                <label className="text-slate-500 text-sm">
                  Name
                </label>

                <p className="font-semibold">
                  {selectedMessage.name}
                </p>

              </div>

              <div>

                <label className="text-slate-500 text-sm">
                  Email
                </label>

                <p className="font-semibold">
                  {selectedMessage.email}
                </p>

              </div>

              <div>

                <label className="text-slate-500 text-sm">
                  Subject
                </label>

                <p className="font-semibold">
                  {selectedMessage.subject}
                </p>

              </div>

              <div>

                <label className="text-slate-500 text-sm">
                  Message
                </label>

                <div className="bg-slate-50 rounded-xl p-4 mt-2">
                  {selectedMessage.message}
                </div>

              </div>

              <div>

                <label className="text-slate-500 text-sm">
                  Status
                </label>

                <p className="mt-1">

                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                    {selectedMessage.status}
                  </span>

                </p>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>


  );
}
