


/**
 * @author David Weinberger
 * self@evident.com
 */
var revdate = "Jan. 28, 2013";


// GLOBALS

var gUsername =  ""; 
var gdatabase = "noterio"; // name of database -- don't really need this any more
var gProject = ""; 
var gProjectarray = new Array(); // contains names and descriptions of every project for a user
var gbooks = new Array(); // will fill with Book objects
// for tagcloud
  var tagThreshhold = 2;
  var largestfont = 60;
  var smallestfont= 8;
var gMaxTitleLength = 15; // max length of title to display in table of notes


// ------ Create book object
function Book(title, bookid, author,pub,city,date,translator,issue, journal, vol, article,url,type,misc,tags,numberofnotes,pages, container,note,isbn){
	this.title = title;
	this.bookid = bookid;
	this.author = author;
	this.pub=pub;
	this.city=city;
	this.date=date;
	this.translator=translator;
	this.issue=issue;
	this.journal=journal;
	this.vol=vol;
	this.article=article;
	this.url=url;
	this.type=type;
	this.misc=misc;
	this.tags=tags;
	this.numberofnotes = numberofnotes;
	this.pages=pages; // page count in an article
	this.container=container; // chapter in a book?
	this.note=note;
	this.isbn=isbn;
}

var gbook = new Book(); // holds current book globally

// create note object
function Note(noteid,content,bookid,page,tagstring,rating){
	this.noteid = noteid;
	this.bookid = bookid;
	this.content = content;
	this.page = page;
	this.tagstring = tagstring;
	this.rating = rating;
}

var gprevcontent; // saved before editing a note
var CurrentTags = new Array();
var rowcols = new Array();
var tablerows = new Array();
var selstart = new Number();
// for biblio array on parsing
var gtitle=0;
var gpub=1;
var gauthor=2;
var gdate=3;
var gcity=4;
var gtype=5;
var gdate=6;
var gurl=7;
var gbid=8;
var biblioinfo = new Array(20);

var gid; // to hold id of editable text
var gclass; // to hold class of editable text
var notearray = new Array();
var tagarray = new Array();
var editing  = true; //DEBUG should be false
var butt;
var buttext;

//------------- INIT
function init(){

     
		// enable the menu at the top
		//$(".pulldownclass").click(function(w){
		$('#mainselectlist').bind('change',function(w) {
		    
			var val = w.currentTarget.value;
			switch(val)
				{					
				case 'newproject':
					ShowHideDiv('newprojectspan');
					break;
				case 'addnotes':
					$("#projectnameform").val=gProject; // add project name to hidden field in form
					ShowHideDiv("multiuploaddiv");
					break;
				case 'bookinfo':
					ShowHideDiv("bookadddiv");
					break;
				case 'refreshprojects':
					buildProjectCombobox();
					break;
				case 'showbooklist':
					displayAllBooks();
					break;
				case 'hidebooklist':
					hideBookDisplay();
					break;
				case 'createbib':
					createBiblio();
					break;
				case 'saveallastext':
					saveAllAsText();
					break;				
				case 'showhidescratchpad':
					ShowHideDiv("scratchpaddiv");
					break;
				case 'refreshbooklist':
					retrieveBooks();
					displayAllBooks();
					break;
				}
			});
			
		// force "[action]" to be the displayed entry
		var aval = $("#actionsoption").val();
		document.getElementById("mainselectlist").value = aval;	
	
 	//make topicboxes droppable
        
      $(".topicdiv").droppable({
      		drop:handledrop,
      		over: function(){ $(this).css("background-color", "#FFFDBE");},
			out: function(){ $(this).css("background-color", "white");}
      		});

	// get cookies
	var cook = getCookie("user");
	if (!cook){ // no user
		// show login display
		$("#loginregdiv").show(500,function(){});
		}
		else {
		gUsername = cook;
		displayLogin(); // put it in the status bar
		$("#loginregdiv").hide();
		}
		
	 // list or stackview?
	cook = getCookie("display");
	if (cook){
		if (cook==="LIST"){
			$("[name='booklistbtns']").filter("[value='List']").prop("checked",true);
			$("[name='booklistbtns']").filter("[value='Shelf']").prop("checked",false);
		}
		else {
			$("[name='booklistbtns']").filter("[value='List']").prop("checked",false);
			$("[name='booklistbtns']").filter("[value='Shelf']").prop("checked",true);
		}
	}
	
	// LIST OR STACVKIEW? on click of list type, change to that type
	$("[name='booklistbtns']").click(function(w) {
  		var li =  w.currentTarget.value; // get value of radio btn
  		// turn on the right radio btn
  		if (li == "List") {
 		    $("[name='booklistbtns']").filter("[value='List']").prop("checked",true);
			$("[name='booklistbtns']").filter("[value='Shelf']").prop("checked",false);
 		}
 		else {
			$("[name='booklistbtns']").filter("[value='List']").prop("checked",false);
			$("[name='booklistbtns']").filter("[value='Shelf']").prop("checked",true);
		}
 		 displayAllBooks(); 
  });
  
    // TAGCLOUD OF ALL OR PROJECT? on click of tagcloud btn, change to that type
	$("[name='tagcloudbtn']").click(function(w) {
  		var li =  w.currentTarget.value; // get value of radio btn
  		// turn on the right radio btn
  		if (li === "All") {
 		    $("[name='tagcloudbtns']").filter("[value='All']").prop("checked",true);
			$("[name='tagcloudbtns']").filter("[value='Project']").prop("checked",false);
			setCookie("tagcloud","ALL");
			buildTagCloud("ALL");
 		}
 		else {
			$("[name='booklistbtns']").filter("[value='All']").prop("checked",false);
			$("[name='booklistbtns']").filter("[value='Project']").prop("checked",true);
			setCookie("tagcloud","PROJECT");
			buildTagCloud("PROJECT");
		}
 		
  });
  
	// Get previous project, if any
	cook = getCookie("project");
	if (cook){
	  gProject = cook;
	  // don't load projectcombobox because can't select the chosen one
	  buildProjectCombobox();
      //indicateSelectedProject(gProject);
	  //loadNewProject(cook);   
	}
    else { // no saved project
    	alert("No project saved. Create new one.");
    	}
    	
    	
    // ---- set up multifile upload
     $('#multiformbutton').click(function(){
     	var fm = document.getElementById("multiuploadform");
		var formData = new FormData(fm);
		 //alert(projname);	
		$.ajax({
			url: 'scripts/multiuploadPart1.php',  //server script to process data
			type: 'POST',
			data: formData,
			//Options to tell JQuery not to process data or worry about content-type
			cache: false,
			contentType: false,
			processData: false,
			success: function(res){
			  var checkedFiles = res;
			  multiuploadConfirm(res);
			},
			error: function(e){
			  var er = e;
			  //alert("Error:" + e);
			}
     })	
   });
}

function logMeIn(){
	// get the values
	var u = $.trim(document.getElementById("userLog").value);
	var p = $.trim(document.getElementById("passwordLog").value);
	var email = $.trim(document.getElementById("emailLog").value);
	// validate
	if (u===""){
		alert("User name required.");
		return;
	}
	if (p===""){
		alert("Password required.");
		return;
	}
	// log in
	$.ajax({
			url: 'scripts/login.php',  
			type: 'POST',
			//data: "user=" + u + "&password=" + p + "&email=" + email,
			data: {user : u, password : p, email : email},
			success: function(r){
			    var w = r.indexOf("+");
				if (w !== 0){ // if it's not an error
					gUsername = u;
					setCookie("user",u);
					gProject = getCookie("project");
					displayLogin(u);
					buildProjectCombobox();
					retrieveBooks();
					displayAllBooks();
					$("#loginregdiv").hide(500,function(){});
					}
				else {
					alert(r);
					}
			},
			error: function(e){
			  var er = e;
			  alert("Problem logging in: " + e);
			}
     })	
     
    
     
}

function registerMe(){
	// get the values
	var u = $.trim(document.getElementById("userLog").value);
	var p = $.trim(document.getElementById("passwordLog").value);
	var email = $.trim(document.getElementById("emailLog").value);
	// validate
	if (u==""){
		alert("User name required.");
		return;
	}
	if (p===""){
		alert("Password required.");
		return;
	}
	// Register the new user
	var w="";
	$.ajax({
			url: 'scripts/register.php',  
			type: 'POST',
			//data: "user=" + u + "&password=" + p + "&email=" + email,
			data: {user : u, password : p, email : email},
			success: function(r){
			    w = r.indexOf("+");
				if (w !== 0){ // if it's not an error
					gUsername = u;
					setCookie("user",u);
					displayLogin(u); // display in status bar
					$("#loginregdiv").hide(500,function(){}); // hide the form
					}
				else {
					alert(r);
					}
			},
			error: function(e){
			  var er = e;
			  alert("Problem logging in: " + e);
			  return;
			}
     })	
     
     //-- log the new person in
     // set the login values
     document.getElementById("userLog").value = u;
     document.getElementById("passwordReg").value = p;
     setCookie("user",u);
     init();
}

function sendResetEmail(){
  $.get('scripts/sendemail.php', {
        data: "user=" + gUsername,
        success: function(){
            alert('Email with new password sent.');
        },
        error: function(){
            alert('Error sending email.');
        }
    })
}

function displayLogin(){
	sp = document.getElementById("loginDisplaySpan");
	sp.innerHTML = gUsername;
}

// -- DROPPED A NOTE INTO A TOPICBOX
function handledrop( event, ui){
 	var target = this; 
 	var dragged = ui.draggable;
 	// create a p with note content and bib info in spans
 	var content = dragged[0].firstChild.textContent;
 	var bookid = dragged[0].getAttribute("bookid");
 	var noteid = dragged[0].getAttribute("noteid");
 	// does it already exist in the target box?
 	var childs = $('.topicboxtext',target);
 	var i, dupe=false;
 	for (i=0;i<childs.length;i++){
 		if (noteid == childs[i].getAttribute("noteid")){
 			dupe = true;
 			$(target).css("background-color", "white")
 			}
 	}
 	if (dupe == true) { // exit if the noteid already is in the target box
 		return
 	}
 	
 	
 	// create the entry. pass it the titlebox span, append it
 	createTopicBoxEntry(this,content,noteid,bookid);
 	
 	// save the entry
 	saveTopicboxEntry(this,noteid,bookid);
 	
 	// set border back to unselected
 	this.style.backgroundColor="white";
 
    // if we're dragging from a topicbox, then delete the node
    // and delete from the database
    var pclass = dragged[0].getAttribute("class");
    if ( pclass.indexOf("topicboxp") > -1 ){
    	var tboxdiv = dragged[0].parentNode;
    	deleteTopicboxEntry(dragged[0],noteid); 
    	tboxdiv.removeChild(dragged[0]); // delete node
    	
    	
    }

     this.style.height="100%";
}

function createTopicBoxEntry(topicboxdiv,content,noteid,bookid){
	// make a p with a span for the text and one for the bib
 	var bid = bookid;
 	var nid = noteid;
 	// create the <p> container
 	var  p = document.createElement("p");
 	p.setAttribute("class", "topicboxp");
 	p.setAttribute("bookid",bid);
 	p.setAttribute("noteid", nid);
 	// create the text content span
 	var sp = document.createElement("span");
 	sp.innerHTML = content;
 	sp.setAttribute("class","topicboxtext");
 	sp.setAttribute("bookid", bid);
 	sp.setAttribute("noteid",nid);
 	sp.setAttribute("ondblclick","displayBookNotesFromTopicbox('" + bid + "')");
 	// create the bib span
 	var bibsp = document.createElement("span");
 	bibsp.setAttribute("class","topicboxbib");
 	bibsp.setAttribute("bookid", bid);
 	var whichb = getBookByID(bid); // look it up
 	var booktit = gbooks[whichb].title;
 	var bookauth = gbooks[whichb].author;
 	bibsp.innerHTML = booktit + " by " + bookauth;
 	// create the delete button
 	var delsp = document.createElement("span");
 	delsp.setAttribute("class","smalltextblue");
 	delsp.setAttribute("nid", nid);
 	delsp.innerHTML = "[X]";
 	delsp.setAttribute("onclick","deleteTopicboxEntryFromX(this," + nid + ")");
 	delsp.setAttribute("title","Delete this entry");
 	
 	// append new content
 	bibsp.appendChild(delsp); // append the delete button to the bib
 	p.appendChild(sp); // append the text span 
 	p.appendChild(bibsp); // append the bib span
 	topicboxdiv.appendChild(p); // append the entire p to the topicboxdiv

 	// make draggable
      $(".topicboxp").draggable({
      			  revert: true,
      			  cursorAt: { left: 5 },
                  helper: function() {
					   var t = this.firstChild.innerHTML;
					   if (t.length > 15) {t = t.substring(0,15) + "...";}
					   var d = "<div class='dragIcon'>" + t + "</div>";
					   return  $(d)[0];
    		      }
        });
 	return p
}

// ----- CREATE NEW TOPICBOX - HTML SKELETON - EMPTY TITLE BOX
function createNewTopicBox(firstTime){
 	// create main div 
	var div = document.createElement("div");
	div.setAttribute("class","topicdiv");
	document.getElementById("topicsdiv").appendChild(div);
	var p = document.createElement("p"); // create the title box
	 p.setAttribute("class","topicboxh1");
	 var titsp = document.createElement("span");
	 titsp.setAttribute("class","topicboxh1text");
	 div.appendChild(p);
	 p.appendChild(titsp);

	 // add delete button
	 sp = document.createElement("span");
	 sp.setAttribute("class","minimizebtn");
	 sp.innerHTML=" X&nbsp;&nbsp;";
	 sp.setAttribute("title","Delete this topic box");
	 sp.setAttribute("onclick","deleteTopicBox(this)");
	 p.appendChild(sp);
	 // add minmize or maximize te entire topic box
	 sp = document.createElement("span");
	 sp.setAttribute("class","minimizebtn");
	 sp.setAttribute("title","Grow or shrink the entire box");
	 sp.innerHTML=" ^ ";
	 sp.setAttribute("onclick","growOrShrinkTopicbox(this)");
	 p.appendChild(sp);
	 // add show-hide bib btn
	 sp = document.createElement("span");
	 sp.setAttribute("class","minimizeBibsbtn");
	 sp.setAttribute("title","Toggle the bib info");
	 sp.innerHTML=" &lt; ";
	 sp.setAttribute("onclick","minimizeBibs(this)");
	 p.appendChild(sp);
	
	// make droppable
    $(".topicdiv").droppable({
      		drop:handledrop,
      		over: function(){ $(this).css("background-color", "#FFFDBE");},
			out: function(){ $(this).css("background-color", "white");}
      });
      
  
	// is this a new box, as opposed to reading in an old one?
	if (firstTime !="FIRST TIME"){
		return div
	}
	// First time box, so add text area for title
	// add blank title box
	var tit = document.createElement("textarea");
	//tit.setAttribute("class","deletetopicboxbtnclass");
	tit.setAttribute("class","topicboxtextarea");
	//tit.setAttribute("onBlur","saveTopicBoxTitle(this)");
	tit.setAttribute("onclick","this.innerHTML=''");
	tit.innerHTML="[Create title, then press Enter]";
	tit.addEventListener('keydown', cK, false);
	titsp.appendChild(tit);
	
    return div;

}

function cK(e){
	var k;
   	k= e.keyCode;
   	if (k == 13){
   		saveTopicBoxTitle(this);
   	}
}

//--- SAVBE TOPIC BOX TITLE
function saveTopicBoxTitle(w){
    // if this is first time, have to save topicbox itself
    var name = w.value;
    // no name?
    if (name ==""){
    	alert("No name. Topic box not saved.");
    	return
    }
    
    var resp = "";
	$.ajax({
			url: 'scripts/createTopicBox.php',  
			type: 'POST',
			data: "title=" + name +  "&project=" + gProject + "&user=" + gUsername,
			success: function(res){
				 resp =  trimSpacesAndLfs(res);
				 if (resp=="ALREADY EXISTS"){
					alert(name + " already exists for this project. Try again.");		  
				 }
				 if (resp == -1) {
				 	alert("Error saving topic box");
				 }
				 if (resp == "SUCCESS") {
				 var par = w.parentNode;
				 var tit = w.value;
				 par.removeChild(w);
				 par.innerHTML = tit;
				// createTopicBoxSkeleton(par);
     	
				 }
			 },
			error: function(e){
			  var er = e;
			  alert(er);
			}
     })	
     
     var temp = resp;
     // if success, then turn the textarea into a p
     if (resp == "SUCCESS"){
     	
     }
}

//--- SAVE ONE TOPICBOX ENTRY
function saveTopicboxEntry(div,nid,bid){

   // get the title
   var titdiv = $('.topicboxh1text',div);
   var tit = titdiv[0].innerHTML;
	

	$.ajax({
			url: 'scripts/saveTopicboxEntry.php',  //server script to process data
			type: 'POST',
			data: "noteid=" + nid + "&bookid=" + bid + "&title=" + tit + "&user=" + gUsername + "&project=" + gProject,
			//Options to tell JQuery not to process data or worry about content-type
			
			success: function(res){
			  	// display success message: returns html list of titles entered
			 	//alert("SUCCESS: " + res);
			  
			},
			error: function(e){
			  var er = e;
			 alert("Error in saveTopicboxEntry: " + e);
			}
     })	
}

