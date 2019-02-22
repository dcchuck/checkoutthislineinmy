import React, { Component } from 'react';

interface IShareState {
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
    }

    this.handleChange = this.handleChange.bind(this);
    this.sendToServer = this.sendToServer.bind(this);
  }

  private handleChange(e: any) {
    const target = e.currentTarget.name;
    this.setState({ [target]: e.currentTarget.value } as Pick<IShareState, "githubUrl" | "fileType" | "description">)
  }

  private sendToServer() {
    fetch("http://localhost:9001/api", {
      method: "POST",
      mode: "cors", //TODO
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state)
    }).then(function (response) {
      console.log(response);
      return response.json()
    }).then(myJson => {
      window.alert(JSON.stringify(myJson))
    })
  }

  render() {
    return (
      <div>
        <label>
          Github URL
          <input type="text" value={this.state.githubUrl} onChange={this.handleChange} name="githubUrl" />
        </label>
        <label>
          File Type
          <input type="text" value={this.state.fileType} onChange={this.handleChange} name="fileType" />
        </label>
        <label>
          Description
          <input type="text" value={this.state.description} onChange={this.handleChange} name="description" />
        </label>
        <button onClick={this.sendToServer}>Share</button>
      </div>
    )
  }
}
