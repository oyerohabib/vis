"use client";

import React, { useState } from "react";

const ImageUploader = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadMessage, setUploadMessage] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadMessage("No file selected");
      return;
    }
// xapajij412@lisoren.com
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("upload_preset", process.env.NEXT_PUBLIC_UPLOAD_PRESET!);
      formData.append("api_key", process.env.NEXT_PUBLIC_API_KEY!);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (res.ok) {
        const result = await res.json();
        setUploadMessage("Image uploaded successfully");
        console.log("Upload result:", result);
      } else {
        const errorResult = await res.json();
        setUploadMessage(`Upload failed: ${errorResult.error.message}`);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      setUploadMessage("An error occurred while uploading your image");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mb-4"
      />
      <button
        onClick={handleUpload}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Upload Image
      </button>
      {uploadMessage && <p className="mt-4">{uploadMessage}</p>}
    </div>
  );
};

export default ImageUploader;
