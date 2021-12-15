import {
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
} from "firebase/storage";

import {
  firebaseStorageRef
} from '../../plugins/firebase.js';


export const state = () => ({
  boardImgs: null,
});

export const mutations = {
  setBoardImgs(state, val) {
    state.boardImgs = val;
  }
};

export const actions = {
  getBoardImgs({ commit }) {
    /*
      params:
      collection storage: boardImages
      boardID: ''
    */
    const listRef = ref(firebaseStorageRef, 'boardImages');

    return new Promise((resolve, reject) => {
      let boardImgs = {};

      listAll(listRef).then((res) => {
        res.prefixes.forEach((folderRef) => {
          // get all boardID names
          listAll(ref(firebaseStorageRef, folderRef.fullPath)).then((imgsRes) => {
            imgsRes.items.forEach((itemRef) => {
              boardImgs[itemRef.parent.name] = [];
              getDownloadURL(ref(firebaseStorageRef, itemRef.fullPath)).then(urlRes => {
                boardImgs[itemRef.parent.name].push(urlRes);
              })
              .catch(err => {
                console.log(err)
              })
            });    
          });
        });

        commit('setBoardImgs', boardImgs);
        resolve(boardImgs);

      }).catch((error) => {
        // Uh-oh, an error occurred!
        reject(error)
      });
    });
  },

  uploadBoardImg({ commit, dispatch }, { boardID, file }) {
    const boardImgsRef = ref(firebaseStorageRef, `boardImages/${boardID}/${file.name}`);
    // append boardID to filename. ex, boardID-filename.jpg

    return uploadBytes(boardImgsRef, file);
  },

  updateImg({ commit }, { key, value }) {
    //
  },

  deleteImg(imgID) {
    //
  },
}
