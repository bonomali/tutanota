"use strict";

goog.provide('tutao.tutanota.ctrl.LanguageViewModel');

/**
 * Provides all localizations of strings on our gui.
 * @constructor
 */
tutao.tutanota.ctrl.LanguageViewModel = function() {
	tutao.util.FunctionUtils.bindPrototypeMethodsToThis(this);
	var lang = null // tutao.tutanota.util.LocalStore.load('language');
	if (!lang) {
		lang = tutao.tutanota.util.ClientDetector.getDefaultLanguage();
	}
	this._current = ko.observable(lang);
};

/**
 * Provides the current language, one of "en" and "de"
 * @return {string} The current language.
 */
tutao.tutanota.ctrl.LanguageViewModel.prototype.getCurrentLanguage = function() {
	return this._current();
};

/**
 * Sets the current language.
 * @param {string} lang The language to set, one of "en" and "de".
 */
tutao.tutanota.ctrl.LanguageViewModel.prototype.setCurrentLanguage = function(lang) {
	if (lang != "en" && lang != "de") {
		throw new Error("invalid language: " + lang);
	}
	// tutao.tutanota.util.LocalStore.store('language', lang);
	this._current(lang);
};

/**
 * Provides the text with the given id and the given params in the currently selected language.
 * @param {string} id One of the ids defined in tutao.tutanota.ctrl.LanguageViewModel.en or tutao.tutanota.ctrl.LanguageViewModel.de.
 * @param {Object<String,String>} params An object whose property keys are the strings that shall be replaced by the corresponding property value in the text.
 * @return {string} The text.
 */
tutao.tutanota.ctrl.LanguageViewModel.prototype.get = function(id, params) {
	if (id == null) {
		return "";
	}
	var text = tutao.tutanota.ctrl.LanguageViewModel[this._current()][id];
	if (!text) {
		throw new Error("no translation found for id " + id);
	}
	if (params instanceof Object) {
		for (var param in params) {
			text = text.replace(param, params[param]);
		}
	}
	return text;
};

/**
 * Returns all translations in pretty-printed form.
 */
tutao.tutanota.ctrl.LanguageViewModel.prototype.allTranslationsAsJson = function() {
	return JSON.stringify({de: tutao.tutanota.ctrl.LanguageViewModel.de, en: tutao.tutanota.ctrl.LanguageViewModel.en}, null, 2)
};

/**
 * Defines the english translations of all texts in Tutanota.
 * The actual identifier is in camel case and the type is appended by an underscore.
 * Types: label, action, msg, title, alt, placeholder
 */
