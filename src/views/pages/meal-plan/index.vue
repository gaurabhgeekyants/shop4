<!-- =========================================================================================
    File Name:  Meal plan List
    Description: These Details are for Member,here is an option for member to check their meal plan and download it in pdf
     ========================================================================================== -->

<template>
    <div id="form">

        <div class="vx-row">
            <div class="vx-col md:w-1/1 w-full mb-base" style="margin: 0 auto;">
                <vx-card title="" style="border-radius: 8px;border: 1px solid rgb(115, 103, 240);
        box-shadow: 2px 5px 10px -3px rgba(115, 103, 240, .7);margin-bottom: 20px;display: none;">
                    <div class="w-full">
                        <h1 class="mb-12 inline-block " style=""><a href="" class="inline-block">TDEE</a></h1>
                        <div class="vx-row">
                            <div class="vx-col lg:w-1/4 text-center">
                                <strong style="display: block; maring: 0 0 14px; color: #343a40; font-size: 20px;">Calories</strong>
                                <img src="@/assets/images/pages/bg-fire.png" alt="image" style="margin: 0 auto;">
                                <span style="display: block; color: #7367f0; font-size: 20px; font-weight: bold;"
                                      v-if="calory">{{calory}}</span>
                                <span style="display: block; font-size: 16px; font-weight: bold;">Per Day</span>
                            </div>
                            <div class="vx-col lg:w-1/4 text-center">
                                <strong style="display: block; maring: 0 0 14px; color: #343a40; font-size: 20px;">Carbs</strong>
                                <img src="@/assets/images/pages/bg-crabs.png" alt="image" style="margin: 0 auto;">
                                <span style="display: block; color: #7367f0; font-size: 20px; font-weight: bold;"
                                      v-if="carbohydrates">{{carbohydrates}}({{carbohydrate_percentage}})</span>
                                <span style="display: block; font-size: 16px; font-weight: bold;">Gram Per Day</span>
                            </div>
                            <div class="vx-col lg:w-1/4 text-center">
                                <strong style="display: block; maring: 0 0 14px; color: #343a40; font-size: 20px;">Proteins</strong>
                                <img src="@/assets/images/pages/bg-protine.png" alt="image" class="mx-auto"
                                     style="margin: 0 auto;">
                                <span style="display: block; color: #7367f0; font-size: 20px; font-weight: bold; margin: 0 0 10px;"
                                      v-if="protein">{{protein}}({{protein_percentage}})</span>
                                <span style="display: block; font-size: 16px; font-weight: bold;">Gram Per Day</span>
                            </div>
                            <div class="vx-col lg:w-1/4 text-center">
                                <strong style="display: block; maring: 0 0 14px; color: #343a40; font-size: 20px;">Fats</strong>
                                <img src="@/assets/images/pages/bg-fats.png" alt="image" class="mx-auto"
                                     style="margin: 0 auto;">
                                <span style="display: block; color: #7367f0; font-size: 20px; font-weight: bold; margin: 0 0 10px;"
                                      v-if="fatsCalculate">{{fatsCalculate}}({{fat_percentage}})</span>
                                <span style="display: block; font-size: 16px; font-weight: bold;">Gram Per Day</span>
                            </div>
                        </div>
                    </div>
                </vx-card>

                <vx-card title="" style="overflow: auto;" id="mealplan-content" >
                    <div class="w-full">
                        <h1 class="mb-12 inline-block " style=""><a href="" class="inline-block">Meal Plan</a></h1>

                        <div class="vx-row">
                            <div class="vx-col w-full lg:w-1/3 mb-base">
                                <vx-card>

                                    <div slot="no-body">
                                        <vue-apex-charts type=radialBar  height=465
                                                         :options="productOrdersRadialBar.chartOptions"
                                                         :series="series"/>
                                    </div>

                                    <ul>
                                        <li v-for="orderData in analyticsLedgarData" :key="orderData.orderType"
                                            class="flex mb-3 justify-between">
                            <span class="flex items-center">
                                    <span class="inline-block h-4 w-4 rounded-full mr-2 bg-white border-3 border-solid"
                                          :class="`border-${orderData.color}`"></span>
                                    <span class="font-semibold">{{ orderData.orderType }}</span>
                            </span>
                                            <span>{{ orderData.counts }}</span>
                                        </li>
                                    </ul>
                                </vx-card>
                            </div>
                            <div class="vx-col w-full lg:w-1/2 mb-base">
                                <vx-card class="mb-8">
                                    <div class="vx-row">
                                        <div class="vx-col w-full ml-auto mb-4">
                                            <h4>Meal Plan</h4>
                                        </div>
                                    </div>
                                    <div class="vs-component vs-divider"><span
                                            class="vs-divider-border after vs-divider-border-default"
                                            style="width: 100%; border-top: 1px solid rgba(0, 0, 0, 0.1);"></span>
                                        <!----><span class="vs-divider-border before vs-divider-border-default"
                                                     style="width: 100%; border-top: 1px solid rgba(0, 0, 0, 0.1);"></span>
                                    </div>
<div v-show="mealplan_exist==true">
                                    <div class="vx-row">
                                        <div class="vx-col">


                                            <div class="demo-alignment">

                                                <!-- Dropdown Button 1 -->
                                                <div class="dropdown-button-container">
                                                    <vs-button class="btnx" @click="viewMealPlan(1)" type="filled">
                                                        Meal Plan 1
                                                    </vs-button>

                                                    <vs-dropdown>
                                                        <vs-button class="btn-drop" type="filled"
                                                                   icon="expand_more"></vs-button>
                                                        <vs-dropdown-menu>
                                                            <vs-dropdown-item><label @click="viewMealPlan(1)">View Meal Plan</label>
                                                            </vs-dropdown-item>
                                                            <vs-dropdown-item @click="viewStats(1)"> View Stats
                                                            </vs-dropdown-item>


                                                        </vs-dropdown-menu>
                                                    </vs-dropdown>
                                                </div>


                                            </div>
                                        </div>
                                    </div>

                                    <div class="vx-row">
                                        <div class="vx-col">


                                            <div class="demo-alignment">

                                                <!-- Dropdown Button 2 -->
                                                <div class="dropdown-button-container">
                                                    <vs-button class="btnx" @click="viewMealPlan(2)" type="filled">
                                                        Meal Plan 2
                                                    </vs-button>

                                                    <vs-dropdown>
                                                        <vs-button class="btn-drop" type="filled"
                                                                   icon="expand_more"></vs-button>
                                                        <vs-dropdown-menu>

                                                            <vs-dropdown-item><label @click="viewMealPlan(2)">View Meal Plan</label>
                                                            </vs-dropdown-item>
                                                            <vs-dropdown-item @click="viewStats(2)"> View Stats
                                                            </vs-dropdown-item>

                                                        </vs-dropdown-menu>
                                                    </vs-dropdown>
                                                </div>


                                            </div>
                                        </div>
                                    </div>

                                    <div class="vx-row">
                                        <div class="vx-col">


                                            <div class="demo-alignment">

                                                <!-- Dropdown Button 3 -->
                                                <div class="dropdown-button-container">
                                                    <vs-button class="btnx" @click="viewMealPlan(3)" type="filled">
                                                        Meal Plan 3
                                                    </vs-button>
                                                    <vs-dropdown>
                                                        <vs-button class="btn-drop" type="filled"
                                                                   icon="expand_more"></vs-button>
                                                        <vs-dropdown-menu>

                                                            <vs-dropdown-item><label @click="viewMealPlan(3)">View Meal Plan</label>
                                                            </vs-dropdown-item>
                                                            <vs-dropdown-item @click="viewStats(3)"> View Stats
                                                            </vs-dropdown-item>


                                                        </vs-dropdown-menu>
                                                    </vs-dropdown>
                                                </div>


                                            </div>
                                        </div>
                                    </div>
