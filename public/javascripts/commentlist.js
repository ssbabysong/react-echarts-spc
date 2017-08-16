import React from 'react';
import { Table } from 'antd';

const columns = [{
  title: 'Name',
  dataIndex: 'name',
}, {
  title: 'Data1',
  dataIndex: 'data1',
}, {
  title: 'Data2',
  dataIndex: 'data2',
}, {
  title: 'Data3',
  dataIndex: 'data3',
}, {
  title: 'Data4',
  dataIndex: 'data4',
},{
  title: 'Data5',
  dataIndex: 'data5',
}, {
  title: '保存日期',
  dataIndex: 'timestamp',
}];

  export default class CommentList extends React.Component {
  render () {
    return (
      <div>
    <Table columns={columns} dataSource={this.props.data} size="middle" />
  </div>
    );
  }
};