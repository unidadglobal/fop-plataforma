import firebase from 'firebase/app'
import auth from '../../firebase'
import {
   LOAD_PROFILE,
   LOGIN_FAIL,
   LOGIN_REQUEST,
   LOGIN_SUCCESS,
   LOG_OUT,
   AUTH_CHECKING,
   AUTH_CHECKED,
   AUTH_FAILED,
   AUTH_DENIED,
   AUTH_AWAITING_APPROVAL,
   AUTH_SENDING_FORM
} from '../actionType'
require('firebase/firestore');
require('firebase/storage');
const db = firebase.firestore();

const storage = firebase.storage();

export const login = () => async dispatch => {
   try {
      dispatch({
         type: LOGIN_REQUEST,
      })

      const provider = new firebase.auth.GoogleAuthProvider()
      const res = await auth.signInWithPopup(provider)
      const accessToken = res.credential.accessToken

      const profile = {
         name: res.additionalUserInfo.profile.name,
         photoURL: res.additionalUserInfo.profile.picture,
         uid: res.user.uid
      }

      const doc = await db.collection("usuarios").doc(res.user.uid).get();
      if (!doc.exists) {
         await db.collection("usuarios").doc(res.user.uid).set({
            formulario: null,
            fecha_registro: new Date(),
            autorizado: false
         })
      }

      localStorage.setItem('ytc-access-token', accessToken)
      localStorage.setItem('ytc-user', JSON.stringify(profile))

      dispatch({
         type: LOGIN_SUCCESS,
         payload: accessToken,
      })
      dispatch({
         type: LOAD_PROFILE,
         payload: profile,
      })
   } catch (error) {
      console.log(error.message)
      dispatch({
         type: LOGIN_FAIL,
         payload: error.message,
      })
   }
}

export const log_out = () => async dispatch => {
   await auth.signOut()
   dispatch({
      type: LOG_OUT,
   })

   localStorage.removeItem('ytc-access-token')
   localStorage.removeItem('ytc-user')
}

export const checkIfAuthorised = () => async (dispatch, getState) => {
   try {
      dispatch({
         type: AUTH_CHECKING,
      })

      const storedUser = localStorage.getItem('ytc-user')
      let user;
      if (storedUser.length) {
         let arr = JSON.parse(storedUser);
         if (arr.uid) {
            user = arr.uid;
         }
      }

      const usuario = user ? user : auth.currentUser.uid ? auth.currentUser.uid : null;

      if (usuario) {
         const doc = await db.collection("usuarios")
            .doc(usuario)
            .get();
         if (doc.exists) {
            doc.data().formulario !== undefined && doc.data().formulario !== null && doc.data().autorizado === true ?
               dispatch({
                  type: AUTH_CHECKED,
                  payload: {
                     autorizado: true,
                     loading: false
                  },
               })
               :
               doc.data().formulario !== undefined && doc.data().formulario !== null && doc.data().autorizado !== true ?
                  dispatch({
                     type: AUTH_AWAITING_APPROVAL,
                     payload: {
                        autorizado: false,
                        esperando_aprobacion: true,
                        loading: false
                     },
                  })
                  :
                  dispatch({
                     type: AUTH_DENIED,
                     payload: {
                        autorizado: false,
                        loading: false
                     },
                  })

         }
         else {
            dispatch({
               type: AUTH_DENIED,
               payload: {
                  autorizado: false,
                  loading: false
               },
            })
         }
      }
      else {
         log_out()
      }
   } catch (error) {
      console.log(error)
      dispatch({
         type: AUTH_FAILED,
         loading: false,
         payload: error,
      })
   }
}

export const sendForm = (form) => async dispatch => {
   try {
      dispatch({
         type: AUTH_SENDING_FORM,
         payload: {
            loading: true
         }
      })

      const usuario = auth.currentUser.uid;

      if (form) {
         const { nombre, nacimiento, nacionalidad, documento, whatsapp, nombrecanal, tipocontenido, descripcion, logo } = form;
         const ref = storage.ref(`/img_formularios/${usuario}`);
         const uploadTask = ref.put(logo.file);
         uploadTask.on("state_changed", console.log, console.error, () => {
            ref
               .getDownloadURL()
               .then((url) => {
                  db.collection("usuarios").doc(usuario).update({
                     formulario: {
                        nombre: nombre.toUpperCase(),
                        fecha_nacimiento: nacimiento,
                        nacionalidad: nacionalidad.toUpperCase(),
                        documento: documento,
                        whatsapp: whatsapp,
                        canal_nombre: nombrecanal.toUpperCase(),
                        canal_contenido: tipocontenido.toUpperCase(),
                        canal_descripcion: descripcion.toUpperCase(),
                        canal_imagen: url
                     }
                  }).then(()=>{
                     dispatch({
                        type: AUTH_AWAITING_APPROVAL,
                        payload: {
                           autorizado: false,
                           esperando_aprobacion: true,
                           loading: false
                        },
                     })
                  }).catch((error)=>{
                     console.log(error)               
                     dispatch({
                        type: AUTH_DENIED,
                        payload: {
                           autorizado: false,
                           loading: false
                        },
                     })
                  })
               });
         });
      }
   } catch (error) {
      dispatch({
         type: AUTH_DENIED,
         payload: {
            autorizado: false,
            loading: false
         },
      })
   }
}

