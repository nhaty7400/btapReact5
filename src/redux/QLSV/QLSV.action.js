import { QLSV } from "./QLSV.constant.js";

export const themSinhVienCreator = (payload) => {
  return {
    type: QLSV.ThemSinhVien,
    payload,
  };
};

export const xoaSinhVienCreator = (payload) => {
  return {
    type: QLSV.XoaSinhVien,
    payload,
  };
};

export const chinhSuaSinhVienCreator = (payload) => {
  return {
    type: QLSV.ChinhSuaSinhVien,
    payload,
  };
};

export const capNhatSinhVienCreator = (payload) => {
  return {
    type: QLSV.CapNhatSinhVien,
    payload,
  };
};

export const timSinhVienCreator = (payload) => {
  return {
    type: QLSV.TimSinhVien,
    payload,
  };
};
