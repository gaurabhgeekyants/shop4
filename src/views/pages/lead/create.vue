<!-- =========================================================================================
    File Name: add Leads form
    Description: These Details are added by Sales
     ========================================================================================== -->

<template>

    <div id="form2" class="sale-form create-lead">

        <div class="vx-row">
            <div class="vx-col w-full mb-base" style="margin: 0 auto;">
                <vx-card title="">
                    <div class="vx-row">
                        <div class="vx-col lg:w-1/2 sm:w-1/2">
                            <div class="vx-row">
                                <div class="vx-col w-full ml-auto mb-4">
                                    <h4>Personal Info</h4>
                                </div>
                            </div>
                            <div class="vs-component vs-divider"><span
                                    class="vs-divider-border after vs-divider-border-default"
                                    style="width: 100%; border-top: 1px solid rgba(0, 0, 0, 0.1);"></span><!----><span
                                    class="vs-divider-border before vs-divider-border-default"
                                    style="width: 100%; border-top: 1px solid rgba(0, 0, 0, 0.1);"></span></div>

                            <div class="vx-row">
                                <div class="vx-col lg:w-1/2 sm:w-1/2 mb-6">
                                    <span class="mb-3">First Name</span>
                                    <vs-input
                                            v-validate="'required'"
                                            data-v v-validate-on="blur"
                                            name="first_name"
                                            v-model="first_name"
                                            class="mt-1 w-full"/>
                                    <span class="text-danger text-sm"
                                          v-show="errors.has('first_name')">{{ errors.first('first_name') }}</span>
                                </div>

                                <div class="vx-col lg:w-1/2 sm:w-1/2 mb-6">
                                    <span class="mb-3">Last Name</span>
                                    <vs-input
                                            v-validate="'required'"
                                            data-vv-validate-on="blur"
                                            name="last_name"
                                            v-model="last_name"
                                            class="mt-1 w-full"/>
                                    <span class="text-danger text-sm"
                                          v-show="errors.has('last_name')">{{ errors.first('last_name') }}</span>
                                </div>
                            </div>

                            <div class="vx-row">
                                <div class="vx-col lg:w-1/2 sm:w-1/2 mb-6">
                                    <span class="mb-3">Email</span>
                                    <vs-input
                                            v-validate="'required|email'"
                                            data-vv-validate-on="blur"
                                            name="email"
                                            v-model="email"
                                            class="w-full no-icon-border"/>
                                    <span class="text-danger text-sm"
                                          v-show="errors.has('email')">{{ errors.first('email') }}</span>
                                </div>

                                <div class="vx-col lg:w-1/2 sm:w-1/2 mb-6">
                                    <span class="mb-3">Occupation</span>
                                    <vs-input
                                            v-validate="'required'"
                                            data-vv-validate-on="blur"
                                            name="occupation"
                                            v-model="occupation"
                                            class="w-full no-icon-border"/>
                                    <span class="text-danger text-sm"
                                          v-show="errors.has('occupation')">{{ errors.first('occupation') }}</span>
                                </div>
                            </div>
                            <div class="vx-row">
                                <div class="vx-col lg:w-1/2 sm:w-1/2 mb-6">
                                    <span class="mb-3">Lead Source</span>
                                    <select name="lead_source" v-validate="'required'" v-model="lead_source"
                                            class="w-full"
                                            style=" height: 38px; padding: 5px 10px; border-radius: 3px;border: 1px solid rgb(115, 103, 240) !important;">
                                        <option value="" selected>Lead Source</option>
                                        <option v-for="option in source" :value="option.value">{{ option.label }}
                                        </option>
                                    </select>
                                    <span class="text-danger text-sm"
                                          v-show="errors.has('lead_source')">{{ errors.first('lead_source') }}</span>
                                </div>
                                <div class="vx-col lg:w-1/2 sm:w-1/2 mb-6">
                                    <span class="mb-3">Lead Status</span>

                                    <select name="lead_status" v-validate="'required'" v-model="lead_status"
                                            class="w-full"
                                            style=" height: 38px; padding: 5px 10px; border-radius: 3px;border: 1px solid rgb(115, 103, 240) !important;">
                                        <option value="" selected>Lead Status</option>
                                        <option v-for="option in status" :value="option.value">{{ option.label }}
                                        </option>
                                    </select>
                                    <span class="text-danger text-sm"
                                          v-show="errors.has('lead_status')">{{ errors.first('lead_status') }}</span>
                                </div>
                            </div>
                            <div class="vx-row">
                                <div class="vx-col lg:w-1/2 sm:w-1/2 mb-6">
                                    <span class="mb-3">Mobile Phone</span>
                                    <VuePhoneNumberInput v-model="phone" @update="onUpdate"
                                                         :default-country-code="countryCode" class="w-full"
                                                         name="mobile" placeholder="Mobile Phone Number"/>
                                    <span class="text-danger text-sm" v-if="phoneValid===false">Please enter Your Valid Mobile Phone Number</span>

                                </div>


                                <div class="vx-col lg:w-1/2 sm:w-1/2 mb-6">
                                    <span class="mb-3">Home Phone</span>
                                    <VuePhoneNumberInput v-model="home_phone" @update="onUpdateHome"
                                                         :default-country-code="homeCountryCode" class="w-full"
                                                         name="home_number" placeholder="Home Phone Number"/>
                                    <span class="text-danger text-sm" v-if="homeNoValid ===false">Please enter Your Valid Home Phone Number</span>

                                </div>
                            </div>

                            <div class="vx-row">
                                <div class="vx-col lg:w-1/2 sm:w-1/2 mb-6">
                                    <span class="mb-3">Office phone</span>
                                    <VuePhoneNumberInput v-model="office_phone" @update="onUpdateOffice"
                                                         :default-country-code="officeCountryCode" class="w-full"
                                                         name="office_number" placeholder="Office Phone Number"/>
                                    <span class="text-danger text-sm" v-if="officeNoValid ===false">Please enter Your Valid Office Phone Number</span>

                                </div>


                                <div class="vx-col lg:w-1/2 sm:w-1/2 mb-6">
                                    <span class="mb-3">Contact Mode.</span>
                                    <select name="contact_mode" v-validate="'required'" v-model="contact_mode"
                                            class="w-full"
                                            style=" height: 38px; padding: 5px 10px; border-radius: 3px;border: 1px solid rgb(115, 103, 240) !important;">
                                        <option value="" selected>Contact Mode</option>
                                        <option v-for="option in contactMode" :value="option.value">{{ option.label }}
                                        </option>
                                    </select>
                                    <span class="text-danger text-sm"
                                          v-show="errors.has('contact_mode')">{{ errors.first('contact_mode') }}</span>
                                </div>
                            </div>
                            <div class="vx-row">
                                <div class="vx-col lg:w-1/2 sm:w-1/2 mb-6">
                                    <span class="mb-3">Next Contact Schedule</span>
                                    <flat-pickr name="next_contact_schedule" v-validate="'required'"
                                                :config="configdateTimePicker" class="w-full" v-model="next_contact"
                                                placeholder="Next Contact Schedule" style="width: 100%;"/>
                                    <!--<span class="text-danger text-sm" v-if="next_contact==true">Next Contact Made is Required</span>-->
                                    <span class="text-danger text-sm"
                                          v-show="errors.has('next_contact_schedule')">{{ errors.first('next_contact_schedule')
                                        }}</span>
                                </div>

                                <div class="vx-col lg:w-1/2 sm:w-1/2 mb-6">
                                    <span class="mb-3">Last Contact Made</span>
                                    <flat-pickr name="last_contact_made" v-validate="'required'"
                                                :config="configdateTimePicker" class="w-full" v-model="last_contact"
                                                placeholder="Last Contact Made" style="width: 100%;"/>
                                    <!--<span class="text-danger text-sm" v-if="last_contact==true">Last Contact Made is Required</span>-->
                                    <span class="text-danger text-sm"
                                          v-show="errors.has('last_contact_made')">{{ errors.first('last_contact_made')
                                        }}</span>

                                </div>
                                <!--<div class="vx-col w-full mb-6">-->
                                <!--&lt;!&ndash;                  <div class="vx-col w-full">&ndash;&gt;-->
                                <!--&lt;!&ndash;<span class="mb-3">Contact  Comment</span>&ndash;&gt;-->
                                <!--<div class="mt-5">-->
                                <!--<div  class="vs-component vs-con-textarea vs-textarea-primary"-->
                                <!--style="border: 1px solid rgba(0, 0, 0, 0.08);">-->
                                <!--<textarea class="vs-textarea" v-validate="'required|alpha_spaces'" name="Lead Comment" v-model="lead_comment" style="height:150px;"></textarea>-->
                                <!--</div>-->
                                <!--<span class="text-danger text-sm" v-show="errors.has('Lead Comment')">{{ errors.first('Lead Comment') }}</span>-->
                                <!--</div>-->
                                <!--&lt;!&ndash;                  </div>&ndash;&gt;-->
                                <!--</div>-->

                            </div>


                        </div>
                        <div class="vx-col lg:w-1/2 sm:w-1/2">
                            <div class="vx-row">
                                <div class="vx-col w-full ml-auto mb-4">
                                    <h4>Select Trainer Category</h4>
                                </div>
                            </div>
                            <div class="vs-component vs-divider"><span
                                    class="vs-divider-border after vs-divider-border-default"
                                    style="width: 100%; border-top: 1px solid rgba(0, 0, 0, 0.1);"></span><!----><span
                                    class="vs-divider-border before vs-divider-border-default"
                                    style="width: 100%; border-top: 1px solid rgba(0, 0, 0, 0.1);"></span></div>

                            <div class="vx-row mb-6 mt-6">
                                <div class="vx-col w-full ml-auto mb-4">
                                    <span>Select Trainer Category</span>
                                </div>
                                <div class="w-full">
                                    <vs-col v-for="(region, index) in trainer_category" :key="index">
                                        <vs-checkbox name="trainer_category" v-validate="'required'"
                                                     v-model="form.regions" :vs-value="region.id"
                                                     style="margin:0 0 10px;">{{ region.name
                                            }}
                                        </vs-checkbox>
                                    </vs-col>
                                    <span class="text-danger text-sm"
                                          v-show="errors.has('trainer_category')">{{errors.first('trainer_category')}}</span>

                                </div>

                            </div>

                        </div>
                    </div>


                    <div class="vx-row">
                        <div class="vx-col lg:w-1/1 md:w-1/1 sm:w-full w-full mb-6 mt-4">
                            <span class="mb-3">Your Comment</span>
                            <div class="vs-component vs-con-textarea vs-textarea-primary"
                                 style="border: 1px solid rgba(0, 0, 0, 0.08);">
                                <textarea class="vs-textarea" v-validate="'required'" name="comment" v-model="comment"
                                          style="height:150px;"></textarea>

                            </div>
                            <span class="text-danger text-sm" v-show="errors.has('comment')">{{ errors.first('comment')
                                }}</span>

                        </div>
                    </div>
                    <div class="vx-row">
                        <div class="vx-col w-full">
                            <vs-button class="mr-3 mb-2" id="button-save" @click="saveData()">Save
                            </vs-button>
                            <vs-button color="warning" type="border" class="mb-2">Cancel</vs-button>
                        </div>
                    </div>


                </vx-card>
            </div>
        </div>
    </div>