</div>


                                    <h6 style="text-align: center;"   v-show="mealplan_exist==false">Meal Plan is not Added Yet!</h6>

                                </vx-card>
                                <vx-card>

                                    <div class="vx-row">
                                        <div class="vx-col w-full ml-auto mb-4">
                                            <h4>Welcome Kit</h4>
                                        </div>
                                    </div>
                                    <div class="vs-component vs-divider"><span
                                            class="vs-divider-border after vs-divider-border-default"
                                            style="width: 100%; border-top: 1px solid rgba(0, 0, 0, 0.1);"></span>
                                        <!----><span class="vs-divider-border before vs-divider-border-default"
                                                     style="width: 100%; border-top: 1px solid rgba(0, 0, 0, 0.1);"></span>
                                    </div>
                                    <div class="vx-row">
                                        <div class="vx-col">
                                            <vs-button color="success" class="btn-view mr-2" type="gradient"
                                                       @click="RecipeBook">Download Recipe Book Pdf
                                            </vs-button>
                                        </div>
                                    </div>
                                    <div class="vx-row">
                                        <div class="vx-col">
                                            <vs-button color="success" class="btn-view mr-2" type="gradient"
                                                       @click="WelcomeKit">Download Welcome Kit Pdf
                                            </vs-button>
                                        </div>
                                    </div>
                                </vx-card>
                            </div>

                        </div>

                    </div>
                </vx-card>
            </div>
        </div>
        <div class="demo-alignment">
            <vs-popup fullscreen :title="'Meal Plan '+mealplan_no" :active.sync="popupActive">
                <div class="vx-row">
                    <div class="vx-col w-full">
                        <div class="title" tabindex="0" id="downloadPdf">
                            <vs-button color="success" class="mb-5" style="float: right;" type="gradient"><a
                                    href="javascript:void(0);" style="color:#fff;" @click="downloadPdf(mealplan_no)">Download</a>
                            </vs-button>
                        </div>
                        <div class="title" tabindex="0">
                            <vs-button color="success" class="mb-5 mr-2" style="float: right;" type="gradient">
                                <a href="javascript:void(0);" style="color:#fff" @click="viewMealPlan(mealplan_no)">View All</a>
                            </vs-button>
                        </div>
                    </div>
                </div>
                <div>

                    <div class="vx-row" id="mealplan-content-tables">


                        <div class="vx-col w-full lg:w-1/2 md:w-1/2 sm:w-1/1 w-full mb-base">
                            <div v-for="(section, index) in sections" v-bind:key="section">
                                <vx-card :title="section['section_'+index].label" class="mb-4"
                                         v-if="section['section_'+index].data && section['section_'+index].data.length > 0">
                                    <div v-for="(sectionData, index1) in section['section_'+index].data"
                                         v-bind:key="sectionData"
                                         v-if="section['section_'+index].data && section['section_'+index].data.length > 0">
                                        <span v-if="index1 == 0">Total KCAL: {{calculateKcalBySection(section['section_' + index].data)}}</span>

                                        <div class="vx-row mb-3" style="cursor: pointer"
                                             @click="calculateNutritionFacts(sectionData)">
                                            <div class="vx-col lg:w-1/5 md:w-1/5 sm:w-1/1 w-full p-0">
                                                <img v-if="sectionData.image" :src="sectionData.image"
                                                     style="width:50px;height:50px;margin:0 auto;">
                                            </div>
                                            <div class="vx-col lg:w-3/4 md:w-3/4 sm:w-1/1 w-full pl-0">
                                                <h5 style="text-transform: capitalize;">{{ sectionData.name }}</h5>
                                                <p style="font-size: 12px !important;text-transform: capitalize;margin-bottom:0;">
                                                    {{ sectionData.wakeup_quantity ? sectionData.wakeup_quantity : ''}}  <strong>{{ sectionData.wakeup_unit ? sectionData.wakeup_unit : ''}}</strong>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </vx-card>
                            </div>
                        </div>
                        <div class="vx-col w-full lg:w-1/2 md:w-1/2 sm:w-1/1 w-full mb-base">

                            <vx-card class="mb-4 nutrition-facts">

                                <div class="vs-con-loading__container" id="div-with-loading">
                                    <div class="label-container">
                                        <div id="label-n22ihttd37">
                                            <div class="nutritionLabel" style=" width:100%">
                                                <div class="title" tabindex="0">Nutrition Facts
                                                </div>
                                                <h4 style="text-transform: capitalize" tabindex="0">{{ food_name }}</h4>
                                                <div class="serving" tabindex="0">
                                                    <div class="cf">
                                                        <div class="servingSizeText fl">
                                                            Serving Size: <strong>{{food_unit ? food_quantity : ''}} {{food_unit}}</strong>
                                                        </div>
                                                        <div class="rel servingSizeField fl">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="bar1"></div>
                                                <div class="line">
                                                    <div class="dv" aria-hidden="true">
                                                        <strong>{{food_kcal ? parseFloat(food_kcal).toFixed(2) : 0}} Kcal</strong>
                                                    </div>
                                                    <div class="line" tabindex="0">
                                                        <strong>Calories</strong>
                                                    </div>
                                                </div>
                                                <div class="bar2"></div>
                                                <div class="line" tabindex="0">
                                                    <div class="dv" aria-hidden="true">
                                                        <strong>{{food_fat ? parseFloat(food_fat).toFixed(2) : 0}} g</strong>
                                                    </div>
                                                    <strong>Total Fat</strong>
                                                </div>
                                                <div class="line" tabindex="0">
                                                    <div class="dv" aria-hidden="true">
                                                        <strong>{{nutrients_cholesterol ? parseFloat(nutrients_cholesterol).toFixed(2) : 0}} mg</strong>
                                                    </div>
                                                    <strong>Cholesterol</strong>
                                                </div>
                                                <div class="line" tabindex="0">
                                                    <div class="dv" aria-hidden="true">
                                                        <strong>{{nutrients_sodium ? parseFloat(nutrients_sodium).toFixed(2) : 0}} mg</strong>
                                                    </div>
                                                    <strong>Sodium</strong>
                                                </div>
                                                <div class="line" tabindex="0">
                                                    <div class="dv" aria-hidden="true">
                                                        <strong>{{nutrients_potassium ? parseFloat(nutrients_potassium).toFixed(2) : 0}} mg</strong>
                                                    </div>
                                                    <strong>Potassium</strong>
                                                </div>
                                                <div class="line" tabindex="0">
                                                    <div class="dv" aria-hidden="true">
                                                        <strong>{{food_carb ? parseFloat(food_carb).toFixed(2) : 0}} g</strong>
                                                    </div>
                                                    <strong>Total Carbohydrates</strong>
                                                </div>
                                                <div class="line" tabindex="0">
                                                    <div class="dv" aria-hidden="true">
                                                        <strong>{{nutrients_fiber ? parseFloat(nutrients_fiber).toFixed(2) : 0}} g</strong>
                                                    </div>
                                                    <strong>Dietary Fiber</strong>
                                                </div>
                                                <div class="line" tabindex="0">
                                                    <div class="dv" aria-hidden="true">
                                                        <strong>{{nutrients_protien ? parseFloat(nutrients_protien).toFixed(2) : 0}} g</strong>
                                                    </div>
                                                    <strong>Protein</strong>
                                                </div>
                                                <div class="bar1"></div>
                                                <div class="line vitaminA" tabindex="0">
                                                    <div class="dv">
                                                        {{nutrients_vitamin_a ? parseFloat(nutrients_vitamin_a).toFixed(2) : 0}} IU
                                                    </div>
                                                    Vitamin A
                                                </div>
                                                <div class="line vitaminC" tabindex="0">
                                                    <div class="dv">
                                                        {{nutrients_vitamin_c ? parseFloat(nutrients_vitamin_c).toFixed(2) : 0}} mg
                                                    </div>
                                                    Vitamin C
                                                </div>
                                                <div class="line calcium" tabindex="0">
                                                    <div class="dv">
                                                        {{nutrients_calcium ? parseFloat(nutrients_calcium).toFixed(2) : 0}} mg
                                                    </div>
                                                    Calcium
                                                </div>
                                                <div class="line iron" tabindex="0">
                                                    <div class="dv">
                                                        {{nutrients_iron ? parseFloat(nutrients_iron).toFixed(2) : 0}} mg
                                                    </div>
                                                    Iron
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="lg:w-1/1 md:w-1/1 sm:w-1/1 mb-base mr-auto ml-auto"
                                         v-if="pieChartCalc==true">
                                        <vue-apex-charts type="pie" height="270" :options="pieChart.chartOptions"
                                                         :series="popoupSeries(food_fat,food_kcal,nutrients_protien,food_carb)"></vue-apex-charts>
                                    </div>
                                    <div class="vx-row">
                                        <div class="vx-col w-full lg:w-1/2 md:w-1/2 sm:w-1/1 ml-auto mr-auto mb-base">
                                            <vx-card>
                                                <div class="vx-row">
                                                    <div class="lg:w-1/2 md:w-1/2 sm:w-1/2 ml-auto mr-auto ">
                                                        <h5>Total Kcal</h5>
                                                    </div>
                                                    <div class=" lg:w-1/2 md:w-1/2 sm:w-1/2 ml-auto mr-auto ">
                                                        <label>{{food_kcal ? parseFloat(food_kcal).toFixed(2) : 0}} </label>
                                                    </div>
                                                </div>
                                                <div class="vx-row">
                                                    <div class="lg:w-1/2 md:w-1/2 sm:w-1/2 ml-auto mr-auto ">
                                                        <label>Protien</label>
                                                    </div>
                                                    <div class="lg:w-1/2 md:w-1/2 sm:w-1/2 ml-auto mr-auto">
                                                        <label>{{nutrients_protien ? parseFloat(nutrients_protien).toFixed(2) : 0}} </label>
                                                    </div>
                                                </div>

                                                <div class="vx-row">
                                                    <div class="  lg:w-1/2 md:w-1/2 sm:w-1/2 ml-auto mr-auto ">
                                                        <label>Carbs</label>
                                                    </div>
                                                    <div class="  lg:w-1/2 md:w-1/2 sm:w-1/2 ml-auto mr-auto ">
                                                        <label>{{food_carb ? parseFloat(food_carb).toFixed(2) : 0}}</label>
                                                    </div>
                                                </div>
                                                <div class="vx-row">
                                                    <div class="lg:w-1/2 md:w-1/2 sm:w-1/2 ml-auto mr-auto ">
                                                        <label>Fats</label>
                                                    </div>
                                                    <div class=" lg:w-1/2 md:w-1/2 sm:w-1/2 ml-auto mr-auto ">
                                                        <label>{{food_fat ? parseFloat(food_fat).toFixed(2) : 0}}</label>
                                                    </div>
                                                </div>


                                            </vx-card>

                                        </div>
                                    </div>
                                </div>
                            </vx-card>
                        </div>


                    </div>
                </div>
            </vs-popup>
        </div>
    </div>


