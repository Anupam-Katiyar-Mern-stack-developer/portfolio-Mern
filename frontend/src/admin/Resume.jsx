import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import API from "../api/axios";

export default function AdminResume() {
  const [resume, setResume] = useState({});
  const [newFile, setNewFile] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchResume = async () => {
    try {
      const res = await API.get("/resume/");

      console.log(res.data);

      setResume(res.data.resume);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchResume();
  }, []);

  const handleUpload = async (e) => {

    const file = e.target.files[0];
    if (file) {
      setNewFile(file);
    }
  };

  const saveResume = async () => {
    if (!newFile) return;
    try {
      const formData = new FormData();
      
      formData.append("resume", newFile);
      formData.append("title","My Resume");


      await API.post("/resume", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

     await  fetchResume();

      setNewFile(null);
      setShowModal(false);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Resume Manager
        </h1>

        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
        >
          + Update Resume
        </button>
      </div>

      {/* RESUME CARD */}
      <div className="bg-white rounded-xl shadow p-5 md:p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Current Resume
        </h2>

        <p className="text-gray-600 mb-1">
          File: <span className="font-medium">
            {resume?.title || "No Resume Uploaded"}
          </span>
        </p>

        <p className="text-gray-600 mb-4">
          Last Updated: {resume?.updatedAt
            ? new Date(resume.updatedAt).toLocaleDateString()
            : "-"}
        </p>

        <div className="flex flex-wrap gap-3">
          {resume?.file && (
            <>
              <a
                href={resume.file}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-green-600 text-white rounded-xl"
              >
                View Resume
              </a>

              <a
                href={resume.file}
                download
                className="px-4 py-2 bg-gray-800 text-white rounded-xl"
              >
                Download
              </a>
            </>
          )}
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
          >
            Replace
          </button>
        </div>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white w-full max-w-md p-6 rounded-xl shadow"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <h2 className="text-xl font-bold mb-4">Upload New Resume</h2>

              {/* FILE INPUT */}
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleUpload}
                className="w-full border p-2 rounded mb-4"
              />

              {newFile && (
                <p className="text-sm text-gray-600 mb-3">
                  Selected: <span className="font-medium">{newFile.name}</span>
                </p>
              )}

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>

                <button
                  onClick={saveResume}
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Save
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
