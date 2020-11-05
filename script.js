  
// Functions
// ===================================================    
function insertArrows() {
    if(numberImages > 4) {
        arrowLeft.src = "img/arrows/arrowLeft.jpg";
        left.appendChild(arrowLeft);
    } else {
        arrowLeft.src = "img/arrows/arrowNo.jpg";
        left.appendChild(arrowLeft);           
    }
        arrowRight.src = "img/arrows/arrowNo.jpg";
        right.appendChild(arrowRight);          
}
    
    // Ustalenie obiektów
    // ===================================================
    var obrazek = document.getElementById("obrazek");
    var galeria = document.getElementById("galeria");
    var blok = document.getElementById("blok");
    var fotki = document.getElementById("fotki");
    var allImages = document.querySelectorAll('#fotki img');
    var numberFotki = document.getElementById("numberFotki");
    var left  = document.getElementById("left");
    var right = document.getElementById("right");
    var count = 0;
    var speedFotek = 100; // speed przesuwu fotek
    
    // Ustalenia wstępne
    // ---------------------------------------------------
    blok.style.overflow = "hidden";
    
    // ustalamy liczbe obrazków
    var numberImages = allImages.length;

    // ustalamy width dla DIV fotki
    var fotkiWidth = fotki.style.width = numberImages*100 +"px";

    // wstawienie umg przycisków
    var arrowLeft = new Image();
    var arrowRight = new Image();     
    insertArrows();
    
    // Click - przyciski przesunięcia fotek - mini galerii
    // ===================================================
    
    console.log("fotki.clientWidth = " + fotki.clientWidth);
    console.log(fotki.offsetLeft);
    console.log(fotki.clientWidth+fotki.offsetLeft);

    // wyrównanie arytmetyczne dla animacji
    // ------------------------------------
    function wyrownanieArytmetyczne() {
        var podniesZmiany = Math.round(fotki.offsetLeft * 0.1) * 10;
        fotki.style.left = podniesZmiany;
        //console.log("wyrownanieArytmetyczne - fotki.offsetLeft = " + fotki.offsetLeft);        
    }

    // animacja przesuwu fotek
    // ------------------------------------
    function animacjaFotek(strona) {
        return new Promise(function(resolve, reject) {

        function animacja(strona) {
            console.log("A N I M A C J A");
                
            console.log("animacja count = " + count);
            count+=10;
            if(count <= 100) {
                if(strona == "left") {
                    fotki.style.left = fotki.offsetLeft -10 + 'px';
                    console.log("offsetLeft = " + fotki.offsetLeft);
                    wyrownanieArytmetyczne();
                    }
                if(strona == "right") {
                    fotki.style.left = fotki.offsetLeft +10 + 'px';
                    console.log("offsetLeft = " + fotki.offsetLeft);  
                    wyrownanieArytmetyczne();
                    }
                setTimeout(function() {
                    animacja(strona);
                }, speedFotek);
            } else {
                //resolve("---- Koniec animacji ----");
                if(count == 110) {
                    resolve("---- Koniec animacji ----");}
                else {
                    reject("---- Animacja STOP ----");}
            }
        }
        animacja(strona);
 
        });
    }
    
    // Click - left
    // ------------------------------------
    function leftClick() {
        console.log('clickLeft =================');
        
        var warLeft = 500;
        if(numberImages > 4 && ((fotki.clientWidth+fotki.offsetLeft)) >= warLeft) {
            
            // blokada click Left
            console.log(this);
            this.onclick = null;
            
            arrowLeft.src = "img/arrows/arrowLeft.jpg";
            arrowRight.src = "img/arrows/arrowRight.jpg";
            
            count = 0;

            var p1 = animacjaFotek("left");
            var p2 = new Promise(function(resolve, reject) {
                resolve('Po animacji LEWO');
            });
            
            p1.then(function(v){
                console.log(v);
            }).then(function(){
                return p2;
            }).then(function(v){
                console.log(v);
                
                console.log("---- Dane po przesunięciu -----");    
                console.log("fotki.clientWidth                  = " + fotki.clientWidth);
                console.log("fotki.offsetLeft                   = " + fotki.offsetLeft);
                console.log("fotki.clientWidth+fotki.offsetLeft = " + (fotki.clientWidth+fotki.offsetLeft));

                console.log("---- Sprawdzam warunki LEWO -----");
                if((fotki.clientWidth+fotki.offsetLeft) < warLeft) {
                    arrowLeft.src = "img/arrows/arrowNo.jpg";
                    arrowRight.src = "img/arrows/arrowRight.jpg";
                }                
                left.onclick = leftClick;
            });

        } else {
            arrowLeft.src = "img/arrows/arrowNo.jpg";
        }
    }
    
    // Click - right
    // ------------------------------------
    function rightClick() {
        console.log('clickRight =================');

        var warRight = 0;
        if(numberImages > 4 && (fotki.offsetLeft < warRight)) {
            
            // blokada click Right
            console.log(this);
            this.onclick = null;
            
            arrowRight.src = "img/arrows/arrowRight.jpg";
            arrowLeft.src = "img/arrows/arrowLeft.jpg";
            
            count = 0;
            
            var p1 = animacjaFotek("right");
            var p2 = new Promise(function(resolve, reject) {
                resolve('Po animacji PRAWO');
            });
            
            p1.then(function(v){
                console.log(v);
            }).then(function(){
                return p2;
            }).then(function(v){
                console.log(v);
                
                console.log("---- Dane po przesunięciu -----");    
                console.log("fotki.clientWidth                  = " + fotki.clientWidth);
                console.log("fotki.offsetLeft                   = " + fotki.offsetLeft);
                console.log("fotki.clientWidth+fotki.offsetLeft = " + (fotki.clientWidth+fotki.offsetLeft));

                console.log("---- Sprawdzam warunki PRAWO -----");
                if((fotki.offsetLeft) >= warRight) {
                        arrowRight.src = "img/arrows/arrowNo.jpg";
                        arrowLeft.src = "img/arrows/arrowLeft.jpg";
                    } 
                right.onclick = rightClick;
                });                

        } else {
            arrowRight.src = "img/arrows/arrowNo.jpg";
        }
    }
    
    left.onclick = leftClick;
    
    right.onclick = rightClick; 

    function fadeOut() {
        obrazek.style.transition = "opacity 0.3s linear";
        obrazek.style.opacity = 0;

    }
    function fadeIn() {
        obrazek.style.transition = "opacity 1.0s linear";
        obrazek.style.opacity = 1;
    }

    // Click - wybrany obrazek - pokaz DUŻEGO img
    // ===================================================

    // Numeracja img
    // ---------------------------------------------------
    for(var i=0; i<allImages.length; i++) {
        allImages[i].setAttribute("alt","pik"+(i+1));
        allImages[i].onclick = function(e) {
            console.log("showImage");
            var src_pozycja = this.src.lastIndexOf("/")+1;

            //fadeOut | fadeIn
            // ---------------
            fadeOut();
            var thisTo = this;
            setTimeout(function() {
                fadeIn();
                // new IMG
                obrazek.src = thisTo.src.substring("img/"+src_pozycja);
            }, 300);

            var numberAlt = this.getAttribute("alt").substring(3);
            numberFotki.textContent = "Number of images: "+ numberAlt +"/" + numberImages;
        }
    }
