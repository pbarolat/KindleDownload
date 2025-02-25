sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

function getItems(targetText, tagName, element) {
	cand = element.getElementsByTagName(tagName);
	let array=[]
	for (let i = 0; i < cand.length; i++) {
	  const c = cand[i];
	  // Perform actions with the element
	  array.push(c.innerText);
	  
	}
	if(verbose) {
		console.log(array)
	}
	filt = Array.from(cand).filter((el) => el.innerText === targetText);
	return filt;
}


function getItemsById(targetId, tagName, element) {
	cand = element.getElementsByTagName(tagName);
	let array=[]
	for (let i = 0; i < cand.length; i++) {
	  const c = cand[i];
	  // Perform actions with the element
	  array.push(c.id);
		  
	}
	if(verbose) {
		console.log(array)
	}
	filt = Array.from(cand).filter((el) => el.id.match(targetId));
	return filt;

}



async function downloadBook(bookid) {
	downloaded=false
	popup=getItemsById("DOWNLOAD_AND_TRANSFER_DIALOG_" + bookid, "div", this.document)
	kindlecounter=0
	kindles=[]
	if(popup.length != 0) {
		do {
			kindlecounter++
			await sleep(2000)
			kindles=getItems(kindleName, "div", popup[0])
			
			
			
			if(kindles.length != 0){
				kindles[1].parentElement.children[0].children[0].click()
				buttonspan = getItems("Download", "span", popup[0])
				if(buttonspan.length == 1) {
					button = buttonspan[0].parentElement
					button.click();
					downloaded=true
				} else {
					console.log("Cound not find download button")
				}
			} 
		} while(kindles.length == 0 && kindlecounter < 4)
		if(kindles.length == 0) {
			console.log("Could not find Kindle")
		}
	} else {
		console.log("Could not find Dialog")
	}
	return downloaded;
}

async function start() {
	
	bookcount=0
	success=[]
	fail=[]
	currentpagearray=this.document.getElementsByClassName("page-item active");
	
	if(currentpagearray.length == 1) {
		currentpage=currentpagearray[0]
		do {
			
			currentpagearray=this.document.getElementsByClassName("page-item active");
			if(currentpagearray.length == 1) {
				currentpage=currentpagearray[0];
				console.log("Processing page " + currentpage.innerText);
				checkmarks=getItemsById("KindleEBook_checkmark", "span", this.document)
				for (let z = 0; z < checkmarks.length; z++) {
					downloaded=false
					checkmark=checkmarks[z];
					bookid=checkmark.id.substring(0, checkmarks[0].id.indexOf(":"))
					titlearray=getItemsById("content-title-" + bookid, "div", this.document)
					authorarray=getItemsById("content-author-" + bookid, "div", this.document)
					title="Unknown"
					author="Unknown"
					bookcount++
					if(titlearray.length == 1) {
						title=titlearray[0].innerText
					} 
					if(authorarray.length == 1) {
						author=authorarray[0].innerText
					}
					booksummary=title + " - " + author + " (" + bookid + ")"
					console.log("---------------------------")
					console.log("Processing (" + bookcount + "):  " + booksummary);

					element=checkmark.parentElement.parentElement.parentElement
					actions=getItems("More actions", "span", element)	
					if(actions.length == 1) {
						actions[0].click();

						downloadTransfer=getItems("Download & transfer via USB", "span", element)
						if(downloadTransfer.length == 1) {
							downloadTransfer[0].click();
							downloaded=await downloadBook(bookid)
							await sleep(1000)
							close=getItemsById("notification-close", "span", this.document);
							if(close.length == 1) {
								close[0].click()
							} else {
								console.log("Could not find X to close")
							}
						} else {
							console.log("Could not find Download & transfer via USB button")
							actions[0].click();
							
						}

					} else {
						console.log("Could not find More Actions button")
						
					}
					if(downloaded) {
						console.log("Success: " + booksummary)
						success.push(booksummary)
					} else {
						console.log("Failed: " + booksummary)
						fail.push(booksummary)
					}
					console.log("---------------------------")

				}
				nextpage=currentpage.nextElementSibling 
				if(nextpage== null) {
					console.log("Could not find More Actions button");
					page="page-"+ (currentpage.innerText++);
					console.log("Trying to get page " + page);
					
					arefpage=getItemsById(page, "a", this.document);
					if(arefpage.length != 0) {
						console.log("Found page");
						nextpage=arefpage[0]
					}
				}
				if(nextpage != null) {
					nextpage.click()
					await sleep(10000)
				} else {
					console.log("Could not find current page. Stopping")
					nextpage=null
				}
			}
		} while(nextpage != null)
		console.log("Processed " + bookcount + " books in this run")
		console.log("Books successfully downloaded:")
		console.log(success)
		console.log("")
		console.log("Books NOT successfully downloaded:")
		console.log(fail)
	} else {

		console.log("It looks like the current page is not correct")
	}
}

verbose=false
kindleName="<your Kindle>"
start()
