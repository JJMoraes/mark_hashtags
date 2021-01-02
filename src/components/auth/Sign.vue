<template>
  <v-container fluid fill-height> 
    <v-row align="center" justify="center">
      <v-col sm="10" md="6" xs="10">
        <v-alert
          prominent
          type="error"
          v-model="errorShow"
        >
          <v-row align="center">
            <v-col class="grow">
              Something went wrong, plese go back and try again later !
            </v-col>
            <v-col class="shrink">
              <v-btn outlined :to="'/login'" v-text="'Login'"/>
            </v-col>
          </v-row>
        </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { getAccessToken } from '@/api/auth/auth-service';
  import router from '@/router/';

  export default {
    name:'Sign',
    data:()=>({
      errorShow:false
    }),
    created:async function(){
      try{
        const params = new URLSearchParams(window.location.search);
        if(params.get('oauth_verifier') == null){
          router.push("/login");
        }
        await getAccessToken({oauth_verifier:params.get('oauth_verifier')});
        router.push("/");
      }catch(e){
        this.errorShow = true
      }
    },
  }
</script>