</template>
<script>
    import VuePerfectScrollbar from 'vue-perfect-scrollbar'
    import firebase from 'firebase/app'
    import vSelect from 'vue-select'
    import PhoneMaskInput from  "vue-phone-mask-input";

    require('firebase/firestore')
    import moment from 'moment'
    import Dropdown from 'vue-simple-search-dropdown';
    import datetime from 'vuejs-datetimepicker';
    import router from '@/router'
    import flatPickr from 'vue-flatpickr-component';
    import 'flatpickr/dist/flatpickr.css';
    import axios from 'axios';
    import {Validator} from 'vee-validate';
    import VuePhoneNumberInput from 'vue-phone-number-input';
    import 'vue-phone-number-input/dist/vue-phone-number-input.css';
    const dict = {
        custom: {
            first_name: {
                required: 'Please enter your first name',
                alpha_spaces: "Your first name may only contain alphabetic characters"
            },
            last_name: {
                required: 'Please enter your last name',
                alpha_spaces: "Your last name may only contain alphabetic characters"
            },
            email: {
                required: 'Please enter your email',
            },
            occupation: {
                required: 'Please enter your Occupation',

            },
            lead_source: {
                required: 'Please Select Lead Source',
            },
            lead_status: {
                required: 'Please Select Lead Status',
            },
            contact_mode: {
                required: 'Please Select Contact Mode',
            },
            trainer_category: {
                required: 'Please Select Trainer Category',
//                numeric: "Weight in KG only contain numeric characters"
            },
            next_contact_schedule: {
                required: 'Please Select Next Contact Schedule',
//                numeric: "Weight in lbs only contain numeric characters"
            },
            last_contact_made: {
                required: 'Please Select Last Contact Made'
                // alpha: "Your first name may only contain alphabetic characters"
            },
            comment: {
                required: 'Please Enter Comment'
            },

            Phone: {
                required: 'Please enter Comment'
            },
        }
    };

    // register custom messages
    Validator.localize('en', dict);
    export default {
        data() {
            return {
                phoneValid: '',
                countryCode: 'IN',
                mobileFormat: '',
                lead_comment: '',
                lead_comments: [],
                settings: {
                    maxScrollbarLength: 60,
                    wheelSpeed: .60,
                },
                datetime: null,
                configdateTimePicker: {
                    enableTime: true,
                    dateFormat: 'm-d-Y h:i'
                },
                options: [],
                contactLogs: [],
                comment: '',
                comments: [],
                status: [],
                source: [],
                trainer_category: [],
                form: {
                    regions: []
                },
                contactMode: [
                    {label: 'Email', value: 'email'},
                    {label: 'Whatsapp', value: 'whatsapp'},
                    {label: 'Sms', value: 'sms'},
                    {label: 'Phone', value: 'phone'}
                ],
                leadSource: {},
                selected: {name: null, id: null},
                first_name: '',
                last_name: '',
                email: '',
                phone: '',
                office_phone: '',
                home_phone: '',
                occupation: '',
                contact_mode: '',
                lead_source: '',
                lead_status: '',
                last_contact: '',
                next_contact: '',
                homeCountryCode: 'IN',
                officeCountryCode: 'IN',
                officeNoFormat: '',
                homeNoFormat: '',
                officeNoValid: '',
                homeNoValid: ''
            }
        },
        computed: {
            validateForm() {
                return !this.errors.any() && this.first_name != '' && this.last_name != '' && this.email != '' && this.mobile != '' && this.occupation != '' && this.comment != '';
            },
        },
        methods: {
            onUpdate (payload) {
                this.countryCode = payload.countryCode
                this.mobile = payload.phoneNumber
                this.mobileFormat = payload.formatInternational
                this.phoneValid = payload.isValid
            },
            onUpdateOffice (payload) {
                this.officeCountryCode = payload.countryCode
                this.office_phone = payload.phoneNumber
                this.officeNoFormat = payload.formatInternational
                this.officeNoValid = payload.isValid
            },
            onUpdateHome (payload) {
                this.homeCountryCode = payload.countryCode
                this.home_phone = payload.phoneNumber
                this.homeNoFormat = payload.formatInternational
                this.homeNoValid = payload.isValid

            },
            customFormatter(date) {
                return date != '' ? moment(date).format('MMMM Do YYYY h:i') : '';
            },
            prueba() {
                console.log("prueba de focsu");
            },
            initValues() {
            },
            saveTrainer() {
                this.saveData()
            },
            saveData() {

                this.$validator.validateAll().then(result => {
                    if (result) {
                        firebase.firestore().collection('leads').where('email', '==', this.email).get().then((querySnapshot) => {
                            if (querySnapshot.size > 0) {
                                this.$vs.notify({
                                    title: 'Error',
                                    text: 'This email is already been taken',
                                    iconPack: 'feather',
                                    icon: 'icon-alert-circle',
                                    color: 'danger'
                                });
                            } else {
                                this.loadContent()
                                var last_contact = [];
                                if (this.last_contact) {
                                    let last_contact_section = {
                                        created_by: JSON.parse(localStorage.getItem('userInfo')).displayName,
                                        comment: this.comment,
                                        created_at: moment().format('MMMM Do YYYY, h:mm:ss a'),// May 05th 2018, 7:20:58 pm
                                        last_contact_made: this.last_contact,
                                        contact_mode: this.contact_mode,
                                        next_contact_schedule: this.next_contact,
                                        uid: localStorage.getItem('uid'),
                                    }

                                    last_contact.push(last_contact_section)
                                }
                                let commentSection = {
                                    text: this.comment,
                                    created_by: JSON.parse(localStorage.getItem('userInfo')).displayName,//localStorage.getItem('displayName'),
                                    uid: localStorage.getItem('uid'),
                                    created_at: moment().format('MMMM Do YYYY, h:mm:ss a'),// May 05th 2018, 7:20:58 pm
                                };
                                this.comments.push(commentSection)
                                let leadCommentSection = {
                                    text: this.lead_comment,
                                    created_by: JSON.parse(localStorage.getItem('userInfo')).displayName,//localStorage.getItem('displayName'),
                                    uid: localStorage.getItem('uid'),
                                    created_at: moment().format('MMMM Do YYYY, h:mm:ss a'),// May 05th 2018, 7:20:58 pm
                                };
                                this.lead_comments.push(leadCommentSection)
                                const memberPayLoad = {
                                    first_name: this.first_name ? this.first_name : '',
                                    last_name: this.last_name ? this.last_name : '',
                                    email: this.email ? this.email : '',
                                    occupation: this.occupation ? this.occupation : '',
                                    phone: this.phone ? this.phone : '',
                                    mobileFormat: this.mobileFormat ? this.mobileFormat : '',
                                    countryCode: this.countryCode ? this.countryCode : 'IN',
                                    home_number: this.home_phone ? this.home_phone : '',
                                    homeCountryCode: this.homeCountryCode ? this.homeCountryCode : '',
                                    homeFormat: this.homeNoFormat ? this.homeNoFormat : '',
                                    office_number: this.office_phone ? this.office_phone : '',
                                    officeCountryCode: this.officeCountryCode ? this.officeCountryCode : 'IN',
                                    officeFormat: this.officeNoFormat ? this.officeNoFormat : '',
                                    lead_owner: localStorage.getItem('uid'),
                                    last_contact: last_contact,
                                    next_contact: this.next_contact,
                                    lead_source: this.lead_source,
                                    lead_status: this.lead_status,
                                    trainer_category: this.form.regions,
                                    contact_mode: this.contact_mode,
                                    comment: this.comments,
                                    lead_comment: this.lead_comments,
                                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                                }
                                firebase.firestore().collection("leads").add(
                                    memberPayLoad
                                )
                                    .then(() => {
                                            const formData = new FormData();
                                            formData.append('name', this.first_name + " " + this.last_name);
                                            formData.append('email', this.email);
                                            formData.append('subject', 'Welcome to Xtreme Performance');
                                            formData.append('type', 'welcome');
                                            axios.post('https://backend.xtremeperformance.co.in/mailer/email.php', formData, {'Access-Control-Allow-Origin': '*'})
                                                .then(response => {
                                                    console.log(response)
                                                }).catch(e => {
                                                console.log(e)
                                            })

                                        if (localStorage.getItem('userRole')=='admin') {
                                            router.push({name: 'page-lead'})
                                        }else{
                                            router.push({name: 'page-leads'})
                                        }
                                            this.$vs.notify({
                                                title: 'Lead Created Successfully!',
                                                text: '',
                                                iconPack: 'feather',
                                                icon: 'icon-check',
                                                color: 'success'
                                            });
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
                            }
                        })
                    } else {
                        // form have errors
                    }
                })


            },
            loadContent() {
                this.$vs.loading()
                setTimeout(() => {
                    this.$vs.loading.close()
                }, 3000);
            },
        },
        components: {
            flatPickr,
            'v-select': vSelect,
            VuePerfectScrollbar,
            Dropdown,
            datetime,
            moment,
            VuePhoneNumberInput,

        },
        created() {
            this.source = []
            this.form.regions = []
            firebase.firestore().collection('trainer-category').get().then((querySnapshot) => {
                // this.form.regions.push(querySnapshot.docs[0].id)
                querySnapshot.forEach((doc) => {
                    const trainer_categories = {
                        id: doc.id,
                        name: doc.data()['title']
                    }
                    this.trainer_category.push(trainer_categories)
                })
            })
            firebase.firestore().collection('lead_source').get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const source = {
                        value: doc.id,
                        label: doc.data()['title']
                    }
                    this.source.push(source)
                })
            })
            firebase.firestore().collection('lead_status').get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const status = {
                        value: doc.id,
                        label: doc.data()['title']
                    }
                    this.status.push(status)
                })
            })
        }
    }
