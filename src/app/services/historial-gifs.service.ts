import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HistorialGifsService {
  private searchHistory: string[] = [];
  historyUpdated: EventEmitter<string[]> = new EventEmitter();
  searchQuerySelected: EventEmitter<string> = new EventEmitter(); // Nuevo evento
  constructor() {
    this.loadSearchHistory();
  }

  private loadSearchHistory() {
    if (typeof localStorage !== 'undefined') {
      const history = localStorage.getItem('searchHistory');
      if (history) {
        this.searchHistory = JSON.parse(history);
      }
    }
  }

  getSearchHistory(): string[] {
    return this.searchHistory;
  }

  addToSearchHistory(query: string) {
    if (!this.searchHistory.includes(query)) {
      this.searchHistory.push(query);
      localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory));
      this.historyUpdated.emit(this.searchHistory);
    }
  }

  clearSearchHistory() {
    this.searchHistory = [];
    localStorage.removeItem('searchHistory');
    this.historyUpdated.emit(this.searchHistory);
  }

  selectFromHistory(query: string) {
    this.searchQuerySelected.emit(query); // Emitir evento cuando se selecciona del historial
  }
}
