import React from 'react';
import marked  from 'marked';

export default class Comment extends React.Component {
  render() {
    return (
      // <div className="comment">
        <tr
        style={{'cursor': 'pointer'}}
        >
        <td className='itemTd'>{this.props.name}</td>
        <td className='itemTd'>{this.props.data1}</td>
        <td className='itemTd'>{this.props.data2}</td>
        <td className='itemTd'>{this.props.data3}</td>
        <td className='itemTd'>{this.props.data4}</td>
        <td className='itemTd'>{this.props.data5}</td>
        
        </tr>

      // </div>
    );
  }
}