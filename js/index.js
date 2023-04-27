var userPIN = 1234;


function formSubmitted() {
    var enteredPIN = parseInt(document.getElementById("pin").value);
    if (enteredPIN > 0 && enteredPIN < 9999) {
        if (enteredPIN == userPIN) {
            swal.fire({type: "success",
						text: "Bienvenido Maria Leon",
					   title: 'mensaje'
					    		  
					  });
			window.close();
			window.open('cajero.html');
			
            return true;
        }
        else {
			            swal.fire({type: "error",
						text: "PIN incorrecto",
					   title: 'mensaje'
					   			  
					  });
			        
            return false;
        }
    }
	
	           swal.fire({type: "error",
						text: "Por favor digite el PIN",
					   title: 'mensaje'
					   			  
					  });
	

    return false;
}

function inputChange() {
    var content = document.getElementById("pin").value;
    return content.length < 4;
}

