class Scramble 
{
    // Notations
    rights = ["R", "R'", "R2", "R2"]; //1
    ups = ["U", "U'", "U2", "U2"]; //2
    fronts = ["F", "F'", "F2", "F2"]; //3
    lefts = ["L", "L'", "L2", "L2"]; //4
    downs = ["D", "D'", "D2", "D2"]; //5
    backs = ["B", "B'", "B2", "B2"]; //6
    notations = [this.rights, this.ups, this.fronts, this.lefts, this.downs, this.backs];
  
    // Delcaring last faces
    lastFace = 0;
    beforeLastFace = 0;
  
    // Declaring Scramble Size
    scramble = new Array(15);
  
    getScramble() 
    {
        // Loops methods for random notation generation for each index of the scramble array
        for (let i = 0; i < this.scramble.length; i++) 
        {
            this.scramble[i] = this.getNotation();
        }
    }
  
    getNotation() 
    {
        // Adding 1 to get index to match our "remainder" logic
        let notIndex = Math.floor(Math.random() * this.notations.length) + 1;
        let rNot = Math.floor(Math.random() * this.rights.length);
  
        notIndex = this.getFace(notIndex);
  
        return this.notations[notIndex - 1][rNot];
    }
  
    getFace(x) 
    {
        while ((x == this.beforeLastFace && x % 3 == this.lastFace % 3) || x == this.lastFace) 
        {
            x = Math.floor(Math.random() * this.notations.length) + 1;
        }
  
        this.beforeLastFace = this.lastFace;
        this.lastFace = x;
  
        return x;
    }
  
    toString() 
    {
        let scram = "";
        for (let k = 0; k < this.scramble.length; k++) 
        {
            scram += this.scramble[k] + " ";
        }
        return scram;
    }
}
  
function scramble() 
{
    const scrambleObj = new Scramble();
    scrambleObj.getScramble();
    return scrambleObj.toString();
}

//Scrambles to get a scramble once website loads up
document.getElementById("scrambleDisplay").innerHTML = scramble();

//button function for scramble generator






//Timer
//Attributes
let startTime = 0;
let elapsedTime = 0;
let currentTime = 0;
let paused = true;
let intervalId;
let centisecs = 0;
let decisecs = 0;
let secs = 0;
let mins = 0;


const holdTime = 550; //Hold time in milliseconds(based on stackmat timer)
let holdTimer = null; //Variable for holding down spacebar

document.addEventListener("keydown", function(event) 
{
    if (event.key === " ") 
    {
        if (paused) 
        {
            paused = false;
            startTime = performance.now() - elapsedTime;
            intervalId = requestAnimationFrame(updateTime);
        }
        else 
        {
            addTimeToList();
            paused = true;
            cancelAnimationFrame(intervalId);
            document.getElementById("scrambleDisplay").innerHTML = scramble();
        }
    }
});

document.addEventListener("keyup", function(event)
{
    if(event.key === " ")
    {
        if(paused)
        {
            elapsedTime = 0;
            startTime = performance.now();
            updateTime();
        }
    }
});
  
function updateTime() 
{
    if (!paused) 
    {
        elapsedTime = performance.now() - startTime;
  
        centisecs = Math.floor((elapsedTime / 10) % 10);
        decisecs = Math.floor((elapsedTime / 100) % 10);
        secs = Math.floor((elapsedTime / 1000) % 60);
        mins = Math.floor((elapsedTime / (1000 * 60)) % 60);
      
        timeDisplay.textContent = `${secs}.${decisecs}${centisecs}`;
        intervalId = requestAnimationFrame(updateTime);
    }
}

const timeList = document.querySelector('#recordContainer');
const newDiv = document.createElement("div");

function addTimeToList(elapsedTime) 
{
    elapsedTime = performance.now() - startTime;

    centisecs = Math.floor((elapsedTime / 10) % 10);
    decisecs = Math.floor((elapsedTime / 100) % 10);
    secs = Math.floor((elapsedTime / 1000) % 60);
    mins = Math.floor((elapsedTime / (1000 * 60)) % 60);

    const newTimeElement = document.createElement("div");
    newTimeElement.textContent = `${secs}.${decisecs}${centisecs}`;
    recordContainer.appendChild(newTimeElement);
}
