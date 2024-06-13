import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const success = () => {
  toast.success("Task added successfully");
};

export const taskExists = () => {
  toast.warning("Task already exists");
};

export const deleted = () => {
  toast.success("Successfully Deleted");
};

export const empty = () => {
  toast.error("Task is empty");
};
