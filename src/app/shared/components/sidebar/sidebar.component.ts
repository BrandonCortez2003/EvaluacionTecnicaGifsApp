import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { GifsService } from 'src/app/services/api-gifs.service';
import { HistorialGifsService } from 'src/app/services/historial-gifs.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink,CommonModule,RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  searchHistory: string[] = [];
  searchQuery: string = '';

  constructor(private historialGifsService: HistorialGifsService, private gifsService: GifsService) {}

  ngOnInit(): void {
    this.historialGifsService.historyUpdated.subscribe((history: string[]) => {
      this.searchHistory = history;
    });
    this.searchHistory = this.historialGifsService.getSearchHistory();
  }

  manejarHistorialClick(query: string) {
    this.searchQuery = query; // Actualizar el campo de búsqueda
    this.historialGifsService.selectFromHistory(query); // Emitir evento para DNIComponent
  }

  limpiarHistorial() {
    this.historialGifsService.clearSearchHistory();
  }

}
