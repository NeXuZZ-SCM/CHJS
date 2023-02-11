$(function() {
    $('input[name="daterange"]').daterangepicker({
      opens: 'left'
    }, function(start, end) {
        start = start.format('YYYY-MM-DD');
        end = end.format('YYYY-MM-DD');
        let diferenciaEnDias = CalcularDiferenciaEntreFechas(start , end);
        datetimeStart = new Date(start);
        datetimeEnd = new Date(end);

        BorrarHTMLCalculoAnterior();
        RecorrerFechasDesdeHasta(datetimeStart, datetimeEnd, diferenciaEnDias);
  });
  
})

function BorrarHTMLCalculoAnterior(){
    document.getElementById('result').innerHTML = "";
}

function CalcularDiferenciaEntreFechas(start , end){
    let fechaInicio = new Date(start).getTime();
    let fechaFin    = new Date(end).getTime();
    let diff = fechaFin - fechaInicio;
    return diff/(1000*60*60*24) ;
}


function RecorrerFechasDesdeHasta(start, end, diferenciaEnDias){
  let fechaInicio = start;
  let fechaFin    = end;
  let descuento = CalcularDescuento(diferenciaEnDias);



  let dia = 0;
  while(fechaFin.getTime() >= fechaInicio.getTime()){
      fechaInicio.setDate(fechaInicio.getDate() + 1);
      dia += 0.02;
      let markup = CalcularMarkup(descuento, dia);
      document.getElementById('result').innerHTML += ObtenerDia(fechaInicio, markup) ;
  }
}

function ObtenerDia(fechaInicio, markup){
    return "Si se compra el " + fechaInicio.getFullYear() + '/' + (fechaInicio.getMonth() + 1) + '/' + fechaInicio.getDate() + ":  $" + markup + "<br>";
}

function CalcularMarkup(descuento, dia){
    let precio = 20000;
    let precioConDescuento = precio - (precio * descuento);
    let markup = precioConDescuento*dia;
    return Math.ceil(precioConDescuento + markup);
}

function CalcularDescuento(diferenciaEnDias){
    let descuento = 0;
    if (diferenciaEnDias >= 10) {
        descuento = 0.2;
        document.getElementById('descuento').innerHTML = `<br>
                                                            <div class="alert alert-success" role="alert">
                                                                Se aplica un descuento del 20% sobre el precio base del paquete
                                                            </div>`;

    }else{
        document.getElementById('descuento').innerHTML = `<br>
                                                        <div class="alert alert-danger" role="alert">
                                                            Selecciona un paquete mayor a 10 dias para obtener un descuento
                                                        </div>`;
    }

    return descuento;

}
