var HomePage = {
  template: "#home-page",
  data: function() {
    return {
      message: "Welcome to my list of people!",
      people: [],
      newPerson: { name: "", bio: "" },
      errors: []
    };
  },
  created: function() {
    axios.get("/people").then(
      function(response) {
        this.people = response.data;
      }.bind(this)
    );
  },
  methods: {
    addPerson: function() {
      axios
        .post("/people", this.newPerson)
        .then(
          function(response) {
            this.people.push(response.data);
            this.newPerson = { name: "", bio: "" }; //blanks out the .newPerson form, tso make the form clear itself when the button is pressed
            this.errors = [];
          }.bind(this)
        )
        .catch(
          function(error) {
            this.errors = error.response.data.errors;
          }.bind(this)
        );
    },
    removePerson: function() {
      console.log("DELETED!");
      this.people.pop(this);
    },
    toggleBioVis: function(inputPerson) {
      inputPerson.bioVisible = !inputPerson.bioVisible; //if its false, it'll be true, if true, it'll be false
    }
  },
  computed: {}
};
var router = new VueRouter({
  routes: [{ path: "/", component: HomePage }],
  scrollBehavior: function(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});

var app = new Vue({
  el: "#vue-app",
  router: router
});
