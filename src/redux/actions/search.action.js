import {
    SEARCH_REQUEST,
    SEARCH_FAIL,
    SEARCH_SUCCESS,
    SEARCH_EMPTY
} from '../actionType'

import firebase from 'firebase/app'
require('firebase/firestore');
const db = firebase.firestore();

export const searchVideos = (id) => async dispatch => {
    try {
        dispatch({
            type: SEARCH_REQUEST,
            payload: null
        })
        console.log("CARGANDO RESULTADOS")
        let videos = [];
        const searchQuery = id;
        if (searchQuery) {
            const snapshotCanales = await db.collection("canales").where("activo", "==", true).orderBy("orden", "asc")
                .get();
            if (snapshotCanales.docs && snapshotCanales.docs.length) {
                snapshotCanales.docs.forEach((doc) => {
                    if (doc.data().nombre.toString().toLowerCase().includes(searchQuery.toLowerCase())) {
                        videos.push({
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
                    if (doc.data().nombre.toString().toLowerCase().includes(searchQuery.toLowerCase())) {
                        videos.push({
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
        if (videos.length > 0) {
            dispatch({
                type: SEARCH_SUCCESS,
                payload: videos,
            })
        }
        else {
            dispatch({
                type: SEARCH_EMPTY,
                payload: videos,
            })
        }

    }
    catch (error) {
        console.log(error)
        dispatch({
            type: SEARCH_FAIL,
            payload: error,
        })
    }
}

function parseQuery(str) {
    if (typeof str !== "string" || str.length === 0) return {};
    if (str[0] === "?") str = str.substring(1);
    var s = str.split("&");
    var s_length = s.length;
    var bit, query = {}, first, second;
    for (var i = 0; i < s_length; i++) {
        bit = s[i].split("=");
        first = decodeURIComponent(bit[0]);
        if (first.length === 0) continue;
        second = decodeURIComponent(bit[1]);
        if (typeof query[first] === "undefined") query[first] = second;
        else if (query[first] instanceof Array) query[first].push(second);
        else query[first] = [query[first], second];
    }
    return query;
}