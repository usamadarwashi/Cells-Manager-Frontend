import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CellTower } from './cellTower';
import { environment } from 'src/environments/environment.development';

@Injectable({providedIn: 'root'})
export class CellTowerService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient ) {}

  public getCellTowers(): Observable<CellTower[]> {
    return this.http.get<CellTower[]>(`${this.apiServerUrl}/cellTower/all`);
  }

  public addCellTower(cellTower: CellTower): Observable<CellTower> {
    return this.http.post<CellTower>(`${this.apiServerUrl}/cellTower/add`, cellTower);
  }

  public updateCellTower(cellTower: CellTower): Observable<CellTower> {
    return this.http.put<CellTower>(`${this.apiServerUrl}/cellTower/update`, cellTower);
  }
  
  public deleteCellTower(cellTowerId: number): Observable<void> {
  return this.http.delete<void>(`${this.apiServerUrl}/cellTower/delete/${cellTowerId}`);
}
}