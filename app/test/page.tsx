// "use client";
// import FileUpload from "@/lib/file-upload/FileUpload";
// import React from "react";

// const TestPage = () => {
//   const [image, setImage] = React.useState<string>("");

//   if (!image) {
//     throw new Error("Test error");
//   }

//   return (
//     <div>
//       <FileUpload
//         accept="image/*"
//         multiple={false}
//         onChange={(urls) => setImage(urls[0])}
//       />
//     </div>
//   );
// };

// export default TestPage;

import ContactForm from "@/components/forms/ContactForm";
// import FileUpload from "@/lib/file-upload/FileUpload";
const TestPage = () => {
  // const [image, setImage] = React.useState<string>("");
  return (
    <div>
      {/* {" "}
      <FileUpload
        accept="image/*"
        multiple={false}
        onChange={(urls) => setImage(urls[0])}
      />{" "} */}
      <ContactForm />
    </div>
  );
};
export default TestPage;
