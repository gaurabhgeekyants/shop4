
<!-- =========================================================================================
    File Name:  Member List
    Description: These Details are for Admin, this page is for add edit assign trainer and delete Members
     ========================================================================================== -->

<template>

  <div id="data-list-list-view" class="data-list-container members-list">
    <add-new-data-sidebar :memberName="memberName" :memberUID="memberUID" :addNewFlag="addNewFlag" :isSidebarActive="addNewDataSidebar" @closeSidebar="popupClose()" :assignedTrainer="assignedTrainer" />
    <div class="centerx">
      <vs-popup class="holamundo"  title="Reset Password" :active.sync="popupActivo">
        <div class="vx-col lg:w-1/2 sm:w-1/2 mb-6" style="position: relative">
          <vs-input label="New Password" class="w-full" v-validate="'required|min:6|max:10'" ref="password"
                    name="password" v-model="password" placeholder="Password"
                    :type="passwordFieldType"/>
          <feather-icon icon="EyeIcon" @click="visiblePassword" class="inline-block mr-2 cstm-icon" svgClasses="w-5 h-5"></feather-icon>
        </div>
        <vs-button class="mr-3 mb-2" id="button-save11" @click="resetPassword()">Save</vs-button>
      </vs-popup>
    </div>

    <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between">
      <div class="flex flex-wrap-reverse items-center">
        <div class="p-3 mb-4 mr-4 rounded-lg cursor-pointer flex items-center justify-between text-lg font-medium text-base text-primary border border-solid border-primary add-new" @click="$router.push({name:'member-create'})">
          <feather-icon icon="PlusIcon" svgClasses="h-4 w-4" />
          <span class="ml-2 text-base text-primary">Add New Member</span>
        </div>
      </div>
    </div>



    <vs-tabs class="member-tabs">
      <vs-tab label="Members">
        <vs-table>
          <div>

            <div class="con-input-search vs-table--search">

              <input type="text" class="search-member-input" v-model="search" @change="getSearchList">
              <i class="vs-icon notranslate icon-scale material-icons null">
              search</i>
            </div>
            <vs-table
              pagination
              max-items="25"
              :data="trainers">
              <template slot="thead">
                <vs-th sort-key="avatar">
                  Avatar
                </vs-th>
                <vs-th sort-key="name">
                  Name
                </vs-th>
                <vs-th sort-key="email">
                  Email
                </vs-th>
                <vs-th sort-key="mobile">
                  Mobile
                </vs-th>
                <vs-th sort-key="trainer">
                  Trainer
                </vs-th>
                <!--<vs-th sort-key="created_date">-->
                   <!--Date-->
                <!--</vs-th>-->
                <vs-th sort-key="status">
                  Status
                </vs-th>
                <vs-th>
                  Actions
                </vs-th>
              </template>

              <template slot-scope="{data}">
                <vs-tr class="vs-con-loading__container" v-bind:id="'div-with-loading'+indextr" :data="tr" :key="indextr" v-for="(tr, indextr) in data" >
                  <vs-td :data="data[indextr].id">
                    <img class="rounded-full shadow-md cursor-pointer block" v-if="data[indextr].avatar != ''" :src="data[indextr].avatar" style="width: 40px; height: 40px;">
                    <img class="rounded-full shadow-md cursor-pointer block"  v-if="data[indextr].avatar == '' && data[indextr].gender == 'male'" src="../../../assets/images/portrait/small/default-profile.png" style="width: 40px; height: 40px;">
                    <img class="rounded-full shadow-md cursor-pointer block" v-if="data[indextr].avatar == '' && data[indextr].gender == 'female'" src="../../../assets/images/portrait/small/female_avatar_vector.png" style="width: 40px; height: 40px;">
                    <img class="rounded-full shadow-md cursor-pointer block" v-if="data[indextr].avatar == '' && data[indextr].gender == 'other'" src="../../../assets/images/portrait/small/default-profile.png" style="width: 40px; height: 40px;">
                  </vs-td>
                  <vs-td :data="data[indextr].name">
                    {{data[indextr].name}}
                  </vs-td>
                  <vs-td :data="data[indextr].email" style="text-transform: lowercase;">
                    {{data[indextr].email}}
                  </vs-td>
                  <vs-td :data="data[indextr].mobile">
                    <!--{{data[indextr].mobile}}-->
                    <a :href='"tel:"+data[indextr].mobile'>{{data[indextr].mobile}}</a>

                  </vs-td>
                  <vs-td :data="data[indextr].trainerName">
                    {{data[indextr].trainerName}}
                  </vs-td>
                  <vs-td>
                    <vs-switch color="success" icon-pack="feather" vs-icon-on="icon-check-circle" vs-icon-off="icon-slash" v-model="data[indextr].uid" @click="active_account(tr.id,data[indextr].uid,data[indextr].name,data[indextr].email,data[indextr].data.hash,'active')">
                      <span slot="on">Active</span>
                      <span slot="off">Block</span>
                    </vs-switch>
                  </vs-td>
                  <vs-td>
                    <div class="p-2 mb-2  rounded-lg cursor-pointer flex items-center justify-between text-sm font-medium text-base text-primary button edit" @click="$router.push({name:'view-member-stats',params:{uid: data[indextr].id}})">
                      <vx-tooltip text="View Member Stats"><feather-icon icon="UserIcon" svgClasses="h-5 w-5" /></vx-tooltip>
                    </div>
                    <div class="p-2 mb-2  rounded-lg cursor-pointer flex items-center justify-between text-sm font-medium text-base text-primary button edit" @click="memberName=data[indextr].name, addNewDataSidebar = true, addNewFlag = true, memberUID =  data[indextr].id, assignedTrainer =  data[indextr].assigned_trainer, setUID(data[indextr].id)">
                      <vx-tooltip text="Assign Trainer"><feather-icon icon="ArrowRightIcon" svgClasses="h-5 w-5" /></vx-tooltip>
                    </div>
                    <div class="p-2 mb-2  rounded-lg cursor-pointer flex items-center justify-between text-sm font-medium text-base text-primary button edit" @click="$router.push({name:'member-edit',params:{uid: data[indextr].id}})">
                      <vx-tooltip text="View Member"><feather-icon icon="EditIcon" svgClasses="h-5 w-5" /></vx-tooltip>
                    </div>
                    <!--<a class="p-2 mb-2  rounded-lg cursor-pointer flex items-center justify-between text-sm font-medium text-base text-danger delete" button @click="deleteTrainer(data[indextr].id)">-->
                    <a class="p-2 mb-2  rounded-lg cursor-pointer flex items-center justify-between text-sm font-medium text-base text-danger delete" button @click="openConfirm(),memberUID =  data[indextr].id">
                      <vx-tooltip text="Delete"><feather-icon icon="TrashIcon" svgClasses="h-5 w-5" /></vx-tooltip>
                    </a>
                    <a class="p-2 mb-2  rounded-lg cursor-pointer flex items-center justify-between text-sm font-medium text-base text-danger delete" button @click="popupActivo=true,memberUid=data[indextr].id">
                      <vx-tooltip text="Reset Password"><feather-icon icon="RotateCwIcon" svgClasses="h-5 w-5" /></vx-tooltip>
                    </a>
                  </vs-td>
                </vs-tr>
              </template>
            </vs-table>
          </div>
        </vs-table>
      </vs-tab>
      <vs-tab label="Leads To Members Conversion">
        <vs-table>
          <div>
            <div class="con-input-search vs-table--search">
              <input type="text" class="search-member-input" v-model="search" @change="getConvertedMemberSearchList">
              <i class="vs-icon notranslate icon-scale material-icons null">
                search</i>
            </div>
            <vs-table
              pagination
              max-items="25"

              :data="convertMembers">
              <template slot="thead">
                <vs-th sort-key="avatar">
                  Avatar
                </vs-th>
                <vs-th sort-key="name">
                  Name
                </vs-th>
                <vs-th sort-key="email">
                  Email
                </vs-th>
                <vs-th sort-key="mobile">
                  Mobile
                </vs-th>
                <vs-th sort-key="trainer">
                  Trainer
                </vs-th>
                <vs-th sort-key="status">
                  Status
                </vs-th>
                <vs-th>
                  Actions
                </vs-th>
              </template>

              <template slot-scope="{data}">
                <vs-tr class="vs-con-loading__container" v-bind:id="'div-with-loading'+indextr" :data="tr" :key="indextr" v-for="(tr, indextr) in data" >
                  <vs-td :data="data[indextr].id">
                    <img class="rounded-full shadow-md cursor-pointer block" v-if="data[indextr].avatar != ''" :src="data[indextr].avatar" style="width: 40px; height: 40px;">
                    <img class="rounded-full shadow-md cursor-pointer block"  v-if="data[indextr].avatar == '' && data[indextr].gender == 'male'" src="../../../assets/images/portrait/small/default-profile.png" style="width: 40px; height: 40px;">
                    <img class="rounded-full shadow-md cursor-pointer block" v-if="data[indextr].avatar == '' && data[indextr].gender == 'female'" src="../../../assets/images/portrait/small/female_avatar_vector.png" style="width: 40px; height: 40px;">
                    <img class="rounded-full shadow-md cursor-pointer block" v-if="data[indextr].avatar == '' && data[indextr].gender == 'other'" src="../../../assets/images/portrait/small/default-profile.png" style="width: 40px; height: 40px;">
                  </vs-td>
                  <vs-td :data="data[indextr].name">
                    {{data[indextr].name}}
                  </vs-td>
                  <vs-td :data="data[indextr].email" style="text-transform: lowercase;">
                    {{data[indextr].email}}
                  </vs-td>
                  <vs-td :data="data[indextr].mobile">
                    <a :href='"tel:"+data[indextr].mobile'>{{data[indextr].mobile}}</a>

                  </vs-td>
                  <vs-td :data="data[indextr].trainerName">
                    {{data[indextr].trainerName}}
                  </vs-td>
                  <vs-td>
                    <!--<vs-switch color="success" icon-pack="feather" vs-icon-on="icon-check-circle" vs-icon-off="icon-slash" v-model="data[indextr].uid" @click="active_account(tr.id,data[indextr].uid,data[indextr].name,data[indextr].email,data[indextr].data.hash)">-->
                    <vs-switch color="success" icon-pack="feather" vs-icon-on="icon-check-circle" vs-icon-off="icon-slash" v-model="data[indextr].uid" @click="convertMEmberEmail(tr.id,data[indextr].uid,data[indextr].name,data[indextr].email,data[indextr].data.hash)">
                      <span slot="on">Active</span>
                      <span slot="off">Block</span>
                    </vs-switch>
                  </vs-td>
                  <vs-td>
                    <div class="p-1 mb-2  rounded-lg cursor-pointer flex items-center justify-between text-sm font-medium text-base text-primary button edit" @click="$router.push({name:'view-member-stats',params:{uid: data[indextr].id}})">
                      <vx-tooltip text="View Member Stats"><feather-icon icon="UserIcon" svgClasses="h-5 w-5" /></vx-tooltip>
                    </div>
                    <div class="p-1 mb-2  rounded-lg cursor-pointer flex items-center justify-between text-sm font-medium text-base text-primary button edit" @click="memberName=data[indextr].name, addNewDataSidebar = true, addNewFlag = true, memberUID =  data[indextr].id, assignedTrainer =  data[indextr].assigned_trainer, setUID(data[indextr].id)">
                      <vx-tooltip text="Assign Trainer"><feather-icon icon="ArrowRightIcon" svgClasses="h-5 w-5" /></vx-tooltip>
                    </div>
                    <div class="p-1 mb-2  rounded-lg cursor-pointer flex items-center justify-between text-sm font-medium text-base text-primary button edit" @click="$router.push({name:'member-edit',params:{uid: data[indextr].id}})">
                      <vx-tooltip text="View Member"><feather-icon icon="EditIcon" svgClasses="h-5 w-5" /></vx-tooltip>
                    </div>
                    <a class="p-1 mb-2  rounded-lg cursor-pointer flex items-center justify-between text-sm font-medium text-base text-danger delete" button @click="deleteTrainer(data[indextr].id,indextr)">
                      <vx-tooltip text="Delete"><feather-icon icon="TrashIcon" svgClasses="h-5 w-5" /></vx-tooltip>
                    </a>
                    <a class="p-2 mb-2  rounded-lg cursor-pointer flex items-center justify-between text-sm font-medium text-base text-danger delete" button @click="popupActivo=true,memberUid=data[indextr].id">
                      <vx-tooltip text="Reset Password"><feather-icon icon="RotateCwIcon" svgClasses="h-5 w-5" /></vx-tooltip>
                    </a>
                  </vs-td>
                </vs-tr>
              </template>
            </vs-table>
          </div>
        </vs-table>
      </vs-tab>
    </vs-tabs>

  </div>
