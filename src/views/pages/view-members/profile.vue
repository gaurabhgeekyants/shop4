<!-- =========================================================================================
    File Name: Member Profile
    Description: Member Profile Details for trainer view
     ========================================================================================== -->

<template>
    <div class="member-dashboard member-trainer-profile-view" id="page-user-view">

        <!--Profile Info Card Start-->

        <div class="vx-row mb-4">
            <div class="vx-col lg:w-1/4">

                <vx-card title="" class="mb-4">
                    <div style="text-align:center">

                        <img v-if="profileUrl != ''" :src="profileUrl"
                             class="" style="width:100%;margin:auto;max-height:300px">
                        <img v-if="profileUrl == '' && gender=='other'" style="width:100%;margin:auto;max-height:300px"
                             src=" ../../../assets/images/portrait/small/default-profile.png"
                             class="">
                        <img v-if="profileUrl == '' && gender=='female' "
                             style="width:100%;margin:auto;max-height:300px"
                             src="../../../assets/images/portrait/small/female_avatar_vector.png"
                             class="">
                        <img v-if="profileUrl == '' && gender=='male'" style="width:100%;margin:auto;max-height:300px"
                             src="../../../assets/images/portrait/small/default-profile.png"
                             class="">
                    </div>
                </vx-card>

                <vx-card title="" class="mb-4">
                    <div class="vx-row" v-if="instagram||twitter||facebook">
                        <div class="vx-col lg:w-1/1 md:w-1/1 w-full">
                            <h4 class="mb-4">Social</h4>
                            <ul style="display:inline-flex;width:100%;" class="mt-4">
                                <li style="width:25%;">
                                    <a v-show="instagram" :href='"http://instagram.com/"+instagram' target="_blank">
                                        <span><feather-icon icon="InstagramIcon" svgClasses="h-8 w-8"/></span></a>
                                </li>
                                <li style="width:25%;">
                                    <a v-show="twitter" :href='"https://twitter.com/"+twitter' target="_blank">
                                        <span><feather-icon icon="TwitterIcon" svgClasses="h-8 w-8"/></span></a>
                                </li>
                                <li style="width:25%;">
                                    <a v-show="facebook" :href='"https://www.facebook.com/"+facebook' target="_blank">
                                        <span><feather-icon icon="FacebookIcon" svgClasses="h-8 w-8"/></span></a>
                                </li>
                            </ul>

                        </div>

                    </div>
                    <div class="vx-row">
                        <div class="vx-col lg:w-1/1 w-full mt-4 mb-4">
                            <h4>Program & Packages</h4>
                        </div>

                    </div>
                    <div class="vx-row">
                        <div class="vx-col lg:w-1/2 w-full">
                            <strong>Package:</strong>
                        </div>
                        <div class="vx-col lg:w-1/2 w-full">
                            <vs-chip color="primary" class=" mb-6">{{packageTitle}}</vs-chip>
                        </div>
                    </div>

                    <div class="vx-row">
                        <div class="vx-col lg:w-1/2">
                            <strong>Status:</strong>&nbsp;
                        </div>
                        <div class="vx-col lg:w-1/2">
                            <vs-chip color="success" v-if="status === 'Active' || status === 'active'">
                                {{status}}
                            </vs-chip>
                            <vs-chip color="danger" v-if="status !== 'Active'">
                                {{status}}
                            </vs-chip>
                        </div>
                    </div>
                    <div class="vx-row">
                        <div class="vx-col lg:w-1/4">

                            <strong>Program:</strong>&nbsp;

                        </div>


                        <div class="vx-col lg:w-3/4">

                            <li style="font-size:12px; list-style:none;text-align:center;"
                                v-for="(region, index) in program_opted" :key="index">
                                {{ region.name }}
                            </li>

                        </div>

                    </div>


                </vx-card>
            </div>
            <div class="vx-col lg:w-3/4">
                <div class="vx-row">
                    <div class="vx-col lg:w-1/2 md:w-1/2 sm:w-1/1 w-full mb-4">
                        <vx-card title="Personal">
                            <div class="vx-row mb-4">
                                <div class="vx-col lg:w-1/4 md:w-1/4 sm:w-1/1">
                                    <h6>Name:</h6>
                                </div>
                                <div class="vx-col lg:w-3/4 md:w-3/4 sm:w-1/1">
                                    {{name}}
                                </div>
                            </div>
                            <div class="vx-row mb-4">
                                <div class="vx-col lg:w-1/4 md:w-1/4 sm:w-1/1">
                                    <h6>Gender:</h6>
                                </div>
                                <div class="vx-col lg:w-1/4 md:w-1/4 sm:w-1/1">
                                    {{gender}}
                                </div>
                                <div class="vx-col lg:w-1/4 md:w-1/4 sm:w-1/1">
                                    <h6>Age:</h6>
                                </div>
                                <div class="vx-col lg:w-1/4 md:w-1/4 sm:w-1/1">
                                    {{age}}
                                </div>
                            </div>

                            <div class="vx-row mb-4">
                                <div class="vx-col lg:w-1/4 md:w-1/4 sm:w-1/1">
                                    <h6>Height:</h6>
                                </div>
                                <div class="vx-col lg:w-1/4 md:w-1/4 sm:w-1/1">
                                    {{height_in_inches ? height_in_inches + ' Inches' : ''}}
                                    {{height_in_centimeter ? height_in_centimeter + ' Centimeter' : ''}}
                                </div>
                                <div class="vx-col lg:w-1/4 md:w-1/4 sm:w-1/1">
                                    <h6>Weight:</h6>
                                </div>
                                <div class="vx-col lg:w-1/4 md:w-1/4 sm:w-1/1">
                                    {{weight_with_type}}
                                </div>
                            </div>

                            <div class="vx-row mb-4">
                                <div class="vx-col lg:w-1/4 md:w-1/4 sm:w-1/1">
                                    <h6>Mobile No:</h6>
                                </div>
                                <div class="vx-col lg:w-3/4 md:w-3/4 sm:w-1/1">
                                    <a :href='"tel:"+mobile'>{{mobile}}</a>

                                </div>
                            </div>

                            <div class="vx-row mb-4">
                                <div class="vx-col lg:w-1/4 md:w-1/4 sm:w-1/1">
                                    <h6>Email:</h6>
                                </div>
                                <div class="vx-col lg:w-3/4 md:w-3/4 sm:w-1/1">
                                    {{email}}

                                </div>
                            </div>
                        </vx-card>
                    </div>
                    <div class="vx-col lg:w-1/2 md:w-1/2 sm:w-1/1 w-full mb-4">
                        <vx-card title="Food & Health">
                            <div class="vx-row mb-4">
                                <div class="vx-col lg:w-1/2 md:w-1/2 sm:w-1/1">
                                    <h6>Food Allergy:</h6>
                                </div>
                                <div class="vx-col lg:w-1/2 md:w-1/2 sm:w-1/1">
                                    {{food_alergy == 'yes' ? food_alergy_desc : 'No'}}
                                </div>
                            </div>
                            <div class="vx-row mb-4">
                                <div class="vx-col lg:w-1/2 md:w-1/2 sm:w-1/1">
                                    <h6>Food Kind:</h6>
                                </div>
                                <div class="vx-col lg:w-1/2 md:w-1/2 sm:w-1/1">
                                    <li style="padding-left:2%" v-if="food_kind.length > 0"
                                        v-for="(region1, index) in food_kind" :key="index">
                                        {{ region1.name }}
                                    </li>
                                    <li v-if="food_kind.length == 0">
                                        Nothing
                                    </li>
                                </div>
                            </div>
                            <div class="vx-row mb-4">
                                <div class="vx-col lg:w-1/2 md:w-1/2 sm:w-1/1">
                                    <h6>Health Issues:</h6>
                                </div>
                                <div class="vx-col lg:w-1/2 md:w-1/2 sm:w-1/1">
                                    {{health_issue == 'yes' ? health_issue : 'No'}}
                                </div>
                                <div class="vx-col lg:w-1/2 md:w-1/2 sm:w-1/1" v-show="health_issue_desc != ''">
                                    {{ health_issue_desc }}
                                </div>
                            </div>
                            <div class="vx-row mb-4">
                                <div class="vx-col lg:w-1/2 md:w-1/2 sm:w-1/1">
                                    <h6>Any Medication:</h6>
                                </div>
                                <div class="vx-col lg:w-1/2 md:w-1/2 sm:w-1/1">
                                    {{medication == 'yes' ? 'Yes' : 'No'}}
                                </div>
                                <div class="vx-col lg:w-1/2 md:w-1/2 sm:w-1/1" v-show="medication_desc != ''">
                                    {{ medication_desc }}
                                </div>
                            </div>
                        </vx-card>
                    </div>
                </div>
                <div class="vx-row">
                    <div class="vx-col lg:w-1/2 md:w-1/2 sm:w-1/1 w-full mb-4">
                        <vx-card title="Address">
                            <div class="vx-row mb-4">
                                <div class="vx-col lg:w-1/4 md:w-1/4 sm:w-1/1">
                                    <h6>Location:</h6>
                                </div>
                                <div class="vx-col lg:w-3/4 md:w-3/4 sm:w-1/1">
                                    {{location}}
                                </div>
                            </div>
                            <div class="vx-row mb-4">
                                <div class="vx-col lg:w-1/4 md:w-1/4 sm:w-1/1">
                                    <h6>Address:</h6>
                                </div>
                                <div class="vx-col lg:w-3/4 md:w-3/4 sm:w-1/1">
                                    {{address}}
                                </div>
                            </div>
                            <div class="vx-row mb-4">

                            </div>
                        </vx-card>
                    </div>
                    <div class="vx-col lg:w-1/2 md:w-1/2 sm:w-1/1 w-full">
                        <vx-card title="Training">
                            <div class="vx-row mb-4">
                                <div class="vx-col lg:w-1/4 md:w-1/4 sm:w-1/1">
                                    <h6>Workout:</h6>
                                </div>
                                <div class="vx-col lg:w-3/4 md:w-3/4 sm:w-1/1">
                                    &nbsp;{{tenure ? tenure + '-' + (parseInt(tenure) + parseInt(1)) + ' Days' : 'No'}}
                                </div>
                            </div>
                            <div class="vx-row mb-4">
                                <div class="vx-col lg:w-1/1 md:w-1/1 sm:w-1/1 w-full">
                                    <h6>Special Request For Trainer Coach</h6>
                                </div>

                            </div>
                            <div class="vx-row mb-4">
                                <div class="vx-col lg:w-1/1 md:w-1/1 sm:w-1/1 w-full">
                                    {{special_request ? special_request : 'No'}}
                                </div>

                            </div>
                        </vx-card>
                    </div>
                </div>

            </div>

        </div>

        <div class="vx-row">

            <div class="vx-col lg:w-1/3 md:w-1/3 w-full sm:w-1/1 mb-base">
                <vx-card title="Front Image">
                    <div class="avatars">
                        <img v-if="frontImagePreview != ''" :src='frontImagePreview' alt="Xtreme Performance"
                             style="width: 120px;height:100%; display: block; margin:0 auto;">

                        <img v-if="frontImagePreview == ''" src="@/assets/images/pages/register/front-pic.png"
                             alt="Xtreme Performance"
                             style="width: 120px;height:100%; display: block; margin:0 auto;">
                    </div>
                </vx-card>

            </div>

            <div class="vx-col lg:w-1/3 md:w-1/3 sm:w-1/1 w-full mb-base">
                <vx-card title="Side Image">
                    <div class="avatars">
                        <img v-if="sideImagePreview != ''" :src='sideImagePreview' alt="Xtreme Performance"
                             style="width: 120px; display: block;height:100%; margin:0 auto;">
                        <img v-if="sideImagePreview == ''" src="@/assets/images/pages/register/side-pic.png"
                             alt="Xtreme Performance"
                             style="width: 120px;height:100%; display: block; margin:0 auto;">
                    </div>
                </vx-card>
            </div>

            <div class="vx-col lg:w-1/3 md:w-1/3 sm:w-1/1 w-full mb-base">
                <vx-card title="Back Image">
                    <div class="avatars">
                        <img v-if="backImagePreview != ''" :src='backImagePreview' alt="Xtreme Performance"
                             style="width: 120px; display: block;height:100%; margin:0 auto;">
                        <img v-if="backImagePreview == ''" src="@/assets/images/pages/register/back-pic.png"
                             alt="Xtreme Performance"
                             style="width: 120px;height:100%;display: block; margin:0 auto;">
                    </div>
                </vx-card>

            </div>
        </div>
        <!--Member Graph Section Start-->

        <div class="" id="data-save">

            <div class="vs-con-loading__container" id="div-with-loading">
                <div class="vx-row">
                    <div class="vx-col lg:w-1/4 md:w-1/4 sm:w-1/1 w-full mb-base text-center">
                        <vx-card title="Calories">


                            <img src="@/assets/images/pages/bg-fire.png" alt="image" style="margin: 0 auto;;width:55%">
                            <span style="display: block; color: #7367f0; font-size: 20px; font-weight: bold;">{{calory}}</span>
                            <span style="display: block; font-size: 16px; font-weight: bold;">Per Day</span>
                        </vx-card>
                    </div>
                    <div class="vx-col lg:w-1/4 md:w-1/4 sm:w-1/1 w-full mb-base text-center">
                        <vx-card title="Carbs">

                            <img src="@/assets/images/pages/bg-crabs.png" alt="image" style="margin: 0 auto;width:55%">
                            <span style="display: block; color: #7367f0; font-size: 20px; font-weight: bold;"
                                  v-if="carbohydrates">{{carbohydrates}}({{carbohydrate_percentage}})</span>
                            <span style="display: block; font-size: 16px; font-weight: bold;">Gram Per Day</span>
                        </vx-card>

                    </div>
                    <div class="vx-col lg:w-1/4 md:w-1/4 sm:w-1/1 w-full mb-base text-center">
                        <vx-card title="Protiens">

                            <img src="@/assets/images/pages/bg-protine.png" alt="image" class="mx-auto"
                                 style="margin: 0 auto;;width:55%">
                            <span style="display: block; color: #7367f0; font-size: 20px; font-weight: bold;"
                                  v-if="protein">{{protein}}({{protein_percentage}})</span>
                            <span style="display: block; font-size: 16px; font-weight: bold;">Gram Per Day</span>
                        </vx-card>

                    </div>
                    <div class="vx-col lg:w-1/4 md:w-1/4 sm:w-1/1 w-full mb-base text-center">

                        <vx-card title="Fats">

                            <img src="@/assets/images/pages/bg-fats.png" alt="image" class="mx-auto"
                                 style="margin: 0 auto;;width:55%">
                            <span style="display: block; color: #7367f0; font-size: 20px; font-weight: bold;"
                                  v-if="fatsCalculate">{{fatsCalculate}}({{fat_percentage}})</span>
                            <span style="display: block; font-size: 16px; font-weight: bold;">Gram Per Day</span>
                        </vx-card>
                    </div>
                </div>


            </div>
        </div>

        <div class="vx-row">

            <div class="vx-col lg:w-1/2 md:w-1/2 w-full mb-base">
                <div class="vx-col vx-card">
                    <div class="vx-card__collapsible-content vs-con-loading__container">
                        <div class="vx-card__body">
                            <form-wizard color="rgba(var(--vs-primary), 1)" errorColor="rgba(var(--vs-danger), 1)"
                                         :title="null"
                                         :subtitle="null" finishButtonText="Submit">
                                <tab-content class="mb-5" icon="feather icon-home">

                                    <!-- tab 1 content -->
                                    <form data-vv-scope="step-1">


                                        <div class="vx-row">
                                            <div class="vx-col md:w-1/1 w-full">
                                                <h3 class=" mb-2">Activity Level</h3>

                                            </div>
                                            <div class="vx-col md:w-3/1 w-full">
                                                <ul class="centerx">
                                                    <li class="mt-2">
                                                        <vs-radio v-on:change="profileSave()" v-model="activity_level"
                                                                  vs-value="1.2">Sedentary
                                                        </vs-radio>
                                                        <span class="pl-1 m-none"><vx-tooltip
                                                                text="little or no exercise, desk job ">
                          <feather-icon icon="AlertCircleIcon" svgClasses="h-4 w-4"/></vx-tooltip></span>
                                                        <span @click="sedentaryActive=true" class="pl-1 d-none"><feather-icon
                                                                icon="AlertCircleIcon" svgClasses="h-4 w-4"/></span>

                                                        <vs-popup class="holamundo" :active.sync="sedentaryActive"
                                                                  title="Sedentary">
                                                            <p>little or no exercise, desk job</p>
                                                        </vs-popup>
                                                    </li>
                                                    <li class="mt-2">
                                                        <vs-radio v-on:change="profileSave()" v-model="activity_level"
                                                                  vs-value="1.375">Light
                                                            exercise
                                                        </vs-radio>
                                                        <span class="pl-1 m-none"><vx-tooltip
                                                                text="light exercise/sports 1-3 days / week">
                          <feather-icon icon="AlertCircleIcon" svgClasses="h-4 w-4"/></vx-tooltip></span>
                                                        <span @click="lightExerciseActive=true"
                                                              style="display: inline-flex; position:relative; top:-2px;"
                                                              class="pl-1 d-none"><feather-icon icon="AlertCircleIcon"
                                                                                                svgClasses="h-4 w-4"/></span>

                                                        <vs-popup class="holamundo" :active.sync="lightExerciseActive"
                                                                  title="Light Exercise">
                                                            <p>light exercise/sports 1-3 days / week</p>
                                                        </vs-popup>
                                                    </li>
                                                    <li class="mt-2">
                                                        <vs-radio v-on:change="profileSave()" v-model="activity_level"
                                                                  vs-value="1.55">Moderately
                                                            active
                                                        </vs-radio>
                                                        <span class="pl-1 m-none"><vx-tooltip
                                                                text="moderate exercise/sports 3-5 days/week">
                          <feather-icon icon="AlertCircleIcon" svgClasses="h-4 w-4"/></vx-tooltip></span>
                                                        <span @click="moderatelyActive=true"
                                                              style="display: inline-flex; position:relative; top:-2px;"
                                                              class="pl-1 d-none"><feather-icon icon="AlertCircleIcon"
                                                                                                svgClasses="h-4 w-4"/></span>

                                                        <vs-popup class="holamundo" :active.sync="moderatelyActive"
                                                                  title="Moderately active">
                                                            <p>moderate exercise/sports 3-5 days/week</p>
                                                        </vs-popup>
                                                    </li>
                                                    <li class="mt-2">
                                                        <vs-radio v-on:change="profileSave()" v-model="activity_level"
                                                                  vs-value="1.725">Very
                                                            active
                                                        </vs-radio>
                                                        <span class="pl-1 m-none"><vx-tooltip
                                                                text="hard exercise/sports 6-7 days/week">
                          <feather-icon icon="AlertCircleIcon" svgClasses="h-4 w-4"/></vx-tooltip></span>
                                                        <span @click="veryActive=true" class="pl-1 d-none"><feather-icon
                                                                icon="AlertCircleIcon" svgClasses="h-4 w-4"/></span>

                                                        <vs-popup class="holamundo" :active.sync="veryActive"
                                                                  title="Very active">
                                                            <p>hard exercise/sports 6-7 days/week</p>
                                                        </vs-popup>
                                                    </li>
                                                </ul>

                                            </div>
                                        </div>
                                        <div class="vx-row">
                                            <div class="vx-col w-full mt-5 mb-5">
                                                <h3 class=" mb-2">Adjust Protein</h3>
                                                <ul class="centerx mt-2">

                                                    <li class="mt-2">
                                                        <vs-radio v-on:change="profileSave()" v-model="bg_protein"
                                                                  vs-value="low">Low
                                                        </vs-radio>
                                                        <span class="pl-1 m-none"><vx-tooltip text="Low">
                          <feather-icon icon="AlertCircleIcon" svgClasses="h-4 w-4"/></vx-tooltip></span>
                                                        <span @click="lowActive=true"
                                                              style="display: inline-flex; position:relative; top:-2px;"
                                                              class="pl-1 d-none"><feather-icon icon="AlertCircleIcon"
                                                                                                svgClasses="h-4 w-4"/></span>

                                                        <vs-popup class="holamundo" :active.sync="lowActive"
                                                                  title="Low">

                                                        </vs-popup>
                                                    </li>
                                                    <li class="mt-2">
                                                        <vs-radio v-on:change="profileSave()"
                                                                  v-model="bg_protein" vs-value="normal">Normal
                                                        </vs-radio>
                                                        <span class="pl-1 m-none"><vx-tooltip text="Normal ">
                          <feather-icon icon="AlertCircleIcon" svgClasses="h-4 w-4"/></vx-tooltip></span>
                                                        <span @click="normalActive=true"
                                                              style="display: inline-flex; position:relative; top:-2px;"
                                                              class="pl-1 d-none"><feather-icon icon="AlertCircleIcon"
                                                                                                svgClasses="h-4 w-4"/></span>

                                                        <vs-popup class="holamundo" :active.sync="normalActive"
                                                                  title="Normal">

                                                        </vs-popup>
                                                    </li>
                                                    <li class="mt-2">
                                                        <vs-radio v-on:change="profileSave()"
                                                                  v-model="bg_protein" vs-value="high">High
                                                        </vs-radio>
                                                        <span class="pl-1 m-none"><vx-tooltip text="High ">
                          <feather-icon icon="AlertCircleIcon" svgClasses="h-4 w-4"/></vx-tooltip></span>
                                                        <span @click="highActive=true"
                                                              style="display: inline-flex; position:relative; top:-2px;"
                                                              class="pl-1 d-none"><feather-icon icon="AlertCircleIcon"
                                                                                                svgClasses="h-4 w-4"/></span>

                                                        <vs-popup class="holamundo" :active.sync="highActive"
                                                                  title="High">
                                                        </vs-popup>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </form>
                                </tab-content>

                                <!-- tab 3 content -->
                                <tab-content title="Step 3" class="mb-5" icon="feather icon-image">
                                    <form data-vv-scope="step-3">
                                        <div class="vx-row mb-8">
                                            <div class="vx-col w-full">
                                                <div>
                            <span style="color: #7367f0; font-size: 20px; font-weight: bold; margin: 0 0 0px;"> Your BODY FAT% :<span
                                    class="pl-1 m-none"><vx-tooltip text=" Your BODY FAT%">
                          <feather-icon icon="AlertCircleIcon" svgClasses="h-4 w-4"/></vx-tooltip></span>                                <span
                                    @click="bodyFatActive=true" class="pl-1 d-none"><feather-icon icon="AlertCircleIcon"
                                                                                                  svgClasses="h-4 w-4"/></span>
 </span>

                                                    <vs-popup class="holamundo" :active.sync="bodyFatActive"
                                                              title="Body Fat">
                                                        <p>Your BODY FAT% </p>
                                                    </vs-popup>
                                                    <span style="font-size: 16px; font-weight: bold; float:right">{{fat}}</span><br>
                                                    <hr>
                                                    <span style="color: #7367f0; font-size: 20px; font-weight: bold; margin: 0 0 0px;">Your LBM :<span
                                                            class="pl-1 m-none"><vx-tooltip text="Lean Body Mass">
                          <feather-icon icon="AlertCircleIcon" svgClasses="h-4 w-4"/></vx-tooltip></span>  <span
                                                            @click="lbmActive=true" class="pl-1 d-none"><feather-icon
                                                            icon="AlertCircleIcon" svgClasses="h-4 w-4"/></span>
 </span>

                                                    <vs-popup class="holamundo" :active.sync="lbmActive" title="LBM">
                                                        <p>Lean Body Mass</p>
                                                    </vs-popup>
                                                    <span style="font-size: 16px; font-weight: bold;float:right">{{lmb}}</span><br>
                                                    <hr>
                                                    <span style="color: #7367f0; font-size: 20px; font-weight: bold; margin: 0 0 0px;"> Your RMR :<span
                                                            class="pl-1 m-none"><vx-tooltip
                                                            text="Resting Metabolic Rate ">
                          <feather-icon icon="AlertCircleIcon" svgClasses="h-4 w-4"/></vx-tooltip></span> <span
                                                            @click="rmrActive=true" class="pl-1 d-none"><feather-icon
                                                            icon="AlertCircleIcon" svgClasses="h-4 w-4"/></span>
  </span>

                                                    <vs-popup class="holamundo" :active.sync="rmrActive" title="RMR">
                                                        <p>Resting Metabolic Rate </p>
                                                    </vs-popup>
                                                    <span style="font-size: 16px; font-weight: bold;float:right">{{rmr}}</span><br>
                                                    <hr>
                                                    <span style="color: #7367f0; font-size: 20px; font-weight: bold; margin: 0 0 0px;">Your FBM  :<span
                                                            class="pl-1 m-none"><vx-tooltip text="Fat Body Mass ">
                          <feather-icon icon="AlertCircleIcon" svgClasses="h-4 w-4"/></vx-tooltip></span>  <span
                                                            @click="fbmActive=true" class="pl-1 d-none"><feather-icon
                                                            icon="AlertCircleIcon" svgClasses="h-4 w-4"/></span>
 </span>

                                                    <vs-popup class="holamundo" :active.sync="fbmActive" title="FBM">
                                                        <p>Fat Body Mass</p>
                                                    </vs-popup>
                                                    <span style="font-size: 16px; font-weight: bold;float:right">{{fbm}}</span>
                                                    <hr>
                                                </div>
                                            </div>


                                        </div>
                                    </form>
                                </tab-content>
                            </form-wizard>
                        </div>
                    </div>
                </div>
            </div>

            <div class="vx-col lg:w-1/2 md:w-1/2 w-full mb-base">
                <vx-card title="Meal Plan Stats">

                    <div class="vx-row  mb-4">

                        <div class="vx-col lg:w-1/1 w-full">

                            <ul class="demo-alignment method">
                                <li>
                                    <vs-radio v-model="site_method"
                                              vs-value="three_site_method" v-on:change="changeItem($event)">
                                        Three Site Method
                                    </vs-radio>
                                    <span class="pl-1 m-none"><vx-tooltip text=" Three Site Method">
                          <feather-icon icon="AlertCircleIcon" svgClasses="h-4 w-4"/></vx-tooltip></span>
                                    <span @click="threeSideActive=true" class="pl-1 d-none"><feather-icon
                                            icon="AlertCircleIcon" svgClasses="h-4 w-4"/></span>

                                    <vs-popup class="holamundo" :active.sync="threeSideActive"
                                              title="Three Site Method">

                                    </vs-popup>
                                </li>
                                <li>
                                    <vs-radio v-model="site_method"
                                              vs-value="seven_site_method" v-on:change="changeItem($event)">
                                        Seven Site Method
                                    </vs-radio>
                                    <span class="pl-1 m-none"><vx-tooltip text=" Seven Site Method">
                          <feather-icon icon="AlertCircleIcon" svgClasses="h-4 w-4"/></vx-tooltip></span>
                                    <span @click="sevenSideActive=true" class="pl-1 d-none"><feather-icon
                                            icon="AlertCircleIcon" svgClasses="h-4 w-4"/></span>

                                    <vs-popup class="holamundo" :active.sync="sevenSideActive"
                                              title="Seven Site Method">

                                    </vs-popup>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="vx-row">

                        <div class="vx-col w-full" v-show="gender=='male'">
                            <vs-table id="male-table">
                                <template slot="thead">

                                    <vs-th v-show="site_method == 'three_site_method'">3-Site Methods</vs-th>
                                    <vs-th v-show="site_method == 'seven_site_method'">7-Site Methods</vs-th>
                                    <vs-th>1</vs-th>
                                    <vs-th>2</vs-th>
                                    <vs-th>3</vs-th>
                                    <vs-th>Average</vs-th>


                                </template>

                                <template>
                                    <vs-tr>
                                        <vs-td>
                                            Chest
                                        </vs-td>
                                        <vs-td>

                                            <vs-input type="number" class="inputx" v-model="chest_site_1"
                                                      v-on:change="profileSave()" size="medium" :step="0.5"/>
                                        </vs-td>
                                        <vs-td>
                                            <vs-input type="number" v-model="chest_site_2" class="inputx"
                                                      placeholder="0"
                                                      v-on:change="profileSave()"/>
                                        </vs-td>
                                        <vs-td>
                                            <vs-input type="number" v-model="chest_site_3" class="inputx"
                                                      placeholder="0"
                                                      v-on:change="profileSave()"/>
                                        </vs-td>
                                        <vs-td>{{chest_average}}</vs-td>

                                    </vs-tr>
                                    <vs-tr>
                                        <vs-td>
                                            Abdomen
                                        </vs-td>
                                        <vs-td>
                                            <vs-input type="number" v-model="abdomen_site_1" class="inputx"
                                                      placeholder="0"
                                                      v-on:change="profileSave()"/>

                                        </vs-td>
                                        <vs-td>
                                            <vs-input type="number" v-model="abdomen_site_2" class="inputx"
                                                      placeholder="0"
                                                      v-on:change="profileSave()"/>

                                        </vs-td>
                                        <vs-td>
                                            <vs-input type="number" v-model="abdomen_site_3" class="inputx"
                                                      placeholder="0"
                                                      v-on:change="profileSave()"/>

                                        </vs-td>
                                        <vs-td>{{abdomen_average}}</vs-td>
                                    </vs-tr>
                                    <vs-tr>
                                        <vs-td>
                                            Thigh
                                        </vs-td>
                                        <vs-td>
                                            <vs-input type="number" v-model="thigh_site_1" class="inputx"
                                                      placeholder="0"
                                                      v-on:change="profileSave()"/>

                                        </vs-td>
                                        <vs-td>
                                            <vs-input type="number" v-model="thigh_site_2" class="inputx"
                                                      placeholder="0"
                                                      v-on:change="profileSave()"/>

                                        </vs-td>
                                        <vs-td>
                                            <vs-input type="number" v-model="thigh_site_3" class="inputx"
                                                      placeholder="0"
                                                      v-on:change="profileSave()"/>

                                        </vs-td>
                                        <vs-td>{{thigh_average}}</vs-td>
                                    </vs-tr>
                                    <vs-tr v-show="site_method == 'seven_site_method'">
                                        <vs-td>
                                            Suprailiac
                                        </vs-td>
                                        <vs-td>

                                            <vs-input type="number" v-model="suprailiac_site_1" class="inputx"
                                                      placeholder="0"
                                            />
                                        </vs-td>
                                        <vs-td>
                                            <vs-input type="number" v-model="suprailiac_site_2" class="inputx"
                                                      placeholder="0"
                                                      v-on:change="changeItem($event)"/>
                                        </vs-td>
                                        <vs-td>
                                            <vs-input type="number" v-model="suprailiac_site_3" class="inputx"
                                                      placeholder="0"
                                                      v-on:change="changeItem($event)"/>
                                        </vs-td>
                                        <vs-td>{{suprailiac_average}}</vs-td>

                                    </vs-tr>
                                    <vs-tr v-show="site_method == 'seven_site_method'">
                                        <vs-td>
                                            Midaxilliary
                                        </vs-td>
                                        <vs-td>
                                            <vs-input type="number" v-model="midaxilliary_site_1" class="inputx"
                                                      placeholder="0"
                                                      v-on:change="changeItem($event)"/>
                                        </vs-td>
                                        <vs-td>
                                            <vs-input type="number" v-model="midaxilliary_site_2" class="inputx"
                                                      placeholder="0"
                                                      v-on:change="changeItem($event)"/>

                                        </vs-td>
                                        <vs-td>
                                            <vs-input type="number" v-model="midaxilliary_site_3" class="inputx"
                                                      placeholder="0"
                                                      v-on:change="changeItem($event)"/>

                                        </vs-td>
                                        <vs-td>{{midaxilliary_average}}</vs-td>

                                    </vs-tr>
                                    <vs-tr v-show="site_method == 'seven_site_method'">
                                        <vs-td>
                                            Tricep
                                        </vs-td>
                                        <vs-td>
                                            <vs-input type="number" v-model="tricep_site_1" class="inputx"
                                                      placeholder="0"
                                                      v-on:change="changeItem($event)"/>
                                        </vs-td>
                                        <vs-td>
                                            <vs-input type="number" v-model="tricep_site_2" class="inputx"
                                                      placeholder="0"
                                                      v-on:change="changeItem($event)"/>

                                        </vs-td>
                                        <vs-td>
                                            <vs-input type="number" v-model="tricep_site_3" class="inputx"
                                                      placeholder="0"
                                                      v-on:change="changeItem($event)"/>

                                        </vs-td>
                                        <vs-td>{{tricep_average}}</vs-td>

                                    </vs-tr>
                                    <vs-tr v-show="site_method == 'seven_site_method'">
                                        <vs-td>
                                            Subscapula
                                        </vs-td>
                                        <vs-td>
                                            <vs-input type="number" v-model="subscapula_site_1" class="inputx"
                                                      placeholder="0"
                                                      v-on:change="changeItem($event)"/>
                                        </vs-td>
                                        <vs-td>
                                            <vs-input type="number" v-model="subscapula_site_2" class="inputx"
                                                      placeholder="0"
                                                      v-on:change="changeItem($event)"/>
                                        </vs-td>
                                        <vs-td>
                                            <vs-input type="number" v-model="subscapula_site_3" class="inputx"
                                                      placeholder="0"
                                                      v-on:change="changeItem($event)"/>
                                        </vs-td>
                                        <vs-td>{{subscapula_average}}</vs-td>

                                    </vs-tr>

                                </template>
                            </vs-table>
                        </div>
                        <div class="vx-col w-full" v-show="gender=='female'">
                            <vs-table id="female-table">

                                <template slot="thead">
                                    <vs-th v-show="site_method == 'three_site_method'">3-Site Methods</vs-th>
                                    <vs-th v-show="site_method == 'seven_site_method'">7-Site Methods</vs-th>
                                    <vs-th>1</vs-th>
                                    <vs-th>2</vs-th>
                                    <vs-th>3</vs-th>
                                    <vs-th>Average</vs-th>
                                </template>

                                <template>
                                    <vs-tr>
                                        <vs-td>
                                            Tricep
                                        </vs-td>
                                        <vs-td>
                                            <vs-input type="number" v-model="tricep_site_1" class="inputx"
                                                      placeholder="0"
                                                      v-on:change="changeItem($event)"/>
                                        </vs-td>
                                        <vs-td>
                                            <vs-input type="number" v-model="tricep_site_2" class="inputx"
                                                      placeholder="0"
                                                      v-on:change="changeItem($event)"/>
                                        </vs-td>
                                        <vs-td>
                                            <vs-input type="number" v-model="tricep_site_3" class="inputx"
                                                      placeholder="0"
                                                      v-on:change="changeItem($event)"/>
                                        </vs-td>
                                        <vs-td>{{tricep_average}}</vs-td>

                                    </vs-tr>
                                    <vs-tr>
                                        <vs-td>
                                            Suprailiac
                                        </vs-td>
                                        <vs-td>
                                            <vs-input type="number" v-model="suprailiac_site_1" class="inputx"
                                                      placeholder="0"
                                                      v-on:change="changeItem($event)"/>

                                        </vs-td>
                                        <vs-td>
                                            <vs-input type="number" v-model="suprailiac_site_2" class="inputx"
                                                      placeholder="0"
                                                      v-on:change="changeItem($event)"/>

                                        </vs-td>
                                        <vs-td>
                                            <vs-input type="number" v-model="suprailiac_site_3" class="inputx"
                                                      placeholder="0"
                                                      v-on:change="changeItem($event)"/>

                                        </vs-td>
                                        <vs-td>{{suprailiac_average}}</vs-td>
                                    </vs-tr>
                                    <vs-tr>
                                        <vs-td>
                                            Thigh
                                        </vs-td>
                                        <vs-td>
                                            <vs-input type="number" v-model="thigh_site_1" class="inputx"
                                                      placeholder="0"
                                                      v-on:change="changeItem($event)"/>

                                        </vs-td>
                                        <vs-td>
                                            <vs-input type="number" v-model="thigh_site_2" class="inputx"
                                                      placeholder="0"
                                                      v-on:change="changeItem($event)"/>

                                        </vs-td>
                                        <vs-td>
                                            <vs-input type="number" v-model="thigh_site_3" class="inputx"
                                                      placeholder="0"
                                                      v-on:change="changeItem($event)"/>
                                        </vs-td>
                                        <vs-td>{{thigh_average}}</vs-td>
                                    </vs-tr>
                                    <vs-tr v-show="site_method == 'seven_site_method'">
                                        <vs-td>
                                            Abdomen
                                        </vs-td>
                                        <vs-td>
                                            <vs-input type="number" v-model="abdomen_site_1" class="inputx"
                                                      placeholder="0"
                                                      v-on:change="changeItem($event)"/>

                                        </vs-td>
                                        <vs-td>
                                            <vs-input type="number" v-model="abdomen_site_2" class="inputx"
                                                      placeholder="0"
                                                      v-on:change="changeItem($event)"/>

                                        </vs-td>
                                        <vs-td>
                                            <vs-input type="number" v-model="abdomen_site_3" class="inputx"
                                                      placeholder="0"
                                                      v-on:change="changeItem($event)"/>

                                        </vs-td>
                                        <vs-td>{{abdomen_average}}</vs-td>
                                    </vs-tr>
                                    <vs-tr v-show="site_method == 'seven_site_method'">
                                        <vs-td>
                                            Midaxilliary
                                        </vs-td>
                                        <vs-td>
                                            <vs-input type="number" v-model="midaxilliary_site_1" class="inputx"
                                                      placeholder="0"
                                                      v-on:change="changeItem($event)"/>

                                        </vs-td>
                                        <vs-td>
                                            <vs-input type="number" v-model="midaxilliary_site_2" class="inputx"
                                                      placeholder="0"
                                                      v-on:change="changeItem($event)"/>

                                        </vs-td>
                                        <vs-td>
                                            <vs-input type="number" v-model="midaxilliary_site_3" class="inputx"
                                                      placeholder="0"
                                                      v-on:change="changeItem($event)"/>

                                        </vs-td>
                                        <vs-td>{{midaxilliary_average}}</vs-td>

                                    </vs-tr>
                                    <vs-tr v-show="site_method == 'seven_site_method'">
                                        <vs-td>
                                            Chest
                                        </vs-td>
                                        <vs-td>
                                            <vs-input type="number" v-model="chest_site_1" class="inputx"
                                                      placeholder="0"
                                                      v-on:change="changeItem($event)"/>

                                        </vs-td>
                                        <vs-td>
                                            <vs-input type="number" v-model="chest_site_2" class="inputx"
                                                      placeholder="0"
                                                      v-on:change="changeItem($event)"/>

                                        </vs-td>
                                        <vs-td>
                                            <vs-input type="number" v-model="chest_site_3" class="inputx"
                                                      placeholder="0"
                                                      v-on:change="changeItem($event)"/>

                                        </vs-td>
                                        <vs-td>{{tricep_average}}</vs-td>

                                    </vs-tr>
                                    <vs-tr v-show="site_method == 'seven_site_method'">
                                        <vs-td>
                                            Subscapula
                                        </vs-td>
                                        <vs-td>
                                            <vs-input type="number" v-model="subscapula_site_1" class="inputx"
                                                      placeholder="0"
                                                      v-on:change="changeItem($event)"/>
                                        </vs-td>
                                        <vs-td>
                                            <vs-input type="number" v-model="subscapula_site_2" class="inputx"
                                                      placeholder="0"
                                                      v-on:change="changeItem($event)"/>
                                        </vs-td>
                                        <vs-td>
                                            <vs-input type="number" v-model="subscapula_site_3" class="inputx"
                                                      placeholder="0"
                                                      v-on:change="changeItem($event)"/>
                                        </vs-td>
                                        <vs-td>{{subscapula_average}}</vs-td>

                                    </vs-tr>
                                </template>
                            </vs-table>
                        </div>
                    </div>

                </vx-card>
            </div>
        </div>

        <!--Member Graph Section End-->


        <div class="vx-row">
            <div class="vx-col lg:w-1/1 md:w-1/1 sm:w-1/1 w-full mb-base" style="margin: 0 auto;">
                <vx-card title="Meal Plan" class="cstm-meal" style="overflow: auto">
                    <div class="vx-row">
                        <div class="vx-col lg:w-1/4 md:w-1/4 sm:w-1/1 w-full mb-base text-center">
                            <vx-card title="Calories">
                <span style="display: block; color: #7367f0; font-size: 20px; font-weight: bold; text-transform:lowercase"
                      v-if="n_wakeup_kcal">
                  {{n_wakeup_kcal ? parseFloat(n_wakeup_kcal).toFixed(2) : 0}}(kcal)</span>
                            </vx-card>
                        </div>
                        <div class="vx-col lg:w-1/4 md:w-1/4 sm:w-1/1 w-full mb-base text-center">
                            <vx-card title="Carbs">
                                <span style="display: block; color: #7367f0; font-size: 20px; font-weight: bold; text-transform:lowercase"
                                      v-if="n_wakeup_carb">{{n_wakeup_carb ? parseFloat(n_wakeup_carb).toFixed(2) : 0}}(g)</span>
                            </vx-card>

                        </div>
                        <div class="vx-col lg:w-1/4 md:w-1/4 sm:w-1/1 w-full mb-base text-center">
                            <vx-card title="Protiens">
                <span style="display: block; color: #7367f0; font-size: 20px; font-weight: bold; text-transform:lowercase"
                      v-if="n_wakeup_protein">
                  {{n_wakeup_protein ? parseFloat(n_wakeup_protein).toFixed(2) : 0}}(g)</span>
                            </vx-card>

                        </div>
                        <div class="vx-col lg:w-1/4 md:w-1/4 sm:w-1/1 w-full mb-base text-center">

                            <vx-card title="Fats">
                <span style="display: block; color: #7367f0; font-size: 20px; font-weight: bold; text-transform:lowercase"
                      v-if="n_wakeup_fat">{{n_wakeup_fat ? parseFloat(n_wakeup_fat).toFixed(2) : 0}}(g)</span>
                            </vx-card>
                        </div>
                    </div>
                    <vx-card>
                        <div class="vx-row">
                            <div class="vx-col md:w-1/4 lg:w-1/4 w-full" style="margin-top: 10px;">
                                <h6>Type section name and press enter key:</h6>
                            </div>
                            <div class="vx-col md:w-1/4 lg:w-1/4 w-full mb-2">
                                <vs-input @change="AddSectionName($event)" type="text" style="width:100%;"/>
                            </div>
                            <div class="vx-col md:w-1/4 lg:w-1/4 w-full mb-2">
                                <div class="dropdown-button-container">
                                    <vs-button class="btnx" color="success" type="gradient">Meal Plan {{mealplan_no}}
                                    </vs-button>

                                    <vs-dropdown>
                                        <vs-button class="btn-drop" color="success" type="gradient"
                                                   icon="more_horiz"></vs-button>
                                        <vs-dropdown-menu>

                                            <vs-dropdown-item @click="changeMealPlanData(1)"> Meal Plan 1
                                            </vs-dropdown-item>
                                            <vs-dropdown-item @click="changeMealPlanData(2)"> Meal Plan 2
                                            </vs-dropdown-item>
                                            <vs-dropdown-item @click="changeMealPlanData(3)"> Meal Plan 3
                                            </vs-dropdown-item>
                                        </vs-dropdown-menu>
                                    </vs-dropdown>
                                </div>
                            </div>
                            <div class="vx-col md:w-1/4 lg:w-1/4 w-full">
                                <vs-button color="success" class="w-full" type="gradient"
                                           @click="$router.push({name:'view-members-mealplan',params:{uid:uid,mealplan_no:mealplan_no}})">
                                    View Meal Plan
                                </vs-button>
                            </div>
                        </div>
                    </vx-card>
                    <br>


                    <vs-table class="meal-plan-table">
                        <template slot="thead">
                            <vs-th><h4><a href="" class="inline-block">Foods</a></h4></vs-th>
                            <vs-th><h4><a href="" class="inline-block">Product</a></h4></vs-th>
                            <vs-th><h4><a href="" class="inline-block">Qty</a></h4></vs-th>
                            <vs-th><h4><a href="" class="inline-block">Unit</a></h4></vs-th>
                            <vs-th><h4><a href="" class="inline-block">Kcal</a></h4></vs-th>
                            <vs-th><h4><a href="" class="inline-block">Protein(g)</a></h4></vs-th>
                            <vs-th><h4><a href="" class="inline-block">Carbs(g)</a></h4></vs-th>
                            <vs-th><h4><a href="" class="inline-block">Fat(g)</a></h4></vs-th>
                            <vs-th><h4><a href="" class="inline-block">Action</a></h4></vs-th>
                        </template>
                        <template v-for="(section, index) in sections">
                            <vs-tr>
                                <vs-td colspan="9">
                                    <b>
                                        <h6>
                                            <vs-input @change="changeSectionName(index, $event)" class="section-input"
                                                      type="text" :value="section['section_'+index].label"
                                                      style="width:230px;float: left;"/>
                                            <vs-button color="primary" @click="insertRow(index)" type="border"
                                                       icon-pack="feather" icon="icon-plus"></vs-button>
                                        </h6>
                                    </b>
                                </vs-td>
                            </vs-tr>

                            <vs-tr v-for="(sectionData, index1) in section['section_'+index].data"
                                   v-if="section['section_'+index].data && section['section_'+index].data.length > 0">
                                <vs-td width="300px">
                                    <input type="text" v-on:change="updateItems($event.target.value, index,index1)"
                                           placeholder="Type and press enter to search"
                                           style="width:230px;height: 38px; padding: 5px 10px; border-radius: 3px; border: 1px solid rgba(0,0,0,.2);margin-left: 15px;">
                                    <br>
                                    <ul class="custom-dropdown"
                                        v-if="items.length > 0 && dropdownShow  === true && dropdownLoadingShow === index && dropdownLoadingShow1 === index1"
                                        v-click-outside="hide">
                                        <li @click="mealPlan(index,index1,item)" v-for="(item, indexes) in items"
                                            :key="indexes"><h4 style="text-transform: capitalize"><img :src="item.image"
                                                                                                       style="width: 40px;height: 40px;float: left;margin-right: 10px;"/>{{ item.name
                                            }}</h4></li>
                                    </ul>
                                    <ul class="custom-dropdown"
                                        v-if="loading == true && dropdownLoadingShow === index && dropdownLoadingShow1 === index1"
                                        v-click-outside="hide">
                                        <li> Loading... </li>
                                    </ul>
                                </vs-td>
                                <vs-td width="300px">
                                    <img v-if="sectionData.image" :src="sectionData.image"
                                         style="width: 40px;height: 40px;float: left;margin-right: 10px;">
                                    {{ sectionData.name }}
                                </vs-td>
                                <vs-td style="width:100px;">
                                    <vs-input class="w-full" @change="changeQuantity(index,index1, $event)"
                                              type="number" :value="sectionData.wakeup_quantity" min="1"
                                              style="width:80px !important;"/>
                                </vs-td>
                                <vs-td>
                                    <span v-if="!sectionData.alt_measures || sectionData.alt_measures.length == 0">{{sectionData.wakeup_unit}}</span>
                                    <select class="w-full" @change="changeServingType($event, index, index1)"
                                            style=" height: 38px; padding: 5px 10px; border-radius: 3px;width:100px !important;border: 1px solid rgb(115, 103, 240) !important;"
                                            v-if="sectionData.alt_measures && sectionData.alt_measures.length > 0">
                                        <option v-for="option in sectionData.alt_measures"
                                                :selected="option.measure == sectionData.wakeup_unit"
                                                :value="option.measure">{{ option.measure }}
                                        </option>
                                    </select>
                                </vs-td>
                                <vs-td style="width:100px;text-align: center;">
                                    {{ sectionData.wakeup_kcal ? parseFloat(sectionData.wakeup_kcal).toFixed(2) : 0}}
                                </vs-td>
                                <vs-td style="width:100px;text-align: center;">
                                    {{ sectionData.wakeup_protein ? parseFloat(sectionData.wakeup_protein).toFixed(2) : 0
                                    }}
                                </vs-td>
                                <vs-td style="width:100px;text-align: center;">
                                    {{ sectionData.wakeup_carb ? parseFloat(sectionData.wakeup_carb).toFixed(2) : 0 }}
                                </vs-td>
                                <vs-td style="width:100px;text-align: center;">
                                    {{ sectionData.wakeup_fat ? parseFloat(sectionData.wakeup_fat).toFixed(2) : 0 }}
                                </vs-td>
                                <vs-td>
                                    <vs-button color="danger" @click="deleteRow(index,index1)" type="border"
                                               class="del-row-btn" icon-pack="feather" icon="icon-delete"></vs-button>
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
    import ClickOutside from 'vue-click-outside'
    require('firebase/firestore')
    import axios from 'axios';
    import 'firebase/auth'
    import firebase from 'firebase'
    import moment from 'moment'
    import vSelect from 'vue-select'
    import Progress from "easy-circular-progress";
    import VueApexCharts from 'vue-apexcharts'
    import StatisticsCardLine from '@/components/statistics-cards/StatisticsCardLine.vue'
    export default {

        data() {
            return {
                n_wakeup_fat: 0, n_wakeup_quantity: 0, n_wakeup_kcal: 0, n_wakeup_protein: 0, n_wakeup_carb: 0,
                food_kcal: '',
                food_protein: '',
                food_carb: '',
                food_fat: '',
                nutrients_potassium: 0,
                nutrients_sodium: 0,
                nutrients_vitamin_a: 0,
                nutrients_vitamin_c: 0,
                nutrients_calcium: 0,
                nutrients_iron: 0,
                nutrients_cholesterol: 0,
                nutrients_fiber: 0,
                nutrients_protien: 0,
                medication_desc: '',
                instagram: '',
                twitter: '',
                facebook: '',
                site_method: 'three_site_method',
                lmb: '',
                rmr: '',
                fbm: '',
                fat: '',
                packageTitle: '',
                weight_with_type: '',
                mealplan_index: 0,
                mealplan_no: 1,
                series: [0, 0, 0, 0],
                productOrdersRadialBar: {
                    analyticsData: [
                        {'orderType': 'Total Kcal', 'counts': 0, color: 'primary'},
                        {'orderType': 'Protein', 'counts': 0, color: 'warning'},
                        {'orderType': 'Carbs ', 'counts': 0, color: 'danger'},
                        {'orderType': 'Fats ', 'counts': 0, color: 'success'},
                    ],
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
                location: '',
                address: '',
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
                n_sections: [
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
                sedentaryActive: false,
                lightExerciseActive: false,
                moderatelyActive: false,
                veryActive: false,
                highActive: false,
                normalActive: false,
                lowActive: false,
                fbmActive: false,
                rmrActive: false,
                lbmActive: false,
                bodyFatActive: false,
                sevenSideActive: false,
                threeSideActive: false,
                tenure: '',
                health_issue: '',
                health_issue_desc: '',
                height_in_centimeter: '',
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
                age: '',
                status: false,
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
                frontImage: '',
                sideImage: '',
                backImage: '',
                frontImagePreview: '',
                sideImagePreview: '',
                backImagePreview: '',
                defaultImage: '../../assets/images/logo/logo-1.png',
                chest_site_1: '0',
                chest_site_2: '0',
                chest_site_3: '0',
                abdomen_site_1: '0',
                abdomen_site_2: '0',
                abdomen_site_3: '0',
                thigh_site_1: '0',
                thigh_site_2: '0',
                thigh_site_3: '0',
                suprailiac_site_1: '0',
                suprailiac_site_2: '0',
                suprailiac_site_3: '0',
                midaxilliary_site_1: '0',
                midaxilliary_site_2: '0',
                midaxilliary_site_3: '0',
                tricep_site_1: '0',
                tricep_site_2: '0',
                tricep_site_3: '0',
                subscapula_site_1: '0',
                subscapula_site_2: '0',
                subscapula_site_3: '0',
                chest_average: '0',
                abdomen_average: '0',
                thigh_average: '0',
                suprailiac_average: '0',
                midaxilliary_average: '0',
                tricep_average: '0',
                subscapula_average: '0',
            }
        },
        computed: {},
        created(){
            this.program_opted = []
            // this.program_type = []
            this.food_kind = []
            if (this.uid) {
                this.getFilesList();
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
            }
        },
        methods: {
            profileSave(){
                const saveProfile = {
                    site_method: this.site_method,
                    memberDetail: {
                        bg_protein: this.bg_protein ? this.bg_protein : '',
                        activity_level: this.activity_level ? this.activity_level : '',
                    },
                    femaleSiteMethod: {
                        threeSiteMethod: {
                            tricep_site_1: (this.tricep_site_1) ? this.tricep_site_1 : '0',
                            tricep_site_2: (this.tricep_site_2) ? this.tricep_site_2 : '0',
                            tricep_site_3: (this.tricep_site_3) ? this.tricep_site_3 : '0',
                            suprailiac_site_1: (this.suprailiac_site_1) ? this.suprailiac_site_1 : '0',
                            suprailiac_site_2: (this.suprailiac_site_2) ? this.suprailiac_site_2 : '0',
                            suprailiac_site_3: (this.suprailiac_site_3) ? this.suprailiac_site_3 : '0',
                            thigh_site_1: (this.thigh_site_1) ? this.thigh_site_1 : '0',
                            thigh_site_2: (this.thigh_site_2) ? this.thigh_site_2 : '0',
                            thigh_site_3: (this.thigh_site_3) ? this.thigh_site_3 : '0',
                        },
                        sevenSiteMethod: {
                            tricep_site_1: (this.tricep_site_1) ? this.tricep_site_1 : '0',
                            tricep_site_2: (this.tricep_site_2) ? this.tricep_site_2 : '0',
                            tricep_site_3: (this.tricep_site_3) ? this.tricep_site_3 : '0',
                            suprailiac_site_1: (this.suprailiac_site_1) ? this.suprailiac_site_1 : '0',
                            suprailiac_site_2: (this.suprailiac_site_2) ? this.suprailiac_site_2 : '0',
                            suprailiac_site_3: (this.suprailiac_site_3) ? this.suprailiac_site_3 : '0',
                            thigh_site_1: (this.thigh_site_1) ? this.thigh_site_1 : '0',
                            thigh_site_2: (this.thigh_site_2) ? this.thigh_site_2 : '0',
                            thigh_site_3: (this.thigh_site_3) ? this.thigh_site_3 : '0',
                            abdomen_site_1: (this.abdomen_site_1) ? this.abdomen_site_1 : '0',
                            abdomen_site_2: (this.abdomen_site_2) ? this.abdomen_site_2 : '0',
                            abdomen_site_3: (this.abdomen_site_3) ? this.abdomen_site_3 : '0',
                            midaxilliary_site_1: (this.midaxilliary_site_1) ? this.midaxilliary_site_1 : '0',
                            midaxilliary_site_2: (this.midaxilliary_site_2) ? this.midaxilliary_site_2 : '0',
                            midaxilliary_site_3: (this.midaxilliary_site_3) ? this.midaxilliary_site_3 : '0',
                            chest_site_1: (this.chest_site_1) ? this.chest_site_1 : '0',
                            chest_site_2: (this.chest_site_2) ? this.chest_site_1 : '0',
                            chest_site_3: (this.chest_site_3) ? this.chest_site_1 : '0',
                            subscapula_site_1: (this.subscapula_site_1) ? this.subscapula_site_1 : '0',
                            subscapula_site_2: (this.subscapula_site_2) ? this.subscapula_site_2 : '0',
                            subscapula_site_3: (this.subscapula_site_3) ? this.subscapula_site_3 : '0',
                        }
                    },
                    maleSiteMethod: {
                        threeSiteMethod: {
                            chest_site_1: (this.chest_site_1) ? this.chest_site_1 : '0',
                            chest_site_2: (this.chest_site_2) ? this.chest_site_2 : '0',
                            chest_site_3: (this.chest_site_3) ? this.chest_site_3 : '0',
                            abdomen_site_1: (this.abdomen_site_1) ? this.abdomen_site_1 : '0',
                            abdomen_site_2: (this.abdomen_site_2) ? this.abdomen_site_2 : '0',
                            abdomen_site_3: (this.abdomen_site_3) ? this.abdomen_site_3 : '0',
                            thigh_site_1: (this.thigh_site_1) ? this.thigh_site_1 : '0',
                            thigh_site_2: (this.thigh_site_2) ? this.thigh_site_2 : '0',
                            thigh_site_3: (this.thigh_site_3) ? this.thigh_site_3 : '0',
                        },
                        sevenSiteMethod: {
                            chest_site_1: (this.chest_site_1) ? this.chest_site_1 : '0',
                            chest_site_2: (this.chest_site_2) ? this.chest_site_2 : '0',
                            chest_site_3: (this.chest_site_3) ? this.chest_site_3 : '0',
                            abdomen_site_1: (this.abdomen_site_1) ? this.abdomen_site_1 : '0',
                            abdomen_site_2: (this.abdomen_site_2) ? this.abdomen_site_2 : '0',
                            abdomen_site_3: (this.abdomen_site_3) ? this.abdomen_site_3 : '0',
                            thigh_site_1: (this.thigh_site_1) ? this.thigh_site_1 : '0',
                            thigh_site_2: (this.thigh_site_2) ? this.thigh_site_2 : '0',
                            thigh_site_3: (this.thigh_site_3) ? this.thigh_site_3 : '0',
                            suprailiac_site_1: (this.suprailiac_site_1) ? this.suprailiac_site_1 : '0',
                            suprailiac_site_2: (this.suprailiac_site_2) ? this.suprailiac_site_2 : '0',
                            suprailiac_site_3: (this.suprailiac_site_3) ? this.suprailiac_site_3 : '0',
                            midaxilliary_site_1: (this.midaxilliary_site_1) ? this.midaxilliary_site_1 : '0',
                            midaxilliary_site_2: (this.midaxilliary_site_2) ? this.midaxilliary_site_2 : '0',
                            midaxilliary_site_3: (this.midaxilliary_site_3) ? this.midaxilliary_site_3 : '0',
                            tricep_site_1: (this.tricep_site_1) ? this.tricep_site_1 : '0',
                            tricep_site_2: (this.tricep_site_2) ? this.tricep_site_2 : '0',
                            tricep_site_3: (this.tricep_site_3) ? this.tricep_site_3 : '0',
                            subscapula_site_1: (this.subscapula_site_1) ? this.subscapula_site_1 : '0',
                            subscapula_site_2: (this.subscapula_site_2) ? this.subscapula_site_2 : '0',
                            subscapula_site_3: (this.subscapula_site_3) ? this.subscapula_site_3 : '0',
                        }
                    }
                };

                firebase.firestore().collection("users").doc(this.uid).set(saveProfile, {merge: true})
                this.changeItem()
                this.getUserDetail()
                this.$vs.notify({
                    title: '',
                    text: 'Your Profile Is Successfully Updated!',
                    iconPack: 'feather',
                    icon: 'icon-check',
                    color: 'success'
                });
            },
            changeMealPlanData(number){
                this.mealplan_no = parseInt(number)
                this.mealplan_index = this.mealplan_no - 1
                this.sections = this.mealplan[this.mealplan_index]['mealplan_' + this.mealplan_no]
                this.calculateTotal()
            },
            getFilesList(){
                var front = ''
                var side = ''
                var back = ''
                var self = this
                var frontListRef = firebase.storage().ref(this.uid + '/member_three_pics/front/');
                frontListRef.listAll().then(function (res) {
                    res.items.forEach(function (itemRef) {
                        itemRef.getDownloadURL().then(function (downloadURL) {
                            front = downloadURL
                        })
                    });
                }).catch(function (error) {
                    console.log(error)
                    console.log('Error, While getting pictures')
                });

                var sideListRef = firebase.storage().ref(this.uid + '/member_three_pics/side/');
                sideListRef.listAll().then(function (res) {
                    res.items.forEach(function (itemRef) {
                        itemRef.getDownloadURL().then(function (downloadURL) {
                            side = downloadURL
                        })
                    });
                }).catch(function (error) {
                    console.log(error)
                    console.log('Error, While getting pictures')
                });

                var backListRef = firebase.storage().ref(this.uid + '/member_three_pics/back/');
                backListRef.listAll().then(function (res) {
                    res.items.forEach(function (itemRef) {
                        itemRef.getDownloadURL().then(function (downloadURL) {
                            back = downloadURL
                        })
                    });
                }).catch(function (error) {
                    console.log(error)
                    console.log('Error, While getting pictures')
                });

                setTimeout(function () {
                    self.backImagePreview = back
                    self.sideImagePreview = side
                    self.frontImagePreview = front
                }, 3000)
            },
            hide () {
                this.dropdownShow = false;
            },
            changeQuantity(index, index1, $event){
                let quantity = $event.target.value
//                let data = this.sections[index]['section_'+index].data;
                let data = this.mealplan[this.mealplan_index]['mealplan_' + this.mealplan_no][index]['section_' + index].data;
                data[index1].wakeup_quantity = quantity
                data[index1].wakeup_kcal = data[index1].wakeup_kcal_original * quantity
                data[index1].wakeup_protein = data[index1].wakeup_protein_original * quantity
                data[index1].wakeup_carb = data[index1].wakeup_carb_original * quantity
                data[index1].wakeup_fat = data[index1].wakeup_fat_original * quantity
                firebase.firestore().collection('users').doc(this.uid).get()
                    .then(snap => {
                        snap.ref.update({mealplan: this.mealplan});
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
            AddSectionName($event){
                let length = this.sections.length
                let name = $event.target.value
                let section = {
                    ['section_' + length]: {
                        label: name,
                        data: []
                    }
                }

                this.mealplan[this.mealplan_index]['mealplan_' + this.mealplan_no].push(section)
                firebase.firestore().collection('users').doc(this.uid).get()
                    .then(snap => {
                        snap.ref.update({mealplan: this.mealplan});
                        this.$vs.notify({
                            title: 'Added',
                            text: 'Section name Successfully updated!',
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
            changeSectionName(index, $event){
                let name = $event.target.value
                this.mealplan[this.mealplan_index]['mealplan_' + this.mealplan_no][index]['section_' + index].label = name
                firebase.firestore().collection('users').doc(this.uid).get()
                    .then(snap => {
                        snap.ref.update({mealplan: this.mealplan});
                        this.$vs.notify({
                            title: 'Added',
                            text: 'Section name Successfully updated!',
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
            updateItems (text, index, index1) {
                this.dropdownShow = false;
                this.loading = true;
                this.dropdownLoadingShow = index;
                this.dropdownLoadingShow1 = index1;
                let config = {
                    headers: {
                        'x-app-id': '4e543d0d',
                        'x-app-key': '8b38d313df441ff4934f9faff6ab9c6f',
                        'x-user-jwt': 0
                    }
                }
                axios.get('https://trackapi.nutritionix.com/v2/search/instant?query=' + text + '&self=true&branded=false&common=true&common_general=true&common_grocery=true&common_restaurant=true&detailed=false&claims=false', config)
                    .then(response => {
                        let lists = [];
                        response.data.common.map(function (row, key) {
                            const list = {
                                id: row.food_name,
                                name: row.food_name,
                                wakeup_quantity: row.serving_qty,
                                wakeup_unit: row.serving_unit,
                                image: row.photo ? row.photo.thumb : '',
                                wakeup_kcal: 0,
                                wakeup_protein: 0,
                                wakeup_carb: 0,
                                wakeup_fat: 0,
                                wakeup_unit_original: 0,
                                wakeup_kcal_original: 0,
                                wakeup_protein_original: 0,
                                wakeup_carb_original: 0,
                                wakeup_fat_original: 0,
                                alt_measures: [],
                                serving_weight_grams: 0,
                                full_nutrients: []
                            }
                            lists.push(list)
                        });
                        this.dropdownShow = true;
                        this.loading = false;
                        this.items = lists;
                    })
                    .catch(e => {
                        console.log(e)
                    })
            },
            notify(){
                const notification = {
                    created_at: firebase.firestore.FieldValue.serverTimestamp(),
                    description: 'Your Meal Plan Is Ready To View',
                    isSeen: false,
                    isAdminSeen: false,
                    receiver_id: this.uid,
                    receiver_name: this.name,
                    sender_id: localStorage.getItem('uid'),
                    url: 'member/meal-plan',
                    sender_name: JSON.parse(localStorage.getItem('userInfo')).displayName,
                    type: 'mealPlan'
                };
                firebase.firestore().collection("notification").add(notification).then(() => {
                    console.log('notify done')
                })

            },
            calculateTotal(){
                this.productOrdersRadialBar.analyticsData = [
                    {'orderType': 'Total Kcal', 'counts': 0, color: 'primary'},
                    {'orderType': 'Protein', 'counts': 0, color: 'warning'},
                    {'orderType': 'Carbs ', 'counts': 0, color: 'danger'},
                    {'orderType': 'Fats ', 'counts': 0, color: 'success'},
                ]
                this.series = [0, 0, 0, 0]
                this.wakeup_quantity = 0;
                this.wakeup_kcal = 0;
                this.wakeup_protein = 0;
                this.wakeup_carb = 0;
                this.wakeup_fat = 0;
                let sections = this.mealplan[this.mealplan_index]['mealplan_' + this.mealplan_no]
                for (var i = 0; i <= sections.length - 1; i++) {
                    let data = sections[i] && sections[i]['section_' + i] ? sections[i]['section_' + i].data : false;
                    if (data && data.length > 0) {
                        for (var k = 0; k <= data.length - 1; k++) {
                            this.wakeup_quantity += parseInt(data[k].wakeup_quantity)
                            this.wakeup_quantity = isNaN(this.wakeup_quantity) == true ? '0.00' : this.wakeup_quantity
                            this.wakeup_kcal += parseInt(data[k].wakeup_kcal)
                            this.wakeup_protein += parseInt(data[k].wakeup_protein)
                            this.wakeup_protein = isNaN(this.wakeup_protein) == true ? '0.00' : this.wakeup_protein
                            this.wakeup_carb += parseInt(data[k].wakeup_carb)
                            this.wakeup_fat += parseInt(data[k].wakeup_fat)
                            this.wakeup_fat = isNaN(this.wakeup_fat) == true ? '0.00' : this.wakeup_fat
                        }


                        this.productOrdersRadialBar.analyticsData = [
                            {'orderType': 'Total Kcal', 'counts': this.wakeup_kcal, color: 'primary'},
                            {'orderType': 'Protein', 'counts': this.wakeup_protein, color: 'warning'},
                            {'orderType': 'Carbs ', 'counts': this.wakeup_carb, color: 'danger'},
                            {'orderType': 'Fats ', 'counts': this.wakeup_fat, color: 'success'},
                        ]
                        this.series =
                            [this.wakeup_kcal,
                                Math.round(((4 * this.wakeup_protein) / this.wakeup_kcal) * 100),
                                Math.round(((4 * this.wakeup_carb) / this.wakeup_kcal) * 100),
                                Math.round(((9 * this.wakeup_fat) / this.wakeup_kcal) * 100),
                            ]


                    }
                }

            },
            insertRow(index){
                this.mealplan[this.mealplan_index]['mealplan_' + this.mealplan_no][index]['section_' + index].data.push([]);
            },
            deleteRow(index, index1){
                this.mealplan[this.mealplan_index]['mealplan_' + this.mealplan_no][index]['section_' + index].data.splice(index1, 1)
                firebase.firestore().collection('users').doc(this.uid).get()
                    .then(snap => {
                        snap.ref.update({mealplan: this.mealplan});
                        this.$vs.notify({
                            title: 'Deleted',
                            text: 'Successfully deleted the record',
                            iconPack: 'feather',
                            icon: 'icon-check',
                            color: 'success'
                        });
                        console.log('Successfully deleted the record')
                        this.calculateTotal();
                        this.getNutientsCalc();
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
                        this.instagram = data['instagram'] ? 'https://www.instagram.com/' + data['instagram'] : '';
                        this.twitter = data['twitter'] ? 'https://twitter.com/' + data['twitter'] : '';
                        this.facebook = data['facebook'] ? 'https://www.facebook.com/' + data['facebook'] : '';
                        this.name = data['first_name'] + ' ' + data['last_name'];
                        this.email = data['email'];
                        this.mobile = data['mobileFormat'];
                        this.gender = data['gender'];
                        this.location = data['location'];
                        this.address = data['address'];
                        this.status = data['status'] && data['status'] == true ? 'Active' : 'Block';

                        let selected_mealplan = this.mealplan[this.mealplan_index]

                        this.sections = data['mealplan'] && data['mealplan'].length > 0 && data['mealplan'][this.mealplan_index]['mealplan_' + this.mealplan_no].length ? data['mealplan'][this.mealplan_index]['mealplan_' + this.mealplan_no] : selected_mealplan['mealplan_' + this.mealplan_no];
                        this.mealplan = data['mealplan'] ? data['mealplan'].length > 0 ? data['mealplan'] : this.mealplan : this.mealplan;
//                        this.nutritionCalcualtion()
                        var nt_sections = [
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
                        ];
                        nt_sections = data['mealplan'] && data['mealplan'].length > 0 && data['mealplan'][this.mealplan_index]['mealplan_' + this.mealplan_no].length ? data['mealplan'][this.mealplan_index]['mealplan_' + this.mealplan_no] : selected_mealplan['mealplan_' + this.mealplan_no];
                        for (var i = 0; i <= nt_sections.length - 1; i++) {
                            let data = nt_sections[i] && nt_sections[i]['section_' + i] ? nt_sections[i]['section_' + i].data : false;
                            if (data && data.length > 0) {
                                var nutrients_kcal = 0
                                var nutrients_protien = 0
                                var nutrients_fat = 0
                                var nutrients_carbs = 0
                                var nutrients_potassium = 0
                                var nutrients_sodium = 0
                                var nutrients_vitamin_a = 0
                                var nutrients_vitamin_c = 0
                                var nutrients_calcium = 0
                                var nutrients_iron = 0
                                var nutrients_cholesterol = 0
                                var nutrients_fiber = 0
                                var food_kcal = 0
                                var qty = 1
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
                                    this.n_wakeup_kcal += item.wakeup_kcal
                                    this.n_wakeup_protein += nutrients_protien
                                    this.n_wakeup_carb += nutrients_carbs
                                    this.n_wakeup_fat += nutrients_fat
                                }
                            }
                        }
                        this.calculateTotal();

                        this.profileUrl = data['profileUrl'] ? data['profileUrl'] : '';
                        this.gender = data['gender'];
                        // Member Detail Data
                        this.dateofbirth = memberObj['dateofbirth'];
                        this.height_in_centimeter = memberObj['height_in_centimeter'];
                        this.height_in_inches = memberObj['height_in_inches'];
                        if (memberObj['weight_in_kg'] != '') {
                            this.weight_with_type = memberObj['weight_in_kg'] + ' KG'
                        } else {
                            this.weight_with_type = memberObj['weight_in_lbs'] + ' LBS'
                        }

                        this.height = (memberObj['height_in_centimeter'] != '') ? memberObj['height_in_centimeter'] : memberObj['height_in_inches'];
                        this.weight = (memberObj['weight_in_kg'] != '') ? (memberObj['weight_in_kg']) : memberObj['weight_in_lbs'];//weight kg convert into lBS

                        this.activity_level = memberObj['activity_level'];
                        this.bg_protein = memberObj['bg_protein'];

                        if (memberObj['program_type']) {
                            console.log('package data')
                            console.log(memberObj['program_type'])
                            firebase.firestore().collection('package').doc(memberObj['program_type']).get()
                                .then(snap => {
                                    this.packageTitle = snap.data().title
                                })
                        }
                        var program = memberObj['program_opted'];
                        if (program != '') {
                            firebase.firestore().collection('program-opted').doc(program).get()
                                .then((doc) => {
                                    const trainer = {
                                        id: doc.id,
                                        name: doc.data()['title']
                                    }
                                    this.program_opted.push(trainer)
                                });
                        }
                        firebase.firestore().collection('package').doc(memberObj['program_type']).get()
                            .then((doc) => {
                                if (doc.size > 0) {
                                    const program = {
                                        id: doc.id,
                                        name: doc.data()['title']
                                    }
                                    this.program_type.push(program)
                                }
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
                        this.medication_desc = memberObj['medication_desc'];
                        this.pictures = memberObj['pictures'];
                        this.pictures_terms_check = memberObj['pictures_terms_check'];
                        this.special_request = memberObj['special_request'] ? memberObj['message'] : 'There is no Special Request';
                        this.message = memberObj['message'] ? memberObj['message'] : 'There is no Message';


                        if (data.site_method) {
                            if (data['gender'] == 'male') {
                                let threesite = data['gender'] == 'male' ? data['maleSiteMethod']['threeSiteMethod'] : '0';
                                let sevensite = data['gender'] == 'male' ? data['maleSiteMethod']['sevenSiteMethod'] : '0';
                                if (data.site_method == 'three_site_method') {
                                    this.chest_site_1 = (threesite.chest_site_1) ? threesite.chest_site_1 : ''
                                    this.chest_site_2 = (threesite.chest_site_2) ? threesite.chest_site_2 : ''
                                    this.chest_site_3 = (threesite.chest_site_3) ? threesite.chest_site_3 : ''
                                    this.abdomen_site_1 = (threesite.abdomen_site_1) ? threesite.abdomen_site_1 : ''
                                    this.abdomen_site_2 = (threesite.abdomen_site_2) ? threesite.abdomen_site_2 : ''
                                    this.abdomen_site_3 = (threesite.abdomen_site_3) ? threesite.abdomen_site_3 : ''
                                    this.thigh_site_1 = (threesite.thigh_site_1) ? threesite.thigh_site_1 : ''
                                    this.thigh_site_2 = (threesite.thigh_site_2) ? threesite.thigh_site_2 : ''
                                    this.thigh_site_3 = (threesite.thigh_site_3) ? threesite.thigh_site_3 : ''
                                } else if (data.site_method == 'seven_site_method') {
                                    this.chest_site_1 = (sevensite.chest_site_1) ? sevensite.chest_site_1 : ''
                                    this.chest_site_2 = (sevensite.chest_site_2) ? sevensite.chest_site_2 : ''
                                    this.chest_site_3 = (sevensite.chest_site_3) ? sevensite.chest_site_3 : ''
                                    this.abdomen_site_1 = (sevensite.abdomen_site_1) ? sevensite.abdomen_site_1 : ''
                                    this.abdomen_site_2 = (sevensite.abdomen_site_2) ? sevensite.abdomen_site_2 : ''
                                    this.abdomen_site_3 = (sevensite.abdomen_site_3) ? sevensite.abdomen_site_3 : ''
                                    this.thigh_site_1 = (sevensite.thigh_site_1) ? sevensite.thigh_site_1 : ''
                                    this.thigh_site_2 = (sevensite.thigh_site_2) ? sevensite.thigh_site_2 : ''
                                    this.thigh_site_3 = (sevensite.thigh_site_3) ? sevensite.thigh_site_3 : ''

                                    this.suprailiac_site_1 = (sevensite.suprailiac_site_1) ? sevensite.suprailiac_site_1 : ''
                                    this.suprailiac_site_2 = (sevensite.suprailiac_site_2) ? sevensite.suprailiac_site_2 : ''
                                    this.suprailiac_site_3 = (sevensite.suprailiac_site_3) ? sevensite.suprailiac_site_3 : ''
                                    this.midaxilliary_site_1 = (sevensite.midaxilliary_site_1) ? sevensite.midaxilliary_site_1 : ''
                                    this.midaxilliary_site_2 = (sevensite.midaxilliary_site_2) ? sevensite.midaxilliary_site_2 : ''
                                    this.midaxilliary_site_3 = (sevensite.midaxilliary_site_3) ? sevensite.midaxilliary_site_3 : ''
                                    this.tricep_site_1 = (sevensite.tricep_site_1) ? sevensite.tricep_site_1 : ''
                                    this.tricep_site_2 = (sevensite.tricep_site_2) ? sevensite.tricep_site_2 : ''
                                    this.tricep_site_3 = (sevensite.tricep_site_3) ? sevensite.tricep_site_3 : ''
                                    this.subscapula_site_1 = (sevensite.subscapula_site_1) ? sevensite.subscapula_site_1 : ''
                                    this.subscapula_site_2 = (sevensite.subscapula_site_2) ? sevensite.subscapula_site_2 : ''
                                    this.subscapula_site_3 = (sevensite.subscapula_site_3) ? sevensite.subscapula_site_3 : ''
                                }
                            }
                            else if (data['gender'] == 'female') {
                                let sevensite = data['gender'] == 'female' ? data['femaleSiteMethod']['sevenSiteMethod'] : data['femaleSiteMethod']['sevenSiteMethod'];
                                let threesite = data['gender'] == 'female' ? data['femaleSiteMethod']['threeSiteMethod'] : data['femaleSiteMethod']['threeSiteMethod'];
                                if (data.site_method == 'three_site_method') {
                                    this.tricep_site_1 = (threesite.tricep_site_1) ? threesite.tricep_site_1 : ''
                                    this.tricep_site_2 = (threesite.tricep_site_2) ? threesite.tricep_site_2 : ''
                                    this.tricep_site_3 = (threesite.tricep_site_3) ? threesite.tricep_site_3 : ''
                                    this.suprailiac_site_1 = (threesite.suprailiac_site_1) ? threesite.suprailiac_site_1 : ''
                                    this.suprailiac_site_2 = (threesite.suprailiac_site_2) ? threesite.suprailiac_site_2 : ''
                                    this.suprailiac_site_3 = (threesite.suprailiac_site_3) ? threesite.suprailiac_site_3 : ''
                                    this.thigh_site_1 = (threesite.thigh_site_1) ? threesite.thigh_site_1 : ''
                                    this.thigh_site_2 = (threesite.thigh_site_2) ? threesite.thigh_site_2 : ''
                                    this.thigh_site_3 = (threesite.thigh_site_3) ? threesite.thigh_site_3 : ''
                                } else if (data.site_method == 'seven_site_method') {
                                    this.tricep_site_1 = (sevensite.tricep_site_1) ? sevensite.tricep_site_1 : ''
                                    this.tricep_site_2 = (sevensite.tricep_site_2) ? sevensite.tricep_site_2 : ''
                                    this.tricep_site_3 = (sevensite.tricep_site_3) ? sevensite.tricep_site_3 : ''
                                    this.suprailiac_site_1 = (sevensite.suprailiac_site_1) ? sevensite.suprailiac_site_1 : ''
                                    this.suprailiac_site_2 = (sevensite.suprailiac_site_2) ? sevensite.suprailiac_site_2 : ''
                                    this.suprailiac_site_3 = (sevensite.suprailiac_site_3) ? sevensite.suprailiac_site_3 : ''
                                    this.thigh_site_1 = (sevensite.thigh_site_1) ? sevensite.thigh_site_1 : ''
                                    this.thigh_site_2 = (sevensite.thigh_site_2) ? sevensite.thigh_site_2 : ''
                                    this.thigh_site_3 = (sevensite.thigh_site_3) ? sevensite.thigh_site_3 : ''

                                    this.abdomen_site_1 = (sevensite.abdomen_site_1) ? sevensite.abdomen_site_1 : ''
                                    this.abdomen_site_2 = (sevensite.abdomen_site_2) ? sevensite.abdomen_site_2 : ''
                                    this.abdomen_site_3 = (sevensite.abdomen_site_3) ? sevensite.abdomen_site_3 : ''
                                    this.midaxilliary_site_1 = (sevensite.midaxilliary_site_1) ? sevensite.midaxilliary_site_1 : ''
                                    this.midaxilliary_site_2 = (sevensite.midaxilliary_site_2) ? sevensite.midaxilliary_site_2 : ''
                                    this.midaxilliary_site_3 = (sevensite.midaxilliary_site_3) ? sevensite.midaxilliary_site_3 : ''
                                    this.chest_site_1 = (sevensite.chest_site_1) ? sevensite.chest_site_1 : ''
                                    this.chest_site_2 = (sevensite.chest_site_2) ? sevensite.chest_site_2 : ''
                                    this.chest_site_3 = (sevensite.chest_site_3) ? sevensite.chest_site_3 : ''
                                    this.subscapula_site_1 = (sevensite.subscapula_site_1) ? sevensite.subscapula_site_1 : ''
                                    this.subscapula_site_2 = (sevensite.subscapula_site_2) ? sevensite.subscapula_site_2 : ''
                                    this.subscapula_site_3 = (sevensite.subscapula_site_3) ? sevensite.subscapula_site_3 : ''
                                }
                            }
                        }
                        this.site_method = data.site_method ? data.site_method : 'three_site_method'
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
                        console.log('Successfully get user detail!!!!')
                    })
                    .catch(error => {
                        console.error('There was an error editing the record: ' + error)
                    })
            },
            getNutientsCalc(){
                firebase.firestore().collection('users')
                    .doc(this.uid)
                    .get()
                    .then(snap => {
                        let data = snap.data();
                        let memberObj = data['memberDetail'];
                        this.n_wakeup_kcal = 0
                        this.n_wakeup_fat = 0
                        this.n_wakeup_carb = 0
                        this.n_wakeup_protein = 0
                        var nts_sections = [
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
                        ];
                        nts_sections = data['mealplan'] && data['mealplan'].length > 0 && data['mealplan'][this.mealplan_index]['mealplan_' + this.mealplan_no].length ? data['mealplan'][this.mealplan_index]['mealplan_' + this.mealplan_no] : selected_mealplan['mealplan_' + this.mealplan_no];
                        for (var i = 0; i <= nts_sections.length - 1; i++) {
                            let data = nts_sections[i] && nts_sections[i]['section_' + i] ? nts_sections[i]['section_' + i].data : false;
                            if (data && data.length > 0) {
                                var nutrients_kcal = 0
                                var nutrients_protien = 0
                                var nutrients_fat = 0
                                var nutrients_carbs = 0
                                var nutrients_potassium = 0
                                var nutrients_sodium = 0
                                var nutrients_vitamin_a = 0
                                var nutrients_vitamin_c = 0
                                var nutrients_calcium = 0
                                var nutrients_iron = 0
                                var nutrients_cholesterol = 0
                                var nutrients_fiber = 0
                                var food_kcal = 0
                                var qty = 1
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
                                    this.n_wakeup_kcal += item.wakeup_kcal
                                    this.n_wakeup_protein += nutrients_protien
                                    this.n_wakeup_carb += nutrients_carbs
                                    this.n_wakeup_fat += nutrients_fat
                                }
                            }
                        }
                    })
                    .catch(error => {
                        console.error('There was an error editing the record: ' + error)
                    })
            },
            changeServingType($event, index, index1){
                let unit = $event.target.value
                let vals = 0
                let data = this.mealplan[this.mealplan_index]['mealplan_' + this.mealplan_no][index]['section_' + index].data;
                let nutrients_kcal = 0
                let nutrients_protien = 0
                let nutrients_fat = 0
                let nutrients_carbs = 0
                let qty = 1

                data[index1].alt_measures.forEach((row, index) => {
                    if (row.measure == unit) {
                        qty = row.qty
                        vals = row.serving_weight
                    }
                })
                data[index1].full_nutrients.forEach((row, index) => {
                    if (row.attr_id == 208) nutrients_kcal = row.value;
                    if (row.attr_id == 203) nutrients_protien = row.value;
                    if (row.attr_id == 204) nutrients_fat = row.value;
                    if (row.attr_id == 205) nutrients_carbs = row.value;
                })

                nutrients_kcal = (vals / data[index1].serving_weight_grams) * nutrients_kcal
                nutrients_protien = (vals / data[index1].serving_weight_grams) * nutrients_protien
                nutrients_fat = (vals / data[index1].serving_weight_grams) * nutrients_fat
                nutrients_carbs = (vals / data[index1].serving_weight_grams) * nutrients_carbs

                data[index1].wakeup_quantity = qty
                data[index1].wakeup_unit = unit
                data[index1].wakeup_kcal = nutrients_kcal
                data[index1].wakeup_protein = nutrients_protien
                data[index1].wakeup_carb = nutrients_carbs
                data[index1].wakeup_fat = nutrients_fat
                data[index1].wakeup_kcal_original = nutrients_kcal / qty
                data[index1].wakeup_protein_original = nutrients_protien / qty
                data[index1].wakeup_carb_original = nutrients_carbs / qty
                data[index1].wakeup_fat_original = nutrients_fat / qty
                console.log(data[index1])
                firebase.firestore().collection('users').doc(this.uid).get()
                    .then(snap => {
                        snap.ref.update({mealplan: this.mealplan});
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
            mealPlan: function (rowIndex, rowIndexData, item) {
                this.dropdownShow = false;
                this.dropdownLoadingShow = false;
                this.dropdownLoadingShow1 = false;
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
                            let food = {
                                id: row.food_name,
                                name: row.food_name,
                                wakeup_quantity: row.serving_qty,
                                wakeup_unit: row.serving_unit,
                                image: row.photo ? row.photo.thumb : '',
                                wakeup_kcal: row.nf_calories,
                                wakeup_protein: row.nf_protein,
                                wakeup_carb: row.nf_total_carbohydrate,
                                wakeup_fat: row.nf_total_fat,
                                wakeup_unit_original: row.serving_unit,
                                wakeup_kcal_original: row.nf_calories / row.serving_qty,
                                wakeup_protein_original: row.nf_protein / row.serving_qty,
                                wakeup_carb_original: row.nf_total_carbohydrate / row.serving_qty,
                                wakeup_fat_original: row.nf_total_fat / row.serving_qty,
                                alt_measures: row.alt_measures,
                                serving_weight_grams: row.serving_weight_grams,
                                full_nutrients: row.full_nutrients,
                            }
                            this.mealplan[this.mealplan_index]['mealplan_' + this.mealplan_no][rowIndex]['section_' + rowIndex].data.splice(rowIndexData, 1, food);
                            this.calculateTotal();


                        }

                        firebase.firestore().collection('users').doc(this.uid).get()
                            .then(snap => {
//                                this.getUserDetail()
                                this.getNutientsCalc()
                                snap.ref.update({mealplan: this.mealplan});
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
                    })
                    .catch(e => {
                        console.log(e)
                    })
            },
            openLoading() {
                this.$vs.loading({
                    container: '#div-with-loading',
                    scale: 0.6
                })
                setTimeout(() => {
                    this.$vs.loading.close('#div-with-loading > .con-vs-loading')
                }, 1000);
            },
            changeItem: function changeItem(input, value) {
                var dob = moment(this.dateofbirth).format('DD-MMMM-YYYY')
                this.age = moment().diff(dob, 'years')
                this.openLoading()
                if (this.gender != '') {
                    if (this.age != '0') {
                        if (this.gender == 'male') {
                            if (this.site_method == 'seven_site_method') {
                                let chest_average = (parseInt(this.chest_site_1 == '' ? 0 : this.chest_site_1) + parseInt(this.chest_site_2 == '' ? 0 : this.chest_site_2) + parseInt(this.chest_site_3 == '' ? 0 : this.chest_site_3)) / 3;
                                let abdomen_average = (parseInt(this.abdomen_site_1 == '' ? 0 : this.abdomen_site_1) + parseInt(this.abdomen_site_2 == '' ? 0 : this.abdomen_site_2) + parseInt(this.abdomen_site_3 == '' ? 0 : this.abdomen_site_3)) / 3;
                                let thigh_average = (parseInt(this.thigh_site_1 == '' ? 0 : this.thigh_site_1) + parseInt(this.thigh_site_2 == '' ? 0 : this.thigh_site_2) + parseInt(this.thigh_site_3 == '' ? 0 : this.thigh_site_3)) / 3;
                                let suprailiac_average = (parseInt(this.suprailiac_site_1 == '' ? 0 : this.suprailiac_site_1) + parseInt(this.suprailiac_site_2 == '' ? 0 : this.suprailiac_site_2) + parseInt(this.suprailiac_site_3 == '' ? 0 : this.suprailiac_site_3)) / 3;

                                let midaxilliary_average = (parseInt(this.midaxilliary_site_1 == '' ? 0 : this.midaxilliary_site_1) + parseInt(this.midaxilliary_site_2 == '' ? 0 : this.midaxilliary_site_2) + parseInt(this.midaxilliary_site_3 == '' ? 0 : this.midaxilliary_site_3)) / 3;
                                let tricep_average = (parseInt(this.tricep_site_1 == '' ? 0 : this.tricep_site_1) + parseInt(this.tricep_site_2 == '' ? 0 : this.tricep_site_2) + parseInt(this.tricep_site_3 == '' ? 0 : this.tricep_site_3)) / 3;
                                let subscapula_average = (parseInt(this.subscapula_site_1 == '' ? 0 : this.subscapula_site_1) + parseInt(this.subscapula_site_2 == '' ? 0 : this.subscapula_site_2) + parseInt(this.subscapula_site_3 == '' ? 0 : this.subscapula_site_3)) / 3;
                                this.chest_average = (chest_average).toFixed(2);
                                this.abdomen_average = (abdomen_average).toFixed(2);
                                this.thigh_average = (thigh_average).toFixed(2);
                                this.subscapula_average = (subscapula_average).toFixed(2);
                                this.midaxilliary_average = (midaxilliary_average).toFixed(2);
                                this.tricep_average = (tricep_average).toFixed(2);
                                this.suprailiac_average = (suprailiac_average).toFixed(2);
                                var total_Average = (chest_average + abdomen_average + thigh_average + suprailiac_average + midaxilliary_average + tricep_average + subscapula_average)
                                var fat = ((4.57 / (1.112 - (0.00043499 * total_Average) + (0.00000055 * (total_Average) ** 2) - (0.00028826 * this.age))) - 4.142) * 100
                            } else if (this.site_method == 'three_site_method') {
                                let chest_average = (parseInt(this.chest_site_1 == '' ? 0 : this.chest_site_1) + parseInt(this.chest_site_2 == '' ? 0 : this.chest_site_2) + parseInt(this.chest_site_3 == '' ? 0 : this.chest_site_3)) / 3;
                                let abdomen_average = (parseInt(this.abdomen_site_1 == '' ? 0 : this.abdomen_site_1) + parseInt(this.abdomen_site_2 == '' ? 0 : this.abdomen_site_2) + parseInt(this.abdomen_site_3 == '' ? 0 : this.abdomen_site_3)) / 3;
                                let thigh_average = (parseInt(this.thigh_site_1 == '' ? 0 : this.thigh_site_1) + parseInt(this.thigh_site_2 == '' ? 0 : this.thigh_site_2) + parseInt(this.thigh_site_3 == '' ? 0 : this.thigh_site_3)) / 3;
                                this.chest_average = (chest_average).toFixed(2);
                                this.abdomen_average = (abdomen_average).toFixed(2);
                                this.thigh_average = (thigh_average).toFixed(2);
                                var total_Average = (chest_average + abdomen_average + thigh_average)
                                var fat = ((4.57 / (1.10938 - (0.0008267 * total_Average) + (0.0000016 * (total_Average) ** 2) - (0.000257 * this.age))) - 4.142) * 100
                            }
                        } else if (this.gender == 'female') {
                            if (this.site_method == 'seven_site_method') {
                                let tricep_average = (parseInt(this.tricep_site_1 == '' ? 0 : this.tricep_site_1) + parseInt(this.tricep_site_2 == '' ? 0 : this.tricep_site_2) + parseInt(this.tricep_site_3 == '' ? 0 : this.tricep_site_3)) / 3;
                                let suprailiac_average = (parseInt(this.suprailiac_site_1 == '' ? 0 : this.suprailiac_site_1) + parseInt(this.suprailiac_site_2 == '' ? 0 : this.suprailiac_site_2) + parseInt(this.suprailiac_site_3 == '' ? 0 : this.suprailiac_site_3)) / 3;
                                let thigh_average = (parseInt(this.thigh_site_1 == '' ? 0 : this.thigh_site_1) + parseInt(this.thigh_site_2 == '' ? 0 : this.thigh_site_2) + parseInt(this.thigh_site_3 == '' ? 0 : this.thigh_site_3)) / 3;
                                let subscapula_average = (parseInt(this.subscapula_site_1 == '' ? 0 : this.subscapula_site_1) + parseInt(this.subscapula_site_2 == '' ? 0 : this.subscapula_site_2) + parseInt(this.subscapula_site_3 == '' ? 0 : this.subscapula_site_3)) / 3;
                                let chest_average = (parseInt(this.chest_site_1 == '' ? 0 : this.chest_site_1) + parseInt(this.chest_site_2 == '' ? 0 : this.chest_site_2) + parseInt(this.chest_site_3 == '' ? 0 : this.chest_site_3)) / 3;
                                let abdomen_average = (parseInt(this.abdomen_site_1 == '' ? 0 : this.abdomen_site_1) + parseInt(this.abdomen_site_2 == '' ? 0 : this.abdomen_site_2) + parseInt(this.abdomen_site_3 == '' ? 0 : this.abdomen_site_3)) / 3;
                                let midaxilliary_average = (parseInt(this.midaxilliary_site_1 == '' ? 0 : this.midaxilliary_site_1) + parseInt(this.midaxilliary_site_2 == '' ? 0 : this.midaxilliary_site_2) + parseInt(this.midaxilliary_site_3 == '' ? 0 : this.midaxilliary_site_3)) / 3;
                                this.chest_average = (chest_average).toFixed(2);
                                this.abdomen_average = (abdomen_average).toFixed(2);
                                this.thigh_average = (thigh_average).toFixed(2);
                                this.subscapula_average = (subscapula_average).toFixed(2);
                                this.midaxilliary_average = (midaxilliary_average).toFixed(2);
                                this.tricep_average = (tricep_average).toFixed(2);
                                this.suprailiac_average = (suprailiac_average).toFixed(2);
                                var total_Average = (chest_average + abdomen_average + thigh_average + suprailiac_average + midaxilliary_average + tricep_average + subscapula_average)
                                var fat = ((4.57 / (1.097 - (0.00046971 * total_Average) + (0.00000056 * (total_Average) ** 2) - (0.00012828 * this.age))) - 4.142) * 100
                            } else if (this.site_method == 'three_site_method') {
                                let tricep_average = (parseInt(this.tricep_site_1 == '' ? 0 : this.tricep_site_1) + parseInt(this.tricep_site_2 == '' ? 0 : this.tricep_site_2) + parseInt(this.tricep_site_3 == '' ? 0 : this.tricep_site_3)) / 3;
                                let suprailiac_average = (parseInt(this.suprailiac_site_1 == '' ? 0 : this.suprailiac_site_1) + parseInt(this.suprailiac_site_2 == '' ? 0 : this.suprailiac_site_2) + parseInt(this.suprailiac_site_3 == '' ? 0 : this.suprailiac_site_3)) / 3;
                                let thigh_average = (parseInt(this.thigh_site_1 == '' ? 0 : this.thigh_site_1) + parseInt(this.thigh_site_2 == '' ? 0 : this.thigh_site_2) + parseInt(this.thigh_site_3 == '' ? 0 : this.thigh_site_3)) / 3;
                                this.tricep_average = (tricep_average).toFixed(2);
                                this.suprailiac_average = (suprailiac_average).toFixed(2);
                                this.thigh_average = (thigh_average).toFixed(2);
                                var total_Average = (tricep_average + suprailiac_average + thigh_average)
                                var fat = ((4.57 / (1.0994921 - (0.0009929 * total_Average) + (0.0000023 * (total_Average) ** 2) - (0.0001392 * this.age))) - 4.142) * 100

                            }
                        }
                        // this.selected = event.target.value;
//                        this.fat = (fat).toFixed(2)
                        this.fat = isNaN(fat) == true ? '0.00' : (fat).toFixed(2)
                        let activity = this.activity_level
                        this.activity_level = this.activity_level//(input=='activity')?value.target.value:this.activity_level
                        let lmb = this.weight - (this.weight * (fat / 100))
//                        this.lmb = (lmb).toFixed(2)
                        this.lmb = isNaN(lmb) == true ? '0.00' : (lmb).toFixed(2)
                        let rmr = 370 + (21.6 * (lmb / 2.2))
//                        this.rmr = (rmr).toFixed(2)
                        this.rmr = isNaN(rmr) == true ? '0.00' : (rmr).toFixed(2)
                        let fbm = this.weight * (fat / 100)
//                        this.fbm = (fbm).toFixed(2)
                        this.fbm = isNaN(fbm) == true ? '0.00' : (fbm).toFixed(2)
                        let calories = rmr * activity
                        // this.calory = (rmr * activity).toFixed(2)
                        let macroCalory = (rmr * activity).toFixed(2)
                        this.calory = isNaN(macroCalory) == true ? '0.00' : macroCalory
                        // this.bg_protein = 'low'

                        if (this.bg_protein == 'low') {
                            this.protein_percentage = '25%'
                            this.carbohydrate_percentage = '50%'
                            this.fat_percentage = '25%'
                            let calories_protein = calories * 0.25
                            let protein = calories_protein / 4
                            // this.protein = (protein).toFixed(2)
                            let macroProtein = (protein).toFixed(2)
                            this.protein = isNaN(macroProtein) == true ? '0.00' : macroProtein
                            let calories_carbohydrates = calories * 0.5
                            let calory_carbohydrate = calories_carbohydrates / 4
                            let macroCarbohydrate = (calory_carbohydrate).toFixed(2)
                            this.carbohydrates = isNaN(macroCarbohydrate) == true ? '0.00' : macroCarbohydrate
                            // this.carbohydrates = (calory_carbohydrate).toFixed(2)
                            let fat_calories = calories * 0.25
                            let fat = fat_calories / 9
                            let macroFat = (fat).toFixed(2)
                            this.fatsCalculate = isNaN(macroFat) == true ? '0.00' : macroFat

                        }
                        else if (this.bg_protein == 'high') {
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
                        }
                        else if (this.bg_protein == 'normal') {
                            this.protein_percentage = '40%'
                            this.carbohydrate_percentage = '40%'
                            this.fat_percentage = '20%'
                            let calories_protein = calories * 0.4
                            let protein = calories_protein / 4
//                            this.protein = (protein).toFixed(2)
                            let macroProtein = (protein).toFixed(2)
                            this.protein = isNaN(macroProtein) == true ? '0.00' : macroProtein
                            let calories_carbohydrates = calories * 0.4
                            let calory_carbohydrate = calories_carbohydrates / 4
//                            this.carbohydrates = (calory_carbohydrate).toFixed(2)
                            let macroCarbohydrate = (calory_carbohydrate).toFixed(2)
                            this.carbohydrates = isNaN(macroCarbohydrate) == true ? '0.00' : macroCarbohydrate
                            let fat_calories = calories * 0.2
                            let fat = fat_calories / 9
//                            this.fatsCalculate = (fat).toFixed(2)
                            let macroFat = (fat).toFixed(2)
                            this.fatsCalculate = isNaN(macroFat) == true ? '0.00' : macroFat
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
            VueApexCharts,
            StatisticsCardLine,
            'v-select': vSelect
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

    .avatars {
        height: 200px;
    }

    fieldset {
        padding: 20px;
        border-radius: 10px;
    }

    #male-table .vs-con-input-label, #female-table .vs-con-input-label {
        width: 80px !important;
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

    .btn-view {
        float: right;
        margin-top: 0px;
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

    .d-none {
        display: none !important;
    }

    .m-none {
        display: inline-flex !important;
        position: relative;
        top: -2px;
    }

    @media only screen and ( max-width: 1024px ) {

        .m-none {
            display: none !important;
        }

        .d-none {
            display: inline-flex !important;
            position: relative;
            top: -2px;
        }
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
        .btn-view {
            float: left;
            margin-top: -40px;
            margin-bottom: 20px;
        }

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
        height: 300px;
        left: 26px;
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

    .category-list {
        display: inline-flex;
    }

    .category-list li {
        position: relative;
        top: 10px;
    }

    .member-trainer-profile-view .info td {
        width: 100%;
        float: left;
    }

    .member-trainer-profile-view .info table {
        width: 100%;
    }

    .member-trainer-profile-view table th {
        background-color: #f7f7f7;
    }

    .member-trainer-profile-view .info th, .member-trainer-profile-view .info td {
        padding: 3px !important;
    }

    .member-trainer-profile-view table h6 button, .member-trainer-profile-view table button.del-row-btn {
        float: right !important;
        border-radius: 50%;
        height: 35px !important;
        width: 35px !important;
        margin-right: 10px;
    }

    .member-trainer-profile-view .vs-table--tbody-table .tr-values:not(.activeEdit):not(.tr-expandedx):not(.hoverFlat):hover {
        -webkit-transform: none;
        transform: none;
    }

    .section-input input {
        font-size: 16px !important;
        font-weight: 600 !important;
    }

    .member-trainer-profile-view .dropdown-button-container {
        display: flex;
        align-items: center;
    }

    .member-trainer-profile-view .btnx {
        border-radius: 5px 0px 0px 5px;
    }

    .member-trainer-profile-view .btn-drop {
        border-radius: 0px 5px 5px 0px;
        border-left: 1px solid rgba(255, 255, 255, .2);
    }
</style>
