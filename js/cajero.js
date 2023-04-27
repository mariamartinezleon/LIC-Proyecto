var imagenes = [];
imagenes["100"] = "./img/100.jpg"
imagenes["50"] = "./img/50.jpg"
imagenes["20"] = "./img/20.jpg"
imagenes["10"] = "./img/10.jpg"
imagenes["5"] = "./img/5.jpg"

class Billete
{
	constructor(v, c)
	{
		this.valor = v;
		this.cantidad = c;
		this.imagen = new Image();
		this.imagen.src = imagenes[this.valor];

		
	}
}

var caja = [];
caja.push( new Billete(100, 1) );
caja.push( new Billete(50, 2) );
caja.push( new Billete(20, 5) );
caja.push( new Billete(10, 10) );
caja.push( new Billete(5, 20) );


contar();

var div = 0;
var papeles = 0;

var resultado = document.getElementById("resultado");
var b = document.getElementById("retirar");
b.addEventListener("click", entregarDinero);


var boton_saldo = document.getElementById("ver_saldo");
boton_saldo.addEventListener("click", saldo);


var boton_depositar = document.getElementById("depositar");
boton_depositar.addEventListener("click", depositar);

function guardar_caja (denominacion)

{
	

	
var cant = prompt("Cantidad de billetes", 1);
			while(isNaN(cant))
			{
				cant = prompt(cant + "El valor no esta correcto, por favor digite un valor correcto..");
			}
	
	
	var indice = -1;
	
switch (parseInt (denominacion)) {
  case 100:
	indice = 0;
    break;
  case 50:
    indice = 1;
    break;
  case 20:
    indice = 2;
    break;
  case 10:
    indice = 3;
    break;
  case 5:
	indice = 4;
    break;
  
}
var localstorage1 = [];	
var cliente= "Maria Leon";
var cuenta = "0012346789"; 
var miObjeto = {id:generateID(),cliente: cliente , cuenta: cuenta ,denominacion: denominacion, cantidad: cant  };
	
localstorage1.push(miObjeto);
	
	// Guardo el objeto como un string en el local storage
localStorage.setItem('datos', JSON.stringify(localstorage1) );
	//var guardado = JSON.parse(localStorage.getItem('datos'));
	// document.getElementById("result").innerHTML = "denominacion: " + guardado[0].denominacion + " - cantidad: " + guardado[0].cantidad;
	
	caja[indice].cantidad = caja[indice].cantidad + parseInt(cant);
	resultado.innerHTML += "Se ha depositado " + cant + " Billetes de: $" + denominacion + "<hr />";
	
	  var clienteLS = localstorage1.map(datos => datos.cliente );
	  var cuentaLS =  localstorage1.map(datos => datos.cuenta );
	  var denom = localstorage1.map(datos => parseInt(datos.denominacion) );
	  var denomT = denom.reduce((acc, item) => (acc += item), 0).toFixed(2);
      var canti = localstorage1.map(datos => parseInt(datos.cantidad) );
	  var cantiT = canti.reduce((acc, item) => (acc += item), 0).toFixed(2);
	
	
      var totald = denomT*cantiT;

	//resultado.innerHTML + "total"+ totald;

	   var doc = new jsPDF();
let fecha = new Date();	

doc.setTextColor(100);
doc.setFont("helvetica");
doc.setFontType("bold");
doc.setFontSize(24);
doc.text(20, 20, '»»»»»»»»»»»»BANCO POKEMON««««««««««««');
//doc.addImage(imgData, 'JPEG', 10, 40, 180, 180);
doc.setTextColor(150);
doc.setFont("courier");
doc.setFontType("bolditalic")
doc.setFontSize(20);
doc.text(20, 30, 'Comprobante de Deposito.');
doc.setTextColor(100);
doc.setFontSize(12);
doc.text(20, 40, 'Fecha:'+ fecha);
doc.setFontSize(20);
doc.text(20, 50, 'Cliente:');
doc.setTextColor(50);
doc.text(80, 50,clienteLS);
doc.setTextColor(100);
doc.text(20, 60, '# de Cuenta:');
doc.setTextColor(50);
doc.text(80, 60, cuentaLS);
doc.setTextColor(100);
doc.text(20, 70, 'Realizo un deposito de:');
doc.setTextColor(0,0,255);
doc.text(128, 70, '$' + totald);
doc.setTextColor(100);
doc.text(20, 80, 'Billetes denominacion de:' );	
doc.setTextColor(50);
doc.text(128, 80, '$' + denomT);
doc.setTextColor(100);
doc.text(20, 90, 'Cantidad de Billetes :' );	
doc.setTextColor(50);
doc.text(128, 90, '' + cantiT);
doc.setFontSize(20);
doc.setTextColor(150);
doc.setFont("courier");
doc.setFontType("bolditalic");
doc.text(20, 110, '¡Gracias por utilizar nuestros servicios!');
doc.text(24, 115, 'Banco Pokemon, sucursal Electronica.');
doc.setTextColor(50);
doc.text(80, 120, 'Powered by JF');

//archvo a generar 
doc.save('Pokedeposito.pdf');
 
	//addTransactionDOM(localstorage1);
	 //balance.innerText = `$${total}`;
}	