</template>

<script>
    import firebase from 'firebase/app'
    require('firebase/firestore')
    import 'firebase/auth'
    import AddNewDataSidebar from './assignMemberToTrainer.vue';
    import axios from 'axios';
    import moment from 'moment'
    import $ from 'jquery'

    export default {
        components: {
            AddNewDataSidebar
        },
        data() {
            return {
                search:'',
                usersAll:[],
                convertedUsersAll:[],
                activeConfirm: false,
                memberUid:'',
                password:'',
                popupActivo:false,
                passwordFieldType: 'password',
                trainers: [],
                addNewDataSidebar: false,
                memberName:'',
                memberUID: '',
                assignedTrainer: '',
                trIndex:'',
                addNewFlag: false,
                convertMembers: [],
            }
        },
        computed: {
        },
        methods: {
            openConfirm() {
                this.$vs.dialog({
                    type: 'confirm',
                    color: 'danger',
                    title: '  ',
                    text: 'Are you sure, you want to Delete this User?',
                    accept: this.deleteTrainer
                })
            },
            deleteTrainer() {
                this.setUID(this.memberUID)
//                this.loadContent()
                axios.get('https://backend.xtremeperformance.co.in/apis?uid='+this.memberUID+'&type=deleteUser', {
                    header:{
                        'Access-Control-Allow-Origin': '*'
                    }
                })
                    .then(response => {
                        if(response.data == 'success'){
                            console.log('........');
                            console.log(this.memberUID);
                            firebase.firestore().collection('users')
                                .doc(this.memberUID).delete()
                                .then(() => {
//                                  this.getTrainers()
                                    this.trainers.splice(this.trIndex, 1)
                                    console.log('Successfully Deleted the record')
                                    this.$vs.notify({
                                        color: 'danger',
                                        title: 'Deleted User',
                                        text: 'The selected User was successfully deleted'
                                    })
                                })
                                .catch(error => {
                                    console.error('There was an error deleting the record: ' + error)
                                })
                        }
                    })
                    .catch(e => {
                        console.log(e)
                    })
            },
            setUID(uid) {
                this.trIndex = this.trainers.findIndex(x => x.id === uid)
            },
            visiblePassword(){
                this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password'
            },
            resetPassword(){
                axios.get('https://backend.xtremeperformance.co.in/apis?uid='+this.memberUid+'&password='+this.password+'&type=changePassword', {
                    header:{
                        'Access-Control-Allow-Origin': '*'
                    }
                })
                    .then(response => {
                        console.log(response);
                        if(response.data == 'success'){
                            this.popupActivo=false
                            this.password=''
                            this.$vs.notify({
                                title: '',
                                text: 'Your Password is reset Successfully!',
                                iconPack: 'feather',
                                icon: 'icon-check',
                                color: 'success'
                            });
                        }else{
                            this.$vs.notify({
                                title: '',
                                text: 'Something went wrong while resetting password!',
                                iconPack: 'feather',
                                icon: 'icon-check',
                                color: 'danger'
                            });
                        }


                    })
                    .catch(e => {
                        console.log(e)
                    })
            },
            change_status(id,status){
                let user_status= status == false ? true :false
                firebase.firestore().collection('users').doc(id).get()
                    .then(snap => {
                        snap.ref.update({status:user_status});
                        console.log('Successfully updated the record')
                        this.$vs.notify({
                            title: '',
                            text: (status==false?'Accepted':'Rejected'),
                            iconPack: 'feather',
                            icon: 'icon-check',
                            color:  (status==false?'success':'danger')
                        });
                    })
                    .catch(error => {
                        console.error('There was an error editing the record: ' + error)
                        this.$vs.notify({
                            title: 'Something went wrong',
                            text: 'while update lead!',
                            iconPack: 'feather',
                            icon: 'icon-check',
                            color: 'danger'
                        });
                    })
            },
            active_account(id,status,name,email,hash,account_status){

                let user_status= status == false ? true :false
                firebase.firestore().collection('users').doc(id).get()
                    .then(snap => {
                        snap.ref.update({status:user_status});
                        console.log('Successfully updated the record')
                        const formData = new FormData();
                        const type=(account_status != undefined)?'activeAccount':'accountCredential'
                        formData.append('name', name);
                        formData.append('email', email);
                        formData.append('subject', 'Welcome to Xtreme Performance');
                        formData.append('type', type);

                        axios.post('https://backend.xtremeperformance.co.in/mailer/email.php', formData , {'Access-Control-Allow-Origin': '*'})
                            .then(response => {
                                console.log(response)
                            }).catch(e => {
                            console.log(e)
                        })

                        this.$vs.notify({
                            title: '',
                            text: (status==false?'Accepted':'Rejected'),
                            iconPack: 'feather',
                            icon: 'icon-check',
                            color:  (status==false?'success':'danger')
                        });
                    })
                    .catch(error => {
                        console.error('There was an error editing the record: ' + error)
                        this.$vs.notify({
                            title: 'Something went wrong',
                            text: 'while update lead!',
                            iconPack: 'feather',
                            icon: 'icon-check',
                            color: 'danger'
                        });
                    })
            },
            convertMEmberEmail(id,status,name,email,hash,account_status){
                let password = Math.random().toString(36).slice(-8)
                let user_status= status == false ? true :false
                firebase.firestore().collection('users').doc(id).get()
                    .then(snap => {
                        snap.ref.update({status:user_status});
                        console.log('Successfully updated the record')
                        const formData = new FormData();
                        formData.append('name', name);
                        formData.append('email', email);
                        formData.append('password', password);
                        formData.append('subject', 'Welcome to Xtreme Performance');
                        formData.append('type', 'accountCredential');
    if(user_status == true) {
    axios.get('https://backend.xtremeperformance.co.in/apis?uid=' + id + '&password=' + password + '&type=changePassword', {
        header: {
            'Access-Control-Allow-Origin': '*'
        }
    })
    axios.post('https://backend.xtremeperformance.co.in/mailer/email.php', formData, {'Access-Control-Allow-Origin': '*'})
        .then(response => {
            console.log(response)
        }).catch(e => {
        console.log(e)
    })
}

                        this.$vs.notify({
                            title: '',
                            text: (status==false?'Accepted':'Rejected'),
                            iconPack: 'feather',
                            icon: 'icon-check',
                            color:  (status==false?'success':'danger')
                        });
                    })
                    .catch(error => {
                        console.error('There was an error editing the record: ' + error)
                        this.$vs.notify({
                            title: 'Something went wrong',
                            text: 'while update lead!',
                            iconPack: 'feather',
                            icon: 'icon-check',
                            color: 'danger'
                        });
                    })


            },
            popupClose(){
                this.addNewDataSidebar = false
                firebase.firestore().collection('users').doc(this.memberUID).get()
                    .then(doc => {
                        if(doc.data()['assigned_trainer']){
                            firebase.firestore().collection('users').doc(doc.data()['assigned_trainer']).get().then((doc1) => {
                                this.trainers[this.trIndex]['trainerName'] = doc1.data() ? doc1.data().name : 'Not Assigned Yet'
                                this.trainers[this.trIndex]['trainerUid'] = doc.data()['assigned_trainer']
                            })
                        }else{
                            this.trainers[this.trIndex]['trainerName'] ='Not Assigned Yet'
                            this.trainers[this.trIndex]['trainerUid'] =''
                        }
                    })
            },
            getTrainers(){
                this.trainers = []
                firebase.firestore().collection('users').where('role','==','member').orderBy('createdAt', 'desc').get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        let timestamp = doc.data()['createdAt'];
                        const trainer = {
                            id: doc.id,
                            uid: doc.data()['status'],
                            data: doc.data(),
                            assigned_trainer:doc.data()['assigned_trainer'],
                            "mobile": doc.data()['mobileFormat']?doc.data()['mobileFormat']:doc.data()['mobile'],
                            "email": doc.data()['email'],
                            "created_date": timestamp && timestamp.seconds ? moment(new Date(timestamp.seconds * 1000)).format('ddd MMM DD  YYYY H:mm a') : '-- -- --',
                            "name": doc.data()['first_name']+' '+doc.data()['last_name'],
                            "avatar": doc.data()['profileUrl']?doc.data()['profileUrl']:'',
                            "gender":doc.data()['gender']?doc.data()['gender']:'male'
                        }
                        if(doc.data()['assigned_trainer']){
                            firebase.firestore().collection('users').doc(doc.data()['assigned_trainer']).get().then((doc1) => {
                                trainer['trainerName'] = doc1.data() ? doc1.data().name : 'Not Assigned Yet'
                                trainer['trainerUid'] = doc.data()['assigned_trainer']
                                this.trainers.push(trainer)
                                this.usersAll = this.trainers

                            })
                        }else{
                            trainer['trainerName'] ='Not Assigned Yet'
                            trainer['trainerUid'] =''
                            this.trainers.push(trainer)
                            this.usersAll = this.trainers
                        }
                    })
                })
                //**********Convert Members from Lead


                this.convertMembers = []
                var convertedMembers = []
                firebase.firestore().collection('lead_member_conversion').orderBy('createdAt', 'desc').get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        firebase.firestore().collection('users').doc(doc.data().member_id).get().then((data) => {
                                if(data.data()) {
                                let lead_member = {
                                    id: data.id,
                                    uid: data.data()['status'] ? data.data()['status'] : '',
                                    data: data.data(),
                                    assigned_trainer: data.data()['assigned_trainer'],
                                    "mobile": data.data()['mobile'],
                                    "email": data.data()['email'],
                                    "name": data.data()['first_name'] + ' ' + data.data()['last_name'],
//                             profile:(data.data()['firstTimeLogin']==true)?'Not Completed':'Completed'
                                    "avatar": doc.data()['profileUrl'] ? doc.data()['profileUrl'] : '',
                                    "gender": doc.data()['gender'] ? doc.data()['gender'] : 'male'

                                }
                                if (data.data()['assigned_trainer']) {
                                    firebase.firestore().collection('users').doc(data.data()['assigned_trainer']).get().then((doc1) => {
                                        lead_member['trainerName'] = doc1.data() ? doc1.data().name : 'Not Assigned Yet'
                                        lead_member['trainerUid'] = doc.data()['assigned_trainer']
                                        convertedMembers.push(lead_member)
                                    })
                                } else {
                                    lead_member['trainerName'] = 'Not Assigned Yet'
                                    lead_member['trainerUid'] = ''
                                    convertedMembers.push(lead_member)
                                }
                            }
                    })
                    })
                })
            this.convertMembers=convertedMembers
            this.convertedUsersAll=convertedMembers
            },

            getSearchList(){
                $(document).find('.vs-pagination--ul li:first-child').click();
                const search = this.search
                if (!search) this.trainers = this.usersAll;
                this.trainers = this.usersAll.filter(item => {
                    return item.name.indexOf(search) > -1
                        || item.email.toLowerCase().indexOf(search) > -1 || item.mobile.trim().replace(/[\s\/]/g, '').indexOf(search.replace(/[\s\/]/g, '')) > -1
                })
            },

            getConvertedMemberSearchList(){
                $(document).find('.vs-pagination--ul li:first-child').click();
                const search = this.search
                if (!search) this.convertMembers = this.convertedUsersAll;
                console.log('&&&&&++++')
                console.log(this.convertedUsersAll)
                this.convertMembers = this.convertedUsersAll.filter(item => {
                    return item.name.indexOf(search) > -1
                        || item.email.toLowerCase().indexOf(search) > -1 || item.mobile.trim().replace(/[\s\/]/g, '').indexOf(search.replace(/[\s\/]/g, '')) > -1
                })
            },
            getFilesList(uid){
                var list = []
                var listRef = firebase.storage().ref(uid+'/member_three_pics/');
                listRef.listAll().then(function(res) {
                    res.items.forEach(function(itemRef) {
                        itemRef.getDownloadURL().then(function(downloadURL) {
                            list.push(downloadURL)
                        })
                    });
                }).catch(function(error) {
                    console.log(error)
                    console.log('Error, While getting pictures')
                });

                return list
            },
            deleteTrainer(uid) {
                this.setUID(uid)
//                this.loadContent()
                  axios.get('https://backend.xtremeperformance.co.in/apis?uid='+uid+'&type=deleteUser', {
                      header:{
                          'Access-Control-Allow-Origin': '*'
                      }
                  })
                    .then(response => {
                      if(response.data == 'success'){
                          console.log('test');
                          console.log(uid);
                          firebase.firestore().collection('users')
                              .doc(uid).delete()
                              .then(() => {
//                                  this.getTrainers()
                                  this.trainers.splice(this.trIndex, 1)
                                  console.log('Successfully Deleted the record')
                                  this.$vs.notify({
                                      color: 'danger',
                                      title: 'Deleted image',
                                      text: 'The selected image was successfully deleted'
                                  })
                              })
                              .catch(error => {
                                  console.error('There was an error deleting the record: ' + error)
                              })
                      }
                    })
                    .catch(e => {
                        console.log(e)
                    })

            },
            loadContent() {
                this.$vs.loading()
                setTimeout(() => {
                    this.$vs.loading.close()
                }, 1000);
            },
            openLoading(trIndex){
                this.$vs.loading({
                    container: '#div-with-loading'+trIndex,
                    scale: 0.6
                })
                setTimeout( ()=> {
                    this.$vs.loading.close('#div-with-loading'+trIndex+' > .con-vs-loading')
                }, 1000);
            },
        },
        created() {
            this.getTrainers()
//            this.getSearchList()
        }
    }
