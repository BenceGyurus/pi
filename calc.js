let runing = false;
class generate_Points{

    static window_Size = []
    static size = 0; //x = y
    static point_Size = 2;
    static all_Of_Points = 0;
    static points_In_The_Circle = 0;
    static postition = []; //x,y
    static number_Of_Points = 0;
    static get_Size(){
        this.window_Size = [window.innerWidth, window.innerHeight];
        this.size = this.window_Size[0] > this.window_Size[1] ? Math.ceil(this.window_Size[1]/3*2) :  Math.ceil(this.window_Size[0]/3*2);
        this.create();
    }

    static calc_Pi(){
        document.getElementById("pi").innerHTML = `All of points: ${this.all_Of_Points}<br / >Points in the circle: ${this.points_In_The_Circle}<br />&pi;: ${(this.points_In_The_Circle/this.all_Of_Points*4)}`;
    }

    static add_Size(id, x,y ){
        document.getElementById(id).style = `width: ${x}px; height: ${y}px`
    }

    static create(){
        document.getElementById("body").innerHTML += `<div id = 'add'></div>`
        this.add_Size("add", this.size, this.size);
        this.set_Position_Of_Main_Div();
    }

    static random_Id(length){
        let id = "";
        for (let i = 0; i < length; i++){
            id += Math.floor(Math.random()*10);
        }
        return id;
    }

    static pos(id,x,y){
        let origo_Position = [x, this.size-y];
        let distance = origo_Position[0]**2 + origo_Position[1]**2;
        distance = distance**0.5/this.size;
        if (distance > 1){
        document.getElementById(id).style.background = "red";}
        else{
            this.points_In_The_Circle++;
        }
        this.all_Of_Points++;
        this.calc_Pi();
    }

    static add_Position(id,x,y){
        document.getElementById(id).style.position = `absolute`;
        document.getElementById(id).style.top = `${y}px`;
        document.getElementById(id).style.left = `${x}px`;
    }

    static add_Random_Position(id){
        let x = Math.ceil(Math.random()*this.size);
        let y = Math.ceil(Math.random()*this.size);
        this.add_Position(id, x,y);
        this.pos(id, x,y);
    }

    static generate_Points(){
        window.runing = true;
        let id = this.random_Id(10);
        document.getElementById("add").innerHTML += `<div id = '${id}' class = 'points'></div>`;
        this.add_Size(id, this.point_Size, this.point_Size);
        this.add_Random_Position(id);
    }

    static set_Position_Of_Main_Div(){
        let x = this.window_Size[0]/2-this.size/2;
        let y = this.window_Size[1]/2-this.size/2;
        this.position = [x,y];
        this.add_Position("add", x,y)
    }

}

function end_Of_Interval(interval){
    window.runing = false;
    clearInterval(interval)
}

function run(){
    if (!window.runing){
        window.runing = true;
        document.getElementById("body").innerHTML = "";
        g = generate_Points;
        all_Of_Points = Number(document.getElementById("all_Of_Points").value);
        size_Of_Point = Number(document.getElementById("size_Of_Points").value);
        all_Of_Points = all_Of_Points ?  all_Of_Points: 100;
        size_Of_Point = size_Of_Point ? size_Of_Point: 1;
        g.number_Of_Points = all_Of_Points>1500||all_Of_Points<0 ? 100: all_Of_Points;
        g.point_Size = size_Of_Point>5||size_Of_Point<0 ? 5: size_Of_Point;
        g.all_Of_Points = 0;
        g.points_In_The_Circle = 0;
        g.get_Size();
        interval = setInterval(() => {g.generate_Points();g.number_Of_Points--; if (g.number_Of_Points < 1){end_Of_Interval(interval);}}, 0.1);
    }
}