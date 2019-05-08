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
            <input class="form-control mr-4" v-model='newLink.name' placeholder="Name" type="text">
          </div>
          
          <div class="form-group">
              <input class="form-control mr-4" v-model='newLink.amount' placeholder="Amount" type="text">
            </div>

            
              <input type="submit" class="btn btn-success" value="Add Account">
        </form>
      </div>
    </div>

  </div>
  <hr>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <h3>List of Accounts</h3>
      </div>
      <div class="card-body">
        <table class="table table-striped">
          <thead>
            <th>Name</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Action</th>
          </thead>
          <tbody>
            <tr v-for="item in links">
              <td>{{ item.name }}</a></td>
              <td>{{item.amount}}</td>
              <td><button class="btn" @click="changePaid(item)" :class="{ 'btn btn-sm btn-success': item.status, 'btn-sm btn-danger': !item.status}" >
                                    <div v-if="item.status"><i class="fas fa-check"></i>&nbsp;Pagado</div>
                                    <div v-if="!item.status"><i class="fas fa-times"></i>&nbsp;Sin Pagar</div>
                                </button></td>
              <td><button @click="deleteLink(item)" class="btn btn-danger btn-sm"><i class="fas fa-trash"></i></button></td>
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
      _newLink: {
        name: '',
        amount: '',
        status: ''
      },
      get newLink() {
        return this._newLink;
      },
      set newLink(value) {
        this._newLink=value;
      },
    }
  },
  methods:{
    addLink: function(){
      linksRef.push(this.newLink);
      toastr.success("Link added");
      this.newLink.name = '';
      this.newLink.amount = '';
      this.newLink.state = false;
    },
    deleteLink: function(link){
      linksRef.child(link['.key']).remove();
      toastr.success('Link removed');
    },
    changePaid:function(n){
      n.status=!n.status
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