//---- SAVE TOPIC BOX
function saveTopicBox(w){
    // w = the span with the saved link in item
        
    var div = w.parentNode.parentNode;
    // get rest of children
    var childs = div.childNodes;
    var titel = childs[0].firstChild;
    var tit = titel.innerHTML; //escapeIt(titel.innerHTML);
    // cycle through rest
    var i, note, notetxt, bib, noteid, bookid;
    var entry = new Array();
    var arrayofentries = [];
    var allentries =  $('.topicboxtext',div); // get all entries
    if (allentries.length == 0) {return}
    for (i=0; i < allentries.length; i++){
    	noteid = allentries[i].getAttribute("noteid");
    	bookid = allentries[i].getAttribute("bookid"); 
    	arrayofentries[i] = {
    		"noteid": noteid, 
    		"bookid" : bookid
    		};
    }
     var jsn = JSON.stringify(arrayofentries);
    var jsntemp = [{
      "name": tit,
      "user" : gUsername,
      "project" : gProject,
	 //"entries" : arrayofentries
    	//"entries" : arrayofentries
      }];
    
    //  var jsn = JSON.stringify[jsn];
    // save the JSON
	$.ajax({
			url: 'scripts/saveTopicBox.php',  //server script to process data
			type: 'POST',
			//datatype: 'json',
			//data: "json=" + jsn,
			data: "json=" + jsn + "&name=" + tit + "&user=" + gUsername + "&project=" + gProject,
			//Options to tell JQuery not to process data or worry about content-type
			
			success: function(res){
			  	// display success message: returns html list of titles entered
			 	alert("SUCCESS: " + res);
			  	// reset the button
     			w.innerHTML = "saved";
    			w.setAttribute("class","savedtopicbox");
			  
			},
			error: function(e){
			  var er = e;
			 alert("Error: " + e);
			}
     })	
}

//-- DISPLAY BOOKNOTES BY CLICKING ON TOPICBOX entry
function displayBookNotesFromTopicbox(bid){
	// when doubleclick on a note in a topicbox, display the notes from the book it's from
	displayBookNotes(bid);
	
}

//-- MINIMIZE TOGGLE OF BIBS IN TOPIC BOXES
function minimizeBibs(w){
	var div = w.parentNode.parentNode;
    var childs =  $(".topicboxbib","#topicsdiv");
    var txt = w.innerHTML;
    if (txt == " &lt; ") {
   		 $(childs).hide(500, function(){});
    	w.innerHTML =" &gt; ";
    }
    else {
    	$(childs).show(500, function(){});
    	w.innerHTML = " &lt; ";
    }
}

//-- MINIMIZE OR MAXIMIZE HEIGHT OF TOPIC BOX
function growOrShrinkTopicbox(w){
	var div = w.parentNode.parentNode;
	var txt = w.innerHTML;
    if (txt == " V ") {
   		// div.style.height = "400px";
   		$(div).animate({height:"400px"},400);

    	w.innerHTML =" ^ ";
    }
    else {
    	//div.style.height = "50px";
    	$(div).animate({height:"75px"},400);

    	w.innerHTML = " V ";
    }
}

// MINIMIZE OR MAXIMIZE HEIGHT OF ALL TOPIC BOXES
function growOrShrinkAllTopicboxes(){
	// get all topic boxes and grow or shrink them
	var buttonval = $("#topicboxshrinkbtn").val();
	if (buttonval == "Shrink all") {
		 elements = $('.topicdiv'); // get all the topic box divs
		  elements.each(function() {
   		   $(this).animate({height:"50px"},1000);
   		   // get the up or down V and change it
   		 
   		   //$(".minimizebtn this").html("^");
   		})
   		$("#topicboxshrinkbtn").val("Expand all");
   		 $("#topicsdiv").find(".minimizebtn").text("V");
		}
	else {
	elements = $('.topicdiv');
		  elements.each(function() {
   		   $(this).animate({height:"400px"},1000);
   		   $(".minimizebtn this").html("^");
   		})
	$("#topicboxshrinkbtn").val("Shrink all");
	 $("#topicsdiv").find(".minimizebtn").text("^");
	}

}

//-- DELETE TOPIC BOX
function deleteTopicBox(w){
	// get the title
	var titdiv = $('.topicboxh1text',w.parentNode);
	var 	tit = titdiv[0].innerHTML;
	
	// delete from database
	var resp='';
		$.ajax({
	  type: "POST",
	  url: "scripts/deleteTopicbox.php",
	  data:  "project=" + gProject + "&user=" + gUsername + "&title=" + tit ,
	  async: false,
	  success: function(listresult) {
		  resp=listresult;
	  },
	 error: function(e){alert('Error deleting topic box: ' + e);}
	})
	
	// delete from dom
	 // get the parent of the topicboxh1, which is topicdiv
	 var topicdiv = w.parentNode.parentNode;
	 topicdiv.parentNode.removeChild(topicdiv);
}

// Delete topic box entry by clicking on the x
//    passes the span, but we need the parent
function deleteTopicboxEntryFromX(w,nid){
  var par = w.parentNode;
  var parpar = par.parentNode;
  deleteTopicboxEntry(parpar,nid); // delete from database
  // delete from DOM
  parpar.parentNode.removeChild(parpar);

}

//-- DELETE TOPIC BOX ENTRY
function deleteTopicboxEntry(p,nid){
	// delete one entry
	//topobj = the topicbox as an object; nid = noteid
	
	// get the title
	var div = p.parentNode;
	var titdiv = div.firstChild;
	var titspan = titdiv.firstChild;
	tit = titspan.innerHTML;
	
	var resp='';
		$.ajax({
	  type: "POST",
	  url: "scripts/deleteTopicboxEntry.php",
	  data:  "project=" + gProject + "&user=" + gUsername + "&title=" + tit + "&noteid=" + nid,
	  async: false,
	  success: function(listresult) {
		  resp=listresult;
	  },
	 error: function(e){alert('Error reading gettopicboxes.php: ' + e);}
	})
	
}

//-- GET ALL TOPIC BOXES
function getAllTopicboxes(){
// get all topic boxes, probably on init
 	
 	// clear the div
 	$('.topicdiv','#topicsdiv').remove();
 
	var resp='';
		$.ajax({
	  type: "POST",
	  url: "scripts/gettopicboxes.php",
	  data:  "project=" + gProject + "&user=" + gUsername,
	  async: false,
	  success: function(listresult) {
		  resp=listresult;
	  },
	 error: function(e){alert('Error reading gettopicboxes.php: ' + e);}
	})
	
	var tarray = new Array();
	tarray = JSON.parse(resp);
	
	// exit if no boxes
	if (tarray.length == 0) { return }
	// go through array of json objects
	var i, j, nid, tit, jsn,div, note, noteid, bookid, bib;
	for (i=0; i < tarray.length; i++){
		// CREATE NEW topi box
		div = createNewTopicBox("");
		div.style.height="100%"; // size it
		//ADD TITLE
		tit = tarray[i]['title'];
		$(div).find('.topicboxh1text').html(tit);
	
		// FILL the box
		// Each element of tarray stands for one topic box, and
		// consists of a set of json objects (one per box entry) and then a key called "title"
		// Go through each of the objects, extract noteid, etc., and create a line in the current topic box
		for (var jsnn in tarray[i]) { 
			if (jsnn != "title"){ // if jsnn is the title, skip it here
				 jsn = JSON.parse(tarray[i][jsnn]);
				 //jsn = JSON.parse(jsnn);
				 var cont = unescape(jsn["content"]);
				 var bid = unescape(jsn["bookid"]);
				 var nid = unescape(jsn["noteid"]);
				 createTopicBoxEntry(div,cont,nid,bid);
			}
		}
	
	}

}

// -- CONFIRM UPLOADED FILES
function multiuploadConfirm(jsn){
	// show the uploaded file tiles, with checkmarks if not in database already
	// jsn is the json returned by multiuploadPart1.php
	

	var resp = jsn;
	// add lines to 
	var mudiv = document.getElementById("multiuploadconfirmdiv");
	// append warning
	var docspan = document.createElement("span");
	docspan.innerHTML = "<p class='uploadclass'><b>NOTE:</b>Items with <u>no</u> check are <u>already</u> in the database. If you check a box and upload the new notes file, it will overwrite the old file's notes and tags.</p>";
	mudiv.appendChild(docspan);

	
	// append form opening
	var frm = document.createElement("form");
	frm.setAttribute("id","confirmupload");
	frm.setAttribute("name","confirmupload");
	frm.setAttribute("enctype",("multipart/form-data"));
	frm.setAttribute("method","post");
	// append it
	mudiv.appendChild(frm);
	// create numbered list
	var ol = document.createElement("ol");
	frm.appendChild(ol);
	// hide some info in it
	var hid = document.createElement("input");
	hid.setAttribute("hidden","true");
	hid.setAttribute("name","project");
	hid.setAttribute("value",gProject);
	ol.appendChild(hid);
	hid = document.createElement("input");
	hid.setAttribute("hidden","true");
	hid.setAttribute("name","user");
	hid.setAttribute("value",gUsername);
	ol.appendChild(hid);
	
	// process the json
	 var barray = JSON.parse(resp);
	 // create one line per book
	 for (var i=0; i < barray.length; i++) {
	 	//var div = document.createElement("div")
	 	//div.setAttribute("class","uploadbookdivclass");
	 	// create list item
	 	var li = document.createElement("li");
	 	ol.appendChild(li);
	 	// create checkbox
	 	var chk = document.createElement("input");
	 	chk.setAttribute("type","checkbox");
	 	chk.setAttribute("name","fname[]");
	 	chk.setAttribute("class","uploadclass");
	 	chk.setAttribute("value",barray[i]["fpath"]);	
	 	if (barray[i]["bookid"] == -1) { // if no bookid, then it's a new book
	 		chk.setAttribute("checked","true");
	 	}
	 	li.appendChild(chk);
	 	// build span for text	 
	 	var sp = document.createElement("span");
	 	sp.setAttribute("class","uploadclass");
	 	sp.innerHTML = "<i>" + barray[i]["title"] + "</i> by " + barray[i]["author"];
	    li.appendChild(sp);
	    //chk.appendChild(div);
	 	}
	 
	
	// at bottom of whole thing, append an input button
	var newbt = document.createElement("input");
	newbt.setAttribute("value","Upload checked files");
	newbt.setAttribute("class","uploadclass");
	newbt.setAttribute("type","button");
	newbt.setAttribute("onclick","uploadConfirmedFiles()");
	mudiv.appendChild(newbt);
	
}

function uploadConfirmedFiles(){
   // upload the checked files into the database
   
		var fm = document.getElementById("confirmupload");
		var formData = new FormData(fm);
		 //alert(projname);	
		$.ajax({
			url: 'scripts/addToDB.php',  //server script to process data
			type: 'POST',
			data: formData,
			//Options to tell JQuery not to process data or worry about content-type
			cache: false,
			contentType: false,
			processData: false,
			success: function(res){
			  // display success message: returns html list of titles entered
			  var sp = document.createElement("p");
			  var mudiv = document.getElementById("multiuploadconfirmdiv");
			  sp.innerHTML = "<p class='uploadclass'>Items added to database: " + res +  "<p><input type='button' value = 'Done' onclick='finishUpload()'>";
			  mudiv.appendChild(sp);
			  $(mudiv).show(400,function(){});
			},
			error: function(e){
			  var er = e;
			  var sp = document.createElement("p");
			  sp.setAttribute("class","uploadclass");
			  var mudiv = document.getElementById("multiuploadconfirmdiv");
			  sp.innerHTML = e;
			  mudiv.appendChild(sp);
			}
     })	
   
}

function finishUpload(){
	 $("#multiuploadconfirmdiv").hide(500,function(){}); // animate it going away
	 $("#multiuploadconfirmdiv").html(""); // delete content
	 // refresh the booklist
	 retrieveBooks();
	 displayAllBooks();
	 
}

//------------------- AJAX 
var XMLHttpRequestObject = false; // the object that does ajax
// firefox only
XMLHttpRequestObject = new XMLHttpRequest();
var XMLHttpRequestObjects = new Array(); // create area of request objects

//---------------- SET COOKIE
function setCookie(cookieName,cookieValue) {
 var today = new Date();
 var expire = new Date();
 var nDays = 1700; // about 5 yrs
 expire.setTime(today.getTime() + 3600000*24*nDays);
 document.cookie = cookieName+"="+escape(cookieValue) + ";expires="+expire.toGMTString();
}

//---------------- GET COOKIE
function getCookie(c_name)
{
	 var i,x,y,ARRcookies=document.cookie.split(";");
	 for (i=0;i<ARRcookies.length;i++)
	 {
	   x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
	   y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
	   x=x.replace(/^\s+|\s+$/g,"");
	   if (x==c_name)
		 {
		 return unescape(y);
		 }
	   }
}

// ----HOW TO NAVIGATE A TABLE
function navigateTableDemo(w){
// get the table'
var mytable     = document.getElementById("testtable");; //mybody.getElementsByTagName("table")[0];
// get table body
var mytablebody = mytable.getElementsByTagName("tbody")[0];
// get all rows
var rowz = mytablebody.getElementsByTagName("tr");
var cel;
var cellz;
var currenttext;
var myp;
// go through rows
for (var i=0; i < rowz.length; i++) {
	cellz = rowz[i].getElementsByTagName("td");
	for (var j=0; j < cellz.length; j++) {
		cel = cellz[j];
		var myceltext=cel.firstChild; // 
		myp=myceltext.firstChild;
		// convertr to text
		currenttext = myp.data;
	}
}

}

function NavigateTableNotes() {
var mybody      = document.getElementsByTagName("body")[0];
var mytable     = document.getElementById("testtable");; //mybody.getElementsByTagName("table")[0];
var mytablebody = mytable.getElementsByTagName("tbody")[0];
var myrow       = mytablebody.getElementsByTagName("tr")[0];
var mycel       = myrow.getElementsByTagName("td")[0];


// first item element of the childNodes list of mycel
var myceltext=mycel.firstChild; // 
var myp=myceltext.firstChild;
// convertr to text
var currenttext = myp.data;
var currenttext=document.createTextNode(currenttext);
//var currenttext = myceltext.innerHTML;
mybody.appendChild(currenttext);

    }


//--------BUILD COMBO BOX OF USER'S PROJECTS
function buildProjectCombobox(){
   // query mysql to get a list of the user's available databases
   // thank you http://chiragrdarji.wordpress.com/2007/06/06/add-items-in-drop-down-list-or-list-box-using-javascript/
   
    // clear the list
    document.getElementById("projectselector").options.length = 0;
    
    var resp;
       // get set of databases
       $.ajax({
        type: "GET",
        url: "scripts/getallprojects.php",
		//data: "user=" + gUsername,
		data: {user : gUsername},
		async: false,
		success: function(dirresult){
            resp = dirresult;
           // alert("taglist in jquery ajax= " + expansionslist);
        },
        error: function(){
           // alert('Error reading blogdraft_expansions.txt');
        }
    })
       
       //alert(resp);
       
       // decode the json
       gProjectarray.length = 0; // this is a global
    	gProjectarray = JSON.parse(resp);
       
       // Create an Option object
       for (i=0;i< gProjectarray.length;i++){
       
        var opt = document.createElement("option");
        
        // Add an Option object to Drop Down/List Box
        var cb = document.getElementById("projectselector");
        cb.options.add(opt);
        // Assign text and value to Option object
        opt.text = gProjectarray[i]['name'];
        opt.value = gProjectarray[i]['name'];
      }
      
      
      // select the current one, if any
      if (gProject == "") {
         return
        }
        // else
		indicateSelectedProject(gProject);
		
}

//--------- SHOW SELECTED PROJECT IN CO<BO BOX
function indicateSelectedProject(which){
	 var ddl = document.getElementById("projectselector");;
     for (var i = 0; i < ddl.options.length; i++) {
         if (ddl.options[i].value == gProject) {
             if (ddl.selectedIndex != i) {
                 ddl.selectedIndex = i;
             }
             break;
         }
     }
     loadNewProject(which);
}

function loadNewProject(which){
 // alert("Testing project load: " + which);
  gProject = which; // set new global project
  // set cookie
  setCookie("project",which);
 
  retrieveBooks();
  buildTagCloud("PROJECT");
  displayAllBooks();
  //delete current contents
  document.getElementById("notestable").innerHTML="";

}

//------- SAVE ALL AS TEXT FILES
function saveAllAsText(){
		var foldername = prompt("Save all contents as text files into a folder on your drive? Folder name:");
		
		if (foldername ==""){
			return
		}
		
		// create the folder
		var resp='';
     $.ajax({
        type: "POST",
        url: "scripts/createfolder.php",
		data: "foldername=" + foldername,
		async: false,
		success: function(dirresult){
            resp = dirresult;
            //alert("Attrib in getSqlAttribute= " + resp);
        },
        error: function(){
            alert('Error in doesNoteExist function.');
        }
    })
	
	// get records from database and write them out
	// go through gbooks array
	var s;
	for (var i=0; i < gbooks.length; i++){
		gbook=gbooks[i];
		exportGbooksToText(i, "testSaveAsText");
	}

		
}

