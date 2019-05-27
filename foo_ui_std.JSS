; Scripts for Foobar 2000.
; Written by Munawar Bijani
include "hjconst.jsh";
include "foo_ui_std.JSM";

Script SayRemainingTime ()
	var string timeString = getTimeString();
	if (timeString == "")
		sayMessage(OT_ERROR, Msg_NOTRACK_L, Msg_NOTRACK_S);
		return;
	endIf
	; The elapsed time and remaining time are on either side of the / in the status bar, so we'll segment the string by the / and extract the two parts.
	var string elapsed = stringSegment(timeString, "/", 1);
	var string total = stringSegment(timeString, "/", -1);
	var int remainingSeconds = getNumberOfSeconds(total) - getNumberOfSeconds(elapsed);
	var string time = getTimeStringFromSeconds(remainingSeconds);
	sayFormattedMessage (OT_STATUS, Msg_REMAININGTIME_L, Msg_REMAININGTIME_S, time);
EndScript

Script SayElapsedTime ()
	var string timeString = getTimeString();
	if (timeString == "")
		sayMessage(OT_ERROR, Msg_NOTRACK_L, Msg_NOTRACK_S);
		return;
	endIf
	; The elapsed time is simply the left-hand side of the / in the status bar.
	var string elapsed = StringSegment (timeString, "/", 1);
	var int seconds = getNumberOfSeconds(elapsed);
	var string time = getTimeStringFromSeconds(seconds);
	sayFormattedMessage(OT_STATUS, Msg_ELAPSEDTIME_L, Msg_ELAPSEDTIME_S, time);
EndScript

Script SayTotalTime ()
	var string timeString = getTimeString();
	if (timeString == "")
		sayMessage(OT_ERROR, Msg_NOTRACK_L, Msg_NOTRACK_S);
		return;
	endIf
	; The total track length is simply the right-hand side of the / character. Since the format is elapsed / total,
	; we can use negative indecies to grab the last segment of the string.
	var string total = StringSegment (timeString, "/", -1);
	var int seconds = getNumberOfSeconds(total);
	var string time = getTimeStringFromSeconds(seconds);
	sayFormattedMessage(OT_STATUS, Msg_TOTALTIME_L, Msg_TOTALTIME_S, time);
EndScript

intArray Function getTimeParts (string timestamp)
	var
		intArray parts;
	parts = new intArray[3];
	while(stringSegmentCount (timestamp, ":") < 3)
		timestamp = "0:" + timestamp;
	endWhile
	var int i;
	for i = 1 to 3
		parts[i] = StringToInt(StringSegment(timestamp, ":", i));
	endFor
	return parts;
EndFunction

int Function getNumberOfSeconds (string timestamp)
	var intArray timeParts = getTimeParts(timestamp);
	return timeParts[1] * 3600 + timeParts[2] * 60 + timeParts[3];
EndFunction

string Function getTimeStringFromSeconds (int totalSeconds)
	var
		string result;
	var int hours = totalSeconds / 3600;
	if (hours > 0)
		totalSeconds = totalSeconds - hours*3600;
		result = result + intToString(hours) + " hour";
		if (hours != 1)
			result = result + "s";
		endIf
	endIf
	var int minutes = totalSeconds / 60;
	if (minutes > 0)
		if (result != "")
			result = result + ", ";
		endIf
		totalSeconds = totalSeconds - minutes * 60;
		result = result + intToString(minutes) + " minute";
		if (minutes != 1)
			result = result + "s";
		endIf
	endIf
	if (totalSeconds > 0)
		if (result != "")
			result = result + " and ";
		endIf
		result = result + intToString(totalSeconds) + " second";
		if (totalSeconds != 1)
			result = result + "s";
		endIf
	endIf
	return result;
EndFunction

string Function getTimeString ()
	var string statusLine = getBottomLineOfWindow();
	if (statusLine == "Playback stopped.")
		return "";
	endIf
	statusLine = StringStripAllBlanks(statusLine);
	return StringSegment (statusLine, "|", -1);
EndFunction