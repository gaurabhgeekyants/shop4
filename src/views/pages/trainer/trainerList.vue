<!-- =========================================================================================
    File Name: Trainer List
    Description: These Details are for Admin,here is Delete and edit methods
     ========================================================================================== -->

<template>
    <div id="data-list-list-view" class="data-list-container">

        <add-new-data-sidebar :trainerUID="trainerUID" :addNewFlag="addNewFlag" :isSidebarActive="addNewDataSidebar"
                              @closeSidebar="popupClose()"/>
        <div class="centerx">
            <vs-popup class="holamundo" title="Reset Password" :active.sync="popupActivo">
                <div class="vx-col lg:w-1/2 sm:w-1/2 mb-6" style="position: relative">
                    <vs-input label="New Password" class="w-full" v-validate="'required|min:6|max:10'" ref="password"
                              name="password" v-model="password" placeholder="Password"
                              :type="passwordFieldType"/>
                    <feather-icon icon="EyeIcon" @click="visiblePassword" class="inline-block mr-2 cstm-icon"
                                  svgClasses="w-5 h-5"></feather-icon>
                </div>
                <vs-button class="mr-3 mb-2" id="button-save11" @click="resetPassword()">Save</vs-button>
            </vs-popup>
        </div>
        <div>
            <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between">

                <div class="flex flex-wrap-reverse items-center">
                    <div class="p-3 mb-4 mr-4 rounded-lg cursor-pointer flex items-center justify-between text-lg font-medium text-base text-primary border border-solid border-primary add-new"
                         @click="addNewDataSidebar = true, addNewFlag = true, trainerUID = ''">
                        <span class="ml-2 text-base text-primary">Add New Trainer</span>
                    </div>
                </div>
            </div>
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
                            avatar
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
                        <vs-th sort-key="status">
                            Status
                        </vs-th>
                        <vs-th>
                            Actions
                        </vs-th>
                    </template>

                    <template slot-scope="{data}">
                        <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                            <vs-td :data="data[indextr].id">
                                <img class="rounded-full shadow-md cursor-pointer block"
                                     v-if="data[indextr].avatar != ''" :src="data[indextr].avatar"
                                     style="width: 40px; height: 40px;">
                                <img class="rounded-full shadow-md cursor-pointer block"
                                     v-if="data[indextr].avatar == '' && data[indextr].gender == 'male'"
                                     src="../../../assets/images/portrait/small/default-profile.png"
                                     style="width: 40px; height: 40px;">
                                <img class="rounded-full shadow-md cursor-pointer block"
                                     v-if="data[indextr].avatar == '' && data[indextr].gender == 'female'"
                                     src="../../../assets/images/portrait/small/female_avatar_vector.png"
                                     style="width: 40px; height: 40px;">
                                <img class="rounded-full shadow-md cursor-pointer block"
                                     v-if="data[indextr].avatar == '' && data[indextr].gender == 'other'"
                                     src="../../../assets/images/portrait/small/default-profile.png"
                                     style="width: 40px; height: 40px;">
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
                            <vs-td>
                                <vs-switch color="success" icon-pack="feather" vs-icon-on="icon-check-circle"
                                           vs-icon-off="icon-slash" v-model="data[indextr].uid"
                                           @click="change_status(tr.id,data[indextr].uid)">
                                    <span slot="on">Active</span>
                                    <span slot="off">Block</span>
                                </vs-switch>
                            </vs-td>
                            <vs-td>
                                <div class="p-2 mb-2  rounded-lg cursor-pointer flex items-center justify-between text-sm font-medium text-base text-primary  edit"
                                     @click="addNewDataSidebar = true , trainerUID = data[indextr].id , addNewFlag = false">

                                    <span class="ml-2 text-base text-primary"><feather-icon icon="EditIcon"
                                                                                            svgClasses="h-5 w-5"/></span>
                                </div>

                                <span><a
                                        class="p-2 mb-2 rounded-lg cursor-pointer flex items-center justify-between text-sm font-medium text-base text-danger trash"
                                        button @click="openConfirm(),trainerUID =  data[indextr].id"><feather-icon
                                        icon="TrashIcon" svgClasses="h-5 w-5"/></a> </span>
                                <span><a
                                        class="p-2 mb-2 rounded-lg cursor-pointer flex items-center justify-between text-sm font-medium text-base text-danger trash"
                                        button @click="popupActivo=true,trainerUid=data[indextr].id"><feather-icon
                                        icon="RotateCwIcon" svgClasses="h-5 w-5"/></a> </span>

                            </vs-td>
                        </vs-tr>
                    </template>
                </vs-table>
            </div>

        </div>
    </div>
