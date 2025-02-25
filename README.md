# KindleDownload
This script downloads all your kindle books that are available via the "Download and Transfer via USB" function on the Amazon website.  The script automates the clicks necessary to download each book.  

Here are instructions to use the script.  If you start the script and want to stop it for any reason, just close the browser.

1) Log into Amazon.com
2) Go to page: https://www.amazon.com/hz/mycd/digital-console/contentlist/booksAll/dateDsc/

3) Open developer tools
	- Firefox 
		1) Click on the burger/three lines at the top right
		2) Click "More tools"
		3) Click "Web Developer Tools"
	- Chrome
		1) Click on three dots at the top right
		2) Click "More tools"
		3) Click "Developer Tools"

4) In the window that just opened, click on the tab titled "Console"
5) Type "allow pasting" and hit Enter
6) Clear the existing logs (only if this is the first time running the script) 
	- Firefox - Hit the "Trash button" in the Console window
	- Chrome - Hit the cirle with the slash through it in the Console window

7) Enable persist logging by hitting the gear (hovering over it will display "Console Settings") and then selecting "Perserve logs"
	- You don't need to do this.  If you don't do this, then logs will be lost when the script moves to the next page of Kindle books

8) Click on the file "kindledownload.js" and copy the contents using the "Copy raw file" option (at the top of the file in Github) into your favorite text editor.  Update the variable "kindleName" in the code by replacing <your Kindle> with the *exact* name of the kindle you want to use to download the books.  The variable is at the bottom of the file
	- To get the exact name, for one book, go to "More actions", then click on "Download & transfer via USB". A dialog will appear with your Kindle's that are eligible to use for Download and Transfer (newer Kindles don't support this feature, I believe).  Copy the name of the Kindle you want to use from this list and paste it.  Make sure there are no spaces at the beginning or end of the text you copied when you paste it.  
9) NOW RELOAD THE PAGE FROM STEP 2 SO THAT THE DIALOG GOES AWAY 

10) Paste the updated code into the command line of the Console window and hit Enter
    	- The command line has either a ">" or a ">>" in front of it
      
12) The script should start and you should start to see output like the following:

	Processing (178):  The Journey Within: Exploring the Path of Bhakti - Radhanath Swami (B01HHJF542) 
	Navigated to https://cde-ta-g7g.amazon.com/FionaCDEServiceEngine/FSDownloadContent?type=EBOK&key=B01HHJF542&fsn=G8S1LG13417608QH&device_type=A328XUBPG464LQ&customerId=A1S97B2CUM3EH&authPool=Amazon&ts=1740506532345&signature=KRAQjBrJCdmBnhEm6CHNcKWYu8pNXdIXJHkHx7SYINc=&markerB64=dHlwZTtrZXk7ZnNuO2RldmljZV90eXBlO2N1c3RvbWVySWQ7YXV0aFBvb2w7dHM=&mn=Y29tLmFtYXpvbi5kaWdpdGFsLmRlbGl2ZXJ5LnVybEhNQUMucHJvZA==&ms=1&mt=s
	Success: The Journey Within: Exploring the Path of Bhakti - Radhanath Swami (B01HHJF542) 

	- Note that the number in parenethesis is the current count of books processed.  So this entry is for the 178th book.  
	- Note that you may sometimes see "Fail:".  This can happen for legitimate reasons, like you now longer have a library book checked out so it can't be downloaded.  Wait until the script ends.  You will be show a list of successfully downloaded books as well as books that failed download.  You can then investigate.  


13) When you're done, make sure that you disable persistance

A few additional notes:

	- In Chrome, you may be prompted that Amazon.com wants to download multple files.  Hit "Allow"
	- If there is a failure that stops the script, just paste the code again while on the page where the failure happened.  The downloads will start on that page and continue to the remaining pages.  Usually, the issue that stopped the script will not happen again.
	- You can have your browser in the background but I recommend you watch the download process
	- I've successfully run the script on the following browser versions on Windows 11:
		- Chrome: 133.0.6943.127 (64-bit)
		- Firefox: 135.0.1 (64-bit)
	- You may see "Activity not was not successful" in bright red in the logs.  This is normal and nothing to be concerned about
	- The number of books show in your Kindle/Kindle app may be slightly different from the number of books downloaded.  This may not be an error as some books cannot be downloaded (for example, books you check out from the library but then returned).  A list will be printed of the status of book downloads at the end of the script
	- Sometimes you'll see visual issues with the website while the script is running.  As long as downloads continue, this isn't an issue
		- For example, the "Success" dialog can sometimes remain in the forefront and then get weirdly updated.  
