import React, { Component } from 'react';

const ListItem = () => <li>hello</li>

interface IHomeProps {

}

export default class Home extends Component <IHomeProps, {}> {
  constructor(props: IHomeProps) {
    super(props)
  }

  render() {
    return(
      <div>home</div>
    )
  }
}
