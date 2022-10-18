/*=========================================================================================
File Name: moduleAuthActions.js
Description: Auth Module Actions
----------------------------------------------------------------------------------------
Item Name: Vuesax Admin - VueJS Dashboard Admin Template
Author: Pixinvent
Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


import firebase from 'firebase/app'
require('firebase/firestore')
import 'firebase/auth'
import router from '@/router'
import axios from 'axios';
import moment from 'moment'

export default {

  loginAttempt({ dispatch }, payload) {

// New payload for login action
    const newPayload = {
      userDetails: payload.userDetails,
      notify: payload.notify,
      closeAnimation: payload.closeAnimation,
      acl: payload.acl
    }

// If remember_me is enabled change firebase Persistence
    if (!payload.checkbox_remember_me) {

// Change firebase Persistence
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)

      // If success try to login
        .then(function() {
          dispatch('login', newPayload)
        })

        // If error notify
        .catch(function(err) {

// Close animation if passed as payload
          if(payload.closeAnimation) payload.closeAnimation()

          payload.notify({
            time: 2500,
            title: 'Error',
            text: err.message,
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'danger'
          });
        });
    } else {
// Try to login
      dispatch('login', newPayload)
    }
  },
  login({ commit, state, dispatch }, payload) {
    if(localStorage.getItem('userRole')!=null && localStorage.getItem('uid')==null){
      // initialRole = localStorage.getItem('userRole')
      console.log('Role changed tottttttttttttttttt')
    }
// If user is already logged in notify and exit
    if (state.isUserLoggedIn()) {
// Close animation if passed as payload
      if(payload.closeAnimation) payload.closeAnimation()

      payload.notify({
        title: 'Login Attempt',
        text: 'You are already logged in!',
        iconPack: 'feather',
        icon: 'icon-alert-circle',
        color: 'warning'
      });

      return false
    }

// Try to sigin
    firebase.auth().signInWithEmailAndPassword(payload.userDetails.email, payload.userDetails.password)



      .then((result) => {
// Set FLAG username update required for updating username
        let isUsernameUpdateRequired = false;
// if username is provided and updateUsername FLAG is true
// set local username update FLAG to true
// try to update username
        if(payload.updateUsername && payload.userDetails.username) {

          isUsernameUpdateRequired = true;

              dispatch('updateUsername', {
            user: result.user,
            username: payload.userDetails.username,
            notify: payload.notify,
            isReloadRequired: true
          })
        }

// Close animation if passed as payload
        if(payload.closeAnimation) payload.closeAnimation()
// if username update is not required
// just reload the page to get fresh data
firebase.firestore().collection('users').doc(result.user.uid).update({'activeUser':true})
        if (!isUsernameUpdateRequired) {
          firebase.firestore().collection('users').doc(result.user.uid).get()
            .then(doc => {
              localStorage.setItem('firstTimeOpen', 1)
              if (doc.data()) {
                let data = doc.data()
                if (data.status) {
                  if (data.role == 'member' && data.program_type_start && data.program_type_start) {
                    if (data.program_type_start && data.program_type_start) {
                      var paused_days = data.days_paused ? data.days_paused : 0
                      var programTypeStart = moment(data.program_type_start).format('YYYY-MM-DD')
                        if(data['memberDetail']['program_type']){
                                firebase.firestore().collection('package').doc(data['memberDetail']['program_type']).get()
                                    .then(doc => {
                                    var packageDuration = parseInt(doc.data().tenure) + parseInt(paused_days)
                                    var endDate = moment(programTypeStart).add(packageDuration, 'days')
                                    endDate = moment(endDate).format('YYYY-MM-DD')
                                    var now = moment().format('YYYY-MM-DD')
                                    if (now < endDate) {
                                    var userDetail = {
                                        displayName:  (data.role == 'sale' || data.role == 'trainer' ||data.role == 'admin')? data.name:data.first_name ? data.first_name+' '+data.last_name : '',
                                        // displayName: data.first_name ? data.first_name+''+data.last_name : '',
                                        email: data.email ? data.email : '',
                                        phoneNumber: data.phone ? data.phone : '',
                                        photoURL: data.profileUrl ? data.profileUrl : null,
                                        providerId: "password",
                                        uid: data.email,
                                        role: data.role
                                    }
                                    payload.acl.change(data.role)
                                    localStorage.setItem('uid', firebase.auth().currentUser.uid);
                                    commit('UPDATE_AUTHENTICATED_USER', userDetail)

                                    router.push(router.currentRoute.query.to || '/');
                                    firebase.auth().signOut()
                                } else {
                                    payload.notify({
                                        time: 2500,
                                        title: 'Failed',
                                        text: 'You package is expired!',
                                        iconPack: 'feather',
                                        icon: 'icon-alert-circle',
                                        color: 'danger'
                                    });
                                }
                            })
                        }else{
                            payload.notify({
                                time: 2500,
                                title: 'Failed',
                                text: 'You have no package!',
                                iconPack: 'feather',
                                icon: 'icon-alert-circle',
                                color: 'danger'
                            });
                        }

                    }
                    else if(data.firstTimeLogin == true){
                      let userDetail = {
                        displayName:  (data.role == 'sale' || data.role == 'trainer' ||data.role == 'admin')? data.name:data.first_name ? data.first_name+' '+data.last_name : '',
                        email: data.email ? data.email : '',
                        phoneNumber: data.phone ? data.phone : '',
                        photoURL: data.profileUrl ? data.profileUrl : null,
                        providerId: "password",
                        uid: data.email,
                        role: data.role
                      }
                      payload.acl.change(data.role)
                      commit('UPDATE_AUTHENTICATED_USER', userDetail)
                      // router.push(router.currentRoute.query.to || {name: 'profile-complete',params:{uid:result.user.uid }});
                      // router.push({name: 'profile-complete',params:{uid:result.user.uid }})
                      // router.push(router.currentRoute.query.to || '/profile-complete/'+result.user.uid)
                      router.push(router.currentRoute.query.to || '/complete-profile/'+result.user.uid)
                      firebase.auth().signOut()
                    }
                    else{


                      let userDetail = {
                       displayName:  (data.role == 'sale' || data.role == 'trainer' ||data.role == 'admin')? data.name:data.first_name ? data.first_name+' '+data.last_name : '',
                        email: data.email ? data.email : '',
                        phoneNumber: data.phone ? data.phone : '',
                        photoURL: data.profileUrl ? data.profileUrl : null,
                        providerId: "password",
                        uid: data.email,
                        role: data.role
                      }
                      payload.acl.change(data.role)
                      commit('UPDATE_AUTHENTICATED_USER', userDetail)
                      router.push(router.currentRoute.query.to || '/');
                      firebase.auth().signOut()

                    }

                  } else {
                    let userDetail = {
                      displayName:  (data.role == 'sale' || data.role == 'trainer' ||data.role == 'admin')? data.name:data.first_name ? data.first_name+' '+data.last_name : '',
                      email: data.email ? data.email : '',
                      phoneNumber: data.phone ? data.phone : '',
                      photoURL: data.profileUrl ? data.profileUrl : null,
                      providerId: "password",
                      uid: data.email,
                      role: data.role
                    }
                    payload.acl.change(data.role)
                    localStorage.setItem('uid', firebase.auth().currentUser.uid);
                    commit('UPDATE_AUTHENTICATED_USER', userDetail)
                    firebase.auth().signOut()
                    router.push(router.currentRoute.query.to || '/');

                  }
                } else {
                  firebase.auth().signOut()
                  payload.notify({
                    time: 2500,
                    title: 'Inactive',
                    text: 'You are not active right now! Please contact to support!',
                    iconPack: 'feather',
                    icon: 'icon-alert-circle',
                    color: 'danger'
                  });
                }

              }
              else {
                firebase.auth().signOut()
                if (payload.closeAnimation) payload.closeAnimation()

                payload.notify({
                  time: 2500,
                  title: 'Error',
                  text: 'User Does Not Exist!',
                  iconPack: 'feather',
                  icon: 'icon-alert-circle',
                  color: 'danger'
                });
              }


            })
        }
      }, (err) => {

// Close animation if passed as payload
        if(payload.closeAnimation) payload.closeAnimation()

        payload.notify({
          time: 2500,
          title: 'Error',
          text: err.message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'danger'
        });
      })
  },

// Google Login
/*
  loginWithGoogle({commit, state}, payload) {
    if (state.isUserLoggedIn()) {
      payload.notify({
        title: 'Login Attempt',
        text: 'You are already logged in!',
        iconPack: 'feather',
        icon: 'icon-alert-circle',
        color: 'warning'
      });
      return false
    }
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
      .then((result) => {
        router.push(router.currentRoute.query.to || '/');
        commit('UPDATE_AUTHENTICATED_USER', result.user.providerData[0])
      }).catch((err) => {
      payload.notify({
        time: 2500,
        title: 'Error',
        text: err.message,
        iconPack: 'feather',
        icon: 'icon-alert-circle',
        color: 'danger'
      });
    })
// firebase.auth().onAuthStateChanged(function(user) {
// if (user) {
// user.updateProfile({
// roles: ['admin'],
// }).then(function() {
// this.$vs.notify({
// title: 'Success',
// text: "done",
// iconPack: 'feather',
// icon: 'icon-check',
// color: 'success'
// });
// }, function(error) {
// this.$vs.notify({
// title: 'Error',
// text: error.message,
// iconPack: 'feather',
// icon: 'icon-alert-circle',
// color: 'danger'
// });
// });

// }
// });
  },
*/

