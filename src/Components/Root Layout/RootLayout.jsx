import React, { Fragment } from "react";
import Navbar from "../Nav Bar/Navbar";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <Fragment>
      <Navbar />
      <Outlet />
    </Fragment>
  );
}
