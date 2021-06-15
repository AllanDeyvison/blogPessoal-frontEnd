import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../model/Tema';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {

  tema: Tema = new Tema()
  listaTemas: Tema[]
  idTema: number

  constructor(
    private router: Router,
    private temaService: TemaService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    if(environment.token == ''){

      this.router.navigate(['/entrar'])
    }
    /*if(environment.tipo != 'adm'){
      alert('You need to be ADM!')
      this.router.navigate(['/inicio'])

    }*/
    this.findAllTema()
  }

  findAllTema(){
    this.temaService.getAllTema().subscribe((resp: Tema[]) =>{
      this.listaTemas = resp
      })
  }

  findByIdTema(id: number){
    this.temaService.getByIdTema(id).subscribe((resp: Tema)=>{
      this.tema = resp
    })
  }

  cadastrar(){
    this.temaService.postTema(this.tema).subscribe((resp: Tema)=>{
      this.tema = resp
      alert('Theme crated!')
      this.findAllTema()
      this.tema = new Tema()
    })
  }

  apagar(id: number){
    this.temaService.deleteTema(id).subscribe(()=>{
      alert('Theme Delete')
      this.router.navigate(['/tema'])
      this.findAllTema()
    })
  }

  atualizar(){
    this.temaService.putTema(this.tema).subscribe((resp: Tema) =>{
      this.router.navigate(['/tema'])
      this.findAllTema()
    })
  }


}