</template>

<script>
    require('firebase/firestore')
    import axios from 'axios';
    import 'firebase/auth'
    import firebase from 'firebase'
    import VueApexCharts from 'vue-apexcharts'
    import StatisticsCardLine from '@/components/statistics-cards/StatisticsCardLine.vue'
    import ChangeTimeDurationDropdown from '@/components/ChangeTimeDurationDropdown.vue'
    import moment from 'moment'
    import Progress from "easy-circular-progress";
    import vSelect from 'vue-select'
    import jsPDF from 'jspdf'
    import html2canvas from "html2canvas"
    import $ from 'jquery'
    export default {
        data() {
            return {
                mealplan_exist:false,
                pieChartCalc: false,
                popupSeries: [],
                pieChart: {
                    series: [37, 50, 13],
                    chartOptions: {
                        labels: ['Fat', 'Protein', 'Carb'],
                        colors: ['#EA5455', '#28C76F', '#FF9F43', '#7367F0'],
                        responsive: [{
                            breakpoint: 480,
                            options: {
                                chart: {
                                    width: 200
                                },
                                legend: {
                                    position: 'bottom'
                                }
                            }
                        }]
                    }
                },
                totalKcal: 0,
                analyticsLedgarData: [],
                mealplan_index: 0,
                mealplan_no: 1,
                popupActive: false,
                series: [0, 0, 0, 0],
                productOrdersRadialBar: {
                    analyticsData: [
                        {'orderType': 'Total Kcal', 'counts': 0, color: 'primary'},
                        {'orderType': 'Protein', 'counts': 0, color: 'warning'},
                        {'orderType': 'Carbs ', 'counts': 0, color: 'danger'},
                        {'orderType': 'Fats ', 'counts': 0, color: 'success'},
                    ],
                    series: [],
                    chartOptions: {
                        labels: ['Total Kcal', 'Protein', 'Carbs', 'Fats'],
                        plotOptions: {
                            radialBar: {
                                size: 165,
                                offsetY: -25,
                                hollow: {
                                    size: '20%'
                                },
                                track: {
                                    background: "#ebebeb",
                                    strokeWidth: '100%',
                                    margin: 15,
                                },
                                dataLabels: {
                                    show: true,
                                    name: {
                                        fontSize: '18px',
                                    },
                                    value: {
                                        fontSize: '16px',
                                        color: "#636a71",
                                        offsetY: 11
                                    },
                                }
                            },
                        },
                        responsive: [{
                            breakpoint: 576,
                            options: {
                                plotOptions: {
                                    radialBar: {
                                        size: 150,
                                        hollow: {
                                            size: '20%'
                                        },
                                        track: {
                                            background: "#ebebeb",
                                            strokeWidth: '100%',
                                            margin: 15,
                                        },
                                    }
                                }
                            }
                        }],
                        colors: ['#7961F9', '#FF9F43', '#EA5455', '#000',],
                        fill: {
                            type: 'gradient',
                            gradient: {
                                // enabled: true,
                                shade: 'dark',
                                type: 'vertical',
                                shadeIntensity: 0.5,
                                gradientToColors: ['#9c8cfc', '#FFC085', '#f29292'],
                                inverseColors: false,
                                opacityFrom: 1,
                                opacityTo: 1,
                                stops: [0, 100]
                            },
                        },
                        stroke: {
                            lineCap: 'round'
                        },
                        chart: {
                            dropShadow: {
                                enabled: true,
                                blur: 3,
                                left: 1,
                                top: 1,
                                opacity: 0.1
                            },
                        }
                    }
                },
                city: '',
                cityOptions: [
                    {text: "New York", value: "new-york"},
                    {text: "Chicago", value: "chicago"},
                    {text: "San Francisco", value: "san-francisco"},
                    {text: "Boston", value: "boston"},
                ],
                sections: [
                    {
                        section_0: {
                            label: 'Up on Waking Up',
                            data: []
                        }
                    },
                    {
                        section_1: {
                            label: 'Break Fast',
                            data: []
                        }
                    },
                    {
                        section_2: {
                            label: 'Snack After Break Fast',
                            data: []
                        }
                    },
                    {
                        section_3: {
                            label: 'Lunch',
                            data: []
                        }
                    },
                    {
                        section_4: {
                            label: 'Snack After Lunch',
                            data: []
                        }
                    },
                    {
                        section_5: {
                            label: 'Dinner',
                            data: []
                        }
                    },
                    {
                        section_6: {
                            label: 'Before Bed',
                            data: []
                        }
                    },
                ],
                mealplan: [
                    {
                        mealplan_1: [
                            {
                                section_0: {
                                    label: 'Up on Waking Up',
                                    data: []
                                }
                            },
                            {
                                section_1: {
                                    label: 'Break Fast',
                                    data: []
                                }
                            },
                            {
                                section_2: {
                                    label: 'Snack After Break Fast',
                                    data: []
                                }
                            },
                            {
                                section_3: {
                                    label: 'Lunch',
                                    data: []
                                }
                            },
                            {
                                section_4: {
                                    label: 'Snack After Lunch',
                                    data: []
                                }
                            },
                            {
                                section_5: {
                                    label: 'Dinner',
                                    data: []
                                }
                            },
                            {
                                section_6: {
                                    label: 'Before Bed',
                                    data: []
                                }
                            },
                        ]
                    },
                    {
                        mealplan_2: [
                            {
                                section_0: {
                                    label: 'Up on Waking Up',
                                    data: []
                                }
                            },
                            {
                                section_1: {
                                    label: 'Break Fast',
                                    data: []
                                }
                            },
                            {
                                section_2: {
                                    label: 'Snack After Break Fast',
                                    data: []
                                }
                            },
                            {
                                section_3: {
                                    label: 'Lunch',
                                    data: []
                                }
                            },
                            {
                                section_4: {
                                    label: 'Snack After Lunch',
                                    data: []
                                }
                            },
                            {
                                section_5: {
                                    label: 'Dinner',
                                    data: []
                                }
                            },
                            {
                                section_6: {
                                    label: 'Before Bed',
                                    data: []
                                }
                            },
                        ]
                    },
                    {
                        mealplan_3: [
                            {
                                section_0: {
                                    label: 'Up on Waking Up',
                                    data: []
                                }
                            },
                            {
                                section_1: {
                                    label: 'Break Fast',
                                    data: []
                                }
                            },
                            {
                                section_2: {
                                    label: 'Snack After Break Fast',
                                    data: []
                                }
                            },
                            {
                                section_3: {
                                    label: 'Lunch',
                                    data: []
                                }
                            },
                            {
                                section_4: {
                                    label: 'Snack After Lunch',
                                    data: []
                                }
                            },
                            {
                                section_5: {
                                    label: 'Dinner',
                                    data: []
                                }
                            },
                            {
                                section_6: {
                                    label: 'Before Bed',
                                    data: []
                                }
                            },
                        ]
                    }
                ],
                nutrition: [],
                nutrition1: [],
                activity_level: '',
                protein: '',
                bg_protein: 'low',
                protein_percentage: '',
                carbohydrates: '',
                carbohydrate_percentage: '',
                fat_percentage: '',
                fatsCalculate: '',
                calory: '',
                images: [],
                name: '',
                email: '',
                mobile: '',
                dateofbirth: '',
                gender: '',
                height: '',
                weight: '',
                program_opted: [],
                program_type: [],
                tenure: '',
                health_issue: '',
                health_issue_desc: '',
                food_kind: [],
                food_alergy: '',
                food_alergy_desc: '',
                medication: '',
                profileUrl: '',
                pictures: {},
                pictures_terms_check: '',
                special_request: '',
                message: '',
                progressUpload: 0,
                file: File,
                uploadTask: '',
                picturesTemp: {},
                downloadURL: '',
                uploadEnd: false,
                wasSidebarOpen: null,
                isNavOpen: false,
                uid: localStorage.getItem('uid'),
                age: '',
                wake_up_id: [],
                wakeup_quantity: 0,
                wakeup_unit: '',
                wakeup_kcal: 0,
                wakeup_protein: 0,
                wakeup_carb: 0,
                wakeup_fat: 0,
                food_name: '',
                food_quantity: 0,
                food_unit: '',
                food_kcal: '',
                food_protein: '',
                food_carb: '',
                food_fat: '',
                unit_original: '',
                kcal_original: '',
                protein_original: '',
                carb_original: '',
                fat_original: '',
                alt_measures: [],
                serving_weight_grams: '',
                full_nutrients: [],
                nutrients_potassium: 0,
                nutrients_sodium: 0,
                nutrients_vitamin_a: 0,
                nutrients_vitamin_c: 0,
                nutrients_calcium: 0,
                nutrients_iron: 0,
                nutrients_cholesterol: 0,
                nutrients_fiber: 0,
                nutrients_protien: 0,
            }
        },
        computed: {},
        created(){
            this.program_opted = []
            this.food_kind = []

            if (this.uid) {
                this.getUserDetail();
                firebase.firestore().collection('nutrition').get().then((querySnapshot) => {
                    this.nutrition = []
                    querySnapshot.forEach((doc) => {
                        const source = {
                            uid: doc.id,
                            data: doc.data()
                        }
                        this.nutrition.push(source)
                    })
                })
                this.calculateTotal();
            }
        },
        methods: {
            getImage(path) {
                return path;
            },
            calculateTotalNutritionFactByMealPlanNo(){
                if (this.sections.length > 0) {
                    this.food_kcal = 0
                    this.food_name = 'All Foods'
                    this.food_protein = 0
                    this.food_carb = 0
                    this.food_fat = 0
                    this.nutrients_potassium = 0
                    this.nutrients_protien = 0
                    this.nutrients_sodium = 0
                    this.nutrients_vitamin_a = 0
                    this.nutrients_vitamin_c = 0
                    this.nutrients_calcium = 0
                    this.nutrients_iron = 0
                    this.nutrients_cholesterol = 0
                    this.nutrients_fiber = 0

                    let nutrients_kcal = 0
                    let nutrients_protien = 0
                    let nutrients_fat = 0
                    let nutrients_carbs = 0
                    let nutrients_potassium = 0
                    let nutrients_sodium = 0
                    let nutrients_vitamin_a = 0
                    let nutrients_vitamin_c = 0
                    let nutrients_calcium = 0
                    let nutrients_iron = 0
                    let nutrients_cholesterol = 0
                    let nutrients_fiber = 0
                    let food_kcal = 0
                    let qty = 1
                    for (var i = 0; i <= this.sections.length - 1; i++) {
                        let data = this.sections[i]['section_' + i].data;
                        if (data.length > 0) {
                            nutrients_kcal = 0
                            nutrients_protien = 0
                            nutrients_fat = 0
                            nutrients_carbs = 0
                            nutrients_potassium = 0
                            nutrients_sodium = 0
                            nutrients_vitamin_a = 0
                            nutrients_vitamin_c = 0
                            nutrients_calcium = 0
                            nutrients_iron = 0
                            nutrients_cholesterol = 0
                            nutrients_fiber = 0
                            food_kcal = 0
                            qty = 1
                            for (var k = 0; k <= data.length - 1; k++) {
                                let item = data[k]
                                let unit = item.wakeup_unit
                                let vals = 0
                                let alt_measures = item.alt_measures
                                let serving_weight_grams = item.serving_weight_grams
                                let full_nutrients = item.full_nutrients

                                if(alt_measures){
                                    alt_measures.forEach((row, index) => {
                                    if (row.measure == unit) {
                                        qty = row.qty
                                        vals = row.serving_weight
                                    }
                                })
                                full_nutrients.forEach((row, index) => {
                                    if (row.attr_id == 208) nutrients_kcal = row.value;
                                    if (row.attr_id == 203) nutrients_protien = row.value;
                                    if (row.attr_id == 204) nutrients_fat = row.value;
                                    if (row.attr_id == 205) nutrients_carbs = row.value;
                                    if (row.attr_id == 306) nutrients_potassium = row.value;
                                    if (row.attr_id == 307) nutrients_sodium = row.value;
                                    if (row.attr_id == 318) nutrients_vitamin_a = row.value;
                                    if (row.attr_id == 401) nutrients_vitamin_c = row.value;
                                    if (row.attr_id == 301) nutrients_calcium = row.value;
                                    if (row.attr_id == 303) nutrients_iron = row.value;
                                    if (row.attr_id == 601) nutrients_cholesterol = row.value;
                                    if (row.attr_id == 291) nutrients_fiber = row.value;
                                })
//                                console.log(nutrients_kcal)
                                nutrients_kcal = item.wakeup_kcal
                                nutrients_protien = item.wakeup_protein
                                nutrients_fat = item.wakeup_fat
                                nutrients_carbs = item.wakeup_carb
                                nutrients_potassium = ((vals / serving_weight_grams) * nutrients_potassium) * item.wakeup_quantity
                                nutrients_sodium = ((vals / serving_weight_grams) * nutrients_sodium) * item.wakeup_quantity
                                nutrients_vitamin_a = ((vals / serving_weight_grams) * nutrients_vitamin_a) * item.wakeup_quantity
                                nutrients_vitamin_c = ((vals / serving_weight_grams) * nutrients_vitamin_c) * item.wakeup_quantity
                                nutrients_calcium = ((vals / serving_weight_grams) * nutrients_calcium) * item.wakeup_quantity
                                nutrients_iron = ((vals / serving_weight_grams) * nutrients_iron) * item.wakeup_quantity
                                nutrients_cholesterol = ((vals / serving_weight_grams) * nutrients_cholesterol) * item.wakeup_quantity
                                nutrients_fiber = ((vals / serving_weight_grams) * nutrients_fiber) * item.wakeup_quantity

                                this.food_kcal += nutrients_kcal
                                this.food_protein += nutrients_protien
                                this.food_carb += nutrients_carbs
                                this.food_fat += nutrients_fat
                                this.nutrients_potassium += nutrients_potassium
                                this.nutrients_protien += nutrients_protien
                                this.nutrients_sodium += nutrients_sodium
                                this.nutrients_vitamin_a += nutrients_vitamin_a
                                this.nutrients_vitamin_c += nutrients_vitamin_c
                                this.nutrients_calcium += nutrients_calcium
                                this.nutrients_iron += nutrients_iron
                                this.nutrients_cholesterol += nutrients_cholesterol
                                this.nutrients_fiber += nutrients_fiber
                                this.pieChartCalc = true

                            }
                            }

                        }
                    }
                }
            },
            popoupSeries(food_fat, food_kcal, nutrients_protien, food_carb){
                let fat = isNaN(food_fat) == true ? '0.00' : food_fat
                let kcal = isNaN(food_kcal) == true ? '0.00' : food_kcal
                let protein = isNaN(nutrients_protien) == true ? '0.00' : nutrients_protien
                let carb = isNaN(food_carb) == true ? '0.00' : food_carb
                return [Math.round(((9 * fat) / kcal) * 100),
                    Math.round(((4 * protein) / kcal) * 100),
                    Math.round(((4 * carb) / kcal) * 100)]
            },
            calculateKcalBySection(data){
                let kcals = 0;
                if (data && data.length > 0) {
                    for (var k = 0; k <= data.length - 1; k++) {
                        kcals += parseInt(data[k].wakeup_kcal)
                    }
                    return kcals;
                } else {
                    return 0;
                }
            },
            calculateNutritionFacts(item){
                this.openLoading();
                let config = {
                    headers: {
                        'x-app-id': '4e543d0d',
                        'x-app-key': '8b38d313df441ff4934f9faff6ab9c6f',
                        'x-user-jwt': 0
                    }
                }
                axios.post('https://trackapi.nutritionix.com/v2/natural/nutrients', {
                    query: item.name
                }, config)
                    .then(response => {
                        let row = response.data.foods ? response.data.foods : []
                        if (row.length > 0) {
                            row = row[0]
                            this.food_name = row.food_name
                            this.food_quantity = item.wakeup_quantity
                            this.food_unit = item.wakeup_unit
                            this.food_kcal = row.nf_calories
                            this.food_protein = row.nf_protein
                            this.food_carb = row.nf_total_carbohydrate
                            this.food_fat = row.nf_total_fat
                            this.unit_original = item.wakeup_unit
                            this.kcal_original = row.nf_calories
                            this.protein_original = row.nf_protein
                            this.carb_original = row.nf_total_carbohydrate
                            this.fat_original = row.nf_total_fat
                            this.alt_measures = row.alt_measures
                            this.serving_weight_grams = row.serving_weight_grams
                            this.full_nutrients = row.full_nutrients

                            this.nutrients_protien = row.nf_protein ? row.nf_protein : 0
                            this.nutrients_vitamin_a = 0
                            this.nutrients_vitamin_c = 0
                            this.nutrients_calcium = 0
                            this.nutrients_iron = 0
                            this.nutrients_cholesterol = row.nf_cholesterol ? row.nf_cholesterol : 0
                            this.nutrients_fiber = row.nf_dietary_fiber ? row.nf_dietary_fiber : 0
                            this.nutrients_potassium = row.nf_potassium ? row.nf_potassium : 0
                            this.nutrients_protien = row.nf_protein ? row.nf_protein : 0
                            this.nutrients_sodium = row.nf_sodium ? row.nf_sodium : 0

                            let unit = this.unit_original
                            let vals = 0
                            let nutrients_kcal = 0
                            let nutrients_protien = 0
                            let nutrients_fat = 0
                            let nutrients_carbs = 0
                            let nutrients_potassium = 0
                            let nutrients_sodium = 0
                            let nutrients_vitamin_a = 0
                            let nutrients_vitamin_c = 0
                            let nutrients_calcium = 0
                            let nutrients_iron = 0
                            let nutrients_cholesterol = 0
                            let nutrients_fiber = 0
                            let qty = 1

                            if(this.alt_measures){
                            this.alt_measures.forEach((row, index) => {
                                if (row.measure == unit) {
                                    qty = row.qty
                                    vals = row.serving_weight
                                }
                            })
                            this.full_nutrients.forEach((row, index) => {
                                if (row.attr_id == 208) nutrients_kcal = row.value;
                                if (row.attr_id == 203) nutrients_protien = row.value;
                                if (row.attr_id == 204) nutrients_fat = row.value;
                                if (row.attr_id == 205) nutrients_carbs = row.value;
                                if (row.attr_id == 306) nutrients_potassium = row.value;
                                if (row.attr_id == 307) nutrients_sodium = row.value;
                                if (row.attr_id == 318) nutrients_vitamin_a = row.value;
                                if (row.attr_id == 401) nutrients_vitamin_c = row.value;
                                if (row.attr_id == 301) nutrients_calcium = row.value;
                                if (row.attr_id == 303) nutrients_iron = row.value;
                                if (row.attr_id == 601) nutrients_cholesterol = row.value;
                                if (row.attr_id == 291) nutrients_fiber = row.value;
                            })

                            nutrients_kcal = (vals / this.serving_weight_grams) * nutrients_kcal
                            nutrients_protien = (vals / this.serving_weight_grams) * nutrients_protien
                            nutrients_fat = (vals / this.serving_weight_grams) * nutrients_fat
                            nutrients_carbs = (vals / this.serving_weight_grams) * nutrients_carbs
                            nutrients_potassium = (vals / this.serving_weight_grams) * nutrients_potassium
                            nutrients_sodium = (vals / this.serving_weight_grams) * nutrients_sodium
                            nutrients_vitamin_a = (vals / this.serving_weight_grams) * nutrients_vitamin_a
                            nutrients_vitamin_c = (vals / this.serving_weight_grams) * nutrients_vitamin_c
                            nutrients_calcium = (vals / this.serving_weight_grams) * nutrients_calcium
                            nutrients_iron = (vals / this.serving_weight_grams) * nutrients_iron
                            nutrients_cholesterol = (vals / this.serving_weight_grams) * nutrients_cholesterol
                            nutrients_fiber = (vals / this.serving_weight_grams) * nutrients_fiber

                            this.food_quantity = this.food_quantity
                            this.food_unit = this.food_unit
                            this.food_kcal = nutrients_kcal * this.food_quantity
                            this.food_protein = nutrients_protien * this.food_quantity
                            this.food_carb = nutrients_carbs * this.food_quantity
                            this.food_fat = nutrients_fat * this.food_quantity
                            this.nutrients_potassium = nutrients_potassium * this.food_quantity
                            this.nutrients_protien = nutrients_protien * this.food_quantity
                            this.nutrients_sodium = nutrients_sodium * this.food_quantity
                            this.nutrients_vitamin_a = nutrients_vitamin_a * this.food_quantity
                            this.nutrients_vitamin_c = nutrients_vitamin_c * this.food_quantity
                            this.nutrients_calcium = nutrients_calcium * this.food_quantity
                            this.nutrients_iron = nutrients_iron * this.food_quantity
                            this.nutrients_cholesterol = nutrients_cholesterol * this.food_quantity
                            this.nutrients_fiber = nutrients_fiber * this.food_quantity
                            this.kcal_original = nutrients_kcal
                            this.protein_original = nutrients_protien
                            this.carb_original = nutrients_carbs
                            this.fat_original = nutrients_fat
                        }
                        }
                    })
            },
            changeMealPlanData(number){
                this.mealplan_no = parseInt(number)
                this.mealplan_index = this.mealplan_no - 1
                this.sections = this.mealplan[this.mealplan_index]['mealplan_' + this.mealplan_no]
            },
            viewStats(mealplan_no){
                this.changeMealPlanData(mealplan_no)
                this.calculateTotal()
            },
            viewMealPlan(mealplan_no){
                this.changeMealPlanData(mealplan_no)
                this.calculateTotalNutritionFactByMealPlanNo()
                this.calculateTotal()
                this.popupActive = true
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
            downloadPdf(mealplan_no) {
                this.changeMealPlanData(mealplan_no)
                this.calculateTotalNutritionFactByMealPlanNo()
                this.calculateTotal()
                var HTML_Width = $("#mealplan-content-tables").width();
                var HTML_Height = $("#mealplan-content-tables").height();
                var top_left_margin = 15;
                var PDF_Width = HTML_Width + (top_left_margin * 2);
                var PDF_Height = (PDF_Width * 1.5) + (top_left_margin * 2);
                var canvas_image_width = HTML_Width;
                var canvas_image_height = HTML_Height;
                var totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;

                html2canvas($("#mealplan-content-tables")[0], {
                    allowTaint: true,
                    useCORS: true,
                    proxy: true
                }).then(function (canvas) {
                    canvas.getContext('2d');
                    var imgData = canvas.toDataURL("image/png", 1.0);
                    var pdf = new jsPDF('p', 'pt', [PDF_Width, PDF_Height]);
                    pdf.addImage(imgData, 'JPEG', top_left_margin, top_left_margin, canvas_image_width, canvas_image_height);
                    for (var i = 1; i <= totalPDFPages; i++) {
                        pdf.addPage(PDF_Width, PDF_Height);
                        pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height * i) + (top_left_margin * 4), canvas_image_width, canvas_image_height);
                    }
                    pdf.save('meal-plan' + mealplan_no + '.pdf');
                })
            },
            RecipeBook() {
                axios({
                    url: 'https://backend.xtremeperformance.co.in/mailer/RecipeBook.pdf',
                    method: 'GET',
                    responseType: 'blob',
                }).then((response) => {
                    var fileURL = window.URL.createObjectURL(new Blob([response.data]));
                    var fileLink = document.createElement('a');

                    fileLink.href = fileURL;
                    fileLink.setAttribute('download', 'RecipeBook.pdf');
                    document.body.appendChild(fileLink);

                    fileLink.click();
                });
            },
            WelcomeKit() {
                axios({
                    url: 'https://backend.xtremeperformance.co.in/mailer/WelcomeKit.pdf',
                    method: 'GET',
                    responseType: 'blob',
                }).then((response) => {
                    var fileURL = window.URL.createObjectURL(new Blob([response.data]));
                    var fileLink = document.createElement('a');

                    fileLink.href = fileURL;
                    fileLink.setAttribute('download', 'WelcomeKit.pdf');
                    document.body.appendChild(fileLink);

                    fileLink.click();
                });
            },
            calculateTotal(){
                this.series =
                    [0, 0, 0, 0],
                    this.analyticsLedgarData = [
                        {'orderType': 'Total Kcal', 'counts': 0, color: 'primary'},
                        {'orderType': 'Protein', 'counts': 0, color: 'warning'},
                        {'orderType': 'Carbs ', 'counts': 0, color: 'danger'},
                        {'orderType': 'Fats ', 'counts': 0, color: 'success'},
                    ]
                this.wakeup_quantity = 0;
                this.wakeup_kcal = 0;
                this.wakeup_protein = 0;
                this.wakeup_carb = 0;
                this.wakeup_fat = 0;
                for (var i = 0; i <= this.sections.length - 1; i++) {
                    let data = this.sections[i]['section_' + i].data;
                    if (data.length > 0) {
                        for (var k = 0; k <= data.length - 1; k++) {
                            this.wakeup_quantity += parseInt(data[k].wakeup_quantity)
                            this.wakeup_quantity = isNaN(this.wakeup_quantity) == true ? '0.00' : this.wakeup_quantity
                            this.wakeup_kcal += parseInt(data[k].wakeup_kcal)
                            this.wakeup_protein += parseInt(data[k].wakeup_protein)
                            this.wakeup_protein = isNaN(this.wakeup_protein) == true ? '0.00' : this.wakeup_protein
                            this.wakeup_carb += parseInt(data[k].wakeup_carb)
                            this.wakeup_fat += parseInt(data[k].wakeup_fat)
                            this.wakeup_fat = isNaN(this.wakeup_fat) == true ? '0.00' : this.wakeup_fat
                            this.series =
                                [this.wakeup_kcal,
                                    Math.round(((4 * this.wakeup_protein) / this.wakeup_kcal) * 100),
                                    Math.round(((4 * this.wakeup_carb) / this.wakeup_kcal) * 100),
                                    Math.round(((9 * this.wakeup_fat) / this.wakeup_kcal) * 100),
                                ],
                                this.analyticsLedgarData = [
                                    {'orderType': 'Total Kcal', 'counts': this.wakeup_kcal, color: 'primary'},
                                    {
                                        'orderType': 'Protein',
                                        'counts': Math.round(((4 * this.wakeup_protein) / this.wakeup_kcal) * 100),
                                        color: 'warning'
                                    },
                                    {
                                        'orderType': 'Carbs ',
                                        'counts': Math.round(((4 * this.wakeup_carb) / this.wakeup_kcal) * 100),
                                        color: 'danger'
                                    },
                                    {
                                        'orderType': 'Fats ',
                                        'counts': Math.round(((9 * this.wakeup_fat) / this.wakeup_kcal) * 100),
                                        color: 'success'
                                    },
                                ]
                        }
                    }
                }
            },
            insertRow(index){
                this.sections[index]['section_' + index].data.push([]);
            },
            deleteRow(index, index1){
                this.sections[index]['section_' + index].data.splice(index1, 1);
                firebase.firestore().collection('users').doc(this.uid).get()
                    .then(snap => {
                        snap.ref.update({sections: this.sections});
                        this.$vs.notify({
                            title: 'Deleted',
                            text: 'Successfully deleted the record',
                            iconPack: 'feather',
                            icon: 'icon-check',
                            color: 'success'
                        });
                        console.log('Successfully deleted the record')
                        this.calculateTotal();
                    })
                    .catch(error => {
                        console.error('There was an error editing the record: ' + error)
                        this.$vs.notify({
                            title: 'Something went wrong',
                            text: 'while update!',
                            iconPack: 'feather',
                            icon: 'icon-check',
                            color: 'danger'
                        });
                    })
            },
            dateFormat(date) {
                return date != '' ? moment(date).format('dddd, Do MMMM YYYY') : '';
            },
            detectFiles(fileList){
                this.picturesTemp = fileList
            },
            getUserDetail() {
                firebase.firestore().collection('users')
                    .doc(this.uid)
                    .get()
                    .then(snap => {
                        let data = snap.data();
                        let memberObj = data['memberDetail'];
                        this.name = data['name'];
                        this.email = data['email'];
                        this.mobile = data['mobile'];
                        this.gender = data['gender'];

                        if (data['is_mealplan_ready'] && data['is_mealplan_ready'] == true || data['is_mealplan_ready'] >= 1) {
                            this.mealplan_exist=true
                            let selected_mealplan = this.mealplan[this.mealplan_index]
                            this.sections = data['mealplan'] && data['mealplan'].length > 0 && data['mealplan'][this.mealplan_index]['mealplan_' + this.mealplan_no].length ? data['mealplan'][this.mealplan_index]['mealplan_' + this.mealplan_no] : selected_mealplan['mealplan_' + this.mealplan_no];
                            this.mealplan = data['mealplan'] ? data['mealplan'].length > 0 ? data['mealplan'] : this.mealplan : this.mealplan;
                        }

                        // this.sections = this.sections ? data['sections'].length > 0 ? data['sections']: this.sections : this.sections;
                        this.profileUrl = data['profileUrl'] ? data['profileUrl'] : 'https://pngriver.com/wp-content/uploads/2018/04/Download-User-Male-Alt-Png-Image-100947-For-Designing-Projects.png';
                        // Member Detail Data
                        this.dateofbirth = memberObj['dateofbirth'];
                        this.height = memberObj['height'];
                        let weight_convert = (memberObj['weight_in_kg'] != '') ? (Math.floor(memberObj['weight_in_kg'] / 0.45359237)) : memberObj['weight_in_lbs']
                        this.weight = (weight_convert - Math.floor(weight_convert) != '') ? (weight_convert).toFixed(2) : weight_convert;//weight kg convert into lBS

                        // this.weight= (memberObj['weight_in_kg']!='')?(memberObj['weight_in_kg']):memberObj['weight_in_lbs'] ;//weight kg convert into lBS

                        this.activity_level = memberObj['activity_level'];
                        // this.bg_protein=memberObj['bg_protein'];
                        var program = memberObj['program_opted'];
                        firebase.firestore().collection('program-opted').doc(program).get()
                            .then((doc) => {
                                const trainer = {
                                    id: doc.id,
                                    name: doc.data()['title']
                                }
                                this.program_opted.push(trainer)
                            });
                        firebase.firestore().collection('package').doc(memberObj['program_type']).get()
                            .then((doc) => {
                                const trainer = {
                                    id: doc.id,
                                    name: doc.data()['title']
                                }
                                this.program_type.push(trainer)
                            });
                        var fKinds = []
                        memberObj['food_kinds'].forEach(function (itemRef) {
                            firebase.firestore().collection('food-kinds').doc(itemRef).get()
                                .then((doc) => {
                                    const trainer = {
                                        id: doc.id,
                                        name: doc.data()['title']
                                    }
                                    fKinds.push(trainer)
                                });
                        });
                        this.food_kind = fKinds
                        this.tenure = memberObj['tenure'];
                        this.health_issue = memberObj['health_issue'];
                        this.health_issue_desc = memberObj['health_issue_desc'];
                        this.food_alergy = memberObj['food_alergy'];
                        this.food_alergy_desc = memberObj['food_alergy_desc'];
                        this.medication = memberObj['medication'];
                        this.pictures = memberObj['pictures'];
                        this.pictures_terms_check = memberObj['pictures_terms_check'];
                        this.special_request = memberObj['special_request'] ? memberObj['message'] : 'There is no Special Request';
                        this.message = memberObj['message'] ? memberObj['message'] : 'There is no Message';
                        this.changeItem()
                    })
                    .then(() => {
                        if (this.calory != '0.00') {
                            this.$vs.notify({
                                title: 'Retrieved',
                                text: 'Successfully get the detail',
                                iconPack: 'feather',
                                icon: 'icon-check',
                                color: 'success'
                            });
                        }
                        this.calculateTotal();
                        console.log('Successfully get user detail.')
                    })
                    .catch(error => {
                        this.calculateTotal();
                        console.error('There was an error editing the record: ' + error)
                    })
            },
            mealPlan: function mealPlan(rowIndex, rowIndexData, event) {
                firebase.firestore().collection('nutrition').doc(event.target.value).get().then((querySnapshot) => {
                    let data = querySnapshot.data();
                    let food = {
                        nutrition_name: event.target.value,
                        wakeup_quantity: data.Quantity,
                        wakeup_unit: data.Unit,
                        wakeup_kcal: data.Kcal,
                        wakeup_protein: data.Protein,
                        wakeup_carb: data.Carbs,
                        wakeup_fat: data.Fat
                    }

                    this.sections[rowIndex]['section_' + rowIndex].data.splice(rowIndexData, 1, food);
                    this.calculateTotal();
                });
                firebase.firestore().collection('users').doc(this.uid).get()
                    .then(snap => {
                        snap.ref.update({sections: this.sections});
                        this.$vs.notify({
                            title: 'Added',
                            text: 'Successfully added the record',
                            iconPack: 'feather',
                            icon: 'icon-check',
                            color: 'success'
                        });
                        console.log('Successfully updated the record')
                    })
                    .catch(error => {
                        console.error('There was an error editing the record: ' + error)
                        this.$vs.notify({
                            title: 'Something went wrong',
                            text: 'while update!',
                            iconPack: 'feather',
                            icon: 'icon-check',
                            color: 'danger'
                        });
                    })
            },
            changeItem: function changeItem() {
                var dob = moment(this.dateofbirth).format('DD-MMMM-YYYY')
                this.age = moment().diff(dob, 'years')
                if (this.gender != '') {
                    if (this.age != '0') {
                        if (this.gender == 'male') {
                            let total_Average = 0
                            var fat = ((4.57 / (1.10938 - (0.0008267 * total_Average) + (0.0000016 * (total_Average) ** 2) - (0.000257 * this.age))) - 4.142) * 100
                        }
                        else if (this.gender == 'female') {
                            let total_Average = 0
                            var fat = ((4.57 / (1.0994921 - (0.0009929 * total_Average) + (0.0000023 * (total_Average) ** 2) - (0.0001392 * this.age))) - 4.142) * 100
                        }

                        let activity = this.activity_level

                        let lmb = this.weight - (this.weight * (fat / 100))
                        this.lmb = (lmb).toFixed(2)
                        let rmr = 370 + (21.6 * (lmb / 2.2))
                        this.rmr = (rmr).toFixed(2)
                        let fbm = this.weight * (fat / 100)
                        this.fbm = (fbm).toFixed(2)
                        let calories = rmr * activity
                        let macroCalory = (rmr * activity).toFixed(2)
                        this.calory = isNaN(macroCalory) == true ? '0.00' : macroCalory

                        if (this.bg_protein == 'low') {
                            this.protein_percentage = '25%'
                            this.carbohydrate_percentage = '50%'
                            this.fat_percentage = '25%'
                            let calories_protein = calories * 0.25
                            let protein = calories_protein / 4
                            let macroProtein = (protein).toFixed(2)
                            this.protein = isNaN(macroProtein) == true ? '0.00' : macroProtein
                            let calories_carbohydrates = calories * 0.5
                            let calory_carbohydrate = calories_carbohydrates / 4
                            let macroCarbohydrate = (calory_carbohydrate).toFixed(2)
                            this.carbohydrates = isNaN(macroCarbohydrate) == true ? '0.00' : macroCarbohydrate
                            let fat_calories = calories * 0.25
                            let fat = fat_calories / 9
                            let macroFat = (fat).toFixed(2)
                            this.fatsCalculate = isNaN(macroFat) == true ? '0.00' : macroFat
                        } else if (this.bg_protein == 'high') {
                            this.protein_percentage = '50%'
                            this.carbohydrate_percentage = '30%'
                            this.fat_percentage = '20%'
                            let calories_protein = calories * 0.5
                            let protein = calories_protein / 4
                            let macroProtein = (protein).toFixed(2)
                            this.protein = isNaN(macroProtein) == true ? '0.00' : macroProtein
                            let calories_carbohydrates = calories * 0.3
                            let calory_carbohydrate = calories_carbohydrates / 4
                            let macroCarbohydrate = (calory_carbohydrate).toFixed(2)
                            this.carbohydrates = isNaN(macroCarbohydrate) == true ? '0.00' : macroCarbohydrate
                            let fat_calories = calories * 0.2
                            let fat = fat_calories / 9
                            let macroFat = (fat).toFixed(2)
                            this.fatsCalculate = isNaN(macroFat) == true ? '0.00' : macroFat
                        } else if (this.bg_protein == 'normal') {
                            this.protein_percentage = '40%'
                            this.carbohydrate_percentage = '40%'
                            this.fat_percentage = '20%'
                            let calories_protein = calories * 0.4
                            let protein = calories_protein / 4
                            let macroProtein = (protein).toFixed(2)
                            this.protein = isNaN(macroProtein) == true ? '0.00' : macroProtein
                            let calories_carbohydrates = calories * 0.4
                            let calory_carbohydrate = calories_carbohydrates / 4
                            let macroCarbohydrate = (calory_carbohydrate).toFixed(2)
                            this.carbohydrates = isNaN(macroCarbohydrate) == true ? '0.00' : macroCarbohydrate
                            let fat_calories = calories * 0.2
                            let fat = fat_calories / 9
                            let macroFat = (fat).toFixed(2)
                            this.fatsCalculate = isNaN(macroFat) == true ? '0.00' : macroFat
                        }
                        if (this.calory == '0.00') {
                            this.$vs.notify({
                                title: '',
                                text: 'Please Complete Your Profile!',
                                iconPack: 'feather',
                                icon: 'icon-alert-circle',
                                color: 'danger'
                            });
                        }
                    }
                }
            },
            loadContent() {
                this.$vs.loading({
                    background: this.backgroundLoading,
                    color: this.colorLoading,
                    container: "#pdf-save",
                    scale: 0.45
                })
                setTimeout(() => {
                    this.$vs.loading.close("#pdf-save > .con-vs-loading")
                }, 3000);
            },
            customFormatter(date) {
                return date
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
            Progress,
            VueApexCharts,
            StatisticsCardLine,
            ChangeTimeDurationDropdown,
            'v-select': vSelect,
        },
    }
