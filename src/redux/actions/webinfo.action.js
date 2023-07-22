import {
   WEBINFO_FAIL,
   WEBINFO_REQUEST,
   WEBINFO_SUCCESS,
} from '../actionType'

import firebase from 'firebase/app'
require('firebase/firestore');
const db = firebase.firestore();

export const getWebInfo = () => async (dispatch, getState) => {
   try {
      dispatch({
         type: WEBINFO_REQUEST,
      })
      
      let webinfo;
      const docInfo = await db.collection("configuracion").doc("datos")
         .get();
      if (docInfo.exists) {
         webinfo = {
            instagram: docInfo.data().instagram,
            facebook: docInfo.data().facebook,
            twitter: docInfo.data().twitter,
            footer: docInfo.data().footer,
         }
      }
      dispatch({
         type: WEBINFO_SUCCESS,
         payload: webinfo,
      })
   } catch (error) {
      console.log(error)
      dispatch({
         type: WEBINFO_FAIL,
         payload: error,
      })
   }
}