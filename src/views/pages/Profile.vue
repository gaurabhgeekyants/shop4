<template>
  <div id="form2">
    <vx-card title="">
      <form>
    <div class="vx-row">

      <div class="vx-col md:w-1/4 w-full mb-base">

        <div class="w-full">
            <div class="img-holder p-image">
              <img v-show="profileUrl!=''" :src="profileUrl" />
              <!--<img v-show="profileUrl==''" src="../../assets/images/portrait/small/default-profile.png" />-->
              <img v-if="gender=='male'" v-show="profileUrl==''" src="../../assets/images/portrait/small/default-profile.png" />
              <img v-if="gender=='other'" v-show="profileUrl==''" src="../../assets/images/portrait/small/default-profile.png" />
              <img v-if="gender=='female'" v-show="profileUrl==''" src="../../assets/images/portrait/small/female_avatar_vector.png" />

            </div>
          <div class="vx-row">
            <div class="fieldset w-full mb-6">
              <label class="legend">Change profile picture</label>
              <div class="vx-col mb-2">
                <input type="file" class="w-full" @change="detectFiles($event.target.files)" accept="image/jpeg">
                <!--<img @click="deleteImage($event.target.src)" :src="profileUrl" alt="picture" width="50px" height="50px">-->
              </div>
            </div>
          </div>
          </div>
        </div>

      <div class="vx-col md:w-3/5 w-full mb-base" style="margin: 0 auto;">

            <div class="vx-row">
              <div class="vx-col lg:w-1/1 sm:w-full mb-6 left-pull">
                <div class="vx-row  fieldset">
                  <div class="vx-col lg:w-1/4 sm:w-full mb-6">
                    <label class="legend">Full Name</label>
                  </div>
                  <div class="vx-col lg:w-3/4 sm:w-full mb-6">
                    <div class=" w-full">
                      <!--                <vs-input class="w-full" v-model="name" />-->
                      <vs-input class="w-full" v-validate="'required'" placeholder="name" name="name" v-model="name" />
                      <span class="text-danger text-sm" v-show="errors.has('name')">{{ errors.first('name') }}</span>
                    </div>
                  </div>
                </div>

                <div class="vx-row  fieldset">
                  <div class="vx-col lg:w-1/4 sm:w-full mb-6">
                    <label class="legend">Email</label>
                  </div>
                  <div class="vx-col lg:w-3/4 sm:w-full mb-6">
                    <div class="w-full">
                      <!--                <vs-input class="w-full" type="email" v-model="email" />-->
                      <vs-input class="w-full" type="email" v-validate="'required'" placeholder="email" name="email" v-model="email" :disabled="true" />
                      <span class="text-danger text-sm" v-show="errors.has('email')">{{ errors.first('email') }}</span>
                    </div>
                  </div>
                </div>

                <div class="vx-row  fieldset">
                  <div class="vx-col lg:w-1/4 sm:w-full mb-6">
                    <label class="legend">Mobile</label>
                  </div>
                  <div class="vx-col lg:w-3/4 sm:w-full mb-6">
                    <div class="w-full">
                      <VuePhoneNumberInput v-model="mobile" @update="onUpdate" :default-country-code="countryCode" class="w-full" name="mobile" placeholder="Mobile"/>

                      <!--                <vs-input class="w-full" v-model="mobile" />-->
                      <!--<vs-input class="w-full" v-validate="'required'" placeholder="mobile" name="mobile" v-model="mobile" />-->
                      <span class="text-danger text-sm" v-if="phoneValid===false">Please enter Your Valid Mobile Number</span>
                    </div>
                  </div>
                </div>
                <div class="vx-row  fieldset">
                  <div class="vx-col lg:w-1/4 sm:w-full mb-6">
                    <label class="legend">Gender</label>
                  </div>
                  <div class="vx-col lg:w-3/4 sm:w-full mb-6">
                    <div class="w-full">
                      <ul class="demo-alignment">
                        <li>
                          <vs-radio v-model="gender" name="gender" vs-value="male">Male</vs-radio>
                        </li>
                        <li>
                          <vs-radio v-model="gender" name="gender" vs-value="female">Female</vs-radio>
                        </li>
                        <li>
                          <vs-radio v-model="gender" name="gender" vs-value="other">Other</vs-radio>
                        </li>
                        <!--  <li>
                            <label class="vs-component con-vs-radio vs-radio-primary">
                              <input v-model="gender" name="gender" type="radio" class="vs-radio&#45;&#45;input" value="male">
                              <span class="vs-radio">
                                                <span class="vs-radio&#45;&#45;borde" style="border: 2px solid rgb(200, 200, 200);">
                                                </span>
                                                <span class="vs-radio&#45;&#45;circle"></span>
                                            </span>
                              <span class="vs-radio&#45;&#45;label">Male
                                            </span>
                            </label>
                          </li>
                          <li>
                            <label class="vs-component con-vs-radio vs-radio-primary">
                              <input v-model="gender" name="gender" type="radio" class="vs-radio&#45;&#45;input" value="female">
                              <span class="vs-radio">
                                                <span class="vs-radio&#45;&#45;borde" style="border: 2px solid rgb(200, 200, 200);">
                                                </span>
                                                <span class="vs-radio&#45;&#45;circle">
                                                </span>
                                            </span>
                              <span class="vs-radio&#45;&#45;label">Female
                                            </span>
                            </label>
                          </li>-->
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            <div class="vx-row">
              <div class="vx-col sm:w-2/3 w-full ml-auto">
                <vs-button class="mr-3 mb-2" id="button-save" @click="profileSubmit">Submit</vs-button>
              </div>
            </div>


      </div>

    </div>
      </form>
    </vx-card>


    <!--<div class="vx-row">-->
      <!--<div class="vx-col md:w-1/1 w-full mb-base" style="margin: 0 auto;">-->
        <!--<vx-card title="">-->
          <!--<div class="w-full">-->
            <!--<div class="img-holder p-image">-->
              <!--<img :src="profileUrl" />-->
            <!--</div>-->
          <!--</div>-->
          <!--<form>-->
            <!--<fieldset class="w-full mb-6">-->

              <!--<legend>Full Name</legend>-->

              <!--<div class=" w-full">-->
                <!--&lt;!&ndash;                <vs-input class="w-full" v-model="name" />&ndash;&gt;-->
                <!--<vs-input class="w-full" v-validate="'required'" placeholder="name" name="name" v-model="name" />-->
                <!--<span class="text-danger text-sm" v-show="errors.has('name')">{{ errors.first('name') }}</span>-->
              <!--</div>-->
            <!--</fieldset>-->

            <!--<fieldset class="w-full mb-6">-->

              <!--<legend>Email</legend>-->

              <!--<div class="w-full">-->
                <!--&lt;!&ndash;                <vs-input class="w-full" type="email" v-model="email" />&ndash;&gt;-->
                <!--<vs-input class="w-full" type="email" v-validate="'required'" placeholder="email" name="email" v-model="email" />-->
                <!--<span class="text-danger text-sm" v-show="errors.has('email')">{{ errors.first('email') }}</span>-->
              <!--</div>-->
            <!--</fieldset>-->

            <!--<fieldset class="w-full mb-6">-->

              <!--<legend>Mobile</legend>-->

              <!--<div class="w-full">-->
                <!--&lt;!&ndash;                <vs-input class="w-full" v-model="mobile" />&ndash;&gt;-->
                <!--<vs-input class="w-full" v-validate="'required'" placeholder="mobile" name="mobile" v-model="mobile" />-->
                <!--<span class="text-danger text-sm" v-show="errors.has('mobile')">{{ errors.first('mobile') }}</span>-->
              <!--</div>-->
            <!--</fieldset>-->

            <!--<fieldset class="w-full mb-6">-->
              <!--<legend>Gender</legend>-->
              <!--<ul class="demo-alignment">-->
                <!--<li>-->
                  <!--<vs-radio v-model="gender" name="gender" vs-value="male">Male</vs-radio>-->
                <!--</li>-->
                <!--<li>-->
                  <!--<vs-radio v-model="gender" name="gender" vs-value="female">Female</vs-radio>-->
                <!--</li>-->
                <!--<li>-->
                  <!--<vs-radio v-model="gender" name="gender" vs-value="other">Other</vs-radio>-->
                <!--</li>-->
                <!--&lt;!&ndash;  <li>-->
                    <!--<label class="vs-component con-vs-radio vs-radio-primary">-->
                      <!--<input v-model="gender" name="gender" type="radio" class="vs-radio&#45;&#45;input" value="male">-->
                      <!--<span class="vs-radio">-->
                                        <!--<span class="vs-radio&#45;&#45;borde" style="border: 2px solid rgb(200, 200, 200);">-->
                                        <!--</span>-->
                                        <!--<span class="vs-radio&#45;&#45;circle"></span>-->
                                    <!--</span>-->
                      <!--<span class="vs-radio&#45;&#45;label">Male-->
                                    <!--</span>-->
                    <!--</label>-->
                  <!--</li>-->
                  <!--<li>-->
                    <!--<label class="vs-component con-vs-radio vs-radio-primary">-->
                      <!--<input v-model="gender" name="gender" type="radio" class="vs-radio&#45;&#45;input" value="female">-->
                      <!--<span class="vs-radio">-->
                                        <!--<span class="vs-radio&#45;&#45;borde" style="border: 2px solid rgb(200, 200, 200);">-->
                                        <!--</span>-->
                                        <!--<span class="vs-radio&#45;&#45;circle">-->
                                        <!--</span>-->
                                    <!--</span>-->
                      <!--<span class="vs-radio&#45;&#45;label">Female-->
                                    <!--</span>-->
                    <!--</label>-->
                  <!--</li>&ndash;&gt;-->
              <!--</ul>-->
            <!--</fieldset>-->
            <!--&lt;!&ndash; <fieldset class="w-full">-->
               <!--<legend>Select Activity Level</legend>-->
               <!--<div class="vx-col w-full">-->
                 <!--<ul class="demo-alignment gender">-->
                   <!--&lt;!&ndash;<li><vs-radio v-model="activity_level" vs-value="Sedentary">Sedentary</vs-radio> </li>-->
                   <!--<li><vs-radio v-model="activity_level" vs-value="Light Activity">Light Activity</vs-radio> </li>-->
                   <!--<li><vs-radio v-model="activity_level" vs-value="Moderately Active">Moderately Active</vs-radio> </li>-->
                   <!--<li><vs-radio v-model="activity_level" vs-value="Very Active">Very Active</vs-radio> </li>&ndash;&gt;-->
                   <!--<li><vs-radio v-model="activity_level" vs-value="1.2">Sedentary</vs-radio> </li>-->
                   <!--<li><vs-radio v-model="activity_level" vs-value="1.375">Light Activity</vs-radio> </li>-->
                   <!--<li><vs-radio v-model="activity_level" vs-value="1.55">Moderately Active</vs-radio> </li>-->
                   <!--<li><vs-radio v-model="activity_level" vs-value="1.725">Very Active</vs-radio> </li>-->
                 <!--</ul>-->
               <!--</div>-->
             <!--</fieldset>&ndash;&gt;-->

            <!--&lt;!&ndash; <fieldset class="w-full">-->
               <!--<legend>Adjust protein</legend>-->
               <!--<div class="vx-col w-full">-->
                 <!--<ul class="demo-alignment gender">-->
                   <!--<li><vs-radio v-model="bg_protein" vs-value="High">High</vs-radio> </li>-->
                   <!--<li><vs-radio v-model="bg_protein" vs-value="Normal">Normal</vs-radio> </li>-->
                   <!--<li><vs-radio v-model="bg_protein" vs-value="Low">Low</vs-radio> </li>-->
                 <!--</ul>-->
               <!--</div>-->
             <!--</fieldset>&ndash;&gt;-->
            <!--<fieldset class="w-full mb-6">-->
              <!--<legend>Change profile picture</legend>-->
              <!--<div class="vx-col mb-2">-->
                <!--<input type="file" class="w-full" @change="detectFiles($event.target.files)" accept="image/jpeg">-->
                <!--&lt;!&ndash;<img @click="deleteImage($event.target.src)" :src="profileUrl" alt="picture" width="50px" height="50px">&ndash;&gt;-->
              <!--</div>-->
            <!--</fieldset>-->

            <!--<div class="vx-row">-->
              <!--<div class="vx-col sm:w-2/3 w-full ml-auto">-->
                <!--<vs-button class="mr-3 mb-2" id="button-save" @click="profileSubmit">Submit</vs-button>-->
              <!--</div>-->
            <!--</div>-->
          <!--</form>-->
        <!--</vx-card>-->
      <!--</div>-->
    <!--</div>-->
  </div>