</script>
<style lang="scss">
    .create-lead .month-setter,
    .create-lead .year-setter {
        text-align: center;
    }

    .create-lead .vs-checkbox-primary .vs-checkbox {
        border: 2px solid rgb(115, 103, 240) !important;
    }

    .create-lead .vs-input-primary .vs-input--input:focus {
        border: 1px solid rgba(var(--vs-primary), 1) !important;
    }

    .create-lead .vs-input-primary .vs-input--input {
        border: 1px solid rgba(var(--vs-primary), 1) !important;
    }

    .create-lead .vs-input--input:focus {
        -webkit-box-shadow: 2px 3px 10px 1px rgba(0, 0, 0, .15);
        box-shadow: 2px 3px 10px 1px rgba(0, 0, 0, .15);
    }

    .create-lead textarea.vs-textarea {
        border: 1px solid rgba(var(--vs-primary), 1) !important;
    }

    .create-lead .flatpickr-input.active {
        -webkit-box-shadow: 2px 3px 10px 1px rgba(0, 0, 0, .15);
        box-shadow: 2px 3px 10px 1px rgba(0, 0, 0, .15);
    }

    .create-lead .flatpickr-input {
        border: 1px solid #7367F0;
    }

    .create-lead .year-month-wrapper {
        background-color: #7367F0;
    }

    .nav-l,
    .nav-r,
    .activePort,
    .activePort:hover,
    .year-month-wrapper,
    li.active {
        background-color: #7367F0 !important;
    }

    .activePort,
    .activePort:hover {
        color: #fff !important;
    }

    .port.activePort:hover {
        color: #fff !important;
    }

    .days,
    .port:hover,
    .okButton {
        color: #7367F0 !important;
    }

    .create-lead .trainer-holder {
        overflow: hidden;
        padding: 20px;
        width: 90%;
        margin: 0 auto;
        border: 1px solid #e1e1e1;

        .create-lead ul {
            padding: 0;
            margin: 0;
            list-style: none;

            .create-lead li {
                width: 100%;
                padding: 10px 0;
                border-top: 1px solid #e1e1e1;

                .create-lead img {
                    margin: 0 20px 0 0;
                    display: inline-block;
                    vertical-align: middle;
                }

                .create-lead span {
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

    .create-lead .add-new-data-sidebar {
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
        font-size: 14px !important;
        padding: 6px 10px !important;
        border-radius: 5px !important;
        min-width: 100% !important;
        max-width: 100% !important;
        border: 1px solid rgba(0, 0, 0, .2) !important;

    }

    .dropdown .dropdown-content {
        min-width: 100% !important;
        max-width: 100% !important;
    }

    .dropdown .dropdown-content .dropdown-item {
        font-size: 14px !important;
        padding: 12px 16px !important;
        text-transform: capitalize;
    }

    .datetime-picker input {
        height: 37px;
        padding: 5px 10px;
        border-radius: 5px;
        border: 1px solid rgba(0, 0, 0, .2);
    }

    .wrraper-example input {
        border: 1px solid rgba(var(--vs-primary), 1) !important;
    }

    @media (max-width: 570px) {
        .sale-form {
            .vx-row > .vx-col {
                width: 100% !important;
            }
        }
    }
</style>
