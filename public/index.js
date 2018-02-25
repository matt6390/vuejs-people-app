var HomePage = {
  template: "#home-page",
  data: function() {
    return {
      message: "Welcome to my list of people!",
      people: [],
      newPerson: { name: "", bio: "" },
      errors: [],
      nameFilter: "",
      bioFilter: "",
      sortAttribute: "name",
      sortAscending: true,
      nameDirection: "^",
      bioDirection: "^"
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
    },
    isValidPerson: function(inputPerson) {
      var validName = inputPerson.name
        .toLowerCase()
        .includes(this.nameFilter.toLowerCase());
      var validBio = inputPerson.bio
        .toLowerCase()
        .includes(this.bioFilter.toLowerCase());
      return validName && validBio;
    },
    setSortAttribute: function(inputAttribute) {
      console.log(this.nameDirection);
      console.log(this.bioDirection);
      if (inputAttribute === this.sortAttribute) {
        this.sortAscending = !this.sortAscending;
        var sign = inputAttribute + "Direction";
        if (this.sign == "^") {
          this.sign = "v";
        } else {
          this.sign = "^";
        }
      } else {
        this.sortAscending = true;
      }
      this.sortAttribute = inputAttribute;
    }

    // setSortSign: function() {
    //   console.log("function");
    //   if (sortSign === "^") {
    //     sortSign = "V";
    //   } else {
    //     sortSign = "^";
    //   }
    // }
  },
  computed: {
    sortedPeople: function() {
      return this.people.sort(
        function(person1, person2) {
          if (this.sortAscending) {
            return person1[this.sortAttribute].localeCompare(
              person2[this.sortAttribute]
            );
          } else {
            return person2[this.sortAttribute].localeCompare(
              person1[this.sortAttribute]
            );
          }
        }.bind(this)
      );
    }
  }
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
