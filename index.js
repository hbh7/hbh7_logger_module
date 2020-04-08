const fs = require('fs');
let filename;

/*const Influx = require('influx');
let influx = new Influx.InfluxDB({
    host: 'localhost',
    database: 'express_response_db',
    schema: [
        {
            measurement: 'response_times',
            fields: {
                path: Influx.FieldType.STRING,
                duration: Influx.FieldType.INTEGER
            },
            tags: [
                'host'
            ]
        }
    ]
});*/

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
            }
        });
    },

    logToFileOverwrite: function(data, message=null) {
        fs.writeFile(filename, data, (err) => {
            if (err) throw err;
            if(message) {
                this.logToConsole(message);
            }
        });
    },

/*    logToInflux: function(data, message=null) {
        influx.writePoints([
            {
                measurement: 'response_times',
                tags: { host: os.hostname() },
                fields: { duration, path: req.path },
            }
        ]).then(() => {
            return influx.query(`
    select * from response_times
    where host = ${Influx.escape.stringLit(os.hostname())}
    order by time desc
    limit 10
  `)
        }).then(rows => {
            rows.forEach(row => console.log(`A request to ${row.path} took ${row.duration}ms`))
        })
    }*/

};