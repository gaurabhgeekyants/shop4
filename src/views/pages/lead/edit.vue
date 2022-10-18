<!-- =========================================================================================
    File Name: EDit Leads form
    Description: These Details are added by Sales
     ========================================================================================== -->

<template>

    <div id="form2" class="sale-form edit-lead">

        <div class="vx-row">
            <div class="vx-col w-full mb-base" style="margin: 0 auto;">
                <div title="">
                    <div class="vx-row">
                        <div class="vx-col lg:w-1/2 sm:w-full mb-4">
                            <vx-card title="Personal Info">

                                <div class="vs-component vs-divider">
      <span class="vs-divider-border after vs-divider-border-default"
            style="width: 100%; border-top: 1px solid rgba(0, 0, 0, 0.1);">

      </span><!----><span class="vs-divider-border before vs-divider-border-default"
                          style="width: 100%; border-top: 1px solid rgba(0, 0, 0, 0.1);"></span></div>

                                <div class="vx-row">



                                    <div class="vx-col lg:w-1/2 sm:w-full w-full mb-6">
                                        <label>First Name</label>
                                        <vs-input
                                                v-validate="'required'"
                                                name="First Name"
                                                v-model="first_name"
                                                class="mt-1 w-full"/>
                                        <span class="text-danger text-sm"
                                              v-show="errors.has('First Name')">{{ errors.first('First Name') }}</span>
                                    </div>

                                    <div class="vx-col lg:w-1/2 sm:w-full w-full mb-6">
                                        <label>Last Name</label>
                                        <vs-input
                                                v-validate="'required'"
                                                name="Last Name"
                                                v-model="last_name"
                                                class="mt-1 w-full"/>
                                        <span class="text-danger text-sm"
                                              v-show="errors.has('Last Name')">{{ errors.first('Last Name') }}</span>
                                    </div>
                                </div>

                                <div class="vx-row">
                                    <div class="vx-col lg:w-1/2 sm:w-full w-full mb-6">
                                        <label>Email</label>
                                        <vs-input
                                                v-validate="'required|email'"
                                                name="Email"
                                                v-model="email"
                                                class="w-full no-icon-border" disabled/>
                                        <span class="text-danger text-sm"
                                              v-show="errors.has('Email')">{{ errors.first('Email') }}</span>
                                    </div>

                                    <div class="vx-col lg:w-1/2 sm:w-full w-full mb-6">
                                        <label>Occupation</label>
                                        <vs-input
                                                v-validate="'required'"
                                                name="Occupation"
                                                v-model="occupation"
                                                class="w-full no-icon-border"/>
                                        <span class="text-danger text-sm"
                                              v-show="errors.has('Occupation')">{{ errors.first('Occupation') }}</span>
                                    </div>
                                </div>

                                <div class="vx-row">
                                    <div class="vx-col lg:w-1/2 sm:w-full w-full mb-6">
                                        <label>Mobile</label>
                                        <template>
                                            <div>
                                                <VuePhoneNumberInput v-model="phone" @update="onUpdate"
                                                                     :default-country-code="countryCode" class="w-full"
                                                                     name="mobile" placeholder="Mobile"/>
                                            </div>
                                            <span class="text-danger text-sm" v-if="phoneValid===false">Please enter Your Valid Mobile Number</span>
                                        </template>
                                    </div>

                                    <div class="vx-col lg:w-1/2 sm:w-full w-full mb-6">
                                        <span class="mb-3">Home Phone</span>
                                        <VuePhoneNumberInput v-model="home_phone" @update="onUpdateHome"
                                                             :default-country-code="homeCountryCode" class="w-full"
                                                             name="home_number" placeholder="Home Phone Number"/>
                                        <span class="text-danger text-sm" v-if="homeNoValid ===false">Please enter Your Valid Home Phone Number</span>
                                    </div>
                                    <div class="vx-col lg:w-1/2 sm:w-1/2 mb-6">
                                        <span class="mb-3">Office phone</span>
                                        <VuePhoneNumberInput v-model="office_phone" @update="onUpdateOffice"
                                                             :default-country-code="officeCountryCode" class="w-full"
                                                             name="office_number" placeholder="Office Phone Number"/>
                                        <span class="text-danger text-sm" v-if="officeNoValid ===false">Please enter Your Valid Office Phone Number</span>

                                    </div>


                                    <div class="vx-col lg:w-1/2 sm:w-full w-full mb-6">
                                        <label>Lead Source</label>
                                        <select v-validate="'required'" name="Lead Source" v-model="lead_source"
                                                class="w-full"
                                                style=" height: 38px; padding: 5px 10px; border-radius: 3px;border: 1px solid rgb(115, 103, 240) !important;">
                                            <option v-for="option in source" :value="option.value">{{ option.label }}
                                            </option>
                                        </select>
                                        <span class="text-danger text-sm"
                                              v-show="errors.has('Lead Source')">{{ errors.first('"Lead Status')
                                            }}</span>
                                    </div>
                                </div>
                                <div class="vx-row">
                                    <div class="vx-col lg:w-1/2 sm:w-full w-full mb-6">
                                        <label>Lead Status</label>
                                        <select v-validate="'required'" name="Lead Status" v-model="lead_status"
                                                class="w-full"
                                                style=" height: 38px; padding: 5px 10px; border-radius: 3px;border: 1px solid rgb(115, 103, 240) !important;">
                                            <option v-for="option in status" :value="option.value">{{ option.label }}
                                            </option>
                                        </select>
                                        <span class="text-danger text-sm"
                                              v-show="errors.has('Lead Status')">{{ errors.first('"Lead Status')
                                            }}</span>

                                    </div>
                                </div>

                                <div class="vx-row mb-6">
                                    <div class="vx-col w-full ml-auto mb-4">
                                        <span>Select Trainer Category</span>
                                    </div>
                                    <div class="vx-col w-full">
                                        <vs-col v-for="(region, index) in trainer_category" :key="index">
                                            <vs-checkbox v-model="form.regions"
                                                         :checked="categories.includes(region.id)" :vs-value="region.id"
                                                         name="Trainer Category" v-validate="'required'"
                                                         style="margin:0 0 10px;">{{ region.name }}
                                            </vs-checkbox>
                                        </vs-col>
                                    </div>
                                    <span class="text-danger text-sm"
                                          v-show="errors.has('Trainer Category')">{{errors.first('Trainer Category')}}</span>

                                </div>
                            </vx-card>
                        </div>

                        <div class="vx-col lg:w-1/2 sm:w-full mb-4">
                            <vx-card title="Contact">


                                <div class="vs-component vs-divider">
      <span class="vs-divider-border after vs-divider-border-default"
            style="width: 100%; border-top: 1px solid rgba(0, 0, 0, 0.1);">

      </span>
                                    <span class="vs-divider-border before vs-divider-border-default"
                                          style="width: 100%; border-top: 1px solid rgba(0, 0, 0, 0.1);"></span></div>

                                <div class="vx-row">
                                    <div class="vx-col sm:w-full lg:w-1/2 sm:w-full w-full left-pull">

                                        <div class="mb-6">
                                            <span class="mb-3">Last Contact Made</span>
                                            <flat-pickr name="Last Contact Made" v-validate="'required'"
                                                        :config="configdateTimePicker" class="w-full"
                                                        v-model="last_contact" placeholder="Date Time"
                                                        style="width:100%; border: 1px solid rgb(115, 103, 240) !important;"/>
                                            <span class="text-danger text-sm" v-show="errors.has('Last Contact Made')">{{ errors.first('Last Contact Made')
                                                }}</span>

                                        </div>

                                    </div>
                                </div>

                                <div class="vx-row">
                                    <div class="vx-col sm:w-full lg:w-1/2 sm:w-full w-full left-pull">

                                        <div class="mb-6">
                                            <span class="mb-3">Next Contact Schedule</span>
                                            <flat-pickr name="Next Contact Schedule" v-validate="'required'"
                                                        :config="configdateTimePicker" class="w-full"
                                                        v-model="next_contact" placeholder="Date Time"
                                                        style="width:100%; border: 1px solid rgb(115, 103, 240) !important;"/>
                                            <span class="text-danger text-sm"
                                                  v-show="errors.has('Next Contact Schedule')">{{ errors.first('Next Contact Schedule')
                                                }}</span>
                                        </div>
                                    </div>
                                </div>


                                <!--End Row-->
                                <div class="vx-row">
                                    <div class="vx-col sm:w-full lg:w-full">

                                        <div class="mb-6">
                                            <label>Contact Mode</label>
                                            <ul class="demo-alignment">

                                                <li v-for="option in contactMode" v-bind:key="option">
                                                    <vs-radio v-validate="'required'" name="gender"
                                                              v-model="contact_mode"
                                                              :selected="contact_mode.value == option.value"
                                                              :vs-value="option.value">{{ option.text }}
                                                    </vs-radio>
                                                </li>
                                                <span class="text-danger text-sm"
                                                      v-show="errors.has('gender')">{{ errors.first('gender') }}</span>
                                            </ul>
                                        </div>
                                        .
                                    </div>

                                </div>

                                <div class="vx-row mt-8">
                                    <div class="vx-col w-full">
                                        <span>Your Comment</span>
                                        <div class="mt-5">
                                            <div class="vs-component vs-con-textarea vs-textarea-primary"
                                                 style="border: 1px solid rgba(0, 0, 0, 0.08);">
                                                <textarea class="vs-textarea" name="Comment" v-model="comment"
                                                          style="height:150px;" v-validate="'required'"></textarea>
                                            </div>
                                            <span class="text-danger text-sm"
                                                  v-show="errors.has('Comment')">{{ errors.first('Comment') }}</span>
                                        </div>
                                    </div>
                                </div>

                                <div class="vx-row">
                                    <div class="vx-col w-full">
                                        <vs-button class="mr-3 mb-2" @click="saveData">Save</vs-button>
                                    </div>
                                </div>
                            </vx-card>

                        </div>
                    </div>
                </div>

                <vs-popup class="holamundo" title="Comments" :active.sync="popupActive">
                    <p>
                    {{popupComment}}
                    </p>
                </vs-popup>
                <vx-card title="Contact Logs" class="mt-6">


                    <div class="vs-component vs-divider">
      <span class="vs-divider-border after vs-divider-border-default"
            style="width: 100%; border-top: 1px solid rgba(0, 0, 0, 0.1);">

      </span>
                        <span class="vs-divider-border before vs-divider-border-default"
                              style="width: 100%; border-top: 1px solid rgba(0, 0, 0, 0.1);"></span></div>

                    <vs-table
                            stripe
                            pagination
                            max-items="5"
                            :data="contact_log">

                        <template slot="thead">

                            <vs-th>
                                Agent
                            </vs-th>
                            <vs-th>
                                Updated
                            </vs-th>
                            <vs-th>
                                Comment
                            </vs-th>
                            <vs-th>
                                Last
                            </vs-th>
                            <vs-th>
                                Next
                            </vs-th>
                        </template>

                        <template slot-scope="{data}">
                            <vs-tr :key="indextr" v-for="(tr, indextr) in data">

                                <vs-td :data="data[indextr].created_by" style="font-size: 12px;">
                                    {{data[indextr].created_by}}
                                </vs-td>

                                <vs-td :data="data[indextr].created_at" style="font-size: 12px;">
                                    {{data[indextr].created_at}}
                                </vs-td>
                                <vs-td :data="data[indextr].comment" style="text-align: left; padding-left: 25px;">
                                        <feather-icon @click="popupActive=true,popupComment=data[indextr].comment"  icon="EyeIcon" svgClasses="h-4 w-4" style="cursor:pointer;"/>

                                </vs-td>

                                <vs-td :data="data[indextr].last_contact_made" style="font-size: 12px;">
                                    {{data[indextr].last_contact_made}}
                                </vs-td>
                                <vs-td :data="data[indextr].next_contact_schedule" style="font-size: 12px;">
                                    {{data[indextr].next_contact_schedule}}
                                </vs-td>
                            </vs-tr>
                        </template>
                    </vs-table>


                </vx-card>
            </div>

        </div>
    </div>


