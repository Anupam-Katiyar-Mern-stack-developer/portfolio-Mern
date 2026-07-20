import { useState } from "react";
import { motion } from "framer-motion";
import API from "../api/axios";
import { useEffect } from "react";

export default function AdminSettings() {
  const [tab, setTab] = useState("profile");

  const [profile, setProfile] = useState({});

  const [portfolio, setPortfolio] = useState({});

  const [contact, setContact] = useState({});

  const [social, setSocial] = useState({});

  const [theme, setTheme] = useState({});

  const handleChange = (setter, state) => (e) => {
    setter({ ...state, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await API.get("/settings");

      setProfile(res.data.profile);
      setPortfolio(res.data.portfolio);
      setContact(res.data.contact);
      setSocial(res.data.social);
      setTheme(res.data.theme);
    } catch (error) {
      console.log(error);
    }
  }

  const saveSettings = async () => {
    try {
      await API.put("/settings", {
        profile,
        portfolio,
        contact, social,
        theme,
      });
      alert("settings saved");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Admin Settings
        </h1>
        <p className="text-gray-500 text-sm">
          Manage your portfolio configuration
        </p>
      </div>

      {/* TABS */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[
          "profile",
          "portfolio",
          "contact",
          "social",
          "theme",
        ].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-xl text-sm font-medium ${tab === t
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700 border"
              }`}
          >
            {t.toUpperCase()}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <motion.div
        key={tab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-5 md:p-8 rounded-xl shadow"
      >

        {/* PROFILE */}
        {tab === "profile" && (
          <div className="space-y-4">
            <input
              name="name"
              value={profile.name}
              onChange={handleChange(setProfile, profile)}
              placeholder="Name"
              className="w-full border p-3 rounded-xl"
            />
            <input
              name="email"
              value={profile.email}
              onChange={handleChange(setProfile, profile)}
              placeholder="Email"
              className="w-full border p-3 rounded-xl"
            />
            <textarea
              name="bio"
              value={profile.bio}
              onChange={handleChange(setProfile, profile)}
              placeholder="Bio"
              className="w-full border p-3 rounded-xl"
            />
          </div>
        )}

        {/* PORTFOLIO */}
        {tab === "portfolio" && (
          <div className="space-y-4">
            <input
              name="title"
              value={portfolio.title}
              onChange={handleChange(setPortfolio, portfolio)}
              placeholder="Portfolio Title"
              className="w-full border p-3 rounded-xl"
            />
            <input
              name="tagline"
              value={portfolio.tagline}
              onChange={handleChange(setPortfolio, portfolio)}
              placeholder="Tagline"
              className="w-full border p-3 rounded-xl"
            />
            <input
              name="resume"
              value={portfolio.resume}
              onChange={handleChange(setPortfolio, portfolio)}
              placeholder="Resume Link"
              className="w-full border p-3 rounded-xl"
            />
          </div>
        )}

        {/* CONTACT */}
        {tab === "contact" && (
          <div className="space-y-4">
            <input
              name="email"
              value={contact.email}
              onChange={handleChange(setContact, contact)}
              placeholder="Contact Email"
              className="w-full border p-3 rounded-xl"
            />
            <input
              name="phone"
              value={contact.phone}
              onChange={handleChange(setContact, contact)}
              placeholder="Phone"
              className="w-full border p-3 rounded-xl"
            />
            <input
              name="location"
              value={contact.location}
              onChange={handleChange(setContact, contact)}
              placeholder="Location"
              className="w-full border p-3 rounded-xl"
            />
          </div>
        )}

        {/* SOCIAL */}
        {tab === "social" && (
          <div className="space-y-4">
            <input
              name="github"
              value={social.github}
              onChange={handleChange(setSocial, social)}
              placeholder="GitHub"
              className="w-full border p-3 rounded-xl"
            />
            <input
              name="linkedin"
              value={social.linkedin}
              onChange={handleChange(setSocial, social)}
              placeholder="LinkedIn"
              className="w-full border p-3 rounded-xl"
            />
            <input
              name="instagram"
              value={social.instagram}
              onChange={handleChange(setSocial, social)}
              placeholder="Instagram"
              className="w-full border p-3 rounded-xl"
            />
            <input
              name="twitter"
              value={social.twitter}
              onChange={handleChange(setSocial, social)}
              placeholder="Twitter"
              className="w-full border p-3 rounded-xl"
            />
          </div>
        )}

        {/* THEME */}
        {tab === "theme" && (
          <div className="space-y-6">

            {/* Dark Mode */}
            <div className="flex justify-between items-center border p-4 rounded-xl">
              <span className="font-medium">Dark Mode</span>
              <button
                onClick={() =>
                  setTheme({ ...theme, darkMode: !theme.darkMode })
                }
                className={`px-4 py-2 rounded-xl text-white ${theme.darkMode ? "bg-green-600" : "bg-gray-400"
                  }`}
              >
                {theme.darkMode ? "ON" : "OFF"}
              </button>
            </div>

            {/* Primary Color */}
            <select
              value={theme.primaryColor}
              onChange={(e) =>
                setTheme({ ...theme, primaryColor: e.target.value })
              }
              className="w-full border p-3 rounded-xl"
            >
              <option value="blue">Blue</option>
              <option value="green">Green</option>
              <option value="purple">Purple</option>
              <option value="red">Red</option>
            </select>
          </div>
        )}

      </motion.div>

      {/* SAVE BUTTON */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={saveSettings}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700"
        >
          Save Settings
        </button>
      </div>

    </div>
  );
}