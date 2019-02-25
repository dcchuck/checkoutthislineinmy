import React, { Component } from 'react';

import SnippetsContainer from "./SnippetsContainer";
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
        <SnippetsContainer>
          {
            this.records.map(( record, index ) =>
              <ListItem
                key={index}
                githubUrl={record.githubUrl}
                description={record.description}
                fileType={record.fileType}
              />
            )
          }
        </SnippetsContainer>
      </div>
    )
  }
}
