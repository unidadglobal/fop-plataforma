import {
   RELATED_VIDEO_FAIL,
   RELATED_VIDEO_REQUEST,
   RELATED_VIDEO_SUCCESS,
   SELECTED_VIDEO_FAIL,
   SELECTED_VIDEO_REQUEST,
   SELECTED_VIDEO_SUCCESS,
} from '../actionType'

import firebase from 'firebase/app'
require('firebase/firestore');
const db = firebase.firestore();

export const getRelatedVideos = id => async dispatch => {
   try {
      dispatch({
         type: RELATED_VIDEO_REQUEST,
      })
      let canales = [];

      if (!id || (id && !id.includes("cat-"))) {
         const snapshotCanales = await db.collection("canales")
            .where("activo", "==", true)
            .orderBy("orden", "asc")
            .get();

         if (snapshotCanales.docs && snapshotCanales.docs.length) {
            snapshotCanales.docs.forEach((doc) => {
               if ((id && id !== doc.id) || !id) {
                  canales.push({
                     id: doc.id,
                     nombre: doc.data().nombre,
                     thumbnail: doc.data().thumbnail,
                     video: doc.data().stream,
                     tipo: "canal"
                  })
               }
            });
         }

         const snapshotVideos = await db.collection("videos").orderBy("fecha", "desc").limit(10)
            .get();
         if (snapshotVideos.docs && snapshotVideos.docs.length) {
            snapshotVideos.docs.forEach((doc) => {
               if ((id && id !== doc.id) || !id) {
                  canales.push({
                     id: doc.id,
                     nombre: doc.data().nombre,
                     thumbnail: doc.data().thumbnail,
                     video: doc.data().video,
                     duration: doc.data().duration,
                     vistas: doc.data().vistas,
                     tipo: "video"
                  })
               }
            });
         }
      }
      else { // ES UNA CATEGORIA
         const snapshotCanales = await db.collection("canales")
            .where("categoria", "==", id.replace("cat-", ""))
            .where("activo", "==", true)
            .orderBy("orden", "asc")
            .get();

         if (snapshotCanales.docs && snapshotCanales.docs.length) {
            snapshotCanales.docs.forEach((doc) => {
               canales.push({
                  id: doc.id,
                  nombre: doc.data().nombre,
                  thumbnail: doc.data().thumbnail,
                  video: doc.data().stream,
                  tipo: "canal"
               })
            });
         }

         const snapshotVideos = await db.collection("videos")
            .where("categoria", "==", id.replace("cat-", ""))
            .orderBy("fecha", "desc")
            .limit(10)
            .get();
         if (snapshotVideos.docs && snapshotVideos.docs.length) {
            snapshotVideos.docs.forEach((doc) => {
               canales.push({
                  id: doc.id,
                  nombre: doc.data().nombre,
                  thumbnail: doc.data().thumbnail,
                  video: doc.data().video,
                  duration: doc.data().duration,
                  vistas: doc.data().vistas,
                  tipo: "video"
               })
            });
         }
      }

      dispatch({
         type: RELATED_VIDEO_SUCCESS,
         payload: canales,
      })
   } catch (error) {
      console.log(error)
      dispatch({
         type: RELATED_VIDEO_FAIL,
         payload: error,
      })
   }
}

export const getVideoById = id => async dispatch => {
   try {
      dispatch({
         type: SELECTED_VIDEO_REQUEST,
      })
      let data;
      let query;

      if (id) {
         if (!id.includes("cat-")) {
            query = await
               db.collection("videos")
                  .doc(id)
                  .get();
            if (query && query.id && query.data()) {
               const doc = query.data();
               data = {
                  id: query.id,
                  nombre: doc.nombre,
                  stream: doc.video ? doc.video : null,
               }
               let sfDocRef = db.collection("videos").doc(id);

               db.runTransaction((transaction) => {
                  return transaction.get(sfDocRef).then((sfDoc) => {
                     if (sfDoc.exists) {
                        let newVistas = sfDoc.data().vistas ? sfDoc.data().vistas + 1 : 1;
                        transaction.update(sfDocRef, { vistas: newVistas });
                     }
                  });
               });
            }
            else {
               const canalRef = db.collection("canales").doc(id);
               query = await
                  canalRef
                     .get();
               if (query && query.id && query.data() && query.data().activo) {
                  const doc = query.data();
                  data = {
                     id: query.id,
                     nombre: doc.nombre,
                     stream: doc.stream ? doc.stream : null,
                     cameraStream: doc.cameraStream ? doc.cameraStream : null
                  }
                  listenForChanges(canalRef, doc.cameraStream)
               }
            }
         }
         else {
            const snap = await
               db.collection("canales")
                  .where("categoria", "==", id.replace("cat-", ""))
                  .where("activo", "==", true)
                  .limit(1)
                  .get();

            if (snap.docs && snap.docs.length) {
               const doc = snap.docs[0].data();
               data = {
                  id: snap.docs[0].id,
                  nombre: doc.nombre,
                  stream: doc.stream ? doc.stream : null,
                  cameraStream: doc.cameraStream ? doc.cameraStream : null
               }
               listenForChanges(snap.docs[0].ref, doc.cameraStream)
            }
            else {
               query = await
                  db.collection("videos")
                     .where("categoria", "==", id.replace("cat-", ""))
                     .orderBy("fecha", "desc")
                     .limit(1)
                     .get();
               if (query.docs && query.docs.length) {
                  const doc = query.docs[0].data();
                  data = {
                     id: query.docs[0].id,
                     nombre: doc.nombre,
                     stream: doc.video ? doc.video : null
                  }
                  let sfDocRef = db.collection("videos").doc(query.docs[0].id);
                  db.runTransaction((transaction) => {
                     return transaction.get(sfDocRef).then((sfDoc) => {
                        if (sfDoc.exists) {
                           let newVistas = sfDoc.data().vistas ? sfDoc.data().vistas + 1 : 1;
                           transaction.update(sfDocRef, { vistas: newVistas });
                        }
                     });
                  });
               }
            }
         }
      }
      else {
         query = await
            db.collection("canales")
               .orderBy("orden", "asc")
               .limit(1)
               .get();
         if (query && query.docs && query.docs.length && query.docs[0].data()) {
            const doc = query.docs[0].data();
            data = {
               id: query.id,
               nombre: doc.nombre,
               stream: doc.stream ? doc.stream : null,
               cameraStream: doc.cameraStream ? doc.cameraStream : null
            }
            listenForChanges(query.docs[0].ref, doc.cameraStream)
         }
         else {
            query = await
               db.collection("videos")
                  .limit(1)
                  .get();
            if (query && query.docs && query.docs.length) {
               const doc = query.docs[0].data();
               data = {
                  id: query.id,
                  nombre: doc.nombre,
                  stream: doc.video ? doc.video : null
               }
            }
         }
      }
      dispatch({
         type: SELECTED_VIDEO_SUCCESS,
         payload: data,
      })
   } catch (error) {
      console.log(error.message)
      dispatch({
         type: SELECTED_VIDEO_FAIL,
         payload: error.message,
      })
   }
}

function listenForChanges(ref, cameraStream) {
   let initState = true;
   let observer = ref.onSnapshot((docSnapshot) => {
      if (initState) {
         initState = false;
      } else {
         const newCameraStream = docSnapshot.data().cameraStream;
         if (newCameraStream !== cameraStream) {
            window.location.reload();
         }
      }
   });

}