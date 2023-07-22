import {
   GET_CATEGORIAS_REQUEST,
   GET_CATEGORIAS_FAIL,
   GET_CATEGORIAS_SUCCESS,
   GET_NOTICIAS_REQUEST,
   GET_NOTICIAS_SUCCESS,
   GET_NOTICIAS_FAIL,
   GET_NOTICIAS_EMPTY,
   GET_NOTA_REQUEST,
   GET_NOTA_SUCCESS,
   GET_NOTA_FAIL,
} from '../actionType'

import firebase from 'firebase/app'
require('firebase/firestore');
const db = firebase.firestore();

export const getCategorias = () => async (dispatch) => {
   try {
      dispatch({
         type: GET_CATEGORIAS_REQUEST,
      })
      let categorias = [];
      const snapshotCategorias = await db.collection("categorias").orderBy("orden", "asc")
         .get();
      if (snapshotCategorias.docs && snapshotCategorias.docs.length) {
         snapshotCategorias.forEach((doc) => {
            categorias.push({
               id: doc.id,
               nombre: doc.data().nombre,
               tipo: doc.data().tipo,
               redireccion: doc.data().redireccion,
               thumbnail: doc.data().thumbnail,
            })
         });
      }
      dispatch({
         type: GET_CATEGORIAS_SUCCESS,
         payload: categorias,
      })
   } catch (error) {
      console.log(error)
      dispatch({
         type: GET_CATEGORIAS_FAIL,
         payload: error,
      })
   }
}

export const getNoticiasByCategory = id => async dispatch => {
   try {
      dispatch({
         type: GET_NOTICIAS_REQUEST,
         payload: null
      })
      console.log("CARGANDO NOTIS")

      let noticias = [];
      const snapshotNoticias = await db.collection("noticias")
         .where("categoria.id", "==", id)
         .orderBy("fecha", "desc")
         .limit(60)
         .get();
      if (snapshotNoticias.docs && snapshotNoticias.docs.length) {
         snapshotNoticias.forEach((doc) => {
            noticias.push({
               id: doc.id,
               titulo: doc.data().titulo,
               imagen: doc.data().imagenes && doc.data().imagenes[0] && doc.data().imagenes[0].length ? doc.data().imagenes[0] : "/logoBN.jpg",
               fecha: doc.data().fecha,
            })
         });
         dispatch({
            type: GET_NOTICIAS_SUCCESS,
            payload: noticias,
         })
      }
      else {
         dispatch({
            type: GET_NOTICIAS_EMPTY,
            payload: noticias
         })
      }
   }
   catch (error) {
      console.log(error)
      dispatch({
         type: GET_NOTICIAS_FAIL,
         payload: error,
      })
   }
}

export const getNotaById = id => async dispatch => {
   try {
      dispatch({
         type: GET_NOTA_REQUEST,
         payload: null
      })
      console.log("CARGANDO")
      let nota;
      const doc = await db.collection("noticias")
         .doc(id)
         .get();
      if (doc.exists) {
         const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
         const fecha = doc.data().fecha.toDate()         
         const fechatext = ("0" + fecha.getDate()).slice(-2) + " de " + meses[fecha.getMonth()] + " de " + fecha.getFullYear()+" | "+ ("0" + fecha.getHours()).slice(-2)+":"+("0" + fecha.getHours()).slice(-2);
         const data = doc.data();
         nota = {
            id: doc.id,
            titulo: data.titulo,
            subtitulo: data.subtitulo,
            imagenes: data.imagenes,
            fecha: data.fecha,
            fechatext: fechatext,
            contenido: data.contenido,
         }
         dispatch({
            type: GET_NOTA_SUCCESS,
            payload: nota,
         })
      }
      else {
         dispatch({
            type: GET_NOTA_FAIL,
            payload: nota
         })
      }
   }
   catch (error) {
      console.log(error)
      dispatch({
         type: GET_NOTA_FAIL,
         payload: error,
      })
   }
}