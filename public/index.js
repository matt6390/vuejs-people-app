var HomePage = {
  template: "#home-page",
  data: function() {
    return {
      message: "Welcome to my list of people!",
      people: [
        {
          name: "Matthew",
          bio: "He's a cool guy",
          bioVisible: true
        },
        {
          name: "Ariel",
          bio: "The coolest meraid in all the land",
          bioVisible: true
        },
        {
          name: "Baxter",
          bio: "A man with the name of a dog",
          bioVisible: true
        }
      ],
      newPerson: { name: "", bio: "", bioVisible: true }
    };
  },
  created: function() {},
  methods: {
    addPerson: function() {
      if (this.newPerson.name !== "" && this.newPerson.bio !== "") {
        this.people.push(this.newPerson);
        this.newPerson = { name: "", bioVisible: true }; //blanks out the .newPerson form, to make the form clear itself when the button is pressed
      }
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
