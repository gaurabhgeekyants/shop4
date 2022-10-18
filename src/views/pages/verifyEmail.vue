<template>
    <div>
    <br>
    <br>
    <br>
        <hr>
    <h2 style="text-align: center">Thank you for verifying!</h2>
    <hr>
    </div>
</template>

<script>
    require('firebase/firestore')
    import 'firebase/auth'
    import firebase from 'firebase'

    export default {

        data() {
            return {
                uid:this.$route.params.uid,
            }
        },
        created(){
            localStorage.removeItem('userRole')
            if(this.uid != ''){
                const memberPayLoad = {
                    status: true,
                }
                firebase.firestore().collection('users').doc(this.uid).get()
                    .then(snap => {
                        snap.ref.update(memberPayLoad);
                        this.$vs.notify({
                            title: 'Successfully Verified!',
                            text: 'Now you can login',
                            iconPack: 'feather',
                            icon: 'icon-alert-circle',
                            color: 'success'
                        });
                        this.$router.push({name:'page-login'})
                    })
                    .then(() => {
                        console.log('Successfully updated the status')
                    })
                    .catch(error => {
                        console.error('There was an error editing the record: ' + error)
                    })
            }else{
                this.$vs.notify({
                    title: 'Something went wrong',
                    text: '',
                    iconPack: 'feather',
                    icon: 'icon-alert-circle',
                    color: 'danger'
                });
//                this.$router.push({name:'page-login'})
            }


        },
        methods: {}
    }
</script>