//--------- CREATE A NEW PROJECT
function createNewProject(){
	
	// get name from textarea
	//var newname = document.getElementById("databasetext").value;
	var newname = document.getElementById('projectnametxt').value;
	var desc = document.getElementById('projectdesctxt').value;
	
	var answer = confirm ("Create a new project? \n\nName: " + newname + "\nDescription: " + desc);
	if (!answer) {
		return;
	}
	
		var resp='';
     $.ajax({
        type: "POST",
        url: "scripts/createnewproject.php",
        data: {project : escape(newname), user : escape(gUsername), description : escape(desc)},
		//data: "project=" + escape(newname) + "&user=" + escape(gUsername) + "&description=" + escape(desc),
		async: false,
		success: function(dirresult){
            resp = dirresult;
            //alert("Attrib in getSqlAttribute= " + resp);
            if (resp.indexOf("+") == 0){
            	alert("You already created a project named " + newname + ". Try again."); 
            }
        },
        error: function(e){
            alert('Database error creating new project:' + e);
        }
    })
	
   // returns a number if ok, and blank if not
   resp = trimSpacesAndLfs(resp);
   if (resp.indexOf("+") == 0) {

	 return ;
   }
   else{
     // clear the displays
     $("#stackviewdiv").html("");
     $("#bookstable").html('');	
     buildProjectCombobox();
     // also should init
     loadNewProject(newname);
     // set mainselectlist pulldown to add notes
     document.getElementById("mainselectlist").value = "addnotes";
     
     }
return
	
}

//--------- MAKE EDITABLE
//http://www.quirksmode.org/dom/cms.html

function makeWholeDocumentEditable(){ // UNUSED
	var et = document.getElementById('editabletest');
	//et.sdditable='true'; 
	document.designMode='on'; 
}

function changeRating(o){
	
	// get current rating
	var currentrating = o.innerHTML;
	var clik=o.getAttribute("ondblclick");
	var id = o.getAttribute("id");
	//var cl = o.getAttribute("class");
	// put up choices
	var s="<p class='selectratingclass' id='" + id + "'>"; // "' ondblclik='" + clik + "'>";
	for (var i = 1; i <= 5; i++) {
		s = s + "<a  href=\"javascript:void(null)\" class='selectratingclass' onclick=\"insertRating(this,'" + i +"')\">" + i + "</a>";
	}

    o.parentNode.innerHTML = s;
	var tests = s;
}
function insertRating(o, rating){
	//var clik=o.getAttribute("dblclick");
	var id = o.getAttribute("id");
	var opar = o.parentNode;
	opar.innerHTML = "<p id='"+ id + "' class='noteratingclass' ondblclick='changeRating(this)'>" + rating + "</p>";
}

function insertPlainTextBiblio(bid){
	// where to paste the bibliography
	var texte=document.getElementById("biblioplaintext");
	// get entry in gbooks array from bookid
	var i = getIndexFromBookid(bid);
	// build biblio entry
	var s="";
	if ((i < 0) || (i==null)) {
		s = "Error: Bookid=" + bid;
	}
	else {
	 s = createBiblioEntry(i);
	 }
	 
	 // remove html ?
	if (document.getElementById("htmlentry").checked == false) {
		s = removeHTMLTags(s);
	}
	 	 
	// put biblio into text box
	texte.value = s;
}

function makeEditable(o){
	// If it's the + in a tags field, then o = the id of the tag element
	// otherwise o = the element
	// So find out which it is
	
	if (o.nodeName==null){ // If it's the plus sign, it's not a
		o = document.getElementById(o);
	}
	
	// get attributes the element
	gclass = o.getAttribute("class");
	var gid = o.getAttribute("id");
	var noteid = o.getAttribute("noteid");
	
	// Put biblio info into copyable field
	// get row number
	var p = gid.indexOf("content"); // strip content from gid
	var rownumber = gid.substr(0, p);
	rownumber = rownumber.substr(10,rownumber.length); // strip notespanid
	var bid = getBookidFromNoteRowNumber(rownumber);
	insertPlainTextBiblio(bid); // display the plain text biblio

	// get its class
	var clss = o.getAttribute("class");
	if (!document.getElementById || !document.createElement) return;
	//if (!e) var obj = window.event.srcElement; // for IE. haha.
	//else var obj = e.target;
	var obj = o;

	while (obj.nodeType != 1) {
		obj = obj.parentNode;
	}
	if (obj.tagName == 'TEXTAREA' || obj.tagName == 'A') return;
	while (obj.nodeName != 'P' && obj.nodeName != 'HTML') {
		obj = obj.parentNode;
	}
	
	if (obj.nodeName == 'HTML') return;
	var x = obj.innerHTML;
	gprevcontent = x; // save content ina  global
	var y = document.createElement('TEXTAREA');
	// apply class
	if (clss !=""){
		y.setAttribute("class",gclass+"editing");
		y.setAttribute("onblur",  "saveEdit(this)")
		y.setAttribute('editable','YES');
		y.setAttribute("noteid", noteid);
		y.setAttribute('id',gid);
	}

	var z = obj.parentNode;
	z.insertBefore(y,obj);
	// z.insertBefore(butt,obj);
	z.removeChild(obj);
	y.value = x;
	y.focus();
	editing = true;
}


function saveEdit(w) {
	// used to just mark with a red dot
	// now does the save
	//var w = this;
	var txtarea = w; 
	// get noteid
	var noteid = w.getAttribute("noteid");
	// get content
	var content = w.value;
	updateNote(noteid, content, "");
	
	var y = document.createElement('P');
	var z = txtarea.parentNode;

	y.innerHTML = txtarea.value;
	y.setAttribute('class',gclass); 
	y.setAttribute('id',gid); 
	y.setAttribute("ondblclick", "makeEditable(this)");
		gid=""; // init the globals
		gclass="";
	z.insertBefore(y,txtarea);
	z.removeChild(txtarea);
	//z.removeChild(document.getElementsByTagName('button')[0]);
	editing = false;
}


// --------- PARSE RIS FILE from zotero

function parseRisDoc(filename){
// parses a RIS file output by zotero
	
	// get hardwired RIS file
	
	var resp='';
	$.ajax({
  type: "POST",
  url: filename,
  async: false,
  success: function(listresult) {
 	  resp=listresult;
  },
 error: function(){alert('Error reading pwd.dat');}
})

  //alert(resp);
  
  
  // turn it into an array
    var i,l, x,p, p2, pagenumber, tags, note, skipit, noteid, bid;
	//alert("test");
  var s = new Array();
  s = resp.split("\n");
  var postfix="";
  var prefix="";
  var prevprefix="";
  var fieldname="",bookexists;
  var fielddata="";
  var firsttime = true;
  var ctr=0;
  var risctr=document.getElementById('riscounter');
  var temps=""; // debugging string
  // init temp book object
  gbook.title="";
  
  // walk through the RIS file line by line
  for (i=0; i <= s.length; i++){
  	l = s[i]; // get a line
	//alert(l);
	l = trimSpacesAndLfs(l);
	p = l.indexOf("  - "); // 2 spaces and a dash indicate label
	if (p == 2) { // got a label
	    prevprefix=prefix; // preserve the old one
	    prefix = l.substring(0,2);
		// ----------New record indicator -----------
		if (prefix=="TY") { 
		  // update ctr		  
		  ctr=ctr+1;
		
		  risctr.innerHTML=ctr + " of " + filename;
		
		  	// update the bibliography
				  // This is the beginning of a new record, so write the previous biblio to the database
				
				  if (gbook.title != "") {
				  	  
				  	// is it a new book? Returns blank if it does not, or bookid if it does
							bookexists = doesBookExist(gbook.title, gbook.author);
							bid = ""; // initialize it
							//if (bookexists !=""){   temps = temps + "\r\n" + gbook.title; } // debug
							if (bookexists == "") { // only if book doesn't exist
								bid = addNewBook(1); // 1 = use bilbioinfo array
								if (bid != "") { // if we got a bookid, clean it up
									bid = trimSpacesAndLfs(bid);
								}
								// bid = getSqlAttribute("books","bookid","title", gbook.title);
								// alert("New book: " + biblioinfo[gauthor]);
								
								// now update the notes for this book
								for (x = 0; x < notearray.length; x++) {
									//pg = extractPageFromNote(notearray[x]);
									pg = extractPageNumber(notearray[x]);
									addNote(bid, "", notearray[x], pg, "");
								}
							} // if book doesn't exist
						}
           // initialize arrays
		   gbook.title=""; // start new bibliographic record
		   gbook.type = getPostFix(l);  // record the type of doc
		   // initialize note array
		   notearray.length=0; 
		  } 
		  //-------------- END NEW RECORD
		
	
		}
		// if not new record, what type of field is it?
		    postfix=getPostFix(l);
			switch (prefix){
				case 'A1': 
				  gbook.author = postfix;
				  break;
				case 'PB':  
				  gbook.pub = postfix;
				  break;
				case 'T1': 
				  gbook.title = postfix;
				  break;
				case 'PY': 
				  gbook.date = postfix;
				  break;
				case 'UR': 
				  gbook.url = postfix;
				  break;
				case "N1":
				  // add to note array
				  if (postfix.length > 0) {
				  	notearray[notearray.length] = postfix;
				  // note: add an element just be referencing it. Length is not zero based
						}
				  break;
				default: // no prefix
				  if ((prevprefix=="N1") && (prefix="")){
				  		  if (postfix.length > 0) {
						  	notearray[notearray.length] = postfix;
						  }
				  }
			} // end switch
	}
	
   // note that it's done
   risctr.innerHTML= risctr.innerHTML + " ++ Done.";	
  //alert(temps);
  
  return;

	
	
  }
  
 // --- EXTRACT PAGE NUMBER FROM NOTE
 function extractPageFromNote(s){
 	var pg="";
	// look for -
	var p = s.lastIndexOf("-");
	if (p > 5) {
		// ignore --
		if (s.lastIndexOf("--") != (p -1)) {
			// extract everything after the -
			pg = s.substring(p+1, s.length);
			pg = trimSpacesAndLfs(pg);
		}	
	}
	
	return pg;	
 }

// --------- GET POSTFIX
function getPostFix(s){
	var i=-1;
	var news="";
	i = s.indexOf("  -");
	if (i > -1) {
		news = s.substring(i + 4, s.length);
		news = trimSpacesAndLfs(news);
	}
	else {
		news = trimSpacesAndLfs(s);
	}
	
return news;
}  

// ---------- DOES BOOK EXIST?
function doesBookExist(title,author){
	
	   var resp = "failure";
  var query="author=" + author + "&title=" + title  + "&gdatabase=" + gdatabase;
      query = prepForParameter(query);
     $.ajax({
        type: "POST",
        url: "scripts/doesbookexist.php",
		data: query,
		async: false,
		success: function(dirresult){
            resp = dirresult;
            //alert("Attrib in getSqlAttribute= " + resp);
        },
        error: function(){
            alert('Error in getSqlAttribute function.');
        }
    })
   
    //alert(resp);
	return resp;
	
	// resp="" if match not found. Else gives bookid as string
	
}  

// ---------- DOES NOTE EXIST?
function testNoteExists(){
	
	   var resp = "failure";
 var cont = '"Codemaking goes back to the dawn of Western civilization." 480bc greeks, salamis';
     $.ajax({
        type: "POST",
        url: "scripts/doesnoteexist.php",
		data: {content : cont},
		async: false,
		success: function(dirresult){
            resp = dirresult;
            //alert("Attrib in getSqlAttribute= " + resp);
        },
        error: function(){
            alert('Error in doesNoteExist function.');
        }
    })
   
	return resp;
}  

function doesNoteExist(bookid,notecontent){
	
	   var resp = "failure";
  var query="bookid=" + bookid + "&content=" + notecontent + "&gdatabase=" + gdatabase;
 
     $.ajax({
        type: "POST",
        url: "scripts/doesnoteexist.php",
		data: query,
		async: false,
		success: function(dirresult){
            resp = dirresult;
            //alert("Attrib in getSqlAttribute= " + resp);
        },
        error: function(){
            alert('Error in doesNoteExist function.');
        }
    })
    
    //alert(resp);
	return resp;
	
	// resp="" if match not found. Else gives bookid as string
	
}  

//---------- PARSE TAGS
function parseTags(tags){
	// parses and puts into global
	// init the glbal array
	tagarray.length= 0;
	tags = trimSpacesAndLfs(tags);
	taggarray = tags.split(",");
	
}
  
 // ------- BUILD TAG CLOUD
 function buildTagCloud(whichtype){
 	// get all tags
 	
 	var project = ""
 	if (whichtype == "PROJECT") {
 	   var project = gProject;
 	 }
	var resp='';
		$.ajax({
	  type: "POST",
	  url: "scripts/getalltags.php",
	  data: {project : gProject, user : gUsername},
	 // data:  "project=" + project + "&user=" + gUsername,
	  async: false,
	  success: function(listresult) {
		  resp=listresult;
	  },
	 error: function(){alert('Error reading tags.php');}
	})
	
	var tagstr = new Array();
	tagstr = JSON.parse(resp);
	
	// exit if no tags
	if (tagstr.length == 0) { return }
	
	// create new associate array of tags with all the data + count
	// create new array by slice, because just "=" makes ref copy that changes when copy changes
	var tagarray = tagstr.slice(0); // get the fields from tagstr
	tagarray.length=0;  // init the new array
	// cycle through original, which is alphabetized by the php	
	// look for matches
	var thistag="", currenttag="", i, j, match, ctr=-1;
	//var tagrow = new Array();
	for (i=0 ; i < tagstr.length; i++){
	   thistag = tagstr[i]["tag"];
	   // if it's a new tag, then make a new entry in our new array
	   if (thistag != currenttag){
	   		ctr++;
	   		var tagrow = new Array();
	   		tagrow["tag"] = thistag;
	   		tagrow["times"] = 1;
	   		tagrow["bookid"] = tagstr[i]["bookid"];
	   		tagrow["noteid"] = tagstr[i]["noteid"];
	   		tagarray.push(tagrow);
	   		currenttag = thistag;   		
	   }
	   else { // same old tag
	   	tagarray[ctr]["times"] = tagarray[ctr]["times"] + 1;
	   }
	   
	}

	// tagarray now has one entry per tag, with a count for each
    
    
    // get the largest and the smallest
	var largest = -1;
    var smallest = 100000;
    var i = 0;
    var used = -1;
    for (i = 0; i < tagarray.length; i++) {
        used = tagarray[i]["times"];
		
        if (used > largest){
            largest = used
        };
        if (used < smallest) {
            smallest = used
        };
    }
    
    // calculate font size
	
	
	var quote2='"';

    var fontsize = 0;
	//largest and smallest are set in global prefs
    var fontspread = largestfont - smallestfont; // range of uses to cover
    var p;
    var fontsizetxt = "";
    var tmp = "";
    var tagfonts = new Array(); // array for font sizes
    for (i = 0; i < tagarray.length; i++) {
        used = tagarray[i]["times"];
		// calculate what percentage of the fontspread it should take, and add minimum font size
        // THJIS ONE WORKS but bad curve fontsize = ((used / largest) * (fontspread)) + smallestfont;
        fontsize = (Math.log(used)*3) + smallestfont;
		fontsize = Math.round(fontsize);
        tagarray[i]["fontsize"] = fontsize;
    }

    // display tagcloud
    var s = "";
    var tagsize = -1;
    var tagname = "";
    var tagused = -1;
    var tagtemp = "";
    for (i = 0; i < tagarray.length; i++) {
        if (tagarray[i]["times"] >= tagThreshhold) {
            s = s + "<font color='brown'>| </font>" + "<span id='" + tagarray[i]["tag"] + "' class='tagcloudstyle' title='Times used: " + tagarray[i]["times"] + "' onclick='displayTagsNotes(" + quote2 + tagarray[i]["tag"] + quote2 + ")'><span  class='tagclass' style='font-size:" + tagarray[i]["fontsize"] + "pt'>" + tagarray[i]["tag"] + " </span></span> ";
           // s = s + "<font color='white'>| </font>" + "<span id='" + tagnames[i] + "' class='tagcloudstyle' title='Times used: " + tagfonts[i] + "' onclick='tagclick(" + quote2 + tagnames[i] + quote2 + ")'><font style='font-size:" + tagfonts[i] + "pt'>" + tagnames[i] + " </font></span> ";
            
			// s=s+tagname;
        }
        
        //alert(s);
    }
	
	// display tag cloud
	var clouddiv = document.getElementById("tagclouddiv");
	clouddiv.innerHTML = s;
	clouddiv.style.display="block";
	

	
 }
 
 //---------- MULTI TAG SEARCH
 function multiTagSearch(){
 	// get tagstring
	var tagstring = document.getElementById('tagsearchtext').value;
	//tagstring="physics,substance";
	var originaltagstring = tagstring;
	var done=false;
	var phrase="";
	var tempstr = tagstring; // temporary copy

   
   var conj=$("input[name=andor]:checked").val();
      
   
 var resp='';
	$.ajax({
  type: "POST",
  data: "tagstring=" + originaltagstring + "&project=" + gProject + "&user=" + gUsername + "&conj=" + conj,
  url: "scripts/getnotesformultitags.php",
  async: false,
  success: function(listresult) {
 	  resp=listresult;
  },
 error: function(){alert('Error reading getnotesfrommultitags.php');}
})

var barray = JSON.parse(resp);

//alert(resp);
 buildNotesTableOutOfSqlResults(barray);
 insertNotesTableHeader("<span class='metatitle'>Tag Search:</span> " + tagstring);
 } 
 
