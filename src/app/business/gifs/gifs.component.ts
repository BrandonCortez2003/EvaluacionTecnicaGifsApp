import { Component, OnInit } from '@angular/core';
import { AppMaterialModule } from '../../app.material.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GifsService } from 'src/app/services/api-gifs.service';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [AppMaterialModule,FormsModule,CommonModule],
  templateUrl: './gifs.component.html',
  styleUrls: ['./gifs.component.css']
})
export default class DashboardComponent implements OnInit {
  gifs: any[] = [];
  searchHistory: string[] = [];
  searchQuery: string = '';
  


  constructor(private gifsService: GifsService) { }

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

    this.cargarBuscarHistorial();
  }


  // Metodo para buscar gif por titulo
  
  buscarGifs(query: string) {
    if (query.trim() === '') return;

    this.searchQuery = query;
    this.gifsService.buscarGifs(query).subscribe(
      (response) => {
        console.log(response);
        this.gifs = response.data;
        this.agregarHistorialBusqueda(query);
      },
      (error) => {
        console.error('Error al buscar GIFs:', error);
      }
    );
  }
  private agregarHistorialBusqueda(query: string) {
    if (!this.searchHistory.includes(query)) {
      this.searchHistory.push(query);
      localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory));
    }
  }

  private cargarBuscarHistorial() {
    const history = localStorage.getItem('searchHistory');
    if (history) {
      this.searchHistory = JSON.parse(history);
    }
  }


  // Método para mostrar en el campo de busqueda
  //el nombre del historial seleccionado
  manejarHistorialClick(query: string) {
    this.searchQuery = query; 
    this.buscarGifs(query); 
  }

  limpiarHistorial() {
    this.searchHistory = [];
    localStorage.removeItem('searchHistory');
  }
  
}