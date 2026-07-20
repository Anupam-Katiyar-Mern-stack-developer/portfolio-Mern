import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import API from "../api/axios";

export default function AdminEducation() {
  const [education, setEducation] = useState([]);

  const [form, setForm] = useState({
    degree: "",
    institute: "",
    year: "",
    grade: "",
  });

  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const res = await API.get("/educations/");
        setEducation(res.data.educations);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEducation();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({
      degree: "",
      institute: "",
      year: "",
      grade: "",
    });
    setEditId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await API.put(`/educations/${editId}`, form);
      } else {
        await API.post("/educations/", form);
      }
    } catch (error) {
      console.log(error);
    }

    resetForm();
    setShowForm(false);
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditId(item._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    await API.delete(`/educations/${id}`);
    await fetchEducation();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Education Manager
        </h1>

        <button
          onClick={() => {
            setShowForm(true);
            resetForm();
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
        >
          + Add Education
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
                {editId ? "Edit Education" : "Add Education"}
              </h2>

              <div className="space-y-3">
                <input
                  name="degree"
                  value={form.degree}
                  onChange={handleChange}
                  placeholder="Degree"
                  className="w-full border p-3 rounded-xl"
                  required
                />

                <input
                  name="institute"
                  value={form.institute}
                  onChange={handleChange}
                  placeholder="Institute"
                  className="w-full border p-3 rounded-xl"
                  required
                />

                <input
                  name="year"
                  value={form.year}
                  onChange={handleChange}
                  placeholder="Year (e.g. 2020 - 2024)"
                  className="w-full border p-3 rounded-xl"
                  required
                />

                <input
                  name="grade"
                  value={form.grade}
                  onChange={handleChange}
                  placeholder="Grade / Percentage"
                  className="w-full border p-3 rounded-xl"
                  required
                />
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 border rounded-xl"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-xl"
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
              <th className="p-3 text-left">Degree</th>
              <th className="p-3 text-left">Institute</th>
              <th className="p-3 text-left">Year</th>
              <th className="p-3 text-left">Grade</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {education.map((item) => (
              <tr key={item._id} className="border-t">
                <td className="p-3 font-semibold">{item.degree}</td>
                <td className="p-3">{item.institute}</td>
                <td className="p-3">{item.year}</td>
                <td className="p-3 text-blue-600 font-medium">{item.grade}</td>

                <td className="p-3 flex gap-3">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-green-600"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => setDeleteId(item._id)}
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
        {education.map((item) => (
          <motion.div
            key={item._id}
            className="bg-white p-4 rounded-xl shadow"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="font-bold text-lg">{item.degree}</h2>
            <p className="text-gray-600 text-sm">{item.institute}</p>

            <p className="text-sm mt-2">{item.year}</p>
            <p className="text-sm text-blue-600 font-medium">{item.grade}</p>

            <div className="flex gap-4 mt-3">
              <button
                onClick={() => handleEdit(item)}
                className="text-green-600"
              >
                Edit
              </button>

              <button
                onClick={() => setDeleteId(item._id)}
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
              <h2 className="text-lg font-bold mb-3">Delete Education?</h2>

              <p className="text-sm text-gray-500 mb-5">
                This action cannot be undone.
              </p>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setDeleteId(null)}
                  className="px-3 py-1 border rounded-xl"
                >
                  Cancel
                </button>

                <button
                  onClick={() => handleDelete(deleteId)}
                  className="px-3 py-1 bg-red-600 text-white rounded-xl"
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
