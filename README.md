# frontend-dinnerplan

![image-20210414140920817](README.assets/banner.png)

Example application I built to learn about the [Ember](https://emberjs.com/) frontend framework and [Semantic.works](https://semantic.works/) Linked Data microservices backend stack.
A video fragment demoing the application in its current state can be found [here](https://youtu.be/Lw4gW4VTOWo).

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with npm)
* [Ember CLI](https://ember-cli.com/)
* Web browser: [Mozilla Firefox](https://www.mozilla.org/en-US/firefox/) or [Brave](https://brave.com/) are recommended

## Installation

* `git clone https://github.com/FlorSanders/frontend-dinnerplan.git`
* `cd frontend-dinnerplan`
* `npm install`

## Running / Development

* Start the [backend application](https://github.com/FlorSanders/app-dinnerplan).
* `ember serve --proxy [address to backend]`
* Visit your app at [http://localhost:4200](http://localhost:4200).
* Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Linting

* `npm run lint:hbs`
* `npm run lint:js`
* `npm run lint:js -- --fix`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Specify what it takes to deploy your app.

## Further Reading / Useful Links

* [ember.js](https://emberjs.com/)
* [ember-cli](https://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
