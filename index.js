var app=new Vue({el:"#app",data:{newEntry:{name:"",amount:0},items:[{name:"Servicios",amount:200,paid:!1},{name:"Cuentas",amount:90,paid:!0}]},methods:{remove:function(n){this.items.splice(n,1)},add:function(){this.items.push({name:this.newEntry.name,amount:parseFloat(this.newEntry.amount),paid:!1}),this.newEntry.name="",this.newEntry.amount=0},changePaid:function(n){n.paid=!n.paid},totalAmount:function(n){var t=this.items.reduce(function(t,a){switch(n){case 0:return t+(a.paid?0:a.amount)
    case 1:return t+(a.paid?a.amount:0)
    case 2:return t+a.amount}},0)
    return t.toFixed(2)}}})
    