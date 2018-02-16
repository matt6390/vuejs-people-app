var HomePage = {
  template: "#home-page",
  data: function() {
    return {
      message: "Welcome to my list of people!",
      people: [
        {
          name: "Matthew",
          bio: "The greatest person ever",
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
      newPerson: { name: "", bio: "", bioVisible: true },
      numberOfPeople: { people: 3 }
    };
  },
  created: function() {},
  methods: {
    addPerson: function() {
      if (this.newPerson.name !== "") {
        this.people.push(this.newPerson);
        this.newPerson = { name: "", bioVisible: true };
      }
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
