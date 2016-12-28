import * as angular from 'angular';
import { Person }  from './person.component';
import { PersonService} from './person.service'
const template = require( './template.html' );
export class PersonController {
  constructor() {
  }
}
export default angular.module('personModule', [])
  .controller('personController', PersonController)
  .service('personService', ['$http', PersonService])
  .component('personTasks', {
    controller: ['personService', Person],
    template,
    bindings: {
      text: '@',
      listSurnames: '<'
    }
  });