</script>

<style lang="scss">
  .cstm-icon {
    font-weight: 700;
    /* float: right; */
    position: absolute !important;
    top: 50%;
    z-index: 1;
    right: 0;
  }
  .members-list {
    .vs-con-table {

      .vs-table--header {
        display: flex;
        flex-wrap: wrap-reverse;
        margin-left: 1.5rem;
        margin-right: 1.5rem;
        > span {
          display: flex;
          flex-grow: 1;
        }

        .vs-table--search{
          padding-top: 0;

          .vs-table--search-input {
            padding: 0.9rem 2.5rem;
            font-size: 1rem;

            &+i {
              left: 1rem;
            }

            &:focus+i {
              left: 1rem;
            }
          }
        }
      }

      .vs-table {
        border-collapse: separate;
        border-spacing: 0 1.3rem;
        /*padding: 0 1rem;*/

        tr{
          box-shadow: 0 4px 20px 0 rgba(0,0,0,.05);
          td{
            padding: 8px !important;
            &:first-child{
              border-top-left-radius: .5rem;
              border-bottom-left-radius: .5rem;
            }
            &:last-child{
              border-top-right-radius: .5rem;
              border-bottom-right-radius: .5rem;
            }
            span{
              font-size: 14px;
            }
          }
          td.td-check{
            padding: 8px!important;
          }
        }
      }

      .vs-table--thead{
        th {
          padding-top: 0;
          padding-bottom: 0;

          .vs-table-text{
            text-transform: uppercase;
            font-weight: 600;
          }
        }
        th.td-check{
          padding: 0 15px !important;
        }
        tr{
          background: none;
          box-shadow: none;
        }
      }

      .vs-table--pagination {
        justify-content: center;
      }
    }
  }
  .edit{
    float: left;
    width: 30px;
    height: 30px;
    /*margin: 0 10px 0 0;*/
    background:#fff;
    /*border-radius: 50% !important;*/
  }
  /*.edit:hover{*/
    /*background: #7367f0;*/
  /*}*/
  .edit .text-base{
    margin: 0 !important;
  }
  .edit .feather-icon {
    color: #7367f0;
    margin: 5px 0 0;
  }
  /*.edit:hover .feather-icon{*/
    /*color: #fff;*/
  /*}*/
  .member-tabs .vs-tabs--li {
    display: block;
    position: relative;
    width: 50%;
  }
  .delete{
    float: left;
    width: 30px;
    height: 30px;
    /*margin: 0 10px 0 0;*/
    background:#fff;
    /*border-radius: 50% !important;*/
    border-color: #ff9f43 !important;
  }
  /*.delete:hover{*/
    /*!*background: #ff9f43;*!*/
  /*}*/
  /*.delete:hover .feather-icon{*/
    /*color: #fff;*/
    /*margin: 5px 0 0;*/
  /*}*/
  .delete .text-base{
    margin: 0 !important;
  }
  .delete .feather-icon {
    color: #ff9f43;
  }
  @media only screen and ( max-width: 500px ){
    .add-new{
      top:0 !important;
      position: relative !important;
    }
  }
  .search-member-input {
    padding: 15px 20px;
    padding-left: 30px;
    border-radius: 20px;
    border: 1px solid rgba(0,0,0,.04);
    font-size: .7rem;
    width: 200px;
    color: rgba(0,0,0,.7);
  }
</style>
