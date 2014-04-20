
var fs = require('fs');
var jf = require('jsonfile')
var val = require('validator')
var mysql = require('mysql')
var $ = require('jquery')
var jsonObject=[];
var lineNumber=0;
var columns=[];



//Sid and Cid initialization

//var $ = require('jQuery')





// object for creating HighChart bar graph
var snortObject = {
                    "record": [
                        {
                            Id: 0,                    
                            "dataPayload": "",
                            "event": {
                                "signature": "",
                                "timestamp":""
                            },                
                            "icmphdr": {
                                icmp_type: -1 ,
                                icmp_code: -1,
                                icmp_csum: -1 ,
                                icmp_id: -1,
                                icmp_seq:-1
                            },
                            "iphdr": {
                                ip_src: -1,
                                ip_dst: -1,
                                ip_ver: -1,
                                ip_hlen: -1,
                                ip_tos: -1,
                                ip_len: -1,
                                ip_id:  -1,
                                ip_flags: -1,
                                ip_off: -1,
                                ip_ttl: -1,
                                ip_proto: -1,
                                ip_csum: -1
                             },
                            "sensor": {
                               "hostname": "" ,
                               "interface":"" 
                            },
                            "sig_class_name" : "" ,
                            "signature" : {
                                "sig_name": "",
                                sig_priority:-1 ,
                            },
                            "tcphdr": {
                                tcp_sport:-1 ,
                                tcp_dport: -1,
                                tpc_seq: -1,
                                tcp_ack: -1,
                                tcp_off: -1,
                                tcp_res: -1,
                                tcp_flags: -1,
                                tcp_win: -1,
                                tcp_csum: -1,
                                tcp_urp: -1
                            },
                            "udphdr": {
                                udp_sport: -1,
                                udp_dport: -1,
                                udp_len: -1,
                                udp_csum: -1 
                             }
                        },
                        {

                        }
 ]};



var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'admin'
});

connection.connect(function(err) {
  console.log('Connected');// connected! (unless `err` is set)
});

connection.query("use snort");

//var Strquery = "select * from event natural join data natural join iphdr where sid=1 and cid =1";
//var Strquery = "select * from signature natural join event natural join iphdr natural join data natural join sig_class where event.signature = signature.sig_id and event.sid in (select  1 and event.cid = 1) and signature.sig_class_id= sig_class.sig_class_id order by event.sid";

//var Strquery = "select * from event natural join iphdr where sid > ;

//var sidCidQuery = "select distinct sid,cid from event";

//select sid,cid from event where sid in (select distinct(sid) from event)";

var strQuery = "select * from event e natural left join signature sig natural left join iphdr natural left join data natural left join icmphdr natural left join udphdr natural left join tcphdr where e.signature=sig.sig_id and ";


var maxSid;
var lastSid = 0;
var lastCid = 0;

var temp = [];
var numOfEvents;
var proto = [];
proto[1] = "icmphdr";
proto[17] = "udphdr";
proto[6]="tcphdr";
//var proto = { "1":"icmphdr","17":"udphdr","6":"tcphdr"};



/*function hello() 
{
    alert("Hello");

}
*/

function writeToJson( rows) {
var outputFilename = './my.json';

fs.writeFile(outputFilename, JSON.stringify(rows,null,4), function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log("JSON saved to " + outputFilename);
    }
}); 

}

function queryRecords(writeToJson) {
connection.query(strQuery + "(sid > " + lastSid + " or " + "cid > " + lastCid + ")", function(err, rows){
	if(err){
		throw err;
        }
	else{
             if (rows.length) {
                   numOfEvents = rows.length;
                   console.log("num",numOfEvents);
                   console.log(rows[0]);
             }
        }

   writeToJson(rows);
});
}

queryRecords(writeToJson);

jquery.getJSON('my.json', function(data) {
        if(err) {
         throw err;
         }
    console.log("Okay");
});

connection.end();
/*
var Lazy = require('lazy'),
lazy = new Lazy(fs.createReadStream('Book2.csv'))
    .lines
    .map(String)
    .map(function(lineData){
        var fields = lineData.trim().split(',', 11);
        if(lineNumber == 0)
        {
            columns.push(fields[3]);
            columns.push(fields[10]);     
        } else {
            // var jsoninput = {
            //     MEM : fields[3],
            //     CPU : fields[10]
            // };
            // jsonObject.push(jsoninput);
            // 
            chartObject.xAxis.categories.push(fields[10]);  
            chartObject.series[0].data.push(val.toFloat(fields[3]));  
            var file = 'data.json';
            jf.writeFile(file, chartObject);
        }
        lineNumber = lineNumber + 1;
        
    });

*/
