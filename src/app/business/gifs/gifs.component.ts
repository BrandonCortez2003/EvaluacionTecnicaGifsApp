import { Component, OnInit } from '@angular/core';
import { AppMaterialModule } from '../../app.material.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GifsService } from 'src/app/services/api-gifs.service';
import { HistorialGifsService } from '../../services/historial-gifs.service';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './gifs.component.html',
  styleUrls: ['./gifs.component.css']
})
export default class DashboardComponent  {
  gifs: any[] = [];
  searchHistory: string[] = [];
  searchQuery: string = '';
  


  constructor(private gifsService: GifsService, private historialGifsService :HistorialGifsService ) { 

    this.historialGifsService.searchQuerySelected.subscribe(query => {
      this.searchQuery = query;
      this.buscarGifs(query); // Realizar búsqueda cuando se selecciona del historial
    });

  }

  ngOnInit() {
    this.gifsService.listarGifsPopulares().subscribe(
      (response) => {
        this.gifs = response.data; 
        console.log(this.gifs);
      },
      (error) => {
        console.error('Error al obtener los GIFs:', error);
      }
    );
  }


  // Metodo para buscar gif por titulo
  
  buscarGifs(query: string) {
    if (query.trim() === '') return;

    this.searchQuery = query;
    this.gifsService.buscarGifs(query).subscribe(
      (response) => {
        console.log(response);
        this.gifs = response.data;
        this.historialGifsService.addToSearchHistory(query);
      },
      (error) => {
        console.error('Error al buscar GIFs:', error);
      }
    );
  }
  
}