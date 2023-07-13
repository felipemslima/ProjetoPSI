// Get the checkbox
var checkBox = document.getElementById("coding");
// Get the output text
var content = document.getElementById("mainContent");
// Get the output text
var heatTime = document.getElementById("heaterbutton");
// By default
content.style.display = "none"
// Activation Array
var heaterhours = [0,0,0,0,0,0,0,0,0,0,0,0,
                    0,0,0,0,0,0,0,0,0,0,0,0];

// Sensing the output values of button lights
var lights1 = document.getElementById("light1");
var lights2 = document.getElementById("light2");
var lights3 = document.getElementById("light3");
var lights4 = document.getElementById("light4");
var lights5 = document.getElementById("light5");
var lights6 = document.getElementById("light6");
var lights7 = document.getElementById("light7");
var lights8 = document.getElementById("light8");

// Initializing the WebSocket
var WebSocketClient
var ws = null;
var connected = false;

// Functions button states
function OFF() {        
    $(".botao12345").data("state", "OFF");           
}

function ON() {        
    $(".botao12345").data("state", "ON");
}

// Events listeners
var numero_de_lampadas = 16;
var array_switch = Array(numero_de_lampadas).fill(0);
var nlight;

// FUNCTIONS FOR LIGTHS ARE DEVELOP AT THE END OF THE CODE

heatTime.onclick = function(e){
    //console.log("Applied")
    selectElementON = document.querySelector('#ONselector');
    selectElementOFF = document.querySelector('#OFFselector');
    outputON = selectElementON.value;
    //console.log(outputON)
    outputOFF = selectElementOFF.value;
    //console.log(typeof(outputOFF))
    document.querySelector('.outputON').textContent = outputON;
    document.querySelector('.outputOFF').textContent = outputOFF;
    console.log(heaterhours)
    heaterhours= activationFunction(heaterhours, outputON, outputOFF);
}

// Function Heater ON & OFF
function activationFunction(heaterhours, outputON, outputOFF){
    var m = heaterhours.length;
    console.log(m)
    var j = Number(outputON); //turnOn;
    console.log(j)
    console.log(typeof(j))
    var q = Number(outputOFF); //turnOff
    for(m; m>=0; m--){
        heaterhours[m-1]=0;
    }
    console.log(heaterhours)
    if(j>q){
        for(j; j<=23; j++){
            heaterhours[j]=1;
        }
        for(q; q>=0; q--){
            heaterhours[q]=1;
        }
    }else{
        for(var u = j; u<=q; u++){
            heaterhours[u]=1;
        }
    }
    console.log(heaterhours)
    return heaterhours;
}

WebSocketClient = {
    init: function() {
        var url = "ws://localhost:1880/ws/test";

        var onOpen = function() {
            console.log('OPENED: ' + url);
            connected = true;
        };

        var onClose = function() {
            console.log('CLOSED: ' + url);
            ws = null;
            reset();
        };
        var reset = function() {
            connected = false;
        };

        var onMessage = function(event) {
            var data = event.data;
            var parsed_data  = JSON.parse(data)
            //console.log(data)
            //console.log(typeof(data))
            addMessage(parsed_data);
        };

        var onError = function(event) {
            alert(event.type);
        };

        checkBox.addEventListener('click', ()=>{
            //console.log("Si")
            if(content.style.display == "none"){
                close();
                open();
                content.style.display = "block";
            }else{
                close();
                content.style.display = "none"
            }
        })


        // ADDING REAL-TIME MESSAGES to divs
        var addMessage = function(parsed_data, type) {
            var topic = parsed_data.data.topic;
            var data = parsed_data.data.payload;
            if(topic == "Temperature"){
                $('#temperature').empty()
                var msg = $('<pre>').text(data);
                var messages = $('#temperature');
                messages.append(msg);
            }
            if(topic == "time"){
                $('#time').empty()
                var msg = $('<pre>').text(data);
                var messages = $('#time');
                messages.append(msg); 
            }
            if(topic == "date"){
                $('#date').empty()
                var msg = $('<pre>').text(data);
                var messages = $('#date');
                messages.append(msg); 
            } 
            if(topic == "ligthsArray"){
                // console.log("?") data is comming
                var j = 0;
                var n = 0;
                var whichligth
                var checkedarray = [];
                var uncheckedarray = [];
                for(i = 0; i<=7; i++){
                    if(data[i]==1){
                        checkedarray[j] = i;
                        j += 1;
                    }else{
                        uncheckedarray[n] = i;
                        n += 1;
                    }
                }
                //console.log(checkedarray) //it is working quite well
                for(i = 0; i<=uncheckedarray.length; i++){
                    whichligth = "light"+(uncheckedarray[i]+1);
                    $("#"+whichligth).attr('checked', false);
                }

                for(i = 0; i<=checkedarray.length; i++){
                    whichligth = "light"+(checkedarray[i]+1);
                    // console.log(whichligth) //ok
                    // console.log(typeof("#"+whichligth)) string
                    //whichligth.checked = true;
                    $("#"+whichligth).attr('checked', true);
                }
            }
        };

        var open = function() {
            ws = new WebSocket(url);
            ws.onopen = onOpen;
            ws.onclose = onClose;
            ws.onmessage = onMessage;
            ws.onerror = onError;
        };
        
        var close = function() {
            if (ws) {
                console.log('CLOSING ...');
                ws.close();
            }
        };
    }
}

WebSocketClient.init();
 

//------------------------------------------------
lights1.addEventListener('click', ()=>{
    nlight = 0;
    array_switch = Array(numero_de_lampadas).fill(0);
    array_switch[nlight] = 1;
    ws.send(array_switch);
})

lights2.addEventListener('click', ()=>{
    nlight = 1;
    array_switch = Array(numero_de_lampadas).fill(0);
    array_switch[nlight] = 1;
    ws.send(array_switch);
})

lights3.addEventListener('click', ()=>{
    nlight = 2;
    array_switch = Array(numero_de_lampadas).fill(0);
    array_switch[nlight] = 1;
    ws.send(array_switch);
})

lights4.addEventListener('click', ()=>{
    nlight = 3;
    array_switch = Array(numero_de_lampadas).fill(0);
    array_switch[nlight] = 1;
    ws.send(array_switch);
})

lights5.addEventListener('click', ()=>{
    nlight = 4;
    array_switch = Array(numero_de_lampadas).fill(0);
    array_switch[nlight] = 1;
    ws.send(array_switch);
})

lights6.addEventListener('click', ()=>{
    nlight = 5;
    array_switch = Array(numero_de_lampadas).fill(0);
    array_switch[nlight] = 1;
    ws.send(array_switch);
})

lights7.addEventListener('click', ()=>{
    nlight = 6;
    array_switch = Array(numero_de_lampadas).fill(0);
    array_switch[nlight] = 1;
    ws.send(array_switch);
})

lights8.addEventListener('click', ()=>{
    nlight = 7;
    array_switch = Array(numero_de_lampadas).fill(0);
    array_switch[nlight] = 1;
    ws.send(array_switch);
})
