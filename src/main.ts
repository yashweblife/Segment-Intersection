const canvas = document.createElement("canvas");
document.body.append(canvas);
canvas.width = 500;
canvas.height=500;
const ctx = canvas.getContext('2d')!;
function lerp(a:number,b:number,t:number){
    return a+(b-a)*t;
}
class Point{
    constructor(public x:number=0, public y:number=0){}
    public draw = (c:CanvasRenderingContext2D)=>{
        c.beginPath();
        c.arc(this.x,this.y,10,0,Math.PI*2,false);
        c.fillStyle = "rgb(255,0,0)";
        c.fill();
        c.closePath();
    }
}
class Line{
    public points:boolean=false;
    constructor(public start:Point, public end:Point){}
    public draw = (c:CanvasRenderingContext2D)=>{
        c.beginPath();
        c.moveTo(this.start.x, this.start.y);
        c.lineTo(this.end.x, this.end.y);
        c.stroke();
        c.closePath();
        if(this.points){
            this.start.draw(c);this.end.draw(c)
        }
    }
    public findIntersect = (l:Line)=>{
        const topT = (l.end.x-l.start.x) * (this.start.y - l.start.y) - (l.end.y-l.start.y)*(this.start.x-l.start.x);
        const topU = (l.start.y-this.start.y)*(this.start.x-this.end.x) - (l.start.x-this.start.x)*(this.start.y-this.end.y);
        const bottom = (l.end.y-l.start.y) * (this.end.x-this.start.x) - (l.end.x-l.start.x)*(this.end.y-this.start.y);
        if(bottom){
            const t = topT/bottom;
            const u = topU/bottom;
            if(t>0 && t<=1 && u>0 && u<=1){
                console.log(t)
                return(
                    new Point(
                        lerp(this.start.x,this.end.x, t),
                        lerp(this.start.y,this.end.y, t),
                    )
                )
            }
        }
        return(null);
        
    }
}

const l1 = new Line(new Point(0,0), new Point(10,50))
const l2 = new Line(new Point(100,10), new Point(100,100))
const m = l1.findIntersect(l2);
if(m){
    m.draw(ctx);
}
l1.points=true
l2.points=true
l1.draw(ctx)
l2.draw(ctx)
