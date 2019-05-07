<template>
  <div id="app">
    
  <div class="container">
    <h1>Site in Vue and Firebase</h1>

    <div class="card">
      <div class="card-header">
        <h3>Add a Link</h3>
      </div>

      <div class="card-body" >
        <form v-on:submit.prevent="addLink" class="form-inline">
          <div class="form-group">
            <input class="form-control mr-4" v-model='newLink.title' placeholder="Title" type="text">
          </div>
          
          <div class="form-group">
              <input class="form-control mr-4" v-model='newLink.author' placeholder="Author" type="text">
            </div>

            <div class="form-group">
                <input class="form-control mr-4" v-model='newLink.url' placeholder="Url" type="text">
              </div>
              <input type="submit" class="btn btn-success" value="Add Link">
        </form>
      </div>
    </div>

  </div>
  <hr>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <h3>List of Links</h3>
      </div>
      <div class="card-body">
        <table class="table table-striped">
          <thead>
            <th>Title</th>
            <th>Author</th>
            <th></th>
          </thead>
          <tbody>
            <tr v-for="link in links">
              <td><a target="_blank" v-bind:href="link.url" id="urlHref">{{ link.title }}</a></td>
              <td>{{link.author}}</td>
              <td><button @click="deleteLink(link)" class="btn btn-danger btn-sm"><i class="fas fa-trash"></i></button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import Firebase from 'firebase';
import toastr from 'toastr';

let config = {
  apiKey: "AIzaSyD4kls8VZKRdh7aQoXeoGJu48VT0vviU0U",
    authDomain: "complete-button-238620.firebaseapp.com",
    databaseURL: "https://complete-button-238620.firebaseio.com",
    projectId: "complete-button-238620",
    storageBucket: "complete-button-238620.appspot.com",
    messagingSenderId: "225477695001",
    appId: "1:225477695001:web:bab3cdb4420cd504"
}

let app = Firebase.initializeApp(config);
let db = app.database();

let linksRef = db.ref('links');

export default {
  name: 'App',
  firebase: {
    links: linksRef
  },
  data() {
    return {
      newLink: {
        title: '',
        author: '',
        url: ''
      }
    }
  },
  methods:{
    addLink: function(){
      linksRef.push(this.newLink);
      toastr.success("Link added");
      this.newLink.title = '';
      this.newLink.author = '';
      this.newLink.url = '';
    },
    deleteLink: function(link){
      linksRef.child(link['.key']).remove();
      toastr.success('Link removed');
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
