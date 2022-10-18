<!-- =========================================================================================
  File Name: view trainer Profile for Member
  Description: Member view the Trainer profile
   ========================================================================================== -->

<template>

    <div id="page-user-view">
        <div class="vx-row">
            <div class="vx-col lg:w-1/1 md:w-1/1 w-full mb-base" v-if="this.name != ''">
                <div class="vx-card mb-base">
                    <div class="vx-card__header">
                        <div class="vx-card__title">
                            <h1 class="profile-title" style="font-size: 26px;"> {{name}} (
                                <ul class="category-list">
                                    <li v-for="(region, index) in t_category" :key="index">
                                        <vs-chip color="primary">{{ region.name }}</vs-chip>
                                    </li>
                                </ul>
                                )
                            </h1>
                            <!----></div>
                        <!----></div>
                    <div class="vx-card__collapsible-content vs-con-loading__container">
                        <div class="vx-card__body">
                            <div class="vx-row">
                                <div id="avatar-col" class="vx-col">
                                    <div class="img-container mb-4">
                                        <img v-show="profileUrl != ''"
                                             :src="profileUrl ? profileUrl : '../../../assets/images/portrait/small/default-profile.png'"
                                             class="rounded w-full">
                                        <img v-if="gender=='male'" v-show="profileUrl==''"
                                             src="../../../assets/images/portrait/small/default-profile.png"/>
                                        <img v-if="gender=='other'" v-show="profileUrl==''"
                                             src="../../../assets/images/portrait/small/default-profile.png"/>
                                        <img v-if="gender=='female'" v-show="profileUrl==''"
                                             src="../../../assets/images/portrait/small/female_avatar_vector.png"/>

                                    </div>
                                </div>
                                <div id="account-info-col-1" class="vx-col flex-1">
                                    <table>
                                        <tr>
                                            <td class="font-semibold">NAME</td>
                                            <td>
                                                {{name}}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="font-semibold">EMAIL  </td>
                                            <td>{{email}}</td>
                                        </tr>

                                    </table>
                                </div>
                                <div id="account-info-col-2" class="vx-col flex-1">
                                    <table>
                                        <tr>
                                            <td class="font-semibold">MOBILE</td>
                                            <td>


                                                {{mobile}}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="font-semibold">GENDER</td>
                                            <td>{{gender}} </td>
                                        </tr>

                                    </table>
                                </div>

                            </div>
                        </div>
                        <!----></div>

                </div>

            </div>
            <div class="vx-col lg:w-1/1 md:w-1/1 w-full mb-base" v-if="this.name == ''">
                <vx-card>
                    <h6 class="text-center">Not Assigned Yet!</h6>
                </vx-card>
            </div>

        </div>
    </div>

</template>

