<!-- =========================================================================================
    File Name: Edit Members form
    Description: These Details are added by Admin
     ========================================================================================== -->

<template>

    <div class="form-holder">
        <div id="form2" class="register-form">

            <!-- package section start-->
            <div class="centerx">
                <vs-popup class="holamundo" title="You can Freeze your program for max 10day's"
                          :active.sync="popupActivo">
                    <div class="vx-col lg:w-1/2 sm:w-1/2 mb-6">
                        <label>For days</label>
                        <select v-model="days_pause" class="w-full"
                                style=" height: 38px; padding: 5px 10px; border-radius: 3px; border: 1px solid rgba(0,0,0,.2)">
                            <option v-for="n in 10 - days_paused" :value="n">
                                {{ n }}
                            </option>
                        </select>
                    </div>
                    <vs-button class="mr-3 mb-2" id="button-save11" @click="pauseProgram">Save</vs-button>
                </vs-popup>
            </div>
            <div class="vx-row mb-4">
                <div class="vx-col lg:w-1/4">
                  <vx-card v-if="lead_member_conversion >= 1">
                      <span> <label> {{(lead_member_conversion >= 1)?'This Member is Converted from Lead':'' }}</label></span>
                  </vx-card>
                    <vx-card title="" class="mb-4">
                        <div style="text-align:center">

                            <img v-if="profileUrl != ''" :src="profileUrl"
                                 class="" style="width:100%;margin:auto;max-height:300px">
                            <img v-if="profileUrl == '' && gender=='other'"
                                 style="width:100%;margin:auto;max-height:300px"
                                 src="../../../assets/images/portrait/small/default-profile.png"
                                 class="">
                            <img v-if="profileUrl == '' && gender=='female' "
                                 style="width:100%;margin:auto;max-height:300px"
                                 src="../../../assets/images/portrait/small/female_avatar_vector.png"
                                 class="">
                            <img v-if="profileUrl == '' && gender=='male'"
                                 style="width:100%;margin:auto;max-height:300px"
                                 src="../../../assets/images/portrait/small/default-profile.png"
                                 class="">
                        </div>
                    </vx-card>

                    <vx-card title="" class="mb-4">
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

                                <strong>Start Date:</strong>&nbsp;

                            </div>


                            <div class="vx-col lg:w-1/2">
                                <p>{{package_start_date}}</p>


                            </div>

                        </div>
                        <div class="vx-row">
                            <div class="vx-col lg:w-1/2">

                                <strong>End Date:</strong>&nbsp;

                            </div>


                            <div class="vx-col lg:w-1/2">

                                <p>{{package_end_date}}</p>

                            </div>

                        </div>
                        <div class="vx-row">
                            <div class="vx-col lg:w-1/2">
                                <span> <label>Staus:</label></span>
                            </div>
                            <div class="vx-col lg:w-1/2">
                        <span @click="popupActivo=true"
                              v-if="program_type_start != '' && programe_pause_count < 3 && days_paused <= 10 && program_is_passed"
                              class="text-warning">
                          Active
                                                  <vs-button color="warning" radius type="gradient" icon-pack="feather"
                                                             icon="icon-pause"
                                                             style="display: inline-flex;"></vs-button>
                        </span>

                                <span v-if="!program_type_start" @click="startProgram" class="text-primary">
                          Not started
                                            <vs-button color="success" radius type="gradient" icon-pack="feather"
                                                       icon="icon-play" style="display: inline-flex;"></vs-button>
                        </span>

                                <span v-if="progame_paused_log.length > 0 && program_is_resume" @click="resumeProgram"
                                      class="text-primary">
                          Resume
                                            <vs-button color="success" radius type="gradient" icon-pack="feather"
                                                       icon="icon-play" style="display: inline-flex;"></vs-button>
                        </span>

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
                                        {{ gender}}
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
                                        {{height_in_inches ? height_in_inches  : 'Not Added Yet'}}
                                        {{height_in_centimeter ? height_in_centimeter :  'Not Added Yet'}}

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

            <!--Member Body Images Start-->

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
            <!--Member Body Images End-->

            <div class="" id="data-save">

                <div class="vs-con-loading__container" id="div-with-loading">
                    <div class="vx-row">
                        <div class="vx-col lg:w-1/4 md:w-1/4 sm:w-1/1 w-full mb-base text-center">
                            <vx-card title="Calories">

                                <img src="../../../assets/images/pages/bg-fire.png" alt="image"
                                     style="margin: 0 auto;;width:55%">
                                <span style="display: block; color: #7367f0; font-size: 20px; font-weight: bold;">{{calory}}</span>
                                <span style="display: block; font-size: 16px; font-weight: bold;">Per Day</span>
                            </vx-card>
                        </div>
                        <div class="vx-col lg:w-1/4 md:w-1/4 sm:w-1/1 w-full mb-base text-center">
                            <vx-card title="Carbs">

                                <img src="../../../assets/images/pages/bg-crabs.png" alt="image"
                                     style="margin: 0 auto;width:55%">
                                <span style="display: block; color: #7367f0; font-size: 20px; font-weight: bold;"
                                      v-if="carbohydrates">{{carbohydrates}}({{carbohydrate_percentage}})</span>
                                <span style="display: block; font-size: 16px; font-weight: bold;">Gram Per Day</span>
                            </vx-card>

                        </div>
                        <div class="vx-col lg:w-1/4 md:w-1/4 sm:w-1/1 w-full mb-base text-center">
                            <vx-card title="Protiens">

                                <img src="../../../assets/images/pages/bg-protine.png" alt="image" class="mx-auto"
                                     style="margin: 0 auto;;width:55%">
                                <span style="display: block; color: #7367f0; font-size: 20px; font-weight: bold;"
                                      v-if="protein">{{protein}}({{protein_percentage}})</span>
                                <span style="display: block; font-size: 16px; font-weight: bold;">Gram Per Day</span>
                            </vx-card>

                        </div>
                        <div class="vx-col lg:w-1/4 md:w-1/4 sm:w-1/1 w-full mb-base text-center">

                            <vx-card title="Fats">

                                <img src="../../../assets/images/pages/bg-fats.png" alt="image" class="mx-auto"
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
                                                            <vs-radio v-model="activity_level" vs-value="1.2"
                                                                      :disabled="true">Sedentary
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
                                                            <vs-radio v-model="activity_level" vs-value="1.375"
                                                                      :disabled="true">Light
                                                                exercise
                                                            </vs-radio>
                                                            <span class="pl-1 m-none"><vx-tooltip
                                                                    text="light exercise/sports 1-3 days / week">
                          <feather-icon icon="AlertCircleIcon" svgClasses="h-4 w-4"/></vx-tooltip></span>
                                                            <span @click="lightExerciseActive=true"
                                                                  style="display: inline-flex; position:relative; top:-2px;"
                                                                  class="pl-1 d-none"><feather-icon
                                                                    icon="AlertCircleIcon" svgClasses="h-4 w-4"/></span>

                                                            <vs-popup class="holamundo"
                                                                      :active.sync="lightExerciseActive"
                                                                      title="Light Exercise">
                                                                <p>light exercise/sports 1-3 days / week</p>
                                                            </vs-popup>
                                                        </li>
                                                        <li class="mt-2">
                                                            <vs-radio v-model="activity_level" vs-value="1.55"
                                                                      :disabled="true">Moderately
                                                                active
                                                            </vs-radio>
                                                            <span class="pl-1 m-none"><vx-tooltip
                                                                    text="moderate exercise/sports 3-5 days/week">
                          <feather-icon icon="AlertCircleIcon" svgClasses="h-4 w-4"/></vx-tooltip></span>
                                                            <span @click="moderatelyActive=true"
                                                                  style="display: inline-flex; position:relative; top:-2px;"
                                                                  class="pl-1 d-none"><feather-icon
                                                                    icon="AlertCircleIcon" svgClasses="h-4 w-4"/></span>

                                                            <vs-popup class="holamundo" :active.sync="moderatelyActive"
                                                                      title="Moderately active">
                                                                <p>moderate exercise/sports 3-5 days/week</p>
                                                            </vs-popup>
                                                        </li>
                                                        <li class="mt-2">
                                                            <vs-radio v-model="activity_level" vs-value="1.725"
                                                                      :disabled="true">Very
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
                                                            <vs-radio v-model="bg_protein"
                                                                      vs-value="low" :disabled="true">Low
                                                            </vs-radio>
                                                            <span class="pl-1 m-none"><vx-tooltip text="Low">
                          <feather-icon icon="AlertCircleIcon" svgClasses="h-4 w-4"/></vx-tooltip></span>
                                                            <span @click="lowActive=true"
                                                                  style="display: inline-flex; position:relative; top:-2px;"
                                                                  class="pl-1 d-none"><feather-icon
                                                                    icon="AlertCircleIcon" svgClasses="h-4 w-4"/></span>

                                                            <vs-popup class="holamundo" :active.sync="lowActive"
                                                                      title="Low">

                                                            </vs-popup>
                                                        </li>
                                                        <li class="mt-2">
                                                            <vs-radio
                                                                    v-model="bg_protein" vs-value="normal"
                                                                    :disabled="true">Normal
                                                            </vs-radio>
                                                            <span class="pl-1 m-none"><vx-tooltip text="Normal ">
                          <feather-icon icon="AlertCircleIcon" svgClasses="h-4 w-4"/></vx-tooltip></span>
                                                            <span @click="normalActive=true"
                                                                  style="display: inline-flex; position:relative; top:-2px;"
                                                                  class="pl-1 d-none"><feather-icon
                                                                    icon="AlertCircleIcon" svgClasses="h-4 w-4"/></span>

                                                            <vs-popup class="holamundo" :active.sync="normalActive"
                                                                      title="Normal">

                                                            </vs-popup>
                                                        </li>
                                                        <li class="mt-2">
                                                            <vs-radio
                                                                    v-model="bg_protein" vs-value="high"
                                                                    :disabled="true">High
                                                            </vs-radio>
                                                            <span class="pl-1 m-none"><vx-tooltip text="High ">
                          <feather-icon icon="AlertCircleIcon" svgClasses="h-4 w-4"/></vx-tooltip></span>
                                                            <span @click="highActive=true"
                                                                  style="display: inline-flex; position:relative; top:-2px;"
                                                                  class="pl-1 d-none"><feather-icon
                                                                    icon="AlertCircleIcon" svgClasses="h-4 w-4"/></span>

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

                                                        <vs-popup class="holamundo" :active.sync="lbmActive"
                                                                  title="LBM">
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

                                                        <vs-popup class="holamundo" :active.sync="rmrActive"
                                                                  title="RMR">
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

                                                        <vs-popup class="holamundo" :active.sync="fbmActive"
                                                                  title="FBM">
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
                                                  vs-value="three_site_method" :disabled="true">Three Site Method
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
                                                  vs-value="seven_site_method" :disabled="true">Seven Site Method
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
                                                          placeholder="0"/>
                                            </vs-td>
                                            <vs-td>
                                                <vs-input type="number" v-model="chest_site_2" class="inputx"
                                                          placeholder="0"
                                                />
                                            </vs-td>
                                            <vs-td>
                                                <vs-input type="number" v-model="chest_site_3" class="inputx"
                                                          placeholder="0"
                                                />
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
                                                />

                                            </vs-td>
                                            <vs-td>
                                                <vs-input type="number" v-model="abdomen_site_2" class="inputx"
                                                          placeholder="0"
                                                />

                                            </vs-td>
                                            <vs-td>
                                                <vs-input type="number" v-model="abdomen_site_3" class="inputx"
                                                          placeholder="0"
                                                />

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
                                                />

                                            </vs-td>
                                            <vs-td>
                                                <vs-input type="number" v-model="thigh_site_2" class="inputx"
                                                          placeholder="0"
                                                />

                                            </vs-td>
                                            <vs-td>
                                                <vs-input type="number" v-model="thigh_site_3" class="inputx"
                                                          placeholder="0"
                                                />

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
                                                />
                                            </vs-td>
                                            <vs-td>
                                                <vs-input type="number" v-model="suprailiac_site_3" class="inputx"
                                                          placeholder="0"
                                                />
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
                                                />

                                            </vs-td>
                                            <vs-td>
                                                <vs-input type="number" v-model="midaxilliary_site_2" class="inputx"
                                                          placeholder="0"
                                                />


                                            </vs-td>
                                            <vs-td>
                                                <vs-input type="number" v-model="midaxilliary_site_3" class="inputx"
                                                          placeholder="0"
                                                />


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
                                                />

                                            </vs-td>
                                            <vs-td>
                                                <vs-input type="number" v-model="tricep_site_2" class="inputx"
                                                          placeholder="0"
                                                />


                                            </vs-td>
                                            <vs-td>
                                                <vs-input type="number" v-model="tricep_site_3" class="inputx"
                                                          placeholder="0"
                                                />


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
                                                />
                                            </vs-td>
                                            <vs-td>
                                                <vs-input type="number" v-model="subscapula_site_2" class="inputx"
                                                          placeholder="0"
                                                />
                                            </vs-td>
                                            <vs-td>
                                                <vs-input type="number" v-model="subscapula_site_3" class="inputx"
                                                          placeholder="0"
                                                />
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
                                                />
                                            </vs-td>
                                            <vs-td>
                                                <vs-input type="number" v-model="tricep_site_2" class="inputx"
                                                          placeholder="0"
                                                />
                                            </vs-td>
                                            <vs-td>
                                                <vs-input type="number" v-model="tricep_site_3" class="inputx"
                                                          placeholder="0"
                                                />
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
                                                />

                                            </vs-td>
                                            <vs-td>
                                                <vs-input type="number" v-model="suprailiac_site_2" class="inputx"
                                                          placeholder="0"
                                                />

                                            </vs-td>
                                            <vs-td>
                                                <vs-input type="number" v-model="suprailiac_site_3" class="inputx"
                                                          placeholder="0"
                                                />

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
                                                />

                                            </vs-td>
                                            <vs-td>
                                                <vs-input type="number" v-model="thigh_site_2" class="inputx"
                                                          placeholder="0"
                                                />

                                            </vs-td>
                                            <vs-td>
                                                <vs-input type="number" v-model="thigh_site_3" class="inputx"
                                                          placeholder="0"
                                                />
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
                                                />

                                            </vs-td>
                                            <vs-td>
                                                <vs-input type="number" v-model="abdomen_site_2" class="inputx"
                                                          placeholder="0"
                                                />

                                            </vs-td>
                                            <vs-td>
                                                <vs-input type="number" v-model="abdomen_site_3" class="inputx"
                                                          placeholder="0"
                                                />

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
                                                />
                                                <!--                          {{ tr.email }}-->

                                                <!--<template slot="edit">
                          <vs-input class="inputx" placeholder="Email" />
                        </template>-->
                                            </vs-td>
                                            <vs-td>
                                                <vs-input type="number" v-model="midaxilliary_site_2" class="inputx"
                                                          placeholder="0"
                                                />


                                            </vs-td>
                                            <vs-td>
                                                <vs-input type="number" v-model="midaxilliary_site_3" class="inputx"
                                                          placeholder="0"
                                                />


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
                                                />

                                            </vs-td>
                                            <vs-td>
                                                <vs-input type="number" v-model="chest_site_2" class="inputx"
                                                          placeholder="0"
                                                />


                                            </vs-td>
                                            <vs-td>
                                                <vs-input type="number" v-model="chest_site_3" class="inputx"
                                                          placeholder="0"
                                                />


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
                                                />
                                            </vs-td>
                                            <vs-td>
                                                <vs-input type="number" v-model="subscapula_site_2" class="inputx"
                                                          placeholder="0"
                                                />
                                            </vs-td>
                                            <vs-td>
                                                <vs-input type="number" v-model="subscapula_site_3" class="inputx"
                                                          placeholder="0"
                                                />
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
        </div>
    </div>