// Facebook Login
/*
  loginWithFacebook({commit, state}, payload) {
    if (state.isUserLoggedIn()) {
      payload.notify({
        title: 'Login Attempt',
        text: 'You are already logged in!',
        iconPack: 'feather',
        icon: 'icon-alert-circle',
        color: 'warning'
      });
      return false
    }
    const provider = new firebase.auth.FacebookAuthProvider();

    firebase.auth().signInWithPopup(provider)
      .then((result) => {
        router.push(router.currentRoute.query.to || '/');
        commit('UPDATE_AUTHENTICATED_USER', result.user.providerData[0])
      }).catch((err) => {
      payload.notify({
        time: 2500,
        title: 'Error',
        text: err.message,
        iconPack: 'feather',
        icon: 'icon-alert-circle',
        color: 'danger'
      });
    })
  },
*/

// Twitter Login
/*
  loginWithTwitter({commit, state}, payload) {
    if (state.isUserLoggedIn()) {
      payload.notify({
        title: 'Login Attempt',
        text: 'You are already logged in!',
        iconPack: 'feather',
        icon: 'icon-alert-circle',
        color: 'warning'
      });
      return false
    }
    const provider = new firebase.auth.TwitterAuthProvider();

    firebase.auth().signInWithPopup(provider)
      .then((result) => {
        router.push(router.currentRoute.query.to || '/');
        commit('UPDATE_AUTHENTICATED_USER', result.user.providerData[0])
      }).catch((err) => {
      payload.notify({
        time: 2500,
        title: 'Error',
        text: err.message,
        iconPack: 'feather',
        icon: 'icon-alert-circle',
        color: 'danger'
      });
    })
  },
*/

