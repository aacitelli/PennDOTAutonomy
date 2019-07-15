## Overview 

This repository houses some AutoHotkey scripts that, paired with some specific Chrome bookmarks, makes printing ECMS pages much quicker. This becomes very useful when you have to print thousands of PDFs to upload to the treasury. 

## Prerequisite Software

- Google Chrome
    - Should theoretically work w/ Firefox as well, but I can't guarantee the JS will be compatible, the bookmark system is the same, and that everything overall will work. Please just use Chrome. It's 2019. 
- AutoHotkey 
    - Required for basically half of this process to work. Skips things that the bookmarklets can't control (Ex: Print Dialog). 

## Installation/Setup


### Workflow

When you get the muscle memory down, the procedure for each project should look like this for maximum speed: 

1. Save the project overview page to the correct directory. This saves Chrome's default directory as well. 
2. Manually navigate to the first work order page 
3. Follow the following steps for each Work Order: 
    - Press shift to print the main work order summary page
    - Press the right arrow key to go into the explanation page
    - Press shift to print the explanation page. The bookmarklet will automatically go back to the main page 
    - Press the left arrow key to go into the authorization page 
    - Press shift to print this page. Bookmarklet automatically goes back
    - For any additional authorizations, you will have to hover over them with the mouse, press RControl to go into them, then shift to print them. Script will automatically go back.
    - Press tab to go to the next work order. If WOs are missing, you will need to manually increment this. 

I was able to get each WO down to about 15 to 30 seconds, but the bottleneck is generally internet connection speed and responsiveness rather than your reaction time or you being quick and accurate about hitting the buttons (although that is still very important). 

## Bookmarklets

### PrintECMSPage

This script handles printing for any of the following ECMS pages: 

- Project Overview
- Project Work Order Page
- Project Work Order Explanation
- Project Work Order Authorization

The script also handles page naming in a way that works with the eventual combination of these PDFs. This naming scheme makes it so that the order the PDFs appear in windows explorer is the order that they should be combined in with whatever PDF combination software you use (likely Adobe Acrobat, which I use). 

The scheme is as follows: 

- Project Summary is always named "0" because it should always be before any work order
- Work Order Summary page is always named `<Number of the Work Order>`
    - For example, the 56th work order would be named "56"
- Work Order Explanation page is always named <Number of the Work Order> + "e"
    - For example, the explanation for the 23rd work order would be named "23e"

#### Authorizations Naming (An Addendum)

Work order authorizations are weird because there is no programmatic way to figure out which WO you came from just from the authorization page, and the print bookmarklet only has access to the current page. So, authorizations are always named `<Number of the last work order to reference that authorization>` + "z" + `<Authorization Number>`. Generally, this means work orders will be next to their authorizations, but in edge cases (Authorizations that apply to multiple WOs) certain WOs will appear to not have an authorization. Rest assured, every work order has its applicable authorization; It just might be further in the line of PDFs, and it'll only appear once. 

### GoToFirstAuthorization

This bookmark goes to the first authorization. This assumes that you are on a work order page currently. 

### GoToExplanation

This bookmark goes to the current WOs explanation. Assumes you are currently on a work order page. 

## AutoHotkey Scripts (Organized By Key Pressed)

Every hotkey described here is located and controlled by the single autohotkey file `bookmarks.ahk`.

### Right Control

Simulates a left click. This is useful as a quieter alternative to a mouse click. To be most efficient, this should only be used to select any authorizations after the first one for a specific work order. 

### Right Shift

Runs the "Print the current page" bookmark. Skips the print dialog by making keypresses when it needs to to save the file. Automatically overwrites the current file. 

Please be sure that your "default save location" is in the correct project before you use this one, because this specific script goes too quick for you to change it. I usually change the save location on the project overview screen, then use this hotkey to print the rest of the pages. 
 
### Backslash

Goes to the next work order. Works by getting the URL, parsing the number at the end of it, incrementing that, and going to the next one. If there's a WO missing, you'll need to manually increment this in the URL. However, this makes simple WO incrementation way quicker. 

### Left Arrow

Executes the "go to the first authorization" bookmarklet. 

### Right Arrow

Executes the "go to the explanation" bookmarklet. 

## Bugs

Any bugs here are generally easily worked around, but they're here so that it's documented that they exist. 

### Shift-Print Hotkey Stalls Out For A Few Seconds

**Cause:** Pressing trigger hotkey (Shift) too soon after page load

**Workaround/Solution:** Make sure the page is loaded before you try and use the hotkey. You can also wait for a 3-second timeout that's built into the code to go through and then you will be able to use the script again. 

## Future Improvement

As it currently stands, this is much more complex than it needs to be, and setup is a pain, especially for those not comfortable with computers and all sorts of other stuff that I use here.

Ideally, I would like to abstract this entire process into one keypress per work order. This requires a few things to happen, not all of which are probably possible due to software limitations: 

- I'd need to figure out how to go to each individual authorization, preferably with just one keypress. Currently there's no way for me to know what authorization I'm on. It's hard to explain. I could probably do this by having the authorizations open in a new window, but it's complex. 
- I'd need to figure out how to make AutoHotkey wait until a specific chrome tab is ready to activate something. AHK lets you wait on entire windows opening and stuff like that, but within a specific chrome instance you can't really do that to my knowledge. You can attach to a chrome instance, but I believe that starts up a fresh one without login cookies or anything like that, so getting ECMS login would be quite the procedure and gets into a legally gray area, so I'm very hesitant to get into that. 

I'm done with this internship soon anyway, and afterward I have no incentive to work on it, but I figured that I'd document everything here and leave this laying around so that it could theoretically be used in the future by future interns and the like. 