<script>
    require('firebase/firestore')
    import 'firebase/auth'
    import VxCard from "../../../components/vx-card/VxCard";
    import firebase from 'firebase'
    import storage from 'firebase/storage'
    import router from '@/router'
    export default {

        data() {
            return {

                name: '',
                email: '',
                mobile: '',
                gender: '',
                profileUrl: '',
                t_category: [],
                uid: localStorage.getItem('uid')
            }
        },
        computed: {},
        created(){
            this.t_category = []
            if (this.uid) {
                this.getUserDetail();
            }
        },
        methods: {
            getUserDetail() {
                firebase.firestore().collection('users')
                    .doc(localStorage.getItem('uid'))
                    .get()
                    .then(snap => {
                        if (snap.data().assigned_trainer) {
                            firebase.firestore().collection('users')
                                .doc(snap.data().assigned_trainer)
                                .get()
                                .then(snap1 => {
                                    let data = snap1.data();
                                    this.name = data['name'];
                                    this.email = data['email'];
                                    this.mobile = data['mobile'];
                                    this.gender = data['gender'];
                                    this.profileUrl = data['profileUrl'] ? data['profileUrl'] : '';
                                    var trainer_category = []
                                    data['category'].forEach(function (itemRef) {
                                        firebase.firestore().collection('trainer-category').doc(itemRef).get()
                                            .then((doc) => {
                                                const trainer = {
                                                    id: doc.id,
                                                    name: doc.data()['title']
                                                }

                                                trainer_category.push(trainer)
                                            });
                                    });

                                    this.t_category = trainer_category
                                })
                        } else {
                            this.$vs.notify({
                                title: 'Not Assigned yet',
                                text: 'Contact to support!',
                                iconPack: 'feather',
                                icon: 'icon-alert-circle',
                                color: 'danger'
                            });
                        }

                    })
                    .then(() => {
                        console.log('Successfully get user detail.')
                    })
                    .catch(error => {
                        console.error('There was an error editing the record: ' + error)
                    })
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
            VxCard
        },
    }
</script>


<style scoped>
    .progress-bar {
        margin: 10px 0;
        background-color: red;
        height: 25px;
        color: #fff;
    }

    .progress-bar b {
        padding: 3px 5px;
    }

    #form {
        width: 100%;
        margin: 0 auto;
    }

    #form input[type="file"] {
        margin: 20px 0 0;
    }

    span {
        font-size: 18px;
        text-transform: capitalize;
    }

    .vs-radio--label {
        font-size: 14px;
    }

    .con-slot-label {
        font-size: 12px;
    }

    form ul li {
        width: 48%;
        margin-right: 0 !important;
    }

    .con-vs-checkbox {
        width: 47%;
        margin-top: 1.5rem;
    }

    .con-vs-checkbox.add {
        width: 100%;
    }

    .member li {
        width: 25%;
    }

    .member-days li {
        width: 16%;
    }

    .eat-check .con-vs-checkbox {
        width: 19%;
    }

    .vx-card__body h6 {
        font-size: 16px;
        margin: 0 0 4px;
    }

    .vx-card__body p {
        margin: 0 0 10px;
    }

    .vx-card__body {
        overflow: hidden !important;
    }

    .img-holder {
        display: block;
        overflow: hidden;
    }

    .img-holder img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
    }

    .text-holder {
        width: 100%;
        display: block;
        float: right;
    }

    .text-holder .profile-title {
        font-size: 36px;
        line-height: 1.1;
        font-weight: normal;
        margin-bottom: 5px;
    }

    .profile-list {
        margin: 0;
        padding: 0;
        list-style: none;
    }

    .profile-list li {
        margin-bottom: 13px;
    }

    .profile-list .cont {
        display: block;
        margin-left: 125px;
        font-size: 15px;
        font-weight: 400;
        line-height: 20px;
        color: #9da0a7;
    }

    .profile-list .title {
        display: block;
        width: 120px;
        float: left;
        color: #333333;
        font-size: 12px;
        font-weight: 700;
        line-height: 20px;
        text-transform: uppercase;
    }

    .text-holder .profile-info {
        color: #3d4451;
        padding-bottom: 10px;
        margin-bottom: 25px;
        border-bottom: 1px solid rgb(115, 103, 240);
    }

    .vs-con-loading__container {
        overflow: hidden !important;
    }

    @media only screen and ( max-width: 991px ) {
        .member li {
            width: 32%;
        }

        .eat-check .con-vs-checkbox {
            width: 31%;
        }
    }

    @media only screen and ( max-width: 575px ) {
        .vx-row > .vx-col {
            width: 100% !important;
        }

        .eat-check .con-vs-checkbox {
            width: 47%;
        }

        .member-days li {
            width: 32%;
        }

        .profile-list {
            overflow: auto;
        }
    }

    .profile-holder {
        display: block;
        overflow: hidden !important;
        padding: 0 0 30px;
    }

    fieldset {
        padding: 20px;
        margin: 0 0 16px;
        border-radius: 6px;
    }

    legend {
        font-size: 18px;
        font-weight: bold;
    }

    @media (max-width: 767px) {

    }

    .category-list {
        display: inline-flex;
    }

    .category-list li {
        position: relative;
        top: 10px;
    }

    #avatar-col {
        width: 15rem;
    }

    #page-user-view table td {
        padding-bottom: .8rem
    }

</style>
