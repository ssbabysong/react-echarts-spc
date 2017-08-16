/* 
* @Author: ChenShas
* @Date:   2017-05-05 03:55:39
* @Last Modified by:   ChenShas
* @Last Modified time: 2017-05-05 04:39:16
*/
import React from 'react';

import { Card } from 'antd';

export default class Display extends React.Component {
  render () {
    return (
      <Card title="Card title" style={{ width: 300 }}>
	    <p>Card content</p>
	    <p>Card content</p>
	    <p>Card content</p>
	  </Card>
    );
  }
};