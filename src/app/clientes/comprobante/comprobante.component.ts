import { Component, OnInit } from '@angular/core';
import { parsearErroresAPI } from 'src/app/helpers/helpers';
import { ventaDTO } from 'src/app/services/venta';
import { VentasService } from 'src/app/services/ventas.service';

import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-comprobante',
  templateUrl: './comprobante.component.html',
  styleUrls: ['./comprobante.component.css'],
})
export class ComprobanteComponent implements OnInit {
  errores: string[] = [];
  isLoading = false;

  venta: ventaDTO;
  constructor(private ventasService: VentasService) {}

  ngOnInit(): void {
    this.obtenerComprobante();
  }

  obtenerComprobante() {
    this.isLoading = true;
    let idVenta = Number(sessionStorage.getItem('idVenta'));
    this.ventasService.obtenerComprobante(idVenta).subscribe(
      (venta) => {
        this.venta = venta;
        this.isLoading = false;
      },
      (error) => {
        this.errores = parsearErroresAPI(error);
        this.isLoading = false;
      }
    );
  }

  downloadPDF() {
    // Extraemos el
    const DATA: any = document.getElementById('htmlData'); //tomtamos todo lo que esta en el htmldata
    const doc = new jsPDF('p', 'pt', 'a4'); //configuración del pdf parametros = orientacion |unidades | formato

    const options = {
      background: 'white', //color fondo
      scale: 3, //escala
    };
    html2canvas(DATA, options)
      .then((canvas) => {
        const img = canvas.toDataURL('image/PNG'); //crear una imagen en png

        // Add image Canvas to PDF
        const bufferX = 30;
        const bufferY = 30;
        const imgProps = (doc as any).getImageProperties(img);
        const pdfWidth = doc.internal.pageSize.getWidth() - 1 * bufferX; //dejamos margen de 30 pt
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        doc.addImage(
          img,
          'PNG',
          bufferX,
          bufferY,
          pdfWidth,
          pdfHeight,
          undefined,
          'FAST' //comresión rápida
        );
        return doc;
      })
      .then((docResult) => {
        docResult.save(
          `${new Date().toISOString().slice(0, 10)}_Comprobante.pdf`
        ); //nombre del pdf
      });
  }
}
