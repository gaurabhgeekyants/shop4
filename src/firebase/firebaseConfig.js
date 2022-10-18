import firebase from 'firebase/app'

// ******* Initialize Firebase *******

var config = {
  apiKey: "AIzaSyBL34by8XxBIUx3KbQtZBPHASmQAx4rBLU",
  authDomain: "xtremeperformance-e8929.firebaseapp.com",
  databaseURL: "https://xtremeperformance-e8929.firebaseio.com",
  projectId: "xtremeperformance-e8929",
  storageBucket: "xtremeperformance-e8929.appspot.com",
  messagingSenderId: "1076502590850",
  appId: "1:1076502590850:web:063a631630ca0ea4",
};
/*var config = {
  apiKey: "AIzaSyBscBtV9urdFtZG5OSkUD7gb2fy66zdOmw",
  authDomain: "vue-test-e4fbd.firebaseapp.com",
  databaseURL: "https://vue-test-e4fbd.firebaseio.com",
  projectId: "vue-test-e4fbd",
  storageBucket: "vue-test-e4fbd.appspot.com",
  messagingSenderId: "693427900565",
  appId: "1:693427900565:web:5dc60bf30779f3bca44b9c"
};*/
firebase.initializeApp(config);
