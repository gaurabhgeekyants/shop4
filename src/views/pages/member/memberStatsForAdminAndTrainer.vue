<!-- =========================================================================================
    File Name: add Graphs for Measurement
    Description: These Details are for Admin
     ========================================================================================== -->

<template>
    <div class="vx-col w-full">
        <div class="vx-row">
            <div class="vx-col lg:w-1/5 md:w-1/5">
                <div class="content-area__heading">
                    <div id="avatar-col" class="vx-col">
                        <div class="img-container mb-4">
                            <img v-show="profileUrl!=''" :src="profileUrl" class="rounded w-full">
                            <img v-show="gender=='male' && profileUrl==''"
                                 src="../../../assets/images/portrait/small/default-profile.png"
                                 class="rounded w-full"/>
                            <img v-show="gender=='other' && profileUrl==''"
                                 src="../../../assets/images/portrait/small/default-profile.png"
                                 class="rounded w-full"/>
                            <img v-show="gender=='female' && profileUrl==''"
                                 src="../../../assets/images/portrait/small/female_avatar_vector.png"
                                 class="rounded w-full"/>
                        </div>
                    </div>
                </div>
            </div>
            <div class="vx-col lg:w-1/3 md:w-1/3 mt-6 pl-0">
                <div class="content-area__heading">
                    <h2 class="mb-1" style="text-transform: capitalize !important;">{{name}}</h2>
                </div>
            </div>
        </div>

        <div class="vx-row">

            <div class="vx-col w-full md:w-1/2 mb-base">
                <div class="vx-card">
                    <div class="vx-card__collapsible-content vs-con-loading__container">
                        <div class="vx-card__body">
                            <h4>Weight Report</h4>
                            <vue-apex-charts v-show="weightToggle === true" type="line" height="350"
                                             :options="lineChartWeightSimple.chartOptions"
                                             :series="lineChartWeightSimple.series"></vue-apex-charts>
                            <h6 style="text-align: center;padding: 141px 0;" v-show="weightToggle === false">
                                Measurement not Added Yet!</h6>

                        </div>
                    </div>
                </div>
            </div>
            <div class="vx-col w-full md:w-1/2 mb-base">
                <div class="vx-card">
                    <div class="vx-card__collapsible-content vs-con-loading__container">
                        <div class="vx-card__body">
                            <h4>Waist Report</h4>
                            <vue-apex-charts v-show="waistToggle === true" type="line" height="350"
                                             :options="lineChartSimple.chartOptions"
                                             :series="lineChartSimple.series"></vue-apex-charts>
                            <h6 style="text-align: center;padding: 141px 0;" v-show="waistToggle === false">
                                Measurement not Added Yet!</h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="vx-row">
            <div class="vx-col w-full md:w-1/2 mb-base">
                <div class="vx-card">
                    <div class="vx-card__collapsible-content vs-con-loading__container">
                        <div class="vx-card__body">
                            <h4>Thigh Report</h4>
                            <vue-apex-charts v-show="thighToggle === true" type="line" height="350"
                                             :options="lineThighChartSimple.chartOptions"
                                             :series="lineThighChartSimple.series"></vue-apex-charts>
                            <h6 style="text-align: center;padding: 141px 0;" v-show="thighToggle === false">
                                Measurement not Added Yet!</h6>
                        </div>
                    </div>
                </div>
            </div>
            <div class="vx-col w-full md:w-1/2 mb-base">
                <div class="vx-card">
                    <div class="vx-card__collapsible-content vs-con-loading__container">
                        <div class="vx-card__body">
                            <h4>Arm Report</h4>
                            <vue-apex-charts v-show="armToggle === true" type="line" height="350"
                                             :options="lineArmChartSimple.chartOptions"
                                             :series="lineArmChartSimple.series"></vue-apex-charts>
                            <h6 style="text-align: center;padding: 141px 0;" v-show="armToggle === false">
                                Measurement not Added Yet!</h6>

                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="vx-row">
            <div class="vx-col w-full md:w-1/2 mb-base">
                <div class="vx-card">
                    <div class="vx-card__collapsible-content vs-con-loading__container">
                        <div class="vx-card__body">
                            <h4>Chest Report</h4>
                            <vue-apex-charts v-show="chestToggle === true" type="line" height="350"
                                             :options="lineChestChartSimple.chartOptions"
                                             :series="lineChestChartSimple.series"></vue-apex-charts>
                            <h6 style="text-align: center;padding: 141px 0;" v-show="chestToggle === false">
                                Measurement not Added Yet!</h6>

                        </div>
                    </div>
                </div>
            </div>
            <div class="vx-col w-full md:w-1/2 mb-base">
                <div class="vx-card">
                    <div class="vx-card__collapsible-content vs-con-loading__container">
                        <div class="vx-card__body">
                            <h4>Fat Report</h4>
                            <vue-apex-charts v-show="fatToggle === true" type="line" height="350"
                                             :options="lineFatChartSimple.chartOptions"
                                             :series="lineFatChartSimple.series"></vue-apex-charts>

                            <h6 style="text-align: center;padding: 141px 0;" v-show="fatToggle === false">
                                Measurement not Added Yet!</h6>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import Chartkick from 'vue-chartkick'
    import Chart from 'chart.js'

    Vue.use(Chartkick.use(Chart))
    import analyticsData from '../../ui-elements/card/analyticsData.js'
    import ChangeTimeDurationDropdown from '@/components/ChangeTimeDurationDropdown.vue'
    import firebase from 'firebase/app'
    import vSelect from 'vue-select'

    require('firebase/firestore')
    import flatPickr from 'vue-flatpickr-component';
    import 'flatpickr/dist/flatpickr.css';
    import VuePerfectScrollbar from 'vue-perfect-scrollbar'
    import moment from 'moment'
    import Dropdown from 'vue-simple-search-dropdown';
    import datetime from 'vuejs-datetimepicker';
    import VueApexCharts from 'vue-apexcharts'

    export default {
        data() {
            return {
                lineChartSimple: {
                    series: [{
                        name: "Waist",
                        data: []
                    }],
                    chartOptions: {
                        chart: {
                            height: 350,
                            zoom: {
                                enabled: false
                            }
                        },
                        colors: ['#7367F0', '#28C76F', '#EA5455', '#FF9F43', '#1E1E1E'],
                        dataLabels: {
                            enabled: false
                        },
                        stroke: {
                            curve: 'straight'
                        },
                        title: {
                            text: '',
                            align: 'left'
                        },
                        grid: {
                            row: {
                                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                                opacity: 0.5
                            },
                        },
                        xaxis: {
                            categories: ["2018-09-19T00:00:00", "2018-09-19T01:30:00", "2018-09-19T02:30:00",
                                "2018-09-19T03:30:00", "2018-09-19T04:30:00", "2018-09-19T05:30:00",
                                "2018-09-19T06:30:00"
                            ],
                        }
                    }
                },
                lineChartWeightSimple: {
                    series: [{
                        name: "Weight",
                        data: []
                    }],
                    chartOptions: {//lineChartSimple.chartOptions.xaxis.categories
                        chart: {
                            height: 350,
                            zoom: {
                                enabled: false
                            }
                        },
                        colors: ['#7367F0', '#28C76F', '#EA5455', '#FF9F43', '#1E1E1E'],//themeColors,
                        dataLabels: {
                            enabled: false
                        },
                        stroke: {
                            curve: 'straight'
                        },
                        title: {
                            text: '',
                            align: 'left'
                        },
                        grid: {
                            row: {
                                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                                opacity: 0.5
                            },
                        },
                        xaxis: {
                            categories: [],
                        }
                    }
                },
                lineThighChartSimple: {
                    series: [{
                        name: "Thigh",
                        data: []
                    }],
                    chartOptions: {
                        chart: {
                            height: 350,
                            zoom: {
                                enabled: false
                            }
                        },
                        colors: ['#7367F0', '#28C76F', '#EA5455', '#FF9F43', '#1E1E1E'],//themeColors,
                        dataLabels: {
                            enabled: false
                        },
                        stroke: {
                            curve: 'straight'
                        },
                        title: {
                            text: '',
                            align: 'left'
                        },
                        grid: {
                            row: {
                                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                                opacity: 0.5
                            },
                        },
                        xaxis: {
                            categories: [],
                        }
                    }
                },
                lineArmChartSimple: {
                    series: [{
                        name: "Arm",
                        data: []
                    }],
                    chartOptions: {
                        chart: {
                            height: 350,
                            zoom: {
                                enabled: false
                            }
                        },
                        colors: ['#7367F0', '#28C76F', '#EA5455', '#FF9F43', '#1E1E1E'],//themeColors,
                        dataLabels: {
                            enabled: false
                        },
                        stroke: {
                            curve: 'straight'
                        },
                        title: {
                            text: '',
                            align: 'left'
                        },
                        grid: {
                            row: {
                                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                                opacity: 0.5
                            },
                        },
                        xaxis: {
                            categories: [],
                        }
                    }
                },
                lineChestChartSimple: {
                    series: [{
                        name: "Chest",
                        data: []
                    }],
                    chartOptions: {
                        chart: {
                            height: 350,
                            zoom: {
                                enabled: false
                            }
                        },
                        colors: ['#7367F0', '#28C76F', '#EA5455', '#FF9F43', '#1E1E1E'],//themeColors,
                        dataLabels: {
                            enabled: false
                        },
                        stroke: {
                            curve: 'straight'
                        },
                        title: {
                            text: '',
                            align: 'left'
                        },
                        grid: {
                            row: {
                                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                                opacity: 0.5
                            },
                        },
                        xaxis: {
                            categories: [],
                        }
                    }
                },
                lineFatChartSimple: {
                    series: [{
                        name: "Fat",
                        data: []//[10, 41, 35, 51, 49, 62, 69, 91, 148]
                    }],
                    chartOptions: {
                        chart: {
                            height: 350,
                            zoom: {
                                enabled: false
                            }
                        },
                        colors: ['#7367F0', '#28C76F', '#EA5455', '#FF9F43', '#1E1E1E'],//themeColors,
                        dataLabels: {
                            enabled: false
                        },
                        stroke: {
                            curve: 'straight'
                        },
                        title: {
                            text: '',
                            align: 'left'
                        },
                        grid: {
                            row: {
                                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                                opacity: 0.5
                            },
                        },
                        xaxis: {
                            categories: [],
                        }
                    }
                },
                weightToggle: false,
                waistToggle: false,
                thighToggle: false,
                armToggle: false,
                chestToggle: false,
                fatToggle: false,

                uid: this.$route.params.uid,
                resultValid: 'false',
                date: 'false',
                resultMeasurement: 'false',
                line_chart: {'2017-05-13': 2, '2017-05-14': 5, '2017-06-14': 5, '2017-07-14': 15},
                weightSeries: {},
                waistSeries: {},
                thighSeries: {},
                armSeries: {},
                chestSeries: {},
                fatSeries: {},
                analyticsData: analyticsData,
                result_mesurement: '',
                contactMode: [
                    {label: 'Weight', value: 'weight'},
                    {label: 'Waist', value: 'waist'},
                    {label: 'Thigh', value: 'thigh'},
                    {label: 'Arm', value: 'arm'},
                    {label: 'Chest', value: 'chest'},
                    {label: 'Fat', value: 'fat'}
                ],

                datetime: null,
                configdateTimePicker: {
                    enableTime: false,
                    dateFormat: 'm-d-Y'
                },
                result: '',
                next: {
                    contact: []
                },
                name: '',
                profileUrl: '',
                gender: '',
            }
        },
        components: {
            ChangeTimeDurationDropdown,
            flatPickr,
            'v-select': vSelect,
            VuePerfectScrollbar,
            Dropdown,
            datetime,
            moment,
            VueApexCharts,
        },
        created() {
            this.chartData()
        },
        methods: {

            chartData() {
                firebase.firestore().collection('users').doc(this.uid).get().then((snap) => {
                    this.name = snap.data().first_name + ' ' + snap.data().last_name
                    this.profileUrl = (snap.data().profileUrl) ? snap.data().profileUrl : '',
                        this.gender = snap.data().gender
                }),
                    firebase.firestore().collection('measurement').where('user_id', '==', this.uid).where('result_mesurement', '==', 'weight').get().then((querySnapshot) => {
                        if (querySnapshot.size >= 1) {
                            var weightMonth = [];
                            var weightValue = [];
                            querySnapshot.forEach((doc) => {
                                weightMonth.push(doc.data().result_date)
                                weightValue.push(doc.data().result)
                            })

                            this.weightToggle = true
                            this.lineChartWeightSimple.series[0].data = weightValue
                            this.lineChartWeightSimple.chartOptions =
                                {
                                    chart: {
                                        height: 350,
                                        zoom: {
                                            enabled: false
                                        }
                                    },
                                    colors: ['#7367F0', '#28C76F', '#EA5455', '#FF9F43', '#1E1E1E'],//themeColors,
                                    dataLabels: {
                                        enabled: false
                                    },
                                    stroke: {
                                        curve: 'straight'
                                    },
                                    title: {
                                        text: '',
                                        align: 'left'
                                    },
                                    grid: {
                                        row: {
                                            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                                            opacity: 0.5
                                        },
                                    },
                                    xaxis: {
                                        categories: weightMonth
                                    }
                                }
                        }
                    })

                firebase.firestore().collection('measurement').where('user_id', '==', this.uid).where('result_mesurement', '==', 'waist').get().then((querySnapshot) => {
                    if (querySnapshot.size >= 1) {
                        var trainer = [];
                        var waistValue = [];
                        querySnapshot.forEach((doc) => {
                            trainer.push(doc.data().result_date)
                            waistValue.push(doc.data().result)

                        })
                        this.waistToggle = true
                        this.lineChartSimple.series[0].data = waistValue
                        this.lineChartSimple.chartOptions =
                            {
                                chart: {
                                    height: 350,
                                    zoom: {
                                        enabled: false
                                    }
                                },
                                colors: ['#7367F0', '#28C76F', '#EA5455', '#FF9F43', '#1E1E1E'],//themeColors,
                                dataLabels: {
                                    enabled: false
                                },
                                stroke: {
                                    curve: 'straight'
                                },
                                title: {
                                    text: '',
                                    align: 'left'
                                },
                                grid: {
                                    row: {
                                        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                                        opacity: 0.5
                                    },
                                },
                                xaxis: {
                                    categories: trainer
                                }
                            }
                    }
                })

                firebase.firestore().collection('measurement').where('user_id', '==', this.uid).where('result_mesurement', '==', 'thigh').get().then((querySnapshot) => {
                    if (querySnapshot.size >= 1) {
                        var thighMonth = [];
                        var thighValue = [];
                        querySnapshot.forEach((doc) => {
                            thighMonth.push(doc.data().result_date)
                            thighValue.push(doc.data().result)
                        })
                        this.thighToggle = true
                        this.lineThighChartSimple.series[0].data = thighValue
                        this.lineThighChartSimple.chartOptions =
                            {
                                chart: {
                                    height: 350,
                                    zoom: {
                                        enabled: false
                                    }
                                },
                                colors: ['#7367F0', '#28C76F', '#EA5455', '#FF9F43', '#1E1E1E'],//themeColors,
                                dataLabels: {
                                    enabled: false
                                },
                                stroke: {
                                    curve: 'straight'
                                },
                                title: {
                                    text: '',
                                    align: 'left'
                                },
                                grid: {
                                    row: {
                                        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                                        opacity: 0.5
                                    },
                                },
                                xaxis: {
                                    categories: thighMonth
                                }
                            }
                    }
                })

                firebase.firestore().collection('measurement').where('user_id', '==', this.uid).where('result_mesurement', '==', 'arm').get().then((querySnapshot) => {
                    if (querySnapshot.size >= 1) {
                        var armMonth = [];
                        var armValue = [];
                        querySnapshot.forEach((doc) => {
                            armMonth.push(doc.data().result_date)
                            armValue.push(doc.data().result)
                        })
                        this.armToggle = true
                        this.lineArmChartSimple.series[0].data = armValue
                        this.lineArmChartSimple.chartOptions =
                            {
                                chart: {
                                    height: 350,
                                    zoom: {
                                        enabled: false
                                    }
                                },
                                colors: ['#7367F0', '#28C76F', '#EA5455', '#FF9F43', '#1E1E1E'],//themeColors,
                                dataLabels: {
                                    enabled: false
                                },
                                stroke: {
                                    curve: 'straight'
                                },
                                title: {
                                    text: '',
                                    align: 'left'
                                },
                                grid: {
                                    row: {
                                        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                                        opacity: 0.5
                                    },
                                },
                                xaxis: {
                                    categories: armMonth
                                }
                            }
                    }
                })

                firebase.firestore().collection('measurement').where('user_id', '==', this.uid).where('result_mesurement', '==', 'chest').get().then((querySnapshot) => {
                    if (querySnapshot.size >= 1) {
                        var chestMonth = [];
                        var chestValue = [];
                        querySnapshot.forEach((doc) => {
                            chestMonth.push(doc.data().result_date)
                            chestValue.push(doc.data().result)
                        })

                        this.chestToggle = true
                        this.lineChestChartSimple.series[0].data = chestValue
                        this.lineChestChartSimple.chartOptions =
                            {
                                chart: {
                                    height: 350,
                                    zoom: {
                                        enabled: false
                                    }
                                },
                                colors: ['#7367F0', '#28C76F', '#EA5455', '#FF9F43', '#1E1E1E'],//themeColors,
                                dataLabels: {
                                    enabled: false
                                },
                                stroke: {
                                    curve: 'straight'
                                },
                                title: {
                                    text: '',
                                    align: 'left'
                                },
                                grid: {
                                    row: {
                                        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                                        opacity: 0.5
                                    },
                                },
                                xaxis: {
                                    categories: chestMonth
                                }
                            }
                    }
                })

                firebase.firestore().collection('measurement').where('user_id', '==', this.uid).where('result_mesurement', '==', 'fat').get().then((querySnapshot) => {
                    if (querySnapshot.size >= 1) {
                        var fatMonth = [];
                        var fatValue = [];
                        querySnapshot.forEach((doc) => {
                            fatMonth.push(doc.data().result_date)
                            fatValue.push(doc.data().result)
                        })

                        this.fatToggle = true
                        this.lineFatChartSimple.series[0].data = fatValue
                        this.lineFatChartSimple.chartOptions =
                            {
                                chart: {
                                    height: 350,
                                    zoom: {
                                        enabled: false
                                    }
                                },
                                colors: ['#7367F0', '#28C76F', '#EA5455', '#FF9F43', '#1E1E1E'],//themeColors,
                                dataLabels: {
                                    enabled: false
                                },
                                stroke: {
                                    curve: 'straight'
                                },
                                title: {
                                    text: '',
                                    align: 'left'
                                },
                                grid: {
                                    row: {
                                        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                                        opacity: 0.5
                                    },
                                },
                                xaxis: {
                                    categories: fatMonth
                                }
                            }
                    }
                })
            },
        }
    }
</script>

<style lang="scss">
    #dashboard-analytics {
        .greet-user {
            position: relative;

            .decore-left {
                position: absolute;
                left: 0;
                top: 0;
            }

            .decore-right {
                position: absolute;
                right: 0;
                top: 0;
            }
        }

        @media(max-width: 576px) {
            .decore-left, .decore-right {
                width: 140px;
            }
            .button-save {
                margin-top: 5px !important;
            }
        }
    }

    .cstm-input, .cstm-input input {
        margin-top: 0 !important;
        height: 43px !important;
    }

    h4 {
        padding: 15px 47px;
    }

    @media(max-width: 576px) {
        .decore-left, .decore-right {
            width: 140px;
        }
    }

    ::placeholder {
        color: rgba(0, 0, 0, 0.2);
    }

    select:focus {
        border: 1px solid rgba(var(--vs-primary), 1) !important;
    }

    #avatar-col {
        width: 10rem
    }
</style>
