import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { Router } from '@angular/router';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { TranslateCountryPipe } from '../../../shared/pipes/translate-nationality.pipe';
import { F1ApiService } from '../../../core/services/f1-api.service';

@Component({
  selector: 'app-team-list',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    NzListModule,
    NzSkeletonModule,
    NzButtonModule,
    NzGridModule,
    NzDividerModule,
    TranslateCountryPipe,
    NzAlertModule
  ],  
  templateUrl: `./team-list.component.html`,
  styleUrls: [`./team-list.component.scss`]
})
export default class TeamListComponent implements OnInit {

  data: any[] = [];
  list: Array<{ loading: boolean; teamName: string; teamNationality: string }> = [];
  errorMessage: string | null = null;

  constructor(
    private apiService: F1ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getData((res: any[]) => {
      this.data = res;
      this.list = res;
    });
  }

  getData(callback: (res: any[]) => void): void {
    this.apiService.getCurrentTeams().subscribe({
      next: data => {
        callback(data.teams || []);
      },
      error: err => {
        this.errorMessage = err.error?.message || err.message || 'Ha ocurrido un error al cargar los equipos.';
      }
    });
  }  

  viewPilots(team: any): void {
    this.router.navigate(['/teams', team.teamId], { state: { teamName: team.teamName } });
  }
}
