#IfWinActive ahk_class Chrome_WidgetWin_1
{
	; TL;DR - Triggers the bookmarklet via a keypress
	RShift::

	; Send Control-L instruction to select URL bar 
	sendinput ^l ; 

	; Wait for URL bar to be selected, just to be sure 
	Sleep, 10 ; 

	; Send command for custom search engine that runs the bookmarklet
	sendinput refreshcss ; 

	; Pressing enter to actually send that command 
	sendinput {enter} ;

	Counter := 0 

	Loop
	{	
		if WinExist("Save As") or Counter > 120
		{
			break ; 
		}
 
		sendinput {enter} ; 
		Sleep, 25 ; 

		Counter += 1 ; 
	}

	WinActivate, Save As  
	sendinput {enter} ;

	; Covers the case where it needs to overwrite something, but has no negative consequences otherwise 
	WinActivate, Confirm Save As ; 
	Sleep, 50 ; 
	sendinput {left}
	sendinput {enter} 
	sendinput {left}
	sendinput {enter} 
	return

	;----------------------------------------------------------------------------------------------------


	; TL;DR - Clicks w/ the mouse button, but allows you to hit a key to do so 
	RCtrl::

	MouseClick Left 

	return

	;----------------------------------------------------------------------------------------------------

	; TL;DR - Increments the WO count by 1 (need to manually skip gaps) 
	\::

	; Getting the number at the end of the URL
	Sleep, 50 
	sendinput ^l ; 
	Sleep, 50
	sendinput ^a ; 
	sendinput ^c ; 
	Sleep, 50 
	URLString = %clipboard% ; 

	NumberString := SubStr(URLString, -2) ;

	; Incrementing that number by 1
	NumberString := NumberString + 1 ; 

	Send {Right}
	Send {BackSpace}
	Send {BackSpace}
	Send {BackSpace}

	if StrLen(NumberString) >= 3
		ThreeLongNumber := %NumberString% ; 

	else if StrLen(NumberString) >= 2
		ThreeLongNumber = 0%NumberString% ; 

	else 
		ThreeLongNumber = 00%NumberString% ;

	Send %ThreeLongNumber% ;  

	; Hitting enter to go to that URL 
	sendinput {enter}
	return 

	Left::

	; Send Control-L instruction to select URL bar 
	sendinput ^l ; 

	; Wait for URL bar to be selected, just to be sure 
	Sleep, 10 ; 

	; Send command for custom search engine that runs the bookmarklet
	sendinput leftbookmark ; 

	; Pressing enter to actually send that command 
	sendinput {enter} ;

	return 

	Right:: 

	; Send Control-L instruction to select URL bar 
	sendinput ^l ; 

	; Wait for URL bar to be selected, just to be sure 
	Sleep, 10 ; 

	; Send command for custom search engine that runs the bookmarklet
	sendinput rightbookmark ; 

	; Pressing enter to actually send that command 
	sendinput {enter} ;

	return 
}