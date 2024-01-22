var TxtType = function(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    };

    TxtType.prototype.tick = function() {
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

    function getRandomEmoji() {
        const emojis = ['❤️','🤎','💜','❤','💜'];
        const randomIndex = Math.floor(Math.random() * emojis.length);
        return emojis[randomIndex];
    }
    
    // Función para crear un nuevo emoji y animarlo
    function createEmoji() {
        const emoji = document.createElement('span');
        emoji.innerHTML = getRandomEmoji();
        emoji.style.position = 'absolute';
        emoji.style.fontSize = Math.random() * 20 + 10 + 'px';
        //emoji.style.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
        emoji.style.opacity = 0.3;
        emoji.style.transform = `translate(${Math.random() * window.innerWidth}px, -20px) rotate(${Math.random() * 360}deg)`;
    
        document.getElementById('rainContainer').appendChild(emoji);
    
        // Animación de la caída del emoji
        anime({
            targets: emoji,
            translateY: window.innerHeight + 20,
            duration: Math.random() * 2000 + 1500,
            easing: 'easeInOutSine',
            translateX: 220,
            direction: 'alternate',
            complete: function() {
                emoji.remove(); // Elimina el emoji después de la animación
                createEmoji(); // Crea un nuevo emoji para reemplazarlo
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
              new TxtType(elements[i], JSON.parse(toRotate), period);
            }
            
        } for (let i = 0; i < 30; i++) {
            createEmoji();
        }

        // INJECT CSS
        var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
        document.body.appendChild(css);
    };