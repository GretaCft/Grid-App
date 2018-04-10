let micanvas =  document.querySelector("canvas");

micanvas.width = window.innerWidth;
micanvas.height = window.innerHeight;

let c = micanvas.getContext("2d");

let mouse = {
x:undefined,
y:undefined
};

window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;   
});

window.addEventListener('resize', function(event){
    micanvas.width = window.innerWidth;
    micanvas.height = window.innerHeight;
    init();
});

//Rectangulos

function Rectangulo(x, y, w, h, vx, vy, color){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.vx = vx;
    this.vy = vy;
    this.color = color;

    this.draw = function(){
        c.fillStyle = this.color;
        c.fillRect(this.x, this.y, this.w, this.h);
        c.strokeStyle = 'black';
        c.strokeRect(this.x,this.y, this.w,this.h);
    
    }

    this.update = function(){
        if(this.x + this.w > innerWidth || this.x - this.w < 0){
            this.vx = -this.vx;
        }
        if(this.y + this.h > innerHeight || this.y - this.h < 0){
            this.vy = -this.vy;
        }
        this.x += this.vx;
        this.y += this.vy;
    
     //Interaccion con usuario
        if(mouse.x - this.x < this.w && mouse.x - this.x > -this.w && 
                mouse.y - this.y < this.h && mouse.y - this.y > -this.h){
                if(this.color ==='white'){
                    this.color= 'black'; 
                }else if(this.color ==='black'){
                    this.color= 'white';
                }        
        }
        this.draw();
    }
}

let arrayGrid = [];

function init(){
    
    arrayGrid = [];

    for(let i = 0; i < 500; i++){
        let color = 'white';
        let w = Math.random() * 10 + 5;
        let h = w;
        let x = Math.random() * (innerWidth - w * 2) + w;
        let y = Math.random() * (innerHeight - w * 2) + w;
        let vx = (Math.random() - 0.5)/2;
        let vy = (Math.random() - 0.5)/2;
       
        
        arrayGrid.push(new Rectangulo(x, y, w, h, vx, vy, color));   
    }
}

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for(let i = 0; i < arrayGrid.length; i++){
        arrayGrid[i].update();
     
    }
}

init();
animate();