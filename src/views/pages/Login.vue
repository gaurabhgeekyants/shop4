<template>
    <div class="h-screen flex w-full bg-img vx-row no-gutter items-center justify-center" id="page-login">
        <div class="vx-col sm:w-1/1 md:w-1/2 lg:w-3/4 xl:w-3/5 sm:m-0 m-4">
            <vx-card>
                <div slot="no-body" class="full-page-bg-color">
                    <div class="vx-row no-gutter justify-center items-center">
                        <div class="vx-col hidden lg:block lg:w-1/2">
                            <img src="@/assets/images/pages/login.png" alt="login" class="mx-auto">
                        </div>
                        <div class="vx-col sm:w-full md:w-full lg:w-1/2 d-theme-dark-bg">
                            <div class="p-8">
                                <div class="vx-card__title mb-8">
                                    <h4 class="mb-4">Login</h4>
                                    <p>Welcome back, please login to your account.</p>
                                </div>
                                <vs-input
                                    v-validate="'required|email|min:3'"
                                    data-vv-validate-on="blur"
                                    name="email"
                                    icon="icon icon-user"
                                    icon-pack="feather"
                                    label-placeholder="Email"
                                    v-model="email"
                                    class="w-full no-icon-border"
                                    @keyup.enter="submitForm"
                                />
                                <span class="text-danger text-sm" v-show="errors.has('email')">{{ errors.first('email') }}</span>

                                <vs-input
                                    data-vv-validate-on="blur"
                                    v-validate="'required|min:6|max:10'"
                                    type="password"
                                    name="password"
                                    icon="icon icon-lock"
                                    icon-pack="feather"
                                    label-placeholder="Password"
                                    v-model="password"
                                    class="w-full mt-6 no-icon-border"
                                    @keyup.enter="submitForm"
                                    />
                                <span class="text-danger text-sm" v-show="errors.has('password')">{{ errors.first('password') }}</span>

                                <div class="flex flex-wrap justify-between my-5">
                                    <vs-checkbox v-model="checkbox_remember_me" class="mb-3 mt-0">Remember Me</vs-checkbox>
                                    <router-link to="/forgot-password">Forgot Password?</router-link>
                                </div>
                                <vs-button  type="border" @click="registerUser">Register</vs-button>
<!--                              <vs-input class="flex-1" placeholder="Type Your Message" v-model="typedMessage" @keyup.enter="sendMsg" />-->

                              <vs-button @click.prevent="submitForm"  class="float-right">Login</vs-button>
                            </div>
                        </div>
                    </div>
                </div>
            </vx-card>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            email: this.email,
            password: this.password,
            checkbox_remember_me: false
        }
    },
    computed: {
    },
    methods: {
        login() {
        },
        submitForm() {
            this.$validator.validateAll().then(result => {
                if (result) {
                    // Loading
                    this.$vs.loading()
                    const payload = {
                        checkbox_remember_me: this.checkbox_remember_me,
                        userDetails: {
                            email: this.email,
                            password: this.password
                        },
                        notify: this.$vs.notify,
                        closeAnimation: this.$vs.loading.close,
                        acl: this.$acl
                    }
                    console.log('loginAttempt');
                    this.$store.dispatch('auth/loginAttempt', payload);
                } else {
                    // form have errors
                }
            })
        },
        loginAuth0() {
            if (this.$store.state.auth.isUserLoggedIn()) {
                this.notifyAlreadyLogedIn();
                return false
            }
            this.$auth.login({ target: this.$route.query.to });
        },

        notifyAlreadyLogedIn() {
            this.$vs.notify({
                title: 'Login Attempt',
                text: 'You are already logged in!',
                iconPack: 'feather',
                icon: 'icon-alert-circle',
                color: 'warning'
            });
        },
        registerUser() {
            if(this.$store.state.auth.isUserLoggedIn()) {
                this.notifyAlreadyLogedIn();
                return false;
            }
            this.$router.push('/register');
        }
    },
    created(){

        if (this.$store.state.auth.isUserLoggedIn()) {
            this.notifyAlreadyLogedIn();
            this.$route.push({path:'dashboard'})
        }else{
//            this.$acl.change('admin')
//            localStorage.removeItem('userRole')
        }
    }
}
</script>

<style lang="scss">
#page-login {
    .social-login {
        .bg-facebook {
          background-color: #1551b1;
        }
        .bg-twitter {
          background-color: #00aaff;
        }
        .bg-google {
          background-color: #4285F4;
        }
        .bg-github {
          background-color: #333;
        }
    }
}
.vs-con-input-label.is-label-placeholder input{
    padding: 10px 10px 10px 30px;
}
</style>
