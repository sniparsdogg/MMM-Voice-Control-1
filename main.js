function get_time() {
	var date = new Date();
 return_response("São " + date.getHours().toString() + ":" + date.getMinutes().toString() + " horas.")
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
if (annyang) {
	//Enable debug mode
	annyang.debug();
	// Set language to Portuguese, I will localise it some day (for english at least)
	 annyang.setLanguage('pt-PT');
	// Add voice commands to respond to
	var commands = {
		'ola': function() {
			return_response("Olá!")
		},
		'(Que) horas (sao)': get_time,
		'obrigado': hide_voicecontrol,
		'(Que posso dizer) (Ajuda)': function() {
			return_response(Object.keys(commands).join(", "))
		 },
	};

	// Add our commands to annyang
	annyang.addCommands(commands);
	
	//Update latest command in UI
	annyang.addCallback('resultMatch', function(userSaid, commandText, phrases) {
		if (userSaid != "obrigado" ){
			
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
