"use client";

import axios from "axios";

export default function TestPage() {
  const handleDownload = async () => {
    try {
      // Fetch the image from the API route
      const response = await axios.get("/api/booking", {
        responseType: "blob",
      });
      const blob = response.data;

      // Create a download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "booking-image.png";
      document.body.appendChild(link);
      link.click();

      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading image:", error);
      alert("Failed to download image");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-8">Test Booking Image</h1>

      {/* Preview the image */}
      <div className="mb-8">
        <img
          src="/api/booking"
          alt="Booking Preview"
          className="border border-gray-300 rounded shadow-lg"
        />
      </div>

      {/* Download button */}
      <button
        onClick={handleDownload}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Download Image
      </button>
    </div>
  );
}
