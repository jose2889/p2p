import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-registro-viejo',
  templateUrl: './registro-viejo.component.html',
  styleUrls: ['./registro-viejo.component.css']
})
export class RegistroViejoComponent implements OnInit {

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
    
  }

  private buildForm(){
    this.formGroup = this.formBuilder.group({
      cantidad: ['', Validators.required],
      precio: ['', Validators.required],
      tipo: ['', Validators.required],
      fecha: ['', Validators.required]
    });
  }

  guardar(){
    console.log(this.formGroup.value.tipo); 

    let cantidad = parseFloat(this.formGroup.value.cantidad) ; 
    let precio = parseFloat(this.formGroup.value.precio); 
    let tipo = parseInt(this.formGroup.value.tipo); 

    this.ordenes.push({cantidad, precio, tipo, id:this.ordenes.length+1 }); 

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
        
    let auxCompra = this.oredenCompra; 
    let auxVenta = this.oredenVenta; 
    let spreed = 0; 
   
        this.oredenCompra.forEach(orden => {

            for (let i = 0; i < this.oredenVenta.length; i++)
            {
                console.log("aqui", orden.cantidad >= this.oredenVenta[i].cantidad)
                if (orden.cantidad >= this.oredenVenta[i].cantidad){
                    
                    spreed = this.oredenVenta[i].precio - orden.precio; 
                    this.ganancia = this.ganancia + (this.oredenVenta[i].cantidad * spreed); 
                    orden.cantidad = orden.cantidad - this.oredenVenta[i].cantidad; 
                    this.oredenVenta[i].estado = 0;
                    console.log("GANANCIA: ",this.ganancia);
                }

                if (orden.cantidad < this.oredenVenta[i].cantidad){
                    // if (oredenVenta[i].estado == 1){
                        let restante = this.oredenVenta[i].cantidad - orden.cantidad;
                        spreed = this.oredenVenta[i].precio - orden.precio; 
                        this.ganancia = this.ganancia + (orden.cantidad * spreed); 
                        this.oredenVenta[i].cantidad = restante; 
                        orden.estado = 0;
                        console.log("GANANCIA", this.ganancia);
                        console.log("se rompe el ciclo");
                        break; 
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
