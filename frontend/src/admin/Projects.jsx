import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import API from "../api/axios";

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [deleteId, setDeleteId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    image: null,
    category: "Frontend",
    status: "Draft",
    liveLink: "",
    githubLink: "",
    technologies: "",
    role: "",
    problem: "",
    insight: "",
    solution: "",
    impact: "",
    features: "",
    featured: false,
  });

  // ================= FETCH PROJECTS =================

  const fetchProjects = async () => {
    try {
      const { data } = await API.get("/projects");
      console.log(data)
      setProjects(data.projects);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // ================= HANDLE CHANGE =================

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ================= HANDLE IMAGE =================

  const handleFileChange = (e) => {
    setForm((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  // ================= SUBMIT =================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("title", form.title);
      data.append("description", form.description);

      data.append("category", form.category);
      data.append("status", form.status);

      data.append("liveLink", form.liveLink);
      data.append("githubLink", form.githubLink);

      data.append("role", form.role);
      data.append("problem", form.problem);
      data.append("insight", form.insight);
      data.append("solution", form.solution);
      data.append("impact", form.impact);

      data.append(
        "technologies",
        JSON.stringify(
          form.technologies
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean)
        )
      );

      data.append(
        "features",
        JSON.stringify(
          form.features
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean)
        )
      );

      data.append("featured", form.featured);

      if (form.image) {
        data.append("image", form.image);
      }

      if (editId) {
        await API.put(`/projects/${editId}`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        await API.post("/projects", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      fetchProjects();
      resetForm();
      setShowForm(false);

    } catch (error) {
      console.log(error);
    }
  };

  // ================= DELETE =================

  const deleteProject = async (id) => {
    try {
      await API.delete(`/projects/${id}`);
      for (let pair of data.entries()) {
        console.log(pair[0], pair[1]);
      }

      fetchProjects();

      setDeleteId(null);

    } catch (error) {
      console.log(error);
    }
  };

  // ================= EDIT =================

  const editProject = (project) => {
    setEditId(project._id);

    setForm({
      title: project.title || "",
      description: project.description || "",
      image: null,

      category: project.category || "Frontend",
      status: project.status || "Draft",

      liveLink: project.liveLink || "",
      githubLink: project.githubLink || "",

      technologies: (project.technologies || []).join(", "),

      role: project.role || "",
      problem: project.problem || "",
      insight: project.insight || "",
      solution: project.solution || "",
      impact: project.impact || "",

      features: (project.features || []).join(", "),

      featured: project.featured || false,
    });

    setShowForm(true);
  };

  // ================= RESET =================

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      image: null,

      category: "Frontend",
      status: "Draft",

      liveLink: "",
      githubLink: "",

      technologies: "",

      role: "",
      problem: "",
      insight: "",
      solution: "",
      impact: "",

      features: "",

      featured: false,
    });

    setEditId(null);
  };

  // ================= SEARCH =================

  const filteredProjects = projects.filter((project) => {
    const matchSearch = project.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchFilter =
      filter === "All"
        ? true
        : filter === "Featured"
          ? project.featured
          : project.status === filter;

    return matchSearch && matchFilter;
  });

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Projects Admin Panel
        </h1>

        <button
          onClick={() => {
            setShowForm(true);
            resetForm();
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700">
          + Add Project
        </button>
      </div>


      {/* FORM MODAL */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.form
              onSubmit={handleSubmit}
              className="bg-white w-full max-w-2xl rounded-2xl shadow-xl p-6 max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <h2 className="text-2xl font-bold mb-6">
                {editId ? "Edit Project" : "Add Project"}
              </h2>

              <div className="space-y-5">

                {/* Title */}
                <div>
                  <label className="block mb-2 font-medium">
                    Project Title
                  </label>

                  <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Portfolio Website"
                    className="w-full border rounded-lg px-4 py-3"
                    required
                  />
                </div>
                {/* category */}
                <div>
                  <label className="block mb-2 font-medium">
                    Project Category
                  </label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-4 py-3"
                  >
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="Full Stack">Full Stack</option>
                    <option value="Mobile App">Mobile App</option>
                    <option value="UI/UX">UI/UX</option>
                    <option value="API">API</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Role */}
                <div>
                  <label className="block mb-2 font-medium">
                    Your Role
                  </label>

                  <input
                    type="text"
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    placeholder="Full Stack Developer"
                    className="w-full border rounded-lg px-4 py-3"
                  />
                </div>

                {/* Problem */}
                <div>
                  <label className="block mb-2 font-medium">
                    Problem
                  </label>

                  <textarea
                    rows={3}
                    name="problem"
                    value={form.problem}
                    onChange={handleChange}
                    placeholder="What problem was this project solving?"
                    className="w-full border rounded-lg px-4 py-3 resize-none"
                  />
                </div>

                {/* Insight */}
                <div>
                  <label className="block mb-2 font-medium">
                    Insight
                  </label>

                  <textarea
                    rows={3}
                    name="insight"
                    value={form.insight}
                    onChange={handleChange}
                    placeholder="What insight shaped the approach?"
                    className="w-full border rounded-lg px-4 py-3 resize-none"
                  />
                </div>

                {/* Solution */}
                <div>
                  <label className="block mb-2 font-medium">
                    Solution
                  </label>

                  <textarea
                    rows={3}
                    name="solution"
                    value={form.solution}
                    onChange={handleChange}
                    placeholder="What did you build?"
                    className="w-full border rounded-lg px-4 py-3 resize-none"
                  />
                </div>

                {/* Impact */}
                <div>
                  <label className="block mb-2 font-medium">
                    Impact
                  </label>

                  <textarea
                    rows={3}
                    name="impact"
                    value={form.impact}
                    onChange={handleChange}
                    placeholder="What changed as a result?"
                    className="w-full border rounded-lg px-4 py-3 resize-none"
                  />
                </div>

                {/* Features */}
                <div>
                  <label className="block mb-2 font-medium">
                    Key Features
                  </label>

                  <input
                    type="text"
                    name="features"
                    value={form.features}
                    onChange={handleChange}
                    placeholder="Auth system, Doctor dashboard, Booking flow"
                    className="w-full border rounded-lg px-4 py-3"
                  />

                  <p className="text-sm text-gray-500 mt-1">
                    Separate features using commas.
                  </p>
                </div>
                {/* Description */}
                <div>
                  <label className="block mb-2 font-medium">
                    Description
                  </label>

                  <textarea
                    rows={5}
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Write project description..."
                    className="w-full border rounded-lg px-4 py-3 resize-none"
                    required
                  />
                </div>

                {/* Image */}
                <div>
                  <label className="block mb-2 font-medium">
                    Project Image
                  </label>

                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full border rounded-lg px-4 py-3"
                  />
                </div>

                {/* Live Link */}
                <div>
                  <label className="block mb-2 font-medium">
                    Live Link
                  </label>

                  <input
                    type="url"
                    name="liveLink"
                    value={form.liveLink}
                    onChange={handleChange}
                    placeholder="https://example.com"
                    className="w-full border rounded-lg px-4 py-3"
                  />
                </div>

                {/* Github Link */}
                <div>
                  <label className="block mb-2 font-medium">
                    Github Link
                  </label>

                  <input
                    type="url"
                    name="githubLink"
                    value={form.githubLink}
                    onChange={handleChange}
                    placeholder="https://github.com/username/project"
                    className="w-full border rounded-lg px-4 py-3"
                  />
                </div>

                {/* Technologies */}
                <div>
                  <label className="block mb-2 font-medium">
                    Technologies
                  </label>

                  <input
                    type="text"
                    name="technologies"
                    value={form.technologies}
                    onChange={handleChange}
                    placeholder="React, Node.js, MongoDB, Tailwind"
                    className="w-full border rounded-lg px-4 py-3"
                  />

                  <p className="text-sm text-gray-500 mt-1">
                    Separate technologies using commas.
                  </p>
                </div>
                {/* status */}
                <div>
                  <label className="block mb-2 font-medium">
                    Project Status
                  </label>
                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-4 py-3"
                  >
                    <option value="Draft">Draft</option>
                    <option value="Published">Published</option>
                  </select>
                </div>

                {/* Featured */}
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={form.featured}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        featured: e.target.checked,
                      })
                    }
                  />

                  <label>Featured Project</label>
                </div>

              </div>

              <div className="flex justify-end gap-3 mt-8">

                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-5 py-2 border rounded-lg"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                >
                  {editId ? "Update Project" : "Save Project"}
                </button>

              </div>

            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SEARCH + FILTER */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Search project..."
          className="w-full md:w-1/2 px-4 py-2 rounded-xl border focus:ring-2 focus:ring-blue-400 outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="w-full md:w-1/4 px-4 py-2 rounded-xl border"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Published">Published</option>
          <option value="Draft">Draft</option>
          <option value="Featured">Featured</option>
        </select>
      </div>

      {/* TABLE (DESKTOP) */}
      <div className="hidden md:block bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Tech</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredProjects.map((p) => (
              <tr key={p._id} className="border-t">

                <td className="p-3 font-semibold">{p.title}</td>

                <td className="p-3">{p.category}</td>

                <td className="p-3">
                  <div className="flex gap-1 flex-wrap">
                    {p.technologies.map((t, i) => (
                      <span
                        key={i}
                        className="text-xs bg-gray-200 px-2 py-1 rounded"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </td>

                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${p.status === "Published"
                      ? "bg-green-100 text-green-600"
                      : p.status === "Draft"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-blue-100 text-blue-600"
                      }`}
                  >
                    {p.status}
                  </span>
                </td>

                <td className="p-3 flex gap-4">
                  <a
                    href={p.githubLink}
                    className="text-sm text-gray-600 hover:text-black"
                  >
                    GitHub
                  </a>
                  <a
                    href={p.liveLink}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Live
                  </a>

                  <button className="text-sm text-green-600" onClick={() => editProject(p)}>Edit</button>

                  <button
                    onClick={() => setDeleteId(p._id)}
                    className="text-sm text-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARDS */}
      <div className="grid gap-4 md:hidden">
        {filteredProjects.map((p) => (
          <motion.div
            key={p._id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-4 rounded-xl shadow"
          >
            <h2 className="font-bold text-lg">{p.title}</h2>
            <p className="text-sm text-gray-500">{p.category}</p>

            <div className="flex flex-wrap gap-1 mt-2">
              {p.technologies.map((t, i) => (
                <span key={i} className="text-xs bg-gray-200 px-2 py-1 rounded">
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-3 flex justify-between items-center">
              <span className="text-xs text-gray-500">{p.status}</span>

              <div className="flex gap-3 text-sm">
                <button className="text-green-600">Edit</button>
                <button
                  onClick={() => setDeleteId(p.id)}
                  className="text-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* DELETE MODAL */}
      <AnimatePresence>
        {deleteId && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-6 rounded-xl w-full max-w-sm"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <h2 className="text-lg font-bold mb-3">Delete Project?</h2>
              <p className="text-sm text-gray-500 mb-5">
                This action cannot be undone.
              </p>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setDeleteId(null)}
                  className="px-3 py-1 border rounded"
                >
                  Cancel
                </button>

                <button
                  onClick={() => deleteProject(deleteId)}
                  className="px-3 py-1 bg-red-600 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
