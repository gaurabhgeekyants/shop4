<!-- =========================================================================================
    File Name: add Graphs for Measurement form
    Description: These Details are added by Member
     ========================================================================================== -->

<template>
    <div id="form" class="sale-form">
        <div class="vx-row">
            <div class="vx-col w-full mb-base" style="margin: 0 auto;">
                <vx-card title="">
                    <div class="vx-row">
                        <div class="vx-col lg:w-1/2 sm:w-1/2">
                            <div class="vx-row">
                                <div class="vx-col lg:w-1/2 sm:w-1/2 mb-6">
                                    <v-select :options="contactMode" v-model="result_mesurement"
                                              placeholder="Please Select Result Measurement"></v-select>
                                </div>
                            </div>
                            <div class="vx-row">
                                <div class="vx-col lg:w-1/2 sm:w-1/2 mb-6">
                                    <vs-input
                                            v-validate="'required'"
                                            data-v v-validate-on="blur"
                                            name="result"
                                            label-placeholder="Result"
                                            v-model="result"
                                            class="mt-1 w-full"/>
                                    <span class="text-danger text-sm">{{ errors.first('result') }}</span>
                                </div>
                            </div>
                            <div class="vx-row">
                                <div class="vx-col lg:w-1/2 sm:w-1/2 mb-6">
                                    <flat-pickr :config="configdateTimePicker" v-model="next.contact"
                                                placeholder="Result Date"/>
                                </div>
                            </div>
                            <div class="vx-row">
                                <div class="vx-col w-full">
                                    <vs-button class="mr-3 mb-2" id="button-save" @click="saveData()">Save
                                    </vs-button>
                                </div>
                            </div>
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

    require('firebase/firestore')
    import moment from 'moment'
    import Dropdown from 'vue-simple-search-dropdown';
    import datetime from 'vuejs-datetimepicker';
    import router from '@/router'
    import flatPickr from 'vue-flatpickr-component';
    import 'flatpickr/dist/flatpickr.css';

    export default {
        data() {
            return {
                settings: {
                    maxScrollbarLength: 60,
                    wheelSpeed: .60,
                },
                datetime: null,
                configdateTimePicker: {
                    enableTime: false,
                    dateFormat: 'm-d-Y'
                },
                next_contact: [],
                last_contact: [],
                options: [],
                contactLogs: [],
                comments: [],
                status: [],
                source: [],
                trainer_category: [],
                form: {
                    regions: []
                },
                last: {
                    contact: []
                },
                next: {
                    contact: []
                },
                contactMode: [
                    {label: 'Weight', value: 'weight'},
                    {label: 'Waist', value: 'waist'},
                    {label: 'Thigh', value: 'thigh'},
                    {label: 'Arm', value: 'arm'},
                    {label: 'Chest', value: 'chest'},
                    {label: 'Fat', value: 'fat'}
                ],
                leadSource: {},
                selected: {name: null, id: null},
                result_mesurement: '',
                result: '',
                contact_mode: '',
                lead_source: '',
                lead_status: ''
            }
        },
        computed: {},
        methods: {
            customFormatter(date) {
                return date != '' ? moment(date).format('MMMM Do YYYY') : '';
            },
            prueba() {
                console.log("prueba de focsu");
            },
            saveData() {
                this.$validator.validateAll().then(result => {
                    if (result) {
                        const memberPayLoad = {
                            result: this.result ? this.result : '',
                            result_mesurement: this.result_mesurement['value'] ? this.result_mesurement['value'] : '',
                            user_id: localStorage.getItem('uid'),
                            result_date: this.next.contact ? this.next.contact : '',
                            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                        }

                        firebase.firestore().collection("measurement").add(
                            memberPayLoad
                        )
                            .then(() => {
                                    router.push({name: 'memberStat'})
                                    this.$vs.notify({
                                        title: 'measurement Created Successfully!',
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
            moment
        },
        created() {
        }
    }
</script>
<style lang="scss">
    .month-setter,
    .year-setter {
        text-align: center;
    }

    .year-month-wrapper {
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

    .trainer-holder {
        overflow: hidden;
        padding: 20px;
        width: 90%;
        margin: 0 auto;
        border: 1px solid #e1e1e1;

        ul {
            padding: 0;
            margin: 0;
            list-style: none;

            li {
                width: 100%;
                padding: 10px 0;
                border-top: 1px solid #e1e1e1;

                img {
                    margin: 0 20px 0 0;
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

    @media (max-width: 570px) {
        .sale-form {
            .vx-row > .vx-col {
                width: 100% !important;
            }
        }
    }
</style>