//---------- TEXT SEARCH
 function textSearch(){
 	// get term string
	var querystring = document.getElementById('textsearchtext').value;
	if (querystring == "") {
		alert("Insert some search terms, smartypants.");
		return;
	}
	if (querystring.length < 3) {
		alert("Words need to be at least 3 letters long to be searchable.");
		return;
	}
	// lowercase it
	var newquerystring = querystring.toLowerCase();
	
	// get the conjunction
	var conj=$("input[name=andor]:checked").val();

	 var resp='';
	$.ajax({
		  type: "post",
		  data: "querystring=" + newquerystring + "&project=" + gProject + "&user=" + gUsername + "&conj=" + conj,
		  url: "scripts/searchfortext.php",
		  async: false,
		  success: function(listresult) {
			  resp=listresult;
		  },
 		  error: function(){alert('Error reading searchfortext.php');}
		 })

	var barray = JSON.parse(resp);

 buildNotesTableOutOfSqlResults(barray);
 insertNotesTableHeader("<span class='metatitle'>Text Search:</span> " + querystring);
	
	return; 
	

 } 
 
//---------- DISPLAY ALL THE NOTES FOR A TAG
function displayTagsNotes(whichtag){

	if (whichtag == "") {
		alert("No tag specified in displayTagsNotes");
		return -1;
	}
	if (whichtag == "[tag]") {
		return -1;
	}
	
	
	// get all tags
	var resp = '';
	$.ajax({
		type: "POST",
		//data: "tag=" + whichtag + "&project=" + gProject + "&user=" + gUsername,
		data: {tag : whichtag, project : gProject, user : gUsername},
		url: "scripts/getnotesfortag.php",
		async: false,
		success: function(listresult){
			resp = listresult;
		},
		error: function(){
			alert('Error reading displaytagsnotes.php');
		}
	})
	
	
	var notearray = JSON.parse(resp);
   
	var tab = document.getElementById("notestable");

	if (tab != null) {
	  tab.innerHTML="";
	}
	
	 for (i=0; i < notearray.length; i++){
		noterow = notearray[i];
		noterow.content = trimSpacesAndLfs(noterow.content);
		if (noterow != "") {  // if there's content to the note
			// build noteline if the content isn't blank or "undefined"
			if ((noterow.content != "") ) {
					noteline = buildNoteLine(i,noterow.content,noterow.rating,noterow.page,noterow.tagstring,noterow.bookid,noterow.noteid,noterow.title);
			}	
		}
 	}
 	 if ($(tab).is(":visible") != true){ // make it visible
		$(tab).show(500); 
	}
 
 // the button
  addSaveAndDeleteNotesTableButtons();
  

  
  //insert the header
  insertNotesTableHeader("<span class='metatitle'>Notes for tag:</span> " + whichtag);
    // invoke sortable
   $("#noteslisttable").tablesorter( {cancelSelection:true}); 
}
	
//----------NOTES TABLE OUT OF SQL RESULTS
function buildNotesTableOutOfSqlResults(barray){
// delete the old one
deleteNotesListTable();


//"<p>NOTES for TAG=<span class='tagintitle'>" + whichtag + "</span></p><p><form id='notedisplayform' name='notedisplayform'>";
  

// Cycle through noterows, building note rows
// $noteid . "|" . $content . "|" .  $page . "|" . $tagstring . $Bookid . "<BR />";

var noterow = new Array();
var noteline="";
var s="<table id='noteslisttable' class='tablesorter'>";
var i;
for (i=0; i < barray.length; i++){
	noterow = barray[i];
	if ((noterow["content"] != "") && (noterow["content"] != "undefined") && (noterow["noteid"] != "")) {
		var title = getTitleFromBookid(noterow["bookid"]);
		var rating = ""; // no op for now
	   noteline = buildNoteLine(i,noterow["content"],rating, noterow["page"], noterow["tag"],noterow["bookid"], noterow["noteid"], title);
	  // s = s + noteline;
	}
}

  // Add buttons to save or remove list
  $("#noteslisttable").tablesorter(); 
  
  addSaveAndDeleteNotesTableButtons();
  return;

}

//------------- ADD BLANK NOTES ROW
function addBlankNotesRow(){
	
	  addNoteLine();
  
}
 
 //---------- ADD BIBLIO TO ARRAY
 function addBiblioToArray(fieldname, fielddata){
 	switch (fieldname){
				case 'AUTHOR': 
				gbook.author = fielddata;
				break;
				case 'PUB':  
				gbook.pub = fielddata;
				break;
				case 'PUBLISHER':  
				gbook.pub = fielddata;
				break;
				case 'TITLE': 
				gbook.title = fielddata;
				break;
				case 'CITY': 
				gbook.city = fielddata;
				break;
				case 'DATE': 
				gbook.date = fielddata;
				break;
				case 'MISC': 
				gbook.misc = fielddata;
				break;
				case 'DATE': 
				gbook.date = fielddata;
				break;
				case 'VOL': 
				gbook.vol = fielddata;
				break;
				case 'ISSUE': 
				gbook.issue = fielddata;
				break;
				case 'TRANSLATOR': 
				gbook.translator = fielddata;
				break;
				case 'JOURNAL': 
				gbook.journal = fielddata;
				break;
				case 'URL':  
				gbook.url = fielddata;
				break;
				case 'TYPE':  
				gbook.type = fielddata;
				break;
				case 'PAGES':  
				gbook.pages = fielddata;
				break;
				case 'TAGS':
				gbook.tags = fielddata;
				break;
		}
 }
 
function addSaveAndDeleteNotesTableButtons(){
	 // Add buttons to save or remove list
	 $('#notestablebtns').show();
	 return
 	var div = document.getElementById("notestable"); // get the div
 if (div == null) {return}
   var lastelement = div.lastChild; // get the last element of the div
   if (lastelement == null) {return}
   //var tblparent = tbl.parentNode;
   var newp = document.createElement("p"); // create a p
   //tblparent.appendChild(newp);
   var lastelementpar = lastelement.parentNode;
   if (lastelementpar == null) {return}
   lastelementpar.appendChild(newp); // append the p
   newp.setAttribute("id", "notestablebuttonp");
   p = document.getElementById("notestablebuttonp");
   p.innerHTML = ih;
} 

//------- ADD SELECTED NOTES TO NOTEPAD DIV
function addToScratchpad(){

	// display the scratchpad
	var scratchpaddiv= document.getElementById("scratchpaddiv");
	scratchpaddiv.style.display="block";
	// get the span for the text
	var scratchpade= document.getElementById("scratchpadspan");
	
	// walk through looking for selected elements
	var fset = document.getElementById("notestable"); // get the notes div
	//var inputs = fset.getElementsByTagName("input");
	var inputs = fset.getElementsByClassName("notespandidcheckclass")
	for (var i = 0; i<inputs.length; i++)
	if ( inputs.item(i).checked==true){
		var contentid = "notespanid" + i + "content"; // get content id
		var contentel = document.getElementById(contentid); // get the content element
		if (contentel != null) {
			var noteid = contentel.getAttribute("noteid"); // get nodeid number
			var bookid = contentel.getAttribute("bookid"); // get bookid number
			var content = contentel.firstChild.nodeValue;  // get the content
						
			// check to see if there's already a p with this noteid in the scratch pad
			var scratchid = "scratch" + noteid;
			var noteexists = document.getElementById(scratchid);
			if ((noteexists !=null) && (noteexists != 'undefined')) {
				return;
			}
			// create new element for the scratchpad
			var scratchp = document.createElement("p");
			scratchp.setAttribute("class","scratchpadclass");
			scratchp.setAttribute("noteid",noteid);
			scratchp.setAttribute("id",scratchid);
			scratchp.innerHTML = content;	// create content
			
			// add bibliographic info as a span
			// create bibliographic info for the footnote
			var bid = getBookByID(bookid); // get number of book in gbooks array
			var biblioinfo = createBiblioEntry(bid);
			biblioinfo = biblioinfo.substr(3,biblioinfo.length); // remove <p>
			
			// add page number 
			var pndiv = document.getElementById("notespanid" + i + "page"); // gets td with p in it
			if (pndiv != null) {
				var p = pndiv.firstChild;
				if (p !=null){
					var pn = p.innerHTML;
				}
				if ((pn != "") && (pn !=null)) { biblioinfo = biblioinfo + ", p." + pn;}
			}
			
			
			// create bib span
			var bibspan = document.createElement("span");
			bibspan.setAttribute("class","scratchpadfootnoteclass");
			bibspan.innerHTML = biblioinfo;
			scratchp.appendChild(bibspan); // append the bibspan to the note
			
			// get scratchpad div
			var scratchdiv = document.getElementById("scratchpadspan");
			// append new
			scratchdiv.appendChild(scratchp);
		}
	
	} // if checked
	
}

function addToPlaylist(){
// display the playlists
	var scratchpaddiv= document.getElementById("scratchpaddiv");
	scratchpaddiv.style.display="block";
	// get the span for the text
	var scratchpade= document.getElementById("scratchpadspan");
	
	// walk through looking for selected elements
	var fset = document.getElementById("notestable"); // get the notes div
	//var inputs = fset.getElementsByTagName("input");
	var inputs = fset.getElementsByClassName("notespandidcheckclass")
	for (var i = 0; i<inputs.length; i++)
	if ( inputs.item(i).checked==true){
}
}

// --------- SAVE NOTEPAD
function saveScratchpad(){
  // saves scratchpad content as a new web page

      
      var notediv = document.getElementById("scratchpadspan");
      var notecontent = notediv.innerHTML; // get the actual note content
      
      var rtfcontent = convertToRtf(notecontent);
      
      return
      
      var content = '<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">';
      content = "\n<html>\n<head><title>" + "Notio scratchpad: " + gProject + "</title>";
      content = content + '\n<link type="text/css" rel="stylesheet" href="notio.css">\n</head>';
      content = content + "\n<body>\n<h2>Scratchpad for: " + gProject + "</h2>" + notecontent + "</body></html>";
    
    
    
        $('#savescratchbtn').click(function(e){

        $.generateFile({

            filename    : 'Noter.ioScratchPadNotes.txt',
            content     : content,
            script      : 'scripts/download.php'
        });
 
        e.preventDefault();
    });
    return

}

function convertToRtf(h){
  // convert html to rtf
  		
	// do the header
	var b = "{\\rtf1\\ansi\\deff0\r";

	
	b = b + "{\\pard\\b Noterio Scratchpad for Project: " + gProject + "\\b\\par}";
	
	// get array of notes and foonotes
	var  scratchdiv = document.getElementById("scratchpaddiv");
	var allnotes = scratchdiv.getElementsByClassName("scratchpadclass");
	var allbibs = scratchdiv.getElementsByClassName("scratchpadfootnoteclass");

	
	// go through the lines, nesting 
	var txt = "";
	var textel;
	
	for (i = 0; i < allnotes.length; i++) {

	
			b = b + "\r{\\pard \\li" + allnotes[i].firstChild.innerHTML + "\\par}";
			b = b + "\r{\\pard \\li" + allbibs[i].innerHTML + "\\par}";			
		
	}	
	
	b = b + "\r}";
	  

        $.generateFile({

            filename    : 'Noterio_ScratchPad_Notes.rtf',
            content     : b,
            script      : 'download.php'
        });
 
   
    return
}

//--------- STRIP MARKUP
function removeHTMLTags(con){
 		var strInputCode = con;
 		var strTagStrippedText = strInputCode.replace(/<\/?[^>]+(>|$)/g, "");
 		return strTagStrippedText;	
}


//-------- CLEAR scratchpad
function clearScratchpadSpan(){
	var np=document.getElementById("scratchpadspan");
	np.innerHTML="";
	np.setAttribute("class", "scratchpadspanclass");
	np.setAttribute("id", "scratchpadspan");
	
}

//------- GET NOTEID FROM NOTEROW
function getNotespanidFromNoteRow(i){
	// i == number of row in note table
	var noteid=-1;
	var noteidid="notespanid" + i + "noteid";
	if ((noteidid !="") && (noteidid !=null)){
			   var notespan = document.getElementById(noteidid); // get the notestpan element
			   noteid = notespan.innerHTML;
			   noteid = noteid.substr(noteid.indexOf("n:") + 2,noteid.length - noteid.indexOf("</p>"));	
			   }
			   
			   return noteid;
}

//------ REVEAL FORM TO ADD A NOTE MANUALLY
function revealAddNoteManually(){
	ShowHideDiv('addnewnotediv');
	//var e = document.getElementById('addnewnotediv');
	//e.style.display="block";
}

//--------- ADD NOTE MANUALLY FROM FORM
function addNewNoteManually(){
	
	var bid = document.getElementById("bbid").value;
	var con = document.getElementById("newnotecontent").value;
	var tags= document.getElementById("newnotetags").value;
	var pages = document.getElementById("newnotepages").value;
	if (con=="") {
		alert("No content entered. Not saving.");
		return
	}
	// get number of rows in table
	var tablediv = document.getElementById("noteslisttable");
	var oRows = tablediv.getElementsByTagName('tr');
    var RowCount = oRows.length;

	
	
	buildNoteLine(RowCount,con,"",pages,tags,bid,"","");
	
	
	
	// update the database
	
	// hide the ui
	ShowHideDiv("addnewnotediv");
	
}

//------- CREATE A SINGLE BIBLIOGRAPHIC ENTRY

function createBiblioEntry(i){
	// i = entry in gbooks arrauy
	var auth,tit,pub,dat,vol,city,trans,url,journal;
	auth = gbooks[i].author;
	if (auth==null) {auth="";}
	tit = gbooks[i].title;
	if (tit==null) {tit="";}
	pub = gbooks[i].pub;
	if (pub==null) {pub="";}
	dat = gbooks[i].date;
	if (dat==null) {dat="";}
	vol = gbooks[i].volume;
	if (vol==null) {vol="";}
	city = gbooks[i].city;
	if (city==null) {city="";}
	trans = gbooks[i].translator;
	if (trans==null) {trans="";}
	url = gbooks[i].url;
	if (url==null) {url="";}
	journal = gbooks[i].journal;
	if (journal==null) {journal="";}
	var s = "<p class='bibp'>";
	if (auth !="") { s = s + auth;}
	if (tit !="") { s = s + ", " + tit;}
	if (trans !="") { s = s + ", " + trans + ", trans.";}
	if (pub !="") { s = s + ", " + pub;}
	if (city !="") { s = s + ", " + city + ": ";}
	if (dat !="") { s = s + " " + dat;}
	if (journal !="") { s = s + ", " + journal;}
	if (vol !="") { s = s + ", " + vol;}
	if (url !="") { s = s + ", " + url;}
	s = s + "</p>";	
		return s;
}

//------ CREATE BIBLIOGRAPHY OF ALL BOOKS
function createBiblio(){
	var i,s;
	retrieveBooks(); /// get the latest list of books
	var d = document.getElementById("bibdisplaydiv");
	d.innerHTML="";
	// walk through book array
	//Book(title, bookid, author,pub,city,date,translator,issue, vol, article,url,type,misc,numberofnotes)
	for (i=0; i < gbooks.length; i++){
		// build a line
	    s = createBiblioEntry(i);
		d.innerHTML= d.innerHTML +  s;
	}
	$("#bibliodisplaydiv").show(250);
	
}


