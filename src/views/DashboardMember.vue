<!-- =========================================================================================
  File Name: DashboardAnalytics.vue
  Description: Dashboard Analytics
  ----------------------------------------------------------------------------------------
  Item Name: Vuesax Admin - VueJS Dashboard Admin Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div id="dashboard-analytics">
    <div class="vx-row">

      <!-- CARD 1: CONGRATS -->
      <div class="vx-col w-full mb-base">
        <vx-card slot="no-body" class="text-center bg-primary-gradient greet-user">
          <img src="../assets/images/elements/decore-left.png" class="decore-left" alt="Decore Left" width="175">
          <img src="../assets/images/elements/decore-right.png" class="decore-right" alt="Decore Right" width="175">
          <h1 class="mb-6 text-white"> Welcome {{ user_displayName }},</h1>
        </vx-card>
      </div>
      <div class="vx-col w-full mb-base">
        <div class="member-dashboard" id="page-user-view">
          <div class="vx-row mb-4">
            <div class="vx-col lg:w-1/4 w-full">

              <vx-card id="img-card" title="" class="mb-2" style="padding:0 !important">
                <div class="vx-col">
                  <div class="img-container mb-4">
                    <img v-show="profileUrl!=''" :src="profileUrl"
                         class="rounded w-full" style="width:100%;margin:auto;max-height:300px;min-height:270px">
                    <!--<img v-show="profileUrl==''" src="../assets/images/portrait/small/default-profile.png"  class="rounded w-full"-->
                    <img v-if="gender=='male'" v-show="profileUrl==''" src="../assets/images/portrait/small/default-profile.png" class="rounded w-full" style="width:100%;margin:auto;max-height:300px;min-height:270px"/>
                    <img v-if="gender=='other'" v-show="profileUrl==''" src="../assets/images/portrait/small/default-profile.png" class="rounded w-full" style="width:100%;margin:auto;max-height:300px;min-height:270px"/>
                    <img v-if="gender=='female'" v-show="profileUrl==''" src="../assets/images/portrait/small/female_avatar_vector.png" class="rounded w-full" style="width:100%;margin:auto;max-height:300px;min-height:270px"/>
                  </div>
                </div>
              </vx-card>
            </div>
            <div class="vx-col lg:w-3/4">

                <div class="vx-row mb-4">
                  <div class="vx-col lg:w-1/2 md:w-1/2 sm:w-1/1 w-full mb-4">
                    <vx-card title="Personal Info">
                      <div class="vx-row mb-4">
                        <div class="vx-col lg:w-1/4 md:w-1/4 sm:w-1/1">
                          <h6> Age:</h6>
                        </div>
                        <div class="vx-col lg:w-3/4 md:w-3/4 sm:w-1/1">
                          {{age}}
                        </div>
                      </div>
                    <div class="vx-row mb-4">
                      <div class="vx-col lg:w-1/4 md:w-1/4 sm:w-1/1">
                        <h6 class="mb-2"> Gender:</h6>
                      </div>
                      <div class="vx-col lg:w-3/4 md:w-3/4 sm:w-1/1">
                        <ul class="demo-alignment gender" title="Edit the gender please got to your profile page">
                          <li>
                            <vs-radio title="Edit the gender please got to your profile page" v-model="gender"
                                      :disabled="false" vs-value="male"> Male
                            </vs-radio>
                          </li>
                          <li>
                            <vs-radio title="Edit the gender please got to your profile page" v-model="gender"
                                      :disabled="false" vs-value="female"> Female
                            </vs-radio>
                          </li>
                          <li>
                            <vs-radio title="Edit the gender please got to your profile page" v-model="gender"
                                      :disabled="false" vs-value="other"> Others
                            </vs-radio>
                          </li>
                        </ul>

                      </div>
                    </div>
                    <div class="vx-row mb-4">
                      <div class="vx-col lg:w-1/4 md:w-1/4 sm:w-1/1">
                        <h6> Weight: </h6>
                      </div>
                      <div class="vx-col lg:w-3/4 md:w-3/4 sm:w-1/1">
                        <div class="vx-row">
                          <div class="vx-col md:w-1/2 height-2 weight_22">
                            <vs-input type="number" v-on:change="changeItem('weight',$event)"
                                      v-model="weight"
                                      size="small"
                                      name="weight" style="width: 50%;"/>
                            <span class="text-danger text-sm"
                                  v-show="errors.has('weight')">{{ errors.first('weight') }}</span>
                          </div>
                          <div class="vx-col lg:w-1/2 sm:w-1/2 pl-0">
                            <ul class="demo-alignment gender"
                                title="Edit the gender please got to your profile page">
                              <!--                      <li>disabled="disable" -->
                              <li>
                                <!--                        v-show="gender == 'female'" :src="gender == 'female' ? '../assets/images/pages/bg-male.png': '../../../assets/images/pages/bg-avatar.png'"-->
                                <!--                        <vs-radio  v-model="gender" :disabled="true" vs-value="male">-->
                                <!--                          <vs-radio  v-model="gender" :disabled="true" vs-value="male"><img src="../assets/images/pages/bg-male.png" alt="image" class="mx-auto" style="width: 20px; height: 24px;"></vs-radio> </li>-->
                                <vs-radio v-on:change="changeWeight('kg')" v-model="selectedWeight" vs-value="kg">
                                  Kg
                                </vs-radio>
                              </li>
                              <li>
                                <vs-radio v-on:change="changeWeight('lbs')" v-model="selectedWeight"
                                          vs-value="lbs">Lbs
                                </vs-radio>
                                <!--                        v-if="gender=='female'"-->
                                <!--                        <img src="@/assets/images/pages/bg-female.png" alt="image" class="mx-auto" style="width: 20px; height: 24px;">-->
                              </li>

                            </ul>
                            <!--<select v-on:change="changeWeight($event)" style=" height: 38px;width: 100%; padding: 5px 10px;margin-top: 20px; border-radius: 3px; border: 1px solid rgba(0,0,0,.2)">-->
                            <!--<option></option>-->
                            <!--<option value="kg">Kg</option>-->
                            <!--<option value="lbs">Lbs</option>-->
                            <!--</select>-->
                          </div>
                        </div>
                        <span class="text-danger text-sm"
                              v-show="errors.has('weight')">{{ errors.first('weight') }}</span>
                      </div>
                    </div>
                    <div class="vx-row mb-4">
                      <div class="vx-col lg:w-1/4 md:w-1/4 sm:w-1/1">
                        <h6>Height:</h6>
                      </div>
                      <div class="vx-col lg:w-3/4 md:w-3/4 sm:w-1/1">
                        <div class="vx-row">
                          <!--                                <div class="vx-col md:w-1/2 w-full ">-->
                          <!--                                  <div class="vx-row">-->
                          <div class="vx-col md:w-1/2  height-2 weight_22">
                            <!--                                      <div class="vx-col w-full">-->
                            <vs-input type="number" v-on:change="changeItem($event)"
                                      v-model="height"
                                      size="small"
                                      name="height"
                                      placeholder="" style="width: 50%;" />
                            <!--                                      </div>-->
                          </div>
                          <!--                                  </div>-->
                          <!--                                </div>-->
                          <div class="vx-col md:w-1/2 p-0">
                            <ul class="demo-alignment gender">
                              <li>
                                <vs-radio v-on:change="heightType($event)" v-model="selected" vs-value="inches">
                                  In
                                </vs-radio>
                              </li>
                              <li>
                                <vs-radio v-on:change="heightType($event)" v-model="selected"
                                          vs-value="centimeter">Cm
                                </vs-radio>
                              </li>

                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                      <div class="vx-row mb-4">
                        <div class="vx-col">
                        <vs-button size="small" class="mr-3 mb-2" id="button-save" @click="profileSave">Save</vs-button>
                        </div>
                      </div>
                    </vx-card>
                  </div>
                  <div class="vx-col lg:w-1/2 md:w-1/2 sm:w-1/1 w-full">
                    <vx-card title="Package Info" class="pb-6">
                      <div class="vx-row mb-4">
                        <div class="vx-col lg:w-1/3 md:w-1/3 sm:w-1/1 ">
                          <h6>Package:</h6>
                        </div>
                        <div class="vx-col lg:w-1/2 md:w-1/2 sm:w-1/1">
                          {{program_name}}
                        </div>
                      </div>
                    <div class="vx-row mb-4">
                      <div class="vx-col lg:w-1/3 md:w-1/3 sm:w-1/1 ">
                        <h6>Program:</h6>
                      </div>
                      <div class="vx-col lg:w-1/2 md:w-1/2 sm:w-1/1">
                        {{programeOptedTitle}}
                      </div>
                    </div>
                    <div class="vx-row mb-4">
                      <div class="vx-col lg:w-1/3 md:w-1/3 ">
                        <h6>Status:</h6>
                      </div>
                      <div class="vx-col lg:w-1/2 md:w-1/2">
                         <span v-if="progame_paused_log.length > 0 && program_is_resume" class="text-warning" >
                        Active
                           <!--                        <vs-button color="warning" radius type="gradient" icon-pack="feather" icon="icon-pause" style="display: inline-flex;" ></vs-button>-->
                      </span>

                        <span v-if="!program_type_start"  class="text-primary" >
                        Not started
                          <!--                        <vs-button color="success"  radius type="gradient" icon-pack="feather" icon="icon-play" style="display: inline-flex;" @click="startProgram"></vs-button>-->
                              </span>

                        <span v-if="program_type_start != '' && programe_pause_count <= 3 && days_paused < 10 && program_is_passed" @click="popupActivo=true" class="text-primary">
                        Pause
                          <!--                        <vs-button color="success" radius type="gradient" icon-pack="feather" icon="icon-play" style="display: inline-flex;"></vs-button> -->
                              </span>

                      </div>
                    </div>

                    <div class="vx-row mb-4">
                      <div class="vx-col lg:w-1/3 md:w-1/3 sm:w-1/1">
                        <h6>Start Date:</h6>
                      </div>
                      <div class="vx-col lg:w-1/2 md:w-1/2 sm:w-1/1">
                        {{program_type_start}}
                      </div>
                    </div>
                    <div class="vx-row mb-4">
                      <div class="vx-col lg:w-1/3 md:w-1/3 sm:w-1/1">
                        <h6>End Date:</h6>
                      </div>
                      <div class="vx-col lg:w-1/2 md:w-1/2 sm:w-1/1">
                        {{program_end_date}}
                      </div>
                    </div>

                    </vx-card>

                  </div>
                </div>


            </div>
          </div>
          <!--code commented by zeeshan-->
          <!--<div class="vx-row">-->
            <!--<div id="user-data" class="vx-col lg:w-1/1 md:w-1/1 w-full">-->

              <!--<div class="vx-col lg:w-1/1 md:w-1/1 w-full mb-base">-->
                <!--<div class="vx-card mb-base">-->
                  <!--<div class="vx-card__header">-->
                    <!--<div class="vx-card__title">-->
                      <!--<h4 class="">Account</h4>-->
                      <!--&lt;!&ndash;&ndash;&gt;</div>-->
                    <!--&lt;!&ndash;&ndash;&gt;</div>-->
                  <!--<div class="vx-card__collapsible-content vs-con-loading__container">-->
                    <!--<div class="vx-card__body">-->
                      <!--<div class="vx-row">-->
                        <!--<div id="avatar-col" class="vx-col">-->
                          <!--<div class="img-container mb-4">-->
                            <!--<img v-show="profileUrl!=''" :src="profileUrl"  class="rounded w-full">-->
                            <!--<img v-show="profileUrl==''" src="../assets/images/portrait/small/default-profile.png"  class="rounded w-full">-->
                          <!--</div>-->
                        <!--</div>-->

                        <!--<div id="account-info-col-1" class="vx-col p-1">-->
                          <!--<table>-->
                            <!--<tr>-->
                              <!--<td class="font-semibold">Gender</td>-->
                              <!--<td>-->
                                <!--<ul class="demo-alignment gender" title="Edit the gender please got to your profile page">-->
                                  <!--<li>-->
                                    <!--<vs-radio title="Edit the gender please got to your profile page" v-model="gender"-->
                                              <!--:disabled="true" vs-value="male">Male-->
                                    <!--</vs-radio>-->
                                  <!--</li>-->
                                  <!--<li>-->
                                    <!--<vs-radio title="Edit the gender please got to your profile page" v-model="gender"-->
                                              <!--:disabled="true" vs-value="female">Female-->
                                    <!--</vs-radio>-->
                                  <!--</li>-->
                                  <!--<li>-->
                                    <!--<vs-radio title="Edit the gender please got to your profile page" v-model="gender"-->
                                              <!--:disabled="true" vs-value="other">Others-->
                                    <!--</vs-radio>-->
                                  <!--</li>-->
                                <!--</ul>-->
                              <!--</td>-->
                            <!--</tr>-->
                            <!--<tr>-->
                              <!--<td class="font-semibold">Age</td>-->
                              <!--<td>{{age}}</td>-->
                            <!--</tr>-->
                            <!--<tr>-->
                              <!--<td class="font-semibold">Package</td>-->
                              <!--<td>{{program_name}}</td>-->
                            <!--</tr>-->
                            <!--<tr>-->
                              <!--<td class="font-semibold">Status</td>-->
                              <!--<td>-->
                                 <!--<span v-if="progame_paused_log.length > 0 && program_is_resume" class="text-warning" >-->
                        <!--Active-->
                                   <!--&lt;!&ndash;                        <vs-button color="warning" radius type="gradient" icon-pack="feather" icon="icon-pause" style="display: inline-flex;" ></vs-button>&ndash;&gt;-->
                      <!--</span>-->

                                <!--<span v-if="!program_type_start"  class="text-primary" >-->
                        <!--Not started-->
                                  <!--&lt;!&ndash;                        <vs-button color="success"  radius type="gradient" icon-pack="feather" icon="icon-play" style="display: inline-flex;" @click="startProgram"></vs-button>&ndash;&gt;-->
                              <!--</span>-->

                                <!--<span v-if="program_type_start != '' && programe_pause_count <= 3 && days_paused < 10 && program_is_passed" @click="popupActivo=true" class="text-primary">-->
                        <!--Pause-->
                                  <!--&lt;!&ndash;                        <vs-button color="success" radius type="gradient" icon-pack="feather" icon="icon-play" style="display: inline-flex;"></vs-button> &ndash;&gt;-->
                              <!--</span>-->

                              <!--</td>-->

                            <!--</tr>-->
                            <!--<tr>-->
                              <!--<td class="font-semibold">Start Date </td>-->
                              <!--<td>-->
                                <!--{{program_type_start}}-->
                              <!--</td>-->

                            <!--</tr>-->
                            <!--<tr>-->
                              <!--<td class="font-semibold">End Date</td>-->
                              <!--<td>-->
                                <!--{{program_end_date}}-->
                              <!--</td>-->

                            <!--</tr>-->
                          <!--</table>-->
                        <!--</div>-->
                        <!--<div id="account-info-col-2" class="vx-col p-1">-->
                          <!--<table>-->
                            <!--<tr>-->
                              <!--<td class="font-semibold">Weight</td>-->
                              <!--<td>-->
                                <!--<div class="vx-row">-->
                                  <!--<div class="vx-col md:w-1/2 height-2 weight_22">-->
                                    <!--<vs-input type="number" v-on:change="changeItem('weight',$event)"-->
                                              <!--v-model="weight"-->
                                              <!--class="w-full"-->
                                              <!--size="small"-->
                                              <!--name="weight"/>-->
                                    <!--<span class="text-danger text-sm"-->
                                          <!--v-show="errors.has('weight')">{{ errors.first('weight') }}</span>-->
                                  <!--</div>-->
                                  <!--<div class="vx-col lg:w-1/2 sm:w-1/2 pl-0">-->
                                    <!--<ul class="demo-alignment gender"-->
                                        <!--title="Edit the gender please got to your profile page">-->
                                      <!--&lt;!&ndash;                      <li>disabled="disable" &ndash;&gt;-->
                                      <!--<li>-->
                                        <!--&lt;!&ndash;                        v-show="gender == 'female'" :src="gender == 'female' ? '../assets/images/pages/bg-male.png': '../../../assets/images/pages/bg-avatar.png'"&ndash;&gt;-->
                                        <!--&lt;!&ndash;                        <vs-radio  v-model="gender" :disabled="true" vs-value="male">&ndash;&gt;-->
                                        <!--&lt;!&ndash;                          <vs-radio  v-model="gender" :disabled="true" vs-value="male"><img src="../assets/images/pages/bg-male.png" alt="image" class="mx-auto" style="width: 20px; height: 24px;"></vs-radio> </li>&ndash;&gt;-->
                                        <!--<vs-radio v-on:change="changeWeight('kg')" v-model="selectedWeight" vs-value="kg">-->
                                          <!--Kg-->
                                        <!--</vs-radio>-->
                                      <!--</li>-->
                                      <!--<li>-->
                                        <!--<vs-radio v-on:change="changeWeight('lbs')" v-model="selectedWeight"-->
                                                  <!--vs-value="lbs">Lbs-->
                                        <!--</vs-radio>-->
                                        <!--&lt;!&ndash;                        v-if="gender=='female'"&ndash;&gt;-->
                                        <!--&lt;!&ndash;                        <img src="@/assets/images/pages/bg-female.png" alt="image" class="mx-auto" style="width: 20px; height: 24px;">&ndash;&gt;-->
                                      <!--</li>-->

                                    <!--</ul>-->
                                    <!--&lt;!&ndash;<select v-on:change="changeWeight($event)" style=" height: 38px;width: 100%; padding: 5px 10px;margin-top: 20px; border-radius: 3px; border: 1px solid rgba(0,0,0,.2)">&ndash;&gt;-->
                                    <!--&lt;!&ndash;<option></option>&ndash;&gt;-->
                                    <!--&lt;!&ndash;<option value="kg">Kg</option>&ndash;&gt;-->
                                    <!--&lt;!&ndash;<option value="lbs">Lbs</option>&ndash;&gt;-->
                                    <!--&lt;!&ndash;</select>&ndash;&gt;-->
                                  <!--</div>-->
                                <!--</div>-->
                                <!--<span class="text-danger text-sm"-->
                                      <!--v-show="errors.has('weight')">{{ errors.first('weight') }}</span></td>-->
                            <!--</tr>-->
                            <!--<tr>-->
                              <!--<td class="font-semibold">Height</td>-->
                              <!--<td>-->
                                <!--<div class="vx-row">-->
                                  <!--&lt;!&ndash;                                <div class="vx-col md:w-1/2 w-full ">&ndash;&gt;-->
                                  <!--&lt;!&ndash;                                  <div class="vx-row">&ndash;&gt;-->
                                  <!--<div class="vx-col md:w-1/2  height-2 weight_22">-->
                                    <!--&lt;!&ndash;                                      <div class="vx-col w-full">&ndash;&gt;-->
                                    <!--<vs-input type="number" v-on:change="changeItem($event)"-->
                                              <!--v-model="height"-->
                                              <!--class="w-full"-->
                                              <!--size="small"-->
                                              <!--name="height"-->
                                              <!--placeholder="Centimeter" style="width: 100%;"/>-->
                                    <!--&lt;!&ndash;                                      </div>&ndash;&gt;-->
                                  <!--</div>-->
                                  <!--&lt;!&ndash;                                  </div>&ndash;&gt;-->
                                  <!--&lt;!&ndash;                                </div>&ndash;&gt;-->
                                  <!--<div class="vx-col md:w-1/2 pl-0">-->
                                    <!--<ul class="demo-alignment gender">-->
                                      <!--<li>-->
                                        <!--<vs-radio v-on:change="heightType($event)" v-model="selected" vs-value="inches">-->
                                          <!--Inch-->
                                        <!--</vs-radio>-->
                                      <!--</li>-->
                                      <!--<li>-->
                                        <!--<vs-radio v-on:change="heightType($event)" v-model="selected"-->
                                                  <!--vs-value="centimeter">Cm-->
                                        <!--</vs-radio>-->
                                      <!--</li>-->

                                    <!--</ul>-->
                                  <!--</div>-->
                                <!--</div>-->
                              <!--</td>-->

                            <!--</tr>-->
                            <!--<tr>-->
                              <!--<td class="font-semibold">Program</td>-->
                              <!--<td>-->
                                <!--{{programeOptedTitle}}-->
                              <!--</td>-->

                            <!--</tr>-->



                            <!--<div class="vx-row">-->
                              <!--&lt;!&ndash;                            <div class="vx-col sm:w-2/3 w-full ml-auto">&ndash;&gt;-->
                              <!--<vs-button class="mr-3 mb-2" id="button-save" @click="profileSave">Save</vs-button>-->
                              <!--&lt;!&ndash;                            </div>&ndash;&gt;-->
                            <!--</div>-->

                          <!--</table>-->
                        <!--</div>-->
                      <!--</div>-->
                    <!--</div>-->
                  <!--</div>-->
                <!--</div>-->

              <!--</div>-->
            <!--</div>-->
          <!--</div>-->

          <div class="vx-row">
            <div class="vx-col lg:w-1/2 md:w-1/1 w-full mb-base">
              <div class="vx-col vx-card">
                <div class="vx-card__collapsible-content vs-con-loading__container">
                  <div class="vx-card__body">
                    <form-wizard color="rgba(var(--vs-primary), 1)" errorColor="rgba(var(--vs-danger), 1)" :title="null"
                                 :subtitle="null" finishButtonText="Submit">
                      <tab-content class="mb-5" icon="feather icon-home">

                        <!-- tab 1 content -->
                        <form data-vv-scope="step-1" class="mb-12">


                          <div class="vx-row">
                            <div class="vx-col md:w-1/1 w-full">
                              <h3 class=" mb-2">Activity Level</h3>

                            </div>
                            <div class="vx-col md:w-3/1 w-full">
                              <ul class="centerx">
                                <li class="mt-2">
                                  <vs-radio v-on:change="profileSave()" v-model="activity_level" vs-value="1.2">Sedentary
                                  </vs-radio>
                                  <span class="pl-1 m-none"><vx-tooltip text="little or no exercise, desk job ">
                          <feather-icon icon="AlertCircleIcon" svgClasses="h-4 w-4" /></vx-tooltip></span>
                                  <span @click="sedentaryActive=true" class="pl-1 d-none"><feather-icon icon="AlertCircleIcon" svgClasses="h-4 w-4" /></span>

                                  <vs-popup class="holamundo" :active.sync="sedentaryActive" title="Sedentary">
                                    <p>little or no exercise, desk job</p>
                                  </vs-popup>
                                </li>
                                <li class="mt-2">
                                  <vs-radio v-on:change="profileSave()" v-model="activity_level" vs-value="1.375">Light
                                    exercise
                                  </vs-radio>
                                  <span  class="pl-1 m-none"><vx-tooltip text="light exercise/sports 1-3 days / week">
                          <feather-icon icon="AlertCircleIcon" svgClasses="h-4 w-4" /></vx-tooltip></span>
                                  <span @click="lightExerciseActive=true" style="display: inline-flex; position:relative; top:-2px;" class="pl-1 d-none"><feather-icon icon="AlertCircleIcon" svgClasses="h-4 w-4" /></span>

                                  <vs-popup class="holamundo" :active.sync="lightExerciseActive" title="Light Exercise">
                                    <p>light exercise/sports 1-3 days / week</p>
                                  </vs-popup>
                                </li>
                                <li class="mt-2">
                                  <vs-radio v-on:change="profileSave()" v-model="activity_level" vs-value="1.55">Moderately
                                    active
                                  </vs-radio>
                                  <span  class="pl-1 m-none"><vx-tooltip text="moderate exercise/sports 3-5 days/week">
                          <feather-icon icon="AlertCircleIcon" svgClasses="h-4 w-4" /></vx-tooltip></span>
                                  <span @click="moderatelyActive=true" style="display: inline-flex; position:relative; top:-2px;" class="pl-1 d-none"><feather-icon icon="AlertCircleIcon" svgClasses="h-4 w-4" /></span>

                                  <vs-popup class="holamundo" :active.sync="moderatelyActive" title="Moderately active">
                                    <p>moderate exercise/sports 3-5 days/week</p>
                                  </vs-popup>
                                </li>
                                <li class="mt-2">
                                  <vs-radio v-on:change="profileSave()" v-model="activity_level" vs-value="1.725">Very
                                    active
                                  </vs-radio>
                                  <span class="pl-1 m-none"><vx-tooltip text="hard exercise/sports 6-7 days/week">
                          <feather-icon icon="AlertCircleIcon" svgClasses="h-4 w-4" /></vx-tooltip></span>
                                  <span @click="veryActive=true" class="pl-1 d-none"><feather-icon icon="AlertCircleIcon" svgClasses="h-4 w-4" /></span>

                                  <vs-popup class="holamundo" :active.sync="veryActive" title="Very active">
                                    <p>hard exercise/sports 6-7 days/week</p>
                                  </vs-popup>
                                </li>
                              </ul>

                            </div>
                          </div>
                          <div class="vx-row">
                            <div class="vx-col w-full mt-5">
                              <h3 class=" mb-2">Protein Intake</h3>
                              <ul class="centerx mt-2">

                                <li class="mt-2">
                                  <vs-radio v-on:change="profileSave()" v-model="bg_protein"
                                            vs-value="low">Low
                                  </vs-radio>
                                  <span class="pl-1 m-none"><vx-tooltip text="Low">
                          <feather-icon icon="AlertCircleIcon" svgClasses="h-4 w-4" /></vx-tooltip></span>
                                  <span @click="lowActive=true" style="display: inline-flex; position:relative; top:-2px;" class="pl-1 d-none"><feather-icon icon="AlertCircleIcon" svgClasses="h-4 w-4" /></span>

                                  <vs-popup class="holamundo" :active.sync="lowActive" title="Low">

                                  </vs-popup>
                                </li>
                                <li class="mt-2">
                                  <vs-radio v-on:change="profileSave()"
                                            v-model="bg_protein" vs-value="normal">Normal
                                  </vs-radio>
                                  <span class="pl-1 m-none"><vx-tooltip text="Normal ">
                          <feather-icon icon="AlertCircleIcon" svgClasses="h-4 w-4" /></vx-tooltip></span>
                                  <span @click="normalActive=true" style="display: inline-flex; position:relative; top:-2px;" class="pl-1 d-none"><feather-icon icon="AlertCircleIcon" svgClasses="h-4 w-4" /></span>

                                  <vs-popup class="holamundo" :active.sync="normalActive" title="Normal">

                                  </vs-popup>
                                </li>
                                <li class="mt-2">
                                  <vs-radio v-on:change="profileSave()"
                                            v-model="bg_protein" vs-value="high">High
                                  </vs-radio>
                                  <span class="pl-1 m-none"><vx-tooltip text="High ">
                          <feather-icon icon="AlertCircleIcon" svgClasses="h-4 w-4" /></vx-tooltip></span>
                                  <span @click="highActive=true" style="display: inline-flex; position:relative; top:-2px;" class="pl-1 d-none"><feather-icon icon="AlertCircleIcon" svgClasses="h-4 w-4" /></span>

                                  <vs-popup class="holamundo" :active.sync="highActive" title="High">
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
                          <div class="vx-row">
                            <div class="vx-col w-full">
                              <div>
                                <!--                <strong style="display: block; maring: 0 0 14px; color: #343a40; font-size: 24px;">Calories</strong>-->
                                <!--                <img src="@/assets/images/pages/bg-fire.png" alt="image" class="mx-auto">-->
                                <span style="color: #7367f0; font-size: 20px; font-weight: bold; margin: 0 0 0px;"> Your Body Fat Percentage is:<span class="pl-1 m-none"><vx-tooltip text=" Your BODY FAT%">
                          <feather-icon icon="AlertCircleIcon" svgClasses="h-4 w-4" /></vx-tooltip></span>                                <span @click="bodyFatActive=true" class="pl-1 d-none"><feather-icon icon="AlertCircleIcon" svgClasses="h-4 w-4" /></span>
 </span>

                                <vs-popup class="holamundo" :active.sync="bodyFatActive" title="Body Fat">
                                  <p> Fat Percentage:</p>
                                </vs-popup>
                                <span style="font-size: 16px; font-weight: bold; float:right">{{fat}}</span><br>
                                <hr>
                                <span style="color: #7367f0; font-size: 20px; font-weight: bold; margin: 0 0 0px;">Your LBM :<span  class="pl-1 m-none"><vx-tooltip text="Lean Body Mass">
                          <feather-icon icon="AlertCircleIcon" svgClasses="h-4 w-4" /></vx-tooltip></span>  <span @click="lbmActive=true" class="pl-1 d-none"><feather-icon icon="AlertCircleIcon" svgClasses="h-4 w-4" /></span>
 </span>

                                <vs-popup class="holamundo" :active.sync="lbmActive" title="LBM">
                                  <p>Lean Body Mass:</p>
                                </vs-popup>
                                <span style="font-size: 16px; font-weight: bold;float:right">{{lmb}}</span><br>
                                <hr>
                                <span style="color: #7367f0; font-size: 20px; font-weight: bold; margin: 0 0 0px;"> Your RMR :<span  class="pl-1 m-none"><vx-tooltip text="Resting Metabolic Rate ">
                          <feather-icon icon="AlertCircleIcon" svgClasses="h-4 w-4" /></vx-tooltip></span> <span @click="rmrActive=true"  class="pl-1 d-none"><feather-icon icon="AlertCircleIcon" svgClasses="h-4 w-4" /></span>
  </span>

                                <vs-popup class="holamundo" :active.sync="rmrActive" title="RMR">
                                  <p>Resting Metabolic Rate (rmr)</p>
                                </vs-popup>
                                <span style="font-size: 16px; font-weight: bold;float:right">{{rmr}}</span><br>
                                <hr>
                                <span style="color: #7367f0; font-size: 20px; font-weight: bold; margin: 0 0 0px;">Your FBM  :<span  class="pl-1 m-none"><vx-tooltip text="Fat Body Mass ">
                          <feather-icon icon="AlertCircleIcon" svgClasses="h-4 w-4" /></vx-tooltip></span>  <span @click="fbmActive=true"  class="pl-1 d-none"><feather-icon icon="AlertCircleIcon" svgClasses="h-4 w-4" /></span>
 </span>

                                <vs-popup class="holamundo" :active.sync="fbmActive" title="FBM">
                                  <p>Fat body mass (fbm)</p>
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
            <div class="vx-col lg:w-1/2 md:w-1/1 sm:w-1/1 w-full mb-base" id="data-save">

              <div class="vs-con-loading__container" id="div-with-loading">
                <div class="vx-row">
                  <div class="vx-col lg:w-1/2 md:w-1/2 sm:w-1/1 w-full mb-base text-center">
                    <vx-card title="Calories">


                      <img src="@/assets/images/pages/bg-fire.png" alt="image" style="margin: 0 auto;;width:65%">
                      <span style="display: block; color: #7367f0; font-size: 20px; font-weight: bold;">{{calory}}</span>
                      <span style="display: block; font-size: 16px; font-weight: bold;">Per Day</span>
                    </vx-card>
                  </div>
                  <div class="vx-col lg:w-1/2 md:w-1/2 sm:w-1/1 w-full mb-base text-center">
                    <vx-card title="Carbs">

                      <img src="@/assets/images/pages/bg-carbs.png" alt="image" style="margin: 0 auto;width:65%">
                      <span style="display: block; color: #7367f0; font-size: 20px; font-weight: bold;"  v-if="carbohydrates">{{carbohydrates}}({{carbohydrate_percentage}})</span>
                      <span style="display: block; font-size: 16px; font-weight: bold;">Gram Per Day</span>
                    </vx-card>

                  </div>
                </div>
                <div class="vx-row">
                  <div class="vx-col lg:w-1/2 md:w-1/2 sm:w-1/1 w-full mb-base text-center">
                    <vx-card title="Protiens">

                      <img src="@/assets/images/pages/bg-protein.png" alt="image" class="mx-auto" style="margin: 0 auto;;width:65%">
                      <span style="display: block; color: #7367f0; font-size: 20px; font-weight: bold; margin: 0 0 10px;"
                            v-if="protein">{{protein}}({{protein_percentage}})</span>
                      <span style="display: block; font-size: 16px; font-weight: bold;">Gram Per Day</span>
                    </vx-card>

                  </div>
                  <div class="vx-col lg:w-1/2 md:w-1/2 sm:w-1/1 w-full mb-base text-center">

                    <vx-card title="Fats">

                      <img src="@/assets/images/pages/bg-fats.png" alt="image" class="mx-auto" style="margin: 0 auto;;width:65%">
                      <span style="display: block; color: #7367f0; font-size: 20px; font-weight: bold; margin: 0 0 10px;"
                            v-if="fatsCalculate">{{fatsCalculate}}({{fat_percentage}})</span>
                      <span style="display: block; font-size: 16px; font-weight: bold;">Gram Per Day</span>
                    </vx-card>
                  </div>
                </div>

              </div>
            </div>

          </div>

          <div class="vx-row">
            <div class="vx-col lg:w-1/1 md:w-1/1 w-full mb-base">
              <div class="vx-col vx-card" style="padding: 10px 15px;">
                <div class="vx-col w-full">

                  <div class="vx-row">

                    <div class="vx-col lg:w-3/4 w-full mt-5 mb-6">
                      <H4 class="mb-2">Tools</H4>
                      <p style="font-size:12px" class="mb-4">In order to calculate your body fat percentage you're going to need a few tools. 
                        The method listed here in this guide requires you to have a set of caliper for measuring skin folds. To the right, 
                        you will see an image and link to the very same set of calipers that I use myself. I bought them very cheap off Amazon, and they work great
                        <br>
                        If you cannot get calipers, you can always use a regular measuring tape to get some measurements. You won't be able to use the fancy spreadsheet below, 
                        however you can go to the following site and use the Navy Tape Measure Method in the middle of the page (just to the RIGHT of the Fat Caliper Section).
                         It will also work just fine, however it may not be quite as accurate as caliper method.
                        </p>
                      <h4 class="mb-2">Calculating Your Body Fat Percentage:</h4>
                      <p style="font-size:12px" class="mb-4">To calculate your body fat, enter your age and your skinfold measurements (in millimeters) in the appropriate calculator.
                      You can use either the 3 or 7 site method below. However, I recommend the 7-site method as your calculation is going to be more accurate when taking more measurements.
                      You're going to take three measurements at each site for greatest accuracy. This sheet will automatically take the average of your three values. FYI - you can mouse over the measurment site labels (far left column) for descriptions  of where to use your calipers. </p>



                    </div>
                    <div class="vx-col lg:w-1/4 w-full mt-5 mb-6" >

                      <img style="width:100%;height:200px;" class="mb-2" src="../assets/images/pages/tools-image.jpg">
                      <p style="color:red;font-size:11px;border:1px solid red;padding:2%" class="mb-2">*** Note - If you have to use the measuring tape (Navy Tape Method),
                         you will simply write the number (body fat %) you get off that site and input in back into Step 1 ...just as you would using the calculator below. 
                         Again, you CAN do this without calipers... I just recommend getting some as they're more accurate.
                      </p>

                    </div>
                  </div>
                  <div class="vx-row">
                    <div class="vx-col lg:w-1/1 w-full mt-5 mb-6" >
                    <ul class="demo-alignment method">
                      <li>
                        <vs-radio v-model="site_method"
                                  vs-value="three_site_method"  v-on:change="changeItem($event)">Three Site Method
                        </vs-radio>
                        <span  class="pl-1 m-none"><vx-tooltip text=" Three Site Method">
                          <feather-icon icon="AlertCircleIcon" svgClasses="h-4 w-4" /></vx-tooltip></span>
                        <span @click="threeSideActive=true" class="pl-1 d-none"><feather-icon icon="AlertCircleIcon" svgClasses="h-4 w-4" /></span>

                        <vs-popup class="holamundo" :active.sync="threeSideActive" title="Three Site Method">

                        </vs-popup>
                      </li>
                      <li>
                        <vs-radio v-model="site_method"
                                  vs-value="seven_site_method"  v-on:change="changeItem($event)">Seven Site Method
                        </vs-radio>
                        <span class="pl-1 m-none"><vx-tooltip text=" Seven Site Method">
                          <feather-icon icon="AlertCircleIcon" svgClasses="h-4 w-4" /></vx-tooltip></span>
                        <span @click="sevenSideActive=true" class="pl-1 d-none"><feather-icon icon="AlertCircleIcon" svgClasses="h-4 w-4" /></span>

                        <vs-popup class="holamundo" :active.sync="sevenSideActive" title="Seven Site Method">

                        </vs-popup>
                      </li>
                    </ul>
                    </div>
                  </div>
                  <div class="vx-row">

                    <div class="vx-col lg:w-1/1 md:w-1/1 sm:w-1/1 w-full" >
                      <vs-table v-show="gender=='male'">
                        <template slot="thead">
                          <vs-th v-show="site_method == 'three_site_method'">3-Site Methods</vs-th>
                          <vs-th  v-show="site_method == 'seven_site_method'">7-Site Methods</vs-th>
                          <vs-th>1</vs-th>
                          <vs-th>2</vs-th>
                          <vs-th>3</vs-th>
                          <vs-th>Avg</vs-th>
                        </template>

                        <template>
                          <vs-tr>
                            <vs-td>
                              Chest
                            </vs-td>
                            <vs-td>
                              <!--                              <vs-input-number class="inputx" v-model="chest_site_1" size="medium" :step="0.5" @change="changeItem()"/>-->

                              <vs-input type="number"  class="inputx" v-model="chest_site_1" v-on:change="profileSave()" size="medium" :step="0.5"/>
                            </vs-td>
                            <vs-td>
                              <!-- <vs-input-number  class="inputx" v-model="chest_site_2" size="medium" :step="0.5" v-bind:v-on:change="changeItem()"/>-->
                              <vs-input type="number" v-model="chest_site_2" class="inputx" placeholder="0"
                                        v-on:change="profileSave()"/>
                            </vs-td>
                            <vs-td>
                              <vs-input type="number" v-model="chest_site_3" class="inputx" placeholder="0"
                                        v-on:change="profileSave()"/>
                            </vs-td>
                            <vs-td>{{chest_average}}</vs-td>

                          </vs-tr>
                          <vs-tr>
                            <vs-td>
                              Abdomen
                            </vs-td>
                            <vs-td>
                              <vs-input type="number" v-model="abdomen_site_1" class="inputx" placeholder="0"
                                        v-on:change="profileSave()"/>

                            </vs-td>
                            <vs-td>
                              <vs-input type="number" v-model="abdomen_site_2" class="inputx" placeholder="0"
                                        v-on:change="profileSave()"/>

                            </vs-td>
                            <vs-td>
                              <vs-input type="number" v-model="abdomen_site_3" class="inputx" placeholder="0"
                                        v-on:change="profileSave()"/>

                            </vs-td>
                            <vs-td>{{abdomen_average}}</vs-td>
                          </vs-tr>
                          <vs-tr>
                            <vs-td>
                              Thigh
                            </vs-td>
                            <vs-td>
                              <vs-input type="number" v-model="thigh_site_1" class="inputx" placeholder="0"
                                        v-on:change="profileSave()"/>

                            </vs-td>
                            <vs-td>
                              <vs-input type="number" v-model="thigh_site_2" class="inputx" placeholder="0"
                                        v-on:change="profileSave()"/>

                            </vs-td>
                            <vs-td>
                              <vs-input type="number" v-model="thigh_site_3" class="inputx" placeholder="0"
                                        v-on:change="profileSave()"/>

                            </vs-td>
                            <vs-td>{{thigh_average}}</vs-td>
                          </vs-tr>
                          <vs-tr v-show="site_method == 'seven_site_method'">
                            <vs-td>
                              Suprailiac
                            </vs-td>
                            <vs-td>
                              <!--                              <vs-input-number class="inputx" v-model="suprailiac_site_1" size="medium" :step="0.5" v-bind:v-on:change="changeItem()"/>-->

                              <vs-input type="number" v-model="suprailiac_site_1" class="inputx" placeholder="0"
                              />
                            </vs-td>
                            <vs-td>
                              <vs-input type="number" v-model="suprailiac_site_2" class="inputx" placeholder="0"
                                        v-on:change="changeItem($event)"/>
                            </vs-td>
                            <vs-td>
                              <vs-input type="number" v-model="suprailiac_site_3" class="inputx" placeholder="0"
                                        v-on:change="changeItem($event)"/>
                            </vs-td>
                            <vs-td>{{suprailiac_average}}</vs-td>

                          </vs-tr>
                          <vs-tr v-show="site_method == 'seven_site_method'">
                            <vs-td>
                              Midaxilliary
                            </vs-td>
                            <vs-td>
                              <vs-input type="number" v-model="midaxilliary_site_1" class="inputx" placeholder="0"
                                        v-on:change="changeItem($event)"/>
                              <!--                          {{ tr.email }}-->

                              <!--<template slot="edit">
                                <vs-input class="inputx" placeholder="Email" />
                              </template>-->
                            </vs-td>
                            <vs-td>
                              <vs-input type="number" v-model="midaxilliary_site_2" class="inputx" placeholder="0"
                                        v-on:change="changeItem($event)"/>

                              <!--                          {{ tr.email }}-->

                              <!--<template slot="edit">
                                <vs-input class="inputx" placeholder="Email" />
                              </template>-->
                            </vs-td>
                            <vs-td>
                              <vs-input type="number" v-model="midaxilliary_site_3" class="inputx" placeholder="0"
                                        v-on:change="changeItem($event)"/>

                              <!--                          {{ tr.email }}-->

                              <!--  <template slot="edit">
                                  <vs-input class="inputx" placeholder="Email" />
                                </template>-->
                            </vs-td>
                            <vs-td>{{midaxilliary_average}}</vs-td>

                          </vs-tr>
                          <vs-tr v-show="site_method == 'seven_site_method'">
                            <vs-td>
                              Tricep
                            </vs-td>
                            <vs-td>
                              <vs-input type="number" v-model="tricep_site_1" class="inputx" placeholder="0"
                                        v-on:change="changeItem($event)"/>
                              <!--                          {{ tr.email }}-->

                              <!--<template slot="edit">
                                <vs-input class="inputx" placeholder="Email" />
                              </template>-->
                            </vs-td>
                            <vs-td>
                              <vs-input type="number" v-model="tricep_site_2" class="inputx" placeholder="0"
                                        v-on:change="changeItem($event)"/>

                              <!--                          {{ tr.email }}-->

                              <!--<template slot="edit">
                                <vs-input class="inputx" placeholder="Email" />
                              </template>-->
                            </vs-td>
                            <vs-td>
                              <vs-input type="number" v-model="tricep_site_3" class="inputx" placeholder="0"
                                        v-on:change="changeItem($event)"/>

                              <!--                          {{ tr.email }}-->

                              <!--  <template slot="edit">
                                  <vs-input class="inputx" placeholder="Email" />
                                </template>-->
                            </vs-td>
                            <vs-td>{{tricep_average}}</vs-td>

                          </vs-tr>
                          <vs-tr v-show="site_method == 'seven_site_method'">
                            <vs-td>
                              Subscapula
                            </vs-td>
                            <vs-td>
                              <vs-input type="number" v-model="subscapula_site_1" class="inputx" placeholder="0"
                                        v-on:change="changeItem($event)"/>
                            </vs-td>
                            <vs-td>
                              <vs-input type="number" v-model="subscapula_site_2" class="inputx" placeholder="0"
                                        v-on:change="changeItem($event)"/>
                            </vs-td>
                            <vs-td>
                              <vs-input type="number" v-model="subscapula_site_3" class="inputx" placeholder="0"
                                        v-on:change="changeItem($event)"/>
                            </vs-td>
                            <vs-td>{{subscapula_average}}</vs-td>

                          </vs-tr>

                        </template>
                      </vs-table>

                      <vs-table v-show="gender=='female'">

                        <template slot="thead">
                          <vs-th v-show="site_method == 'three_site_method'">3-Site Methods</vs-th>
                          <vs-th  v-show="site_method == 'seven_site_method'">7-Site Methods</vs-th>
                          <vs-th>1</vs-th>
                          <vs-th>2</vs-th>
                          <vs-th>3</vs-th>
                          <vs-th>Avg</vs-th>
                        </template>

                        <template>
                          <vs-tr>
                            <vs-td>
                              Tricep
                            </vs-td>
                            <vs-td>
                              <vs-input type="number" v-model="tricep_site_1" class="inputx" placeholder="0"
                                        v-on:change="changeItem($event)"/>
                            </vs-td>
                            <vs-td>
                              <vs-input type="number" v-model="tricep_site_2" class="inputx" placeholder="0"
                                        v-on:change="changeItem($event)"/>
                            </vs-td>
                            <vs-td>
                              <vs-input type="number" v-model="tricep_site_3" class="inputx" placeholder="0"
                                        v-on:change="changeItem($event)"/>
                            </vs-td>
                            <vs-td>{{tricep_average}}</vs-td>

                          </vs-tr>
                          <vs-tr>
                            <vs-td>
                              Suprailiac
                            </vs-td>
                            <vs-td>
                              <vs-input type="number" v-model="suprailiac_site_1" class="inputx" placeholder="0"
                                        v-on:change="changeItem($event)"/>

                            </vs-td>
                            <vs-td>
                              <vs-input type="number" v-model="suprailiac_site_2" class="inputx" placeholder="0"
                                        v-on:change="changeItem($event)"/>

                            </vs-td>
                            <vs-td>
                              <vs-input type="number" v-model="suprailiac_site_3" class="inputx" placeholder="0"
                                        v-on:change="changeItem($event)"/>

                            </vs-td>
                            <vs-td>{{suprailiac_average}}</vs-td>
                          </vs-tr>
                          <vs-tr>
                            <vs-td>
                              Thigh
                            </vs-td>
                            <vs-td>
                              <vs-input type="number" v-model="thigh_site_1" class="inputx" placeholder="0"
                                        v-on:change="changeItem($event)"/>

                            </vs-td>
                            <vs-td>
                              <vs-input type="number" v-model="thigh_site_2" class="inputx" placeholder="0"
                                        v-on:change="changeItem($event)"/>

                            </vs-td>
                            <vs-td>
                              <vs-input type="number" v-model="thigh_site_3" class="inputx" placeholder="0"
                                        v-on:change="changeItem($event)"/>
                            </vs-td>
                            <vs-td>{{thigh_average}}</vs-td>
                          </vs-tr>
                          <vs-tr v-show="site_method == 'seven_site_method'">
                            <vs-td>
                              Abdomen
                            </vs-td>
                            <vs-td>
                              <vs-input type="number" v-model="abdomen_site_1" class="inputx" placeholder="0"
                                        v-on:change="changeItem($event)"/>

                            </vs-td>
                            <vs-td>
                              <vs-input type="number" v-model="abdomen_site_2" class="inputx" placeholder="0"
                                        v-on:change="changeItem($event)"/>

                            </vs-td>
                            <vs-td>
                              <vs-input type="number" v-model="abdomen_site_3" class="inputx" placeholder="0"
                                        v-on:change="changeItem($event)"/>

                            </vs-td>
                            <vs-td>{{abdomen_average}}</vs-td>
                          </vs-tr>
                          <vs-tr v-show="site_method == 'seven_site_method'">
                            <vs-td>
                              Midaxilliary
                            </vs-td>
                            <vs-td>
                              <vs-input type="number" v-model="midaxilliary_site_1" class="inputx" placeholder="0"
                                        v-on:change="changeItem($event)"/>
                              <!--                          {{ tr.email }}-->

                              <!--<template slot="edit">
                                <vs-input class="inputx" placeholder="Email" />
                              </template>-->
                            </vs-td>
                            <vs-td>
                              <vs-input type="number" v-model="midaxilliary_site_2" class="inputx" placeholder="0"
                                        v-on:change="changeItem($event)"/>

                              <!--                          {{ tr.email }}-->

                              <!--<template slot="edit">
                                <vs-input class="inputx" placeholder="Email" />
                              </template>-->
                            </vs-td>
                            <vs-td>
                              <vs-input type="number" v-model="midaxilliary_site_3" class="inputx" placeholder="0"
                                        v-on:change="changeItem($event)"/>

                              <!--                          {{ tr.email }}-->

                              <!--  <template slot="edit">
                                  <vs-input class="inputx" placeholder="Email" />
                                </template>-->
                            </vs-td>
                            <vs-td>{{midaxilliary_average}}</vs-td>

                          </vs-tr>
                          <vs-tr  v-show="site_method == 'seven_site_method'">
                            <vs-td>
                              Chest
                            </vs-td>
                            <vs-td>
                              <vs-input type="number" v-model="chest_site_1" class="inputx" placeholder="0"
                                        v-on:change="changeItem($event)"/>
                              <!--                          {{ tr.email }}-->

                              <!--<template slot="edit">
                                <vs-input class="inputx" placeholder="Email" />
                              </template>-->
                            </vs-td>
                            <vs-td>
                              <vs-input type="number" v-model="chest_site_2" class="inputx" placeholder="0"
                                        v-on:change="changeItem($event)"/>

                              <!--                          {{ tr.email }}-->

                              <!--<template slot="edit">
                                <vs-input class="inputx" placeholder="Email" />
                              </template>-->
                            </vs-td>
                            <vs-td>
                              <vs-input type="number" v-model="chest_site_3" class="inputx" placeholder="0"
                                        v-on:change="changeItem($event)"/>

                              <!--                          {{ tr.email }}-->

                              <!--  <template slot="edit">
                                  <vs-input class="inputx" placeholder="Email" />
                                </template>-->
                            </vs-td>
                            <vs-td>{{tricep_average}}</vs-td>

                          </vs-tr>
                          <vs-tr v-show="site_method == 'seven_site_method'">
                            <vs-td>
                              Subscapula
                            </vs-td>
                            <vs-td>
                              <vs-input type="number" v-model="subscapula_site_1" class="inputx" placeholder="0"
                                        v-on:change="changeItem($event)"/>
                            </vs-td>
                            <vs-td>
                              <vs-input type="number" v-model="subscapula_site_2" class="inputx" placeholder="0"
                                        v-on:change="changeItem($event)"/>
                            </vs-td>
                            <vs-td>
                              <vs-input type="number" v-model="subscapula_site_3" class="inputx" placeholder="0"
                                        v-on:change="changeItem($event)"/>
                            </vs-td>
                            <vs-td>{{subscapula_average}}</vs-td>

                          </vs-tr>
                        </template>
                      </vs-table>
                    </div>
                  </div>
                </div>
              </div>
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
  Chartkick.options = {
    colors: ["#4b7bec", "#26de81", "#eb3b5a"]
  },
    Vue.use(Chartkick.use(Chart))
  import firebase from 'firebase/app'

  require('firebase/firestore')
  import 'firebase/auth'
  import vSelect from 'vue-select'
  import Progress from "easy-circular-progress";
  import moment from 'moment'
  import StatisticsCardLine from '@/components/statistics-cards/StatisticsCardLine.vue'
  export default {
    data() {
      return {
        program_name:'',
        programeOptedTitle:'',
        program_type_start:'',
        pause_program:false,
        program_end_date:'',
        progame_paused_log: [],
        lineChartToggle:false,
        profileUrl:'',
        monthyMembesrYAxix:[],
        xaxisMembersColumn:[],
        monthMembers:'',
        insideMembersMonth:'',
        monthlyMembersStat:'',
        monthyYAxix:[],
        xaxisColumn:[],
        month:'',
        insideMonth:'',
        sedentaryActive:false,
        lightExerciseActive: false,
        moderatelyActive: false,
        veryActive: false,
        highActive:false,
        normalActive:false,
        lowActive:false,
        fbmActive:false,
        rmrActive:false,
        lbmActive:false,
        bodyFatActive:false,
        sevenSideActive:false,
        threeSideActive:false,
        monthlyStat:'',
        statLeadLedgar:[],
        statLeadConvertedLedgar:[],
        statleadsCount : '',
        statMonthLeadsCount : '',
        statMonthLeadsCountPercentage :'',
        MonthMembersCountPercentage:'',
        themeColors: ['#7367F0', '#28C76F', '#EA5455', '#FF9F43', '#1E1E1E'],
        series: [],
        leadSeries: [],
        weightValue:'',
        thisMonthLeadsCount: 0,
        thisMonthLeadsCountPercentage: 0,
        selectedWeight: '',
        uid: localStorage.getItem('uid'),
        users: [],
        contactMode: [
          {text: 'Email', value: 'email'},
          {text: 'Whatsapp', value: 'whatsapp'},
          {text: 'Sms', value: 'sms'},
          {text: 'Phone', value: 'phone'}
        ],
        trainersChart: [],
        packageChart: [],
        trainerCount: 0,
        trainerActiveCount: 0,
        trainerInactiveCount: 0,
        membersCount: 0,
        membersActiveCount: 0,
        membersInactiveCount: 0,
        saleActiveCount: 0,
        saleInactiveCount: 0,
        leadsCount: 1,
        leadsActiveCount: 0,
        saleCount: 0,
        gender_image: '',
        height: '',
        height_type: '',
        selected: '',
        protein_percentage: '',
        carbohydrate_percentage: '',
        fat_percentage: '',
        weight: '0',
        age: '0',
        gender: 'male',
        site_method: 'three_site_method',
        calory: '',
        fatsCalculate: '',
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
        heightFt: [
          {label: 'Inches', value: 'Inches'},
          {label: 'Feet', value: 'Feet'},
        ],
        firstName: "",
        lastName: "",
        email: "",
        bodyfat: "",
        bg_protein: 'low',
        goal: "Select your goal",
        city: "new-york",
        proposalTitle: "",
        jobTitle: "",
        textarea: "",
        eventName: "",
        eventLocation: "san-francisco",
        status: "plannning",
        cityOptions: [
          {text: "New York", value: "new-york"},
          {text: "Chicago", value: "chicago"},
          {text: "San Francisco", value: "san-francisco"},
          {text: "Boston", value: "boston"},
        ],
        goalOptions: [
          {text: "Maintain", value: "Maintain"},
          {text: "Fat lose", value: "fat-lose"},
          {text: "Lose 10%", value: "lose-10%"},
          {text: "Muscle Gain", value: "muscle-gain"},
        ],

        activity_level: '',
        statusOptions: [
          {text: "Plannning", value: "plannning"},
          {text: "In Progress", value: "in progress"},
          {text: "Finished", value: "finished"},
        ],
        height_in_ft_type: '',
        protein: '',
        carbohydrates: '',
        lmb: '',
        rmr: '',
        fbm: '',
        fat: '',
        program_started: '',
        program_ending: '',
        show_program_info: false,
        totalConvertedLeadsCount: 0,
        thisMonthConvertedLeadsCount: 0,
        thisMonthConvertedLeadsCountPercentage: 0,
        monthlyMember:0,
      }
    },
    methods: {
      changeWeight: function changeItem(event) {
        this.selectedWeight = event;
        // let oldWeight=localStorage.setItem('old_weight',this.weight)
        //weight kg convert into lBS
        if (this.selectedWeight == 'kg') {
          let weight =Math.ceil(this.weight* 0.45359237)
          this.weight = weight
          this.changeItem()

          // var oldWeightType=localStorage.setItem('old_weight_type',this.selectedWeight)
        } else if (this.selectedWeight == 'lbs') {
          let weight = Math.floor(this.weight/ 0.45359237)
          this.weight = weight
          this.changeItem()
          // var oldWeightType=localStorage.setItem('old_weight_type',this.selectedWeight)
          // }
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
      /*    clearThreeSiteFields() {
              this.activeLoading = false
              this.chest_site_1 = '0';
              this.chest_site_2 = '0';
              this.chest_site_3 = '0';
              this.abdomen_site_1 = '0';
              this.abdomen_site_2 = '0';
              this.abdomen_site_3 = '0';
              this.thigh_site_1 = '0';
              this.thigh_site_2 = '0';
              this.thigh_site_3 = '0';
              this.changeItem()
          },*/
      /*      clearSevenSiteFields() {
                this.activeLoading = false
                this.clearThreeSiteFields()
                this.suprailiac_site_1 = '0';
                this.suprailiac_site_2 = '0';
                this.suprailiac_site_3 = '0';
                this.midaxilliary_site_1 = '0';
                this.midaxilliary_site_2 = '0';
                this.midaxilliary_site_3 = '0';
                this.tricep_site_1 = '0';
                this.tricep_site_2 = '0';
                this.tricep_site_3 = '0';
                this.subscapula_site_1 = '0';
                this.subscapula_site_2 = '0';
                this.subscapula_site_3 = '0'
                this.changeItem()
            },*/
      heightType: function heightType(event) {
        // this.selected = event.target.value;
        if(this.selected=='centimeter') {

          // let centimeters = inches * 2.54
          let centimeters = this.height * 2.54
          this.height= Math.ceil(centimeters)
        }else if(this.selected=='inches'){
          let inches= this.height * 0.39370
          this.height= Math.floor(inches)
        }
      },
      changeItem: function changeItem(input, value) {
        if(this.selectedWeight=='kg'){
          let weight=Math.floor(this.weight/ 0.45359237)
          this.weightValue=weight
        }
        else{
          this.weightValue=this.weight
        }
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
                fat = ((4.57 / (1.0994921 - (0.0009929 * total_Average) + (0.0000023 * (total_Average) ** 2) - (0.0001392 * this.age))) - 4.142) * 100

              }
            }
            // this.selected = event.target.value;
//                        this.fat = (fat).toFixed(2)
            this.fat = isNaN(fat)==true?'0.00':(fat).toFixed(2)
            let activity = this.activity_level
            this.activity_level = this.activity_level//(input=='activity')?value.target.value:this.activity_level
            let lmb = this.weightValue - (this.weightValue * (fat / 100))
//                        this.lmb = (lmb).toFixed(2)
            this.lmb = isNaN(lmb)==true?'0.00':(lmb).toFixed(2)
            let rmr = 370 + (21.6 * (lmb / 2.2))
//                        this.rmr = (rmr).toFixed(2)
            this.rmr = isNaN(rmr)==true?'0.00':(rmr).toFixed(2)
            let fbm = this.weightValue * (fat / 100)
//                        this.fbm = (fbm).toFixed(2)
            this.fbm = isNaN(fbm)==true?'0.00':(fbm).toFixed(2)
            let calories = rmr * activity
            // this.calory = (rmr * activity).toFixed(2)
            let macroCalory=(rmr*activity).toFixed(2)
            this.calory=isNaN(macroCalory)==true?'0.00':macroCalory
            // this.bg_protein = 'low'

            if (this.bg_protein == 'low') {
              this.protein_percentage = '25%'
              this.carbohydrate_percentage = '50%'
              this.fat_percentage = '25%'
              let calories_protein = calories * 0.25
              let protein = calories_protein / 4
              // this.protein = (protein).toFixed(2)
              let macroProtein=(protein).toFixed(2)
              this.protein=isNaN(macroProtein)==true?'0.00':macroProtein
              let calories_carbohydrates = calories * 0.5
              let calory_carbohydrate = calories_carbohydrates / 4
              let macroCarbohydrate=(calory_carbohydrate).toFixed(2)
              this.carbohydrates=isNaN(macroCarbohydrate)==true?'0.00':macroCarbohydrate
              // this.carbohydrates = (calory_carbohydrate).toFixed(2)
              let fat_calories = calories * 0.25
              let fat = fat_calories / 9
              let macroFat=(fat).toFixed(2)
              this.fatsCalculate=isNaN(macroFat)==true?'0.00':macroFat

              // this.fatsCalculate = (fat).toFixed(2)
            }
            else if (this.bg_protein == 'high') {
              this.protein_percentage = '50%'
              this.carbohydrate_percentage = '30%'
              this.fat_percentage = '20%'
              let calories_protein = calories * 0.5
              let protein = calories_protein / 4
              let macroProtein=(protein).toFixed(2)
              this.protein=isNaN(macroProtein)==true?'0.00':macroProtein
              let calories_carbohydrates = calories * 0.3
              let calory_carbohydrate = calories_carbohydrates / 4
              let macroCarbohydrate=(calory_carbohydrate).toFixed(2)
              this.carbohydrates=isNaN(macroCarbohydrate)==true?'0.00':macroCarbohydrate
              let fat_calories = calories * 0.2
              let fat = fat_calories / 9
              let macroFat=(fat).toFixed(2)
              this.fatsCalculate=isNaN(macroFat)==true?'0.00':macroFat
            }
            else if (this.bg_protein == 'normal') {
              this.protein_percentage = '40%'
              this.carbohydrate_percentage = '40%'
              this.fat_percentage = '20%'
              let calories_protein = calories * 0.4
              let protein = calories_protein / 4
//                            this.protein = (protein).toFixed(2)
              let macroProtein=(protein).toFixed(2)
              this.protein=isNaN(macroProtein)==true?'0.00':macroProtein
              let calories_carbohydrates = calories * 0.4
              let calory_carbohydrate = calories_carbohydrates / 4
//                            this.carbohydrates = (calory_carbohydrate).toFixed(2)
              let macroCarbohydrate=(calory_carbohydrate).toFixed(2)
              this.carbohydrates=isNaN(macroCarbohydrate)==true?'0.00':macroCarbohydrate
              let fat_calories = calories * 0.2
              let fat = fat_calories / 9
//                            this.fatsCalculate = (fat).toFixed(2)
              let macroFat=(fat).toFixed(2)
              this.fatsCalculate=isNaN(macroFat)==true?'0.00':macroFat
            }
          }
        }
      },
      calculate() {
        firebase.firestore().collection('users')
          .doc(this.uid)
          .get()
          .then(snap => {
              this.activeLoading = false
              let data = snap.data();
              let memberObj = data['memberDetail'];
              if(data.site_method) {
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
              this.site_method=data.site_method?data.site_method:'three_site_method'
              this.gender = data['gender'];
              var dob = moment(memberObj['dateofbirth']).format('DD-MMMM-YYYY')
              this.age = moment().diff(dob, 'years')
              this.profileUrl =(data['profileUrl'])?data['profileUrl']:'';
              this.height = (memberObj['height_in_centimeter']!='')?memberObj['height_in_centimeter']:memberObj['height_in_inches'];
              // this.height = memberObj['height_in_inches'];
              this.selected=(memberObj['height_in_inches']!='')?'inches':'centimeter'
              // let weight_convert=(memberObj['weight_in_kg']!='')?(memberObj['weight_in_kg'] / 0.45359237):memberObj['weight_in_lbs']
              this.weight= (memberObj['weight_in_kg']!='')?(memberObj['weight_in_kg']):memberObj['weight_in_lbs'] ;//weight kg convert into lBS
              // this.weight= (weight_convert - Math.floor(weight_convert)!='')?(weight_convert).toFixed(2):weight_convert;//weight kg convert into lBS
              this.selectedWeight=(memberObj['weight_in_kg']!='')?'kg':'lbs'
              this.activity_level = memberObj['activity_level'];
              this.bg_protein = memberObj['bg_protein'];
              this.gender_image = (data['gender'] == 'male') ? '"@/assets/images/pages/bg-male-2.png"' : '"@/assets/images/pages/bg-male.png"';
              this.program_opted= memberObj['program_opted'];
              this.program_type_start = data['program_type_start']
              this.days_paused = data['days_paused'] ? data['days_paused'] : 0;
              this.programe_pause_count = data['programe_pause_count'] ? data['programe_pause_count'] : 0;
              this.progame_paused_log = data['progame_paused_log'] ? data['progame_paused_log'] : [];
              firebase.firestore().collection('program-opted').get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                  if(doc.id == this.program_opted){
                    this.programeOptedTitle = doc.data().title
                  }
                })
              })
              // var starting_date = data['program_type_start']
              // let days_paused1 = data['days_paused'] ? data['days_paused'] : 0
              // var numberOfDaysToAdd = parseInt(memberObj['tenure']) + parseInt(days_paused1);
              // this.program_end_date = moment(starting_date).add(numberOfDaysToAdd, 'days').format('MM-DD-YYYY')
              let current_package = memberObj && memberObj['program_type'] ? memberObj['program_type'] : false
              let days_paused = data['days_paused'] ? data['days_paused'] : 0
              if(current_package){
                if (data['program_type_start'] && data['program_type_start'] != '') {
                  this.program_type_start = moment(data['program_type_start']).format('DD-MM-YYYY')
                  var starting_date = data['program_type_start']
                  if (current_package) {
                    firebase.firestore().collection('package')
                      .doc(current_package)
                      .get()
                      .then(snap => {
                          let data = snap.data();
                          this.program_name = data['title']
                          var numberOfDaysToAdd = parseInt(data['tenure']) + parseInt(days_paused);
                          this.program_end_date = moment(starting_date).add(numberOfDaysToAdd, 'days').format('DD-MM-YYYY')
                        }
                      )
                  } else {
                    this.program_name = ''
                    this.program_type_start = ''
                    this.program_end_date = ''
                  }
                } else {
                  this.program_name = ''
                  this.program_type_start = ''
                  this.program_end_date = ''
                }
              }else{
                this.program_name = ''
                this.program_type_start = ''
                this.program_end_date = ''
              }
            }
          )
          .then(() => {
            this.changeItem()
            console.log('Successfully get user detail.')
          })
          .catch(error => {
            console.error('There was an error editing the record: ' + error)
          })
      },
      profileSave(){
        const saveProfile={
          site_method:this.site_method,
          gender:this.gender,
          memberDetail : {
            height_in_feet: '',
            height_in_inches:(this.selected == 'inches')? this.height : '',
            weight_in_lbs:  (this.selectedWeight == 'lbs')? this.weight : '',
            weight_in_kg: (this.selectedWeight == 'kg')? this.weight : '',
            height_in_centimeter: (this.selected == 'centimeter')?this.height : '',
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
          maleSiteMethod:{
            threeSiteMethod:{
              chest_site_1:(this.chest_site_1)?this.chest_site_1:'0',
              chest_site_2: (this.chest_site_2)?this.chest_site_2:'0',
              chest_site_3: (this.chest_site_3)?this.chest_site_3:'0',
              abdomen_site_1: (this.abdomen_site_1)?this.abdomen_site_1:'0',
              abdomen_site_2: (this.abdomen_site_2)?this.abdomen_site_2:'0',
              abdomen_site_3: (this.abdomen_site_3)?this.abdomen_site_3:'0',
              thigh_site_1: (this.thigh_site_1)?this.thigh_site_1:'0',
              thigh_site_2: (this.thigh_site_2)?this.thigh_site_2:'0',
              thigh_site_3: (this.thigh_site_3)?this.thigh_site_3:'0',
            },
            sevenSiteMethod:{
              chest_site_1:(this.chest_site_1)?this.chest_site_1:'0',
              chest_site_2: (this.chest_site_2)?this.chest_site_2:'0',
              chest_site_3: (this.chest_site_3)?this.chest_site_3:'0',
              abdomen_site_1: (this.abdomen_site_1)?this.abdomen_site_1:'0',
              abdomen_site_2: (this.abdomen_site_2)?this.abdomen_site_2:'0',
              abdomen_site_3: (this.abdomen_site_3)?this.abdomen_site_3:'0',
              thigh_site_1: (this.thigh_site_1)?this.thigh_site_1:'0',
              thigh_site_2: (this.thigh_site_2)?this.thigh_site_2:'0',
              thigh_site_3: (this.thigh_site_3)?this.thigh_site_3:'0',
              suprailiac_site_1: (this.suprailiac_site_1)?this.suprailiac_site_1:'0',
              suprailiac_site_2: (this.suprailiac_site_2)?this.suprailiac_site_2:'0',
              suprailiac_site_3: (this.suprailiac_site_3)?this.suprailiac_site_3:'0',
              midaxilliary_site_1: (this.midaxilliary_site_1)?this.midaxilliary_site_1:'0',
              midaxilliary_site_2: (this.midaxilliary_site_2)?this.midaxilliary_site_2:'0',
              midaxilliary_site_3: (this.midaxilliary_site_3)?this.midaxilliary_site_3:'0',
              tricep_site_1: (this.tricep_site_1)?this.tricep_site_1:'0',
              tricep_site_2: (this.tricep_site_2)?this.tricep_site_2:'0',
              tricep_site_3: (this.tricep_site_3)?this.tricep_site_3:'0',
              subscapula_site_1: (this.subscapula_site_1)?this.subscapula_site_1:'0',
              subscapula_site_2: (this.subscapula_site_2)?this.subscapula_site_2:'0',
              subscapula_site_3: (this.subscapula_site_3)?this.subscapula_site_3:'0',
            }
          }
        };

        // if(this.weight!=''|| this.height!='' || this.activity_level!=''|| this.bg_protein!= ''){
        firebase.firestore().collection("users").doc(this.uid).set(saveProfile, {merge:true})
        this.changeItem()
        this.calculate()
        this.$vs.notify({
          title: '',
          text: 'Your Profile Is Successfully Updated!',
          iconPack: 'feather',
          icon: 'icon-check',
          color: 'success'
        });
        // }
      },
      getProgramInfo() {
        firebase.firestore().collection('users')
          .doc(this.uid)
          .get()
          .then(snap => {
              let data = snap.data();
              let memberObj = data['memberDetail'];
              let current_package = memberObj['program_type'] ? memberObj['program_type'] : false
              let days_paused = data['days_paused'] ? data['days_paused'] : 0
              if (data['program_type_start'] && data['program_type_start'] != '') {
                this.program_started = moment(data['program_type_start']).format('DD-MM-YYYY')
                var starting_date = data['program_type_start']
                if (current_package) {
                  firebase.firestore().collection('package')
                    .doc(current_package)
                    .get()
                    .then(snap => {
                        let data = snap.data();
                        var numberOfDaysToAdd = parseInt(data['tenure']) + parseInt(days_paused);
                        this.program_ending = moment(starting_date).add(numberOfDaysToAdd, 'days').format('DD-MM-YYYY')
                        this.show_program_info = true
                      }
                    )
                }
              }
            }
          )
          .then(() => {
            this.changeItem()
            console.log('Successfully get user detail.')
          })
          .catch(error => {
            console.error('There was an error editing the record: ' + error)
          })
      },
    },
    computed: {
      user_displayName() {
        return JSON.parse(localStorage.getItem('userInfo')).displayName
      },
      user_role() {
        return localStorage.getItem('userRole')
      },
      program_is_passed(){
        let last_paused = this.progame_paused_log.length > 0 ? this.progame_paused_log.slice().reverse() : []
        let last_paused1 = last_paused.length > 0 ? moment(last_paused[0].datetime).format('YYYY-MM-DD') : ''
        let paused_days = last_paused.length > 0 ? last_paused[0].days : 0
        var now = moment(new Date()); //todays date
        var end = moment(last_paused1); // another date
        var duration = moment.duration(now.diff(end));
        var days = parseInt(duration.asDays());
        if(last_paused.length > 0) {
          if(last_paused[0].is_resumed_earlier && last_paused[0].is_resumed_earlier === true){
            return true;
          }
          if(!last_paused[0].is_resumed_earlier && days > paused_days){
            return true;
          }else{
            return false;
          }
        }else{
          if(this.program_type_start){
            return true;
          }else{
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
        if(last_paused.length > 0) {
          if(last_paused[0].is_resumed_earlier && last_paused[0].is_resumed_earlier === true){
            return false;
          }
          if(days < paused_days){
            return true;
          }else{
            return false;
          }
        }
        return false
      },
    },
    created() {
      this.trainerCount = 0
      this.membersCount = 0
      this.membersActiveCount = 0
      this.membersInactiveCount = 0
      this.leadsCount = 0
      this.thisMonthLeadsCount = 0
      this.saleCount = 0
      this.leadsActiveCount = 0

      // if (this.user_role == 'member') {
      this.getProgramInfo()
      this.calculate();
      // }
    },
    components: {
      StatisticsCardLine,
      Progress,
      'v-select': vSelect,
    },
  }
</script>

<style lang="scss">
  .height-2 .vs-con-input {
    float: left !important;
    width: 78% !important;
  }

  .number-22 .vs-con-input {
    width: 100% !important;
  }

  label {
    diaplay: block;
  }

  .vs__dropdown-menu li {
    width: 100%;
  }

  .vs--searchable .vs__dropdown-toggle {
    height: 38px;
  }

  /*.vs-input--label{*/
  /*font-size: 14px;*/
  /*display: block !important;*/
  /*}*/
  .height-2 .parent-dropdown {
    padding: 9px;
    font-size: 16px;
  }

  .select-22 {
    width: 150px;
    height: 38px;
    float: left;
    margin: 10px 0 0;

    .vs__search {
      display: none;
    }
  }

  /*.vs-radio--borde{*/
  /*background: #ccc;*/
  /*}*/
  .no-radio {
    .vs-radio {
      display: none;
    }
  }

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

    .vs__search, .vs__search:focus {
      display: none;
    }

    .chart-holder {
      /*padding: 10px;*/
      overflow: hidden;
      background: #fff;
      border-radius: 8px;
    }

    .avatar-content {
      width: 40px;
      height: 40px;
      padding: 9px 4px;
      border-radius: 50%;
      background: #f5f5f5;
      text-align: center;
      border: 1px solid #f5f5f5;

      .icon-users {
        font-size: 18px;
      }
    }

    .weight_22 .vs-con-input {
      width: 100% !important;
    }

    .demo-alignment.gender li {
      width: 25%;
      margin-top: 0 !important;
      margin-right: 18px !important;



      label {
        margin:0;
      }
    }

    .demo-alignment.method li {
      width: 25%;
    }

    .demo-alignment.activity-level li {
      width: 50%;
    }

    .cal-table {
      width: 100%;

      th,
      td,
      .vs-table-text {
        width: auto;
      }

      .vs-con-input-label {
        width: auto;
      }
    }

    /*.desktop-hide {*/
    /*display: none;*/
    /*}*/

    /*.mobile-hide {*/
    /*display: block;*/
    /*}*/
    .d-none{
      display:none !important;
    }
    .m-none{
      display: inline-flex !important;
      position: relative;
      top: -2px;
    }
    @media(max-width: 1024px) {
      .m-none {
        display:none !important;
      }
      .d-none{
        display: inline-flex !important;
        position: relative;
        top: -2px;
      }
    }
    @media(max-width: 767px) {
      .full-width {
        width: 100%;
      }
      .demo-alignment.method li {
        width: 100% !important;
      }
      #page-user-view .vs-con-input-label {
        width: 50px !important;
      }
      .demo-alignment.gender li {font-size: 13px;}

      /*.desktop-hide {*/
      /*display: block !important;*/
      /*}*/
      /*.mobile-hide {*/
      /*display: none !important;*/
      /*}*/
    }
    @media(max-width: 576px) {
      .decore-left, .decore-right {
        width: 140px;
      }
    }

    .member-dashboard .cstm-label {
      font-weight: 500;
    }

    .member-dashboard .cstm-label::before {
      content: "";
      border-right: 3px solid rgb(115, 103, 240);
      margin-right: 3px;
    }

  }

  /*#avatar-col {*/
    /*width: 10rem*/
  /*}*/

  /*#page-user-view table td {*/
    /*padding-bottom: .8rem*/
  /*}*/

  /*#page-user-view table td {*/
    /*padding-bottom: .8rem*/
  /*}*/

  /*@media screen and (max-width:370px)*/
  /*{#page-user-view table:not(.permissions-table) td{display:block}*/
  /*}*/
  /*@media only screen and (min-width: 636px) and (max-width: 991px), screen and (min-width: 1201px) and (max-width: 1211px) {*/
    /*#account-info-col-1 {*/
      /*width: calc(100% - 12rem) !important*/
    /*}*/
  /*}*/
#img-card .vx-card__collapsible-content .vx-card__body {
  padding: 0 !important;
}

</style>
