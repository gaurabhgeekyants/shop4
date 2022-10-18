<template>

  <div id="container" class="member-profile">
    <div class="vx-row mb-4">
      <div class="vx-col lg:w-1/4 w-full">

        <vx-card title="" class="mb-2">
          <div class="centerx">
            <vs-popup class="holamundo"  title="You can Freeze your program for max 10day's" :active.sync="popupActivo">
              <div class="vx-col lg:w-1/2 sm:w-1/2 mb-6">
                <label>For days</label>
                <select v-model="days_pause" class="w-full" style=" height: 38px; padding: 5px 10px; border-radius: 3px; border: 1px solid rgba(0,0,0,.2)">
                  <option v-for="n in 10 - days_paused" :value="n">
                    {{ n }}
                  </option>
                </select>
              </div>
              <vs-button class="mr-3 mb-2" id="button-save11" @click="pauseProgram">Save</vs-button>
            </vs-popup>
          </div>
          <div class="w-full">
            <div class="img-holder p-image">
              <img v-show="profileUrl!=''" :src="profileUrl" />
              <img v-if="gender=='male'" v-show="profileUrl==''" src="../../assets/images/portrait/small/default-profile.png" />
              <img v-if="gender=='other'" v-show="profileUrl==''" src="../../assets/images/portrait/small/default-profile.png" />
              <img v-if="gender=='female'" v-show="profileUrl==''" src="../../assets/images/portrait/small/female_avatar_vector.png" />
            </div>
            <div class="vx-row">
              <div class="fieldset w-full">
                <div class="vx-col">
                  <input type="file" class="w-full" @change="detectProfile($event.target.files)" accept="image/jpeg">
                  <!--<img @click="deleteImage($event.target.src)" :src="profileUrl" alt="picture" width="50px" height="50px">-->
                </div>
              </div>
            </div>
          </div>
        </vx-card>
        <vx-card title="Program & Package" class="mb-2">


          <!-- package section start -->

          <div class="vx-row">
            <div class="vx-col lg:w-1/1 md:w-1/1 sm:w-full xs:w-full w-full">

              <vs-chip color="primary" class=" mb-6 mt-4">{{package}}</vs-chip>
            </div>
          </div>
          <div class="vx-row">

            <div class="vx-col lg:w-1/1 md:w-1/1 sm:w-full xs:w-full mb-6 mt-4 w-full">
              <div class="vx-row">
                <div class="vx-col lg:w-1/2">
                  <span> <label>Program:</label></span>
                </div>
                <div class="vx-col lg:w-1/2">
                        <span> <label>
                          {{programeOptedTitle}}
                        </label></span>
                </div>
              </div>
              <div class="vx-row">
                <div class="vx-col lg:w-1/2">
                  <span> <label>Start Date:</label></span>
                </div>
                <div class="vx-col lg:w-1/2">
                  <span> <label>{{program_type_start}}</label></span>
                </div>
              </div>
              <div class="vx-row">
                <div class="vx-col lg:w-1/2">
                  <span> <label>End Date:</label></span>
                </div>
                <div class="vx-col lg:w-1/2">
                  <span> <label>{{program_end_date}}</label></span>
                </div>
              </div>
              <div class="vx-row">
                <div class="vx-col lg:w-1/2">
                  <span> <label>Staus:</label></span>
                </div>
                <div class="vx-col lg:w-1/2">
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
                    <!--                        <vs-button color="success" radius type="gradient" icon-pack="feather" icon="icon-play" style="display: inline-flex;"></vs-button>-->
                        </span>

                </div>
              </div>

            </div>
            <!--package section ends-->
          </div>

          <vs-input icon-pack="feather" class="mb-2" icon="icon-instagram" placeholder="@instagram" v-model="instagram"  />


          <vs-input icon-pack="feather" class="mb-2" icon="icon-facebook" placeholder="/facebook-id" v-model="facebook"  />
          <vs-input icon-pack="feather" class="mb-2" icon="icon-twitter" placeholder="@twitter" v-model="twitter" />
          <div class="vx-col sm:w-2/3 w-full ml-auto">
            <vs-button @click="socialSave" size="small">Save</vs-button>
          </div>
        </vx-card>
        <!--  <vx-card title="Front" class="mb-2">

            <div class="w-full">
              <div class="img-holder p-image">
                <img v-if="frontImagePreview != ''" :src='frontImagePreview' alt="Xtreme Performance" style="margin: auto;max-height: 300px;min-height: 270px;">
                <img v-if="frontImagePreview == ''" src="@/assets/images/pages/register/front-pic.png" alt="Xtreme Performance" style="margin: auto;max-height: 300px;min-height: 270px;">
              </div>
            </div>
          </vx-card>

          <vx-card title="Side" class="mb-2">
            <div class="w-full">
              <div class="img-holder p-image">
                <img v-if="sideImagePreview != ''" :src='sideImagePreview' alt="Xtreme Performance" style="margin: auto;max-height: 300px;min-height: 270px;">
                <img v-if="sideImagePreview == ''" src="@/assets/images/pages/register/side-pic.png" alt="Xtreme Performance" style="margin: auto;max-height: 300px;min-height: 270px;">
              </div>
            </div>
          </vx-card>

          <vx-card title="Back" class="mb-2">
            <div class="w-full">
              <div class="img-holder p-image">
                <img v-if="backImagePreview != ''" :src='backImagePreview' alt="Xtreme Performance" style="margin: auto;max-height: 300px;min-height: 270px;">
                <img v-if="backImagePreview == ''" src="@/assets/images/pages/register/back-pic.png" alt="Xtreme Performance" style="margin: auto;max-height: 300px;min-height: 270px;">
              </div>
            </div>
          </vx-card>-->
      </div>
      <div class="vx-col lg:w-3/4">
        <vx-card>
          <div class="vx-row mb-4">

            <div class="vx-col lg:w-1/2 md:w-1/2 sm:w-1/1 mb-4">
              <vs-input   v-validate="'required'"
                          data-vv-validate-on="blur"
                          name="first_name" class="w-full" v-model="first_name" label="First Name" />
              <span class="text-danger text-sm">{{ errors.first('first_name') }}</span>
            </div>
            <div class="vx-col lg:w-1/2 md:w-1/2 sm:w-1/1 mb-4">
              <vs-input   v-validate="'required'"
                          data-vv-validate-on="blur"
                          name="last_name" class="w-full" v-model="last_name" label="Last Name" />
              <span class="text-danger text-sm">{{ errors.first('last_name') }}</span>
            </div>
            <div class="vx-col lg:w-1/2 md:w-1/2 sm:w-1/1 mb-4">
              <label style="font-size: 11.9px;display: block;" class="ml-2">Gender</label>
              <ul style="display: inline-flex;width:100%;" class="ml-4 mt-2 gender-radio">
                <li style="">
                  <vs-radio v-model="gender" name="gender" vs-value="male">Male</vs-radio>
                </li>
                <li>
                  <vs-radio v-model="gender" name="gender" vs-value="female">Female</vs-radio>
                </li>
                <li>
                  <vs-radio v-model="gender" name="gender" vs-value="other">Other</vs-radio>
                </li>

                <!--     <li>
                         <label class="vs-component con-vs-radio vs-radio-primary">
                             <input v-model="gender" name="gender" type="radio" class="vs-radio&#45;&#45;input" value="male">
                             <span class="vs-radio">
                             <span class="vs-radio&#45;&#45;borde" style="border: 2px solid rgb(200, 200, 200);">
                             </span>
                             <span class="vs-radio&#45;&#45;circle"></span>
                         </span>
                             <span class="vs-radio&#45;&#45;label">Male
                         </span>
                         </label>
                     </li>
                     <li>
                         <label class="vs-component con-vs-radio vs-radio-primary">
                             <input v-model="gender" name="gender" type="radio" class="vs-radio&#45;&#45;input" value="female">
                             <span class="vs-radio">
                             <span class="vs-radio&#45;&#45;borde" style="border: 2px solid rgb(200, 200, 200);">
                             </span>
                             <span class="vs-radio&#45;&#45;circle">
                             </span>
                         </span>
                             <span class="vs-radio&#45;&#45;label">Female
                         </span>
                         </label>
                     </li>-->
              </ul>



            </div>
            <div class="vx-col lg:w-1/2 md:w-1/2 sm:w-1/1 mb-4">
              <vs-input  class="w-full"  v-validate="'required'"
                         data-vv-validate-on="blur" :readonly="true"
                         name="email" type="email" v-model="email" label="Email" />
              <span class="text-danger text-sm">{{ errors.first('email') }}</span>
            </div>
            <div class="vx-col lg:w-1/2 md:w-1/2 sm:w-1/1 mb-4">
              <label style="font-size: 11.9px">Mobile</label>
              <VuePhoneNumberInput v-model="mobile" @update="onUpdate" :default-country-code="countryCode" class="w-full" name="mobile" placeholder="Mobile"/>

              <span class="text-danger text-sm" v-if="phoneValid===false">Please enter Your Valid Mobile Number</span>
            </div>
            <div class="vx-col lg:w-1/2 md:w-1/2 sm:w-1/1 mb-4">
              <label style="font-size: 11.9px">Date Of Birth</label>

              <div class="w-full">
                <flat-pickr :config="configdateTimePicker" v-model="dateofbirth" placeholder="Select Date of Birth" style="width: 100%"/>
                <span class="text-danger text-sm"  v-show="errors.has('date_of_birth')">{{ errors.first('date_of_birth') }}</span><br/>
                <span class="text-danger text-sm"  v-if="dob_age_message == true" >You should be over 7 years to update</span>
              </div>
            </div>

          </div>

          <div class="vx-col lg:w-1/1 md:w-1/1 sm:w-1/1 mb-4">
            <h4 class="mb-6">Food & Health</h4>
            <div class="vx-row">
              <div class="vx-col lg:w-1/2 md:w-1/2 sm:w-1/1 mb-4">

                <h5 class="mb-2">what kind of food you can eat?</h5>

                <div v-for="(region, index) in foodKinds" :key="index">
                  <vs-checkbox v-model="form.regions" :checked="categories.includes(region.id)" :vs-value="region.id" >
                    {{ region.name }}</vs-checkbox>
                </div>
              </div>
              <div class="vx-col lg:w-1/2 md:w-1/2 sm:w-1/1 mb-4">
                <h5 class="mb-2">do you have any health issue/issues?</h5>
                <ul class="demo-alignment">
                  <li>
                    <label class="vs-component con-vs-radio vs-radio-primary">
                      <input name="health_issue" v-model="health_issue" type="radio" class="vs-radio--input" value="no">
                      <span class="vs-radio">
                                          <span class="vs-radio--borde" style="border: 2px solid rgb(200, 200, 200);">
                                          </span>
                                          <span class="vs-radio--circle"></span>
                                      </span>
                      <span class="vs-radio--label">No
                                      </span>
                    </label>
                  </li>
                  <li>
                    <label class="vs-component con-vs-radio vs-radio-primary">
                      <input name="health_issue" v-model="health_issue" type="radio" class="vs-radio--input" value="yes">
                      <span class="vs-radio">
                                          <span class="vs-radio--borde" style="border: 2px solid rgb(200, 200, 200);">
                                          </span>
                                          <span class="vs-radio--circle">
                                          </span>
                                      </span>
                      <span class="vs-radio--label">Yes
                                      </span>
                    </label>
                  </li>
                </ul>
                <div v-show="health_issue === 'yes'">
                  <div class="w-full">
                    <h5 class="mb-2">if yes then mention it below:</h5>
                    <vs-input class="w-full" type="text" v-model="health_issue_desc"  />
                  </div>
                </div>
              </div>

              <div class="vx-col lg:w-1/2 md:w-1/2 sm:w-1/1 mb-4">
                <h5 class="mb-2">any kind of food allergy?</h5>
                <ul class="demo-alignment">
                  <li>
                    <label class="vs-component con-vs-radio vs-radio-primary">
                      <input name="food_alergy" v-model="food_alergy" type="radio" class="vs-radio--input" value="no">
                      <span class="vs-radio">
                                          <span class="vs-radio--borde" style="border: 2px solid rgb(200, 200, 200);">
                                          </span>
                                          <span class="vs-radio--circle"></span>
                                      </span>
                      <span class="vs-radio--label">No
                                      </span>
                    </label>
                  </li>
                  <li>
                    <label class="vs-component con-vs-radio vs-radio-primary">
                      <input name="food_alergy" v-model="food_alergy" type="radio" class="vs-radio--input" value="yes">
                      <span class="vs-radio">
                                          <span class="vs-radio--borde" style="border: 2px solid rgb(200, 200, 200);">
                                          </span>
                                          <span class="vs-radio--circle">
                                          </span>
                                      </span>
                      <span class="vs-radio--label">Yes
                                      </span>
                    </label>
                  </li>
                </ul>
                <div class="vx-col mb-6" v-show="food_alergy === 'yes'">

                  <h5 class="mb-2">if yes then mention it below:</h5>

                  <div class="vx-col w-full">
                    <vs-input class="w-full" type="text" name="food_alergy_desc" v-model="food_alergy_desc" />
                  </div>
                </div>
              </div>
              <div class="vx-col lg:w-1/2 md:w-1/2 sm:w-1/1 mb-4">

              </div>
              <div class=" vx-col lg:w-1/1 md:w-1/1 sm:w-1/1 mb-4">
                <h5 class="mb-2">Are you currently On/Were any kind of medication</h5>
                <ul class="demo-alignment">
                  <li>
                    <label class="vs-component con-vs-radio vs-radio-primary">
                      <input name="medication" v-model="medication" type="radio" class="vs-radio--input" value="no">
                      <span class="vs-radio">
                                          <span class="vs-radio--borde" style="border: 2px solid rgb(200, 200, 200);">
                                          </span>
                                          <span class="vs-radio--circle"></span>
                                      </span>
                      <span class="vs-radio--label">No
                                      </span>
                    </label>
                  </li>
                  <li>
                    <label class="vs-component con-vs-radio vs-radio-primary">
                      <input name="medication" v-model="medication" type="radio" class="vs-radio--input" value="yes">
                      <span class="vs-radio">
                                          <span class="vs-radio--borde" style="border: 2px solid rgb(200, 200, 200);">
                                          </span>
                                          <span class="vs-radio--circle">
                                          </span>
                                      </span>
                      <span class="vs-radio--label">Yes
                                      </span>
                    </label>
                  </li>
                </ul>
                <div class="vx-col mb-6" v-show="medication === 'yes'">

                  <h5 class="mb-2">if yes then mention it below:</h5>

                  <div class="vx-col w-full">
                    <vs-input class="w-full" type="text" name="medication_desc" v-model="medication_desc" />
                  </div>
                </div>
              </div>

            </div>
          </div>
          <div class="vx-col lg:w-1/1 md:w-1/1 sm:w-1/1 mb-4">
            <h4 class="mb-6">Training & Workout</h4>
            <div class="vx-row">
              <div class="vx-col lg:w-1/1 md:w-1/1 sm:w-1/1 mb-4">
                <h5 class="mb-2">how many day a week you can work</h5>

                <ul class="demo-alignment">
                  <li>
                    <label class="vs-component con-vs-radio vs-radio-primary">
                      <input type="radio" class="vs-radio--input" name="tenure" v-model="tenure" value="1">
                      <span class="vs-radio">
                                          <span class="vs-radio--borde" style="border: 2px solid rgb(200, 200, 200);">
                                          </span>
                                          <span class="vs-radio--circle"></span>
                                      </span>
                      <span class="vs-radio--label">1-2 day's
                                      </span>
                    </label>
                  </li>
                  <li>
                    <label class="vs-component con-vs-radio vs-radio-primary">
                      <input type="radio" class="vs-radio--input" name="tenure" v-model="tenure" value="2">
                      <span class="vs-radio">
                                          <span class="vs-radio--borde" style="border: 2px solid rgb(200, 200, 200);">
                                          </span>
                                          <span class="vs-radio--circle"></span>
                                      </span>
                      <span class="vs-radio--label">2-3 day's
                                      </span>
                    </label>
                  </li>
                  <li>
                    <label class="vs-component con-vs-radio vs-radio-primary">
                      <input type="radio" class="vs-radio--input" name="tenure" v-model="tenure" value="3">
                      <span class="vs-radio">
                                          <span class="vs-radio--borde" style="border: 2px solid rgb(200, 200, 200);">
                                          </span>
                                          <span class="vs-radio--circle"></span>
                                      </span>
                      <span class="vs-radio--label">3-4 day's
                                      </span>
                    </label>
                  </li>
                  <li>
                    <label class="vs-component con-vs-radio vs-radio-primary">
                      <input type="radio" class="vs-radio--input" name="tenure" v-model="tenure" value="4">
                      <span class="vs-radio">
                                          <span class="vs-radio--borde" style="border: 2px solid rgb(200, 200, 200);">
                                          </span>
                                          <span class="vs-radio--circle"></span>
                                      </span>
                      <span class="vs-radio--label">4-5 day's
                                      </span>
                    </label>
                  </li>
                  <li>
                    <label class="vs-component con-vs-radio vs-radio-primary">
                      <input type="radio" class="vs-radio--input" name="tenure" v-model="tenure" value="5">
                      <span class="vs-radio">
                                          <span class="vs-radio--borde" style="border: 2px solid rgb(200, 200, 200);">
                                          </span>
                                          <span class="vs-radio--circle"></span>
                                      </span>
                      <span class="vs-radio--label">5-6 day's
                                      </span>
                    </label>
                  </li>
                  <li>
                    <label class="vs-component con-vs-radio vs-radio-primary">
                      <input type="radio" class="vs-radio--input" name="tenure" v-model="tenure" value="6">
                      <span class="vs-radio">
                                          <span class="vs-radio--borde" style="border: 2px solid rgb(200, 200, 200);">
                                          </span>
                                          <span class="vs-radio--circle"></span>
                                      </span>
                      <span class="vs-radio--label">6-7 day's
                                      </span>
                    </label>
                  </li>
                </ul>
              </div>
              <div class="vx-col lg:w-1/1 md:w-1/1 sm:w-1/1 mb-4">



                <h5 class="mb-4">any special request which you would like  to mention to your trainer coach?</h5>


                <div class="vs-component vs-con-textarea vs-textarea-primary"  style="border: 1px solid rgba(0, 0, 0, 0.08);">
                  <textarea name="message" class="vs-textarea"  rows="3" v-model="special_request"></textarea>

                </div>
              </div>
            </div>

          </div>
          <div class="vx-col lg:w-1/1 md:w-1/1 sm:w-1/1 mb-4">
            <div class="image-section">
              <div class="vx-col">
                <h4 style="display: inline;">Body Image </h4>(<span style="text-decoration: none;"><a style="text-decoration: none; cursor:pointer;"  @click="onClick()"> Click Here For Photo Guide</a></span>)

              </div>
              <div class="vx-row mb-4">
                <div class="vx-col lg:w-1/3 mb-2 w-full">
                  <div class="text-center avatars pt-6">
                    <label class="btn btn-block btn-file-upload">
                      <img v-if="frontImagePreview != ''" :src='frontImagePreview' alt="Xtreme Performance"
                           style="width: 120px; display: block; margin:0 auto;">
                      <img v-if="frontImagePreview == ''" src="@/assets/images/pages/register/front-pic.png" alt="Xtreme Performance"
                           style="width: 120px; display: block; margin:0 auto;">
                      <!--                      Your Front Picture Here-->
                      <input type="file" class="w-full" multiple @change="detectFiles($event.target.files,'front')"
                             accept="image/jpeg" style="display: none;">
                    </label>
                  </div>
                </div>
                <div class="vx-col lg:w-1/3 mb-2 w-full">
                  <div class="text-center avatars pt-6">
                    <label class="btn btn-block btn-file-upload">
                      <img v-if="sideImagePreview != ''" :src='sideImagePreview' alt="Xtreme Performance"
                           style="width: 120px; display: block; margin:0 auto;">
                      <img v-if="sideImagePreview == ''" src="@/assets/images/pages/register/side-pic.png" alt="Xtreme Performance"
                           style="width: 120px; display: block; margin:0 auto;">
                      <!--                      Your Side Picture Here-->
                      <input type="file" class="w-full" multiple @change="detectFiles($event.target.files,'side')"
                             accept="image/jpeg" style="display: none;">
                    </label>
                  </div>
                </div>
                <div class="vx-col lg:w-1/3 mb-2 w-full">
                  <div class="text-center avatars pt-6">
                    <label class="btn btn-block btn-file-upload">
                      <img v-if="backImagePreview != ''" :src='backImagePreview' alt="Xtreme Performance"
                           style="width: 120px; display: block; margin:0 auto;">
                      <img v-if="backImagePreview == ''" src="@/assets/images/pages/register/back-pic.png" alt="Xtreme Performance"
                           style="width: 120px; display: block; margin:0 auto;">
                      <!--                      Your back Picture Here-->
                      <input type="file" class="w-full" @change="detectFiles($event.target.files,'back')" accept="image/jpeg" style="display: none;">
                    </label>
                  </div>
                </div>

                <div v-if="picturesTemp.length > 0">

                  <div class="vx-col w-full ml-auto">
                    <h5>Please click on the below checkbox to</h5>
                    <vs-checkbox class="inline-flex add" v-validate="'required'" v-model="pictures_terms_check" >Confirm you have read and agree to
                      share your picture according to our guidlines.
                    </vs-checkbox>
                    <span class="text-danger text-sm" v-show="errors.has('pictures_terms_check')">This field is required!</span>
                  </div>
                </div>
                <div class="vs-row">
                  <div class="vs-col pt-4">
                    <label style="color:red">Note: Click on the pictures to upload your images</label></div>
                </div>
              </div>
            </div>





          </div>

          <div class="vx-col lg:w-1/1 md:w-1/1 sm:w-1/1 mb-4">
            <h4 class="mb-6">Your Message</h4>
            <div class="vs-component vs-con-textarea vs-textarea-primary"  style="border: 1px solid rgba(0, 0, 0, 0.08);">
              <textarea name="message" class="vs-textarea"  rows="5" v-model="message"></textarea>
            </div>

          </div>
          <div class="vx-row">
            <div class="vx-col sm:w-2/3 w-full ml-auto">
              <vs-button class="mr-3 mb-2" id="button-save" @click="profileSubmit">Submit</vs-button>
            </div>
          </div>

        </vx-card>

      </div>


    </div>



  </div>

