function get_zeit() {
	var date = new Date();
 return_response("Es ist " + date.getHours().toString() + ":" + date.getMinutes().toString() + " Uhr.")
}

function return_response(html) {
	$("#voice_control_response_text").fadeOut("slow",function(){ 
		$(this).html(html)
	}).fadeIn("slow");
}

function hide_voicecontrol() {
	$("#voice_control_ui").fadeOut("slow",function(){ 
		$("#voice_control_response_text").html("")
		$("#voice_control_command_text").html("")
	})
	$("#voice_control_block_view").fadeOut("slow")
	
}
function chuck_norris() {
	$.getJSON( "http://api.icndb.com/jokes/random", function( data ) {
		return_response(data["value"]["joke"])
		});
}
if (annyang) {
	//Enable debug mode
	annyang.debug();
	// Set language to German, I will localise it some day (for english at least)
	 annyang.setLanguage('de-DE');
	// Add voice commands to respond to
	var commands = {
		'hallo': function() {
			return_response("Hallo!")
		},
		'(wie viel) uhr (ist es)': get_zeit,
		'danke': hide_voicecontrol,
		'(erzähle einen) chuck norris (witz)': chuck_norris,
		'(was kann ich sagen) (hilfe)': function() {
			return_response(Object.keys(commands).join(", "))
		 },
	};

	// Add our commands to annyang
	annyang.addCommands(commands);
	
	//Update latest command in UI
	annyang.addCallback('resultMatch', function(userSaid, commandText, phrases) {
		if (userSaid != "danke" ){
			
		if ($('#voice_control_ui').css('display') == "none"){
			$("#voice_control_ui").fadeIn("slow")
			$("#voice_control_block_view").fadeIn("slow")
		}
		$("#voice_control_command_text").fadeOut("slow",function(){ 
			$(this).html('"' + userSaid + '"')
		}).fadeIn("slow");
		
		}
	});
	
	// Start listening. You can call this here, or attach this call to an event, button, etc.
	annyang.start();
}
