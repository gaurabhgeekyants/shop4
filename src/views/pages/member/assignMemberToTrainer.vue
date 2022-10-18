<!-- =========================================================================================
    File Name: Assign Members to Trainer
    Description: These Details are added by ADmin
     ========================================================================================== -->

<script src="../../../../../node-instance/responseGenerator.js"></script>
<template>
    <vs-sidebar click-not-close position-right parent="body" default-index="1" color="primary"
                class="add-new-data-sidebar items-no-padding" spacer v-model="isSidebarActiveLocal">
        <div class="mt-6 flex items-center justify-between px-6">
            <h4>Assign Trainer To Member</h4>
            <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
        </div>
        <vs-divider class="mb-0"></vs-divider>

        <VuePerfectScrollbar class="scroll-area--data-list-add-new pt-4 pb-6" :settings="settings">
            <div class="trainer-holder vs-con-loading__container" id="div-with-loading">
                <ul>
                    <li :key="indextr" v-for="(tr, indextr) in options"
                        :class="tr.id == assignedTrainer? 'active' : ''">
                        <img class="rounded-full" v-show="tr.profileUrl != ''" :src="tr.profileUrl"
                             style="width: 40px; height: 40px;">
                        <img class="rounded-full" v-show="tr.profileUrl == '' && tr.gender == 'male'"
                             src="../../../assets/images/portrait/small/default-profile.png"
                             style="width: 40px; height: 40px;">
                        <img class="rounded-full" v-show="tr.profileUrl == '' && tr.gender == 'female'"
                             src="../../../assets/images/portrait/small/female_avatar_vector.png"
                             style="width: 40px; height: 40px;">
                        <img class="rounded-full" v-show="tr.profileUrl == '' && tr.gender == 'other'"
                             src="../../../assets/images/portrait/small/default-profile.png"
                             style="width: 40px; height: 40px;">
                        <span style="font-size:13px">{{ tr.name }}</span>
                        <a href="#" @click="setTrainer(tr.id,tr.name )" class="asign-trainer-icon" style="float: right">
                            <vx-tooltip text="Assign Trainer">
                                <feather-icon icon="UsersIcon" class="inline-block mr-1" svgClasses="w-4 h-4"/>
                            </vx-tooltip>
                        </a>
                    </li>
                </ul>
            </div>
        </VuePerfectScrollbar>

        <div class="flex flex-wrap items-center justify-center p-6" slot="footer">
            <vs-button type="border" color="danger" @click.stop="isSidebarActiveLocal = false">Cancel</vs-button>
        </div>
    </vs-sidebar>
</template>

