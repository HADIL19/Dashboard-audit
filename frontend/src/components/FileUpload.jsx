import { useState } from "react";

function FileUpload() {
  const [file, setFile] = useState(null);

  const handleUpload = () => {
    if (!file) return alert("Please select a file!");
    alert(`File "${file.name}" uploaded successfully!`);
    setFile(null);
  };

  return (
    <div className="bg-white p-6 shadow-md rounded-lg mt-6">
      <h2 className="text-xl font-bold mb-4">Upload Audit File</h2>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="border p-2 rounded w-full"
      />
      <button
        onClick={handleUpload}
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full transition"
      >
        Upload
      </button>
    </div>
  );
}

export default FileUpload;
