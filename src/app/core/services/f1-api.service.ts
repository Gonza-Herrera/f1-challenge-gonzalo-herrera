// f1-api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class F1ApiService {
  private BASE_URL = 'https://f1api.dev/api';
  private BASE_URL_2 = 'https://f1connectapi.vercel.app/api/teams';
  private BASE_URL_YEAR = 'https://f1connectapi.vercel.app/api';

  constructor(private http: HttpClient) {}

  // Listado de equipos actuales
  getCurrentTeams(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/current/teams`);
  }

  // Listado de drivers actuales
  getCurrentDrivers(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/current/drivers`);
  }

  // Listado de pilotos de un equipo
  getTeamPilots(teamId: string): Observable<any> {
    return this.http.get(`${this.BASE_URL_2}/${teamId}`);
  }

  // Buscador de pilotos por nombre o apellido  
  searchPilotsByNameOrSurname(params: { name?: string }): Observable<any> {
    const q = params.name || '';
    return this.http.get(`${this.BASE_URL}/drivers/search`, { params: { q } });
  }

  // Buscador de pilotos por año
  searchPilotsByYear(year: string, limit: number = 30, offset: number = 0): Observable<any> {
    const url = `${this.BASE_URL_YEAR}/${year}/drivers`;
    const params = new HttpParams()
      .set('limit', limit.toString())
      .set('offset', offset.toString());
    return this.http.get(url, { params });
  }

  // Obtener clasificación de pilotos campeones por año
  getDriversChampionshipByYear(year: string, limit: number = 30, offset: number = 0): Observable<any> {
    const url = `${this.BASE_URL_YEAR}/${year}/drivers-championship`;
    const params = new HttpParams()
      .set('limit', limit.toString())
      .set('offset', offset.toString());
    return this.http.get(url, { params });
  }

  // Obtener la clasificación de constructores campeones por año
  getConstructorsChampionshipByYear(year: string, limit: number = 30, offset: number = 0): Observable<any> {
    const url = `${this.BASE_URL_YEAR}/${year}/constructors-championship`;
    const params = new HttpParams()
      .set('limit', limit.toString())
      .set('offset', offset.toString());
    return this.http.get(url, { params });
  }

  // Obtener estadísticas para un año (supuesto endpoint)
  getStatsByYear(year: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/stats/${year}`);
  }
}
