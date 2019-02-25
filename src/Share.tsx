import React, { Component } from 'react';
import { Input, TextArea } from "./Input";

import './Share.css'

interface IShareState {
  snippet: string;
  githubUrl: string;
  fileType: string;
  description: string;
}

export default class Share extends Component <{},IShareState> {
  constructor(props: {}) {
    super(props)
    this.state = {
      githubUrl: "",
      fileType: "",
      description: "",
      snippet: "",
    }

    this.handleChange = this.handleChange.bind(this);
    this.sendToServer = this.sendToServer.bind(this);
  }

  private handleChange(e: any) {
    const target = e.currentTarget.name;
    this.setState({ [target]: e.currentTarget.value } as Pick<IShareState, "githubUrl" | "fileType" | "description">)
  }

  private sendToServer() {
    console.log(this.state)
    // fetch("http://localhost:9001/api", {
    //   method: "POST",
    //   mode: "cors", //TODO
    //   cache: "no-cache",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(this.state)
    // }).then(function (response) {
    //   console.log(response);
    //   return response.json()
    // }).then(myJson => {
    //   window.alert(JSON.stringify(myJson))
    // })
  }

  render() {
    return (
      <div className="FormContainer">
        <TextArea
          value={this.state.snippet}
          onChange={this.handleChange}
          name="snippet"
        >
          Snippet
        </TextArea>
        <TextArea
          value={this.state.description}
          onChange={this.handleChange}
          name="description"
        >
          Description
        </TextArea>
        <Input
          value={this.state.fileType}
          onChange={this.handleChange}
          name="fileType"
        >
          File Type
        </Input>
        <Input
          value={this.state.githubUrl}
          onChange={this.handleChange}
          name="githubUrl"
        >
          Github URL
        </Input>
        <button onClick={this.sendToServer}>Share</button>
      </div>
    )
  }
}
