export class Starship {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  hyperdrive_rating: string;
  MGLT: string;
  starship_class: string;
  pilots: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
  id: string;

  constructor(data: any = {}) {
    this.name = data.name;
    this.model = data.model;
    this.manufacturer = data.manufacturer;
    this.cost_in_credits = data.cost_in_credits;
    this.length = data.length;
    this.max_atmosphering_speed = data.max_atmosphering_speed;
    this.crew = data.crew;
    this.passengers = data.passengers;
    this.cargo_capacity = data.cargo_capacity;
    this.consumables = data.consumables;
    this.hyperdrive_rating = data.hyperdrive_rating;
    this.MGLT = data.MGLT;
    this.starship_class = data.starship_class;
    this.pilots = data.pilots;
    this.films = data.films;
    this.created = data.created;
    this.edited = data.edited;
    this.url = data.url;
    this.id = data.url
      .replace('https://swapi.dev/api/starships/', '')
      .replace('/', '');
  }
}
