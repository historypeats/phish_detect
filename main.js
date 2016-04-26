var gmail = null;
/*
 * Wait for the Gmail object to be ready
 */
function refresh(f) {
	if( (/in/.test(document.readyState)) || (typeof Gmail === undefined) ) {
		setTimeout('refresh(' + f + ')', 10);
	} else {
    	f();
  	}
}

var check_failure = function() {
	var id = null,
		raw_email = null,
		spoof = false;
	
	console.log('[Phish Detect] Scanning email...');

	id = window.location.hash.split('/').pop(),
	raw_email = gmail.get.email_source(id),
	spoof = /=fail/.test(raw_email);
	if(spoof) {
		$("body").append('<div class="phish_detect"> <div class="modal fade" id="popupModal" tabindex="-1" role="dialog"> <div class="modal-dialog"> <div class="modal-content"> <div class="phish_detect modal-header"> <h4 class=" modal-title">Phish Detect Warning</h4> </div><div class="modal-body"> <p>Phish Detect has detected that the email sender has been spoofed. It is possible that this is a phishing email. Please be careful when dealing with the contents of the email, such as clicking links or following shady actions such as responding with a password.</p></div><div class="modal-footer"> <button type="button" class=" btn btn-default" data-dismiss="modal">Close</button></div></div></div></div></div>');

			$("#popupModal").modal('show');	
			console.log('This could be a phishing email!');
	}
};

var main = function(){
	console.log('[Phish Detect] Gmail object defined. Ready to protect.');

	gmail = new Gmail();
	gmail.observe.after('open_email', check_failure);
};

// Wait for for document and Gmail objects to be ready
refresh(main);

