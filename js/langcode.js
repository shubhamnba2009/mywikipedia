/*
Language code(Within atleast 5 non latin Languages
zh=Chinese,ja=Japanese,ko=Korean,ar=Arabic,he=Hebrew,el=Greek,pt=Portuguese,es=Spanish,fr=French,it=Italian
 */
var langCode = {zh:"zh",ja:"ja",it:"it",ko:"ko",ar:"ar",he:"he",el:"el",pt:"pt",es:"es",fr:"fr"};
var sel = document.getElementById('language');
var autoNymVar;
for(var key in langCode)
{
    //forming URL for MediaWiki API:Langbacklinks
    var nativeUrl='https://en.wikipedia.org/w/api.php?action=query&titles=Albert%20Einstein&prop=langlinks&callback=?&llprop=autonym&lllang='+langCode[key]+'&format=json';
console.log(nativeUrl);
    //Retrieving the JSON response
    $.ajax({
        url: nativeUrl,
        jsonp:"callback",
        data: {
            format: 'json'
        },
        dataType: 'jsonp'
    }).done( function ( data ) {
        //Reading and saving the Language Code from JSON response
        autoNymVar=data.query.pages[736].langlinks[0].autonym;

        //code for populating dropdown values
        var opt = document.createElement('option');
        opt.innerHTML = autoNymVar;
        opt.value = data.query.pages[736].langlinks[0].lang;
        sel.appendChild(opt);
    } );
}

//Function to display the content after clicking Fetch button
function displayContent() {
    //Retrieving the search query and language code from DOM
    var searchQuery = document.getElementById('input-box').value;
    var language = document.getElementById("language");
    var langCode = language.options[language.selectedIndex].value;

    //Forming the URL for MediaWiki REST API
    var wikiUrl = "https://"+langCode+".wikipedia.org/api/rest_v1/page/mobile-sections/"+searchQuery;
    console.log(wikiUrl);

    //Retrieving the JSON response
    $.ajax({
        url: wikiUrl,
        jsonp:"callback",
        dataType: 'json',
        // Display error after timeout
        timeout: 5000,
        error:function (){
            //Setting error Message
            document.getElementById("dispContent").innerHTML="<h1 align='center'>Error 404 <br> Page Not Found</h1>";
        }
    }).done( function ( data ) {

        //Reading the JSON response
        var contentText = data.lead.sections[0].text;
        var title = data.lead.displaytitle;

        //Display the content for the search Query
        document.getElementById("title_name").innerHTML=title;
        console.log(contentText);
        document.getElementById("dispContent").innerHTML=contentText;
    } );
}