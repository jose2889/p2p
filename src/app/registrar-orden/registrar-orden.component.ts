import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FirebaseServiceService } from '../services/firebase-service.service';

@Component({
  selector: 'app-registrar-orden',
  templateUrl: './registrar-orden.component.html',
  styleUrls: ['./registrar-orden.component.css']
})
export class RegistrarOrdenComponent implements OnInit {

  closeResult = '';

  estudianteForm: FormGroup;

  idFirabaseActualizar: string;
  actualizar: boolean;


  constructor(
    private modalService: NgbModal,
    public fb: FormBuilder,
    private firebaseServiceService: FirebaseServiceService
  ) { }

  config: any;
  collection = { count: 0, data: [] }

  ngOnInit(): void {
    this.idFirabaseActualizar = "";
    this.actualizar = false;
    //configuracion para la paginación
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.collection.data.length
    };
    //inicializando formulario para guardar los estudiantes
    this.estudianteForm = this.fb.group({
      cantidad: ['', Validators.required],
      precio: ['', Validators.required],
      tipo: ['', Validators.required],
      fecha: ['', Validators.required]
    });
    //cargando todos los estudiantes de firebase
    this.firebaseServiceService.getEstudiantes().subscribe(resp => {
      this.collection.data = resp.map((e: any) => {
        return {
          cantidad: e.payload.doc.data().cantidad,
          precio: e.payload.doc.data().precio,
          tipo: e.payload.doc.data().tipo,
          fecha: e.payload.doc.data().fecha,
          idFirebase: e.payload.doc.id
        }
      })
    },
      error => {
        console.error(error);
      }
    );
  }


  pageChanged(event) {
    this.config.currentPage = event;
  }

  eliminar(item: any): void {
    this.firebaseServiceService.deleteEstudiante(item.idFirebase);
  }

  guardarEstudiante(): void {
    this.firebaseServiceService.createEstudiante(this.estudianteForm.value).then(resp => {
      this.estudianteForm.reset();
      this.modalService.dismissAll();
    }).catch(error => {
      console.error(error)
    })
  }

  actualizarEstudiante() {
    console.log(this.idFirabaseActualizar);
    if (this.idFirabaseActualizar) {
      this.firebaseServiceService.updateEstudiante(this.idFirabaseActualizar, this.estudianteForm.value).then(resp => {
        this.estudianteForm.reset();
        this.modalService.dismissAll();
      }).catch(error => {
        console.error(error);
      });
    }
  }


  openEditar(content, item: any) {

    //llenar form para editar
    this.estudianteForm.setValue({
      precio: item.precio,
      cantidad: item.cantidad,
      tipo: item.tipo,
      fecha: item.fecha
    });
    this.idFirabaseActualizar = item.idFirebase;
    this.actualizar = true;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  open(content) {
    this.estudianteForm.reset();
    this.actualizar = false;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