</template>

<script>
    import firebase from 'firebase/app'
    require('firebase/firestore')
    import 'firebase/auth'
    import AddNewDataSidebar from './AddNewDataSidebar.vue';
    import axios from 'axios';
    import $ from 'jquery'

    export default {
        components: {
            AddNewDataSidebar,
        },
        data() {
            return {
                search: '',
                usersAll: [],
                trainerUid: '',
                password: '',
                popupActivo: false,
                passwordFieldType: 'password',
                trainers: [],
                addNewDataSidebar: false,
                trainerUID: '',
                addNewFlag: false,
                selected: [],
            }
        },
        computed: {},
        methods: {
            getSearchList(){
                $(document).find('.vs-pagination--ul li:first-child').click();
                const search = this.search
                if (!search) this.trainers = this.usersAll;
                this.trainers = this.usersAll.filter(item => {
                    return item.name.indexOf(search) > -1
                        || item.email.toLowerCase().indexOf(search) > -1 || item.mobile.trim().replace(/[\s\/]/g, '').indexOf(search.replace(/[\s\/]/g, '')) > -1
                })
            },

            openConfirm() {
                this.$vs.dialog({
                    type: 'confirm',
                    color: 'danger',
                    title: '  ',
                    text: 'Are you sure, you want to Delete this User?',
                    accept: this.deleteTrainer
                })
            },

            visiblePassword(){
                this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password'
            },
            change_status(id, status){
                let user_status = (status == false ? true : false)
                firebase.firestore().collection('users').doc(id).get()
                    .then(snap => {
                        snap.ref.update({status: user_status});
                        console.log('Successfully updated the record')
                        this.$vs.notify({
                            title: '',
                            text: (status == false ? 'Accepted' : 'Rejected'),
                            iconPack: 'feather',
                            icon: 'icon-check',
                            color: (status == false ? 'success' : 'danger')
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

                this.getTrainers()
            },
            getTrainers(){
                firebase.firestore().collection('users').where('role', '==', 'trainer').orderBy('createdAt', 'desc').get().then((querySnapshot) => {
                    this.trainers = []
                    querySnapshot.forEach((doc) => {
                        const trainer = {
                            id: doc.id,
                            uid: ((doc.data()['status']) == false ? '' : true),
                            data: doc.data(),
                            "name": doc.data()['name'],
                            "mobile": doc.data()['mobileFormat'] ? doc.data()['mobileFormat'] : doc.data()['mobile'],
                            "email": doc.data()['email'],
                            "avatar": doc.data()['profileUrl'] ? doc.data()['profileUrl'] : '',
                            "status": doc.data()['status'],
                            "gender": doc.data()['gender']
                        }
                        this.trainers.push(trainer)
                        this.usersAll = this.trainers
                    })
                })
            },
            setUID(uid) {
                this.trIndex = this.trainers.findIndex(x => x.id === uid)
            },
            resetPassword(){
                axios.get('https://backend.xtremeperformance.co.in/apis?uid=' + this.trainerUid + '&password=' + this.password + '&type=changePassword', {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                    }
                })
                    .then(response => {
                        this.popupActivo = false
                        this.password = ''
                        this.$vs.notify({
                            title: '',
                            text: 'Your Password is reset Successfully!',
                            iconPack: 'feather',
                            icon: 'icon-check',
                            color: 'success'
                        });
                    })
                    .catch(e => {
                        console.log(e)
                    })
            },
            deleteTrainer() {
                this.setUID(this.trainerUID)
                axios.get('https://backend.xtremeperformance.co.in/apis?uid=' + this.trainerUID + '&type=deleteUser', {
                    header: {
                        'Access-Control-Allow-Origin': '*'
                    }
                })
                    .then(response => {
                        if (response.data == 'success') {
                            firebase.firestore().collection('users')
                                .doc(this.trainerUID).delete()
                                .then(() => {
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
            loadContent() {
                this.$vs.loading()
                setTimeout(() => {
                    this.$vs.loading.close()
                }, 4000);
            },
        },
        created() {

            this.getTrainers()
        }
    }
</script>

<style lang="scss">
    #tj-datetime-input {
        padding: 0 10px;
        width: 100% !important;
        height: 40px !important;
    }

    .calender-div {
        min-width: 100% !important;
    }

    .year-month-wrapper {
        background-color: rgb(115, 103, 240) !important;
    }

    .activePort, .activePort:hover {
        background-color: rgb(115, 103, 240) !important;
    }

    .month-setter, .year-setter {
        text-align: center;
    }

    .nav-l, .nav-r {
        background-color: rgb(115, 103, 240) !important;
    }

    .days,
    .port:hover,
    .okButton {
        color: rgb(115, 103, 240) !important;
    }

    li.active[data-v-4bd11526] {
        background-color: rgb(115, 103, 240) !important;
    }

    .port, .days {
        width: 13% !important;
    }

    .edit {
        float: left;
        width: 30px;
        height: 30px;
        background: #fff;
    }

    .edit .text-base {
        margin: 0 !important;
    }

    .edit .feather-icon {
        color: #7367f0;
    }

    .trash {
        float: left;
        width: 30px;
        height: 30px;
        margin: 0 10px 0 0;
        background: #fff;
        /*border-radius: 50% !important;*/
        /*border-color: #ff9f43 !important;*/
    }

    .trash .text-base {
        margin: 0 !important;
    }

    .trash .feather-icon {
        color: #ff9f43;
    }

    .add-new:hover {
        background: #8c83f3;
    }

    .add-new:hover .text-primary {
        color: #fff !important;
    }

    .cstm-icon {
        font-weight: 700;
        position: absolute !important;
        top: 50%;
        z-index: 1;
        right: 0;
    }

    #data-list-list-view {
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

                .vs-table--search {
                    padding-top: 0;

                    .vs-table--search-input {
                        padding: 0.9rem 2.5rem;
                        font-size: 1rem;

                        & + i {
                            left: 1rem;
                        }

                        &:focus + i {
                            left: 1rem;
                        }
                    }
                }
            }

            .vs-table {
                border-collapse: separate;
                border-spacing: 0 1.3rem;

                tr {
                    box-shadow: 0 4px 20px 0 rgba(0, 0, 0, .05);
                    td {
                        padding: 8px !important;
                        &:first-child {
                            border-top-left-radius: .5rem;
                            border-bottom-left-radius: .5rem;
                        }
                        &:last-child {
                            border-top-right-radius: .5rem;
                            border-bottom-right-radius: .5rem;
                        }
                    }
                    td.td-check {
                        padding: 8px !important;
                    }
                }
            }

            .vs-table--thead {
                th {
                    padding-top: 0;
                    padding-bottom: 0;

                    .vs-table-text {
                        text-transform: uppercase;
                        font-weight: 600;
                    }
                }
                th.td-check {
                    padding: 0 15px !important;
                }
                tr {
                    background: none;
                    box-shadow: none;
                }
            }

            .vs-table--pagination {
                justify-content: center;
            }
        }
    }

    .search-member-input {
        padding: 15px 20px;
        padding-left: 30px;
        border-radius: 20px;
        border: 1px solid rgba(0, 0, 0, .04);
        font-size: .7rem;
        width: 200px;
        color: rgba(0, 0, 0, .7);
    }
</style>
