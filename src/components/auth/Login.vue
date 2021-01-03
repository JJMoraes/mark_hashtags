<template>
  <v-container fluid fill-height> 
    <v-row align="center" justify="center">
      <v-col sm="10" md="6" xs="10">
        <div class="alertDiv">
          <v-alert
            v-model="errorShow"
            type="error"
            dismissible
          >Something went wrong, please try again later !</v-alert>
        </div>
        <v-card>
          <v-toolbar class="white--text" color="#1ca0cc" flat dark> 
            <v-toolbar-title v-text="'Mark Hastags'"/>
            <v-spacer/>
            <v-icon dark right v-text="'mdi-login'"/>
          </v-toolbar>
          <br/>
          <v-card-actions>
            <v-spacer/>
            <v-btn rounded class="blue light-1 white--text" @click="login()" v-text="'Log in with Twitter'"/>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { getAuthorizationUrl } from '@/api/auth/auth-service';
  import  router  from '@/router/'; 
   
  export default {
    name:'Login',
    data:()=>({
      errorShow:false,
    }),
    created:function(){
      if(localStorage.getItem('token') != null){
        router.push("/")
      }
    },
    methods:{
      async login(){
        try{
          const urlAuthorization = await getAuthorizationUrl();
          window.location.href=urlAuthorization;
        }catch(e){
          this.errorShow = true;
        }
      },
    }
  }
</script>

<style scoped>
  .alertDiv{
    position:fixed;
    top: 80px;
    left: 30%;
    width: 40%;
  }
</style>