</template>
<script>
    require('firebase/firestore')
    import 'firebase/auth'
    //import Datepicker from 'vuejs-datepicker';
    import moment from 'moment'
    import firebase from 'firebase'
    import storage from 'firebase/storage'
    import flatPickr from 'vue-flatpickr-component';
    import 'flatpickr/dist/flatpickr.css';
    // import PhoneMaskInput from  "vue-phone-mask-input";
    import VuePhoneNumberInput from 'vue-phone-number-input';
    import 'vue-phone-number-input/dist/vue-phone-number-input.css';
    import vSelect from 'vue-select';
    import axios from 'axios';

    export default {
        data() {
            return {
                dob_age_message:false,
                phoneValid:'',
                instagram: '',
                twitter:'',
                facebook:'',
                package:'',
                countryCode: '',
                programeOptedTitle:'',
                program_name:'',
                weight_lbs:false,
                weight_kg:false,
                program_end_date:'',
                weight_in_kg:'',
                weight_in_lbs:'',
                feet_inches:'',
                first_name: '',
                last_name: '',
                selectedWeight:'',
                popupActivo:false,
                contactMode: [
                    {text: 'Email', value: 'email'},
                    {text: 'Whatsapp', value: 'whatsapp'},
                    {text: 'Sms', value: 'sms'},
                    {text: 'Phone', value: 'phone'}
                    // {label: 'Phone', value: 'phone'}
                ],
                contact_mode:'',
                height_in_inches: '',
                height_in_centimeter:'',
                height_in_feet: '',
                height_type:'',
                selected: "selected",
                selectedHeight:'',
                program_type_start:'',
                pause_program:false,
                timer: null,
                // resetButton: false,
                activity_level:'1.2',
                bg_protein:'high',
                // format: "yyyy-MM-dd",//format
                dateofbirth: '',//format
                form: {
                    regions: []
                },
                configdateTimePicker: {
                    // enableTime: true,
                    dateFormat: 'm-d-Y'
                },
                foodKinds:[],
                categories: [],
                package_type: [],
                program: [],
                images: [],
                name: '',
                email: '',
                mobile: '',
                // dateofbirth: '',
                gender: '',
                height: '',
                weight: '',
                program_opted: '',
                program_type: '',
                tenure: '',
                health_issue: '',
                health_issue_desc: '',
                food_kind1: '',
                food_kind2: '',
                food_kind3: '',
                food_kind4: '',
                food_kind5: '',
                food_alergy: '',
                food_alergy_desc: '',
                medication_desc: '',
                medication: '',
                pictures: [],
                pictures_terms_check: '',
                special_request: '',
                message: '',
                progressUpload: 0,
                file: File,
                uploadTask: '',
                picturesTemp: [],//{},
                downloadURL: '',
                wasSidebarOpen: null,
                isNavOpen: false,
                days_pause:0,
                days_paused:0,
                programe_pause_count: 0,
                progame_paused_log: [],
                uid:localStorage.getItem('uid'),
                program_tenure:'',
                frontImage:'',
                sideImage:'',
                backImage:'',
                frontImagePreview:'',
                sideImagePreview:'',
                backImagePreview:'',
                defaultImage:'../../assets/images/logo/logo-1.png',
                profileUrl: '',
                // progressUpload: 0,
                // file: File,
                // uploadTask: '',
                imageTemp: {},
                downloadImageURL: '',
                uploadEnd : false,
                uploadProfileTask:'',
                mobileFormat:'',
            }
        },

        components: {
            flatPickr,
            VuePhoneNumberInput,
            'v-select': vSelect
        },
        computed:{
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
        created(){
            var self=this
            this.configdateTimePicker= {
                enableTime: false,
                dateFormat: 'm-d-Y',
                maxDate: "today",
                onChange: function (selectedDates, dateStr, instance) {
                    var diff = moment().diff(dateStr, 'years')
                    if(diff<8){
                        instance.clear()
                        self.dob_age_message=true
                    }else{
                        self.dob_age_message=false
                    }
                },

            },
            this.dob_age_message=false

            this.package_type = []
            this.program = []
            // this.foodKinds = []
            if(this.uid){
                this.getFilesList()
                this.getUserDetail();
            }
            firebase.firestore().collection('package').get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const trainer = {
                        id: doc.id,
                        name: doc.data()['title']
                    }
                    this.package_type.push(trainer)
                })
            })
            firebase.firestore().collection('food-kinds').get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const trainer = {
                        id: doc.id,
                        name: doc.data()['title']
                    }
                    this.foodKinds.push(trainer)
                })
            })

        },
        methods: {
            onClick() {
                axios({
                    url: 'https://backend.xtremeperformance.co.in/mailer/photo-guide.png',
                    method: 'GET',
                    responseType: 'blob',
                }).then((response) => {
                    var fileURL = window.URL.createObjectURL(new Blob([response.data]));
                    var fileLink = document.createElement('a');

                    fileLink.href = fileURL;
                    fileLink.setAttribute('download', 'photo-guide.png');
                    document.body.appendChild(fileLink);

                    fileLink.click();
                });
            },
            onUpdate (payload) {
                this.countryCode = payload.countryCode
                this.mobile = payload.phoneNumber
                this.mobileFormat= payload.formatInternational
                this.phoneValid=payload.isValid
            },
            formatDate(program_type_start){
                return moment(program_type_start).format('MM-DD-YYYY')
            },
            detectProfile(fileList){
                this.imageTemp = fileList
                var image = fileList[0]
                var reader = new FileReader();
                reader.onload = (e) => {
                    // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
                    // Read image as base64 and set to imageData
//              this.frontImage = image
                    this.profileUrl = e.target.result
                }
                reader.readAsDataURL(image);

            },
            changeItem: function changeItem(event) {
                this.selected = event.target.value;
                if(this.selected=='feet'){
                    this.height_in_inches=''
                    this.height_in_feet=''
                }
                else if(this.selected=='inches'){
                    this.height_in_feet=''
                    this.height_in_inches=''
                }
                else if(this.selected=='centimeter'){
                    this.height_in_feet=''
                    this.height_in_inches=''
                    this.height_in_centimeter=''
                }
                else if(this.selected=='feet_inches'){
                    this.height_in_feet=''
                    this.height_in_inches=''
                    this.height_in_centimeter=''

                }
            },
            changeWeight: function changeItem(event) {
                this.selectedWeight = event.target.value;
                if(this.selectedWeight =='kg'){
                    this.weight_in_lbs=''
                }else if(this.selectedWeight =='lbs'){
                    this.weight_in_kg=''
                }
            },
            async profileSubmit() {
                this.loadContent()
                if(this.imageTemp.length > 0){
//                for (let i = 0; i < this.picturesTemp.length; i++){
                    let storageRef =  firebase.storage().ref(localStorage.getItem('uid')+'/'+this.imageTemp[0].name);
                    this.uploadProfileTask = storageRef.put(this.imageTemp[0]);
//                }
                    this.imageTemp = {}
                }
                if(this.picturesTemp.length > 0){
                    if(this.picturesTemp.length <= 3){
                        for (let i = 0; i < this.picturesTemp.length; i++){
                            if(i <= 3){
                                let storageRef = await firebase.storage().ref(this.uid+'/member_three_pics/'+this.picturesTemp[i].name);
                                this.uploadTask = storageRef.put(this.picturesTemp[i]);
                            }
                        }
                        this.picturesTemp = []//{}
                    }else{
                        this.$vs.notify({
                            title: 'Max Files Error',
                            text: 'Please select maximum 3 files',
                            iconPack: 'feather',
                            icon: 'icon-alert-circle',
                            color: 'warning'
                        });
                    }
                }else{
                    this.saveData ()
                }

            },
            socialSave(){
                if(this.instagram !='' ||this.facebook!='' ||this.twitter!='') {
                    const saveProfile = {
//                memberDetail : {
                        instagram: (this.instagram != '') ? this.instagram : '',
                        twitter: (this.twitter != '') ? this.twitter : '',
                        facebook: (this.facebook != '') ? this.facebook : '',

//                }
                    };
                    firebase.firestore().collection("users").doc(this.uid).set(saveProfile, {merge: true})
                    this.$vs.notify({
                        title: '',
                        text: 'Your Profile Is Successfully Updated!',
                        iconPack: 'feather',
                        icon: 'icon-check',
                        color: 'success'
                    });
                }
            },
            getFilesList(){
                var front = ''
                var side = ''
                var back = ''
                var self = this
                var frontListRef = firebase.storage().ref(this.uid+'/member_three_pics/front/');
                frontListRef.listAll().then(function(res) {
                    res.items.forEach(function(itemRef) {
                        itemRef.getDownloadURL().then(function(downloadURL) {
                            front = downloadURL
                        })
                    });
                }).catch(function(error) {
                    console.log(error)
                    console.log('Error, While getting pictures')
                });

                var sideListRef = firebase.storage().ref(this.uid+'/member_three_pics/side/');
                sideListRef.listAll().then(function(res) {
                    res.items.forEach(function(itemRef) {
                        itemRef.getDownloadURL().then(function(downloadURL) {
                            side =downloadURL
                        })
                    });
                }).catch(function(error) {
                    console.log(error)
                    console.log('Error, While getting pictures')
                });

                var backListRef = firebase.storage().ref(this.uid+'/member_three_pics/back/');
                backListRef.listAll().then(function(res) {
                    res.items.forEach(function(itemRef) {
                        itemRef.getDownloadURL().then(function(downloadURL) {
                            back=downloadURL
                        })
                    });
                }).catch(function(error) {
                    console.log(error)
                    console.log('Error, While getting pictures')
                });

                setTimeout(function () {
                    self.backImagePreview = back
                    self.sideImagePreview = side
                    self.frontImagePreview = front
                },3000)
            },
            detectFiles(file, side = null) {
                if(file.length == 0){
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
                    if(side == 'front'){
                        delImageUrl = this.frontImagePreview
                        this.frontImage = image
                        this.frontImagePreview = e.target.result
                        var storageRef = firebase.storage().ref(this.uid+'/member_three_pics/front/'+this.frontImage.name);
                        storageRef.put(this.frontImage);


                    }
                    if(side == 'side'){
                        delImageUrl = this.sideImagePreview
                        this.sideImage = image
                        this.sideImagePreview = e.target.result
                        var storageRef1 = firebase.storage().ref(this.uid+'/member_three_pics/side/'+this.sideImage.name);
                        storageRef1.put(this.sideImage);
                    }
                    if(side == 'back'){
                        delImageUrl = this.backImagePreview
                        this.backImage = image
                        this.backImagePreview = e.target.result
                        var storageRef2 = firebase.storage().ref(this.uid+'/member_three_pics/back/'+this.backImage.name);
                        storageRef2.put(this.backImage);
                    }

                    if(delImageUrl){
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
                // this.$validator.validateAll().then(result => {
                //     if(result) {
                const memberPayLoad = {
                    first_name: this.first_name ? this.first_name : '',
                    last_name: this.last_name ? this.last_name : '',
                    email: this.email ? this.email : '',
                    mobile: this.mobile ? this.mobile : '',
                    gender: this.gender ? this.gender : '',
                    profileUrl: this.profileUrl ? this.profileUrl : '',
                    country_code:this.countryCode?this.countryCode:'',
                    mobileFormat:this.mobileFormat?this.mobileFormat:'',
                    memberDetail: {
                        dateofbirth: this.dateofbirth ?this.dateofbirth : '',
                        height_in_feet: this.height_in_feet ? this.height_in_feet : '',
                        height_in_inches: this.height_in_inches ? this.height_in_inches : '',
                        weight_in_lbs:  (this.selectedWeight == 'lbs')? this.weight_in_lbs : '',
                        weight_in_kg: (this.selectedWeight == 'kg')? this.weight_in_kg : '',
                        bg_protein: this.bg_protein ? this.bg_protein : '',
                        activity_level: this.activity_level ? this.activity_level : '',
                        program_opted: this.program_opted ? this.program_opted : '',
                        program_type: this.program_type ? this.program_type : '',
                        tenure: this.tenure ? this.tenure : '',
                        health_issue: this.health_issue ? this.health_issue : '',
                        health_issue_desc: this.health_issue_desc ? this.health_issue_desc : '',
                        food_kinds: this.form.regions ? this.form.regions : '',
                        food_alergy: this.food_alergy ? this.food_alergy : '',
                        food_alergy_desc: this.food_alergy_desc ? this.food_alergy_desc : '',
                        medication: this.medication ? this.medication : '',
                        medication_desc: this.medication_desc ? this.medication_desc : '',
                        pictures_terms_check: this.pictures_terms_check ? this.pictures_terms_check : '',
                        special_request: this.special_request ? this.special_request : '',
                        message: this.message ? this.message : '',
                        feet_inches: this.feet_inches ? this.feet_inches : '',
                        height_in_centimeter: this.height_in_centimeter ? this.height_in_centimeter : '',
                    }
                }

                firebase.firestore().collection('users').doc(this.uid).get()
                    .then(snap => {
                        return snap.ref.update(memberPayLoad);
                    })
                    .then(() => {
                        console.log('Successfully updated the record')
                    })
                    .catch(error => {
                        console.error('There was an error editing the record: ' + error)
                    })
              /*  }else{
               // form have errors
               }*/
                // })

            },
            getUserDetail() {
                firebase.firestore().collection('users').doc(this.uid).get()
                    .then(snap => {
                        let data = snap.data();
                        let memberObj = data['memberDetail'];
                        this.instagram = data['instagram'];
                        this.twitter = data['twitter'];
                        this.facebook = data['facebook'];
                        this.first_name = data['first_name'];
                        this.last_name = data['last_name'];
                        this.email = data['email'];
                        this.mobile= data['mobile'];
                        this.gender= data['gender'];
                        this.countryCode= data['country_code']?data['country_code']:'IN';
                        this.profileUrl= (data['profileUrl'])?data['profileUrl']:'';
                        this.dateofbirth = memberObj['dateofbirth'];
                        this.height_in_inches=(memberObj['height_in_inches']!='')? memberObj['height_in_inches']:'';
                        this.height_in_feet= memberObj['height_in_feet'];
                        this.height_in_centimeter= (memberObj['height_in_centimeter']!='')?memberObj['height_in_centimeter']:'';
                        // this.weight= memberObj['weight'];
                        this.weight_in_lbs=(memberObj['weight_in_lbs']!='')?memberObj['weight_in_lbs']:'';
                        this.weight_in_kg=(memberObj['weight_in_kg']!='')?memberObj['weight_in_kg']:'';
                        this.selectedWeight=(memberObj['weight_in_kg']!='')?'kg':'lbs'
                        this.selectedHeight=(memberObj['height_in_inches']!='')?'inches':'centimeter'
                        this.bg_protein=memberObj['bg_protein'];
                        this.program_opted= memberObj['program_opted'];
                        this.program_type= memberObj['program_type'];
                        if(memberObj['program_type']){
                            console.log('package data')
                            console.log(memberObj['program_type'])
                            firebase.firestore().collection('package').doc(memberObj['program_type']).get()
                                .then(snap => {
//                firebase.firestore('package').doc(memberObj['program_type']).get().then((snap)=>{
                                    this.package=snap.data().title
                                })
                        }
                        this.activity_level= memberObj['activity_level'];
                        this.tenure = memberObj['tenure'];
                        this.health_issue= memberObj['health_issue'];
                        this.health_issue_desc= memberObj['health_issue_desc'];
                        this.food_alergy= memberObj['food_alergy'];
                        this.food_alergy_desc = memberObj['food_alergy_desc'];
                        this.medication= memberObj['medication'];
                        this.medication_desc= memberObj['medication_desc'];
                        this.pictures_terms_check= memberObj['pictures_terms_check'];
                        this.special_request= memberObj['special_request'];
                        this.message= memberObj['message']?memberObj['message']:'There is not Message';
                        this.categories =  memberObj['food_kinds'];
                        this.form.regions =  memberObj['food_kinds'];
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

                    })
                    .then(() => {
                        console.log('Successfully get user detail.')
                    })
                    .catch(error => {
                        console.error('There was an error editing the record: ' + error)
                    })
            },
            deleteImage (url) {
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
            },
            loadContent() {
                this.$vs.loading()
                setTimeout(() => {
                    this.$vs.loading.close()
                }, 3000);
            },
            customFormatter(date) {
                return date //!= '' ? moment(date).format('MMMM Do YYYY') : '';
            },
            startProgram: function() {
                firebase.firestore().collection('users').doc(this.uid).get()
                    .then(snap => {
                        snap.ref.update({
                            program_type_start:moment().format('YYYY-MM-DD h:mm:ss a')
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
                    }),(error) => {
                    this.$vs.notify({
                        title: 'Error',
                        text: error.message,
                        iconPack: 'feather',
                        icon: 'icon-alert-circle',
                        color: 'danger'
                    });
                }
//            firebase.firestore().collection('package_log').add({log_history:[{user_id:firebase.auth().currentUser.uid,tenure:this.program_tenure}],uid:firebase.auth().currentUser.uid})
//
//              .then(() => {
////                    this.program_type_start='check'
////                    this.pause_program=true
//                    this.$vs.notify({
//                        title: '',
//                        text: 'Your package is successfully started!',
//                        iconPack: 'feather',
//                        icon: 'icon-check',
//                        color: 'success'
//                    });
//
//                })
//                .catch(error => {
//                    console.error('There was an error editing the record: ' + error)
//                }),(error) => {
//                this.$vs.notify({
//                    title: 'Error',
//                    text: error.message,
//                    iconPack: 'feather',
//                    icon: 'icon-alert-circle',
//                    color: 'danger'
//                });
//        }
            },
            resumeProgram: function() {
                let last_paused = this.progame_paused_log.length > 0 ? this.progame_paused_log.slice().reverse() : []
                let last_paused1 = last_paused.length > 0 ? moment(last_paused[0].datetime).format('YYYY-MM-DD') : ''
                let paused_days = last_paused.length > 0 ? last_paused[0].days : 0
                var now = moment(); //todays date
                var end = moment(last_paused1); // another date
                var duration = moment.duration(now.diff(end));
                var days = this.days_paused - parseInt(duration.asDays());
                var days1 = paused_days - parseInt(duration.asDays());
                if(days > 0) {
                    this.progame_paused_log[this.progame_paused_log.length - 1]['endedEarlier'] = moment().format('YYYY-MM-DD h:mm:ss a')
                    this.progame_paused_log[this.progame_paused_log.length - 1]['endedEarlierDays'] = days1
                    this.progame_paused_log[this.progame_paused_log.length - 1]['is_resumed_earlier'] = true
                    const pause = {
                        days_paused: days,
                        progame_paused_log: this.progame_paused_log
                    }
                    firebase.firestore().collection('users').doc(localStorage.getItem('uid')).get()
                        .then(snap => {
                            this.popupActivo = false
                            snap.ref.update(pause);
                            if(this.uid){
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
            pauseProgram: function() {
                this.progame_paused_log.push({
                    datetime: moment().format('YYYY-MM-DD h:mm:ss a'),
                    days: this.days_pause
                })
                const pause = {
                    days_paused: this.days_paused + this.days_pause,
                    programe_pause_count: this.programe_pause_count + 1,
                    progame_paused_log: this.progame_paused_log
                }

                firebase.firestore().collection('users').doc(localStorage.getItem('uid')).get()
                    .then(snap => {
                        this.popupActivo=false
                        snap.ref.update(pause);
                        if(this.uid){
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
        },
        mounted() {
            this.wasSidebarOpen = this.$store.state.reduceButton;
            this.$store.commit('TOGGLE_REDUCE_BUTTON', true)
        },
        beforeDestroy() {
            if (!this.wasSidebarOpen) this.$store.commit('TOGGLE_REDUCE_BUTTON', false)
        },
        watch: {
            uploadTask: function () {
                this.uploadTask.on('state_changed', () => {},
                    null,
                    () => {
                        this.pictures = this.getFilesList()
                    })
            },
            frontImagePreview: function () {
                if(this.frontImagePreview){
                    this.frontImagePreview = this.frontImagePreview
                }
            },
            sideImagePreview: function () {
                if(this.sideImagePreview){
                    this.sideImagePreview = this.sideImagePreview
                }
            },
            backImagePreview: function () {
                if(this.backImagePreview){
                    this.backImagePreview = this.backImagePreview
                }
            },
            uploadProfileTask:function () {
                this.uploadProfileTask.on('state_changed', sp => {
                        // this.progressUpload = Math.floor(sp.bytesTransferred / sp.totalBytes * 100)
                    },
                    null,
                    () => {
                        this.uploadProfileTask.snapshot.ref.getDownloadURL().then(downloadURL => {
                            if(downloadURL != ''){
                                this.profileUrl = downloadURL
                                this.saveData ()
                            }
                        })
                    })
            }
        },
    }
</script>

<style>
  .p-image{
    /*width: 200px;*/
    /*height: 200px;*/
    /*margin: 0 auto;*/
    /*border-radius: 50%;*/
    overflow: hidden;
    /*border: 1px solid #ccc;*/
  }
  .p-image img{
    width: 100%;
    height: 100%;
  }
  legend {
    font-size: 20px;
    color: #000;
    padding: 0 10px;
    border: 0;
    text-transform: capitalize;
  }
  fieldset {
    padding: 20px;
    border-radius: 8px;
    margin: 6px 6px 20px;
    border: 1px solid rgb(115, 103, 240);
    -webkit-box-shadow: 2px 5px 10px -3px rgba(115, 103, 240, .7);
    box-shadow: 2px 5px 10px -3px rgba(115, 103, 240, .7);
  }
  .member-profile .progress-bar {
    margin: 10px 0;
    background-color: red;
    height: 25px;
    color:#fff;
  }
  .member-profile .gender-radio li{width:33%}
  .member-profile .progress-bar b{
    padding: 3px 5px;
  }
  #form{
    width: 650px;
    margin: 0 auto;
  }
  #form input[type="file"]{
    margin: 20px 0 0;
  }
  .member-profile span{
    font-size: 14px;
    text-transform: capitalize;
  }
  .member-profile .input-span-placeholder  {
    font-size: .85rem !important;
  }
  .member-profile .vs-radio--label{
    font-size: 14px;
  }
  .member-profile .con-slot-label{
    font-size:12px;
  }
  .member-profile .avatars{height:250px;}
  .member-profile .avatars img{width: 100%;height:100%;}

  .member-profile form ul li{
    width: 100%;
    margin-right: 0 !important;
    margin-top: 5px !important;
  }
  .member-profile .con-vs-checkbox{
    width: 100%;
    margin-top:5px;
  }
  .member-profile .con-vs-checkbox.add{
    width: 100%;
  }
  /*.member-profile .vs-checkbox{*/
  /*width:15px !important;*/
  /*height:15px !important;*/
  /*}*/
  .member-profile .dateofbirth{
    width: 100%;
    color: inherit;
    padding: .7rem;
    font-size: 1rem;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.2);
  }
  .member-profile h5{text-transform:capitalize;}
  .member-profile #start{
    border: 0;
    background: none;
  }
  .member-profile #timer {
    /*font-size: 200px;*/
    line-height: 1;
    margin-bottom: 20px;
  }
  .member-profile .fieldset{
    padding: 10px;
    border-radius: 8px;
    /*margin: 6px 6px 20px;*/
  }
  .member-profile .legend {
    font-size: 20px;
    color: #000;
    border: 0;
  }
  /*.member-profile .personalize-section,.member-profile .image-section, .member-profile .miscellaneous-section, .member-profile .activity-axercise-section, .member-profile .programs-packages-section, .member-profile .food-health-section{padding-bottom: 20px;}*/
  .member-profile .personalize-section h4, .member-profile .weight-section h4, .member-profile .height-section h4, .member-profile .activity-axercise-section h4, .member-profile .image-section h4, .member-profile .programs-packages-section h4, .member-profile .food-health-section h4, .member-profile .miscellaneous-section h4{margin-bottom: 20px;text-decoration: underline;padding:0 !important;}
  .member-profile .personalize-section ul{display:inline-flex; width: 100%;}
  .member-profile .personalize-section ul li{width: 33% !important;}
  #form h5{text-transform: capitalize;}
</style>