function generateID() {
  return Math.floor(Math.random() * 100000000);
}

function depositar()
{
	
	var monto = prompt("Indica el valor a depositar: Billetes 100, 50, 20, 10, 5", "20");
	if(monto == 100 || monto == 50 ||  monto == 20 || monto == 10 || monto == 5)
	{
		
	guardar_caja(monto);
		
		
	}
	else
	{
		resultado.innerHTML = ("Ingrese un valor correcto por favor" + "<hr />");
	}

}

function saldo(valor, cantidad)
{
	var monto = 0;
	for(var v of caja)
	{
		monto = monto + v.valor * v.cantidad;
		total = monto;
		resultado.innerHTML = "El Saldo que posee es: " + monto + "<hr />";
		
		

	}
	grafico();
	pdfsaldo(monto);
	
}

function entregarDinero()
{
	var dibujado = [];
	var t = document.getElementById("dinero");
	dinero = parseInt(t.value);

	if (total >= dinero)
	{
		//bucle para recorrer el arreglo caja 
		for(bi of caja)
		{
			if (dinero > 0)
			{
				//Saber si tengo las denominaciones necesarias para suministrar el valor
				div = Math.floor(dinero/bi.valor);
				if (div>bi.cantidad)
				{
					papeles = bi.cantidad;
				}
				else
				{
					papeles = div;
				}
				// actualiza el valor que se tiene 
					bi.cantidad = bi.cantidad-papeles;
				for (var i = 0; i < papeles; i++)
				{
					dibujado.push ( new Billete(bi.valor, 1) );
					
				}
				dinero -= (bi.valor * papeles);
			}
		}
		if (dinero == 0)
		{    
			//Imprime el resultado de y muestra las imagenes de los billetes 
			resultado.innerHTML += "Se ha retirado: <br />";
			for(var e of dibujado)
			{		
				resultado.innerHTML += "<img src=" + e.imagen.src + " />";
			}
			resultado.innerHTML += "<hr />";

		
	
		contar();	
		}
		else
		{
			resultado.innerHTML += "No tengo los billetes necesarios para esa suma, intenta otro valor <hr />";
		}
	}
	else
	{
		resultado.innerHTML += "No exiten fondos... <hr />";
	}	
}


function contar()
{
	total = 0
	for (var tot of caja)
	{
		total = total + tot.valor * tot.cantidad;
	}
	
	console.log(total);
	 

	
}

function grafico()
{
// Grafica de cantidad de denominacion


var cien 		= caja[0].cantidad;
var cincuenta 	= caja[1].cantidad;
var veinte 		= caja[2].cantidad;
var diez 		= caja[3].cantidad;
var cinco 		= caja[4].cantidad;



// Obtener una referencia al elemento canvas del DOM
const $grafica = document.querySelector("#grafica");
const Denominacionbillete = {
    label: "Grafico de valores de billete por denominacion",
    data: [cien, cincuenta, veinte, diez, cinco], 
    backgroundColor: 'rgba(10,10,20,0.4)', // Color de fondo
    borderColor: 'rgba(59,0,7,0.79)', // Color del borde
    borderWidth: 3,// Ancho del borde
};
new Chart($grafica, {
    type: 'bar',// Tipo de gráfica
    data: {
        labels: ["$100", "$50", "$20", "$10", "$5"],
        datasets: [    Denominacionbillete ,         
        ]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }],
        },
    }
});
}

function pdfsaldo(monto)
{
	//PDF de saldo total 
var localstorage2 = [];	
localStorage.setItem('datos', JSON.stringify(localstorage2) );
	  var clienteLS = localstorage2.map(datos => datos.cliente );
	  var cuentaLS =  localstorage2.map(datos => datos.cuenta );	
	
	//alert (clienteLS);
var cliente= "Maria Leon";
var cuenta = "0012346789"; 
var doc2 = new jsPDF();
let fecha2 = new Date();
doc2.setTextColor(100);
doc2.setFont("helvetica");
doc2.setFontType("bold");
doc2.setFontSize(24);
doc2.text(20, 20, '»»»»»»»»»»»»BANCO POKEMON««««««««««««');
doc2.setTextColor(100);
doc2.setFontSize(12);
doc2.text(20, 40, 'Fecha:'+ fecha2);
doc2.setFontSize(20);
doc2.text(20, 50, 'Cliente:');
doc2.setTextColor(50);
doc2.text(80, 50, '' + clienteLS);
doc2.setTextColor(100);
doc2.text(20, 60, '# de Cuenta:');
doc2.setTextColor(50);
doc2.text(80, 60, cuenta);
doc2.setTextColor(100);
doc2.text(20, 70, 'Usted posee un saldo de:');
doc2.setTextColor(0,0,255);
doc2.text(128, 70, '$' + monto);
doc2.setFontSize(20);
doc2.setTextColor(150);
doc2.setFont("courier");
doc2.setFontType("bolditalic");
doc2.text(20, 110, '¡Gracias por utilizar nuestros servicios!');
doc2.text(24, 115, 'Banco Pokemon, sucursal Electronica.');
doc2.setTextColor(50);
doc2.text(80, 120, 'Powered by JF');
	//archvo a generar 
doc2.save('saldo.pdf');	
}
