import { useEffect } from "react";
import Swal from "sweetalert2";

const ModalSuccess = ({ urlPath }) => {
  Swal.fire({
    icon: "success",
    title: "Data saved successfully",
    text: "You have successfully saved the data",
    showConfirmButton: false,
    timer: 2000
  });

  useEffect(() => {
    if (urlPath) {
      setTimeout(() => {
        window.location.href = urlPath;
      }, 2000);
    }
  }, []);
};

export default ModalSuccess;
