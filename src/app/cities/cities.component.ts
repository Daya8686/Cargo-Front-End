import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent {
  userType: string = '';
	cities: any = [];
	OriginalCities: any = []
	constructor(
		private service: AuthService

	) {
		this.getCities()
	}


  filterSearch(e: any) {
		const term = e.value;
		let CITIES = this.OriginalCities;

		const result = CITIES.filter((City: any) => {
			return (City.cityName.toLowerCase().match(term.toLowerCase()))
		})

		this.cities = result
	}


	getCities() {
		this.service.getCities().then((res) => {
			this.cities = res;
			this.OriginalCities = res
		}).catch((err) => {
		})
	}


}
