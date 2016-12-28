import * as angular from 'angular';
import PersonModule  from '../components/person/person.module';
export class MyClass {
  constructor() {
  }
}
angular.module('mainApp', [
  PersonModule.name
  ]);