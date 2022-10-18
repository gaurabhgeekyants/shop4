<!-- =========================================================================================
    File Name: add Sale form
    Description: These Details are added by Admin
     ========================================================================================== -->

<template>
    <vs-sidebar click-not-close position-right parent="body" default-index="1" color="primary"
                class="add-new-data-sidebar items-no-padding" spacer v-model="isSidebarActiveLocal">
        <div class="mt-6 flex items-center justify-between px-6">
            <h4 v-if="!addNewFlag">Edit Sale</h4>
            <h4 v-if="addNewFlag">Add Sale</h4>
            <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
        </div>
        <vs-divider class="mb-0"></vs-divider>

        <VuePerfectScrollbar class="scroll-area--data-list-add-new pt-4 pb-6" :settings="settings">

            <div class="p-6">
                <!-- NAME -->
                <vs-input
                        v-validate="'required'"
                        data-vv-validate-on="blur"
                        name="name"
                        label="Name"
                        v-model="name"
                        class="mt-1 w-full"/>
                <span class="text-danger text-sm">{{ errors.first('name') }}</span>
                <!-- Email -->
                <vs-input
                        v-validate="'required|email'"
                        data-vv-validate-on="blur"
                        name="email"
                        label="Email"
                        v-model="email"
                        class="w-full no-icon-border"/>
                <span class="text-danger text-sm">{{ errors.first('email') }}</span>
                <label style="font-size: 11.9px;display: block;" class="mt-1 ml-2">Mobile</label>
                <VuePhoneNumberInput v-model="mobile" @update="onUpdate" :default-country-code="countryCode"
                                     class="w-full" name="mobile" placeholder="Mobile"/>
                <span class="text-danger text-sm" v-if="phoneValid===false">Please enter Your Valid Mobile Number</span>

                <div v-if="addNewFlag">
                    <vs-input
                            data-vv-validate-on="blur"
                            v-validate="'required|min:6'"
                            :type="passwordFieldType"
                            name="password"
                            label="Password"
                            v-model="password" class="w-full no-icon-border"
                    />
                    <feather-icon icon="EyeIcon" @click="visiblePassword" class="inline-block mr-2 cstm-icon"
                                  svgClasses="w-5 h-5"></feather-icon>

                    <span class="text-danger text-sm">{{ errors.first('password') }}</span>
                </div>
                <br/>
                <div class="vx-col w-full mb-6 mt-6">
                    <span>Gender</span>
                    <ul class="demo-alignment">
                        <li class="mt-2">
                            <label class="vs-component con-vs-radio vs-radio-primary">
                                <vs-radio v-model="gender" name="gender" vs-value="male">Male</vs-radio>
                            </label>
                        </li>
                        <li class="mt-2">
                            <label class="vs-component con-vs-radio vs-radio-primary">
                                <vs-radio v-model="gender" name="gender" vs-value="female">female</vs-radio>
                            </label>
                        </li>
                    </ul>
                    <span v-show="this.gender==''" class="text-danger text-sm">The gender field is required</span>
                </div>
                <div class="vx-row mb-12">
                    <div class="vx-col mb-2">
                        <input type="file" class="w-full" @change="detectFiles($event.target.files)"
                               accept="image/jpeg">
                        <img @click="deleteImage($event.target.src)" v-show="profileUrl != ''"
                             :src="profileUrl ? profileUrl : '../../../assets/images/pages/bg-avatar.png'"
                             style="width: 50px; height: 50px; margin:10px 6px 0 0;">
                    </div>
                </div>
            </div>
        </VuePerfectScrollbar>

        <div class="flex flex-wrap items-center justify-center p-6" slot="footer">
            <vs-button @click="updateSale()" v-if="!addNewFlag" class="mr-6 saving-btn">Update</vs-button>
            <vs-button @click="saveSale()" v-if="addNewFlag" class="mr-6 saving-btn">Save</vs-button>
            <vs-button type="border" color="danger" @click="isSidebarActiveLocal = false">Cancel</vs-button>
        </div>
    </vs-sidebar>
</template>

