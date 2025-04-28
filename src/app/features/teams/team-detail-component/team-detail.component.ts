import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { RouterLink } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ActivatedRoute } from '@angular/router';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { TranslateCountryPipe } from '../../../shared/pipes/translate-nationality.pipe';
import { F1ApiService } from '../../../core/services/f1-api.service';

@Component({
  selector: 'app-team-detail',
  standalone: true,
  imports: [
    CommonModule,
    NzListModule,
    NzSkeletonModule,
    RouterLink,
    NzButtonModule,
    NzIconModule,
    TranslateCountryPipe,
    NzAlertModule  // Asegúrate de importar el módulo de alertas
  ],
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.scss']
})
export class TeamDetailComponent implements OnInit {
  teamId!: string;
  teamName!: string;
  pilots: any[] = [];
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private apiService: F1ApiService
  ) {}

  ngOnInit(): void {
    this.teamId = this.route.snapshot.paramMap.get('id')!;
    this.teamName = history.state.teamName || 'Equipo Desconocido';

    this.apiService.getCurrentDrivers().subscribe({
      next: (data) => {
        this.pilots = (data.drivers || []).filter(
          (driver: any) => driver.teamId === this.teamId
        );
      },
      error: (err) => {
        this.errorMessage = err.error?.message || err.message || 'Ha ocurrido un error al cargar los pilotos.';
      }
    });
  }
}
