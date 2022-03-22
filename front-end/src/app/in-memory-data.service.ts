import { Account } from './account';
import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

    createDb(){
        const passwords: Account[] = [
            {id: 1 ,img: '../assets/img/youTube.png', title: "Youtube",email: 'Dmitry', url: 'youtube.com', password: 'asdSDAS13D3d', description: ""},
            {id: 2 ,img: '../assets/img/youTube.png', title: "Netflix",email: 'Dmyto Horkun', url: 'nure.ua', password: 'hfjsdhfdsf7dsf9', description: ""},
            {id: 3 ,img: '../assets/img/youTube.png', title: "Nure",email: 'Vspominay', url: 'stackoferwlof.com', password: 'nmvx79xvc', description: ""},
            {id: 4 ,img: '../assets/img/youTube.png', title: "GitHub",email: 'gk.dimon', url: 'instagram.com', password: 'fhsajfs412', description: ""},
            {id: 5 ,img: '../assets/img/youTube.png', title: "Youtube",email: 'Dmitry', url: 'youtube.com', password: 'asdSDAS13D3d', description: ""},
            {id: 6 ,img: '../assets/img/youTube.png', title: "Netflix",email: 'Dmyto Horkun', url: 'nure.ua', password: 'hfjsdhfdsf7dsf9', description: ""},
            {id: 7 ,img: '../assets/img/youTube.png', title: "Nure",email: 'Vspominay', url: 'stackoferwlof.com', password: 'nmvx79xvc', description: ""},
            {id: 8 ,img: '../assets/img/youTube.png', title: "GitHub",email: 'gk.dimon', url: 'instagram.com', password: 'fhsajfs412', description: ""},
        ]
        
        return {passwords}
    }

    constructor() { }
}
