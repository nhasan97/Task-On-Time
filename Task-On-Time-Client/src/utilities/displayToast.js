import { toast } from "react-toastify";

const toastCharacteristics = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
};

export const showToastOnSuccess = (msg) => {
  toast.success(msg, toastCharacteristics);
};

export const showToastOnError = (msg) => {
  toast.error(msg, toastCharacteristics);
};
