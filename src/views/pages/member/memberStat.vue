<!-- =========================================================================================
    File Name: Graphs for Measurement
    Description: These Details are for trainer
     ========================================================================================== -->

<template>

  <div class="vx-col w-full">
    <!--    <div class="vx-col lg:w-1/2 sm:w-1/4">-->
    <div class="vx-card">
      <div class="vx-card__collapsible-content vs-con-loading__container">
        <div class="vx-card__body">
    <div class="vx-row cstm-member">

      <div class="vx-col sm:w-1/4 mb-4">
        <!--<div class="vx-card">-->
          <select v-model="result_mesurement" class="w-full vs-inputx vs-input--input normal" style=" height: 43px; padding: 5px 10px; border-radius: 3px; border: 1px solid rgba(0,0,0,.2)">
            <option value="" selected>Select Result Measurement</option>
            <option v-for="(option, index) in contactMode" :key="index" :value="option.value">{{ option.label }}
            </option>
          </select>
        <!--</div>-->
        <span class="text-danger text-sm"
              v-show="resultMeasurement == 'true'">The Result Measurement field is requied.</span>

      </div>
      <div class="vx-col sm:w-1/4 mb-4">
        <!--<vs-input-->
          <!--name="result"-->
          <!--label-placeholder="Result"-->
          <!--v-model="result"-->
          <!--class="cstm-input w-full"/>-->
        <div class="centerx default-input">
          <vs-input class="inputx cstm-input w-full" placeholder="Result"  v-model="result" />
          <!--<vs-input disabled class="inputx" placeholder="Disabled" v-model="value2" />-->
        </div>
        <span class="text-danger text-sm" v-show="resultValid == 'true'">The Result field is requied.</span>
      </div>
      <!--      </div>-->
      <!--      <div class="vx-row">-->
      <div class="vx-col sm:w-1/4 mb-4">
        <flat-pickr :config="configdateTimePicker" v-model="next.contact" placeholder="Result Date"
                    class="flatpickr-input cstm-input w-full"/>
        <span class="text-danger text-sm" v-show="date == 'true'">The Date field is requied.</span>

      </div>
      <!--      <div class="vx-row">-->
      <div class="vx-col sm:w-1/4">
        <vs-button class="mr-3 mb-2 button-save" id="button-save"  @click="saveData()">Save
        </vs-button>
      </div>
    </div>
    </div>
      </div>
    </div>
    <br>
    <!--      </div>-->
    <!--    </div>-->
    <div class="vx-row">
      <div class="vx-col w-full md:w-1/2 mb-base">
        <div class="vx-card">
          <div class="vx-card__collapsible-content vs-con-loading__container">
            <div class="vx-card__body">
              <h4>Weight Report</h4>
              <vue-apex-charts  v-show="weightToggle === true" type="line" height="350" :options="lineChartWeightSimple.chartOptions" :series="lineChartWeightSimple.series"></vue-apex-charts>
              <h6 style="text-align: center;padding: 141px 0;"  v-show="weightToggle === false" >Measurement not Added Yet!</h6>
              <!--<line-chart :data="weightSeries" ytitle="Kg"></line-chart>-->
            </div>
          </div>
        </div>
      </div>
      <div class="vx-col w-full md:w-1/2 mb-base">
        <div class="vx-card">
          <div class="vx-card__collapsible-content vs-con-loading__container">
            <div class="vx-card__body">
          <h4>Waist Report</h4>
          <!--<line-chart :data="waistSeries" ytitle="Inches"></line-chart>-->
              <vue-apex-charts  v-show="waistToggle === true" type="line" height="350" :options="lineChartSimple.chartOptions" :series="lineChartSimple.series"></vue-apex-charts>
              <h6 style="text-align: center;padding: 141px 0;"  v-show="waistToggle === false" >Measurement not Added Yet!</h6>

            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="vx-row">
      <div class="vx-col w-full md:w-1/2 mb-base">
        <div class="vx-card" >
          <div class="vx-card__collapsible-content vs-con-loading__container">
            <div class="vx-card__body">
          <h4>Thigh Report</h4>
          <!--<line-chart :data="thighSeries" ytitle="Inches"></line-chart>-->
              <vue-apex-charts v-show="thighToggle === true" type="line" height="350" :options="lineThighChartSimple.chartOptions" :series="lineThighChartSimple.series"></vue-apex-charts>
              <h6 style="text-align: center;padding: 141px 0;"  v-show="thighToggle === false" >Measurement not Added Yet!</h6>

            </div>
          </div>
        </div>
      </div>
      <div class="vx-col w-full md:w-1/2 mb-base">
        <div class="vx-card">
          <div class="vx-card__collapsible-content vs-con-loading__container">
            <div class="vx-card__body">
          <h4>Arm Report</h4>
          <!--<line-chart :data="armSeries" ytitle="Inches"></line-chart>-->
              <vue-apex-charts  v-show="armToggle === true" type="line" height="350" :options="lineArmChartSimple.chartOptions" :series="lineArmChartSimple.series"></vue-apex-charts>
              <h6 style="text-align: center;padding: 141px 0;"  v-show="armToggle === false" >Measurement not Added Yet!</h6>

            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="vx-row">
      <div class="vx-col w-full md:w-1/2 mb-base">
        <div class="vx-card" >
          <div class="vx-card__collapsible-content vs-con-loading__container">
            <div class="vx-card__body">
          <h4>Chest Report</h4>
          <!--<line-chart :data="chestSeries" ytitle="Inches"></line-chart>-->
              <vue-apex-charts v-show="chestToggle === true" type="line" height="350" :options="lineChestChartSimple.chartOptions" :series="lineChestChartSimple.series"></vue-apex-charts>
              <h6 style="text-align: center;padding: 141px 0;"  v-show="chestToggle === false" >Measurement not Added Yet!</h6>

            </div>
          </div>
        </div>
      </div>
      <div class="vx-col w-full md:w-1/2 mb-base">
        <div class="vx-card">
          <div class="vx-card__collapsible-content vs-con-loading__container">
            <div class="vx-card__body">
          <h4>Fat Report</h4>
          <!--<line-chart :data="fatSeries" ytitle="Percentage"></line-chart>-->
              <vue-apex-charts  v-show="fatToggle === true" type="line" height="350" :options="lineFatChartSimple.chartOptions" :series="lineFatChartSimple.series"></vue-apex-charts>
              <h6 style="text-align: center;padding: 141px 0;"  v-show="fatToggle === false" >Measurement not Added Yet!</h6>

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
//                themeColors:
                lineChartSimple: {
                    series: [{
                        name: "Waist",
                        data: []//[10, 41, 35, 51, 49, 62, 69, 91, 148]
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
                            categories:["2018-09-19T00:00:00", "2018-09-19T01:30:00", "2018-09-19T02:30:00",
                                "2018-09-19T03:30:00", "2018-09-19T04:30:00", "2018-09-19T05:30:00",
                                "2018-09-19T06:30:00"
                            ],// ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
                        }
                    }
                },
                lineChartWeightSimple: {
                    series: [{
                        name: "Weight",
                        data: []//[10, 41, 35, 51, 49, 62, 69, 91, 148]
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
                            categories:[],// ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
                        }
                    }
                },
                lineThighChartSimple:{
                    series: [{
                        name: "Thigh",
                        data: []//[10, 41, 35, 51, 49, 62, 69, 91, 148]
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
                            categories:[],// ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
                        }
                    }
                },
                lineArmChartSimple:{
                    series: [{
                        name: "Arm",
                        data: []//[10, 41, 35, 51, 49, 62, 69, 91, 148]
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
                            categories:[],// ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
                        }
                    }
                },
                lineChestChartSimple:{
                    series: [{
                        name: "Chest",
                        data: []//[10, 41, 35, 51, 49, 62, 69, 91, 148]
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
                            categories:[],
                        }
                    }
                },
                lineFatChartSimple:{
                    series: [{
                        name: "Fat",
                        data: []//[10, 41, 35, 51, 49, 62, 69, 91, 148]
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
                            categories:[],
                        }
                    }
                },
                weightToggle:false,
                waistToggle:false,
                thighToggle:false,
                armToggle:false,
                chestToggle:false,
                fatToggle:false,
                uid:localStorage.getItem('uid'),
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
            }
        },
        components: {
            VueApexCharts,
            ChangeTimeDurationDropdown,
            flatPickr,
            'v-select': vSelect,
            VuePerfectScrollbar,
            Dropdown,
            datetime,
            moment
        },
        created() {
            this.chartData()
        },
        methods: {
            chartData() {
                firebase.firestore().collection('measurement').where('user_id', '==', this.uid).where('result_mesurement', '==', 'weight').get().then((querySnapshot) => {
                    if (querySnapshot.size >= 1) {
                        var weightMonth = [];
                        var weightValue = [];
                        querySnapshot.forEach((doc) => {
                            weightMonth.push(doc.data().result_date)
                            weightValue.push(doc.data().result)
                        })

                        this.weightToggle = true
                        this.lineChartWeightSimple.series[0].data=weightValue
                        this.lineChartWeightSimple.chartOptions=
//                            chartOptions: {//lineChartSimple.chartOptions.xaxis.categories
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
                                    categories:weightMonth
                                }
                            }
                    }
                })

                firebase.firestore().collection('measurement').where('user_id', '==', this.uid).where('result_mesurement', '==', 'waist').get().then((querySnapshot) => {
                    if (querySnapshot.size >= 1) {
                        var trainer = [];//{};
                        var waistValue = [];//{};
                        querySnapshot.forEach((doc) => {
                            trainer.push(doc.data().result_date)
                            waistValue.push(doc.data().result)

                        })
                        this.waistToggle = true
                        this.lineChartSimple.series[0].data=waistValue
                        this.lineChartSimple.chartOptions=
//                            chartOptions: {//lineChartSimple.chartOptions.xaxis.categories
                            {chart: {
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
                                categories:trainer
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
                        this.lineThighChartSimple.series[0].data=thighValue
                        this.lineThighChartSimple.chartOptions=
//                            chartOptions: {//lineChartSimple.chartOptions.xaxis.categories
                            {chart: {
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
                                    categories:thighMonth
                                }
                            }
                    }
                })

                firebase.firestore().collection('measurement').where('user_id', '==', this.uid).where('result_mesurement', '==', 'arm').get().then((querySnapshot) => {
                    if (querySnapshot.size >= 1) {
//                        var trainer = {};
                        var armMonth = [];
                        var armValue = [];
                        querySnapshot.forEach((doc) => {
                            armMonth.push(doc.data().result_date)
                            armValue.push(doc.data().result)
                        })
//                        this.armSeries = trainer
                        this.armToggle=true
                        this.lineArmChartSimple.series[0].data=armValue
                        this.lineArmChartSimple.chartOptions=
//                            chartOptions: {//lineChartSimple.chartOptions.xaxis.categories
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
                                    categories:armMonth
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
//                        lineChestChartSimple
//                        this.chestSeries = trainer
                        this.chestToggle=true
                        this.lineChestChartSimple.series[0].data=chestValue
                        this.lineChestChartSimple.chartOptions=
//                            chartOptions: {//lineChartSimple.chartOptions.xaxis.categories
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
                                    categories:chestMonth
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
//                        this.fatSeries = trainer

                        this.fatToggle=true
                        this.lineFatChartSimple.series[0].data=fatValue
                        this.lineFatChartSimple.chartOptions=
//                            chartOptions: {//lineChartSimple.chartOptions.xaxis.categories
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
                                    categories:fatMonth
                                }
                            }
                    }
                })
            },
            saveData() {
                if (this.result_mesurement == '' || this.next.contact == '' || this.result == '') {
                    this.resultMeasurement = ((this.result_mesurement == '') || (this.result_mesurement == null) ? 'true' : 'false')
                    this.date = ((this.next.contact == '') || (this.next.contact == null) ? 'true' : 'false')//(this.date == 'false'?'true':'false')
                    this.resultValid = ((this.result == '') || (this.result == null) ? 'true' : 'false')//(this.resultValid == 'false'?'true':'false')
                } else {
                    this.resultMeasurement = 'false'
                    this.date = 'false'
                    this.resultValid = 'false'
                    const memberPayLoad = {
                        result: this.result ? this.result : '',
                        result_mesurement: this.result_mesurement? this.result_mesurement: '',
                        user_id: this.uid,
                        result_date: this.next.contact ? this.next.contact : '',
                        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    }
                    firebase.firestore().collection("measurement").add(
                        memberPayLoad
                    )
                        .then(() => {
                                this.result = ''
                                this.next.contact = ''
                                this.result_mesurement = ''
                                this.chartData()
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
                }

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
      .button-save{margin-top: 5px !important;}
    }
  }
  .cstm-input, .cstm-input input{margin-top: 0 !important;height: 43px !important;}
  h4{
    padding: 15px 47px;
  }
  @media(max-width: 576px) {
    .decore-left, .decore-right {
      width: 140px;
    }
  }
  ::placeholder{color:rgba(0, 0, 0, 0.2);}
  select:focus{
    border: 1px solid rgba(var(--vs-primary),1)!important;
  }
</style>
