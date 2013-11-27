var app = {

    findByName: function() {
        /*
        console.log('findByName');
        this.store.findByName($('.search-key').val(), function(employees) {
            var l = employees.length;
            var e;
            $('.employee-list').empty();
            for (var i=0; i<l; i++) {
                e = employees[i];
                $('.employee-list').append('<li><a href="#employees/' + e.id + '">' + e.firstName + ' ' + e.lastName + '</a></li>');
            }
        });
        */
    },

    initialize: function() {
        //this.store = new MemoryStore();
        //$('.search-key').on('keyup', $.proxy(this.findByName, this));
    }

};

app.initialize();

var serviceURL = "http://localhost/GitHub/DemoAppWWW/www/services/";

var expo;

// Wait for PhoneGap to load
document.addEventListener("deviceready", onDeviceReady, false);

function populateDB(tx) {
  tx.executeSql('DROP TABLE IF EXISTS DEMO');
  tx.executeSql('CREATE TABLE IF NOT EXISTS DEMO (id unique, data)');
  tx.executeSql('INSERT INTO DEMO (id, data) VALUES (1, "First row")');
  tx.executeSql('INSERT INTO DEMO (id, data) VALUES (2, "Second row")');
}

function errorCB(err) {
  alert("Error processing SQL: "+err.code);
}

function successCB() {
  alert("success!");
}
function onDeviceReady() {
    var db = window.openDatabase("ExpoApp", "1.0", "ExpoApp", 10000);
    db.transaction(populateDB, errorCB, successCB);
}

$('#expoListPage').bind('pageinit', function(event) {
	getExpoList();
});

function getExpoList() {
	$.getJSON(serviceURL + 'getexpos.php', function(data) {
		$('#expoList li').remove();
    
		expos = data.items;
		$.each(expos, function(index, expo) {
			$('#expoList').append(
          '<li><a href="expo_info.html?id=' + expo.id + '">' +
					'<img src="data:image/jpg;base64,' + expo.logo + '"/>' +
					'<h4>' + expo.name + '</h4>' +
					'<p>' + expo.start + ' - ' + expo.end + '</p>' +
					'</a></li>');
		});
		$('#expoList').listview('refresh');
	});
}

$('#detailsPage').live('pageshow', function(event) {
	var id = getUrlVars()["id"];
	$.getJSON(serviceURL + 'getexpo.php?id='+id, displayExpo);
});

function displayExpo(data) {
	var expo = data.item;
	console.log(expo);
  
	$('#expoPic').attr('src', 'data:image/jpg;base64,' + expo.logo);
	$('#name').text(expo.name);
  
  $('#actionList').append(
        '<li><a href="expodetails.html?id=' + expo.id + '"><h3>Udstillere' + ' (10)</h3></a></li>');
  
  $('#actionList').append(
        '<li><a href="expodetails.html?id=' + expo.id + '"><h3>Aktiviteter' + ' (32)</h3></a></li>');
  
  $('#actionList').append(
        '<li><a href="expodetails.html?id=' + expo.id + '"><h3>Nyheder' + ' (10, <b>2 nye</b>)</h3></a></li>');
  
  $('#actionList').append('<li><a href="expodetails.html?id=' + expo.id + '"><h3>Hal Oversigt</h3></a></li>');
  
  $('#actionList').append('<li><a href="expo_practical_information.html?id=' + expo.id + '"><h3>Praktiske informationer</h3></a></li>');
  
	$('#actionList').listview('refresh');
	
}

function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}