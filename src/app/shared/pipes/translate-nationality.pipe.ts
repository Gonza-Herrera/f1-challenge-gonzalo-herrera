import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translateCountry'
})
export class TranslateCountryPipe implements PipeTransform {
  private translations: { [key: string]: string } = {
    'Great Britain': 'Gran Bretaña',
    'Germany': 'Alemania',
    'Italy': 'Italia',
    'France': 'Francia',
    'United States': 'Estados Unidos',
    'Dutch': 'Holanda',
    'Austria': 'Austria',
    'Switzerland': 'Suiza',
    "Spain": 'España',
    "Australian": 'Australia',
    "British": 'Reino Unido',
    "Brazilian": 'Brasil',
    "German": 'Alemania',
    "Polish": 'Polonia',
    "Japanese": 'Japon',
    "Russian": 'Rusia',
    "Italian": 'Italia',
    "Swiss": 'Suiza',
    "Spanish": 'España',
    "Finnish": 'Finlandia',
    "Indian": 'India',
    "Austrian": 'Austria',
    "Mexico": 'Mexico',
    "Venezuelan": 'Venezuela',
    "Belgian": 'Belgica',
    "French": 'Francia',
    "Mexican": 'Mexico',
    "Danish": 'Dinamarca',
    "Netherlands": 'Paises Bajos',
    "Swedish": 'Suecia',
    "American": 'Estados Unidos',
    "Finland": 'Finlandia',
    "Indonesian": 'Indonesia',
    "New Zealander": 'Nueva Zelanda',
    "Monaco": 'Monaco',
    "Canada": 'Canada',
    "Thailand": 'Tailandia',
    "Japan": 'Japon',
    "Argentine": 'Argentina',
    "Chinese": "China"

  };

  transform(value: string): string {
    if (!value) return value;
    return this.translations[value] || value;
  }
}
