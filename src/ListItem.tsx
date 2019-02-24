import React, { Component } from 'react';

import './ListItem.css'

const Description = (props: any) =>
  <div>{props.contents}</div>

const FileTypeBadge = (props: any) =>
  <div className="FileTypeBadge">{props.fileType}</div>

const Snippet = (props: any) =>
  <div className="Snippet">{props.children}</div>

interface IListItemProps {
  fileType: string;
  description: string;
  githubUrl: string;
}

interface IListItemState {
  displayDescription: boolean;
}

class ListItem extends Component <IListItemProps, IListItemState> {
  public allClassNames: string;

  constructor(props: IListItemProps) {
    super(props);
    this.allClassNames = `ListItemDiv ${props.fileType}`
    this.state = {
      displayDescription: false
    }

    this.onClick = this.onClick.bind(this);
  }

  public onClick() {
    this.setState({
      displayDescription: !this.state.displayDescription
    })
  }

  public render() {
    return (
      <li className="ListItem" onClick={this.onClick}>
        <div className={this.allClassNames}>
          <Snippet>{this.props.githubUrl}</Snippet>
          { this.state.displayDescription ?
              <Description contents={this.props.description} />
              :
              null
          }
          <FileTypeBadge fileType={this.props.fileType} /> </div>
      </li>
    )
  }
}


export default ListItem;