</template>
<script>
    require('firebase/firestore')
    import 'firebase/auth'
    import firebase from 'firebase'
    import storage from 'firebase/storage'
    import router from '@/router'
    import flatPickr from 'vue-flatpickr-component';
    import 'flatpickr/dist/flatpickr.css';
    import PhoneMaskInput from  "vue-phone-mask-input";
    import vSelect from 'vue-select'
    import moment from 'moment'
    import VuePhoneNumberInput from 'vue-phone-number-input';
    import 'vue-phone-number-input/dist/vue-phone-number-input.css';
    export default {

        data() {
            return {
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
                programe_pause_count: '',


                phoneValid: '',
                mobileFormat: '',
                countryCode: 'IN',
                days_pause: 0,
                days_paused: 0,
                program_name: '',
                programeOptedTitle: '',
                program_type_start: '',
                pause_program: false,
                program_end_date: '',
                progame_paused_log: [],
                medication_desc: '',
                selectedHeight: '',
                popupActivo: false,
                popupImage: '',

                password: '',
                weight_in_kg: '',
                weight_kg: false,
                weight_in_lbs: '',
                weight_lbs: false,
                selectedWeight: 'kg',
                selected: "feet",
                feet_inches: '',
                height_feet: false,
                height_inches: false,
                height_centimeter: false,
                configdateTimePicker: {
                    dateFormat: 'm-d-Y'
                },
                program: [],

                package_type: [],
                food_kinds: [],
                food_kind_valid: false,
                date_of_birth: false,
                rowId: 10,
                categories: [],
                form: {
                    regions: []
                },
                options: [],
                previewImages: [],
                package_start_date: '',
                package_end_date: '',
                lead_member_conversion:0,
            }
        },
        computed: {
            program_is_passed(){
                let last_paused = this.progame_paused_log.length > 0 ? this.progame_paused_log.slice().reverse() : []
                let last_paused1 = last_paused.length > 0 ? moment(last_paused[0].datetime).format('YYYY-MM-DD') : ''
                let paused_days = last_paused.length > 0 ? last_paused[0].days : 0
                var now = moment(new Date()); //todays date
                var end = moment(last_paused1); // another date
                var duration = moment.duration(now.diff(end));
                var days = parseInt(duration.asDays());
                if (last_paused.length > 0) {
                    if (last_paused[0].is_resumed_earlier && last_paused[0].is_resumed_earlier === true) {
                        return true;
                    }
                    if (!last_paused[0].is_resumed_earlier && days > paused_days) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    if (this.program_type_start) {
                        return true;
                    } else {
                        return false;
                    }
                }
                return false
            },
            program_is_resume(){
                let last_paused = this.progame_paused_log.length > 0 ? this.progame_paused_log.slice().reverse() : []
                let last_paused1 = last_paused.length > 0 ? moment(last_paused[0].datetime).format('YYYY-MM-DD') : ''
                let paused_days = last_paused.length > 0 ? last_paused[0].days : 0
                var now = moment(new Date()); //todays date
                var end = moment(last_paused1); // another date
                var duration = moment.duration(now.diff(end));
                var days = parseInt(duration.asDays());
                if (last_paused.length > 0) {
                    if (last_paused[0].is_resumed_earlier && last_paused[0].is_resumed_earlier === true) {
                        return false;
                    }
                    if (days < paused_days) {
                        return true;
                    } else {
                        return false;
                    }
                }
                return false
            },
        },
        created(){

            firebase.firestore().collection('lead_member_conversion').where('member_id', '==', this.uid).get().then((querySnapshot) => {
                this.lead_member_conversion=querySnapshot.size
            })

            this.package_type = []
            this.program = []
            this.package_type = []
            this.options = []
            this.program = []
            this.options = []
            this.status = []
            this.program = []
            this.package = []
            firebase.firestore().collection('package').get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const trainer = {
                        id: doc.id,
                        name: doc.data()['title']
                    }
                    this.package_type.push(trainer)
                })
            })


            firebase.firestore().collection('program-opted').get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const trainer = {
                        id: doc.id,
                        name: doc.data()['title']
                    }
                    this.program.push(trainer)
                })
            })
            firebase.firestore().collection('food-kinds').get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const trainer = {
                        id: doc.id,
                        name: doc.data()['title']
                    }
                    this.options.push(trainer)
                })
            })
            if (this.uid) {
                this.getFilesList()
                this.getUserDetail();
            }
