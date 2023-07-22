import {
   GET_PUBLICIDAD_REQUEST,
   GET_PUBLICIDAD_FAIL,
   GET_PUBLICIDAD_SUCCESS
} from '../actionType'

import firebase from 'firebase/app'
require('firebase/firestore');
const db = firebase.firestore();

export const getBanners = () => async (dispatch) => {
   try {
      dispatch({
         type: GET_PUBLICIDAD_REQUEST,
      })
      let publicidad = [];
      const snap = await db.collection("publicidad").orderBy("orden", "asc")
         .get();
      if (snap.docs && snap.docs.length) {
         snap.forEach((doc) => {
            publicidad.push({
               id: doc.id,
               imagen: doc.data().imagen
            })
         });
      }
      
      dispatch({
         type: GET_PUBLICIDAD_SUCCESS,
         payload: publicidad,
      })
   } catch (error) {
      console.log(error)
      dispatch({
         type: GET_PUBLICIDAD_FAIL,
         payload: error,
      })
   }
}