import React, { Component } from "react";
import { connect } from "react-redux";
import {
  themSinhVienCreator,
  capNhatSinhVienCreator,
} from "../../redux/QLSV/QLSV.action.js";

const MAPPER = {
  maSV: "Mã sinh viên",
  hoTen: "Họ tên",
  email: "Email",
  soDienThoai: "Số điện thoại",
};

class FormSinhVien extends Component {
  state = {
    value: { maSV: "", hoTen: "", email: "", soDienThoai: "" },
    touch: { maSV: false, hoTen: false, email: false, soDienThoai: false },
    error: { maSV: "", hoTen: "", email: "", soDienThoai: "" },
  };

  handleChange = (event) => {
    const { value, id } = event.target;
    let newError = {};
    for (const key in this.state.touch) {
      if (this.state.touch[key]) {
        const __value = key === id ? value : this.state.value[key];

        switch (key) {
          case "maSV": {
            if (/^\d*$/.test(__value) === false) {
              newError[key] = "Mã sinh viên phải là số.";
            }
            this.props.mangSinhVien.map((sv) => {
              if (sv.maSV === __value) {
                newError[key] = "Mã sinh viên không được trùng.";
              }
            });
            break;
          }
          case "hoTen": {
            if (
              /^[a-z A-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$/.test(
                __value
              ) === false
            ) {
              newError[key] = "Tên phải là chữ.";
            }
            break;
          }
          case "email": {
            if (
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                __value
              ) === false
            ) {
              newError[key] = "Định dạng email không hợp lệ.";
            }
            break;
          }
          case "soDienThoai": {
            if (/^\d*$/.test(__value) === false) {
              newError[key] = "Số điện thoại phải là số.";
            }
            break;
          }
          default: {
            break;
          }
        }

        if (__value.length === 0) {
          newError[key] = MAPPER[key] + " không được bỏ trống";
        }
      }
    }

    this.setState({
      value: {
        ...this.state.value,
        [id]: value,
      },
      error: newError,
    });
  };

  handleFocus = (event) => {
    const { id } = event.target;

    this.setState({
      touch: {
        ...this.state.touch,
        [id]: true,
      },
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    for (const key in this.state.value) {
      if (this.state.value[key].length === 0) {
        return;
      }

      if (this.state.error[key]?.length > 0) {
        alert(this.state.error[key]);
        return;
      }
    }

    const creator = this.props.sinhVienChinhSua
      ? capNhatSinhVienCreator
      : themSinhVienCreator;

    this.props.dispatch(creator(this.state.value));

    this.setState({
      value: { maSV: "", hoTen: "", email: "", soDienThoai: "" },
    });
  };

  static getDerivedStateFromProps(newProps, currentState) {
    if (newProps.sinhVienChinhSua) {
      if (newProps.sinhVienChinhSua?.maSV !== currentState.value?.maSV) {
        return {
          ...currentState,

          value: newProps.sinhVienChinhSua,
        };
      }
    }
    return null;
  }

  render() {
    return (
      <div className="container">
        <div className="card text-left">
          <div className="card-header bg-dark text-white">
            <h3>Thông tin sinh viên</h3>
          </div>
          <div className="card-body">
            <form onSubmit={this.handleSubmit}>
              <div className="row">
                <div className="form-group col-6">
                  <span>Mã SV</span>
                  {this.props.sinhVienChinhSua ? (
                    <input
                      disabled
                      id="maSV"
                      onFocus={this.handleFocus}
                      className="form-control"
                      name="maSV"
                      value={this.state.value?.maSV}
                      onChange={this.handleChange}
                    />
                  ) : (
                    <input
                      id="maSV"
                      onFocus={this.handleFocus}
                      className="form-control"
                      name="maSV"
                      value={this.state.value?.maSV}
                      onChange={this.handleChange}
                    />
                  )}
                  {this.state.touch?.maSV && this.state.error?.maSV && (
                    <p className="text-danger">{this.state.error?.maSV}</p>
                  )}
                </div>
                <div className="form-group col-6">
                  <span>Họ tên</span>
                  <input
                    id="hoTen"
                    className="form-control"
                    name="hoTen"
                    value={this.state.value.hoTen}
                    onFocus={this.handleFocus}
                    onChange={this.handleChange}
                  />
                  {this.state.touch?.hoTen && this.state.error?.hoTen && (
                    <p className="text-danger">{this.state.error?.hoTen}</p>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="form-group col-6">
                  <span>Email</span>
                  <input
                    id="email"
                    type="email"
                    className="form-control"
                    name="email"
                    value={this.state.value.email}
                    onFocus={this.handleFocus}
                    onChange={this.handleChange}
                  />
                  {this.state.touch?.email && this.state.error?.email && (
                    <p className="text-danger">{this.state.error?.email}</p>
                  )}
                </div>
                <div className="form-group col-6">
                  <span>Số điện thoại</span>
                  <input
                    id="soDienThoai"
                    type="text"
                    className="form-control"
                    name="soDienThoai"
                    value={this.state.value.soDienThoai}
                    onFocus={this.handleFocus}
                    onChange={this.handleChange}
                  />
                  {this.state.touch?.soDienThoai &&
                    this.state.error?.soDienThoai && (
                      <p className="text-danger">
                        {this.state.error?.soDienThoai}
                      </p>
                    )}
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 text-right">
                  {this.props.sinhVienChinhSua ? (
                    <button className="btn btn-success mx-4">Cập nhật</button>
                  ) : (
                    <button className="btn btn-success mx-4">
                      Thêm sinh viên
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (rootReducer) => {
  return {
    mangSinhVien: rootReducer.quanLySinhVienReducer.mangSinhVien,
    sinhVienChinhSua: rootReducer.quanLySinhVienReducer.sinhVienChinhSua,
  };
};

export default connect(mapStateToProps)(FormSinhVien);