//        this.onUpdate()
        },
        methods: {
            onUpdate (payload) {
                this.countryCode = payload.countryCode
                this.mobile = payload.phoneNumber
                this.mobileFormat = payload.formatInternational
                this.phoneValid = payload.isValid
            },
            startProgram: function () {
                firebase.firestore().collection('users').doc(this.uid).get()
                    .then(snap => {
                        snap.ref.update({
                            program_type_start: moment().format('YYYY-MM-DD h:mm:ss a')
                        });
                        this.program_type_start = 'started'
                        this.$vs.notify({
                            title: '',
                            text: 'Your package is successfully started!',
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
            },
            resumeProgram: function () {
                let last_paused = this.progame_paused_log.length > 0 ? this.progame_paused_log.slice().reverse() : []
                let last_paused1 = last_paused.length > 0 ? moment(last_paused[0].datetime).format('YYYY-MM-DD') : ''
                let paused_days = last_paused.length > 0 ? last_paused[0].days : 0
                var now = moment(); //todays date
                var end = moment(last_paused1); // another date
                var duration = moment.duration(now.diff(end));
                var days = this.days_paused - parseInt(duration.asDays());
                var days1 = paused_days - parseInt(duration.asDays());
                if (days > 0) {
                    this.progame_paused_log[this.progame_paused_log.length - 1]['endedEarlier'] = moment().format('YYYY-MM-DD h:mm:ss a')
                    this.progame_paused_log[this.progame_paused_log.length - 1]['endedEarlierDays'] = days1
                    this.progame_paused_log[this.progame_paused_log.length - 1]['is_resumed_earlier'] = true
                    const pause = {
                        days_paused: days,
                        progame_paused_log: this.progame_paused_log
                    }
                    firebase.firestore().collection('users').doc(this.uid).get()
                        .then(snap => {
                            this.popupActivo = false
                            snap.ref.update(pause);
                            if (this.uid) {
                                this.getUserDetail();
                            }
                            this.$vs.notify({
                                title: '',
                                text: 'Your program is successfully resumed!',
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
                }
            },
            pauseProgram: function () {
                if (this.days_pause == 0) {

                    this.$vs.notify({
                        title: 'Error',
                        text: 'Please Select Days First!',
                        iconPack: 'feather',
                        icon: 'icon-alert-circle',
                        color: 'warning'
                    });
                    return false;
                }
                this.progame_paused_log.push({
                    datetime: moment().format('YYYY-MM-DD h:mm:ss a'),
                    days: this.days_pause
                })
                const pause = {
                    days_paused: this.days_paused + this.days_pause,
                    programe_pause_count: this.programe_pause_count + 1,
                    progame_paused_log: this.progame_paused_log
                }

                firebase.firestore().collection('users').doc(this.uid).get()
                    .then(snap => {
                        this.popupActivo = false
                        snap.ref.update(pause);
                        if (this.uid) {
                            this.getUserDetail();
                        }
                        this.$vs.notify({
                            title: '',
                            text: 'Your program is successfully paused!',
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
                        this.fat = isNaN(fat) == true ? '0.00' : (fat).toFixed(2)
                        let activity = this.activity_level
                        this.activity_level = this.activity_level//(input=='activity')?value.target.value:this.activity_level
                        let lmb = this.weight - (this.weight * (fat / 100))
                        this.lmb = isNaN(lmb) == true ? '0.00' : (lmb).toFixed(2)
                        let rmr = 370 + (21.6 * (lmb / 2.2))
                        this.rmr = isNaN(rmr) == true ? '0.00' : (rmr).toFixed(2)
                        let fbm = this.weight * (fat / 100)
                        this.fbm = isNaN(fbm) == true ? '0.00' : (fbm).toFixed(2)
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
                    }
                }
            },

            changeWeight: function changeItem(event) {
                this.selectedWeight = event.target.value;
                if (this.selectedWeight == 'kg') {
                    this.weight_in_lbs = ''
                } else if (this.selectedWeight == 'lbs') {
                    this.weight_in_kg = ''
                }
            },
            async profileSubmit() {
                this.loadContent()
                if (this.picturesTemp.length > 0) {
                    if (this.picturesTemp.length < 3) {
                        for (let i = 0; i < this.picturesTemp.length; i++) {
                            if (i < 3) {
                                let storageRef = await firebase.storage().ref(this.uid + '/member_three_pics/' + this.picturesTemp[i].name);
                                this.uploadTask = storageRef.put(this.picturesTemp[i]);
                            }
                        }
                        this.picturesTemp = {}
                    } else {
                        this.$vs.notify({
                            title: 'Max Files Error',
                            text: 'Please select maximum 3 files',
                            iconPack: 'feather',
                            icon: 'icon-alert-circle',
                            color: 'warning'
                        });
                    }
                } else {
                    this.saveData()
                }
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
            detectFiles(file, side = null) {
                if (file.length == 0) {
                    this.$vs.notify({
                        title: 'Please select file',
                        text: '',
                        iconPack: 'feather',
                        icon: 'icon-alert-circle',
                        color: 'warning'
                    });
                    return false;
                }
                var image = file[0]
                var reader = new FileReader();
                var delImageUrl = ''

                // Define a callback function to run, when FileReader finishes its job
                reader.onload = (e) => {

                    // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
                    // Read image as base64 and set to imageData
                    if (side == 'front') {
                        delImageUrl = this.frontImagePreview
                        this.frontImage = image
                        this.frontImagePreview = e.target.result
                        var storageRef = firebase.storage().ref(this.uid + '/member_three_pics/front/' + this.frontImage.name);
                        storageRef.put(this.frontImage);


                    }
                    if (side == 'side') {
                        delImageUrl = this.sideImagePreview
                        this.sideImage = image
                        this.sideImagePreview = e.target.result
                        var storageRef1 = firebase.storage().ref(this.uid + '/member_three_pics/side/' + this.sideImage.name);
                        storageRef1.put(this.sideImage);
                    }
                    if (side == 'back') {
                        delImageUrl = this.backImagePreview
                        this.backImage = image
                        this.backImagePreview = e.target.result
                        var storageRef2 = firebase.storage().ref(this.uid + '/member_three_pics/back/' + this.backImage.name);
                        storageRef2.put(this.backImage);
                    }

                    if (delImageUrl) {
                        firebase.storage()
                            .refFromURL(delImageUrl)
                            .delete()
                            .then(() => {
                                this.$vs.notify({
                                    title: 'Image Successfully Uploaded!',
                                    text: '',
                                    iconPack: 'feather',
                                    icon: 'icon-alert-circle',
                                    color: 'success'
                                });
                            })
                            .catch((error) => {
                                this.$vs.notify({
                                    title: 'Something went wrong. While, uploading image!',
                                    text: '',
                                    iconPack: 'feather',
                                    icon: 'icon-alert-circle',
                                    color: 'danger'
                                });
                                console.error(`file delete error occured: ${error}`)
                            })
                    }
                }

                // Start the reader job - read file as a data url (base64 format)
                reader.readAsDataURL(image);

            },
            saveData () {
                this.$validator.validateAll().then(result => {

                    if (this.selectedWeight == 'kg' && this.weight_in_kg == '') {
                        this.weight_kg = true
                    }
                    if (this.selectedWeight == 'lbs' && this.weight_lbs == '') {
                        this.weight_lbs = true
                    }
                    if ((this.selected == 'feet_inches' || this.selected == 'feet') && this.height_in_feet == '') {
                        this.height_feet = true
                    }
                    if (this.selected == 'centimeter') {
                        this.height_centimeter = true
                    }
                    if (this.selected == 'inches' || this.selected == 'feet_inches') {
                        this.height_inches = true
                    }
                    if (this.dateofbirth == '') {
                        this.date_of_birth = true
                    }

                    if (result && this.dateofbirth != '') {
                        const memberPayLoad = {
                            first_name: this.first_name ? this.first_name : '',
                            last_name: this.last_name ? this.last_name : '',
                            email: this.email ? this.email : '',
                            mobile: this.mobile ? this.mobile : '',
                            country_code: this.countryCode ? this.countryCode : '',
                            mobileFormat: this.mobileFormat ? this.mobileFormat : '',
                            gender: this.gender ? this.gender : '',
                            location: this.location ? this.location : '',
                            address: this.address ? this.address : '',
                            memberDetail: {
                                dateofbirth: this.dateofbirth ? this.customFormatter(this.dateofbirth) : '',
                                height_in_feet: this.height_in_feet ? this.height_in_feet : '',
                                height_in_inches: this.height_in_inches ? this.height_in_inches : '',
                                height_in_centimeter: this.height_in_centimeter ? this.height_in_centimeter : '',
                                weight_in_lbs: this.weight_in_lbs ? this.weight_in_lbs : '',
                                weight_in_kg: this.weight_in_kg ? this.weight_in_kg : '',
                                bg_protein: this.bg_protein ? this.bg_protein : '',
                                activity_level: this.activity_level ? this.activity_level : '',
                                program_opted: this.program_opted ? this.program_opted : '',
                                program_type: this.program_type ? this.program_type : '',
                                tenure: this.tenure ? this.tenure : '',
                                health_issue: this.health_issue ? this.health_issue : '',
                                health_issue_desc: this.health_issue_desc ? this.health_issue_desc : '',
                                medication_desc: this.medication_desc ? this.medication_desc : '',
                                food_kinds: this.form.regions ? this.form.regions : '',
                                food_alergy: this.food_alergy ? this.food_alergy : '',
                                food_alergy_desc: this.food_alergy_desc ? this.food_alergy_desc : '',
                                medication: this.medication ? this.medication : '',
                                pictures_terms_check: this.pictures_terms_check ? this.pictures_terms_check : '',
                                special_request: this.special_request ? this.special_request : '',
                                message: this.message ? this.message : ''
                            }
                        }
                        firebase.firestore().collection('users').doc(this.uid).get()
                            .then(snap => {
                                snap.ref.update(memberPayLoad);
                            })
                            .then(() => {
                                this.$vs.notify({
                                    title: 'Successfully update the profile',
                                    text: 'Success!',
                                    iconPack: 'feather',
                                    icon: 'icon-check',
                                    color: 'success'
                                });
                                console.log('Successfully updated the record')
                            })
                            .catch(error => {
                                this.$vs.notify({
                                    title: 'Something went wrong',
                                    text: 'while update lead!',
                                    iconPack: 'feather',
                                    icon: 'icon-check',
                                    color: 'danger'
                                });
                                console.error('There was an error editing the record: ' + error)
                            })
                    } else {
                        // form have errors
                    }
                })
            },
            getUserDetail() {

                firebase.firestore().collection('users')
                    .doc(this.uid)
                    .get()
                    .then(snap => {
                        let data = snap.data();
                        let memberObj = data['memberDetail'];
                        let current_package = memberObj && memberObj['program_type'] ? memberObj['program_type'] : false
                        let days_paused = data['days_paused'] ? data['days_paused'] : 0
                        if (current_package) {
                            if (data['program_type_start'] && data['program_type_start'] != '') {
                                this.package_start_date = moment(data['program_type_start']).format('DD-MM-YYYY')
                                var starting_date = data['program_type_start']
                                if (current_package) {
                                    firebase.firestore().collection('package')
                                        .doc(current_package)
                                        .get()
                                        .then(snap => {
                                                let data = snap.data();
                                                var numberOfDaysToAdd = parseInt(data['tenure']) + parseInt(days_paused);
                                                this.package_end_date = moment(starting_date).add(numberOfDaysToAdd, 'days').format('DD-MM-YYYY')
                                            }
                                        )
                                } else {
                                    this.package_start_date = 'Not Started Yet'
                                    this.package_end_date = '-- -- --'
                                }
                            } else {
                                this.package_start_date = 'Not Started Yet'
                                this.package_end_date = '-- -- --'
                            }
                        } else {
                            this.package_start_date = 'Not Started Yet'
                            this.package_end_date = '-- -- --'
                        }

                        this.program_type_start = data['program_type_start']
                        this.days_paused = data['days_paused'] ? data['days_paused'] : 0;
                        this.programe_pause_count = data['programe_pause_count'] ? data['programe_pause_count'] : 0;
                        this.progame_paused_log = data['progame_paused_log'] ? data['progame_paused_log'] : [];

                        this.instagram = data['instagram'] ? 'https://www.instagram.com/' + data['instagram'] : '';
                        this.twitter = data['twitter'] ? 'https://twitter.com/' + data['twitter'] : '';
                        this.facebook = data['facebook'] ? 'https://www.facebook.com/' + data['facebook'] : '';
                        this.name = data['first_name'] + ' ' + data['last_name'];
                        this.email = data['email'];
                        this.mobile = (typeof (data['mobileFormat']) !== 'undefined' ? (data['mobileFormat'] != '') ? (data['mobileFormat']) : 'Not Added Yet': 'Not Added Yet')
                        this.gender =(typeof (data['gender']) !== 'undefined' ? (data['gender'] != '') ? (data['gender']) : 'Not Added Yet': 'Not Added Yet');
                        this.location = (typeof (data['location']) !== 'undefined' ? (data['location'] != '') ? (data['location']) : 'Not Added Yet': 'Not Added Yet');

                        this.address = (typeof (data['address']) !== 'undefined' ? (data['address'] != '') ? (data['address']) : 'Not Added Yet': 'Not Added Yet');

                        this.status = data['status'] && data['status'] == true ? 'Active' : 'Block';

                        let selected_mealplan = this.mealplan[this.mealplan_index]
                        this.sections = data['mealplan'] && data['mealplan'].length > 0 && data['mealplan'][this.mealplan_index]['mealplan_' + this.mealplan_no].length ? data['mealplan'][this.mealplan_index]['mealplan_' + this.mealplan_no] : selected_mealplan['mealplan_' + this.mealplan_no];
                        this.mealplan = data['mealplan'] ? data['mealplan'].length > 0 ? data['mealplan'] : this.mealplan : this.mealplan;
                        this.calculateTotal();
                        this.profileUrl =
                            typeof (memberObj['profileUrl']) !== 'undefined' ? memberObj['profileUrl'] + '' : ''
                            typeof (memberObj['profileUrl']) !== 'undefined' && data['profileUrl'] ? data['profileUrl'] : '';

                        // Member Detail Data
                        this.dateofbirth = typeof (memberObj['dateofbirth']) !== 'undefined' ? memberObj['dateofbirth']: 'Not Added Yet';
                        this.height_in_centimeter = typeof (memberObj['height_in_centimeter']) !== 'undefined' ? memberObj['height_in_centimeter'] + ' Centimeter' : 'Not Added Yet'
                        this.height_in_inches = typeof (memberObj['height_in_inches']) !== 'undefined' ? memberObj['height_in_inches']+ ' Inches': 'Not Added Yet'
                        if (memberObj['weight_in_kg'] != '') {
                            this.weight_with_type = typeof (memberObj['weight_in_kg']) !== 'undefined' ? memberObj['weight_in_kg'] + ' KG' : 'Not Added Yet'
                        } else {
                            this.weight_with_type = typeof (memberObj['weight_in_kg']) !== 'undefined' ? memberObj['weight_in_lbs'] + ' LBS' : 'Not Added Yet'
                        }
                        this.weight =//weight kg convert into lBS

                        this.height =  (typeof (memberObj['height_in_centimeter']) !== 'undefined' ? (memberObj['height_in_centimeter'] != '') ? (memberObj['height_in_centimeter']) : memberObj['height_in_inches'] : '');
                        this.weight = (typeof (memberObj['weight_in_kg']) !== 'undefined' ? (memberObj['weight_in_kg'] != '') ? (memberObj['weight_in_kg']) : memberObj['weight_in_lbs'] : '');//weight kg convert into lBS
                        this.activity_level = memberObj['activity_level'];
                        this.bg_protein = memberObj['bg_protein'];
                        if(typeof (memberObj['weight_in_kg']) !== 'undefined' ) {

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
                                } else if (data['gender'] == 'female') {
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
                        }
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
                        console.error('There was an error editing the record: ' + error)
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
            deleteImage (url) {
                console.log(url)
                this.loadContent()
                firebase.storage()
                    .refFromURL(url)
                    .delete()
                    .then(() => {
                        this.pictures.splice(this.pictures.indexOf(url), 1)
                        console.error('file deleted')
                    })
                    .catch((error) => {
                        console.error(`file delete error occured: ${error}`)
                    })
            }
        },
        mounted() {
            this.wasSidebarOpen = this.$store.state.reduceButton;
            this.$store.commit('TOGGLE_REDUCE_BUTTON', true)
        },
        beforeDestroy() {
            if (!this.wasSidebarOpen) this.$store.commit('TOGGLE_REDUCE_BUTTON', false)
        },
        components: {
            flatPickr,
            'v-select': vSelect,
            VuePhoneNumberInput,
        },
        watch: {
            uploadTask: function () {
                this.uploadTask.on('state_changed', () => {
                    },
                    null,
                    () => {
                        this.pictures = this.getFilesList()
                    })
            },
            frontImagePreview: function () {
                if (this.frontImagePreview) {
                    this.frontImagePreview = this.frontImagePreview
                }
            },
            sideImagePreview: function () {
                if (this.sideImagePreview) {
                    this.sideImagePreview = this.sideImagePreview
                }
            },
            backImagePreview: function () {
                if (this.backImagePreview) {
                    this.backImagePreview = this.backImagePreview
                }
            }
        }
    }
</script>
<style>
    ::placeholder {
        color: rgba(0, 0, 0, 0.2);
    }

    .personalize-section, .image-section, .miscellaneous-section, .activity-axercise-section, .programs-packages-section, .food-health-section {
        padding-bottom: 20px;
    }

    .personalize-section h4, .activity-axercise-section h4, .image-section h4, .programs-packages-section h4, .food-health-section h4, .miscellaneous-section h4 {
        margin-bottom: 20px;
        text-decoration: underline;
        text-transform: capitalize;
    }

    .personalize-section ul {
        display: inline-flex;
        width: 100%;
    }

    .personalize-section ul li {
        width: 33% !important;
    }

    #form input[type="file"] {
        margin: 20px 0 0;
    }

    #form h5 {
        text-transform: capitalize;
    }

    .cstm-icon {
        font-weight: 700;
        position: absolute !important;
        top: 50%;
        z-index: 1;
        right: 0;
    }

    .avatars {
        height: 250px;
    }

    .avatars img {
        width: 100%;
        height: 100%;
    }

    fieldset {
        padding: 20px;
        border-radius: 8px;
        margin: 6px 6px 20px;
        border: 1px solid rgb(115, 103, 240);
        box-shadow: 2px 5px 10px -3px rgba(115, 103, 240, .7);
    }

    legend {
        font-size: 20px;
        color: #000;
        padding: 0 10px;
        border: 0;
    }

    .legend {
        font-size: 20px;
        color: #000;
        padding: 0 10px;
        border: 0;
        text-decoration: underline;
    }

    .dp-icon {
        position: absolute !important;
        padding-top: 10px;
        right: 6%;
    }

    .register-form .vs-radio--borde {

        border: 2px solid rgb(115, 103, 240) !important;
    }

    .register-form .vs-checkbox-primary .vs-checkbox {
        border: 2px solid rgb(115, 103, 240) !important;
    }

    .vs-input--input.normal {
        border-color: rgb(115, 103, 240, .4)
    }

    #form .days {
        width: 100% !important;
    }

    #form ul li {
        width: 100%;
        margin-right: 0 !important;
        margin-top: 5px !important;
    }

    .con-vs-checkbox {
        width: 100%;
        float: left;
        margin: 7px 0;
    }

    .con-slot-label, .vs-radio--label {
        text-transform: capitalize;
    }

    .con-vs-checkbox.add {
        width: 100%;
    }

    .vx-card {
        width: 100%;
        background: rgba(255, 255, 255, 1);
    }

    .dof .flatpickr-input {
        width: 100%;
    }

    .vx-card__title {
        width: 100%;
    }

    .top-holder {
        width: 60%;
        margin: 0 auto;
        text-align: center;
        position: relative;
    }

    .vdp-datepicker__calendar .cell {
        border-radius: 50% !important;
    }

    .height-ft {
        float: left;
        width: 82%;
    }

    .height-ft .normal {
        width: 100%;
    }

    .vs__clear {
        display: none;
    }

    .vs__dropdown-menu li {
        width: 100% !important;
    }

    .select_1 {
        float: left;
        width: 114px;
    }

    .select_1 .vs__dropdown-toggle {
        border: 0;
    }

    .select_1 .vs__dropdown-toggle .vs__search {
        width: 28px;
        padding: 0;
    }

    .select_1 .vs__dropdown-toggle .vs__search {
        display: none;
    }

    select {
        height: 38px;
        margin: 0 0 0 6px;
        border-radius: 3px;
        border: 1px solid rgba(0, 0, 0, .2);
    }

    .vs__dropdown-toggle

    @media only screen and ( max-width: 992px) {
        #form {
            width: 100% !important;
            margin: 0 auto 20px;
        }
    }

    @media only screen and ( max-width: 991px) {
        #form {
            width: 95%;
        }

        #form .gende li {
            width: 50%;
        }

        #form ul li {
            width: 33%;
        }

        #form .days li {
            width: 16%;
        }

        .food .con-vs-checkbox {
            width: 48%;
        }

        .top-holder {
            width: 96%;
        }

        .height-ft {
            width: 60%;
        }
    }

    @media only screen and ( max-width: 767px) {
        #form span {
            font-size: 14px;
        }

        .cstm-icon {
            top: 45%;
        }

        .vs-input--input.normal {
            margin: 0 0 10px;
        }

        #form .days li {
            width: 28%;
        }

        .top-holder {
            width: 93%;
        }

        .height-ft {
            width: 100%;
        }
    }

    @media screen and (max-width: 767px) and (min-width: 580px) {
        .dp-icon {
            right: 13%;
        }
    }

    @media only screen and ( max-width: 579px) {
        .vx-row > .vx-col {
            width: 100% !important;
        }

        #form ul li {
            width: 48%;
        }

        .dp-icon {
            right: 13%;
        }

        .food .con-vs-checkbox {
            width: 100%;
        }

        .vs-input--input.normal {
            margin: 0 0 10px;
        }

        .top-holder {
            text-align: left;
        }

        .top-holder img {
            width: 166px !important;
        }
    }

    @media only screen and ( max-width: 410px) {
        #form .days li {
            width: 48%;
        }
    }

    span.image-del {
        position: absolute;
        right: 10px;
        top: 0;
        padding: 3px;
        padding: 0 2px;
        border: 1px solid;
        background-color: #fff;
        cursor: pointer;
    }

    #male-table .vs-con-input-label, #female-table .vs-con-input-label {
        width: 80px !important;
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
</style>
