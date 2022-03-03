import Resizer from "react-image-file-resizer";

export const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      400,
      400,
      "JPEG",
      70,
      0,
      (uri) => {
        resolve(uri);
      },
      "file"
    );
  });
