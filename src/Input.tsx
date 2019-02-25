import React, { Component } from 'react';

import "./Input.css"

const TextArea = (props: any) =>
  <label className="Input">
    {props.children}
    <textarea
      cols={80}
      rows={4}
      className="ActualInput"
      value={props.value}
      onChange={props.onChange}
      name={props.name}
    />
  </label>


const Input = (props: any) =>
  <label className="Input">
    {props.children}
    <input
      type="text"
      className="ActualInput"
      value={props.value}
      onChange={props.onChange}
      name={props.name}
    />
  </label>

export { TextArea, Input };
