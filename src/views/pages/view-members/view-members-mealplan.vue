<!-- =========================================================================================
  File Name: view meal plan for trainer
  Description: Trainer can view member stats,profile add meal plan option withs charts
   ========================================================================================== -->

<template>
    <div id="form" class="member-trainer-profile-view1">
        <vs-button color="primary" class="mb-5 ml-5" style="float: right; " type="filled"
                   @click="$router.push({name:'view-members-profile',params:{uid }})" icon-pack="feather"
                   icon="icon-bell" icon-after>Back to Member's Profile
        </vs-button>
        <vs-button color="success" class="mb-5" style="float: right;" type="gradient" @click="sendToMember"
                   icon-pack="feather" icon="icon-bell" icon-after>Send to Member
        </vs-button>

        <!--<div class="title" tabindex="0">-->
        <vs-button color="success" class="mb-5 mr-2" style="float: right;" type="gradient">
            <a href="javascript:void(0);" style="color:#fff" @click="viewMealPlan()">View All</a>
        </vs-button>
        <!--</div>-->
        <div class="clearfix"></div>
        <div class="vx-row">

            <div class="clearfix"></div>
            <div class="vx-col w-full lg:w-1/2 md:w-1/2 sm:w-1/1 w-full mb-base">
                <div class="clearfix"></div>
                <div v-for="(section, index) in sections" v-bind:key="section">
                    <vx-card :title="section['section_'+index].label" class="mb-4"
                             v-if="section['section_'+index].data && section['section_'+index].data.length > 0">
                        <div v-for="(sectionData, index1) in section['section_'+index].data" v-bind:key="sectionData">
                            <span v-if="index1 == 0"
                                  style="position:relative;top: -20px;"> {{calculateKcalBySection(section['section_' + index].data)}}&nbsp;Calories</span>

                            <div class="vx-row mb-3" style="cursor: pointer"
                                 @click="calculateNutritionFacts(sectionData)">
                                <div class="vx-col lg:w-1/6 md:w-1/6 sm:w-1/1 ">
                                    <img v-if="sectionData.image" :src="sectionData.image"
                                         style="width:50px;height:50px;float: left;">
                                </div>
                                <div class="vx-col lg:w-5/6 md:w-5/6 sm:w-1/1 w-full">
                                    <h6 style="text-transform: capitalize;" class="mb-2">{{ sectionData.name }}</h6>
                                    <p style="font-size: 12px !important;text-transform: capitalize;margin-bottom:0;">
                                        {{ sectionData.wakeup_quantity ? sectionData.wakeup_quantity : ''}}  {{ sectionData.wakeup_unit ? sectionData.wakeup_unit : ''}}</p>
                                </div>
                            </div>
                        </div>
                    </vx-card>
                </div>
            </div>
            <div class="vx-col w-full lg:w-1/2 md:w-1/2 sm:w-1/1 w-full mb-base">

                <vx-card class="mb-4">

                    <div class="vs-con-loading__container" id="div-with-loading">
                        <div class="label-container">
                            <div id="label-n22ihttd37">
                                <div class="nutritionLabel" style=" width:100%">
                                    <div class="title" tabindex="0">Nutrition Facts</div>
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
                                            <strong>{{food_fat ? parseFloat(food_fat).toFixed(2) : 0}} g</strong></div>
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

                        <div class="vx-row">

                            <div class="lg:w-1/1 md:w-1/1 sm:w-1/1 mb-base mr-auto ml-auto" v-if="pieChartCalc==true">
                                <vue-apex-charts type="pie" height="270" :options="pieChart.chartOptions"
                                                 :series="popoupSeries(food_fat,food_kcal,nutrients_protien,food_carb)"></vue-apex-charts>
                            </div>
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
</template>