tutao.tutanota.ctrl.LanguageViewModel.en = {
	// mail
	deleteMail_msg:	"Delete new email without saving?",
	tooBigAttachment_msg: "The following files could not be attached because their size exceeds 25 MB: ",
	received_action: "Received",
	receivedMail_alt: "Received email",
	receivedMails_alt: "Received emails",
	sent_action: "Sent",
	sentMail_alt: "Sent email",
	sentMails_alt: "Sent emails",
	trash_action: "Trash",
	trashedMail_alt: "Trashed email",
	trashedMails_alt: "Trashed emails",
	mailWithAttachment_alt: "Email with attachment",
	meNominative_label: "Me",
	meDativ_label: "Me",
	meAccusative_label: "Me",
	from_label: "From",
	to_label: "To",
	cc_label: "Cc",
	bcc_label: "Bcc",
	ccBcc_label: "B/Cc",
	closedLock_alt: 'Closed lock',
	openedLock_alt: 'Open lock',
	attachFiles_action: "Attach files",
	removeAttachment_alt: "Remove attachment",
	passwordTransmission_label: "Password transmission",
	atLeastOneMobileNumber_label: "At least one german mobile number or an agreed password per external recipient is needed.",
	secureMail_title: 'Email is encrypted for external recipients.',
	unsecureMail_title: 'Email is not encrypted for external recipients.',
	noRecipients_msg: 'Please provide recipients for your email.',
	invalidRecipients_msg: 'Please correct the invalid email addresses\n in the recipients fields.',
	noSubject_msg: 'Please provide a subject for your email.',
	noPasswordChannels_msg: 'Please provide a mobile phone number or an agreed password for all external recipients.',
	invalidPasswordChannels_msg: 'Please check the password channels again for invalid phone numbers.',
	maxSizeExceeded_msg: "The maximum message size of $ to unsecure external recipients is exceeded.",
	send_action: "Send",
	reply_action: "Reply",
	replyAll_action: "Reply all",
	forward_action: "Forward",
	replyConfidential_action: "Reply confidentially",
	by_label: "by",
	date_label: "Date",
	subject_label: "Subject",
	showQuotation_action: "+ Quotes",
	hideQuotation_action: "- Quotes",
	legacyNoReply_msg: "This Internet Explorer is an old version and does not support replying to your received email. Please update or use one of the following browsers:",
	clickToSave_label: "Click to save",
	confidential_action: "Confidential",
	nonConfidential_action: "Not confidential",
	noMails_msg: "There are no emails in this list.",
	noMail_msg: "No email selected.",
	addMobileNumber_msg: "Add additional mobile phone number.",
	setPresharedPassword_action: "Set agreed password",
	presharedPassword_label: "Agreed password",
	mobileNumberNotValid_msg: "Invalid format.",
	fromAddressBook_label: "From address book: ",
	presharedPasswordNotStrongEnough_msg: "One or more agreed passwords are not secure enough. Send the email anyway?",

	// contact
	discardContact_msg: "Discard new contact?",
	discardContactChanges_msg: "Discard contact modifications?",
	discardContactChangesFor_msg: "Discard contact modifications for $?",
	deleteContact_msg: "Are you sure to delete the contact?",
	private_label: "Private",
	mobile_label: "Mobile",
	fax_label: "Fax",
	work_label: "Work",
	other_label: "Other",
	custom_label: "Custom",
	twitter_label: "Twitter",
	facebook_label: "Facebook",
	xing_label: "Xing",
	linkedin_label: "Linked in",
	email_label: "Email",
	phone_label: "Phone",
	address_label: "Address",
	social_label: "Social",
	comment_label: "Comment",
	birthday_alt: "Birthday",
	contactImage_alt: "Photo of this contact",
	removePhoneNumber_alt: "Remove phone number",
	removeMailAddress_alt: "Delete this email address",
	removeAddress_alt: "Delete this address",
	removeSocial_alt: "Delete this social id",
	sendMail_alt: "Send email to this address",
	callNumber_alt: "Call this number",
	showAddress_alt: "Show this address in google maps",
	openSocial_alt: "Open this social account",
	firstName_placeholder: "First name",
	lastName_placeholder: "Last name",
	birthdayWithFormat_placeholder: "Birthday (dd.mm.yyyy)",
	company_placeholder: "Company",
	title_placeholder: "Title",
	noContacts_msg: "There are no contacts in this list.",
	noContact_msg: "No contact selected.",
	passwordsHeading_label: "Passwords:",
	presharedPasswordHeading_label: "Agreed:",
	autoTransmitPasswordHeading_label: "SMS:",
	showPassword_alt: "Keep button pressed to show the password.",
	
	// settings
	accountSettings_action: "Account",
	securitySettings_action: "Security",
	changePasswordSettings_action: "Change password",
	adminUserList_action: "User management",
	adminUserAdd_action: "Add user",
	action_label: "Action",
	edit_label: "Edit",
	editUser_label: "Edit user",
	save_msg: "Saving data ...",
	state_label: "State",
	create_action: "Create",
    createActionSuccess_msg: "All accounts have been created successfully.",
    createActionFailed_msg: "Failed to create an account. Please try again later.",
    createActionStatus_msg: "Created ${index} of ${count} accounts.",
	import_action: "Import",
	importCsv_label: "Import CSV data",
	importCsvInvalid_msg: "The CSV data is invalid (line $).",
    successfullyCreatedUsers_msg: "The following users have been created successfully.",
    deleted_label: "Deleted",
    created_label: "Created",
	
	// account settings
	accountType_label: "Account type",
	mailName_label: "Sender name",
	mailNameInfo_msg: "This name is shown to recipients of your emails.",
	
	// security settings
	lastSuccessfulLogin_label: "Last successful login",
	lastSuccessfulLoginInfo_msg: "The time of your last successful login before the current one.",
	failedLogins_label: "Failed logins",
	failedLoginsInfo_msg: "The number of failed login attempts since your last successful login.",
	
	// change password
	passwordValid_msg: "Password ok.",
	oldPassword_label: "Old password",
	oldPasswordNeutral_msg: "Please enter old password.",
	oldPasswordInvalid_msg: "Incorrect password.",
	newPassword_label: "New password",
	securePasswords_link: "https://en.wikipedia.org/wiki/Password_strength#Guidelines_for_strong_passwords",
	password1Neutral_msg: "Please enter new password.",
	password1InvalidSame_msg: "New password is same as old.",
	password1InvalidUnsecure_msg: "New password not secure enough.",
	password2Neutral_msg: "Please confirm your password here.",
	password2Invalid_msg: "Confirmed password is different.",
	verificationCode_msg: "You will receive the verification code via SMS.",
	code_label: "Verification code",
	pwChangeNeutral_msg: "You will receive a verification code via SMS to $.",
	pwChangeNeutralSendingCode_msg: "Code is sent...",
	pwChangeValid_msg: "Password was changed.",
	pwChangeInvalidServerNotAvailable_msg: "Could not reach server. Password has not been changed. Please try again later.",
	pwChangeInvalidTooManyVerifyAttempts_msg: "Number of allowed attempts exceeded. Please try again later.",
	pwChangeInvalidTooManyChangeAttempts_msg: "Your password was changed too often. Please try again later.",
	pwChangeButtonSendCode_action: "Send code",
	pwChangeButtonChangePw_action: "Change password",
	serverNotReachable_msg: "Could not reach server. Please try again later.",

	// general
	emptyString_msg: "\u2008", // an empty string or normal whitespace makes a label collapse, so enter this invisible character
	save_action: "Save",
	dismiss_action: "Cancel",
	cancel_action: "Cancel",
	edit_action: "Edit",
	delete_action: "Delete",
	undelete_action: "Undelete",
	print_action: "Print",
	back_action: "Back",
	ok_action: "Ok",
	monthNames_label: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
	weekDays_label: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
	yesterday_label: "yesterday",
	busy_alt: "Busy",
	close_alt: "Close",
	german_alt: "Deutsch",
	english_alt: "English",
	check_msg: "Checking...",
	add_action: "Add", // also used by outlook addin
	remove_action: "Remove", // also used by outlook addin
	notFound404_msg: "Sorry, but the page you are looking for has not been found. Try checking the URL for errors and hit the refresh button of your browser.",
	
	// code verification
	codeNeutralEnterCode_msg: "Please enter the verification code.",
	codeValid_msg: "Code format ok.",
	codeInvalid_msg: "Incorrect code. Please check again.",

	// external login
	receiveMsg_label: "Receive message",
	invalidLink_msg: "Sorry, this link is not valid.",
	expiredLink_msg: "Sorry, this link is not valid any more. You should have received a new notification email with the currently valid link. Previous links are deactivated for security reasons.",
	sendSms_action: "Send SMS",
	smsError_msg: "Could not send SMS.",
	smsSent_msg: "The SMS should arrive in not more than 60s.",
	smsResent_msg: "If no SMS has been arrived you may resend it now.",
	smsSentOften_msg: "Too many sent SMS. Please ask the sender of the message to resend it.",
	invalidPassword_msg: "Invalid password. Please check it again.",
	showMail_action: "Show email",
	chooseNumber_msg: "Please click on one of the \"Send SMS\" buttons below. The Tutanota password for your mailbox will be sent to the given number (maximum of three SMS).",
	clickNumber_msg: "Please click on the \"Send SMS\" button below. The Tutanota password for your mailbox will be sent to the given number (maximum of three SMS).",
	storePassword_action: "Store password in browser",
	enterPresharedPassword_msg: "Please enter the password which you have agreed upon with the sender.",
	sendingSms_msg: "Sending SMS...",
	onlyPrivateComputer_msg: "Only choose this option if you are using a private computer. Otherwise the password is requested with each access.",
	loadingMail_msg: "Loading email...",
	enterSmsPassword_msg: "Please enter the password that has been transmitted via SMS here or click on the link in the SMS.",

	// login
	welcome_msg: "Login",
	afterRegistration_msg: "Congratulations and welcome aboard! You are now a member of the Tutanota family. Login - and enjoy!",
	loginFailedOften_msg: "Too many failed login attempts. Please try again later.",
	loginFailed_msg: "Invalid login credentials. Please try again.",
	login_action: "Log in",
	login_msg: "Logging in.",
	mailAddress_label: "Email address",

	// header
	logo_alt: "Tutanota logo",
	featureNotAvailable_msg: "This feature will be available in 2014!",
	new_label: "New",
	emails_label: "Emails",
	emails_alt: "Emails",
	newMail_alt: "New Email",
	contacts_label: "Contacts",
	contacts_alt: "Contacts",
	newContact_alt: "New Contact",
	newFolder_alt: "New Folder",
	files_alt: "Files",
	files_label: "Files",
	calendar_label: "Calendar",
	calendar_alt: "Calendar",
	tasks_label: "Tasks",
	tasks_alt: "Tasks",
	feedback_label: "Feedback",
	feedback_alt: "Feedback",
	logout_label: "Logout",
	logout_alt: "Logout",
	settings_label: "Settings",
	settings_alt: "Settings",

	// not supported
	for_label: "for",
	oldBrowser_msg: "Oh! We are sorry. Unfortunately, you are using an outdated browser with severe security breaches. Please upgrade to the latest version of one of the following browsers:",
	unsupportedBrowser_msg: "Oh! We are sorry. Unfortunately, you are using an unsupported browser. Please upgrade to the latest version of one of the following browsers:",
	browserNoKeygen_msg: "Dear Tutanota prospect, during the registration process secure keys are generated. Unfortunately the key generation needs more performance than your currently used browser or device may provide. Please use one of the following browsers on a desktop or laptop computer:",
	thanks_msg: "Thank you for your cooperation.\nYour team from Tutanota",
	claim_label: "Tutanota - mail. done. right.",

	// registration
	registration1Headline_msg: "Registration (step 1 of 2)",
	registration2Headline_msg: "Registration (step 2 of 2)",
	company_label: "Company",
	invoiceAddress_label: "Invoice address",
	domain_label: "Domain",
	companyNameNeutral_msg: "Please enter company name.",
	companyNameValid_msg: "Company name ok.",
	verifyingCode_msg: "Verifying code. Please wait.",
	sendingSms_alt: "Sending SMS. Please wait.",
	creatingAccount_alt: "Creating account. Please wait.",
	loginNameInfo_msg: "Optional: email recipients may identify you by this name.",
	mobileNumberInfo_msg: "Your mobile phone number is needed to authorize you when you want to change your password.",
	mobileNumberNeutral_msg: "Please enter mobile phone number.",
	mobileNumberValid_msg: "Mobile phone number ok.",
	mobileNumberInvalid_msg: "Mobile phone number is not valid.",
	mailAddressInfo_msg: "This will be your new email address. Register with a unique name. First come, first serve. At least four letters required.",
	mailAddressNeutral_msg: "Please enter mail address.",
	mailAddressInvalid_msg: "Mail address is not valid.",
	mailAddressAvailable_msg: "Mail address is available.",
	mailAddressNA_msg: "Mail address is not available.",
	mailAddressBusy_msg: "Verifying mail address...",
		pwStrength_title: "This shows the security level of your entered password.",
	goodPassphrase_action: "How to find a good password?",
	termsAndConditions_action: "Terms & conditions",
	join_action: "Join",
	joinNeutral_msg: "Join to receive your personal verification code via SMS verifying your mobile number.",
	joinRunning_msg: "An SMS is sent...",
	joinFailure_msg: "Sorry, we could not send the SMS. Please try again later.",
	codeInputInfo_msg: "The code was sent to $.",
	createAccount_action: "Create account",
	createAccountRunning_msg: "Account is being created...",
	createAccountTooManyAttempts_msg: "Too many wrong attempts. Please try again later.",
	createAccountError_msg: "Sorry, but there was an error. Please try again later.",
	createAccountInfo_msg: "Depending on your computer's individual performance it may take some minutes to generate your secure keys.",
	acceptConditions_label: "Accept",
	name_label: "Name",
	mobileNumber_label: "Mobile phone number",
	desiredAddress_label: "Desired email address",
	password_label: 'Password',
	repeatedPassword_label: 'Repeat password',
	registrationCodeInput_label: "Verification code",
	progress_msg: "Progress",
	terms_label: "Terms & conditions",
	termsAcceptedNeutral_msg: "Please accept the terms & conditions.",

	// feedback
	screenshot_msg: "A screenshot will be sent along with your message to us!",
	sendFeedbackFailed_msg: "Sorry, sending feedback failed. Please try again later.",
	
	// outlook
	tutanotaStarter_label: "Tutanota Starter for Microsoft Outlook",
	version_label: "Version:",
	tutanotaWebClientColon_label: "Tutanota Webapp:",
	tutanotaWebClient_label: "Tutanota Webapp",
	help_label: "Get help:",
	sendLogFile_action: "Send log file via email",
	info_label: "Info",
	changePassword_label: "Change password",
	account_label: "User",
	selectAddress_label: "Please select email address",
	passwordNeutral_msg: "Your Tutanota password.",
	savePassword_label: "Remember",
	savePassword_msg: "Store the password and do not ask me again for it.",
	confidentialDefault_label: "Confidential default",
	confidentialDefault_msg: "Send new messages confidentially by default. You can change this setting anytime in the settings.",
	noConnection_msg: "You are offline: Could not connect to Tutanota.",
	loginAction_msg: "You will only receive secure Tutanota emails after logging in.",
	presharedPasswordAndStrength_msg: "Password strength:",
	confidentiality_label: "Confidentiality",
	confidentialityOffline_msg: "You are offline and this message will not be sent confidential. Click to send a confidential message.",
	confidentialityDisabled_msg: "This message will not be sent confidential. Click to send a confidential message.",
	confidentialityEnabled_msg: "This message will be sent confidential.",
	localMailBegin_msg: "This message hast been sent securely with <a href=\"http://tutanota.de\">Tutanota</a> to the following recipients:",
	technicalError_msg: "A technical error occured. Please try again later. Inform your administrator if this error occurs again.",
	invalidSwVersion_msg: "Your Tutanota addin has to be updated. When you restart Outlook the new version will automatically be downloaded and installed.",
	accountDeactivated_msg: "Unfortunately, your Tutanota account was deactivated. Please contact your administrator.",
	sending_msg: 'Your message is encrypted and sent.',
	sendingFailed_msg: 'Could not send the message. Please try again later.',
	savingFailed_msg: 'The message has been sent successfully but could not be stored into your sent messages folder.',
	outlookVersionNotSupported_msg: 'Unfortunately, this version of Outlook is not supported for Tutanota. Please use Oulook 2010 or Outlook 2013.',
	invalidAttachment_msg: "This email can not be sent via Tutanota because it contains an unsupported attachment.",
	showInAddressBook_alt: "Edit contact",
	testPhaseExpired_msg: "The free of cost test phase has expired, so sending of confidential emails has been deactivated. Please contact your administrator.",
	autoTransmitPassword_label: "Automatic passwort via SMS",
	setMobileNumber_msg: "Please enter mobile phone number.",
	mobileNumberValidFormat_msg: "Format ok.",
	invalidPasswordChannel_msg: "Please enter a valid german mobile phone number or a strong enough Password for the following recipient: ",
	passwortChannelColumnHeading_label: "Tutanota",
	passwordChannelColumnInfo_msg: "This message is sent confidentially via Tutanota. At least one german mobile number or an agreed password per external recipient is needed.",
};