<script>
    import VuePerfectScrollbar from 'vue-perfect-scrollbar'
    import firebase from 'firebase/app'
    require('firebase/firestore')
    import storage from 'firebase/storage'
    import axios from 'axios';
    import VuePhoneNumberInput from 'vue-phone-number-input';
    import 'vue-phone-number-input/dist/vue-phone-number-input.css';

    export default {
        props: {
            isSidebarActive: {
                type: Boolean,
                required: true
            },
            saleUID: '',
            addNewFlag: false
        },
        data() {
            return {
                phoneValid: '',
                mobileFormat: '',
                countryCode: 'IN',
                passwordFieldType: 'password',
                sales: [],
                images: [],
                name: '',
                email: '',
                mobile: '',
                password: '',
                pictures: {},
                gender: '',
                progressUpload: 0,
                file: File,
                uploadTask: '',
                picturesTemp: {},
                downloadURL: '',
                uploadEnd: false,
                uid: '',
                profileUrl: '',
                settings: {
                    // perfectscrollbar settings
                    maxScrollbarLength: 60,
                    wheelSpeed: .60,
                },
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
            onUpdate (payload) {
                this.countryCode = payload.countryCode
                this.mobile = payload.phoneNumber
                this.mobileFormat = payload.formatInternational
                this.phoneValid = payload.isValid
            },
            visiblePassword(){
                this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password'
            },
            initValues() {
                if (this.saleUID != '') {
                    firebase.firestore().collection('users').doc(this.saleUID).get().then((doc) => {
                        let value = doc.data();
                        this.name = value.name;
                        this.email = value.email;
                        this.mobile = value.mobile;
                        this.countryCode = value.countryCode ? value.countryCode : 'IN';
                        this.mobileFormat = value.mobileFormat ? value.mobileFormat : '',
                            this.profileUrl = value.profileUrl;
                        this.gender = value.gender;
                    })
                } else {
                    this.name = '';
                    this.email = '';
                    this.mobile = '';
                    this.countryCode = 'IN';
                    this.mobileFormat = '';
                    this.password = '';
                    this.profileUrl = '';
                    this.gender = 'male';
                }
                return false;
            },
            updateSale(){
                this.$validator.validateAll().then(result => {
                    if (result) {
                        this.loadContent()
                        if (this.picturesTemp.length > 0) {
                            let storageRef = firebase.storage().ref(this.uid + '/' + this.picturesTemp[0].name);
                            this.uploadTask = storageRef.put(this.picturesTemp[0]);
                            this.picturesTemp = {}
                        }
                        firebase.firestore().collection('users').doc(this.saleUID).get()
                            .then(snap => {
                                return snap.ref.update({
                                    name: this.name,
                                    email: this.email,
                                    mobile: this.mobile,
                                    countryCode: this.countryCode ? this.countryCode : 'IN',
                                    mobileFormat: this.mobileFormat ? this.mobileFormat : '',
                                    profileUrl: this.profileUrl,
                                    gender: this.gender,
                                });
                            })
                            .then(() => {
                                this.isSidebarActiveLocal = false
                                this.$vs.notify({
                                    title: this.name + ' Record',
                                    text: 'Successfully Update!',
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
                    } else {
                    }
                })
            },
            saveSale(){
                this.$validator.validateAll().then(result => {
                    if (result) {
                        this.saveData()
                        if (this.picturesTemp.length > 0) {
                            let storageRef = firebase.storage().ref(this.uid + '/' + this.picturesTemp[0].name);
                            this.uploadTask = storageRef.put(this.picturesTemp[0]);
                            this.picturesTemp = {}
                        }
                    } else {
                    }
                })

            },
            saveData(){
                this.loadContent()
                const memberPayLoad = {
                    name: this.name ? this.name : '',
                    email: this.email ? this.email : '',
                    mobile: this.mobile ? this.mobile : '',
                    countryCode: this.countryCode ? this.countryCode : 'IN',
                    mobileFormat: this.mobileFormat ? this.mobileFormat : '',
                    gender: this.gender ? this.gender : '',
                    role: 'sale',
                    status: true,
                    profileUrl: this.profileUrl,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                }

                firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
                    .then((user) => {
                        this.uid = user.user.uid
                        firebase.firestore().collection("users").doc(this.uid).set(memberPayLoad, {merge: true}).then(() => {
                            if (this.picturesTemp.length > 0) {
                                let storageRef = firebase.storage().ref(this.uid + '/' + this.picturesTemp[0].name);
                                this.uploadTask = storageRef.put(this.picturesTemp[0]);
                                this.picturesTemp = {}
                            }
                        })
                    })
                    .then(() => {
                            this.isSidebarActiveLocal = false
                            const formData = new FormData();
                            formData.append('name', this.name);
                            formData.append('email', this.email);
                            formData.append('password', this.password);
                            formData.append('subject', 'Welcome to Xtreme Performance');
                            formData.append('type', 'accountCredential');

                            axios.post('https://backend.xtremeperformance.co.in/mailer/email.php', formData, {'Access-Control-Allow-Origin': '*'})
                                .then(response => {
                                    console.log(response)
                                }).catch(e => {
                                console.log(e)
                            })
                            this.$vs.notify({
                                title: 'Account Created',
                                text: 'Successfully Created!',
                                iconPack: 'feather',
                                icon: 'icon-check',
                                color: 'success'
                            });
                            this.isSidebarActiveLocal = false
                        },
                        (error) => {
                            this.$vs.notify({
                                title: 'Error',
                                text: error.message,
                                iconPack: 'feather',
                                icon: 'icon-alert-circle',
                                color: 'danger'
                            });
                        })
            },
            detectFiles(fileList){
                this.picturesTemp = fileList
            },
            updateImage(){
                let user = this.saleUID ? this.saleUID : this.uid
                firebase.firestore().collection('users').doc(user).get()
                    .then(snap => {
                        snap.ref.update({profileUrl: this.profileUrl});
                        this.isSidebarActiveLocal = false

                    })
                    .then(() => {
                        console.log('Successfully updated the record image')
                    })
                    .catch(error => {
                        console.error('There was an error editing the record: ' + error)
                    })
            },
            loadContent() {
                this.$vs.loading()
                setTimeout(() => {
                    this.$vs.loading.close()
                }, 1000);
            },
        },
        components: {
            VuePerfectScrollbar,
            VuePhoneNumberInput,
        },
        watch: {
            uploadTask: function () {
                this.uploadTask.on('state_changed', () => {
                    },
                    null,
                    () => {
                        this.uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
                            if (downloadURL != '') {
                                this.profileUrl = downloadURL
                                this.updateImage()
                            }
                        })
                    })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .cstm-icon {
        font-weight: 700;
        float: right;
        bottom: 28px;
        z-index: 9999;
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
</style>
