RShift::
BreakLoop = 0

; Starting up the print bookmark
sendinput ^l ; 
Sleep, 20 
sendinput aaa ;
Sleep, 20
sendinput {enter} ;

; Pressing enter until "Save As" window pops up
Loop, 150
{	
	; A different keybind allows me to break out of this loop incase it stalls here 
	if BreakLoop = 1 
	{
		BreakLoop = 0
		break 
	}

	; If the save as window has successfully opened, press enter to save it and get out of this loop 
	else if WinActive("Save As")
	{ 
		sendinput {enter} 
		break
	}

	; Otherwise, press enter to potentially open the save as menu and wait a little bit 
	else 
	{
		sendinput {enter} 
		Sleep, 20
	}
}

; Always overwrites changes
sendinput {left}
sendinput {enter}
sendinput {left}
sendinput {enter}

return

;----------------------------------------------------------------------------------------------------

; Simple keypress macro 
RCtrl::
BreakLoop = 0
MouseClick Left
return

;----------------------------------------------------------------------------------------------------

; TL;DR - Increments the WO count by 1 (need to manually skip gaps) 
\::
BreakLoop = 0 

; Getting the number at the end of the URL
sendinput ^l ; 
Sleep, 10 ; 
sendinput ^a ;
Sleep, 10 
sendinput ^c ; 
Sleep, 25

; Increment number at end of URL by 1 
TempString = %clipboard%
NumberString := SubStr(TempString, -2) ;
NumberString := NumberString + 1 ; 

; Declaring and initializing to blank value b/c I don't know how AHK handles scope 
ThreeLongNumber := "" 
StringLength := StrLen(NumberString)
if StrLen(NumberString) == 1
	ThreeLongNumber = 00%NumberString%
else if (StrLen(NumberString)) == 2
	ThreeLongNumber = 0%NumberString%
else 
	ThreeLongNumber = %NumberString%

; Put this new number at end of URL
Send {Right} ; Moves cursor to end of URL
Send {BackSpace} ; Gets rid of the three numbers at the end, whatever they are
Send {BackSpace}
Send {BackSpace}
Send %ThreeLongNumber% ; 
sendinput {enter}
return 

;----------------------------------------------------------------------------------------------------

; Paste bookmarklet keyword into URL
Left::
BreakLoop = 0 
sendinput ^l ; 
Sleep, 20
sendinput left ; 
Sleep, 20
sendinput {enter} ;
return 

;----------------------------------------------------------------------------------------------------

; Paste bookmarklet keyword into URL
Right:: 
BreakLoop = 0 
sendinput ^l ;
Sleep, 20 
sendinput right ; 
Sleep, 20
sendinput {enter} ;
return 

;----------------------------------------------------------------------------------------------------

Delete::
BreakLoop = 1
return
