import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HTTPService } from '../../../../services/http.service';

@Component({
  selector: 'app-index',
  imports: [RouterModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent implements OnInit{

  constructor(
    private httpService: HTTPService
  ){
  }

  ngOnInit(): void {
      this.LeerTodo();
  }

  LeerTodo(){
    this.httpService.LeerTodo(10, 0, '')
    .subscribe((respuesta: any) => {
      console.log(respuesta);
    });
  }

}
