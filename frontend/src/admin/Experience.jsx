import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import API from "../api/axios";

export default function AdminExperience() {
  const [experiences, setExperiences] = useState([]);

  const [form, setForm] = useState({
    position: "",
    company: "",
    duration: "",
    type: "",
    description: "",
  });

  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [showForm, setShowForm] = useState(false);


  const fetchExperience = async () => {
    try {
      const res = await API.get("/experiences/");
      setExperiences(res.data.experiences);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchExperience();
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({
      position: "",
      company: "",
      duration: "",
      type: "",
      description: "",
    });

    setEditId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await API.put(`/experiences/${editId}`, form);

      } else {
        await API.post("/experiences", form);
      }
      await fetchExperience();
      resetForm();
      setShowForm(false);
    } catch (error) {
      console.log(error);
    }

  };

  const handleEdit = (exp) => {
    setEditId(exp._id);
    setForm({
      position: exp.position,
      company: exp.company,
      duration: exp.duration,
      type: exp.type,
      description: exp.description,
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/experiences/${id}`);

      await fetchExperience();

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
          Experience Manager
        </h1>

        <button
          onClick={() => {
            setShowForm(true);
            resetForm();
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
        >
          + Add Experience
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
              className="bg-white w-full max-w-lg p-6 rounded-xl shadow"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <h2 className="text-xl font-bold mb-4">
                {editId ? "Edit Experience" : "Add Experience"}
              </h2>

              <div className="space-y-3">

                <input
                  name="position"
                  value={form.position}
                  onChange={handleChange}
                  placeholder="Position"
                  className="w-full border px-3 py-2 rounded"
                  required
                />

                <input
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  placeholder="Company"
                  className="w-full border px-3 py-2 rounded"
                  required
                />

                <input
                  name="duration"
                  value={form.duration}
                  onChange={handleChange}
                  placeholder="Duration (e.g. 2023 - Present)"
                  className="w-full border px-3 py-2 rounded"
                  required
                />

                <input
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  placeholder="Type (Full Time / Internship)"
                  className="w-full border px-3 py-2 rounded"
                  required
                />

                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Description"
                  className="w-full border px-3 py-2 rounded"
                  rows="3"
                  required
                />
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
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Company</th>
              <th className="p-3 text-left">Duration</th>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {experiences.map((exp) => (
              <tr key={exp._id} className="border-t">
                <td className="p-3 font-semibold">{exp.position}</td>
                <td className="p-3">{exp.company}</td>
                <td className="p-3">{exp.duration}</td>
                <td className="p-3">{exp.type}</td>

                <td className="p-3 flex gap-3">
                  <button
                    onClick={() => handleEdit(exp)}
                    className="text-green-600"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => setDeleteId(exp._id)}
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
        {experiences.map((exp) => (
          <motion.div
            key={exp._id}
            className="bg-white p-4 rounded-xl shadow"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="font-bold text-lg">{exp.position}</h2>
            <p className="text-gray-500 text-sm">{exp.company}</p>

            <p className="text-sm mt-2">{exp.duration}</p>
            <p className="text-sm text-blue-600">{exp.type}</p>

            <p className="text-sm text-gray-600 mt-2">{exp.description}</p>

            <div className="flex gap-4 mt-3">
              <button
                onClick={() => handleEdit(exp)}
                className="text-green-600"
              >
                Edit
              </button>

              <button
                onClick={() => setDeleteId(exp._id)}
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
              <h2 className="text-lg font-bold mb-3">Delete Experience?</h2>

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
