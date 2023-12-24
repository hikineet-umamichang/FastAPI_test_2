const terminal = new Terminal({
    fontSize: 20,
    scrollback: 0, 
    theme:{
        "foreground": "#53676d",
        "background": "#fbf3db",
        "cursorColor": "#3a4d53",
        "cursor": "#3a4d53"
    }
});
const fitAddon = new FitAddon.FitAddon();
terminal.loadAddon(fitAddon);
terminal.open(document.getElementById('terminal'));

fitAddon.fit();

let userInput= '';
let socket = new WebSocket('ws://localhost:8000/ws');

socket.onopen = () => {
    terminal.writeln('Connection established');
    terminal.write('$ ');
};

socket.onmessage = (event) => {
    terminal.writeln(event.data);
    terminal.write('$ ');
};

socket.onclose = () => {
    terminal.writeln()
    terminal.writeln('Connection closed');
};

socket.onerror = (error) => {
    terminal.writeln('WebSocket error: ' + error.message);
};

terminal.onData(data => {
    if (data === '\r') { // Enter key
        terminal.writeln('');
        socket.send(userInput);
        userInput='';
    } else if (data ==='\x7f') {
        if (userInput.length > 0) {
            terminal.write('\b \b');
            userInput = userInput.slice(0, -1);
        }
    } else {
        userInput += data;
        terminal.write(data);
    }
});
