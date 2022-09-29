const inside_colors = document.querySelectorAll(".inside_colors input");
const canvas = document.getElementById("my_canvas")
const ctx = canvas.getContext('2d');
var selected_color = document.querySelector(".inside_colors .selected").value
let coord = { x: 0, y: 0 };
const size_slider = document.getElementById('slider');
const clear_canvas = document.getElementById("clear_canvas");
const save_image = document.getElementById("save_image");
var slider_value = document.getElementById("slider").value;
const option_div_list = document.querySelectorAll("#option div");

// playing around with the slider which'd be used for changing the brush size. 
size_slider.addEventListener("change", ()=>{
    document.getElementById("slider_value").textContent = size_slider.value;
});


// add click event listeners to the colors input
inside_colors.forEach((element)=>{
    element.addEventListener("click", ()=>{
        document.querySelector(".inside_colors .selected").classList.remove("selected");
        element.classList.add("selected");
        selected_color = document.querySelector(".inside_colors .selected").value;
    });    
});


save_image.addEventListener("click", ()=>{
    /// downloading image. Now, there's a catch with this thing. 
    // it downloads the image, but there's no background in it. 
    // will have to work on that a bit. 
    
    var canvas = document.getElementById("my_canvas");
    var anchor = document.createElement("a");
    anchor.href = canvas.toDataURL("image/png");
    anchor.download = "IMAGE.PNG";
    anchor.click();
    
});


document.addEventListener('mousedown', start);
document.addEventListener('mouseup', stop);
window.addEventListener('resize', resize);

function resize(){
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
}
resize();


function start(event) {
    document.addEventListener('mousemove', draw);
    reposition(event);
}    

function reposition(event) {
    coord.x = event.clientX - canvas.offsetLeft;
    coord.y = event.clientY - canvas.offsetTop;
}    

function stop() {
    document.removeEventListener('mousemove', draw);
}    

function draw(event) {
    ctx.beginPath();
    ctx.lineWidth = size_slider.value;
    ctx.lineCap = 'round';
    ctx.strokeStyle = document.querySelector(".inside_colors .selected").value;
    ctx.moveTo(coord.x, coord.y);
    reposition(event);
    ctx.lineTo(coord.x, coord.y);
    ctx.stroke();
}    

clear_canvas.addEventListener("click", ()=>{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});   

option_div_list.forEach((element)=>{
    element.addEventListener("click", ()=>{
        document.querySelector(".optoin selected").classList.remove("selected");
        element.classList.add("selected");
    });
});