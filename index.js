const fs = require('fs');
let filename;

function getDatestamp() {
    let d = new Date();
    return d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate() + " " +
        d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
}

module.exports = {

    setup: function(f) {
        filename = f;
    },

    logToConsole: function (message) {
        console.log("<" + getDatestamp() + "> " + message);
    },

    logToFileAppend: function(data, message=null) {
        fs.appendFile(filename, getDatestamp() + "\n" + data + "\n\n", (err) => {
            if (err) throw err;
            if(message) {
                this.logToConsole(message);
            } else {
                this.logToConsole("Logged to file");
            }
        });
    },

    logToFileOverwrite: function(data, message=null) {
        fs.writeFile(filename, data, (err) => {
            if (err) throw err;
            if(message) {
                this.logToConsole(message);
            } else {
                this.logToConsole("Logged to file");
            }
        });
    }

};