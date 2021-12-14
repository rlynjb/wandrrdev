import {
  ref,
  uploadBytes,
  listAll,
} from "firebase/storage";

import {
  firebaseStorageRef
} from '../../plugins/firebase.js';


export const state = () => ({
  boardImgSchema: {
    boardID: "",
    file: null,
  },
  boardImgs: null,
});

export const mutations = {
  setBoardImgs(state, val) {
    state.boardImgs = val;
  }
};

export const actions = {
  getBoardImgs({ commit }) {
    const listRef = ref(firebaseStorageRef, 'boardImages');
    // Create a reference from a Google Cloud Storage URI
    //const gsReference = ref(firebaseStorageRef, 'gs://bucket/images/stars.jpg');

    /*
      NOTE:
      ideas is to create a list containing all images
      {
        boardID: https://firebasestorage.googleapis.com/v0/b/thewandrr-bb83c.appspot.com/o/boardImages%2F{ boardID }%2F{ filename w extension }?alt=media&token={ access token }
      }
      so we can just access the image by passing in boardID
    */

    listAll(listRef)
      .then((res) => {
        console.log(res.prefixes)
        /*
        res.prefixes.forEach((folderRef) => {
          // All the prefixes under listRef.
          // You may call listAll() recursively on them.
        });
        res.items.forEach((itemRef) => {
          // All the items under listRef.
        });
        */
      }).catch((error) => {
        // Uh-oh, an error occurred!
      });
  },

  uploadBoardImg({ commit }, { boardID, file }) {
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
