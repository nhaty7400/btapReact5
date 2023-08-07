import React, { Component } from "react";
import { connect } from "react-redux";
import {
  chinhSuaSinhVienCreator,
  xoaSinhVienCreator,
} from "../../redux/QLSV/QLSV.action.js";

class TableSinhVien extends Component {
  renderMang = (mang) => {
    return mang.map((sinhVien, index) => {
      return (
        <tr key={index}>
          <td>{sinhVien.maSV}</td>
          <td>{sinhVien.hoTen}</td>
          <td>{sinhVien.soDienThoai}</td>
          <td>{sinhVien.email}</td>
          <td>
            <button
              onClick={() => {
                if (window.confirm("Bạn có chắc chắn muốn xóa hay không?")) {
                  this.props.dispatch(
                    xoaSinhVienCreator({
                      maSV: sinhVien.maSV,
                    })
                  );
                }
              }}
              className="btn btn-danger mx-2"
            >
              Xóa
            </button>
            <button
              onClick={() => {
                this.props.dispatch(chinhSuaSinhVienCreator(sinhVien));
              }}
              className="btn btn-warning"
            >
              Chỉnh sửa
            </button>
          </td>
        </tr>
      );
    });
  };
  render() {
    return (
      <div className="container">
        <table className="table">
          <thead>
            <tr className="bg-dark text-white">
              <th>Mã SV</th>
              <th>Họ tên</th>
              <th>Số điện thoại</th>
              <th>Email</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.props.valueSearch.length === 0
              ? this.renderMang(this.props.mangSinhVien)
              : this.renderMang(this.props.mangTimKiem)}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (rootReducer) => {
  return {
    mangSinhVien: rootReducer.quanLySinhVienReducer.mangSinhVien,
    mangTimKiem: rootReducer.quanLySinhVienReducer.mangTimKiem,
    valueSearch: rootReducer.quanLySinhVienReducer.valueSearch,
  };
};

export default connect(mapStateToProps, null)(TableSinhVien);