</template>
<script>
    import VuePerfectScrollbar from 'vue-perfect-scrollbar'
    import firebase from 'firebase/app'
    import vSelect from 'vue-select'


    require('firebase/firestore')
    import moment from 'moment'
    import Dropdown from 'vue-simple-search-dropdown';
    import datetime from 'vuejs-datetimepicker';
    import router from '@/router'
    import flatPickr from 'vue-flatpickr-component';
    import 'flatpickr/dist/flatpickr.css';
    import PhoneMaskInput from  "vue-phone-mask-input";
    import VuePhoneNumberInput from 'vue-phone-number-input';
    import 'vue-phone-number-input/dist/vue-phone-number-input.css';
    export default {
        data() {
            return {
                popupComment:'',
                popupActive: false,
                colorAlert:'primary',
                titleAlert:'Alert',
                activeAlert:false,
                valueInput:'',
                phoneValid: '',
                countryCode: '',
                mobileFormat: '',
                contact_mode: '',
                lead_source: '',
                settings: {
                    maxScrollbarLength: 60,
                    wheelSpeed: .60,
                },
                datetime: null,
                configdateTimePicker: {
                    enableTime: true,
                    dateFormat: 'm-d-Y H:i'
                },

                leadID: this.$route.params.docID,
                next_contact: '',
                last_contact: '',
                options: [],
                contactLogs: [],
                comment: '',
                comments: [],
                lead_comment: '',
                lead_comments: [],
                contact_log: [],
                categories: [],
                status: [],
                source: [],
                trainer_category: [],
                form: {
                    regions: []
                },
                contactMode: [
                    {text: 'Email', value: 'email'},
                    {text: 'Whatsapp', value: 'whatsapp'},
                    {text: 'Sms', value: 'sms'},
                    {text: 'Phone', value: 'phone'}
                ],
                leadSource: {},
                images: [],
                first_name: '',
                last_name: '',
                email: '',
                user_email: '',
                phone: '',
                occupation: '',
                office_phone: '',
                home_phone: '',
                homeCountryCode: 'IN',
                officeCountryCode: 'IN',
                officeNoFormat: '',
                homeNoFormat: '',
                officeNoValid: '',
                homeNoValid: ''
            }
        },
        computed: {
            // PROFILE
            user_displayName() {
                return JSON.parse(localStorage.getItem('userInfo')).displayName
            },
        },
        methods: {
            openAlert(color){
//                this.colorAlert = 'primary'
                this.$vs.dialog({
//                    color:this.colorAlert,
                    title: `Comments`,
                    text:color,// 'I love soufflé lollipop liquorice wafer jelly-o halvah sesame snaps. Pastry chocolate cake jelly-o carrot cake jelly topping croissant ice cream.',
                })
            },
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

            contactDateFormat(date){
                return date != '' ? moment(date).format('dd') : '';//MM DD YYYY, hh:mm
            },

            dateFormat(date) {
                return date != '' ? moment(date).format('dddd, MMMM Do YYYY, h:mm A') : '';
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
                            this.loadContent()
                            if (this.comment) {
                                let commentSection = {
                                    text: this.comment,
                                    created_by: JSON.parse(localStorage.getItem('userInfo')).displayName,//localStorage.getItem('displayName'),
                                    uid: localStorage.getItem('uid'),
                                    created_at: moment().format('MM-DD-YYYY, h:mm:ss'),// May 05th 2018, 7:20:58 pm
                                };
                                this.comments.push(commentSection)
                            }
                            if (this.lead_comment) {
                                let leadCommentSection = {
                                    text: this.lead_comment,
                                    created_by: JSON.parse(localStorage.getItem('userInfo')).displayName,//localStorage.getItem('displayName'),
                                    uid: localStorage.getItem('uid'),
                                    created_at: moment().format('MM-DD-YYYY, hh:mm:ss'),// May 05th 2018, 7:20:58 pm
                                };
                                this.lead_comments.push(leadCommentSection)
                            }
                            if (this.last_contact && this.contactLogs[this.contactLogs.length - 1] != this.last_contact) {
                                let last_contact_section = {
                                    created_by: JSON.parse(localStorage.getItem('userInfo')).displayName,
                                    comment: this.comment,
                                    created_at: moment().format('MM DD YYYY, hh:mm:ss'),
                                    last_contact_made: this.last_contact,
                                    contact_mode: this.contact_mode,
                                    next_contact_schedule: this.next_contact,
                                    uid: localStorage.getItem('uid'),
                                }
                                this.contactLogs.push(last_contact_section)
                            }
                            const memberPayLoad = {
                                first_name: this.first_name ? this.first_name : '',
                                last_name: this.last_name ? this.last_name : '',
                                occupation: this.occupation ? this.occupation : '',
                                phone: this.phone ? this.phone : '',
                                lead_owner: localStorage.getItem('uid'),
                                last_contact: this.contactLogs,
                                next_contact: this.next_contact,
                                lead_source: this.lead_source,
                                lead_status: this.lead_status,
                                trainer_category: this.form.regions,
                                contact_mode: this.contact_mode,
                                comment: this.comments,
                                lead_comment: this.lead_comments,
                                countryCode: this.countryCode ? this.countryCode : 'IN',
                                mobileFormat: this.mobileFormat ? this.mobileFormat : '',
                                home_number: this.home_phone ? this.home_phone : '',
                                homeCountryCode: this.homeCountryCode ? this.homeCountryCode : '',
                                homeFormat: this.homeNoFormat ? this.homeNoFormat : '',
                                office_number: this.office_phone ? this.office_phone : '',
                                officeCountryCode: this.officeCountryCode ? this.officeCountryCode : 'IN',
                                officeFormat: this.officeNoFormat ? this.officeNoFormat : '',
                            }

                            firebase.firestore().collection("leads").doc(this.leadID).set(memberPayLoad, {merge: true})
                                .then(() => {
                                    console.log('Successfully updated the record')
                                    this.comment = ''
                                    this.lead_comment = ''
                                    this.$vs.notify({
                                        title: 'Lead Updated!',
                                        text: 'Successfully',
                                        iconPack: 'feather',
                                        icon: 'icon-check',
                                        color: 'success'
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
                        })
                    } else {
                        // form have errors
                    }
                })
            },
            getLead() {
                firebase.firestore().collection('leads').doc(this.leadID).onSnapshot((querySnapshot) => {
                    let data = querySnapshot.data();
                    this.first_name = data.first_name;
                    this.last_name = data.last_name;
                    this.email = data.email;
                    this.user_email = data.email;
                    this.occupation = data.occupation;
                    this.phone = data.phone;
                    this.home_phone = data.home_phone;
                    this.office_phone = data.office_phone;
                    this.last_contact = data.last_contact[data.last_contact.length - 1].last_contact_made;
                    this.next_contact = data.next_contact;
                    this.lead_source = data.lead_source;
                    this.lead_status = data.lead_status;
                    this.last_contact_made = data.last_contact;
                    this.categories = data.trainer_category;
                    this.form.regions = data.trainer_category;
                    this.contact_mode = data.contact_mode;
                    this.home_CountryCode = data.home_contact_mode;
                    this.office_contact_mode = data.office_contact_mode;
                    this.contactLogs = data.last_contact;
                    this.comments = data.comment;
                    this.contact_log = data.last_contact;
                    this.lead_comments = data.lead_comment;
                    this.mobileFormat = data.mobileFormat;
                    this.countryCode = data.countryCode ? data.countryCode : 'IN';

                    this.home_phone = data.home_number;
                    this.homeCountryCode = data.homeCountryCode;
                    this.homeNoFormat = data.homeFormat;
                    this.officeNoFormat = data.officeFormat;
                    this.office_phone = data.office_number;
                    this.officeCountryCode = data.officeCountryCode;
                    this.officeNoFormat = this.officeNoFormat ? this.officeNoFormat : '';
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
            'v-select': vSelect,
            VuePerfectScrollbar,
            Dropdown,
            datetime,
            moment,
            flatPickr,
            VuePhoneNumberInput,
        },
        created() {
            this.getLead()
            firebase.firestore().collection('trainer-category').get().then((querySnapshot) => {
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
