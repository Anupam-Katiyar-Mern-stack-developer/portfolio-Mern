import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import API from "../api/axios";

export default function AdminSkills() {
  const [skills, setSkills] = useState([]);
  const [form, setForm] = useState({
    name: "",
    category: "Frontend",
    level: "Beginner",
  });

  const fetchSkills = async () => {
      try {
        const res = await API.get("/skills/");
        setSkills(res.data.skills);
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    fetchSkills();
  }, []);

  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({ name: "", category:"Frontend" ,level: "Beginner" });
    setEditId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await API.put(`/skills/${editId}`, form);
      } else {
        await API.post(`skills`, form);
      }
      fetchSkills();
      resetForm();
      setShowForm(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (skill) => {
    setEditId(skill._id);

    setForm({
      name: skill.name,
      category: skill.category,
      level: skill.level,
    });
    
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/skills/delete/${id}`);

      fetchSkills();

      setDeleteId(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Skills Manager
        </h1>

        <button
          onClick={() => {
            setShowForm(true);
            resetForm();
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
        >
          + Add Skill
        </button>
      </div>

      {/* FORM MODAL */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.form
              onSubmit={handleSubmit}
              className="bg-white w-full max-w-md p-6 rounded-xl shadow"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <h2 className="text-xl font-bold mb-4">
                {editId ? "Edit Skill" : "Add Skill"}
              </h2>

              <div className="space-y-3">
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Skill Name (e.g. React)"
                  className="w-full border px-3 py-2 rounded"
                  required
                />

                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                >
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="Database">Database</option>
                  <option value="Programming Language">
                    Programming Language
                  </option>
                  <option value="Tools">Tools</option>
                  <option value="DevOps">DevOps</option>
                  <option value="Other">Other</option>
                </select>

                <select
                  name="level"
                  value={form.level}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Professional">Professional</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Save
                </button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DESKTOP TABLE */}
      <div className="hidden md:block bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="p-3 text-left">Skill</th>
              <th className="p-3 text-left">Level</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {skills.map((s) => (
              <tr key={s._id} className="border-t">
                <td className="p-3 font-semibold">{s.name}</td>

                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      s.level === "Advanced"
                        ? "bg-green-100 text-green-600"
                        : s.level === "Intermediate"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {s.level}
                  </span>
                </td>

                <td className="p-3 flex gap-3">
                  <button
                    onClick={() => handleEdit(s)}
                    className="text-green-600"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => setDeleteId(s._id)}
                    className="text-red-600"
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
        {skills.map((s) => (
          <motion.div
            key={s._id}
            className="bg-white p-4 rounded-xl shadow"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="font-bold text-lg">{s.name}</h2>

            <span
              className={`inline-block mt-2 px-3 py-1 rounded-full text-xs ${
                s.level === "Advanced"
                  ? "bg-green-100 text-green-600"
                  : s.level === "Intermediate"
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-gray-200 text-gray-600"
              }`}
            >
              {s.level}
            </span>

            <div className="flex gap-4 mt-3">
              <button
                onClick={() => handleEdit(s._id)}
                className="text-green-600"
              >
                Edit
              </button>

              <button
                onClick={() => setDeleteId(s._id)}
                className="text-red-600"
              >
                Delete
              </button>
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
            <div className="bg-white p-6 rounded-xl w-full max-w-sm">
              <h2 className="text-lg font-bold mb-3">Delete Skill?</h2>

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
                  onClick={() => handleDelete(deleteId)}
                  className="px-3 py-1 bg-red-600 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
