import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TranslateCountryPipe } from '../../shared/pipes/translate-nationality.pipe';
import { F1ApiService } from '../../core/services/f1-api.service';
import { onlyOneFilterValidator } from '../../shared/validators/onlyOneFilterValidator';
import { NzAlertModule } from 'ng-zorro-antd/alert';

@Component({
  selector: 'app-pilot-search',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzListModule,
    NzInputModule,
    NzButtonModule,
    NzIconModule,
    TranslateCountryPipe,
    NzAlertModule
  ],
  templateUrl: './pilot-search.component.html',
  styleUrls: ['./pilot-search.component.scss']
})
export class PilotSearchComponent {
  searchForm!: any;
  results: any[] = [];
  currentYear: number = new Date().getFullYear();
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private apiService: F1ApiService) {
    this.searchForm = this.fb.group({
      year: ['', [
        Validators.pattern('^[0-9]+$'),
        Validators.max(new Date().getFullYear())
      ]],
      name: ['', [
        Validators.pattern('^[a-zA-Z]+$'),
        Validators.minLength(4)
      ]]
    }, { validators: onlyOneFilterValidator });
  }

  searchByNameOrSurname(): void {
    const nameControl = this.searchForm.get('name');
    const nameValue = nameControl?.value;
    if (this.searchForm.valid) {
      this.apiService.searchPilotsByNameOrSurname({ name: nameValue }).subscribe({
        next: (data) => {
          this.results = data.drivers || [];
          this.errorMessage = null;
        },
        error: err => {
          this.errorMessage = err.error?.message || err.message || 'Error al buscar pilotos por nombre.';
        }
      });
    }
  }

  searchByYear(): void {
    if (this.searchForm.valid) {
      const year = this.searchForm.get('year')?.value;
      if (year) {
        this.apiService.searchPilotsByYear(year).subscribe({
          next: (data) => {
            this.results = data.drivers || [];
            this.errorMessage = null;
          },
          error: err => {
            this.errorMessage = err.error?.message || err.message || 'Error al buscar pilotos por año.';
          }
        });
      }
    }
  }

  resetFilters(): void {
    this.searchForm.reset();
    this.results = [];
    this.errorMessage = null;
  }
}
