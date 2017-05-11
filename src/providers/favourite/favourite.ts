import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from "@ionic/storage";

@Injectable()
export class FavouriteProvider {

  constructor(private http: Http, private storage: Storage) {
    console.log('Hello FavouriteProvider Provider');
  }


  /**
   * Add to list of favorites
   * 
   * @param {number} route 
   * @param {string} title 
   * @param {number} code 
   * @param {number} id 
   * 
   * @memberof FavouriteProvider
   */
  public addToFavourites(route: number, title: string, code: number, id: number): void {
    // FavouriteProvider
    this.storage.get('favourites')
      .then((favourites: Set<string>) => {

        if (favourites==null) {
          favourites = new Set<string>();
        }

        favourites.add(JSON.stringify(
          {
            'route': route,
            'title': title,
            'code': code,
            'id': id
          }
        ));


        this.storage.set('favourites', favourites)
          .then(value => {
            console.log('set favourites');
          })
          .catch(err => {
            console.log('error with favourites');
            console.log(err);
          })


      })
      .catch(err => {
        console.log(err);
      });
  }

  /**
   * Gets an array of favourites objects
   * 
   * @returns {Promise<Object[]>} 
   * 
   * @memberof FavouriteProvider
   */
  public getAllFavourites():Promise<Object[]>{
    return new Promise<Object[]>((resolve, reject)=>{
      this.storage.get('favourites')
      .then((favourites: Set<String>) => {
        let favArr=[];
        
        Array.from(favourites).forEach((favourite:string)=>{
          favArr.push(JSON.parse(favourite));
        });

        resolve(favArr);
      })
      .catch(err =>{
        reject(err);
      })
    });
  }



}