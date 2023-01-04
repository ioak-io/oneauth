import React, { useState } from 'react';
import './style.scss';

interface Props {
  realm?: string;
}

const Landing = (props: Props) => {

  return (
    <div className="landing">landing page REALM={props.realm || "unknown"}
    </div>
  );
};

export default Landing;
