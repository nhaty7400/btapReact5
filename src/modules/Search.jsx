import React, { Component } from "react";
import { connect } from "react-redux";
import { timSinhVienCreator } from "../redux/QLSV/QLSV.action";

class Search extends Component {
  render() {
    return (
      <div className="d-flex justify-content-center">
        <input
          onChange={(event) => {
            this.props.dispatch(timSinhVienCreator(event.target.value));
          }}
          className="form-control w-50"
          placeholder="Nhập tên sinh viên cần tìm"
          value={this.props.valueSearch}
          type="text"
        />
        <button
          onClick={() => {
            this.props.dispatch(timSinhVienCreator(""));
          }}
          className="btn btn-info mx-3"
        >
          Clear
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    valueSearch: state.quanLySinhVienReducer.valueSearch,
  };
};

export default connect(mapStateToProps, null)(Search);
