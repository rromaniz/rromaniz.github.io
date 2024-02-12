var textType = function(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    };

    textType.prototype.tick = function() {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];

        if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

        var that = this;
        var delta = 200 - Math.random() * 100;

        if (this.isDeleting) { delta /= 2; }

        if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
        }

        setTimeout(function() {
        that.tick();
        }, delta);
    };

    function getRandomImage() {
        const images = [
            'assets/hasbu.png',
            'assets/cheems.png',
            'assets/cheems_dos.png',
            'assets/hasbu_dos.png',
        ];
        const randomIndex = Math.floor(Math.random() * images.length);
        return images[randomIndex];
    }
    
    function createImage() {
        const image = document.createElement('img');
        image.src = getRandomImage(); // Selecciona una imagen aleatoria
        image.style.position = 'absolute';
        image.style.width = Math.random() * 80 + 40 + 'px';
        image.style.height = 'auto';
        image.style.opacity = 0.5;
        image.style.transform = `translate(${window.innerWidth / 2}px, -60px) rotate(${Math.random() * 350}deg)`; // Modificar la posición inicial para que sea el centro de la pantalla

        document.getElementById('rainContainer').appendChild(image);

        // Animación de la caída de la imagen
        anime({
            targets: image,
            translateY: window.innerHeight + 20,
            duration: Math.random() * 3500 + 4000,
            easing: 'easeInOutSine',
            translateX: window.innerWidth / 2, // Modificar la posición final para que sea el centro de la pantalla
            direction: 'alternate',
            complete: function() {
                image.remove(); // Elimina la imagen después de la animación
                createImage(); // Crea una nueva imagen para reemplazarla
            }
        });
    }
    
    // // Crear emojis iniciales
   

    window.onload = function() {
        var elements = document.getElementsByClassName('typewrite');
        for (var i=0; i<elements.length; i++) {
            var toRotate = elements[i].getAttribute('data-type');
            var period = elements[i].getAttribute('data-period');
            if (toRotate) {
              new textType(elements[i], JSON.parse(toRotate), period);
            }
            
        } for (let i = 0; i < 30; i++) {
            createImage();
        }

        // INJECT CSS
        var css = document.createElement("style");
        css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
        document.body.appendChild(css);
    };