<!-- =========================================================================================
    File Name: Edit Trainer form
    Description: These Details are updated by Admin
     ========================================================================================== -->

<template>
    <div id="form">
        <div class="vx-row">
            <div class="vx-col md:w-1/1 w-full mb-base" style="margin: 0 auto;">
                <vx-card title="">
                    <form>
                        <div class="vx-row mb-12">
                            <div class="vx-col w-full">
                                <span>Full Name</span>
                            </div>
                            <div class="vx-col w-full">
                                <vs-input class="w-full" v-model="name"/>
                            </div>
                        </div>
                        <div class="vx-row mb-12">
                            <div class="vx-col w-full">
                                <span>Email</span>
                            </div>
                            <div class="vx-col w-full">
                                <vs-input class="w-full" type="email" v-model="email"/>
                            </div>
                        </div>
                        <div class="vx-row mb-12">
                            <div class="vx-col w-full">
                                <span>Mobile</span>
                            </div>
                            <div class="vx-col w-full">
                                <vs-input class="w-full" v-model="mobile"/>
                            </div>
                        </div>
                        <div class="vx-row mb-12">
                            <div class="vx-col w-full">
                                <span>Password</span>
                            </div>
                            <div class="vx-col w-full">
                                <vs-input
                                        type="password"
                                        name="password"
                                        icon="icon icon-lock"
                                        icon-pack="feather"
                                        label-placeholder="Password"
                                        v-model="password"
                                        class="w-full mt-6 no-icon-border"
                                />
                            </div>
                        </div>


                        <div class="vx-row">
                            <div class="vx-col sm:w-2/3 w-full ml-auto">
                                <vs-button class="mr-3 mb-2" @click="profileSubmit">Submit</vs-button>
                            </div>
                        </div>
                    </form>
                </vx-card>
            </div>
        </div>
    </div>
</template>

<script>
    import firebase from 'firebase/app'
    require('firebase/firestore')
    import 'firebase/auth'
    import moment from 'moment'
    export default {

        data() {
            return {
                name: '',
                email: '',
                mobile: '',
                password: ''
            }
        },
        computed: {
            mediaType() {
                return (media) => {
                    if (media.img) {
                        const ext = media.img.split('.').pop();
                        if (this.mediaExtensions.img.includes(ext)) return 'image'
                    } else if (media.sources && media.poster) {
                        return 'video'
                    }
                }
            },
            playerOptions() {
                return (media) => {
                    return {
                        height: '360',
                        fluid: true,
                        autoplay: false,
                        muted: true,
                        language: 'en',
                        playbackRates: [0.7, 1.0, 1.5, 2.0],
                        sources: media.sources,
                        poster: media.poster,
                    }
                }
            }
        },
        created(){
        },
        methods: {
            notifyAlreadyLogedIn() {
                this.$vs.notify({
                    title: 'Login Attempt',
                    text: 'Trainer created Successfully!',
                    iconPack: 'feather',
                    icon: 'icon-alert-circle',
                    color: 'success'
                });
            },
            profileSubmit() {
                const memberPayLoad = {
                    name: this.name ? this.name : '',
                    email: this.email ? this.email : '',
                    mobile: this.mobile ? this.mobile : '',
                    password: this.password ? this.password : ''
                }
                firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
                    .then((user) => {
                        firebase.firestore().collection("users").doc(user.user.uid).set(memberPayLoad, {merge: true})
                        this.notifyAlreadyLogedIn();
                        return false;
                    })
                firebase.firestore().collection('users')
                    .doc(localStorage.getItem('uid')).get()
                    .then(snap => {
                        return snap.ref.update(memberPayLoad);
                    })
                    .then(() => {
                        console.log('Successfully updated the record')
                        console.log('Successfully updated the record')
                    })
                    .catch(error => {
                        console.error('There was an error editing the record: ' + error)
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
                        this.mobile = data['mobile'];
                        // Member Detail Data
                        this.dateofbirth = this.customFormatter(memberObj['dateofbirth']);
                        this.gender = memberObj['gender'];
                        this.height = memberObj['height'];
                        this.weight = memberObj['weight'];
                        this.program_opted = memberObj['program_opted'];
                        this.program_type = memberObj['program_type'];
                        this.tenure = memberObj['tenure'];
                        this.health_issue = memberObj['health_issue'];
                        this.health_issue_desc = memberObj['health_issue_desc'];
                        this.food_kind1 = memberObj['food_kind1'];
                        this.food_kind2 = memberObj['food_kind2'];
                        this.food_kind3 = memberObj['food_kind3'];
                        this.food_kind4 = memberObj['food_kind4'];
                        this.food_kind5 = memberObj['food_kind5'];
                        this.food_alergy = memberObj['food_alergy'];
                        this.food_alergy_desc = memberObj['food_alergy_desc'];
                        this.medication = memberObj['medication'];
                        this.pictures = memberObj['pictures'];
                        this.pictures_terms_check = memberObj['pictures_terms_check'];
                        this.special_request = memberObj['special_request'];
                        this.message = memberObj['message'];
                    })
                    .then(() => {
                        console.log('Successfully get user detail.')
                    })
                    .catch(error => {
                        console.error('There was an error editing the record: ' + error)
                    })
            },
            loadContent() {
                this.$vs.loading()
                setTimeout(() => {
                    this.$vs.loading.close()
                }, 4000);
            },
            customFormatter(date) {
                return date
            }
        },
        mounted() {
            this.wasSidebarOpen = this.$store.state.reduceButton;
            this.$store.commit('TOGGLE_REDUCE_BUTTON', true)
        },
        beforeDestroy() {
            if (!this.wasSidebarOpen) this.$store.commit('TOGGLE_REDUCE_BUTTON', false)
        },
        components: {}
    }
</script>

<style>
    #form {
        width: 650px;
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
</style>