</template>

<script>
    require('firebase/firestore')
    import 'firebase/auth'
    import Datepicker from 'vuejs-datepicker';
    import moment from 'moment'
    import firebase from 'firebase'
    import storage from 'firebase/storage'
    import VuePhoneNumberInput from 'vue-phone-number-input';
    import 'vue-phone-number-input/dist/vue-phone-number-input.css';

    export default {

        data() {
            return {
                phoneValid:'',
                images: [],
                name: '',
                email: '',
                gender: '',
                mobile: '',
                profileUrl: '',
                progressUpload: 0,
                file: File,
                uploadTask: '',
                picturesTemp: {},
                downloadURL: '',
                uploadEnd : false,
                wasSidebarOpen: null,
                isNavOpen: false,
                mobileFormat:'',
                countryCode: 'IN',

            }
        },
        computed: {
        },
        created(){
            this.getUserDetail();
        },
        methods: {
            onUpdate (payload) {
                this.countryCode = payload.countryCode
                this.mobile = payload.phoneNumber
                this.mobileFormat= payload.formatInternational
                this.phoneValid=payload.isValid
            },
             profileSubmit() {
                 this.loadContent()
                if(this.picturesTemp.length > 0){
//                for (let i = 0; i < this.picturesTemp.length; i++){
                    let storageRef =  firebase.storage().ref(localStorage.getItem('uid')+'/'+this.picturesTemp[0].name);
                    this.uploadTask = storageRef.put(this.picturesTemp[0]);
//                }
                    this.picturesTemp = {}
                }else{
                    this.saveData ()
                }
            },
            detectFiles(fileList){
                this.picturesTemp = fileList
                var image = fileList[0]
                var reader = new FileReader();
                reader.onload = (e) => {
                    // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
                    // Read image as base64 and set to imageData
//              this.frontImage = image
                    this.profileUrl = e.target.result
                }
                reader.readAsDataURL(image);

            },
            saveData () {
                this.$validator.validateAll().then(result => {
                    if(result) {
                        // if form have no errors
                        // alert("form submitted!");
                        const memberPayLoad = {
                            name: this.name ? this.name : '',
                            email: this.email ? this.email : '',
                            mobile: this.mobile ? this.mobile : '',
                            gender: this.gender ? this.gender : '',
                            profileUrl: this.profileUrl ? this.profileUrl : '',
                            country_code:this.countryCode?this.countryCode:'',
                            mobileFormat:this.mobileFormat?this.mobileFormat:'',
                        }
                        localStorage.setItem('photoURL', this.profileUrl ? this.profileUrl : null)
                        localStorage.setItem('displayName',this.name)
                        firebase.firestore().collection('users').doc(localStorage.getItem('uid')).get()
                            .then(snap => {
                                this.$vs.notify({
                                    title: '',
                                    text: 'Info successfully Updated!',
                                    color:'success',
                                    iconPack: 'feather',
                                    icon:'icon-check'
                                });
                                return snap.ref.update(memberPayLoad);
                            })
                            .then(() => {
                                console.log('Successfully updated the record')
                            })
                            .catch(error => {
                                console.error('There was an error editing the record: ' + error)
                            })
                    }else{
                        // form have errors
                    }
                })

            },
            getUserDetail() {
                firebase.firestore().collection('users')
                    .doc(localStorage.getItem('uid'))
                    .get()
                    .then(snap => {
                        let data = snap.data();
                        let memberObj = data['memberDetail'];
                        this.name = data['name'];
                        this.email = data['email'];
                        this.mobile= data['mobile'];
                        this.gender= data['gender'];
                        this.profileUrl= data['profileUrl']?data['profileUrl']:'';
                        this.countryCode= data['country_code']?data['country_code']:'IN';
                    })
                    .then(() => {
                        console.log('Successfully get user detail.')
                    })
                    .catch(error => {
                        console.error('There was an error editing the record: ' + error)
                    })
            },
            loadContent() {
                this.$vs.loading({
                    background: this.backgroundLoading,
                    color: this.colorLoading,
                    container: "#button-save",
                    scale: 0.45
                })
                setTimeout(() => {
                    this.$vs.loading.close("#button-save > .con-vs-loading")
                }, 1000);
            },
            customFormatter(date) {
                return date != '' ? moment(date).format('MMMM Do YYYY') : '';
            },
        },
        mounted() {
            this.wasSidebarOpen = this.$store.state.reduceButton;
            this.$store.commit('TOGGLE_REDUCE_BUTTON', true)
        },
        beforeDestroy() {
            if (!this.wasSidebarOpen) this.$store.commit('TOGGLE_REDUCE_BUTTON', false)
        },
        components: {
            Datepicker,
          VuePhoneNumberInput
        },
        watch: {
            uploadTask: function () {
                this.uploadTask.on('state_changed', sp => {
//                    this.progressUpload = Math.floor(sp.bytesTransferred / sp.totalBytes * 100)
                    },
                    null,
                    () => {
                        this.uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
                            if(downloadURL != ''){
                                this.profileUrl = downloadURL
                                this.saveData ()
                            }
                        })
                    })
            }
        },

    }
