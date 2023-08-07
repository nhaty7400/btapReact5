import { QLSV } from "./QLSV.constant.js";

const stateDefault = {
  mangSinhVien: JSON.parse(
    localStorage.getItem("reduxStore") ?? JSON.stringify([])
  ),
  mangTimKiem: [],
  sinhVienChinhSua: null,
  valueSearch: "",
};

export const quanLySinhVienReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case QLSV.ThemSinhVien: {
      const mangSVUpdate = [...state.mangSinhVien, action.payload];
      state.mangSinhVien = mangSVUpdate;
      localStorage.setItem("reduxStore", JSON.stringify(state.mangSinhVien));
      return { ...state };
    }
    case QLSV.XoaSinhVien: {
      state.mangSinhVien = state.mangSinhVien.filter(
        (sv) => sv.maSV !== action.payload.maSV
      );
      return { ...state };
    }
    case QLSV.ChinhSuaSinhVien: {
      state.sinhVienChinhSua = action.payload;
      return { ...state };
    }
    case QLSV.CapNhatSinhVien: {
      const index = state.mangSinhVien.findIndex(
        (i) => i.maSV === action.payload.maSV
      );
      if (index === -1) {
        return { ...state };
      }
      state.mangSinhVien[index] = action.payload;
      state.mangSinhVien = [...state.mangSinhVien];

      state.sinhVienChinhSua = null;
      return { ...state };
    }
    case QLSV.TimSinhVien: {
      let newArray = [...state.mangSinhVien];
      let resultArray = [];
      if (action.payload.length <= 0) {
        resultArray = [...newArray];
      } else {
        action.payload = action.payload.toLowerCase();
        resultArray = newArray.filter(
          (sv) => sv.hoTen.toLowerCase().indexOf(action.payload) > -1
        );
      }
      state.mangTimKiem = [...resultArray];
      state.valueSearch = action.payload;
      return { ...state };
    }
    default: {
      return { ...state };
    }
  }
};
