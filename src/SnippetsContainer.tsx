import React from 'react';

import "./SnippetsContainer.css";

const SnippetsContainer = (props: any) =>
  <div className="SnippetsContainer">
      {props.children}
  </div>

export default SnippetsContainer;
