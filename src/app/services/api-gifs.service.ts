import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.prod';




@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private apiUrl = 'https://api.giphy.com/v1/gifs';
  private apiKey = environment.apiKey; 
  constructor(private http: HttpClient) { }

  // Método para obtener GIFs populares
  listarGifsPopulares(): Observable<any> {
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '60'); 

    return this.http.get(`${this.apiUrl}/trending`, { params });
  }

  // Método para buscar GIFs por término
  buscarGifs(query: string): Observable<any> {
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('q', query)
      .set('limit', '30');

    // Realizar la llamada GET a la API para buscar GIFs
    return this.http.get(`${this.apiUrl}/search`, { params });
  }
}