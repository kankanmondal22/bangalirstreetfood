"use client";

import { useState, useEffect } from "react";
import { Upload, X, FileIcon, ImageIcon } from "lucide-react";
import { useS3Upload } from "./useS3Upload";

interface FileUploadProps {
  value?: string[]; // URLs
  onChange?: (urls: string[]) => void;

  multiple?: boolean;
  accept?: string;
  maxFiles?: number;

  autoUpload?: boolean; // 🔥 key feature
  showPreview?: boolean;

  label?: string;
  helperText?: string;
}

export default function FileUpload({
  value = [],
  onChange,
  multiple = false,
  accept = "*/*",
  maxFiles = 5,
  autoUpload = true,
  showPreview = true,
  label = "Upload File",
  helperText,
}: FileUploadProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>(value);

  const { uploadFile, uploadMultiple, uploading } = useS3Upload();

  useEffect(() => {
    return () => {
      previewUrls.forEach((url) => {
        if (!url.startsWith("http")) URL.revokeObjectURL(url);
      });
    };
  }, []);

  const handleFiles = async (selected: FileList | null) => {
    if (!selected) return;

    let newFiles = Array.from(selected);

    if (!multiple) newFiles = [newFiles[0]];
    if (multiple) newFiles = newFiles.slice(0, maxFiles);

    setFiles(newFiles);

    // preview
    const previews = newFiles.map((f) => URL.createObjectURL(f));
    setPreviewUrls(previews);

    // 🔥 AUTO UPLOAD
    if (autoUpload) {
      const urls = multiple
        ? await uploadMultiple(newFiles)
        : [await uploadFile(newFiles[0])];

      onChange?.(urls);
    }
  };

  const handleManualUpload = async () => {
    if (!files.length) return;

    const urls = multiple
      ? await uploadMultiple(files)
      : [await uploadFile(files[0])];

    onChange?.(urls);
  };

  const removeFile = (index: number) => {
    const updated = previewUrls.filter((_, i) => i !== index);
    setPreviewUrls(updated);
    onChange?.(updated);
  };

  const isImage = (url: string) =>
    url.startsWith("blob:")
      ? true
      : /\.(jpg|jpeg|png|gif|webp|avif)$/i.test(url);

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>

      {/* Upload Box */}
      <div className="relative cursor-pointer rounded-lg border-2 border-dashed p-6 text-center">
        <input
          type="file"
          multiple={multiple}
          accept={accept}
          onChange={(e) => handleFiles(e.target.files)}
          className="absolute inset-0 cursor-pointer opacity-0"
        />

        <Upload className="mx-auto mb-2" />
        <p className="text-sm">Click or drag files</p>
        {helperText && <p className="text-xs text-gray-500">{helperText}</p>}
      </div>

      {/* Preview */}
      {showPreview && previewUrls.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          {previewUrls.map((url, i) => (
            <div key={i} className="relative rounded border p-2">
              <div className="flex h-24 items-center justify-center rounded bg-gray-50">
                {isImage(url) ? (
                  <img src={url} className="max-h-full object-contain" />
                ) : (
                  <FileIcon />
                )}
              </div>

              <button
                onClick={() => removeFile(i)}
                className="absolute top-1 right-1 rounded-full bg-white p-1"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Manual Upload Button */}
      {!autoUpload && files.length > 0 && (
        <button
          type="button"
          onClick={handleManualUpload}
          disabled={uploading}
          className="rounded bg-blue-600 px-4 py-2 text-white"
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      )}
    </div>
  );
}
