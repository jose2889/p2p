import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  model: NgbDateStruct;
  public formGroup: FormGroup;
   oredenCompra = []; 
   oredenVenta = []; 
   contador = 0;
   ordenes = []; 
   ganancia = 0
    disponible = 0; 
    tasa = 0; 
    spreed2 = 0; 
    total = 0; 

  constructor( private formBuilder: FormBuilder ) { }

  public ngOnInit() {
    this.buildForm();
    this.formGroup.valueChanges.subscribe(console.log);
  }

  private buildForm(){
    this.formGroup = this.formBuilder.group({
      cantidad: ['', Validators.required],
      precio: ['', Validators.required],
      tipo: ['', Validators.required],
      fecha:['', Validators.required]
    });
  }

  guardar(){
    console.log(this.formGroup.value.tipo); 

    let cantidad = parseFloat(this.formGroup.value.cantidad) ; 
    let precio = parseFloat(this.formGroup.value.precio); 
    let tipo = parseInt(this.formGroup.value.tipo); 
    let fecha= this.formGroup.value.fecha.day + '/'+this.formGroup.value.fecha.month + '/'+this.formGroup.value.fecha.year;

    this.ordenes.push({cantidad, precio, tipo, fecha, id:this.ordenes.length+1 }); 

    if (tipo == 1) {
      this.oredenCompra.push({cantidad, precio, estado:1}); 
      this.disponible = this.disponible + cantidad; 
      this.tasa = precio; 
    }

    if (tipo == 2) {
      this.oredenVenta.push({cantidad, precio, estado:1}); 
      this.disponible = this.disponible - cantidad; 

    }
    this.formGroup.reset(); 



    console.log(this.oredenCompra);
    console.log(this.oredenVenta);
  }

  calcular() {
      

    // 2000 + 2000 + 1500 - 3000 

    let auxCompra = this.oredenCompra; 
    let auxVenta = this.oredenVenta; 

    let spreed = 0; 
   
        this.oredenCompra.forEach(orden => {

            for (let i = 0; i < this.oredenVenta.length; i++)
            {
                if (orden.cantidad >= this.oredenVenta[i].cantidad && this.oredenVenta[i].estado != 0){
                    
                  spreed = this.oredenVenta[i].precio - orden.precio; 
                  this.ganancia = this.ganancia + (this.oredenVenta[i].cantidad * spreed); 
                  orden.cantidad = orden.cantidad - this.oredenVenta[i].cantidad; 
                  this.oredenVenta[i].estado = 0;
                }
                else if (orden.cantidad < this.oredenVenta[i].cantidad){
                  // if (oredenVenta[i].estado == 1){
                    let restante = this.oredenVenta[i].cantidad - orden.cantidad;
                    spreed = this.oredenVenta[i].precio - orden.precio; 
                    this.ganancia = this.ganancia + (orden.cantidad * spreed); 
                    this.oredenVenta[i].cantidad = restante; 
                    orden.cantidad = orden.cantidad - this.oredenVenta[i].cantidad; 
                    if (this.oredenVenta[i].cantidad > 0){
                      // i = i - 1;
                    break; 
                    } 
                    orden.estado = 0;
                    //break; 
                  // }
                }
            }
            console.log(orden); 
        });

        this.oredenCompra = auxCompra;
        this.oredenVenta = auxVenta; 

        Swal.fire({
          icon: 'success',
          title: 'Calculo de Ganancias',
          text: 'Ganancia: '+ this.ganancia
        })
    }

}
 