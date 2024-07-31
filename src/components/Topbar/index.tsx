import React, { useEffect, useState } from "react";
import "./style.scss";

interface Props {
  title: string;
  children?: any;
}

const Topbar = (props: Props) => {
  return (
    <div className="topbar">
      <div className="topbar__left">
        <div>{props.title}</div>
      </div>
      <div className="topbar__right">{props.children}</div>
    </div>
  );
};

export default Topbar;
