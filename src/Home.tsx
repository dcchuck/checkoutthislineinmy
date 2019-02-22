import React, { Component } from 'react';

const ListItem = (props: any) => <li>{props.githubUrl} - {props.description} - {props.fileType}</li>

interface IHomeProps {
  records: any[];
}

export default class Home extends Component <IHomeProps, {}> {
  public records: any[];

  constructor(props: IHomeProps) {
    super(props)

    this.records = props.records;
  }

  render() {
    return(
      <div>
       <ol>
          {this.records.map(record => <ListItem githubUrl={record.githubUrl} description={record.description} fileType={record.fileType} />)}
        </ol>
      </div>
    )
  }
}
