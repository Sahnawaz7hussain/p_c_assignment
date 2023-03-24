import * as types from "./notesActionType";
import axios from "axios";
import headers from "../../utils/header";
//console.log("header: ", headers);

const base_url = process.env.REACT_APP_BASE_URL;
const jwtTokan = localStorage.getItem("JWTTOKEN");
console.log("dddd: ", jwtTokan);

const postNoteActionFn = (note) => (dispatch) => {
  dispatch({ type: types.ADD_NOTES_REQUEST });
  return axios
    .post(`${base_url}/notes`, note, { headers })
    .then((res) => {
      return dispatch({ type: types.ADD_NOTES_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      return dispatch({ type: types.ADD_NOTES_FAILURE });
    });
};

const getNotesActionFn = () => (dispatch) => {
  dispatch({ type: types.GET_NOTES_REQUEST });
  return axios(`${base_url}/notes`, { headers })
    .then((res) => {
      return dispatch({ type: types.GET_NOTES_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      return dispatch({ type: types.GET_NOTES_FAILURE });
    });
};
const deleteNoteActionFn = (id) => (dispatch) => {
  dispatch({ type: types.DELETE_NOTES_REQUEST });
  return axios
    .delete(`${base_url}/notes/${id}`, { headers })
    .then((res) => {
      return dispatch({ type: types.DELETE_NOTES_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      return dispatch({ type: types.DELETE_NOTES_FAILURE });
    });
};
const editNoteActionFn = (id, data) => (dispatch) => {
  dispatch({ type: types.UPDATE_NOTES_REQUEST });
  return axios
    .put(`${base_url}/notes/${id}`, data, { headers })
    .then((res) => {
      return dispatch({ type: types.UPDATE_NOTES_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      return dispatch({ type: types.UPDATE_NOTES_FAILURE });
    });
};

export {
  getNotesActionFn,
  postNoteActionFn,
  deleteNoteActionFn,
  editNoteActionFn,
};
