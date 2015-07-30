/* globals $:true */
/* globals google:true */
'use strict';

function hideMessage() {
	$('#message').removeClass('visible');
}

function createMessage(title,description,actions) {
	var message = $('#message');
	message.html('');
	message.append('<h1>'+title+'</h1>');
	message.append('<p>'+description+'</p>');
	for (var i = 0; i < actions.length; i++) {
		var button = document.createElement('input');
		button.setAttribute('type','button');
		button.setAttribute('value',actions[i].value);
		$(button).on('click',actions[i].action);
		message.append(button);
	}
	message.addClass('visible');
}

function showCreated(data) {
	var propertyType = {'room':'kambarį','appartment':'butą','house':'namą'};

	function getCapacity(c,t) {
		if(t == 'local') {
			if(c == '1') {
				return 'lietuviui';
			} else if(c=='8-12') {
				return 'lietuvių';
			} else {
				return 'lietuviams';
			}
		} else if(t == 'foreign') {
			if(c == '1') {
				return 'užsieniečiui';
			} else if(c=='8-12') {
				return 'užsieniečių';
			} else {
				return 'užsieniečiams';
			}
		} else {
			if(c == '1') {
				return 'žmogui';
			} else if(c=='8-12') {
				return 'žmonių';
			} else {
				return 'žmonėms';
			}
		}	
	} 

	function resetFormAndHideMessage() {
		$('#accommodationForm')[0].reset();
		hideMessage();
	}

	data = data[0];
	var title = 'Dėkojame, Jūsų duomenys išsaugoti.';
	var description = 'Nuomojate '+propertyType[data.propertyType]+' '+data.capacity+' '+ getCapacity(data.capacity,data.target) +' '+data.city+'. ';
	description += 'Adresas: '+data.address+'. Jūsų unikalus numeris: '+data.id+'.';
	createMessage(title,description,[{value:'Uždaryti',action:resetFormAndHideMessage}]);
}

function successfulSubmition(data) {
	if(data.id) {
		$.ajax({
			method:'GET',
			success:showCreated,
			error:ajaxError,
			url:'actions/retrieve-accommodation-data.php',
			data:data
		});
	} else {
		ajaxError();
	}
}

function ajaxError() {
	createMessage('Apdorojimo klaida!','Deja, nepavyko apdoroti Jūsų užklausos.',[{value:'Uždaryti',action:hideMessage}]);
}

function submitForm(data) {
	$.ajax({
		method:'POST',
		success:successfulSubmition,
		error:ajaxError,
		url:'actions/submit-accommodation-form.php',
		data:data
	});
}

function validate(jqElement) {
	if(!jqElement.val() || jqElement.val().length<1) {
		jqElement.closest('div.field').addClass('invalid');
		return false;
	} else {
		return true;
	}
}

function processForm(e) {
	e.preventDefault();
	var formFields = {
		'target':$('[name="target"]:checked')[0],
		'propertyType':$('[name="propertyType"]')[0],
		'city':$('[name="city"]')[0],
		'capacity':$('[name="capacity"]')[0],
		'address':$('[name="address"]')[0],
		'lat':$('[name="lat"]')[0],
		'lon':$('[name="lon"]')[0],
		'description':$('textarea[name="description"]')[0]
	};
	var data = {};
	for(var field in formFields) {
		var jqField = $(formFields[field]);
		jqField.closest('div.field').removeClass('invalid');
		validate(jqField);
		if(!jqField.closest('div.field').hasClass('invalid')) {
			data[jqField.attr('name')] = jqField.val();
		}
	}
	if(Object.keys(data).length === Object.keys(formFields).length) {
		submitForm(data);
	}
}

var geocoder = new google.maps.Geocoder();
var mapInstance,marker;

function map() {
	var lat = $('[name="lat"]').val();
	var lon = $('[name="lon"]').val();
	var coordinates = new google.maps.LatLng(lat, lon);
	var mapOptions = {
		zoom: 15,
		center:coordinates,
		disableDefaultUI:true
	};
	mapInstance = new google.maps.Map(document.getElementById('mapArea'),mapOptions);
}

function codeAddress() {
	var options = {address: document.getElementById('address').value};

	geocoder.geocode(options, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
		
			mapInstance.setCenter(results[0].geometry.location);
			
			$('[name="lat"]').val(results[0].geometry.location.lat());
			$('[name="lon"]').val(results[0].geometry.location.lng());

			marker = new google.maps.Marker({
				map: mapInstance,
				position: results[0].geometry.location,
				draggable:true
			});

			google.maps.event.addListener(marker, 'dragend', function() {
				var position = marker.getPosition();
				$('[name="lat"]').val(position.lat());
				$('[name="lon"]').val(position.lng());
			});

		} else {
			createMessage('Žemėlapio klaida','Žemėlapis veikia netinkamai.',[{value:'Uždaryti',action:hideMessage}]);
		}
	});
}

$(document).ready(function() {
	$('#accommodationForm').on('submit', processForm);
	$('#address').on('change',codeAddress);
	map();
});