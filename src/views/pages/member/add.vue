<template>
  <div class="form-holder">
    <div id="form" class="register-form">
      <div class="vx-row">
        <div class="vx-col md:w-1/1 w-full mb-base" style="margin: 0 auto;">
          <vx-card>

            <h1 class="mx-auto; w-full" style="display:block; text-align: center; margin: 20px 0 0;">Add New Member</h1>
            <p style="margin:0 0 20px; text-align: center;">Fill the below form to create a new account.</p>
            <div class="personalize-section">
              <div class="vx-col">

                <h4 class="">Personalize</h4>

              </div>

              <div class="vx-row">


                <div class="vx-col lg:w-1/2 md:w-1/2 sm:w-full xs:w-full mb-4">


                  <div class="vx-col w-full">
                    <vs-input label="First Name" class="w-full" v-validate="'required|alpha_spaces'" name="first_name" v-model="first_name"
                              placeholder="First Name"  data-vv-validate-on="blur"/>
                    <span class="text-danger text-sm" v-show="errors.has('first_name')">{{ errors.first('first_name') }}</span>
                  </div>
                </div>
                <div class="vx-col lg:w-1/2 md:w-1/2 sm:w-full xs:w-full mb-4">

                  <div class="vx-col w-full">

                    <vs-input label="Last Name" class="w-full" v-validate="'required|alpha_spaces'" name="last_name" v-model="last_name"
                              data-vv-validate-on="blur" placeholder="Last Name"/>
                    <span class="text-danger text-sm" v-show="errors.has('last_name')">{{ errors.first('last_name') }}</span>
                  </div>

                </div>

                <div class="vx-col lg:w-1/1 md:w-1/1 sm:w-full xs:w-full mb-4">

                  <div class="vx-col w-full">
                    <div class="vx-row">
                      <div class="vx-col lg:w-1/2 md:w-1/2 sm:w-full xs:w-full">
                        <label style="font-size: 11.9px;">Gender</label>
                        <br/>

                        <ul>
                          <li>
                            <vs-radio v-model="gender" vs-value="male" name="gender" v-validate="'required'">Male</vs-radio>
                          </li>
                          <li>
                            <vs-radio v-model="gender" vs-value="female" name="gender" v-validate="'required'">Female</vs-radio>
                          </li>
                          <li>
                            <vs-radio v-model="gender" vs-value="other" name="gender" v-validate="'required'">Other</vs-radio>
                          </li>
                          <span class="text-danger text-sm" v-show="errors.has('gender')">{{ errors.first('gender') }}</span>


                        </ul>

                      </div>
                      <div class="vx-col lg:w-1/2 md:w-1/2 sm:w-full xs:w-full">

                      </div>
                    </div>
                  </div>

                </div>
                <div class="vx-col lg:w-1/2 md:w-1/2 sm:w-full mb-4">

                  <div class="vx-col w-full">

                    <div>
                      <label style="font-size: 11.9px">Mobile</label>
                       <VuePhoneNumberInput v-model="mobile" @update="onUpdate" :default-country-code="countryCode"  class="w-full" name="Phone" placeholder="Mobile"/>

                      <span class="text-danger text-sm" v-if="phoneValid===false">Please enter Your Valid Mobile Number</span>

                    </div>
                  </div>
                </div>
                <div class="vx-col lg:w-1/2 md:w-1/2 sm:w-full mb-4">
                </div>
                <div class="vx-col lg:w-1/2 md:w-1/2 sm:w-full mb-4 dof" style="position: relative;">
                  <label style="font-size: 11.9px">Date of Birth</label>
                  <flat-pickr name="Date Of Birth" v-validate="'required'" :config="configdateTimePicker" v-model="dateofbirth" placeholder="Select Date of Birth" style="width: 100%;" />
                  <feather-icon icon="CalendarIcon" @click="visiblePassword" class="inline-block mr-2 dp-icon" svgClasses="w-5 h-5"></feather-icon>
                    <span class="text-danger text-sm"  v-show="errors.has('Date Of Birth')">{{ errors.first('Date Of Birth') }}</span>
                    <br/>
                    <span class="text-danger text-sm"  v-if="dob_age_message == true" >You should be over 7 years to register</span>
                </div>
                <div class="vx-col lg:w-1/2 md:w-1/2 sm:w-full mb-4">

                </div>
                <div class="vx-col lg:w-1/2 md:w-1/2 sm:w-full mb-4">

                  <div class="vx-col w-full">

                    <vs-input label="Email" class="w-full" v-validate="'required|email'" name="email" type="email" v-model="email"
                              data-vv-validate-on="blur" placeholder="Email"/>
                    <span class="text-danger text-sm" v-show="errors.has('email')">{{ errors.first('email') }}</span>

                  </div>
                </div>
                <div class="vx-col lg:w-1/2 md:w-1/2 sm:w-full mb-4">

                </div>

                <div class="vx-col lg:w-1/2 md:w-1/2 sm:w-full mb-4">

                  <div class="vx-col w-full" style="position: relative">

                    <vs-input label="Password" class="w-full" v-validate="'required|min:6|max:10'" ref="password"
                              name="password" v-model="password" placeholder="Password"
                              :type="passwordFieldType"
                    />
                    <feather-icon icon="EyeIcon" @click="visiblePassword" class="inline-block mr-2 cstm-icon" svgClasses="w-5 h-5"></feather-icon>
                    <span class="text-danger text-sm"
                          v-show="errors.has('password')">{{ errors.first('password') }}</span>
                  </div>
                </div>
                <div class="vx-col lg:w-1/2 md:w-1/2 sm:w-full mb-4">

                </div>
                <div class="vx-col lg:w-1/2 md:w-1/2 sm:w-full mb-4">
                  <div class="vx-row">
                    <div class="vx-col lg:w-1/2 md:w-1/2 sm:w-full">
                      <div class="vx-col w-full" v-if="selectedWeight =='kg'">
                        <vs-input label="Weight" type="number" name="weight_in_kg" v-model="weight_in_kg" class="w-full"
                                  placeholder="Weight in kg" />
                        <span class="text-danger text-sm"
                              v-if="weight_kg==true">weight in kg is required</span>
                      </div>
                      <div class="vx-col w-full" v-if="selectedWeight =='lbs'">
                        <vs-input label="Weight" type="number" name="weight_in_lbs" v-model="weight_in_lbs" class="w-full"
                                  placeholder="Weight in Lbs" />
                        <span class="text-danger text-sm"
                              v-if="weight_lbs==true">weight in lbs is required</span>
                      </div>

                    </div>
                    <div class="vx-col lg:w-1/2 md:w-1/2 sm:w-full ">
                      <div class="vx-col w-full">
                        <label style="font-size: 11.9px;"> Unit</label>
                        <ul>

                          <li style="margin-top:10px;">
                            <vs-radio v-model="selectedWeight" vs-value="kg" name="weight" v-validate="'required'">Kg</vs-radio>
                          </li>
                          <li style="margin-top:10px;">
                            <vs-radio v-model="selectedWeight" vs-value="lbs" name="weight" v-validate="'required'">Lbs</vs-radio>
                          </li>

                          <span class="text-danger text-sm" v-show="errors.has('weight')">{{ errors.first('weight') }}</span>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="vx-col lg:w-1/2 md:w-1/2 sm:w-full mb-4"></div>

                <div class="vx-col lg:w-1/ md:w-1/2 sm:w-full mb-4">
                  <div class="vx-row">
                    <div class="vx-col lg:w-1/2 md:w-1/2 sm:w-full">

                      <div class="vx-col w-full" v-if="selectedHeight=='inches'">
                        <vs-input label="Height" type="number"
                                  v-model="height_in_inches"
                                  class="w-full"
                                  name="height_in_inches"
                                  placeholder="Inches"/>
                        <span class="text-danger text-sm" v-show="errors.has('height_in_inches')">The height in Inches field is required and may only contain numeric characters</span>
                      </div>
                      <div v-if="selectedHeight=='centimeter'" class="vx-col w-full">
                        <vs-input label="Height" type="number"
                                  v-model="height_in_centimeter"
                                  v-if="selectedHeight=='centimeter'"
                                  class="w-full"
                                  name="height_in_centimeter"
                                  placeholder="Centimeter"/>
                        <span class="text-danger text-sm" v-show="errors.has('height_in_centimeter')">The height in Centimeter field is required and may only contain numeric characters</span>
                      </div>
                    </div>
                    <div class="vx-col lg:w-1/2 md:w-1/2 sm:w-full">
                      <label style="font-size: 11.9px;"> Unit</label>
                      <ul>

                        <li style="margin-top:10px;">
                          <vs-radio v-model="selectedHeight" vs-value="inches" name="weight" v-validate="'required'">In</vs-radio>
                        </li>
                        <li style="margin-top:10px;">
                          <vs-radio v-model="selectedHeight" vs-value="centimeter" name="weight" v-validate="'required'">Cm</vs-radio>
                        </li>

                      </ul>

                    </div>
                  </div>

                </div>


                <div class="vx-col lg:w-1/2 md:w-1/2 sm:w-full mb-4">

                </div>

                <div class="vx-col lg:w-1/2 md:w-1/2 sm:w-full xs:w-full mb-4">


                  <div class="vx-col w-full">
                    <vs-input label="Location" class="w-full" v-validate="'required'" name="location" v-model="location"
                              placeholder="Location"  data-vv-validate-on="blur"/>
                    <span class="text-danger text-sm" v-show="errors.has('location')">{{ errors.first('location') }}</span>
                  </div>
                </div>

                <div class="vx-col lg:w-1/2 md:w-1/2 sm:w-full xs:w-full mb-4">
                </div>
                <div class="vx-col lg:w-1/1 md:w-1/1 sm:w-full xs:w-full mb-4">

                  <div class="vx-col w-full">

                    <vs-input label="Address" class="w-full" v-validate="'required'" name="address" v-model="address"
                              data-vv-validate-on="blur" placeholder="Address"/>
                    <span class="text-danger text-sm" v-show="errors.has('address')">{{ errors.first('address') }}</span>
                  </div>

                </div>

              </div>
            </div>


            <div class="activity-axercise-section">
              <div class="vx-col">

                <h4 class="" style="padding: 0;">Activity Level & Exercise</h4>

              </div>

              <div class="vx-col pb-4">
                <h5> Select Activity Level</h5>
                <ul class="demo-alignment gender">
                  <li><vs-radio v-model="activity_level" name="activity_level" vs-value="1.2" v-validate="'required'">Sedentary</vs-radio> </li>
                  <li><vs-radio v-model="activity_level" name="activity_level" vs-value="1.375" v-validate="'required'">Light Activity</vs-radio> </li>
                  <li><vs-radio v-model="activity_level" name="activity_level" vs-value="1.55" v-validate="'required'">Moderately Active</vs-radio> </li>
                  <li><vs-radio v-model="activity_level" name="activity_level" vs-value="1.725" v-validate="'required'">Very Active</vs-radio> </li>
                </ul>
                <span class="text-danger text-sm" v-show="errors.has('activity_level')">{{ errors.first('activity_level') }}</span>
              </div>

              <div class="vx-col pb-4" style="display: none">
                <h5>Adjust protein</h5>
                <ul class="demo-alignment gender">
                  <li><vs-radio v-model="bg_protein" vs-value="low" name="bg_protein" :selected="true">Low</vs-radio> </li>
                  <li><vs-radio v-model="bg_protein" vs-value="normal" name="bg_protein" >Normal</vs-radio> </li>
                  <li><vs-radio v-model="bg_protein" vs-value="high" name="bg_protein">High</vs-radio> </li>
                </ul>
                <span class="text-danger text-sm" v-show="errors.has('bg_protein')">{{ errors.first('bg_protein') }}</span>

              </div>
              <div class="vx-col pb-4">

                <h5>How many day a week you can work out</h5>
                <div class="vx-col w-full ml-auto">
                </div>
                <div class="vx-col w-full ml-auto">
                  <ul class="demo-alignment days">
                    <li>

                      <label class="vs-component con-vs-radio vs-radio-primary">
                        <input type="radio" class="vs-radio--input" name="tenure" v-model="tenure" value="1" v-validate="'required'">
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
                        <input type="radio" class="vs-radio--input" name="tenure" v-model="tenure" value="2" v-validate="'required'">
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
                        <input type="radio" class="vs-radio--input" name="tenure" v-model="tenure" value="3" v-validate="'required'">
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
                        <input type="radio" class="vs-radio--input" name="tenure" v-model="tenure" value="4" v-validate="'required'">
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
                        <input type="radio" class="vs-radio--input" name="tenure" v-model="tenure" value="5" v-validate="'required'">
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
                        <input type="radio" class="vs-radio--input" name="tenure" v-model="tenure" value="6" v-validate="'required'">
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
                  <span class="text-danger text-sm" v-show="errors.has('tenure')">{{errors.first('tenure')}} </span>
                </div>
              </div>


            </div>

            <div class="programs-packages-section">

              <div class="vx-col">
                <h4>Programs & packages</h4>
              </div>


              <div class="vx-col w-full ml-auto">
                <h5>Select Program you want to Opted</h5>
                <ul class="demo-alignment">
                  <li v-for="(region, index) in program" :key="index">
                    <vs-radio v-model="program_opted" :vs-value="region.id" name="program_opted" v-validate="'required'">{{region.name}}</vs-radio>
                  </li>
                </ul>
                <span class="text-danger text-sm" v-show="errors.has('program_opted')">{{errors.first('program_opted')}} </span>
              </div>
              <br/>

              <div class="vx-col w-full ml-auto">
                <h5>Select Package Type</h5>
                <ul class="demo-alignment">
                  <li v-for="(region, index) in package" :key="index">
                    <vs-radio v-model="program_type" :vs-value="region.id" name="program_type" v-validate="'required'">{{region.name}}</vs-radio>
                  </li>
                </ul>
                <span class="text-danger text-sm" v-show="errors.has('program_type')">{{errors.first('program_type')}} </span>
              </div>

            </div>

            <div class="food-health-section">
              <div class="vx-col">
                <h4>Food & Health</h4>
              </div>


              <div class="vx-col w-full ml-auto mb-6">
                <h5>Do you have any health issue/issues?</h5>
                <ul class="demo-alignment">
                  <li>

                    <label class="vs-component con-vs-radio vs-radio-primary">
                      <input name="health_issue" v-model="health_issue" type="radio" class="vs-radio--input"
                             value="yes" v-validate="'required'">
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
                  <li>
                    <label class="vs-component con-vs-radio vs-radio-primary">
                      <input name="health_issue" v-model="health_issue" type="radio" class="vs-radio--input"
                             value="no" v-validate="'required'">
                      <span class="vs-radio">
                                          <span class="vs-radio--borde" style="border: 2px solid rgb(200, 200, 200);">
                                          </span>
                                          <span class="vs-radio--circle"></span>
                                      </span>
                      <span class="vs-radio--label">No
                                      </span>
                    </label>
                  </li>

                </ul>
                <span class="text-danger text-sm" v-show="errors.has('health_issue')">{{errors.first('health_issue')}} </span>

              </div>


              <div  v-if="health_issue != '' && health_issue === 'yes'">
                <h5 class="mb-2">if yes then mention it below</h5>
                <div class="vx-row">
                  <div class="vx-col w-full">
                    <vs-input class="w-full" v-if="health_issue !='' && health_issue === 'yes'" v-validate="'required'"
                              name="health_issue_desc" placeholder="Health Issue Description" type="text"
                              v-model="health_issue_desc"/>
                    <span class="text-danger text-sm" v-show="errors.has('health_issue_desc')">{{errors.first('health_issue_desc')}}</span>
                  </div>
                </div>
              </div>


              <div class="vx-row mb-4">

                <div class="vx-col w-full ml-auto food">
                  <h5>What kind of food you can eat?</h5>

                  <vs-checkbox v-for="(region, index) in options" :key="index" v-model="form.regions"
                               :vs-value="region.id"  v-validate="'required'"
                               name="food_kind" >{{ region.name }}
                  </vs-checkbox>

                </div>
                <span class="text-danger text-sm" v-show="errors.has('food_kind')">{{errors.first('food_kind')}}</span>
              </div>


              <div class="vx-col w-full ml-auto mb-6">
                <h5>Any kind of food allergy?</h5>
                <ul class="demo-alignment">
                  <li>
                    <label class="vs-component con-vs-radio vs-radio-primary">
                      <input name="food_alergy" v-model="food_alergy" type="radio" class="vs-radio--input"
                             value="yes" v-validate="'required'">
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
                  <li>
                    <label class="vs-component con-vs-radio vs-radio-primary">
                      <input name="food_alergy" v-model="food_alergy" type="radio" class="vs-radio--input" value="no" v-validate="'required'">
                      <span class="vs-radio">
                                          <span class="vs-radio--borde" style="border: 2px solid rgb(200, 200, 200);">
                                          </span>
                                          <span class="vs-radio--circle"></span>
                                      </span>
                      <span class="vs-radio--label">No
                                      </span>
                    </label>
                  </li>

                </ul>
                <span class="text-danger text-sm" v-show="errors.has('food_alergy')">{{errors.first('food_alergy')}}</span>
              </div>


              <div v-if="food_alergy != '' && food_alergy === 'yes'">

                <div class="vx-row mb-4">
                  <div class="vx-col w-full">
                    <h5 class="mb-2">if yes then mention it below</h5>
                    <vs-input class="w-full" v-if="food_alergy!= '' && food_alergy === 'yes'" v-validate="'required'"
                              name="food_allergy_desc" placeholder="Food Allergy Description" type="text"
                              v-model="food_alergy_desc"/>
                    <span class="text-danger text-sm" v-show="errors.has('food_allergy_desc')">{{errors.first('food_allergy_desc')}}</span>
                  </div>
                </div>
              </div>



              <div class="vx-col w-full ml-auto">
                <h5>Are you currently On/Were any kind of medication</h5>
                <ul class="demo-alignment">
                  <li>
                    <vs-radio v-model="medication" vs-value="yes"  v-validate="'required'" name="medication">Yes</vs-radio>
                  </li>
                  <li>
                    <vs-radio v-model="medication" vs-value="no" v-validate="'required'" name="medication">No</vs-radio>

                  </li>

                </ul>
                <span class="text-danger text-sm" v-show="errors.has('medication')">{{errors.first('medication')}}</span>

              </div>

            </div>
            <div  v-if="medication != '' && medication === 'yes'">
              <h5 class="mb-2">if yes then mention it below</h5>
              <div class="vx-row">
                <div class="vx-col w-full">
                  <vs-input class="w-full" v-if="medication !='' && medication === 'yes'" v-validate="'required'"
                            name="Medication Description" placeholder="Medication Description" type="text"
                            v-model="medication_desc"/>
                  <span class="text-danger text-sm" v-show="errors.has('Medication Description')">{{errors.first('Medication Description')}}</span>
                </div>
              </div>
            </div><br>
            <div class="image-section">
              <div class="vx-col">
                <h4 style="display: inline;">Body Image </h4>(<span style="text-decoration: none;"><a style="text-decoration: none; cursor:pointer;"  @click="onClick()"> Click Here For Photo Guide</a></span>)

              </div>
              <div class="vx-row mb-4">
                <div class="vx-col lg:w-1/3 mb-2">
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
                <div class="vx-col lg:w-1/3 mb-2">
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
                <div class="vx-col lg:w-1/3 mb-2">
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
                    <label style="color:red">Note: Click on the Body Image for Upload Images</label></div>
                </div>
              </div>
            </div>
            <div class="miscellaneous-section">
              <div class="vx-col">
                <h4>Miscellaneous</h4>
              </div>

              <div class="vx-col w-full">
                <h5 class="mb-2">Any special request which you would like to mention to your trainer coach?</h5>
                <vs-input class="w-full" type="text" v-model="special_request"/>
              </div>

              <div class="vx-col w-full">

                <div class="mt-5">
                  <h5 class="mb-2">Your Message</h5>
                  <div class="vs-component vs-con-textarea vs-textarea-primary"
                       style="border: 1px solid rgba(0, 0, 0, 0.08);">
                    <textarea v-validate="'alpha_spaces'" name="message" class="vs-textarea" v-model="messages"></textarea>
                  </div>
                  <span class="text-danger text-sm" v-show="errors.has('message')">{{errors.first('message')}}</span>

                </div>
              </div>

            </div>

            <div class="vx-row">
              <div class="vx-col sm:w-2/3 w-full">
                <vs-button class="mr-3 mb-2" id="button-save" @click="saveData()">Submit</vs-button>
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
    import moment from 'moment'
    import firebase from 'firebase'
    import storage from 'firebase/storage'
    import router from '@/router'
    import flatPickr from 'vue-flatpickr-component';
    import 'flatpickr/dist/flatpickr.css';
    import vSelect from 'vue-select';
    import PhoneMaskInput from  "vue-phone-mask-input";
    // For custom error message
    import { Validator } from 'vee-validate';
    import axios from 'axios';
    import VuePhoneNumberInput from 'vue-phone-number-input';
    import 'vue-phone-number-input/dist/vue-phone-number-input.css';
    const dict = {
        custom: {
            termCondition: {
                checked: value => value === true
            },
            first_name: {
                required: 'Please enter your first name',
                alpha_spaces: "Your first name may only contain alphabetic characters"
            },
            last_name: {
                required: 'Please enter your last name',
                alpha_spaces: "Your last name may only contain alphabetic characters"
            },
            email:{
                required: 'Please enter your email',
            },
            password:{
                required: 'Please enter your password',

            },
            location:{
                required: 'Please enter your location',
            },
            address:{
                required: 'Please enter your address',
            },

            weight_in_kg:{
                required: 'Please enter your weight in kg',
                numeric: "Weight in KG only contain numeric characters"
            },
            weight_in_lbs:{
                required: 'Please enter your weight in lbs',
                numeric: "Weight in lbs only contain numeric characters"
            },
            activity_level: {
                required: 'Please Select Activity Level'
            },
            gender:{
                required:'Please Select Gender'
            },
            program_opted:{
                required:'Please Select Program opted'
            },
            program_type:{
                required:'Please Select Program Type'
            },
            tenure:{
                required:'Please Select Days for Workout'
            },
            health_issue:{
                required:'Please Select Health Issue'
            },
            food_kind:{
                required:'Please Select Food Kind'
            },
            food_alergy:{
                required:'Please Select Food Allergy'
            },
            medication:{
                required:'Please Select Any Kind of Meditation'
            },
            health_issue_desc:{
                required:'Please Enter your Health Issue Description'
            },
            food_allergy_desc:{
                required:'Please Enter your Food Allergy Description'
            }

        }
    };
    Validator.localize('en', dict);

    export default {

        data() {
            return {
                dob_age_message:false,
                phoneValid:'',
                mobileFormat: '',
                countryCode: 'IN',
                medication_desc: '',
                regex: "",
                address:'',
                location:'',
                passwordFieldType: 'password',
                confirmPasswordFieldType: 'password',
                value: String,
                first_name: '',
                last_name: '',
                email: '',
                password: '',
                confirm_password: '',
                mobile: '',
                weight_in_kg:'',
                weight_kg:false,
                weight_in_lbs:'',
                weight_lbs:false,
                selectedWeight:'kg',
                selectedHeight: "inches",
                feet_inches:'',
                height_in_inches: '',
                height_in_centimeter:'',
                height_in_feet: '',
                height_feet:false,
                height_inches:false,
                height_centimeter:false,
                configdateTimePicker: {
                    enableTime: false,
                    dateFormat: 'm-d-Y'
                },
                activity_level:'',
                bg_protein:'low',
                gender: 'male',
                program: [],
                package: [],
                program_opted: '',
                program_type: '',
                tenure: '',
                health_issue: '',
                health_issue_desc: '',
                food_kinds: '',
                food_alergy: '',
                food_alergy_desc: '',
                medication: '',
                pictures: {},
                pictures_terms_check: false,
                uploadTask: '',
                picturesTemp: [],
                downloadURL: '',
                uploadEnd: false,
                file: File,
                form: {
                    regions: []
                },
                isTermsConditionAccepted: false,
                term_condition:false,
                messages: '',
                date_of_birth: false,
                food_kind_valid:false,
                special_request: '',
                assignedTrainerUID: '',


                rowId: 10,

                height_type:'',
                options: [],
                images: [],
                name: '',
                dateofbirth: '',
                progressUpload: 0,

                wasSidebarOpen: null,
                isNavOpen: false,
                payload: [],
                previewImages: [],
                frontImage:'',
                sideImage:'',
                backImage:'',
                frontImagePreview:'',
                sideImagePreview:'',
                backImagePreview:'',
                defaultImage:'../../assets/images/logo/logo-1.png',

            }
        },
        computed: {
        },
        components: {
            flatPickr,
            'v-select': vSelect,
            VuePhoneNumberInput,
        },
        created(){
            this.program = []
            this.package_type = []
            this.foodKinds = []
            this.options = []
            this.status = []
            this.program = []
            this.package = []
            firebase.firestore().collection('program-opted').get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const trainer = {
                        id: doc.id,
                        name: doc.data()['title']
                    }
                    this.program.push(trainer)
                })
            })
            firebase.firestore().collection('package').get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const trainer = {
                        id: doc.id,
                        name: doc.data()['title']
                    }
                    this.package.push(trainer)
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

        },
        methods: {
            onUpdate (payload) {
                this.countryCode = payload.countryCode
                this.mobile = payload.phoneNumber
                this.mobileFormat= payload.formatInternational
                this.phoneValid=payload.isValid

            },
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
            visiblePassword(){
                this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password'
            },
            changeItem: function changeItem(event) {
                this.selected = event.target.value;
            },
            changeWeight: function changeItem(event) {
                this.selectedWeight = event.target.value;
            },
            initValues() {
                this.options = []
                this.status = []
                firebase.firestore().collection('food-kinds').get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        const trainer = {
                            id: doc.id,
                            name: doc.data()['title']
                        }
                        this.options.push(trainer)
                    })
                })
            },
            deleteImage(index) {
                this.picturesTemp.splice(index, 1)
                this.previewImages.splice(index, 1)
                this.previewImage()
            },
            loadImagePreview(){
                this.previewImages = []
                for(var i = 0; i <= this.picturesTemp.length -1; i++){
                    this.previewImage(this.picturesTemp[i])
                }
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
                // Define a callback function to run, when FileReader finishes its job
                reader.onload = (e) => {
                    // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
                    // Read image as base64 and set to imageData
                    if(side == 'front'){
                        this.frontImage = image
                        this.frontImagePreview = e.target.result
                    }
                    if(side == 'side'){
                        this.sideImage = image
                        this.sideImagePreview = e.target.result
                    }
                    if(side == 'back'){
                        this.backImage = image
                        this.backImagePreview = e.target.result
                    }
                }
                // Start the reader job - read file as a data url (base64 format)
                reader.readAsDataURL(image);

            },

            previewImage: function(file) {
                // Ensure that you have a file before attempting to read it
                if (file) {
                    // create a new FileReader to read this image and convert to base64 format
                    var reader = new FileReader();
                    // Define a callback function to run, when FileReader finishes its job
                    reader.onload = (e) => {
                        // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
                        // Read image as base64 and set to imageData
                        this.previewImages.push(e.target.result)
                    }
                    // Start the reader job - read file as a data url (base64 format)
                    reader.readAsDataURL(file);
                }
            },
            async profileSubmit() {
                this.loadContent()
                if(this.picturesTemp.length > 0){
                    if(this.picturesTemp.length <= 3){
                        for (let i = 0; i < this.picturesTemp.length; i++){
                            if(i <= 3){
                                let storageRef = await firebase.storage().ref(this.uid+'/member_three_pics/'+this.picturesTemp[i].name);
                                this.uploadTask = storageRef.put(this.picturesTemp[i]);
                            }
                        }
                        this.picturesTemp = []
                    }else{
                        this.$vs.notify({
                            title: 'Max Files Error',
                            text: 'Please select maximum 3 files',
                            iconPack: 'feather',
                            icon: 'icon-alert-circle',
                            color: 'warning'
                        });
                    }
                }
            },
            saveData () {
                this.$validator.validateAll().then(result => {
                    if(this.selectedWeight =='kg' && this.weight_in_kg ==''){
                        this.weight_kg=true
                    }
                    if(this.selectedWeight =='lbs' && this.weight_lbs == ''){
                        this.weight_lbs=true
                    }
                    if(this.selected=='feet_inches' || this.selected=='feet'){
                        this.height_feet=true
                    }
                    if(this.selected=='centimeter'){
                        this.height_centimeter=true
                    }
                    if(this.selected =='inches' || this.selected=='feet_inches'){
                        this.height_inches=true
                    }
                    if(this.dateofbirth==''){
                        this.date_of_birth=true
                    }

                      if (result && this.dateofbirth != '' && this.form.regions['0']!=undefined) {

                          const memberPayLoad = {
                              first_name: this.first_name ? this.first_name : '',
                              last_name: this.last_name ? this.last_name : '',
                              email: this.email ? this.email : '',
                              mobile: this.mobile ? this.mobile : '',
                              country_code:this.countryCode?this.countryCode:'',
                              mobileFormat:this.mobileFormat?this.mobileFormat:'',
                              gender: this.gender ? this.gender : '',
                              role: 'member',
                              status:true,
                              address:this.address?this.address:'',
                              location:this.location?this.location:'',
                              createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                              memberDetail: {
                                  dateofbirth: this.dateofbirth ? this.dateofbirth : '',
                                  height_in_inches:this.height_in_inches?this.height_in_inches:'',
                                  height_in_feet:this.height_in_feet?this.height_in_feet: '',
                                  height_in_centimeter: this.height_in_centimeter ? this.height_in_centimeter : '',
                                  weight_in_lbs:  (this.selectedWeight == 'lbs')? this.weight_in_lbs : '',
                                  weight_in_kg: (this.selectedWeight == 'kg')? this.weight_in_kg : '',
                                  bg_protein: this.bg_protein ? this.bg_protein : 'low',
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
                              },
                          }
                          firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
                              .then((user) => {
                                  this.uid = user.user.uid
                                  this.profileSubmit()
                                  firebase.firestore().collection("users").doc(user.user.uid).set(memberPayLoad, {merge: true})
                              })
                              .then(() => {
                                      const formData = new FormData();
                                      formData.append('name', this.first_name+' '+this.last_name);
                                      formData.append('email', this.email);
                                      formData.append('password', this.password);
                                      formData.append('subject', 'Welcome to Xtreme Performance');
                                      formData.append('type', 'accountCredential');

                                      axios.post('https://backend.xtremeperformance.co.in/mailer/email.php', formData , {'Access-Control-Allow-Origin': '*'})
                                          .then(response => {
                                              console.log(response)
                                          }).catch(e => {
                                          console.log(e)
                                      })
                                      this.$vs.notify({
                                          title: 'Success',
                                          text: 'Member successfully created!',
                                          iconPack: 'feather',
                                          icon: 'icon-check',
                                          color: 'success'
                                      });
                                      router.push({name:'member'})
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
                          firebase.auth().signOut()
                      }else{
                          // form have errors
                          this.$nextTick(() => {
                              let domRect = document.querySelector('.text-danger').getBoundingClientRect();
                              window.scrollTo(
                                  domRect.left + document.documentElement.scrollLeft,
                                  domRect.top + document.documentElement.scrollTop
                              );
                          });
                          this.$vs.notify({
                              title: 'Validation Error',
                              text: 'Please fill all required fields with valid data!',
                              iconPack: 'feather',
                              icon: 'icon-alert-circle',
                              color: 'warning'
                          });
                          console.log('error while form submitting')
                          // form have errors
                      }
                  })
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
          watch: {
              uploadTask: function () {
                  this.uploadTask.on('state_changed', () => {},
                      null,
                      () => {
                          this.pictures = this.getFilesList()
                      })
              }
          }
      }
  </script>

<style>
  #form {
    width: 60%;
    margin: 0 auto 20px;
    border-radius: 8px;
    border: 1px solid rgb(115, 103, 240);
    box-shadow: 2px 5px 10px -3px rgba(115, 103, 240, .7);
  }
  ::placeholder{color:rgba(0, 0, 0, 0.2);}
  .personalize-section, .image-section, .miscellaneous-section, .activity-axercise-section, .programs-packages-section, .food-health-section{padding-bottom: 20px;}
  .personalize-section h4, .activity-axercise-section h4, .image-section h4, .programs-packages-section h4, .food-health-section h4, .miscellaneous-section h4{margin-bottom: 20px;text-decoration: underline;text-transform: capitalize;}
  .personalize-section ul{display:inline-flex; width: 100%;}
  .personalize-section ul li{width: 33% !important;}

  #form input[type="file"] {
    margin: 20px 0 0;
  }
  #form h5{text-transform: capitalize;}
  .cstm-icon {
    font-weight: 700;
    position: absolute !important;
    top: 50%;
    z-index: 1;
    right: 0;
  }
  .avatars{height:250px;}
  .avatars img{width: 100%;height:100%;}
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
  .dp-icon{position: absolute !important;padding-top: 10px;right: 6%;}
  .register-form .vs-radio--borde{

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

  .dof .flatpickr-input{
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
  .vdp-datepicker__calendar .cell{
    border-radius: 50% !important;
  }
  .height-ft{
    float: left;
    width: 82%;
  }
  .height-ft .normal{
    width: 100%;
  }
  .vs__clear{
    display: none;
  }
  .vs__dropdown-menu li{
    width: 100% !important;
  }
  .select_1{
    float: left;
    width : 114px;
  }
  .select_1 .vs__dropdown-toggle{
    border: 0;
  }
  .select_1 .vs__dropdown-toggle .vs__search{
    width: 28px;
    padding: 0;
  }
  .select_1 .vs__dropdown-toggle .vs__search{
    display: none;
  }
  select{
    height: 38px;
    margin: 0 0 0 6px;
    border-radius: 3px;
    border: 1px solid rgba(0,0,0,.2);
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
    .height-ft{
      width: 60%;
    }
  }

  @media only screen and ( max-width: 767px) {
    #form span {
      font-size: 14px;
    }
    .cstm-icon{
      top:45%;
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
    .height-ft{
      width: 100%;
    }
  }

  @media screen and (max-width: 767px) and (min-width: 580px) {
    .dp-icon{right:13%;}
  }
  @media only screen and ( max-width: 579px) {
    .vx-row > .vx-col {
      width: 100% !important;
    }

    #form ul li {
      width: 48%;
    }
    .dp-icon{right:13%;}

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
</style>
