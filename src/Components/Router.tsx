import { Route, Routes } from "react-router-dom";
import { ErrorPage } from "../Page";
import { Home } from "./Container";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<ErrorPage  />} />
    </Routes>
  );
};