//------ EXPORT TO TEXT
function exportBookInBiblioDisplayToText(foldername){
	// writes book in current contents of biblio to text file 
	// walks through notes table and writes to text
	if (foldername==""){
		foldername="notio_backup_textfiles";
	}
	
		var s = "#Autogenerated on " + Date();
		s = s + "\n:: BIBLIO";
		s = s + "\nTITLE=" + document.getElementById("btitle").value;
		s = s + "\nAUTHOR=" + document.getElementById("bauthor").value;
		s = s + "\nDATE=" + document.getElementById("bdate").value;
		s = s + "\nPUB=" + document.getElementById("bpublisher").value;
		s = s + "\nCITY=" + document.getElementById("bcity").value;
		s = s + "\nJOURNAL=" + document.getElementById("bjournal").value;
		s = s + "\nVOL=" + document.getElementById("bvol").value;
		s = s + "\nISSUE=" + document.getElementById("bissue").value;
		s = s + "\nTAGS=" + document.getElementById("btags").value;
		s = s + "\nTYPE=" + document.getElementById("btype").value;
		s = s + "\nURL=" + document.getElementById("burl").value;
		s = s + "\n\n:: NOTES\n";
		
	
	 var mytable     = document.getElementById("noteslisttable");
   // get table body
	// var mytablebody = mytable.getElementsByTagName("tbody")[0];
	var mytablebody = document.getElementById("notestablebody1");	// get all rows
	var rowz = mytablebody.getElementsByTagName("tr");
	var cel;
	var cellz;
	var currenttext;
	var myceltext;
	var myp;
	var content;
	var noteid, rating;
	var pagenumber;
	var tags,id,p, tagss;

	// go through rows
	// ROW=new-button-content-pg-tags-title-bookid-noteid
	for (var j = 0; j < rowz.length; j++) {
		// get spanid from <tr>
		spanid = rowz[j].getAttribute("id");
		cellz = rowz[j].getElementsByTagName("td");
		if (cellz[0].style.display != "none") { // skip if hidden
			//for (var j = 0; j < cellz.length; j++) {
			noteid = "";
			content = "";
			pagenumber = "";
			tags = "";
			cel = document.getElementById("notespanid" + j + "content");
			content = cel.innerHTML;
			cel = document.getElementById("notespanid" + j + "page");
			var cel2 = cel.firstChild;
			pagenumber = cel2.innerHTML;
			cel = document.getElementById("notespanid" + j + "tags");
			var tagcells = cel.getElementsByTagName("SPAN");
			var tagstring = "";
			for (var x = 0; x < tagcells.length; x++) {
				cel = tagcells[x];
				tagstring = tagstring + cel.innerHTML;
				if ((x != tagcells.length - 1) && (tagstring !="")  && (tags != "[tag]")) {
					tags = tags + ","
				}
			}
			s = s + "\n" + pagenumber + "/ " + content + " >> " + tags + "\n";
		//} // if display isn't null		
		} // end of collection of rows
	//alert(s);
	}
	
	// write it
	
	var resp = "failure";
	// prep title of book as title of text file, but without the .txt
    var tit = document.getElementById("btitle").value;
	if (tit == null) {tit = "TEMP TITLE;"}
	tit = prepForParameter(tit);
		
     $.ajax({
        type: "POST",
        url: "scripts/writeexportedfile.php",
		data:  "filename=" + tit + "&content=" + s + "&foldername=" + foldername,
		async: false,
		success: function(dirresult){
            resp = dirresult;
        },
        error: function(){
			resp= "Failed writing export file";
        }
    })
	alert(resp);
	
}

//------- EXPORT TO TEXT FILE FROM GBOOKS ARRAY
function exportGbooksToText(which, foldername){
     //NOTE: READ THIS FOR EXPORT TO TEXT http://tutorialzine.com/2011/05/generating-files-javascript-php/#comment-41489
    // writes book from gBooks array to text file
	
	if (foldername==""){
		foldername="notio_backup_textfiles";
	}

	
		var s ="";
		var ss="";
		
		s = s + "\n:: BIBLIO";
		if (gbooks[which].title =="undefined") {gbooks[which].title="";}
		s = s + "\nTITLE=" + gbooks[which].title;
		if (gbooks[which].author =="undefined") {gbooks[which].author="";}
		s = s + "\nAUTHOR=" + gbooks[which].author;
		if (gbooks[which].date =="undefined") {gbooks[which].date="";}
		s = s + "\nDATE=" + gbooks[which].date;
		if (gbooks[which].publisher =="undefined") {gbooks[which].publisher="";}
		s = s + "\nPUB=" + gbooks[which].publisher;
		if (gbooks[which].city =="undefined") {gbooks[which].city="";}
		s = s + "\nCITY=" + gbooks[which].city;
		if (gbooks[which].journal =="undefined") {gbooks[which].journal="";}
		s = s + "\nJOURNAL=" + gbooks[which].journal;
		if (gbooks[which].volume =="undefined") {gbooks[which].volume="";}
		s = s + "\nVOL=" + gbooks[which].volume;
		if (gbooks[which].issue =="undefined") {gbooks[which].issue="";}
		s = s + "\nISSUE=" + gbooks[which].issue;
		if (gbooks[which].tags =="undefined") {gbooks[which].tags="";}
		s = s + "\nTAGS=" + gbooks[which].tags;
		if (gbooks[which].type =="undefined") {gbooks[which].type="";}
		s = s + "\nTYPE=" + gbooks[which].type;
		if (gbooks[which].url =="undefined") {gbooks[which].url="";}
		s = s + "\nURL=" + gbooks[which].url;
		if (gbooks[which].misc =="undefined") {gbooks[which].misc="";}
		s = s + "\nMISC=" + gbooks[which].c;
		if (gbooks[which].pages =="undefined") {gbooks[which].pages="";}
		s = s + "\nPAGES=" + gbooks[which].pages;
		if (gbooks[which].bookid =="undefined") {gbooks[which].bookid="";}
		s = s + "\nBOOKID=" + gbooks[which].c;
		
		s = s +  "\n#Autogenerated on " + Date();
		s = s + "\n:: NOTES";
		
	// get notes
	     $.ajax({
        type: "POST",
        url: "scripts/getnotes.php",
		data: "bookid=" + gbooks[which].bookid + "&gdatabase=" + gdatabase,
		async: false,
		success: function(dirresult){
            resp = dirresult;
           // alert("taglist in jquery ajax= " + expansionslist);
        },
        error: function(){
           // alert('Error reading blogdraft_expansions.txt');
        }
    })
	
	// write out the notes
	// create arrray of lines
	var narray = resp.split("<BR />"); // split whole response into array of lines
    var i, farray, pg, tag,c,p, numstring, l, noteline;
   //$resp = $noteid . "|" . $content . "|" . $rating . "|" . $bookid . "|" . $page . "|" . $tagstring . "|<BR />";v
    for (i=0; i < narray.length; i++){
    	farray = narray[i].split("|"); //split line into fields
 	    l = trimSpacesAndLfs(farray[1]);
	    if (l != "") {  // if there's content to the note
	       // look for page number 
           pg = extractPageNumber(l);
	       if (farray[4] != "") { // use databased page number if available
			  pg = farray[4];
		    }
		// build noteline if the content isn't blank or "undefined"
		if ((farray[1] != "") ) {
			noteline = pg + "/" + " " + farray[1];
			if (farray[5] != "") {
				noteline = noteline + ">> " + farray[5];
 			}
			s = s + "\n\n" + noteline;
		}
		
	  }
	} // for
	
	// write it
	
	var resp = "failure";
	// prep title of book as title of text file, but without the .txt
    var tit = gbooks[which].title;
	if (tit == null) {tit = "TEMP TITLE;"}
	tit = prepForParameter(tit);
		
     $.ajax({
        type: "POST",
        url: "scripts/writeexportedfile.php",
		data:  "filename=" + tit + "&content=" + s + "&foldername=" + foldername,
		async: false,
		success: function(dirresult){
            resp = dirresult;
        },
        error: function(){
			resp= "Failed writing export file";
        }
    })
	alert(resp);
	

}
  
//------- DELETE SELECTED ROWS
function deleteSelectedRows(){
	
	// confirm the deletion
	var r = confirm("Really delete those notes?");
	if (!r) {return}
	
	var fset = document.getElementById("notestable"); // get the notes div
	//var inputs = fset.getElementsByTagName("input");
	var inputs = fset.getElementsByClassName("notespandidcheckclass")
	for (var i = 0; i<inputs.length; i++)
	if ( inputs.item(i).checked==true){
		//  the input set is getting the "save these notes" etc. buttons on the bottom)
		if ((inputs.item(i).name.indexOf("notespanid" + i + "check")) > -1) {
			deleteRow("notespanid" + i);
		}
	}
	    
}
function batchTag(){
	// tag selected rows
	var ta=document.getElementById("batchtagid"); // get text area
	
	// get tag string. Abort if none.
	var tagstring=ta.value;
	if (tagstring=="") {
		alert("No tags entered");
		return;
	}
	
	// confirm the tagging
	var r = confirm("Really tag those notes " + tagstring + "?");
	if (!r) {return}
	
	var fset = document.getElementById("notestable"); // get the notes div
	//var inputs = fset.getElementsByTagName("input");
	var inputs = fset.getElementsByClassName("notespandidcheckclass")
	for (var i = 0; i<inputs.length; i++)
	if ( inputs.item(i).checked==true){
		//  the input set is getting the "save these notes" etc. buttons on the bottom)
		if ((inputs.item(i).name.indexOf("notespanid" + i + "check")) > -1) {
			// get noteid
			var rowid = "notespanid" + i;
			// get child of child
			var cc = document.getElementById(rowid).firstChild.firstChild;
			var noteid = cc.getAttribute("noteid");
			var bookid = cc.getAttribute("bookid");
			// update the tagstring text
			var tage = document.getElementById(rowid + "tags");
			tage.innerHTML = tagstring;
			// update the database
			updateTags(tagstring,noteid,bookid);
			updateNote(noteid,"",tagstring);
			}
		}
}


 //------ De-DUPE COMMA_DELIMITED TAGS
function dedupeTags(tgs)
// from http://www.martienus.com/code/javascript-remove-duplicates-from-array.html
{
	 if (tgs==""){return "";} // error check
   var a = new Array();
   a = tgs.split(",");
   var r = new Array();
   var p,q;
   o:for(var i = 0, n = a.length; i < n; i++)
   {
      for(var x = 0, y = r.length; x < y; x++)
      {
	  	 p = r[x];
		 q = a[i];
		 p = p.toLowerCase();
		 q= q.toLowerCase();
		 p = trimSpacesAndLfs(p);
		 q = trimSpacesAndLfs(q);
         if(p == q) continue o;
      }
      r[r.length] = a[i];
   }
   
   // re-create tag string
    var cleantags="";
   	for (i=0; i < r.length; i ++) {
		cleantags=cleantags + r[i];
		if (i != r.length -1) {
			cleantags = cleantags + ", ";
		}
	}
	cleantags = cleantags.toLowerCase();
   return cleantags;
}


 function dedupeTagsOLD(tgs){
 	var cleantags="";
	var i,y,match;
	var tarray = tgs.split(",");
	var narray = new Array();
	narray[0] = trimSpacesAndLfs(tarray[0]);
	for (i=1; i < tarray.length; i++){
		tarray[i] = trimSpacesAndLfs(tarray[i]);
		match=false;
		for (y=0; y < narray.length; y++){
			tarray[y] = trimSpacesAndLfs(tarray[y]);
			if (tarray[i]==tarray[y]) {
				match=true;
			}
		}
		if (match == false) {
			narray[narray.length] = tarray[i]
			
		}
	}
	
	for (i=0; i < narray.length; i ++) {
		cleantags=cleantags + narray[i];
		if (i != narray.length -1) {
			cleantags = cleantags + ", ";
		}
	}
	
	// lowercase them all
	return cleantags.toLowerCase();
 }
  


 //----- RETRIEVE ALL BOOKS AND BUILD GLOBAL ARRAY
  function retrieveBooks(){
 
	   var resp = "failure";

     $.ajax({
        type: "POST",
        url: "scripts/getbooks.php",
		//data:  "user=" + gUsername + "&project=" + gProject,
		data: {user : gUsername, project : gProject},
		datatype: 'json',
		async: false,
		success: function(dirresult){
            resp = dirresult;
           // alert("taglist in jquery ajax= " + expansionslist);
        },
        error: function(){
           // alert('Error reading blogdraft_expansions.txt');
        }
    })
	//alert(resp);
   // parse the json into an array
   var barray = JSON.parse(resp);
   
    // stop if no books -- a project without books yet
   if (barray.length < 1) {
       gbooks.length = 0; // reset gbooks array
       displayAllBooks();
       document.getElementById("retrievedbooksp").innerHTML="Retrieved no books.";
       return
   }
    gbooks.length = 0; // reset gbooks array
   
   // load gbooks with the json objects in the array
   for (var i=0; i < barray.length; i++){
         gbooks[i] = barray[i];
   }

	 
	 // get number of notes for each
	 countNotes();
	 
	document.getElementById("retrievedbooksp").innerHTML="Retrieved " + i + " books.";
	return i;
 }  
  
  
 //-------- COUNT NOTES FOR ALL BOOKS
   function countNotes(){
   
   	var resp = "failure";
   	
   	$.ajax({
   		type: "POST",
   		url: "scripts/countnotes.php",
   		//data: "project=" + gProject + "&user=" + gUsername,
   		data: {project : gProject, user : gUsername},
   		async: false,
   		success: function(dirresult){
   			resp = dirresult;
   			// alert("taglist in jquery ajax= " + expansionslist);
					},
					error: function(){
					// alert('Error reading blogdraft_expansions.txt');
					}
				})

		 var aarray = JSON.parse(resp);
		var i, ai;
		for (i=0 ; i < aarray.length; i++){
			
			ai = getIndexFromBookid(aarray[i]["bookid"]);
			if (ai > -1) {
				gbooks[ai].numberofnotes = aarray[i]["count"];
			}
		}
		
}
  
 // ------ GET INDEX IN GBOOKS FROM BOOKID
 function getIndexFromBookid(b){
 	// gets gbook index from book id
 	var i=0;
	var done=false;
	var r = -1;
	while (done == false) {
		if (gbooks[i].bookid == b) {
			done=true;
			r=i;
		}
		else {
			i=i+1;
			if (i >= gbooks.length) {
				done=true;
			}
		}
	}
	return r;	
 }
 
 // --- HIDE BOOK TITLE
 function hideBookDisplay(){
 	  var displaydiv = document.getElementById("bookstable");
  displaydiv.style.display="none";
 }
 // ------- DISPLAY BOOK TITLES
 function displayAllBooks(){

   // no books? empty out both display divs and exit
   if (gbooks.length == 0) {
     $("#stackviewdiv").html("");
     $("#bookstable").html('');	
     return
   }
   
   
   
   // list or shelf
   if ($("input[name='booklistbtns']:checked").val() == 'Shelf') {
   		displayAllBooksStackview();
   		return
   }
   $("#stackviewdiv").hide('slow');
   $("#bookstable").show('slow');
   
   
	
  // Get display div
  var displaydiv = document.getElementById("bookstable");
  displaydiv.style.display="block";
  var disp = "<p><form id='booksdisplayform'><table class='tablesorter' id='displayallbookstable'>";	
  disp = disp + "<thead><tr id='booklistheader' class='booklistheader'><th></th><th><p  class='booklistheader'>Del</p></th><th><p  class='booklistheader'>Title</p></th><th><p   class='booklistheader'>Author</th><th><p  class='booklistheader'>Note</th><th><p  class='booklistheader'>Tags</th><th><p  class='booklistheader' title=\"Number of Notes\">#</th></tr></thead><tbody>"
 var numbnotes="";
 var tit="";
 for (i = 0; i < gbooks.length; i++) {
 	tit = gbooks[i].title;
 	if ((tit != "") && (tit != undefined)){
 		spanid = gbooks[i].bookid; // use bookid as span id
			noteline = "<tr class='booklistrowclass'><td>";
			noteline = noteline + "<span id='" + spanid + "'><input type='button' value='show' onclick='displayBook(\"" + spanid + "\");'></span></td>";
			//noteline = noteline +"<td><span id='" + spanid + "delete'><a href='#' style='text-decoration: none' onclick='deleteBook(\"" + spanid + "\");'>-</a></span>" +"</td>";
			noteline = noteline +"<td><span id='" + spanid + "delete'><input type='button' style=\"font-size:8pt;color:#FF5F5D;\" title='Delete' value='X' onclick='deleteBook(\"" + spanid + "\");'></span></span>" +"</td>";
			noteline = noteline + "<td class='booklisttitleclass'><p title='Bookid: " + gbooks[i].bookid + "'>" + gbooks[i].title;
			noteline = noteline + "</td><td class='booklistauthorclass'><p>" + gbooks[i].author + "</p></td>";
			noteline = noteline + "</td><td class='booklistauthorclass'><p class='booklistnoteclass'>" + gbooks[i].note + "</p></td>";	
			if (gbooks[i].tags==null) {tags="";}else{tags=gbooks[i].tags;}
			noteline = noteline + "</td><td class='booklistauthorclass'><p class='booklistauthorclass'>" + tags + "</p></td>";
			if ((gbooks[i].numberofnotes == "undefined") || (gbooks[i].numberofnotes == null)) {
				numbnotes = "&nbsp;"
			}
			else {
				numbnotes = gbooks[i].numberofnotes;
			}
			noteline = noteline + "<td  class='booklistauthorclass'><p>" + numbnotes + "</p></td></tr>";
			disp = disp + noteline;
		}
	}
	disp=disp + "</tbody></table>";
  displaydiv.innerHTML=disp;
  
   // invoke sortable

  //sorttable.makeSortable(document.getElementById("displayallbookstable"));
  $("#displayallbookstable").tablesorter(); 

   // set cookie
   setCookie("display","LIST");
   

 } 
 
 // ------ GET BOOK OBJ BY BOOKID
 function getBookByID(bid){
 	// returns index of book in array
 	
 	
	var done=false;
	var i = 0;
	var r = -1
	while (done == false) {
		if (gbooks[i].bookid == bid) {
			r = i;
			done = true;
		}
		else {
			i = i + 1;
			if (i >= gbooks.length) {
				done = true;
				
			}
		}
		  
	}
	return r;
 }
 
 // GET BOOKID FROM NOTE ROW NUMBER
 function getBookidFromNoteRowNumber(i){
 	// get bookid
	var bid;
	
	var bookspanid = "notespanid" + i + "bookid";
	var bookspan = document.getElementById(bookspanid);
	if (bookspan != null) {
		bid = bookspan.getAttribute("bookid");
	}
	return bid;
	// rest is old
	if (bookspan != null) {
		var bookidspan = bookspan.innerHTML;
	}
	if ((bookidspan != null) && (bookspanid != "")) {
		bid = bookidspan;
		bid = bid.substr(bid.indexOf("db:") + 3, bid.length);// lop off the "db:";
		bid = bid.substr(0, bid.indexOf("</span>")); // lop off end
	}
	return bid;
	
 }
 
