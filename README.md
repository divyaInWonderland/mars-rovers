# `mars-rovers` — Dev exercise to land a squad of robotic rovers by NASA on a plateau on Mars

## Getting Started

To get you started you can simply clone the `mars-rovers` repository and install the dependencies.

### Prerequisites

You need git to clone the `mars-rovers` repository.

We also use a number of Node.js tools to initialize `mars-rovers`. You must have Node.js
and its package manager (npm) installed. Node version v8.11.3 is used for local development.

For best user experience use Google Chrome v69.0.

### Clone `mars-rovers`

Clone the `mars-rovers` repository using git:

```
git clone https://github.com/angular/mars-rovers.git
cd mars-rovers
```

### Install Dependencies

We have two kinds of dependencies in this project: tools and Angular framework code. The tools help
us manage and test the application.

* We get the tools we depend upon via `npm`, the [Node package manager][npm].
* We get the Angular code via `bower`, a [client-side code package manager][bower].

We have preconfigured `npm` to automatically run `bower` so we can simply do:

```
npm install
```

Behind the scenes this will also call `bower install`. After that, you should find out that you have
two new folders in your project.

* `node_modules` - contains the npm packages for the tools we need
* `app/bower_components` - contains the Angular framework files

*Note that the `bower_components` folder would normally be installed in the root folder but
`mars-rovers` changes this location through the `.bowerrc` file. Putting it in the `app` folder
makes it easier to serve the files by a web server.*

### Run the Application

We have preconfigured the project with a simple development web server. The simplest way to start
this server is:

```
npm start
```

Now browse to the app at [`localhost:8000/index.html`][local-app-url].


## Directory Layout

```
app/                    --> all of the source files for the application
  app.css               --> default stylesheet
  plateau/                --> the plateau view template and logic
    plateau.html            --> the partial template
    plateau.js              --> the controller logic
    plateau_test.js         --> tests of the controller
  app.js                --> main application module
  index.html            --> app layout file (the main html template file of the app)
karma.conf.js         --> config file for running unit tests with Karma
```

## Future Improvements
* Add functionality to validate input data
* Define application behaviour for invalid input
* Build comprehensive Test Suite establishing Test Pyramid (Unit, integration and e2e tests)
* Establishing CI/CD Pipeline