import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetTimeService { constructor(private httpClient: HttpClient) {}
hora: any = this.getDatetime();


getDatetime() {
  this.httpClient.get('http://worldtimeapi.org/api/timezone/America/Mexico_City').subscribe(
    (data: any) => {
      const serverTime = new Date(data.datetime);  
      const hora = serverTime.getHours(); 
      return serverTime
      if (this.hora >= 7 && this.hora <= 19) {
        return true;  
      } else {
        return false;
      }      
    },
    (error) => {
      console.error('Error al obtener la hora del servidor', error);  
    }
  );
}

verificarhora(){
  this.getDatetime()
  console.log(this.hora)
  if (this.hora >= 7 && this.hora <= 19) {
    return true;  
  } else {
    return false;
  }
}
}
