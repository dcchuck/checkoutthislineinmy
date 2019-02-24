import React, { Component } from 'react';

import ListItem from './ListItem';

interface IHomeProps {
  records: any[];
}

import './Home.css';

export default class Home extends Component <IHomeProps, {}> {
  public records: any[];

  constructor(props: IHomeProps) {
    super(props)

    this.records = props.records;
  }

  render() {
    return(
      <div>
       <ol className="ListItems">
          {this.records.map(( record, index ) => <ListItem key={index} githubUrl={record.githubUrl} description={record.description} fileType={record.fileType} />)}
        </ol>
      </div>
    )
  }
}