</script>

<style>
.p-image{
  /*width: 200px;*/
  /*height: 200px;*/
  /*margin: 0 auto;*/
  /*border-radius: 50%;*/
  overflow: hidden;
  /*border: 1px solid #ccc;*/
}
.p-image img{
  width: 100%;
  height: 100%;
}
fieldset {
    padding: 20px;
    border-radius: 8px;
    margin: 6px 6px 20px;
    border: 1px solid rgb(115, 103, 240);
    -webkit-box-shadow: 2px 5px 10px -3px rgba(115, 103, 240, .7);
    box-shadow: 2px 5px 10px -3px rgba(115, 103, 240, .7);
}
.fieldset{
  padding: 10px;
  border-radius: 8px;
  /*margin: 6px 6px 20px;*/
}
legend {
    font-size: 20px;
    color: #000;
    padding: 0 10px;
    border: 0;
}
.legend {
  font-size: 20px;
  color: #000;
  border: 0;
}
  .progress-bar {
    margin: 10px 0;
    background-color: red;
    height: 25px;
    color:#fff;
  }
  .progress-bar b{
    padding: 3px 5px;
  }
  #form{
    width: 650px;
    margin: 0 auto;
  }
  #form input[type="file"]{
    margin: 20px 0 0;
  }
  span{
    text-transform: capitalize;
  }
  .vs-radio--label{
    font-size: 14px;
  }
  .con-slot-label{
    font-size:12px;
  }
  form ul li{
    width: 28%;
    margin-right: 0 !important;
    margin-top: 10px !important;
  }
  .con-vs-checkbox{
    width: 47%;
    margin-top:1.5rem;
  }
  .con-vs-checkbox.add{
    width: 100%;
  }
</style>
