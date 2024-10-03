import { Injectable } from '@angular/core';
import { firebaseConfig } from '../firebase-config';
import { doc, getFirestore, setDoc,getDoc, query, collection, getDocs, addDoc, where, updateDoc, deleteDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { BehaviorSubject, range } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DocaddService {
  private db = getFirestore(initializeApp(firebaseConfig));
  constructor(private router: Router) {  
    const DataUsuario =  sessionStorage.getItem('usuario')
    if (DataUsuario) {
      this.usuario = JSON.parse(DataUsuario);
    }
}

  async añadir(data: any) {
    try {
      const docRef = await addDoc(collection(this.db, this.usuario.nocontrol), data);
      console.log('Doc agregao con id: ', docRef.id);
    } catch (error) {
      console.error('error al agregar doc: ', error);
    }
  }
  async añadirinv(data: any) {
    try {
      const docRef = await addDoc(collection(this.db, 'inventario'), data);
      console.log('Doc agregado con id: ', docRef.id);
    } catch (error) {
      console.error('error al agregar doc: ', error);
    }
  }
  async useradd(data: any) {
    try {
      const docRef = doc(this.db, 'usuarios', data.nocontrol);
      
      await setDoc(docRef, data);
  
      console.log('Usuario nuevo registrado: ', data.nocontrol);
    } catch (error) {
      console.error('Error al agregar doc: ', error);
    }
  }
  usuario: any = {};

  async docget(data: any) {
    try {
      console.log(this.usuario)
      console.log('control:' , this.usuario.nocontrol )
      const q = query(collection(this.db, data.nocontrol ));
      const querySnapshot = await getDocs(q);
      const items: any[] = [];
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      return items;
    } catch (error) {
      console.error('Error en la consulta: ', error);
      return [];
    }
  }

  async docgetusers() {

    try {
      const q = query(collection(this.db, 'usuarios'));
      const querySnapshot = await getDocs(q);
      const items: any[] = [];
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      return items;
    } catch (error) {
      console.error('Error en la consulta: ', error);
      return [];
    }
  }

  async docgetinv() {
    

    try {
      const q = query(collection(this.db, 'inventario' ));
      const querySnapshot = await getDocs(q);
      const items: any[] = [];
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      return items;
    } catch (error) {
      console.error('Error en la consulta: ', error);
      return [];
    }
  }
  async verificarYAgregarUsuario(userdata: any) {
    try {
      const q = query(collection(this.db, 'usuarios'), where('nocontrol', '==', userdata.nocontrol));
      const querySnapshot = await getDocs(q);
  
      if (querySnapshot.empty) {
        userdata.password = false;
        await this.useradd(userdata);
        sessionStorage.setItem('usuario', JSON.stringify(userdata));
        console.log('Usuario agregado:', userdata);
      } else {
        console.log('El usuario ya existe con el número de control:', userdata.nocontrol);
      }
    } catch (error) {
      console.error('Error al verificar o agregar el usuario:', error);
    }
  }
  
  async actualizarPass(newPassword: any, control: any){
    try {
      // Actualizar la contraseña en Firestore
      const userDocRef = doc(this.db, `usuarios/${control}`);
      await updateDoc(userDocRef, {
        pass: newPassword
      });
      await updateDoc(userDocRef, {
        password: true
      });
      console.log('Contraseña actualizada correctamente');
    } catch (error) {
      console.error('Error al actualizar la contraseña:', error);
    }
  }

  async updateEditItem(update: any){
    try {
      const { id, ...updateWOid } = update;
      const userDocRef = doc(this.db, `inventario/${update.id}`);
      await updateDoc(userDocRef, updateWOid);
      console.log('Item actualizado: ');
    } catch (error) {
      console.error('Error al actualizar el item:', error);
    }
  }

  async eliminarItemInv(item: any){
    try {
      const itemDocRef = doc(this.db, `inventario/${item.id}`);
      await deleteDoc(itemDocRef);
      console.log(`Item con ID ${item.id} eliminado`);
    } catch (error) {
      console.error('Error al eliminar el item:', error);
    }

  }

  async getpass(control: any) {
    try {
      const userDocRef = doc(this.db, `usuarios/${control}`);
      const userDocSnap = await getDoc(userDocRef);
  
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
  
        // Verificar si el campo "pass" existe en los datos
        if ('pass' in userData) {
          return true;
        } else {
          return false;
        }
      } else {
        console.error('No se encontró el documento del usuario.');
        return false;
      }
    } catch (error) {
      console.error('Error al obtener la contraseña:', error);
      return null;
    }
  }
  

  async iniciarSesion(emailIngresado:any,passIngresado:any ) {
   

    if (!emailIngresado || !passIngresado) {
      console.error('Por favor, completa ambos campos.');
      return;
    }

    try {
      // Extraer número de control del correo ingresado, eliminando la letra "l"
      const nocontrol = emailIngresado.split('@')[0].substring(1);  // "20270764" de "l20270764@quer..."

      // Referencia al documento del usuario en Firestore
      const userRef = doc(this.db, `usuarios/${nocontrol}`);
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();

        // Comparar el correo y la contraseña con los ingresados
        if (userData['email'] === emailIngresado && userData['pass'] === passIngresado) {
          // Si coinciden, guardar en sessionStorage
          sessionStorage.setItem('usuario', JSON.stringify(userData));
          this.router.navigate(['/perfil']);

        } else {
          console.error('Correo o contraseña incorrectos.');
        }
      } else {
        console.error('No se encontró un usuario con ese número de control.');
      }
    } catch (error) {
      console.error('Error al verificar las credenciales:', error);
    }
}
categorias: string[] = [];

async getCat(): Promise<string[]> {
  const categorias: string[] = [];

  try {
    const querySnapshot = await getDocs(collection(this.db, 'categorias'));

    querySnapshot.forEach(doc => {
      const data = doc.data();
      // Iterar sobre todas las claves del documento y agregar sus valores al arreglo
      Object.keys(data).forEach(key => {
        categorias.push(data[key]);  // Agregar cada valor de las categorías al arreglo local
      });
    });

    return categorias;  // Retornar el arreglo de categorías al final
  } catch (error) {
    console.error("Error al obtener las categorías: ", error);
    return [];  // Retornar un arreglo vacío en caso de error
  }
}




}