// -- STACKVIEW
function displayAllBooksStackview(){
    
    if ($("#stackviewdiv").show()) {
    	$("#stackviewdiv").hide('slow');
    }
    $("#stackviewdiv").show('slow');
   $("#bookstable").hide('slow');
	var data_sample = {
    "start": "-1", // -1 start value signifies the end of a stack
    "limit": "0",
    "num_found": "2",
    "ribbon": "TEST",
    "docs": [
        {
            "title": "Blankets",
            "creator": [
                "Craig Thompson"
            ],
            "measurement_page_numeric": 582,
            "measurement_height_numeric": 25,
            "shelfrank": 13,
            "pub_date": "2003",
            "link": "http://holliscatalog.harvard.edu/?itemid=|library/m/aleph|009189638"
        },
        {
            "title": "Persepolis",
            "creator": [
                "Marjane Satrapi"
            ],
            "measurement_page_numeric": 153,
            "measurement_height_numeric": 24,
            "shelfrank": 64,
            "pub_date": "2003",
            "link": "http://holliscatalog.harvard.edu/?itemid=|library/m/aleph|009098946"
        }
    ]
};


 var bks = new Array();
 var autharray = new Array();
 var wd, len;
 for (i = 0; i < gbooks.length; i++) {
    autharray.length=0;
    autharray.push(gbooks[i].author);
    wd = gbooks[i].numberofnotes + 5;
    len = Math.floor((Math.random()*15)+25); 
    bks.push({"title":gbooks[i].title,
    	"creator": [gbooks[i].author],
    	"pub_date":gbooks[i].date, 
    	"measurement_page_numeric": wd, 
    	"measurement_height_numeric": len ,
    	"shelfrank": 50,
    	"link": gbooks[i].bookid // hack: put bookid in as url
    	});
 }
 
 var data=  {
    "num_found": gbooks.length,
    "start" : "-1",
    "limit": "0",
    "docs": bks
    }
    
//Delete and recreate the stackview div. Otherwise it doesn't pick up new json
	 var svdiv = document.getElementById('stackviewdiv');
	 var parsvdiv = svdiv.parentNode;
	 parsvdiv.removeChild(svdiv);
	 var newdiv = document.createElement("div");
	 newdiv.setAttribute("id","stackviewdiv");
	 newdiv.style.width="800px";
	 newdiv.style.height="400px";
	 parsvdiv.appendChild(newdiv);

$('#stackviewdiv').stackView({data: data, ribbon: gProject});

// make them clickable
$(".stack-item").click(function(w) {
  var li =  w.currentTarget;
  var ch = li.childNodes[1]; // get a href
  var bid = ch.getAttribute("href"); // get href value, which is bookid
 // alert("Handler for .click() called:" + bid);
 displayBookNotes(bid); // show the notes
 displayBiblioInfo(bid); // fill in the bib form, which probably isn't displayed
  return false;
  
  });
  
  // setcookie
  setCookie("display","SHELF");
}
 
 
 //--------- DISPLAY A BOOK
 
 function displayBook(bookid){
 	// display biblio	
	   var resp = "failure";

	// look up the book by id in the gbooks global array
	var i = getBookByID(bookid);
	if (i > -1) { // if found the book
		gbook = gbooks[i]; // set global book to that book in the array
		var temp = gbook.title; // debug
	}

	// display the info
	displayBiblioInfo(bookid);
	// display notes
	displayBookNotes(bookid);
	
	// hide the list of books
	$("#bookstable").hide(500,function(){});
	// display button to bring back bookstable
	$("#showbookstable").show();
	
	
 }
 
 //------ UPDATE GBOOKS ARRAY BASED ON INFO ON DISPLAY
 function updateGbooksFromDisplay(gbooksid_to_update){
 	// gbooksid_to_update = which book to update, using gbook array id
	var i = gbooksid_to_update;
	gbooks[i].bookid=document.getElementById('bbid').value;
	gbooks[i].title=document.getElementById('btitle').value;	
	gbooks[i].author=document.getElementById('bauthor').value;
	gbooks[i].pub=document.getElementById('bpublisher').value;
	gbooks[i].city=document.getElementById('bcity').value;	
	gbooks[i].date=document.getElementById('bdate').value;	
	gbooks[i].vol=document.getElementById('bvol').value;
	gbooks[i].translatorv=document.getElementById('btranslator').value;
	gbooks[i].misc=document.getElementById('bmisc').value;
	gbooks[i].issue=document.getElementById('bissue').value;
	gbooks[i].date=document.getElementById('bdate').value;
	gbooks[i].url=document.getElementById('burl').value;
	gbooks[i].type=document.getElementById('btype').value;
	gbooks[i].type=document.getElementById('bjournal').value;
 	
 }
 
 // ------- DISPLAY BIBLIO INFO IN DOC
 function displayBiblioInfo(gbooksid){
 	// gbooksid = id in gbooks array
	var i = getBookByID(gbooksid);
	
	var debugarray = new Array;
	debugarray = gbooks[i];
	
	var tempbookarray = new Array(gbooks[i].bookid, gbooks[i].title, 
	   gbooks[i].author, gbooks[i].pub, gbooks[i].city, gbooks[i].date, 
	   gbooks[i].translator, gbooks[i].misc, gbooks[i].issue, 
	   gbooks[i].date, gbooks[i].journal, gbooks[i].type,  gbooks[i].url, gbooks[i].tags, gbooks[i].vol);
	var x;
	for (x=0; x < tempbookarray.length; x++){
		if (tempbookarray[x]==null){
			tempbookarray[x] = "";
		}
	}
	
	
//if (gbooks[i].bookid == "undefined")	
	
	
document.getElementById('bbid').value=tempbookarray[0];
document.getElementById('btitle').value=tempbookarray[1];	
document.getElementById('bauthor').value=tempbookarray[2];
document.getElementById('bpublisher').value=tempbookarray[3];
document.getElementById('bcity').value=tempbookarray[4];	
document.getElementById('bdate').value=tempbookarray[5];
document.getElementById('btranslator').value=tempbookarray[6];
document.getElementById('bmisc').value=tempbookarray[7];
document.getElementById('bissue').value=tempbookarray[8];
document.getElementById('bdate').value=tempbookarray[9];
document.getElementById('bjournal').value=tempbookarray[10];
document.getElementById('btype').value=tempbookarray[11];
document.getElementById('burl').value=tempbookarray[12];
document.getElementById('btags').value=tempbookarray[13];
document.getElementById('bvol').value=tempbookarray[14];

 }
  
//------- DELETE DISPLAYED BOOK
function deleteDisplayedBook(){
	var bid = document.getElementById("bbid").value;
	if ((bid==null) || (bid=="undefined")){ // return if bookid in the displayed listing isn't a number
		return;
	}
	// get index of book in gbooks array
	var i = getBookByID(bid);
	//if (isNaN(i) == false){
	//	alert(i + " is supposed to be the bookid but is not a number.");
	//	return
	//}
	// confirm we want to delete it
	var tit = gbooks[i].title;
	var r = confirm("Delete " + tit + "?");
	if (r == false) {return}
	// delete
	 var resp = "failure";

     $.ajax({
        type: "POST",
        url: "scripts/deletebook.php",
		data: "bookid=" + bid + "&project=" + gProject + "&user=" + gUsername,
		async: false,
		success: function(dirresult){
            resp = dirresult;
           // alert("taglist in jquery ajax= " + expansionslist);
        },
        error: function(){
           // alert('Error reading blogdraft_expansions.txt');
        }
    })
	alert(resp);
	// if success, then update.
	if (resp==0){
		retrieveBooks();
		displayAllBooks();
	}
}

//------- DELETE DISPLAYED BOOK
function deleteBook(bid){
		if ((bid==null) || (bid=="undefined")){ // return if bookid in the displayed listing isn't a number
		return -1;
	}
	
	// confirm we want to delete it
	var tit = getTitleFromBookid(bid);
	var r = confirm("Delete " + tit + "?");
	if (r == false) {return}
	// delete
	 var resp = "failure";

     $.ajax({
        type: "POST",
        url: "scripts/deletebook.php",
		data: "bookid=" + bid + "&gdatabase=" + gdatabase,
		async: false,
		success: function(dirresult){
            resp = dirresult;
           // alert("taglist in jquery ajax= " + expansionslist);
        },
        error: function(){
           // alert('Error reading blogdraft_expansions.txt');
        }
    })
	alert(resp);
	// if success, then update.
	if (resp==0){
		retrieveBooks();
		displayAllBooks();
	}
}
  
 // ------- DISPLAY BOOK NOTES
 function displayBookNotes(bookid){
 	//var bookid = getSqlAttribute("books","bookid","title", title);
	
	var title = getTitleFromBookid(bookid);
	// get notes
	var resp = "failure";

     $.ajax({
        type: "POST",
        url: "scripts/getnotes.php",
		data: "bookid=" + bookid + "&gdatabase=" + gdatabase,
		async: false,
		success: function(dirresult){
            resp = dirresult;
           // alert("taglist in jquery ajax= " + expansionslist);
        },
        error: function(){
           // alert('Error reading blogdraft_expansions.txt');
        }
    })
	//alert(resp);
	
	//delete current contents
	document.getElementById("notestable").innerHTML="";
  
   // build note array
   var narray = JSON.parse(resp);
   var noterow = new Note();
   var notearray = new Array();
   for (var i=0; i < narray.length; i++){
         noterow = narray[i];
         notearray.push(noterow);
   }


   
  var  noteline;
  narray = resp.split("<BR />"); // split whole response into array of lines
  var i, farray, pg, tag,c,p, numstring, l;
 
 for (i=0; i < notearray.length; i++){
 	noterow = notearray[i];
 	noterow.content = trimSpacesAndLfs(noterow.content);
	if (noterow != "") {  // if there's content to the note
		// build noteline if the content isn't blank or "undefined"
		if ((noterow.content != "") ) {
				noteline = buildNoteLine(i,noterow.content,noterow.rating,noterow.page,noterow.tagstring,noterow.bookid,noterow.noteid,noterow.title);
		}	
	}
 }
 
 // the button
  //addSaveAndDeleteNotesTableButtons();
  $('#notestablebtns').show();  

  
  //insert the header
  insertNotesTableHeader("<span class='metatitle'>Notes from book:</span> " + title);
    // invoke sortable
   $("#noteslisttable").tablesorter( {cancelSelection:true}); 
	
	
 } 
 
function insertNotesTableHeader(s){
	var hdr = document.getElementById("notesfieldid");
	//hdr.innerHTML="<p class='notestabletitleclass'>" + s + "</p>";
	hdr.innerHTML = s;
}
 
function deleteNotesListTable(){
	var tablediv = document.getElementById("notestable");
	var tbl = document.getElementById("noteslisttable");
	if (tbl == null) { return}
	if (tbl != null) {
		tablediv.innerHTML="";
		tablediv.setAttribute("id","notestable"); //replace the id
	}
	$('#notestablebrns').hide();
	return
}
 
