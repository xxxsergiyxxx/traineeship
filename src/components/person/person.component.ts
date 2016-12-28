import { PersonService} from './person.service'
import { Man } from './types';
import { MansData } from './types';
export class Person {
  public firstName: string;
  public lastName: string;
  private currentMan: number;
  public message: string;
  public showTasks : boolean;
  public listSurnames: string[];
  constructor(private service: PersonService) {
  }

  $onInit(){
    this.showTasks = false;
  }

  public getMessage() : void {
    this.message= this.service.getMessage( this.service.mansData[ this.currentMan ] );
  }

  public getTasks() : void {
    const personService: PersonService = this.service;
    personService.getTasks( this.firstName, this.lastName ).then( (res : MansData) => {
      personService.mansData = res.data;
      this.currentMan = personService.searchMan( this.firstName, this.lastName );
      personService.tasks = personService.mansData[ this.currentMan ].tasks;
      this.showTasks=true;
    }
  )}
}