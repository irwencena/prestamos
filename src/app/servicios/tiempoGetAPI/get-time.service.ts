import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetTimeService { constructor(private httpClient: HttpClient) {}
APIurl: string = 'http://worldtimeapi.org/api/timezone/America/Mexico_City'

HorarioCheck(): Promise<boolean> {
  return new Promise((resolve, reject) => {
    this.httpClient
      .get(this.APIurl)
      .subscribe(
        (data: any) => {
          const serverTime = new Date(data.datetime);
          const hora = serverTime.getHours();
          if (hora >= 7 && hora <= 19) {
            resolve(true);
          } else {
            resolve(false);
          }
        },
        (error) => {
          console.error('Error al obtener la hora del servidor', error);
          reject(error);
        }
      );
  });
}

}