//--------- EXTRACT PAGE NUMBER
function extractPageNumber(s){
	if (s==null){
		return s;
	}
	var c,n;
	n= "-1";
	var pg="";
	var p;
	var gotthenumber=false;
	var numstring="";
	s = trimSpacesAndLfs(s);
	// is there a number at the end?
	c = s.substr(s.length - 1,1); // get last char
	if ("0123456789xviXVI".indexOf(c) > -1) { // we've got an integer
		p = s.lastIndexOf("p"); // get the last p
		if (p != -1) { // we've got a p
			s = s.substring(p + 1, s.length); // get the string from p to end
			s = trimSpacesAndLfs(s);
			gotthenumber = true;
			// is it too long?
			numstring = s;
			if (numstring.length > 8) {
				gotthenumber = false;
			}
		} // if it has a p
		if (gotthenumber == false) { // if looking for the last p didn't work out
			 	// get the number by counting backwards
				var done=false;
				var i=s.length - 1;
				numstring="";
				while (done == false) {
						c = s.substr(i, 1);
						if ("0123456789xviXVI-".indexOf(c) > -1) {
							numstring = c + numstring;
							i = i - 1;
						    if (i <  0) {
							    done=true;
								gotthenumber = true;
						 	}
						}
						else { // if not a number, we're done
							done = true;
						}
						
					}
					
			 } // if nopage = false
			 pg = numstring;	   	
		   
		}
		
		return pg;
}

  
 //--------- BUILD NOTE LINE
 
 function buildNoteLine(rownumb,cont,rating,pg,tags, bookid, noteid, title){
    // builds a note line and adds it to the table
    // create the table if it's the first note
    
    // display the div
    var thediv = document.getElementById("notestablediv");
    if (thediv.style.display != "block") {$("thediv").show(500,function(){});}
    
 	if (cont==null) {return}
	var pcell;
 
    if (pg=="") pg="[pg]";
	if (tags=="") tags="[tag]";
	var fulltitle=title; // getTitleFromBookid(bookid);
	// abbreviate title
	if ((fulltitle != null) && (fulltitle.length > gMaxTitleLength)) {
		var abbrevtitle = fulltitle.substring(0,gMaxTitleLength) + "...";
	}
	else {abbrevtitle = fulltitle;} 
 
    // is there a title? Yes, if coming from clicking on a tag. No if from book
    var maxcols;
	((title != "") && (title != null)) ?  maxcols = 6 :   maxcols = 5;
	
 
		//var body = document.getElementById("notestable");
		
		// creates a <table> element and a <tbody> element
		  var tbl     = document.createElement("table");
		
		var tbl = document.getElementById("noteslisttable");
	   // for ease
	   var MENU = 0, RATE= 1, NOTE = 2, PAGE=3, TAGS = 4, TITLE = 5;
	  // ---- Set up Table
		if (tbl == null) { // only do this once
		    var tablediv = document.getElementById("notestable");
			var tbl     = document.createElement("table");
			tablediv.appendChild(tbl);
			tbl.setAttribute("id", "noteslisttable");
			//tbl.setAttribute("class", "notelisttableclass");
			tbl.setAttribute("class", "tablesorter");
		    
		
			
			// create the header
			var headings =  ['<span class="smalltext" onclick="hideNotesShowBooks()">X</span>', '<img src=\"images/star.jpeg\">' , 'Note', 'Page', 'Tag','Title'];
			var hdr = document.createElement("thead");
			tbl.appendChild(hdr);
			var hdrrow =  document.createElement("tr");
		
			for (var i = 0; i < maxcols; i++) {
				cell = document.createElement("th");
				pcell = document.createElement("p");
				cell.appendChild(pcell);
				pcell.innerHTML = headings[i];
				// create blank class
				pcell.setAttribute("class","notestableheaderclass");
				if (i == NOTE){ // if notes field
					pcell.setAttribute("id", "notesfieldid");
				}
				hdrrow.appendChild(cell);
			}	
		   hdr.appendChild(hdrrow);	 // insert the hdr row 
		   
		   
		   	// create body
		    var tblBody = document.createElement("tbody");
			tbl.appendChild(tblBody);
			tblBody.setAttribute("id", "notestablebody1"); 
	
		}  // ------ End of set up
		
		else { // not the first time
			var tbl = document.getElementById("noteslisttable");
			var tblBody = document.getElementById("notestablebody1");
		}
	
		var spanid = "notespanid" + rownumb; // id for span
		var disp;
		

		
		
		// create 5 cells
		var cell, celltext;
		var row = document.createElement("tr");
		for (i = 0; i < maxcols; i++) {
			// old or new
			cell = document.createElement("td");
			//cellText = document.createTextNode("&nbsp;");
			//cell.appendChild(cellText);
			row.appendChild(cell);
		}

		
		// add the row to the end of the table body,
		tblBody.appendChild(row);
		// style the row
		row.setAttribute("class", "booklistspan");
		row.setAttribute("id", spanid);
		
		
		
		// set attributes and content
		var cellz, cel, myceltxt, myp;
		var rowz = tblBody.getElementsByTagName("tr");
	
			cellz = rowz[rowz.length-1].getElementsByTagName("td");
			for (var j = 0; j < cellz.length; j++) {
				cel = cellz[j];
				// which column is it?
				// BUTTON and CHECKBOX
				if (j==MENU){
					var newp = document.createElement("p");
					newp.setAttribute("bookid",bookid);
					newp.setAttribute("noteid",noteid);
					cel.appendChild(newp);
					var ih = "<input type=\"checkbox\" name=\"" + spanid + "check\" class=\"notespandidcheckclass\" >";
					//ih = ih + "<input type='button' value='-' onclick='deleteRow(\"" +  spanid +  "\")'>";
					ih = ih + "<a href=\"javascript:void(null)\" class=\"noteinfobookidclass\" onclick='deleteRow(\"" +  spanid +  "\")'>Del</a>";
					newp.innerHTML= ih;
					
					
				}
				 // RATING
				if (j == RATE)  {
					var newp = document.createElement("p");
					newp.setAttribute("bookid",bookid);
					newp.setAttribute("noteid",noteid);
					cel.appendChild(newp);
					if ((rating=="") || (rating="undefined")){rating="-";}
					newp.innerHTML=rating;
					newp.setAttribute("id", spanid + "rating");
					newp.setAttribute("ondblclick", "changeRating(this)");
					newp.setAttribute("class", "noteratingclass");
				}
				 // NOTE
				if (j == NOTE)  {
					var newp = document.createElement("p");
					newp.setAttribute("bookid",bookid);
					newp.setAttribute("noteid",noteid);
					newp.setAttribute("onMouseOver",  "displayBiblioInfo(" + bookid + ")");
					cel.appendChild(newp);
					newp.innerHTML=cont;
					newp.setAttribute("id", spanid + "content");
					newp.setAttribute("ondblclick", "makeEditable(this)");
					newp.setAttribute("class", "notecontentclass");
				}
				// PAGENUMBER
				if (j == PAGE) {
					newp = document.createElement("p");
					newp.setAttribute("bookid",bookid);
					newp.setAttribute("noteid",noteid);
					cel.appendChild(newp);
					newp.innerHTML=pg;
					newp.setAttribute("ondblclick", "makeEditable(this)");
					newp.setAttribute("class", "notepageclass");
					cel.setAttribute("id", spanid + "page");
				}
				// TAGS
				if (j == TAGS)  {
					if (tags=="") {tags="[tag]";}
					var linkedtags = createLinkedTags(tags);
					// create element for the + that makes tags editable
					newp = document.createElement("span");
					newp.setAttribute("bookid",bookid);
					newp.setAttribute("noteid",noteid);
					cel.appendChild(newp);
					newp.innerHTML="+"
					newp.setAttribute("onClick", "editTags('" + spanid + "tags')");
					
					// create element for the tags
					newp2 = document.createElement("span");
					cel.appendChild(newp2);				
					newp2.innerHTML=linkedtags;
					//newp.innerHTML=newp.innerHTML + "<p id='" + spanid + "tags' class='notetagclass'>" + linkedtags + "</p>";
					//newp.setAttribute("ondblclick", "makeEditable(this)");
					newp2.setAttribute("class", "notetagclass");
					newp2.setAttribute("id", spanid + "tags");
				}
				// TITLE
				if (j == TITLE)  {
					if (title=="") {title="-";}
					newp = document.createElement("span");
					newp.setAttribute("bookid",bookid);
					newp.setAttribute("noteid",noteid);
					cel.appendChild(newp);
					newp.innerHTML=abbrevtitle;
					newp.setAttribute("onClick", "displayBookNotes('" + bookid + "')");
					newp.setAttribute("title",fulltitle); // hover to display full book
				}
				// BOOKID -- UNUSED
				if (j == 6)  {
					newp = document.createElement("p");
					cel.appendChild(newp);
					newp.innerHTML="<span title='" + getTitleFromBookid(bookid) + "'>" + "db:" + bookid + "</span>";
					newp.setAttribute("ondblclick", "displayBook(" + bookid + ")");
					newp.setAttribute("id", spanid + "bookid");
					newp.setAttribute("bookid", bookid);
					newp.setAttribute("class", "noteinfobookidclass");
					
					//cel.setAttribute("id", spanid + "bookid");
				}
				// NOTEID -- UNUSED
				if (j == 7)  {
					newp = document.createElement("p");
					cel.appendChild(newp);
					newp.innerHTML="n:" + noteid;
					// get the number of rows in the table
					var oRows = document.getElementById('noteslisttable').getElementsByTagName('tr');
					var iRowCount = oRows.length;
					newp.setAttribute("id", "noteid" + (iRowCount - 2)); // includes hdr, so subtract 1, and zero-base it
					newp.setAttribute("class", "noteinfonoteidclass");
					newp.setAttribute("noteid",noteid);	
					//cel.setAttribute("id", spanid + "noteid");
				}
			} // gone through an entire row
			
	 // make draggable
      $(".notecontentclass").draggable({
                revert: true,
                cursorAt: { left: 5 },
                helper: function() {
                  var t = this.innerHTML;
                  if (t.length > 15) {t = t.substring(0,15) + "...";}
                  var d = "<div class='dragIcon'>" + t + "</div>";
    		return $(d)[0];
    		}
        });
		
	}

function hideNotesShowBooks(){
	ShowHideDiv('notestablediv'); 
	
	// which book display?
	
	var disp = $("#booklistradio input[type='radio']:checked").val();
    if (disp =="List"){
    	$("#bookstable").show(750,function(){});
    	$("#stackview").hide();
    }
    else {
    	$("#bookstable").hide();
    	$("#stackview").show(750,function(){});
    
    }

}

function editTags(w){
    // gets content from tag field in note row and lets it be edited
	var o = document.getElementById(w); // get the id of the tag component
	// then get the span
	var cont="";
	var ch,chh;
	//var bigspan = o.firstChild;
	//var childs= bigspan.childNodes;
	//var childs = o.childNodes;
	var childs =o.getElementsByTagName("SPAN");
	for (var i=0; i < childs.length; i++){
		ch = childs[i];
		chh = ch.value;
		if (chh != "undefined") {
			//tempid=ch.nodeType;
			chh = trimSpacesAndLfs(chh);
			cont = cont + ch.innerHTML; //ch.nodeValue;
			if (i != (childs.length - 1)) {cont = cont + ",";}
		}		
	}
	
	var newtags = prompt("Enter tags, separated by commas:", cont);
	var linkedtags = createLinkedTags(newtags);
	o.innerHTML=linkedtags;
	// update the tags
	// update the tagstring in the note
	var opp = o.previousSibling;
	var noteid = opp.getAttribute("noteid");
	var bookid = opp.getAttribute("bookid");
	updateNote(noteid,"",newtags);
	// update the tag table
	updateTags(newtags,noteid,bookid);
}

	
function escapeIt(s){
	var news = s;
	//news = escapeIt(s);
	// get rid of +
	news = encodeURIComponent(s);
	return news;

}
function unEscapeIt(s){
		var news = s;
	//news = escapeIt(s);
	// get rid of +
	news = decodeURIComponent(s);
	return news;
}
 function createLinkedTags(tagstring){
 	// turns string of tags into hyperlinked html
	if ( (tagstring=="") || (tagstring==null) ) {
		return ""
	}
	var tag;
	var tarray = new Array();
	var phrase="";
	var sentence="";
	tarray = tagstring.split(",");
	for (var i=0; i < tarray.length; i++) {
		tag = tarray[i];
		tag = trimSpacesAndLfs(tag);
		  phrase= "<span class='inditag' onClick=\"displayTagsNotes('" + tag +"')\">" + tag + "</span> ";
		  sentence = sentence + phrase;
		  if (i != tarray.length -1) {sentence = sentence + ", ";}
	}
	
	return sentence;
	
	
 }
 function buildNoteLine_html(c,cont,pg,tg, bookid, noteid, title){
	// builds the textareas for a single line of note display
	
	if (pg=="") pg="[pg]";
	if (tg=="") tg="[tag]";
	var fulltitle=getTitleFromBookid(bookid);
	// abbreviate title
	if ((title != null) && (title.length > 10)) {
		var abbrevtitle = title.substring(0,10) + "...";
	}
	else {abbrevtitle = fulltitle;}
	var spanid=""
	var disp="";
	// ROW=new-button-content-pg-tags-title-bookid-noteid
	// create unique spanid
	spanid = "notespanid" + c; // id for span
	// start the row
	disp=disp + "<tr class='booklistspan' id='" + spanid + "'>";
	// is it new?
	if ((noteid=="") || (noteid == "undefined")) {
		disp = disp + "<td id='" + spanid + "oldnew'>" + getOldNewDisplayObject("UNSAVED") + "</td>";
	}
	else {disp = disp + "<td id='" + spanid  + "oldnew'>" + getOldNewDisplayObject("SAVED") + "</td>";}
	// add delete button
	  disp = disp + "<td><p><input type='button' value='-'";
	  disp = disp + " onclick='deleteRow(\"" +  spanid +  "\")'></p></td>";
	// content
		disp = disp + "<td  class='notecontentclass'>";
		disp= disp + "<p id='" + spanid  + "content' class='notecontentclass' editable='YES' ondblclick='makeEditable(this)'>" 
		disp = disp + cont;
		disp = disp + "</p></td>";
	// page number
		disp = disp + "<td>";
		var pagespanid = spanid + "page";
		disp = disp + "<p id='" + pagespanid + "'";
	    disp = disp + " class='notepageclass'  editable='YES' ondblclick='makeEditable(this)'>" + pg;
		disp = disp  + "</p></td>";
	// tags
		disp = disp + "<td><p id='" + spanid  + "tag' class='notetagclass'  editable='YES' ondblclick='makeEditable(this)'>" + tg;	
		disp = disp	 + "</p></td>";
	// title
		disp=disp + "<td><p class='notebookclass' title='"  + fulltitle + "'>" + abbrevtitle + "</p></td>";
	// book id
		disp=disp + "<td><p id='" + spanid + "bookid' class='noteinfobookidclass'>b:" + bookid + "</p></td>";
	// note id
		disp=disp + "<td><p id='" + spanid + "noteid' class='noteinfonoteidclass'>/n:" + noteid + "</p></td>";
	// end row
		disp=disp + "</tr>";
	
	return disp;
	
	
}

// -------- RETURN DISPLAY OBJECT FOR [OLD] [NEW]
function getOldNewDisplayObject(w){
	var o = "[unknown]"
	if (w=="UNSAVED") {
		o="<img src='./images/unsaved.png' alt='UNSAVED note'>";
	}
	if (w=="SAVED") {
		o="<img src='./images/saved.png' alt='SAVED note'>";
	}
	return o
}

//-------- GET  BOOK TITLE FROM BOOKID
function getTitleFromBookid(bid){
	if (gbooks.length==0) {
		return "";
	}
	var i=0;
	var resp = -1;
	var done=false;
	while (done==false){
		if (gbooks[i].bookid==bid) {
			resp=i;
			done=true;
		}
		i = i + 1;
		if (i >= gbooks.length) {done = true;}
	}
	
	if (resp > -1) {
		var tit = gbooks[resp].title;
	}
	else {var tit = "undef";}
	return tit;
}

// ------- SAVE LISTED NOTES

function saveListedNotes(){
	var test=1;
	// navigates the table, writing each visible line to the database
	// get the table'
    var mytable     = document.getElementById("noteslisttable");
	if (mytable == null) {
		return
	}
   // get table body
	var mytablebody = mytable.getElementsByTagName("tbody")[0];
	
	if (mytablebody==null) {
		return;
	}
	
	//var mytablebody = document.getElementById("notestablebody1");	// get all rows
	var rowz = mytablebody.getElementsByTagName("tr");
	var cel, tagsp;
	var cellz;
	var currenttext;
	var myceltext;
	var myp;
	var content;
	var isnew = "";
	var noteid, rating;
	var pagenumber;
	var tags, ischanged;
	var bookid;
	var docnoteid, spanid, noteidelement;
	var docbookid;
	// go through rows
	// ROW=new-button-content-pg-tags-title-bookid-noteid
	for (var i = 0; i < rowz.length; i++) {
		// get spanid from <tr>
		spanid = rowz[i].getAttribute("id");
		cellz = rowz[i].getElementsByTagName("td");
		noteid="";
		if (cellz[0].style.display != "none") { // skip if hidden
			for (var j = 0; j < cellz.length; j++) {
				cel = cellz[j];
				myceltext = cel.firstChild; 
				if (myceltext != null) {
					myp = myceltext.firstChild;
				}
				else {myp = null;}
				// which column is it?
				if ((j==0)) { // saved status
					ischanged = cel.getAttribute("saved");
				}
				if ((j == 2) && (myp != null)){
					rating = myp.data;
				}
				if ((j == 3) && (myp != null)){
					content = myp.data;
					if (content == "-") {content="";}
				}
				if ((j == 4) && (myp != null)) {
					pagenumber = myp.data;
					if (pagenumber=="[pg]") {pagenumber="";}
				}
				if ((j == 5) && (myp != null)) {
					var tagspan = document.getElementById("notespanid" + i + "tags");
					s = "";
					if (tagspan != null) {
						var tagspans = tagspan.getElementsByTagName("SPAN");
						for (p = 0; p < tagspans.length; p++) {
							tagsp = tagspans[p];
							s = s + tagsp.innerHTML + ",";
						}
					}
					tags = s; // tagcell.innerHTML;
					if (tags=="[tag]") {tags="";}
					else {tags = trimSpacesAndLfs(tags);}
				}
				if ((j == 6) && (myp != null)) {
					// get bookid, after b:
					//var bookspanid = spanid + "bookid";
					//var bookide = document.getElementById(bookspanid);
					//var bookidc = bookide.firstChild;
					//var bookidd = bookidc.nextSibling;
					//var bookid = bookidd.nodeValue;
					//var b = bookid.indexOf("b:");
					//if (b > -1) {
						//bookid = bookid.substring(2,bookid.length);
					//}
					//else {bookid="";}
					bookid = getBookidFromNoteRowNumber(i + 1); // bookid paras are not zero based
				
				}
				if ((j == 7) && (myp != null)) {
					noteel = document.getElementById("noteid" + i);
					noteid = noteel.getAttribute("noteid"); 
					//noteid = myp.data; // not mypdata. Don't know why
					//if (noteid == null) {
					//	noteid = myp;
					//}
					//if ((noteid != "n:") && (noteid.indexOf("n:") > -1 )){
					//	noteid=noteid.substring(1,noteid.length);
					}				//}
			} // gone through an entire row
			if (noteid == "undefined") {
				noteid = "";
			}
			// write the row
			// is it new
			//isnew = doesNoteExist(bookid, content);
			if (isnew =="") { // if it exists, isnew=noteid; if new, no noteid returned
				noteid = addNote(bookid, noteid, content, pagenumber, tags, rating); // it's new, so add it
				// update the noteid
				noteidelement = document.getElementById("noteid" + i);
				noteidelement.innerHTML = "n:" + noteid;
			}
			if (ischanged != "SAVED") {
				noteid = updateNote(noteid , content,tags); 
			}
			// mark it as saved -- not any more. Saves on change
			// displayOldOrNew("SAVED",spanid+"oldnew");
		} // skip if hidden
	}

}

  
// -------------- SET THE [OLD] [NEW] STATUS
function displayOldOrNew(oldnew, eid){
    // OBSOLETE. Used to mark a note as changed so it could be batch updated			

			var newoldspan = document.getElementById(eid);

			if (newoldspan == null) {
				oldnew="bad id";
			}
			// get id
			//var id = newoldspan.getAttribute("id");
			if (oldnew == "SAVED") {
				newoldspan.innerHTML = getOldNewDisplayObject("SAVED");
				newoldspan.setAttribute("saved","SAVED");
			}
			if (oldnew == "UNSAVED") {
				//newoldspan.innerHTML = "<td><span saved=\"UNSAVED\" id=" + eid + ">"+ getOldNewDisplayObject("UNSAVED") +"</span></td>";
				//newoldspan.setAttribute("saved","UNSAVED");
				//newoldspan.setAttribute("id", eid);
				//var test = newoldspan.innerHTML;
				newoldspan.innerHTML = getOldNewDisplayObject("UNSAVED");
				newoldspan.setAttribute("saved","UNSAVED");
			}
			if ((oldnew != "SAVED") && (oldnew !="UNSAVED"))  {
				newoldspan.innerHTML = getOldNewDisplayObject("UNKNOWN");
				newoldspan.setAttribute("saved","UNKNOWN");
			}
			// set  id
			newoldspan.setAttribute("id",eid);
}
  
// -------------- DELETE ROW
function deleteRow(which){
	
	// get bookid
	var noteide = document.getElementById(which);
	var noteid = noteide.innerHTML;
	var p = noteid.indexOf("n:");
	noteid = noteid.substring(p+2,noteid.length); 
	noteid = noteid.substring(0, noteid.indexOf("<"));
	

  var e = document.getElementById(which);
  e.style.display="none";

// do the deletion
     var resp = "failure";

     $.ajax({
        type: "POST",
        url: "scripts/deletenote.php",
		data: "noteid=" + noteid + "&project=" + gProject + "&user=" + gUsername,
		async: false,
		success: function(dirresult){
            resp = dirresult;
           // alert("taglist in jquery ajax= " + expansionslist);
        },
        error: function(){
           // alert('Error reading blogdraft_expansions.txt');
        }
    })
	
    
  var res=resp;

	
}

