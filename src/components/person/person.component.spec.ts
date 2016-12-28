import * as angular from 'angular';
import 'angular-mocks';
import { Person } from  './person.component';
import { Man } from './types';
import { MansData } from './types';
import { PersonService } from './person.service';
describe('Test module FirstModule. ', ()=>{
  const module=angular.mock.module;
  beforeEach(module('mainApp'));

  describe('Test ComponentPerson. ',()=>{
    let controller: Person;
    let compile;
    let getMessage;
    let myService: PersonService;
    let $componentController;
    beforeEach(()=>{
      inject(($injector,_$componentController_)=> {
        myService = $injector.get('personService');
        $componentController = _$componentController_;
        controller=$componentController('personTasks');
      });
    });

    it('check firstname', () => {
      controller.firstName = 'Olgerd';
      expect ( controller.firstName ).toEqual( 'Olgerd' );
    });

    it('check lastname', () => {
      controller.lastName = 'Olgerdovich';
      expect ( controller.lastName ).toEqual( 'Olgerdovich' );
    });

    it("called function", () => {
      myService.mansData=[{
         "firstName": "Valera",
         "lastName": "Volosyan",
        "tasks":[ "task1", "task2", "task3"]
        }];
      spyOn(myService,'getMessage');
      controller.getMessage();
      expect(myService.getMessage).toHaveBeenCalled();
    });

    it ("check message", () =>{
      const bindings={
        message:'message'
      }
      controller=$componentController('personTasks', null, bindings);
      expect( controller.message ).toEqual('message');
    });

    it ("check listSurname", () =>{
      const array=['Ivnov','Petrov', 'Sidorov'];
      const bindings={
        text:'message',
        listSurnames:array
      }
      controller=$componentController('personTasks', null, bindings);
      expect(controller.listSurnames.length).toBe(3);
    });
  })
  describe('Testing http', () =>{
    let myService: PersonService;
    let httpBackend: ng.IHttpBackendService;
    let $componentController;
    let controller: Person;
    beforeEach(()=> {
      inject( ($injector) => {
        myService=$injector.get('personService');
        httpBackend=$injector.get('$httpBackend');
        $componentController=$injector.get('$componentController');
        controller=$componentController('personTasks');
      }) 
    })
    it('1) test response tasks', ()=>{
      controller.firstName ='Valera'
      controller.lastName = 'Volosyan'
      const response: Array<Man>=[{
         "firstName": "Valera",
         "lastName": "Volosyan",
        "tasks":[ "task1", "task2", "task3"]
        }];
      httpBackend.expectGET('json/tasks.json').respond(response);
      jasmine.addCustomEqualityTester(angular.equals);
      controller.getTasks();
      httpBackend.flush();
      expect(myService.tasks).toEqual(response[0].tasks);  
        
    });

    it('2) test length counts array', () => {
      controller.firstName ='Valera'
      controller.lastName = 'Volosyan'
      const response: Array<Man> = [
      {
         "firstName": "Valera",
         "lastName": "Volosyan",
        "tasks":[ "task1", "task2", "task3"]
      }]
      httpBackend.expectGET('json/tasks.json').respond(response);
      controller.getTasks();
      httpBackend.flush();
      expect(myService.tasks.length).toBe(response[0].tasks.length);
    });
  })
  describe('Component: personTasks', () => {
    let element;
    let scope;
    beforeEach(inject(($rootScope, $compile)=>{
      scope = $rootScope.$new();
      element = angular.element('<person-tasks></<person-tasks>');
      element = $compile(element)(scope);
      scope.outside = '1.5';
      scope.$apply();
    }));
   
    it('should render the text', ()=> {
      const h1 = element.find('h1');
      const k=h1.text();
      expect(h1.text()).toBe('Unit Testing AngularJS 1.5');
    });
   
  });

});