<script>
    import VuePerfectScrollbar from 'vue-perfect-scrollbar'
    import firebase from 'firebase/app'
    require('firebase/firestore')

    export default {
        props: {
            isSidebarActive: {
                type: Boolean,
                required: true
            },
            memberUID: '',
            addNewFlag: false,
            assignedTrainer: '',
            memberName: '',
        },
        data() {
            return {
                settings: {
                    // perfectscrollbar settings
                    maxScrollbarLength: 60,
                    wheelSpeed: .60,
                },
                options: [],
                selected: {name: null, id: null}
            }
        },
        computed: {
            isSidebarActiveLocal: {
                get() {
                    this.initValues();
                    return this.isSidebarActive
                },
                set(val) {
                    if (!val) {
                        this.$emit('closeSidebar');
                    }
                }
            }
        },
        methods: {
            initValues() {
                this.options = []
                firebase.firestore().collection('users').where('role', '==', 'trainer').get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        const trainer = {
                            id: doc.id,
                            name: doc.data()['name'],
                            profileUrl: doc.data()['profileUrl'] ? doc.data()['profileUrl'] : '',
                            gender: doc.data()['gender']
                        }
                        this.options.push(trainer)
                    })
                })
            },
            setTrainer(uid, name){
                this.openLoading()
                firebase.firestore().collection('users').doc(this.memberUID).get()
                    .then(snap => {
                        return snap.ref.update({
                            assigned_trainer: uid
                        });
                    })
                    .then(() => {

                        const memberNotification = {
                            description: ' member Assign to trainer',
                            isSeen: false,
                            isAdminSeen: false,
                            receiver_id: uid,
                            receiver_name: name,
                            sender_id: this.memberUID,
                            sender_name: this.memberName,
                            url: '/members/profile/' + this.memberUID,
                            created_at: firebase.firestore.FieldValue.serverTimestamp(),//String(new Date()),//firebase.firestore.FieldValue.serverTimestamp(),
                            type: 'assign_trainer'
                        };

                        const trainerNotification = {
                            description: ' trainer Assign to member',
                            isSeen: false,
                            isAdminSeen: false,
                            receiver_id: this.memberUID,
                            receiver_name: this.memberName,
                            sender_id: uid,
                            sender_name: name,
                            url: '/members/edit/' + this.memberUID,
                            created_at: firebase.firestore.FieldValue.serverTimestamp(),//String(new Date()),//firebase.firestore.FieldValue.serverTimestamp(),
                            type: 'assign_trainer'
                        };

                        const adminNotification = {
                            description: ' Trainer Assign to Member',
                            isSeen: false,
                            isAdminSeen: false,
                            receiver_id: uid,
                            receiver_name: name,
                            sender_id: this.memberUID,
                            sender_name: this.memberName,
                            url: '/members/edit/' + this.memberUID,
                            created_at: firebase.firestore.FieldValue.serverTimestamp(),//String(new Date()),//firebase.firestore.FieldValue.serverTimestamp(),
                            type: 'assign_trainer_admin'
                        };

                        firebase.firestore().collection("notification").add(adminNotification).then((snap) => {
                            console.log('notify done')
                            console.log(snap)
                        })

                        firebase.firestore().collection("notification").add(memberNotification).then((snap) => {
                            console.log('notify done')
                            console.log(snap)
                        })
                        firebase.firestore().collection("notification").add(trainerNotification).then((snap) => {
                            console.log('notify done')
                            console.log(snap)
                        })

                        this.isSidebarActiveLocal = false
                        this.$vs.notify({
                            title: ' Successfully Assigned',
                            text: 'Trainer Assigned to member',
                            iconPack: 'feather',
                            icon: 'icon-check',
                            color: 'success'
                        });

                    })
                    .catch(error => {
                        console.error('There was an error editing the record: ' + error)
                    }), (error) => {
                    this.$vs.notify({
                        title: 'Error',
                        text: error.message,
                        iconPack: 'feather',
                        icon: 'icon-alert-circle',
                        color: 'danger'
                    });
                }
            },
            loadContent() {
                this.$vs.loading()
                setTimeout(() => {
                    this.$vs.loading.close()
                }, 2000);
            },
            openLoading(){
                this.$vs.loading({
                    container: '#div-with-loading',
                    scale: 0.6
                })
                setTimeout(() => {
                    this.$vs.loading.close('#div-with-loading > .con-vs-loading')
                }, 1000);
            },
        },
        components: {
            VuePerfectScrollbar,
        }
    }
</script>

<style lang="scss">
    .asign-trainer-icon {
        float: right;
        width: 30px;
        height: 30px;
        padding: 4px 7px;
        text-align: center;
        border-radius: 50%;
        color: #fff;
        background: rgb(115, 103, 240);
        border: 1px solid rgb(115, 103, 240);
        span {
            margin: 0;
            color: #fff;
            .feather {
                color: #fff;
                font-weight: bold;
            }
        }
    }

    .trainer-holder {
        overflow: hidden;
        padding: 20px 0;
        width: 90%;
        margin: 0 auto;
        border: 1px solid #e1e1e1;
        ul {
            padding: 0;
            margin: 0;
            list-style: none;
            li {
                width: 100%;
                padding: 10px 20px;
                border-top: 1px solid #e1e1e1;
                &.active {
                    background: rgba(0, 0, 0, .1);
                }
                &:first-child {
                    border: 0;
                }
                img {
                    margin: 0 10px 0 0;
                    display: inline-block;
                    vertical-align: middle;
                }
                span {
                    color: #000;
                    margin: 0 20px 0 0;
                    display: inline-block;
                    vertical-align: middle;
                    &:last-child {
                        margin: 0;
                    }
                }
            }
        }
    }

    .add-new-data-sidebar {
        /deep/ .vs-sidebar--background {
            z-index: 52010;
        }

        /deep/ .vs-sidebar {
            z-index: 52010;
            width: 400px;
            max-width: 90vw;

            .img-upload {
                margin-top: 2rem;

                .con-img-upload {
                    padding: 0;
                }

                .con-input-upload {
                    width: 100%;
                    margin: 0;
                }
            }
        }
    }

    .scroll-area--data-list-add-new {
        height: calc(100% - 4.3rem);
    }

    .dropdown .dropdown-input {
        height: 40px;
        font-size: .9em !important;
        padding: 6px 10px !important;
        border-radius: 5px !important;
        min-width: 100% !important;
        max-width: 100% !important;

    }

    .dropdown .dropdown-content {
        min-width: 100% !important;
        max-width: 100% !important;
    }

    .dropdown .dropdown-content .dropdown-item {
        font-size: .9em;
        padding: 10px 16px;
    }
</style>
