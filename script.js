class Complex{
	constructor(x,y){
		this.x=x;
		this.y=y;
	}
	static add(c1,c2){
		return new Complex(c1.x+c2.x,c1.y+c2.y)
	}
	static multiply(c1,c2){
		return new Complex((c1.x*c2.x)-(c1.y*c2.y),(c1.x*c2.y)+(c2.x*c1.y))
	}
	abs(){
		return (this.x*this.x+this.y*this.y)
	}
}


let canvas=document.getElementById("canvas")
let ctx=canvas.getContext("2d")

canvas.width=720
canvas.height=480

let ox=canvas.width/2;
let oy=canvas.height/2;
let iterations=parseInt(document.getElementById('iters').value);

var id = ctx.getImageData(0, 0, canvas.width, canvas.height);
var pixels = id.data;
var ar=200

function generate(iters) {
	ctx.beginPath();
	ctx.moveTo(ox,0);
	ctx.lineTo(ox,canvas.height);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(0,oy);
	ctx.lineTo(canvas.width,oy);
	ctx.stroke();
	ctx.closePath();
	for(var i=0;i<canvas.width;++i){
		for (var j = 0; j < canvas.height; j++) {
			let c=new Complex((i-ox)/ar,(j-oy)/ar);
			let z=new Complex(0,0);
			for(var k=0;k<iters;++k){
				z=Complex.add(Complex.multiply(z,z),c);
			}
			var off = (j * id.width + i) * 4;
			if (z.abs()<=1) {
				ctx.fillRect(i,j,1,1)
			}
		}
	}
}

let i=0;
function do_stuff() {
	ctx.clearRect(0,0,canvas.width,canvas.height);
	generate(i)
	if (i<iterations) {
		++i;
		requestAnimationFrame(do_stuff);
	}
}