function ShowHideDiv(which){
    // show or hide a div
   var  whichdiv = document.getElementById(which);
    if (whichdiv.style.display == 'none') {
        $(whichdiv).show("slow");
        if (which == "html") {
            updatehtml();
        }
    }
    else 
        $(whichdiv).hide("slow");
}
  
  
// ---------- ADD NEW NOTE LINE

function addNoteLineOLD(){
    var current = document.getElementById('noteeditor');
    current.innerHTML = current.innerHTML + "<br>"
    var txtNode = document.createTextNode("");
	var newspan = document.createElement('p');
	newspan.setAttribute('class', 'noteidclass');
    var newta = document.createElement('textarea');
    newta.setAttribute('class', 'notelinetext');
    document.getElementById('noteeditor').appendChild(newta);
    var newta = document.createElement('textarea');
    newta.setAttribute('class', 'notelinepagenumber');
    document.getElementById('noteeditor').appendChild(newta);
    var newta = document.createElement('textarea');
    // link.setAttribute('href', 'mypage.htm');
    newta.setAttribute('class', 'notelinetags');
    document.getElementById('noteeditor').appendChild(newta);
    current.innerHTML = current.innerHTML + '	<input type="button" onclick="addNoteLine()">; <br>';
    
}

//------------ADD NEW BOOK
function addNewBookjquery(){
    // invoke writesavefile.php to save the file
    // assumes folder of blogdraft_copies
    //alert("in add new book");
    var tit = document.getElementById('btitle').value;
    var author = document.getElementById('bauthor').value;
    var city = document.getElementById('bcity').value;
     var pub = document.getElementById('bpub').value;  
    var date = document.getElementById('bdate').value;
    var bookid = document.getElementById('bbid').value;
	var url = document.getElementById('burl').value;
    // alert(tit + fn + ln);
    var testvar = "failure";
    $.post('scripts/savenewbook.php', {
        data: "title=" + tit +  "&gdatabase=" + gdatabase + "&author=" + author  + "&city=" + city + "&bookid=" + bookid + + "&url=" + url + "&pub=" + pub  + "&date=" + date,
        async: false,
        success: function(){
            alert('Success writing new book into database!');
            testvar = "Success"
        },
        error: function(){
            alert('Error writing new book into database');
        }
    })
    
    //alert(testvar);
}

function addNewBook(whichway){
    // if  whichway = 1, then use global biblio array
	// if whichway = 0, then use info in fields in form
    // get info from form
	var resp = -1;
	var param="";
	if (whichway == 0) {
		var title = escapeIt(document.getElementById('btitle').value);
		var author = escapeIt(document.getElementById('bauthor').value);
		var pub = escapeIt(document.getElementById('bpublisher').value);
		var city = escapeIt(document.getElementById('bcity').value);
		var date = escapeIt(document.getElementById('bdate').value); 
		var btype = escapeIt(document.getElementById('btype').value);
		var translator = escapeIt(document.getElementById('btranslator').value);
		var issue = escapeIt(document.getElementById('bissue').value);
		var journal = escapeIt(document.getElementById('bjournal').value);
		var vol = escapeIt(document.getElementById('bvol').value);
		var misc = escapeIt(document.getElementById('bmisc').value);
		var url = escapeIt(document.getElementById('burl').value);
		
		// build parameter
		param = "title=" + title + "&author=" + author  + "&pub=" + pub + "&type=" + btype + "&city=" + city + "&date=" + date  + "&gdatabase=" + gdatabase + "&url=" + url;
	    param = param + "&translator=" + translator;
		param = param + "&issue=" + issue;
		param = param + "&vol=" + vol;
		param = param + "&journal=" + journal;
		param = param + "&misc=" + misc;
	    param=prepForParameter(param);
		
	}
	if (whichway==1){
		param = "title=" + escapeIt(gbook.title) + "&author=" + escapeIt(gbook.author) + "&gdatabase=" + gdatabase + "&url=" + escapeIt(gbook.url);
	    param += "&date=" + escapeIt(gbook.date) + "&city=" + escapeIt(gbook.city) + "&pub="  + escapeIt(gbook.pub)+ "&container="  + escapeIt(gbook.container);
		// replace spaces with %20?
		 var s1 = RegExp(" ", "g");
       // param = param.replace(s1, "%20");
		//param = escapeIt(param);
	}
	
	
		var resp = "Failure at addNewBook";
     $.ajax({
        type: "POST",
        url: "scripts/savenewbook.php",
		data: param,
		async: false,
		success: function(dirresult){
            resp = dirresult;
        },
        error: function(){
           resp = "Failure at addNewNook";
        }
    })
	//alert(resp);
    
    
	
	return resp;
	}
	
//-------- UPDATE NOTE
function updateNote(noteid,content,tags){
	
	var param="noteid=" + noteid + "&content=" + content  + "&tags=" + tags + "&gdatabase=" + gdatabase;
	 // note: php ignores empty tag string
	 var resp = "Failure at updateNote";
     $.ajax({
        type: "POST",
        url: "scripts/updatenote.php",
		data: param,
		async: false,
		success: function(dirresult){
            resp = dirresult;
        },
        error: function(e){
           resp = e;
        }
    }) 
}

function updateTags(tagstring, noteid,bookid){
	
	var param="noteid=" + noteid + "&tagstring=" + escape(tagstring)  + "&bookid=" + bookid + "&project=" + gProject + "&user=" + gUsername;
	 // note: php ignores empty tag string
	 var resp = "Failure at updateTag";
     $.ajax({
        type: "POST",
        url: "scripts/savetag.php",
		data: param,
		async: false,
		success: function(dirresult){
            resp = dirresult;
        },
        error: function(e){
           resp = e;
        }
    }) 
}
	
//----- REMOVE SPACES AND PREP FOR PHP PARAMETER PASSING
function prepForParameter(s){
	s=trimSpacesAndLfs(s);
		 var s1 = RegExp(" ", "g");
        //s = s.replace(s1, "\\\ "); // works: replaces space with backslash space
		s = s.replace(s1, "%20");
		return s;
}

function escapeTheString(s){
		s=trimSpacesAndLfs(s);
		//var bs = String.fromCharCode(92);
		var s1 = RegExp("\\\\", "g"); //backslash
        s = s.replace(s1, "BACKSLASH");
		
		s1 = RegExp('\"', "g");
        s = s.replace(s1, '\\"'); // double quote
        
		s1 = RegExp("\'", "g");
        s = s.replace(s1, "\\'"); // single quote
        
		s1 = RegExp('&', "g");
        s = s.replace(s1, "AMPERSAND");
		return s;0
}

function unescapeTheString(s){

		var s1 = RegExp("BACKSLASH", "g"); //backslash
        s = s.replace(s1, "bkslsh");
		
		s1 = RegExp("\\\"", "g");// double quote
        s = s.replace(s1, '"');
		
		s1 = RegExp("\\\\'", "g");// double quote
        s = s.replace(s1, "'");
		
		s1 = RegExp('AMPERSAND', "g");
        s = s.replace(s1, "&");
		return s;0
		var s1 = RegExp("BACKSLASH", "g"); //backslash
        s = s.replace(s1, "bkslsh");
		
		
		return s;
}
	
function addTags(gdatbabase,bookid, noteid,tags){
	// takes tag string and adds the tags
			var taga = tags.split(",");
			for (var x=0; x < taga.length; x++){
				taga[x] = trimSpacesAndLfs(taga[x]);
				addTag(gdatabase,bookid,noteid,taga[x]);
			}
			
}
	
function addTag(gdatabase,bookid,noteid,tag){
    // if  whichway = 1, then use global biblio array
	// if whichway = 0, then use info in fields in form
    // get info from form
	
	if ( (tag == "undefined") || (tag=="")){return} // skip empty tags
	
	var resp = "Failure at addTag";
     $.ajax({
        type: "POST",
        url: "scripts/addtag.php",
		data: "bookid=" + bookid + "&noteid=" + noteid + "&tags=" + tag + "&gdatabase=" + gdatabase,
		async: false,
		success: function(dirresult){
            resp = dirresult;
           // alert("taglist in jquery ajax= " + expansionslist);
        },
        error: function(){
           // alert('Error reading blogdraft_expansions.txt');
        }
    })
	//alert(resp);
    var r = trimID(resp);
	
	if (r==""){  // return if failed
		// alert("New tag insert failed: " + r)
		}
	
	return r;
	    

	}
	
//-------- TRIM THE RETURN FROM PHP TO GET JUST THE ID NUMBER
function trimID(s){
	s = trimSpacesAndLfs(s);
	var p=-1;
	var r =s;
	p= s.indexOf('#');
	if (p > -1 ){
		r=s.substring(p + 1 , s.length);
	}
	return r;
}
	
//---------- SIZE TEXTAREA TO CONTENTS
function sizeToContents(sid) {
// If the number of characters in the type="text" 
//    field is within 3 of the field's size, add 
//    10 to the size.
// Customize with form name and field name, both 
//    in 3 places.

var t=document.getElementById(sid);
if (t==null){return;}
var i = t.size;
var j = t.value.length;
if((i - j) <= 3) { 
	t.size = (j + 10);
   }

var ic = t.cols;
var ir = t.rows;
var j = t.value.length;
var k = ic * (ir - 1);
if(j > k) {
   t.rows = (ir + 1);
   }
}


// ----- ADD A NOTE

function addNote(bid,noteid, c,pgnumb,tags, rating){
	// remove bad chars from parameter
	//c = prepForParameter(c);
	//tags = prepForParameter(tags);
	tags=trimSpacesAndLfs(tags);
	
	c = escapeIt(c); // take care of special characters
	
	
   var resp = "failure";
 
     $.ajax({
        type: "POST",
        url: "scripts/addnote.php",
		data: "cont=" + c + "&gdatabase=" + gdatabase + "&page=" + pgnumb +"&bookid=" + bid + "&tagstring=" + tags + "&noteid=" + noteid + "&rating=" + rating, 
		async: false,
		success: function(dirresult){
            resp = dirresult;
            // alert("Attrib in getSqlAttribute= " + resp);
        },
        error: function(){
            alert('Error in getNote function.');
        }
    })
   
   var r = trimID(resp);
   
    //alert(resp);

	
	// add tags
	if (tags != "") {
		addTags(gdatabase, bid, r, tags);
	}
		return r;
}

// ----- GET AN ATTRIBUTE

function getSqlAttribute(whichtable,whichfield, colweknow, basedonwhichvalue){
	


   var resp = "failure";
  var query="table=" + whichtable  + "&gdatabase=" + gdatabase + "&attrib=" + whichfield + "&colweknow=" + colweknow + "&basedonwhichvalue=" + basedonwhichvalue;
 
     $.ajax({
        type: "POST",
        url: "scripts/getattribute.php",
		data: query,
		async: false,
		success: function(dirresult){
            resp = dirresult;
            // alert("Attrib in getSqlAttribute= " + resp);
        },
        error: function(){
            alert('Error in getSqlAttribute function.');
        }
    })
   
    
    
    //alert(resp);
	return resp;
}


function getBetweenDelimiters(s,i){
	// parse a string between delims
	// note content book
	var c;
	var news="";
	var ctr=0;
	var x=0;
	var inphrase = false;
	var done=false;
	sa=s.toArray();
	while (done != true){
		c=sa[x];
		if ((c !="|") && (inphrase == true)){
			news=news + c;
		}
		if ((c =="|") && (inphrase == true)) {
			inphrase = false;
			done == true
		}
		if (c=="|"){
			ctr=ctr+1;
			if (ctr==i) {
				inphrase=true;
			}
		}
		x = x+1;
		if (x >= sa.length) {
			done == true
		}
		
	}
return news;
	
}


function trimSpacesAndLfs(w){
	if ((w=="") || (w==null) || (w.length == null)){ // skip if empty or not a string
		return w;
	}
    var i = 0;
    var c = "";
    dunn = false;
    var ww = w;
    while ((ww.charAt(0) == " " || ww.charAt(0) == "\r" || ww.charAt(0) == "\n") && ww != "") {
        ww = ww.substring(1, ww.length);
    }
    while ((ww.charAt(ww.length - 1) == " " || ww.charAt(ww.length - 1) == "," || ww.charAt(ww.length - 1) == "\r" || ww.charAt(ww.length - 1) == "\n") && ww.length > 0) {
        ww = ww.substring(0, ww.length - 1);
    }
    return ww;
}



function getSelectedText(){
    // puts them into globals
    var el = document.getElementById('ed');
    selend = el.selectionEnd;
    selstart = el.selectionStart;
    seltext = el.value.substring(selstart, selend);
    //alert(selstart+":"+sellen+":"+selted);
}




// Show Info from Footer
function showInfo(w){
 switch(w)	
  {					
		case "about":
			window.open('about.html', 'menubar, toolbar, location, directories, status, scrollbars, resizable, dependent, width=640, height=480, left=0, top=0')
			break;
		case "privacy":
			alert("No information is shared with anyone. Full privacy statement to come.");
			break;
  }  
}

/*
   


<!--   =============  SET UP ======== 

// IN FIREFOX, set signed.applets.codebase_principal_support to true (about:config)
// IN OS X edit /private/etc/apache2/httpd.conf (as sudo)
// UNCOMMENT: 
// # AddHandler cgi-script .cgi
// AND ADD
//  AddHandler cgi-script .pl
// Uncomment: 
// # LoadModule php5_module libexec/httpd/libphp5.so
//
// apachectl restart


======== PHP setup

Edit php.ini (try /usr/local/php5/lib/php.ini
search for "tmp" and make sure file uploads are enabled, and that you have a tmp directory of that name, with permissions set.
To load the new php.ini, restart apache: apachectl restart

=========== PERMISSIONS FOR MYSQL DATABASE
sudo
cd /usr/local/mysql/bin
start as david, with 'localhost' as server:
      ./mysql -h localhost
      
      TO USE EXISTING: use noterio;
      check with show tables;
      
      TO CREATE NEW:
	  CREATE database noterowio;
      CREATE USER 'david'@'localhost';
then GRANT ALL PRIVILEGES ON noterio.* TO 'david'@'localhost' WITH GRANT OPTION;

====== STRUCTURE OF MYSQL DATABASE 

CREATE TABLE 'books' (
  'bookid' int(11) NOT NULL AUTO_INCREMENT,
  'author' text,
  'pub' text,
  'date' text,
  'city' text,
  'title' text,
  'translator' text,
  'article' text,
  'vol' text,
  'issue' text,
  'misc' text,
  'type' text,
  'tags' text,
  'journal' text,
  'container' text,
  'url' text,
  'project' text,
  'user' text,
  'nickname' text,
  PRIMARY KEY ('bookid')
) ENGINE=MyISAM AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;

CREATE TABLE 'notes' (
  'noteid' int(4) NOT NULL AUTO_INCREMENT,
  'content' text,
  'bookid' text,
  'page' text,
  'tagstring' text,
  'rating' int(11) DEFAULT NULL,
  PRIMARY KEY ('noteid'),
  FULLTEXT KEY 'content' ('content')
) ENGINE=MyISAM AUTO_INCREMENT=1765 DEFAULT CHARSET=latin1;

CREATE TABLE 'tags' (
  'tag' text,
  'noteid' int(11) DEFAULT NULL,
  'bookid' int(11) DEFAULT NULL,
  'tagid' int(10) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY ('tagid')
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

CREATE TABLE 'project' (
  'id' int(11) unsigned NOT NULL AUTO_INCREMENT,
  'name' text,
  'description' text,
  'user' int(11) DEFAULT NULL,
  'created' date DEFAULT NULL,
  PRIMARY KEY ('id')
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

CREATE TABLE 'users' (
  'id' int(11) unsigned NOT NULL AUTO_INCREMENT,
  'username' text NOT NULL,
  'email' text,
  'created' date DEFAULT NULL,
  'password' text,
  PRIMARY KEY ('id')
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE 'playlists' (
  'id' int(11) unsigned NOT NULL AUTO_INCREMENT,
  'title' text,
  'user' text,
  'comment' text,
  'created' date DEFAULT NULL,
  'project' text,
  PRIMARY KEY ('id')
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

CREATE TABLE 'playlistentries' (
  'id' int(11) unsigned NOT NULL AUTO_INCREMENT,
  'user' text,
  'project' text,
  'title' text,
  'noteid' int(11) DEFAULT NULL,
  'bookid' int(11) DEFAULT NULL,
  'modified' date DEFAULT NULL,
  PRIMARY KEY ('id')
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
NOTE: Must add a unique key to playlistentries:
alter table playlistentries ADD UNIQUE KEY noteidtitle (noteid,title(100))

ADD INDEX: 
alter table tags add fulltext index tags_index (tag);
alter table notes add fulltext index notes_index (content);

-->
*/

