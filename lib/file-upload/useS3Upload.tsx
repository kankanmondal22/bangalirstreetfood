"use client";
import { useState } from "react";
import axios from "axios";

interface UploadResponse {
  uploadUrl: string;
  publicUrl: string;
}

export function useS3Upload() {
  const [uploading, setUploading] = useState(false);

  const uploadFile = async (file: File): Promise<string> => {
    setUploading(true);
    try {
      const { data } = await axios.post<UploadResponse>("/api/upload", {
        fileName: file.name,
        fileType: file.type,
      });

      await axios.put(data.uploadUrl, file, {
        headers: { "Content-Type": file.type },
      });

      return data.publicUrl;
    } finally {
      setUploading(false);
    }
  };

  const uploadMultiple = async (files: File[]): Promise<string[]> => {
    return Promise.all(files.map(uploadFile));
  };

  return { uploadFile, uploadMultiple, uploading };
}