tutao.tutanota.ctrl.LanguageViewModel.de = {
	// mail
	deleteMail_msg:	"Neue E-Mail verwerfen ohne zu speichern?",
	tooBigAttachment_msg: "Die folgenden Dateien konnten nicht angehängt werden, da sie größer als 25 MB sind: ",
	received_action: "Empfangen",
	receivedMail_alt: "Empfangene E-Mail",
	receivedMails_alt: "Empfangene E-Mails",
	sent_action: "Gesendet",
	sentMail_alt: "Gesendete E-Mail",
	sentMails_alt: "Gesendete E-Mails",
	trash_action: "Gelöscht",
	trashedMail_alt: "Gelöschte E-Mail",
	trashedMails_alt: "Gelöschte E-Mails",
	mailWithAttachment_alt: "E-Mail mit Anhang",
	meNominative_label: "Ich",
	meDativ_label: "Mir",
	meAccusative_label: "Mich",
	from_label: "Von",
	to_label: "An",
	cc_label: "Cc",
	bcc_label: "Bcc",
	ccBcc_label: "B/Cc",
	closedLock_alt: 'Geschlossenes Schloss',
	openedLock_alt: 'Offenes Schloss',
	attachFiles_action: "Dateien anhängen",
	removeAttachment_alt: "Anhang entfernen",
	passwordTransmission_label: "Passwortübertragung",
	atLeastOneMobileNumber_label: "Für jeden externen Empfänger ist mindestens eine deutsche Mobilfunknummer oder ein vereinbartes Passwort notwendig.",
	secureMail_title: 'Die E-Mail wird für alle externen Empfänger verschlüsselt.',
	unsecureMail_title: 'Die E-Mail wird unverschlüsselt an externe Empfänger gesendet.',
	noRecipients_msg: 'Sie müssen mindestens einen Empfänger angeben.',
	invalidRecipients_msg: 'Bitte korrigieren Sie die ungültigen E-Mail-Adressen der Empfänger.',
	noSubject_msg: 'Bitte geben Sie einen Betreff für die E-Mail an.',
	noPasswordChannels_msg: 'Bitte geben Sie eine Mobilfunknummer oder ein vereinbartes Passwort für jeden externen Empfänger an.',
	invalidPasswordChannels_msg: 'Bitte überprüfen Sie die Mobilfunknummern auf Gültigkeit.',
	maxSizeExceeded_msg: "Die maximale Größe von $ für unsichere Nachrichten an externe Empfänger wurde überschritten.",
	send_action: "Absenden",
	reply_action: "Antworten",
	replyAll_action: "Allen antworten",
	forward_action: "Weiterleiten",
	replyConfidential_action: "Vertraulich antworten",
	by_label: "von",
	date_label: "Datum",
	subject_label: "Betreff",
	showQuotation_action: "+ Details",
	hideQuotation_action: "- Details",
	legacyNoReply_msg: "Dies ist eine alte Version des Internet Explorer und unterstützt nicht das Antworten auf Ihre empfangene E-Mail. Bitte aktualisieren Sie den Browser oder verwenden einen der folgenden:",
	clickToSave_label: "Klicken zum speichern",
	confidential_action: "Vertraulich",
	nonConfidential_action: "Nicht vertraulich",
	noMails_msg: "Keine E-Mails in dieser Liste.",
	noMail_msg: "Keine E-Mail ausgewählt.",
	addMobileNumber_msg: "Zusätzliche Mobilfunknummer eingeben.",
	setPresharedPassword_action: "Vereinbartes Passwort setzen",
	presharedPassword_label: "Vereinbartes Passwort",
	mobileNumberNotValid_msg: "Format ist nicht gültig.",
	fromAddressBook_label: "Aus Adressbuch: ",
	presharedPasswordNotStrongEnough_msg: "Ein oder mehrere vereinbarte Passwörter sind nicht sicher genug. Wollen Sie die E-Mail trotzdem senden?",

	// contact
	discardContact_msg: "Neuen Kontakt verwerfen?",
	discardContactChanges_msg: "Änderungen an Kontakt verwerfen?",
	discardContactChangesFor_msg: "Änderungen an Kontakt \"$\" verwerfen?",
	deleteContact_msg: "Möchten Sie den Kontakt tatsächlich löschen?",
	private_label: "Privat",
	mobile_label: "Mobil",
	fax_label: "Fax",
	work_label: "Arbeit",
	other_label: "Anderes",
	custom_label: "Eigenes",
	twitter_label: "Twitter",
	facebook_label: "Facebook",
	xing_label: "Xing",
	linkedin_label: "Linked in",
	email_label: "E-Mail",
	phone_label: "Telefon",
	address_label: "Addresse",
	social_label: "Soziale Netzwerke",
	comment_label: "Kommentar",
	birthday_alt: "Geburtstag",
	contactImage_alt: "Foto dieses Kontakts",
	removePhoneNumber_alt: "Telefonnummer löschen",
	removeMailAddress_alt: "E-Mail-Adresse löschen",
	removeAddress_alt: "Adresse löschen",
	removeSocial_alt: "Link auf dieses Profil löschen",
	sendMail_alt: "E-Mail an diese Adresse senden",
	callNumber_alt: "Diese Telefonnummer anrufen",
	showAddress_alt: "Diese Adresse in Google Maps anzeigen",
	openSocial_alt: "Profil des Nutzers öffnen",
	firstName_placeholder: "Vorname",
	lastName_placeholder: "Nachnahme",
	birthdayWithFormat_placeholder: "Geburtstag (dd.mm.yyyy)",
	company_placeholder: "Firma",
	title_placeholder: "Titel",
	noContacts_msg: "Keine Kontakte in der Liste.",
	noContact_msg: "Kein Kontakt ausgewählt.",
	passwordsHeading_label: "E-Mail-Passwörter:",
	presharedPasswordHeading_label: "Vereinbart:",
	autoTransmitPasswordHeading_label: "SMS:",
	showPassword_alt: "Button gedrückt halten, um das Passwort anzuzeigen.",
	
	// settings
	accountSettings_action: "Account",
	securitySettings_action: "Sicherheit",
	changePasswordSettings_action: "Passwort ändern",
	adminUserList_action: "Benutzerverwaltung",
	adminUserAdd_action: "Benutzer hinzufügen",
	action_label: "Aktion",
	edit_label: "Bearbeiten",
	editUser_label: "Benutzer bearbeiten",
	save_msg: "Die Daten werden gespeichert ...",
	state_label: "Zustand",
	create_action: "Hinzufügen",
	createActionSuccess_msg: "Alle Accounts wurden erfolgreich angelegt.",
    createActionFailed_msg: "Ein Account konnte nicht angelegt werden. Bitte versuchen Sie es später erneut.",
    createActionStatus_msg: "Es wurden ${index} von ${count} Accounts angelegt.",
	import_action: "Importieren",
	importCsv_label: "CSV-Daten importieren",
	importCsvInvalid_msg: "Die CSV-Daten sind ungültig (Zeile $).",
    successfullyCreatedUsers_msg: "Die folgenden Benutzer wurden erfolgreich angelegt",
    deleted_label: "Gelöscht",
    created_label: "Erstellt",
	
	// account settings
	accountType_label: "Account-Typ",
	mailName_label: "Absendername",
	mailNameInfo_msg: "Dieser Name wird Empfängern Ihrer E-Mails angezeigt.",
	
	// security settings
	lastSuccessfulLogin_label: "Letzter erfolgreicher Login",
	lastSuccessfulLoginInfo_msg: "Der Zeitpunkt des letzten erfolgreichen Logins vor dem aktuellen Login.",
	failedLogins_label: "Fehlgeschlagene Logins",
	failedLoginsInfo_msg: "Die Anzahl fehlgeschlagener Login-Versuche seit dem letzten erfolgreichen Login.",
	
	// change password
	passwordValid_msg: "Passwort ok.",
	oldPassword_label: "Altes Passwort",
	oldPasswordNeutral_msg: "Bitte altes Passwort eingeben.",
	oldPasswordInvalid_msg: "Passwort nicht korrekt.",
	newPassword_label: "Neues Passwort",
	securePasswords_link: "http://de.wikipedia.org/wiki/Passwortsicherheit#Wahl_sicherer_Passw.C3.B6rter",
	password1Neutral_msg: "Bitte neues Passwort eingeben.",
	password1InvalidSame_msg: "Neues und altes Passwort sind identisch.",
	password1InvalidUnsecure_msg: "Neues Passwort ist nicht sicher genug.",
	password2Neutral_msg: "Bitte neues Passwort wiederholen.",
	password2Invalid_msg: "Passwörter sind nicht identisch.",
	verificationCode_msg: "Der Bestätigungscode wird Ihnen per SMS zugesendet.",
	code_label: "Bestätigungscode",
	pwChangeNeutral_msg: "Sie werden einen Bestätigungscode als SMS an $ erhalten.",
	pwChangeNeutralSendingCode_msg: "Code wird gesendet...",
	pwChangeValid_msg: "Passwort wurde geändert.",
	pwChangeInvalidServerNotAvailable_msg: "Der Server ist nicht erreichbar. Das Passwort wurde nicht geändert. Bitte versuchen Sie es später erneut.",
	pwChangeInvalidTooManyVerifyAttempts_msg: "Anzahl erlaubter Versuche überschritten. Bitte versuchen Sie es es später erneut.",
	pwChangeInvalidTooManyChangeAttempts_msg: "Das Passwort wurde zu häufig geändert. Bitte versuchen Sie es es später erneut.",
	pwChangeButtonSendCode_action: "Code senden",
	pwChangeButtonChangePw_action: "Passwort ändern",
	serverNotReachable_msg: "Der Server ist nicht erreichbar. Bitte versuchen Sie es es später erneut.",

	// general
	emptyString_msg: "\u2008",
	save_action: "Speichern",
	dismiss_action: "Verwerfen",
	cancel_action: "Abbrechen",
	edit_action: "Ändern",
	delete_action: "Löschen",
	undelete_action: "Wiederherstellen",
	print_action: "Drucken",
	back_action: "Zurück",
	ok_action: "OK",
	monthNames_label: ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"],
	weekDays_label: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
	yesterday_label: "gestern",
	busy_alt: "Bitte warten...",
	close_alt: "Schließen",
	german_alt: "Deutsch",
	english_alt: "English",
	check_msg: "Überprüfe...",
	add_action: "Hinzufügen",
	remove_action: "Entfernen",
	notFound404_msg: "Leider konnte die von Ihnen aufgerufene Seite nicht gefunden werden. Bitte prüfen Sie die URL nach Fehlern und aktualisieren die aktuelle Seite.",
	
	// code verification
	codeNeutralEnterCode_msg: "Bitte den Bestätigungscode eingeben.",
	codeValid_msg: "Code-Format ok.",
	codeInvalid_msg: "Der Code ist nicht korrekt, bitte überprüfen Sie ihn erneut.",

	// external login
	receiveMsg_label: "Nachricht empfangen",
	invalidLink_msg: "Leider ist dieser Link ungültig.",
	expiredLink_msg: "Leider ist dieser Link nicht mehr gültig. Sie sollten eine neue Benachrichtigungs-E-Mail mit einem aktuellen Link von diesem Absender bekommen haben. Vorhergehende Links werden aus Sicherheitsgründen deaktiviert.",
	sendSms_action: "Sende SMS",
	smsError_msg: "Die SMS konnte nicht gesendet werden.",
	smsSent_msg: "Die SMS sollte innerhalb von 60s ankommen.",
	smsResent_msg: "Wenn die SMS nicht angekommen ist, dann können Sie diese nun erneut senden.",
	smsSentOften_msg: "Es wurden zu viele SMS versendet. Fragen Sie den Sender der Nachricht, ob er Ihnen diese erneut zukommen lassen kann.",
	invalidPassword_msg: "Das Passwort ist leider ungültig.",
	showMail_action: "E-Mail anzeigen",
	chooseNumber_msg: "Bitte klicken Sie auf einen der \"Sende SMS\"-Buttons. Das Tutanota-Passwort für ihre Mailbox wird an die angegebene Mobilfunknummer versendet (maximal drei SMS).",
	clickNumber_msg: "Bitte klicken Sie den \"Sende SMS\"-Button. Das Tutanota-Passwort für ihre Mailbox wird an die angegebene Mobilfunknummer versendet (maximal drei SMS).",
	storePassword_action: "Passwort im Browser speichern",
	enterPresharedPassword_msg: "Bitte geben Sie das mit dem Absender vereinbarte Passwort ein.",
	sendingSms_msg: "SMS wird gesendet...",
	onlyPrivateComputer_msg: "Wählen Sie diese Option nur, wenn Sie einen privaten Computer verwenden. Ansonsten wird das Passwort bei jedem Zugriff abgefragt.",
	loadingMail_msg: "Lade E-Mail...",
	enterSmsPassword_msg: "Bitte geben Sie hier das per SMS übertragene Passwort ein oder klicken Sie auf den Link in der SMS.",

	// login
	welcome_msg: "Login",
	afterRegistration_msg: "Herzlich Willkommen und viel Spaß als Mitglied der Tutanota-Familie!",
	loginFailedOften_msg: "Es sind zu viele Login-Versuche fehlgeschlagen. Bitte versuchen Sie es später erneut.",
	loginFailed_msg: "Ungültige E-Mail-Adresse oder Passwort. Bitte versuchen Sie es erneut.",
	login_action: "Anmelden",

	login_msg: 'Sie werden eingeloggt.',
	mailAddress_label: "E-Mail-Adresse",

	// header
	logo_alt: "Tutanota-Logo",
	featureNotAvailable_msg: "Diese Funktion wird in 2014 verfügbar sein!",
	new_label: "Neu",
	emails_label: "E-Mails",
	emails_alt: "E-Mails",
	newMail_alt: "Neue E-Mail",
	contacts_label: "Kontakte",
	contacts_alt: "Kontakte",
	newContact_alt: "Neuer Kontakt",
	newFolder_alt: "Neuer Ordner",
	files_alt: "Dateien",
	files_label: "Dateien",
	calendar_label: "Kalender",
	calendar_alt: "Kalender",
	tasks_label: "Aufgaben",
	tasks_alt: "Aufgaben",
	feedback_label: "Feedback",
	feedback_alt: "Feedback",
	logout_label: "Abmelden",
	logout_alt: "Abmelden",
	settings_label: "Einstellungen",
	settings_alt: "Einstellungen",

	// not supported
	for_label: "für",
	oldBrowser_msg: "Oh, Das tut uns leid. Sie verwenden eine veraltete Version Ihres Browsers mit erheblichen Sicherheitslücken. Bitte nutzen Sie einen der folgenden Internetbrowser:",
	unsupportedBrowser_msg: "Oh! Das tut uns leid. Sie verwenden einen nicht unterstützten Browser. Bitte nutzen Sie einen der folgenden Internetbrowser:",
	browserNoKeygen_msg: "Lieber Interessent von Tutanota, während der Registrierung werden Schlüssel erzeugt. Die Erzeugung dieser Schlüssel benötigt mehr Rechenleistung als Ihr momentan verwendetes Gerät bereitstellt. Daher registrieren Sie sich bitte am besten auf einem Desktoprechner oder Laptop und verwenden dabei einen der folgenden Browser:",
	thanks_msg: "Vielen Dank für Ihr Verständnis.\nIhr Team von Tutanota",

	// registration
	claim_label: "Tutanota - einfach. sicher. mailen.",
	registration1Headline_msg: "Registrierung (Schritt 1 von 2)",
	registration2Headline_msg: "Registrierung (Schritt 2 von 2)",
	company_label: "Firma",
	invoiceAddress_label: "Rechnungsadresse",
	domain_label: "Domain",
	companyNameNeutral_msg: "Bitte Firmennamen eingeben.",
	companyNameValid_msg: "Firmenname ok.",
	verifyingCode_msg: "Der Code wird überprüft. Bitte haben Sie einen Moment Geduld.",
	sendingSms_alt: "SMS wird gesendet. Bitte haben Sie einen Moment Geduld.",
	creatingAccount_alt: "Ihr Account wird angelegt. Bitte haben Sie einen Moment Geduld.",
	loginNameInfo_msg: "Optional: Wenn Sie eine E-Mail senden, wird dieser Name als Absender verwendet.",
	mobileNumberInfo_msg: "Ihre Mobilfunknummer wird zur Autorisierung benötigt, wenn Sie Ihr Passwort ändern möchten.",
	mobileNumberNeutral_msg: "Bitte Mobilfunknummer eingeben.",
	mobileNumberValid_msg: "Mobilfunknummer ok.",
	mobileNumberInvalid_msg: "Ungültige Mobilfunknummer.",
	mailAddressInfo_msg: "Dies wird Ihre neue E-Mail-Adresse. Es werden mindestens vier Buchstaben benötigt.",
	mailAddressNeutral_msg: "Bitte E-Mail-Adresse eingeben.",
	mailAddressInvalid_msg: "Ungültige E-Mail-Adresse.",
	mailAddressAvailable_msg: "E-Mail-Adresse ist verfügbar.",
	mailAddressNA_msg: "E-Mail-Adresse ist bereits vergeben.",
	mailAddressBusy_msg: "E-Mail-Adresse wird überprüft...",
	pwStrength_title: "Zeigt den Sicherheitsgrad des verwendeten Passworts an",
	goodPassphrase_action: "Wie finde ich ein gutes Passwort?",
	termsAndConditions_action: "Nutzungsbedingungen",
	join_action: "Fortfahren",
	joinNeutral_msg: "Fortfahren, um einen Bestätigungscode für die angegebene Mobilfunknummer per SMS zu erhalten.",
	joinRunning_msg: "Die SMS wird gesendet...",
	joinFailure_msg: "Leider konnte die SMS nicht gesendet werden. Bitte versuchen Sie es später erneut.",
	codeInputInfo_msg: "Der Code wurde gesendet an $.",
	createAccount_action: "Account anlegen",
	createAccountRunning_msg: "Account wird erstellt...",
	createAccountTooManyAttempts_msg: "Zu viele falsche Versuche. Bitte versuchen Sie es später erneut.",
	createAccountError_msg: "Leider ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.",
	createAccountInfo_msg: "Abhängig von der Geschwindigkeit Ihres Computers kann es einige Minuten dauern bis Ihre sicheren Schlüssel erzeugt wurden.",
	acceptConditions_label: "Ich akzeptiere die",
	name_label: "Name",
	mobileNumber_label: "Mobilfunknummer",
	desiredAddress_label: "Gewünschte E-Mail-Adresse",
	password_label: 'Passwort',
	repeatedPassword_label: 'Passwort wiederholen',
	registrationCodeInput_label: "Bestätigungscode",
	progress_msg: "Fortschritt",
	terms_label: "Nutzungs\u00ADbedingungen", // soft hyphen
	termsAcceptedNeutral_msg: "Bitte akzeptieren Sie die Nutzungsbedingungen.",

	// feedback
	screenshot_msg: "Ein Screenshot wird mit der Nachricht an uns versendet!",
	sendFeedbackFailed_msg: "Leider konnte das Feedback nicht gesendet werden. Bitte versuchen Sie es später erneut.",
	
	// outlook
	tutanotaStarter_label: "Tutanota Starter für Microsoft Outlook",
	version_label: "Version:",
	tutanotaWebClientColon_label: "Tutanota Webapp:",
	tutanotaWebClient_label: "Tutanota Webapp",
	help_label: "Hilfe erhalten Sie unter:",
	sendLogFile_action: "Log-Datei per E-Mail senden",
	info_label: "Info",
	changePassword_label: "Passwort ändern",
	account_label: "Benutzer",
	selectAddress_label: "Bitte E-Mail-Adresse auswählen",
	passwordNeutral_msg: "Ihr Tutanota-Passwort.",
	savePassword_label: "Speichern",
	savePassword_msg: "Das Passwort dauerhaft speichern und nicht erneut danach fragen.",
	confidentialDefault_label: "Vertraulich als Standard",
	confidentialDefault_msg: "Neue E-Mails werden standardmäßig vertraulich versendet.",
	noConnection_msg: "Sie sind offline: Es konnte keine Verbindung zu Tutanota hergestellt werden.",
	loginAction_msg: "Nach dem Login können Sie sichere Nachrichten versenden und empfangen.",
	presharedPasswordAndStrength_msg: "Passwortstärke:",
	confidentiality_label: "Vertraulichkeit",
	confidentialityOffline_msg: "Sie sind offline und diese Nachricht wird nicht vertraulich versendet. Klicken Sie, um die Nachricht vertraulich zu senden.",
	confidentialityDisabled_msg: "Diese Nachricht wird nicht vertraulich versendet. Klicken Sie, um die Nachricht vertraulich zu senden.",
	confidentialityEnabled_msg: "Diese Nachricht wird vertraulich versendet.",
	localMailBegin_msg: "Diese Nachricht wurde mit <a href=\"http://tutanota.de\">Tutanota</a> sicher an folgende Empfänger übertragen:",
	technicalError_msg: "Es ist ein technischer Fehler aufgetreten. Bitte versuchen Sie es später noch einmal. Wenden Sie sich an Ihren Administrator, falls der Fehler erneut auftreten sollte.",
	invalidSwVersion_msg: "Ihr Tutanota-Addin muss aktualisiert werden. Wenn Sie Outlook neu starten wird die neue Version automatisch heruntergeladen und installiert.",
	accountDeactivated_msg: "Ihr Tutanota-Account wurde leider deaktiviert. Bitte wenden Sie sich an Ihren Administrator.",
	sending_msg: 'Ihre Nachricht wird verschlüsselt und gesendet.',
	sendingFailed_msg: 'Die Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es später noch einmal.',
	savingFailed_msg: 'Die Nachricht wurde erfolgreich versendet, konnte allerdings nicht in Ihrem Ordner für gesendete Nachrichten gespeichert werden.',
	outlookVersionNotSupported_msg: 'Diese Outlook-Version wird leider nicht von Tutanota unterstützt. Bitte verwenden Sie Outlook 2010 oder Outlook 2013.',
	invalidAttachment_msg: "Diese E-Mail kann leider nicht mit Tutanota gesendet werden, da sie einen nicht unterstützten Anhang enthält.",
	showInAddressBook_alt: "Kontakt bearbeiten",
	testPhaseExpired_msg: "Die kostenfreie Testphase ist abgelaufen, daher ist das Senden von vertraulichen E-Mails deaktiviert worden. Bitte wenden Sie sich an Ihren Administrator.",
	autoTransmitPassword_label: "Automatisches Passwort per SMS",
	setMobileNumber_msg: "Bitte Mobilfunknummer eingeben.",
	mobileNumberValidFormat_msg: "Format ok.",
	invalidPasswordChannel_msg: "Bitte geben Sie eine gültige deutsche Mobilfunknummer oder ein ausreichend starkes Passwort für den folgenden Empfänger an: ",
	passwortChannelColumnHeading_label: "Tutanota",
	passwordChannelColumnInfo_msg: "Diese Nachricht wird vertraulich mit Tutanota versendet. Für jeden externen Empfänger ist mindestens eine deutsche Mobilfunknummer oder ein vereinbartes Passwort notwendig.",
};

