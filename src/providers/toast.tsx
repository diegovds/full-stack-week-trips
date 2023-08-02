"use client";

import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

type ToastContainerProps = {
  children: ReactNode;
};

const ToastProvider = ({ children }: ToastContainerProps) => {
  return (
    <>
      {children}
      <ToastContainer />
    </>
  );
};

export default ToastProvider;
