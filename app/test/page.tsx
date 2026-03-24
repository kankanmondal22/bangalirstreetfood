"use client";
import FileUpload from "@/lib/file-upload/FileUpload";
import React from "react";

const TestPage = () => {
  const [image, setImage] = React.useState<string>("");
  return (
    <div>
      <FileUpload
        accept="image/*"
        multiple={false}
        onChange={(urls) => setImage(urls[0])}
      />
    </div>
  );
};

export default TestPage;
