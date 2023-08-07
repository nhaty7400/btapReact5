import React, { Component } from 'react'
import FormSinhVien from './formSinhVien'
import TableSinhVien from './tableSinhVien'
import Search from './Search'


export default class BaiTapForm
 extends Component {
  render() {
    return (
      <div className='container'>
        <h3>Bài tập Form</h3>
        <FormSinhVien/>
        <div className='my-5'> <Search/></div>
       
        <TableSinhVien/>
      </div>
    )
  }
}