<script>
    import ClickOutside from 'vue-click-outside'

    require('firebase/firestore')
    import axios from 'axios';
    import 'firebase/auth'
    import firebase from 'firebase'
    import moment from 'moment'
    import vSelect from 'vue-select'
    import Progress from "easy-circular-progress";
    import VueApexCharts from 'vue-apexcharts'

    export default {
        data() {
            return {
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
                series: [],
                chart_wakeup_quantity: 0,
                chart_wakeup_kcal: 0,
                chart_wakeup_protein: 0,
                chart_wakeup_carb: 0,
                chart_wakeup_fat: 0,
                c_wakeup_quantity: 0,
                c_wakeup_protein: 0,
                c_wakeup_fat: 0,
                mealplan_index: 0,
                calculatePercentageSection: '',
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
                bg_protein: '',
                totalKcal: 0,
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
                uid: this.$route.params.uid,
                mealplan_no: this.$route.params.mealplan_no,
                age: '',
                wake_up_id: [],
                wakeup_quantity: 0,
                wakeup_unit: '',
                wakeup_kcal: 0,
                wakeup_protein: 0,
                wakeup_carb: 0,
                wakeup_fat: 0,
                height_in_inches: '',
                height_in_feet: '',
                items: [],
                dropdownShow: false,
                dropdownLoadingShow: false,
                dropdownLoadingShow1: false,
                loading: true,
                is_mealplan_ready: 0,
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
            }
        },
        computed: {},
        created() {
            this.calculateTotal();

            this.mealplan_index = parseInt(this.mealplan_no) - 1;
            this.program_opted = []
            // this.program_type = []
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
            popoupSeries(food_fat, food_kcal, nutrients_protien, food_carb){
                let fat = isNaN(food_fat) == true ? '0.00' : food_fat
                let kcal = isNaN(food_kcal) == true ? '0.00' : food_kcal
                let protein = isNaN(nutrients_protien) == true ? '0.00' : nutrients_protien
                let carb = isNaN(food_carb) == true ? '0.00' : food_carb
                return [Math.round(((9 * fat) / kcal) * 100),
                    Math.round(((4 * protein) / kcal) * 100),
                    Math.round(((4 * carb) / kcal) * 100)]
            },

            viewMealPlan(){
                this.calculateTotalNutritionFactByMealPlanNo()

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
            openLoading(){
                this.$vs.loading({
                    container: '#div-with-loading',
                    scale: 0.6
                })
                setTimeout(() => {
                    this.$vs.loading.close('#div-with-loading > .con-vs-loading')
                }, 1000);
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
                            this.nutrients_fiber = nf_dietary_fiber ? nf_dietary_fiber : 0
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
            sendToMember() {
                firebase.firestore().collection('users').doc(this.uid).get()
                    .then(snap => {
                        snap.ref.update({is_mealplan_ready: this.mealplan_no});
                        this.notify()
                        this.$vs.notify({
                            title: 'Added',
                            text: 'Meal Plan sent to member successfully.',
                            iconPack: 'feather',
                            icon: 'icon-check',
                            color: 'success'
                        });
                        this.$router.push('/view-members')
                        console.log('Successfully updated the record')
                    })
                    .catch(error => {
                        console.error('There was an error editing the record: ' + error)
                        this.$vs.notify({
                            title: 'Something went wrong',
                            text: 'while updating!',
                            iconPack: 'feather',
                            icon: 'icon-check',
                            color: 'danger'
                        });
                    })
            },
            hide() {
                this.dropdownShow = false;
            },
            updateItems(text, index, index1) {
                this.dropdownShow = false;
                this.loading = true;
                this.dropdownLoadingShow = index;
                this.dropdownLoadingShow1 = index1;
                axios.get('https://api.nutritionix.com/v1_1/search/' + text + '?results=0:50&fields=item_name,brand_name,item_id,nf_calories,nf_total_carbohydrate,nf_protein,nf_total_fat,nf_serving_size_unit,nf_serving_size_qty,images_front_full_url&appId=4e543d0d&appKey=8b38d313df441ff4934f9faff6ab9c6f')
                    .then(response => {
                        let lists = [];
                        response.data.hits.map(function (value, key) {
                            const list = {
                                id: value.fields.item_id,
                                name: value.fields.item_name,
                                wakeup_quantity: value.fields.nf_serving_size_qty,
                                wakeup_unit: value.fields.nf_serving_size_unit,
                                wakeup_kcal: value.fields.nf_calories,
                                wakeup_protein: value.fields.nf_protein,
                                wakeup_carb: value.fields.nf_total_carbohydrate,
                                wakeup_fat: value.fields.nf_total_fat,
                                wakeup_unit_original: value.fields.nf_serving_size_unit,
                                wakeup_kcal_original: value.fields.nf_calories,
                                wakeup_protein_original: value.fields.nf_protein,
                                wakeup_carb_original: value.fields.nf_total_carbohydrate,
                                wakeup_fat_original: value.fields.nf_total_fat
                            }
                            lists.push(list)
                        });
                        this.dropdownShow = true;
                        this.loading = false;
                        this.items = lists;
                        console.log(this.items)
                    })
                    .catch(e => {
                        console.log(e)
                    })
            },
            notify() {
                const notification = {
                    created_at: firebase.firestore.FieldValue.serverTimestamp(),
                    description: 'Your Meal Plan Is Ready To View',
                    isSeen: false,
                    receiver_id: this.uid,
                    receiver_name: this.name,
                    sender_id: localStorage.getItem('uid'),
                    sender_name: JSON.parse(localStorage.getItem('userInfo')).displayName,
                    type: 'mealPlan',
                    url: 'member/meal-plan'
                };
                firebase.firestore().collection("notification").add(notification).then(() => {
                    console.log('notify done')
                })

            },
            calculateTotal() {
                this.wakeup_quantity = 0;
                this.wakeup_kcal = 0;
                this.wakeup_protein = 0;
                this.wakeup_carb = 0;
                this.wakeup_fat = 0;

            },

            dateFormat(date) {
                return date != '' ? moment(date).format('dddd, Do MMMM YYYY') : '';
            },
            detectFiles(fileList) {
                this.picturesTemp = fileList
            },
            getUserDetail() {
                firebase.firestore().collection('users')
                    .doc(this.uid)
                    .get()
                    .then(snap => {
                        let data = snap.data();
                        let memberObj = data['memberDetail'];
                        this.name = data['first_name'] + ' ' + data['last_name'];
                        this.email = data['email'];
                        this.mobile = data['mobile'];
                        this.gender = data['gender'];
                        this.is_mealplan_ready = data['is_mealplan_ready'] ? data['is_mealplan_ready'] : 0;
                        let selected_mealplan = this.mealplan[this.mealplan_index]
                        this.sections = data['mealplan'] && data['mealplan'].length > 0 && data['mealplan'][this.mealplan_index]['mealplan_' + this.mealplan_no].length ?
                            data['mealplan'][this.mealplan_index]['mealplan_' + this.mealplan_no] : selected_mealplan['mealplan_' + this.mealplan_no];
                        this.calculatePercentageSection = this.sections

                        for (var i = 0; i <= this.sections.length - 1; i++) {
                            let data = this.sections[i] && this.sections[i]['section_' + i] ? this.sections[i]['section_' + i].data : false;
                            if (data && data.length > 0) {
                                for (var k = 0; k <= data.length - 1; k++) {
                                    this.c_wakeup_quantity += parseInt(data[k].wakeup_quantity)
                                    this.chart_wakeup_quantity = isNaN(this.c_wakeup_quantity) == true ? '0.00' : this.c_wakeup_quantity
                                    this.chart_wakeup_kcal += parseInt(data[k].wakeup_kcal)
                                    this.c_wakeup_protein += parseInt(data[k].wakeup_protein)
                                    this.chart_wakeup_protein = isNaN(this.c_wakeup_protein) == true ? '0.00' : this.c_wakeup_protein
                                    this.chart_wakeup_carb += parseInt(data[k].wakeup_carb)
                                    this.c_wakeup_fat += parseInt(data[k].wakeup_fat)
                                    this.chart_wakeup_fat = isNaN(this.c_wakeup_fat) == true ? '0.00' : this.c_wakeup_fat
                                }

                                this.series =
                                    [
                                        Math.round(((9 * this.chart_wakeup_fat) / this.chart_wakeup_kcal) * 100),
                                        Math.round(((4 * this.chart_wakeup_protein) / this.chart_wakeup_kcal) * 100),
                                        Math.round(((4 * this.chart_wakeup_carb) / this.chart_wakeup_kcal) * 100)
                                    ]
                            }

                        }
                        this.mealplan = data['mealplan'] ? data['mealplan'].length > 0 ? data['mealplan'] : this.mealplan : this.mealplan;
                        this.profileUrl = data['profileUrl'] ? data['profileUrl'] : 'https://pngriver.com/wp-content/uploads/2018/04/Download-User-Male-Alt-Png-Image-100947-For-Designing-Projects.png';
                        // Member Detail Data
                        this.dateofbirth = memberObj['dateofbirth'];
                        this.height_in_feet = memberObj['height_in_feet'];
                        this.height_in_inches = memberObj['height_in_inches'];
                        let weight_convert = (memberObj['weight_in_kg'] != '') ? (Math.floor(memberObj['weight_in_kg'] / 0.45359237)) : memberObj['weight_in_lbs']
                        this.weight = (weight_convert - Math.floor(weight_convert) != '') ? (weight_convert).toFixed(2) : weight_convert;//weight kg convert into lBS
                        this.activity_level = memberObj['activity_level'];
                        this.bg_protein = memberObj['bg_protein'];
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
                        this.calculateTotalNutritionFactByMealPlanNo()

                    })
                    .then(() => {
                        this.$vs.notify({
                            title: 'Retrieved',
                            text: 'Successfully get the detail',
                            iconPack: 'feather',
                            icon: 'icon-check',
                            color: 'success'
                        });
                        // this.calculateTotal();
                        console.log('Successfully get user detail.')
                    })
                    .catch(error => {
                        console.error('There was an error editing the record: ' + error)
                    })
            },
            mealPlan: function (rowIndex, rowIndexData, item) {
                this.dropdownShow = false;
                this.dropdownLoadingShow = false;
                this.dropdownLoadingShow1 = false;
                let food = {
                    id: item.id,
                    name: item.name,
                    wakeup_quantity: item.wakeup_quantity,
                    wakeup_unit: item.wakeup_unit,
                    wakeup_kcal: '123',//item.wakeup_kcal,
                    wakeup_protein: item.wakeup_protein,
                    wakeup_carb: item.wakeup_carb,
                    wakeup_fat: item.wakeup_fat,
                    wakeup_kcal_original: item.wakeup_kcal_original,
                    wakeup_protein_original: item.wakeup_protein_original,
                    wakeup_carb_original: item.wakeup_carb_original,
                    wakeup_fat_original: item.wakeup_fat_original
                }

                this.calculateTotal();

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
                            var total_Average = 0
                            var fat = ((4.57 / (1.10938 - (0.0008267 * total_Average) + (0.0000016 * (total_Average) ** 2) - (0.000257 * this.age))) - 4.142) * 100
                        } else if (this.gender == 'female') {
                            var total_Average = 0
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
                        this.calory = (rmr * activity).toFixed(2)
                        if (this.bg_protein == 'low') {
                            this.protein_percentage = '25%'
                            this.carbohydrate_percentage = '50%'
                            this.fat_percentage = '25%'
                            let calories_protein = calories * 0.25
                            let protein = calories_protein / 4
                            this.protein = (protein).toFixed(2)
                            let calories_carbohydrates = calories * 0.5
                            let calory_carbohydrate = calories_carbohydrates / 4
                            this.carbohydrates = (calory_carbohydrate).toFixed(2)
                            let fat_calories = calories * 0.25
                            let fat = fat_calories / 9
                            this.fatsCalculate = (fat).toFixed(2)
                        } else if (this.bg_protein == 'high') {
                            this.protein_percentage = '50%'
                            this.carbohydrate_percentage = '30%'
                            this.fat_percentage = '20%'
                            let calories_protein = calories * 0.5
                            let protein = calories_protein / 4
                            this.protein = (protein).toFixed(2)
                            let calories_carbohydrates = calories * 0.3
                            let calory_carbohydrate = calories_carbohydrates / 4
                            this.carbohydrates = (calory_carbohydrate).toFixed(2)
                            let fat_calories = calories * 0.2
                            let fat = fat_calories / 9
                            this.fatsCalculate = (fat).toFixed(2)
                        } else if (this.bg_protein == 'normal') {
                            this.protein_percentage = '40%'
                            this.carbohydrate_percentage = '40%'
                            this.fat_percentage = '20%'
                            let calories_protein = calories * 0.4
                            let protein = calories_protein / 4
                            this.protein = (protein).toFixed(2)
                            let calories_carbohydrates = calories * 0.4
                            let calory_carbohydrate = calories_carbohydrates / 4
                            this.carbohydrates = (calory_carbohydrate).toFixed(2)
                            let fat_calories = calories * 0.2
                            let fat = fat_calories / 9
                            this.fatsCalculate = (fat).toFixed(2)
                        }
                    }
                }
            },
            loadContent() {
                this.$vs.loading({
                    background: this.backgroundLoading,
                    color: this.colorLoading,
                    container: "#button-save",
                    scale: 0.45
                })
                setTimeout(() => {
                    this.$vs.loading.close("#button-save > .con-vs-loading")
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
            'v-select': vSelect,
            VueApexCharts
        },
        directives: {
            ClickOutside
        }
    }
</script>

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
        font-size: 13px !important;
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
        .vx-row > .vx-col {
            width: 100% !important;
        }

        .eat-check .con-vs-checkbox {
            width: 47%;
        }

        .member-days li {
            width: 32%;
        }
    }

    .custom-dropdown {
        width: 230px;
        float: left;
        left: 26px;
        height: 300px;
        overflow-y: auto;
        position: absolute !important;
        z-index: 99 !important;
        background: #fff !important;
    }

    .custom-dropdown li {
        width: 100%;
        float: left;
        border-bottom: 1px solid #ccc;
        border-left: 1px solid #ccc;
        border-right: 1px solid #ccc;
        padding: 10px;
    }

    .cstm-meal .cstm-table table.vs-table--tbody-table {
        position: inherit !important;
    }

    .custom-dropdown li {
        display: block;
        transition-duration: 0.5s;
    }

    .custom-dropdown li:hover {
        cursor: pointer;
    }

    ul.custom-dropdown li ul {
        visibility: hidden;
        opacity: 0;
        position: absolute;
        transition: all 0.5s ease;
        margin-top: 1rem;
        left: 0;
        display: none;
    }

    ul.custom-dropdown li:hover > ul,
    ul.custom-dropdown li ul:hover {
        visibility: visible;
        opacity: 1;
        display: block;
    }

    .vs-con-table .vs-con-tbody {
        overflow: inherit;
    }

    .member-trainer-profile-view1 .info td {
        width: 100%;
        float: left;
    }

    .member-trainer-profile-view1 .info table {
        width: 100%;
    }

    .member-trainer-profile-view1 table th {
        background-color: #f7f7f7;
    }

    .member-trainer-profile-view1 .info th, .member-trainer-profile-view1 .info td {
        padding: 3px !important;
    }

    .member-trainer-profile-view1 table h6 button, .member-trainer-profile-view1 table button.del-row-btn {
        float: right !important;
        border-radius: 50%;
        height: 35px !important;
        width: 35px !important;
        margin-right: 10px;
    }

    .member-trainer-profile-view1 .vs-table--tbody-table .tr-values:not(.activeEdit):not(.tr-expandedx):not(.hoverFlat):hover {
        -webkit-transform: none;
        transform: none;
    }

    .section-input input {
        font-size: 16px !important;
        font-weight: 600 !important;
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

</style>
