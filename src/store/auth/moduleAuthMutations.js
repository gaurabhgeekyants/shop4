/*=========================================================================================
  File Name: moduleAuthMutations.js
  Description: Auth Module Mutations
  ----------------------------------------------------------------------------------------
  Item Name: Vuesax Admin - VueJS Dashboard Admin Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


// import firebase from "firebase";
// import firebase from 'firebase/app'
// require('firebase/firestore')
import 'firebase/auth'
export default {
	UPDATE_AUTHENTICATED_USER(state, user) {
        localStorage.setItem('firstTimeEnter', 1);
        localStorage.setItem('userRole', user.role);
        localStorage.setItem('userInfo', JSON.stringify(user));
  },
}