</script>
<style lang="scss">
    .dropdown-button-container {
        display: flex;
        align-items: center;

        .btnx {
            border-radius: 5px 0px 0px 5px;
        }

        .btn-drop {
            border-radius: 0px 5px 5px 0px;
            border-left: 1px solid rgba(255, 255, 255, .2);
        }
    }
</style>

<style scoped>
    legend {
        padding: 20px;
        font-size: 30px;
    }

    fieldset {
        padding: 20px;
        border-radius: 10px;
    }

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

    .img-holder {
        display: block;
        width: 200px;
        height: 200px;
        border-radius: 50%;
        overflow: hidden;
        margin: 20px auto 40px;
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
        margin: 0 auto;
    }

    @media only screen and ( max-width: 991px ) {
        .member li {
            width: 32%;
        }

        .eat-check .con-vs-checkbox {
            width: 31%;
        }

        .text-holder {
            width: 100%;
        }
    }

    @media only screen and ( max-width: 575px ) {
        /*.vx-row > .vx-col{*/
        /*  width: 100% !important;*/
        /*}*/
        .eat-check .con-vs-checkbox {
            width: 47%;
        }

        .member-days li {
            width: 32%;
        }
    }

    .meal-plan-table td, .meal-plan-table th {
        border-left: 1px solid #eee !important;
    }

    .btn-view {
        float: right;
        margin-top: 10px;
        margin-bottom: 20px;
    }

    .dropdown-button-container {
        float: right;
        margin: 10px;
    }

    .dropdown-button-container .btnx {
        border-radius: 5px 0px 0px 5px;
    }

    .dropdown-button-container .btn-drop {
        border-radius: 0px 5px 5px 0px;
        border-left: 1px solid rgba(255, 255, 255, .2);
    }

    .nutritionLabel {
        font-size: 90%;
        margin-bottom: 1.1em;
        padding: .68em;
        color: #333;
        border: 2px solid #000;
        line-height: normal;
    }

    .nutritionLabel .title {
        line-height: .83em;
        font-size: 2.7em;
        padding-bottom: 4px;
        white-space: nowrap;
        letter-spacing: -2px;
    }

    .nutritionLabel .name {
        font-size: 1.1em;
        line-height: 1.3em;
    }

    .nutritionLabel .serving {
        font-size: 1.1em;
        line-height: 1.28em;
    }

    .serving {
        font-size: 13px;
        color: #666;
    }

    .nutritionLabel .bar1 {
        height: 10px;
        line-height: 0;
        font-size: 1px;
        background: #333;
        margin-top: 30px;
    }

    .nutritionLabel .line {
        border-top: 1px solid #333;
        padding: 1px 0;
    }

    .nutritionLabel .m {
        font-size: .9em;
    }

    .nutritionLabel .bar2 {
        height: 5px;
        line-height: 0;
        font-size: 1px;
        background: #333;
    }

    .nutritionLabel .fr {
        float: right;
    }

    .nutritionLabel .ar {
        text-align: right;
    }

    .nutritionLabel .dv {
        float: right;
    }

    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        margin: -1px;
        padding: 0;
        overflow: hidden;
        clip: rect(0 0 0 0);
        border: 0;
    }

    .nutritionLabel .line.indent {
        margin-left: 15px;
    }

    .nutritionLabel .servingSizeText {
        display: inline-block;
    }

    nutritionLabel .servingSizeText {
        padding-right: .3em;
        margin-top: .3em;
    }

    .nutritionLabel .fl {
        float: left;
    }

    .nutritionLabel .rel {
        position: relative;
    }

    .nutritionLabel .servingSizeField {
        float: left;
        margin-top: .2em;
        margin-bottom: 0;
        margin-right: .4em;
    }

    .nutritionLabel .setter {
        width: 12px;
        padding: 3px 0 0 0;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 100;
    }

    .nutritionLabel a.unitQuantityUp {
        padding-bottom: 1px;
        background: transparent url(https://www.nutritionix.com/nix_bower_components/nutrition-label-jquery-plugin/dist/css/images/up.png) left top no-repeat;
        z-index: 9999;
    }

    .nutritionLabel .setter a {
        display: block;
        width: 9px;
        height: 7px;
        font-size: 1px;
        line-height: 0;
    }

    .nutritionLabel a.unitQuantityDown {
        padding-top: 1px;
        background: transparent url(https://www.nutritionix.com/nix_bower_components/nutrition-label-jquery-plugin/dist/css/images/down.png) left bottom no-repeat;
        z-index: 9999;
    }

    .nutritionLabel input.unitQuantityBox {
        width: 32px !important;
        height: 20px !important;
        padding: 2px;
        font-size: .9em !important;
        margin-left: 15px;
        margin-bottom: 0;
        line-height: 15px;
    }

    .nutritionLabel .servingUnit {
        float: left;
        padding: 0;
        margin-top: .3em;
        margin-bottom: .2em;
    }

    .nutritionLabel .servingWeightGrams {
        padding: 0 0 0 .3em;
        margin-top: .3em;
        margin-bottom: .2em;
    }

    .nutrition-facts {
        position: sticky;
        top: 0;
    }


</style>
