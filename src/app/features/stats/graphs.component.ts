import { Component, OnInit, OnChanges, HostListener, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NgxChartsModule, Color, ScaleType } from '@swimlane/ngx-charts';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { forkJoin } from 'rxjs';
import { F1ApiService } from '../../core/services/f1-api.service';
import { NzAlertModule } from 'ng-zorro-antd/alert';

@Component({
  selector: 'app-graphs',
  standalone: true,
  imports: [
    CommonModule,
    NzCardModule,
    NzSpinModule,
    NgxChartsModule,
    NzIconModule,
    ReactiveFormsModule,
    NzInputModule,
    NzButtonModule,
    NzAlertModule
  ],
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.scss']
})
export class GraphsComponent implements OnChanges, OnInit {
  @Input() year: string = '2022';
  searchForm!: any;

  chartDataPilots: any[] = [];
  chartDataConstructors: any[] = [];

  // Propiedad para el tamaño dinámico del gráfico
  view: any = [700, 400];

  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Pilotos';
  showYAxisLabel = true;
  yAxisLabel = 'Victorias';

  colorScheme: Color = {
    name: 'coolScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  isLoading: boolean = true;

  // Propiedad para capturar el mensaje de error en caso de fallo en la request
  errorMessage: string | null = null;

  constructor(private apiService: F1ApiService, private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      year: [this.year, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.updateChartView();
    this.loadChartData();
  }

  ngOnChanges(): void {
    this.loadChartData();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.updateChartView();
  }

  updateChartView(): void {
    const width = window.innerWidth;
    if (width < 576) { 
      this.view = [width - 20, 300];
    } else if (width < 768) {
      this.view = [width - 40, 350];
    } else if (width < 1024) {
      this.view = [Math.min(width - 100, 700), 400];
    } else {
      this.view = [700, 400];
    }
  }

  loadChartData(): void {
    this.isLoading = true;
    // Reiniciamos cualquier mensaje anterior
    this.errorMessage = null;
    
    forkJoin({
      drivers: this.apiService.getDriversChampionshipByYear(this.year),
      constructors: this.apiService.getConstructorsChampionshipByYear(this.year)
    }).subscribe({
      next: results => {
        // Procesamiento para pilotos campeones
        const driversData = results.drivers.drivers_championship || [];
        driversData.sort((a: any, b: any) => a.position - b.position);
        const top5Drivers = driversData.slice(0, 5);
        this.chartDataPilots = top5Drivers.map((d: any) => ({
          name: `${d.driver.name} ${d.driver.surname}`,
          value: d.wins
        }));

        // Procesamiento para constructores campeones
        const constructorsData = results.constructors.constructors_championship || [];
        constructorsData.sort((a: any, b: any) => a.position - b.position);
        const top5Constructors = constructorsData.slice(0, 5);
        this.chartDataConstructors = top5Constructors.map((c: any) => ({
          name: c.team.teamName,
          value: c.wins
        }));

        this.isLoading = false;
      },
      error: err => {
        console.error('Error al cargar datos:', err);
        this.errorMessage = err.error?.message || err.message || 'Ha ocurrido un error al cargar los datos.';
        this.isLoading = false;
      }
    });
  }

  searchByYear(): void {
    if (this.searchForm.valid) {
      this.year = this.searchForm.get('year')?.value;
      this.loadChartData();
    }
  }
}