// Github Login
/*
  loginWithGithub({commit, state}, payload) {
    if (state.isUserLoggedIn()) {
      payload.notify({
        title: 'Login Attempt',
        text: 'You are already logged in!',
        iconPack: 'feather',
        icon: 'icon-alert-circle',
        color: 'warning'
      });
      return false
    }
    const provider = new firebase.auth.GithubAuthProvider();

    firebase.auth().signInWithPopup(provider)
      .then((result) => {
        router.push(router.currentRoute.query.to || '/');
        commit('UPDATE_AUTHENTICATED_USER', result.user.providerData[0])
      }).catch((err) => {
      payload.notify({
        time: 2500,
        title: 'Error',
        text: err.message,
        iconPack: 'feather',
        icon: 'icon-alert-circle',
        color: 'danger'
      });
    })
  },
*/
  registerUser({dispatch}, payload) {
    firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then((user) => {
        firebase.firestore().collection("users").doc(user.user.uid).set(payload.data, {merge: true})
      }).then(() => {
          var user = firebase.auth().currentUser;
        // firebase.firestore().collection('users').where('role','==','admin').get().then((snap) => {
            const notification={
              description: 'Account Created Successfully',
              isSeen:false,
              isAdminSeen:false,
              receiver_id:'',
              receiver_name:'',
              sender_id:user.uid,
                url:'/members/edit/' +user.uid,
              sender_name:payload.data.first_name+' '+payload.data.last_name,
              created_at:firebase.firestore.FieldValue.serverTimestamp(),//String(new Date()),//firebase.firestore.FieldValue.serverTimestamp(),
              type:'client_registeration'
            };
            firebase.firestore().collection("notification").add(notification).then((snap) => {
              console.log('notify done')
              console.log(snap)
            })




          var actionCodeSettings = {
              url: 'https://backend.xtremeperformance.co.in/verify-email/'+user.uid,
              handleCodeInApp: true,
          };


          if(payload.frontImage){
              var storageRef = firebase.storage().ref(user.uid+'/member_three_pics/front/'+payload.frontImage.name);
              storageRef.put(payload.frontImage);
          }

          if(payload.sideImage){
              var storageRef1 = firebase.storage().ref(user.uid+'/member_three_pics/side/'+payload.sideImage.name);
              storageRef1.put(payload.sideImage);
          }

          if(payload.backImage){
              var storageRef2 = firebase.storage().ref(user.uid+'/member_three_pics/back/'+payload.backImage.name);
              storageRef2.put(payload.backImage);
          }

          firebase.firestore().collection("users").doc(user.uid).set(payload.data).then(() => {
            user.sendEmailVerification(actionCodeSettings).then(function() {
                firebase.auth().signOut()
                  const formData = new FormData();
                  formData.append('name', payload.data.first_name ? payload.data.first_name+' '+payload.data.last_name : '');
                  formData.append('email', payload.data.email);
                  formData.append('subject', 'Welcome to Xtreme Performance');
                  formData.append('type', 'welcome');
                  axios.post('https://backend.xtremeperformance.co.in/mailer/email.php', formData , {'Access-Control-Allow-Origin': '*'})
                          .then(response => {
                          console.log(response)
                  }).catch(e => {
                          console.log(e)
                  })
                payload.notify({
                    title: 'Thanks for sending your details',
                    text: '. You will receive email confirmation once your account is activated.',
                    iconPack: 'feather',
                    icon: 'icon-check',
                    color: 'success'
                });
              router.push(router.currentRoute.query.to || '/');
              }).catch(function(error) {
                  console.log(error)
                firebase.auth().signOut()
                payload.notify({
                    title: 'Thanks for sending your details',
                    text: 'But Email could not send. So, contact to admin.',
                    iconPack: 'feather',
                    icon: 'icon-check',
                    color: 'success'
                });
              router.push(router.currentRoute.query.to || '/');
              });
            })
            .catch(() => {
              console.log('eror')
            })
        },
        (error) => {
          payload.notify({
            title: 'Error',
            text: error.message,
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'danger'
          });
        })
  },
  updateUsername({ commit }, payload) {
    payload.user.updateProfile({
      displayName:  (payload.role == 'sale' || payload.role == 'trainer' ||payload.role == 'admin')? payload.name:payload.first_name ? payload.first_name+' '+payload.last_name : '',

      // displayName: payload.first_name+' '+ payload.last_name
    }).then(() => {

// If username update is success
// update in localstorage
      let newUserData = Object.assign({}, payload.user.providerData[0])
      newUserData.displayName =(payload.role == 'sale' || payload.role == 'trainer' ||payload.role == 'admin')? payload.name:payload.first_name ? payload.first_name+' '+payload.last_name : '',
        commit('UPDATE_AUTHENTICATED_USER', newUserData)
      firebase.auth().signOut()

// If reload is required to get fresh data after update
// Reload current page
      if(payload.isReloadRequired) {
        router.push(router.currentRoute.query.to || '/')
      }
    }).catch((err) => {
      payload.notify({
        time: 8800,
        title: 'Error',
        text: err.message,
        iconPack: 'feather',
        icon: 'icon-alert-circle',
        color: 'danger'
      });
    })
  },
  updateAuthenticatedUser({ commit }, payload) {
    console.log('dom');
    commit('UPDATE_AUTHENTICATED_USER', payload)
  }
}
