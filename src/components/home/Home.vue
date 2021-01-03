<template>
  <div>
    <v-app-bar color="#1ca0cc" class="white--text" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <span class="title" v-text="'Mark Hashtags'"/>
      </v-toolbar-title>
      <v-spacer/>
      <v-icon @click="logout" v-text="'mdi-logout'"/>
    </v-app-bar>
    
    <v-navigation-drawer temporary v-model="drawer" app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title" v-text="user.username"/>
          <v-list-item-subtitle v-text="user.email"/>
        </v-list-item-content>
      </v-list-item>
      <v-divider/>
      <v-list
        v-for="hashtag in menu"
        :key="hashtag.title"
      >
        <v-list-item link>
          <v-list-item-title @click="addNewFeed(hashtag)" v-text="hashtag.title"/>
          <v-list-item-icon>
            <v-icon @click="deleteHashtag(hashtag)" v-text="'mdi-delete'"/>
          </v-list-item-icon>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-container>    
      <v-row align="start">
        <v-col v-for="(hashtag, index) in hashtags" :key="index" ref="hashtags">
          <v-card
            elevation="16"
            max-width="500"
            min-width="400"
            class="mx-auto"
          >
            <v-toolbar class="white--text" color="#1ca0cc" flat dark>
              <v-toolbar-title v-text="hashtag.title"/>
              <v-spacer/>
              <v-icon dark @click="getTweets(hashtag, index)" v-text="'mdi-refresh'"/>
              <v-icon dark @click="removeFeed(index)" v-text="'mdi-minus'"/>
            </v-toolbar>
            <div class="scrollable" v-if="hashtag.tweets">
              <div v-if="hashtag.tweets.length == 0" class="text-center mt-5">
                <v-list-item>
                  <v-list-item class="title" v-text="'There is no matching tweets at this moment, try again later !'"/>
                  <v-btn color="#1ca0cc" dark rounded @click="getTweets(hashtag, index)" v-text="'Try Again'"/>
                </v-list-item>
              </div>
              <v-list 
                v-else
                v-for="tweet in hashtag.tweets" 
                :key="tweet.id"
              >
                <v-list-item>
                  <v-card
                    class="mt-5 mb-5 mx-auto "
                    color="#26c6da"
                    dark
                    max-width="480"
                    min-width="330"
                  >
                    <v-card-title>
                      <v-avatar color="grey darken-3">
                        <v-img :src="tweet.authorAvatar" :alt="tweet.author"/>
                      </v-avatar>
                      <v-list-item-content>
                        <v-list-item-title class="ml-4" v-text="tweet.author"/>
                      </v-list-item-content>
                      <v-spacer/>
                      <v-icon large v-text="'mdi-twitter'"/>
                    </v-card-title>
                    <v-divider/>
                    <v-card-text class="headline font-weight-bold" v-text="tweet.message"/>  
                    <v-divider/>
                    <v-spacer/>
                    <v-card-text class="subtitle" v-text="tweet.date"/>
                  </v-card>
                </v-list-item>
              </v-list>
            </div>
            <div v-else class="scrollable">
              <v-col align="center" justify="center" class="mt-10">
                <v-progress-circular color="indigo" indeterminate/>
              </v-col>
            </div>
          </v-card>
        </v-col>
        <v-dialog v-model="dialog" persistent max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="#1ca0cc"
              fixed
              bottom
              right
              fab
              dark
              v-bind="attrs"
              v-on="on"
            >
              <v-icon v-text="'mdi-plus'"/>
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">Follow new #HashTag</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field v-model="newHashtag" label="HashTag" required></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer/>
              <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
              <v-btn color="blue darken-1" text @click="addNewHashtag">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </v-container>

    <div class="alertDiv">
      <v-alert
        v-model="errorShow"
        type="error"
        dismissible
      >{{errorText}}</v-alert>
    </div>
    
  </div>  
</template>

<script>

import { getTweetsAPI, getUser, getHashtags, deleteHashtag, saveHashtag } from '@/api/home/home-service';
import router from "@/router/";
import jwt_decode from "jwt-decode";

export default {
  name: 'Home',
  data: () => ({
    drawer: false,
    errorShow:false,
    errorText:'Erro',
    menu:[],
    user:{},
    dialog: false,
    timersIds:{},
    newHashtag:'',
    hashtags:[]
  }),
  created:async function(){
    try {
      const token = localStorage.getItem('token');
      if(!token)
        this.logout();
      const decodedJwt = jwt_decode(token);
      this.makeMenu(decodedJwt);
    } catch (e) {
      this.logout();
    }
  },
  methods:{
    async makeMenu(decodedJwt){
      try {
        this.user = await getUser(decodedJwt.id);
        this.menu = await getHashtags(decodedJwt.id);
      } catch (e) {
        if(e.code == 404 || e.code == 403){
          this.logout();
        }else{
          this.errorText = e.msg;
          this.errorShow = true;
        }  
      }
    },
    async getTweets(hashtag, index){
      try {
        const newTweets = await getTweetsAPI(hashtag.id);
        this.hashtags[index].tweets = newTweets;
      } catch (e){
        this.errorText = e.msg;
        this.errorShow = true;
        this.hashtags[index].tweets = this.hashtags[index].tweets?this.hashtags[index].tweets:[];
      }
    },
    async addNewFeed(hashtag){
      try {
        hashtag.tweets = null;
        let index = this.hashtags.push(hashtag) - 1;
        await this.getTweets(hashtag, index);
        this.timersIds[index] = setInterval(()=>{this.getTweets(hashtag, index)}, 1500000); 
      } catch (e) {
        this.errorText = e.msg;
        this.errorShow = true;
      }
    },
    async addNewHashtag(){
      try{
        const title = this.newHashtag.startsWith('#')?this.newHashtag:'#'+this.newHashtag;
        this.dialog = false;
        this.newHashtag = '';
        const hashtag = {title:title, owner:this.user};
        this.menu.push(hashtag);
        const savedHashtag = await saveHashtag(hashtag);
        await this.addNewFeed(savedHashtag);
      }catch(e){
        this.errorText = e.msg;
        this.errorShow = true;
      }
    },
    removeFeed(index){
      clearInterval(this.timersIds[index]);
      this.hashtags.splice(index, 1);
    },
    async deleteHashtag(hashtag){
      try {
        await deleteHashtag(hashtag.id);
        this.menu.splice(this.menu.indexOf(hashtag),1); 
      } catch (e) {
        this.errorText = e.msg;
        this.errorShow = true;
      }
    },
    logout(){
      localStorage.clear();
      router.push('/login');
    }
  }
} 
</script>

<style>
  .scrollable{
    height: 450px;
    max-height: 450px;
    overflow-y: auto;
  }

  .alertDiv{
    position:fixed;
    top: 80px;
    left: 30%;
    width: 40%;
  }
</style>
