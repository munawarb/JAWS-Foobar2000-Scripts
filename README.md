# JAWS Scripts For Foobar2000
[https://www.foobar2000.org](Foobar2000) is a popular media player. Its usage increased after the discontinuation of Winamp which was the media player of choice for many blind people for many years.

The scripts in this repository are for the JAWS For Windows screen reader.

## Functionality
These scripts augment JAWS in the following ways in the Foobar2000 application:
- CTRL+SHIFT+E reports the elapsed time of the currently playing track.
- CTRL+SHIFT+T reports the total running time of the currently playing track.
- CTRL+SHIFT+R reports the remaining time of the currently playing track.
- JAWS uses MSAA inside Foobar2000 listviews so that it can report all columns in lists.

Note: JAWS reports the time by examining the status bar of Foobar2000. These scripts will not work if the default format of the status bar is changed.

## Installing
Installing these scripts is done in the same way as other scripts. Either clone or download the zip file of this repository, and place the individual files in your JAWS user settings directory.