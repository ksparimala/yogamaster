var youtube_Key = "AIzaSyBcY7xBC8qSNeUQv39-csOZ6sWqitZ1BJw";

// ACCESS YOGA JSON API
function listOfAllYogaPoses(){
  fetch('https://raw.githubusercontent.com/rebeccaestes/yoga_api/master/yoga_api.json')
  .then(result =>
    result.json())
  .then(newResult => {
    getVariableforAllPoses(newResult)
    var newResult = newResult;
  })
  .catch(error =>
    console.log(error))
}

// ACCESS YOUTUBE API
function callYoutubeAPI(valueSelected){
  fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=how+to+do+${valueSelected}+yoga+pose&maxResults=1&&safeSearch=moderate&key=${youtube_Key}`)
  .then(youtubeResult =>
    youtubeResult.json())
  .then(youtubeResult => {
    displayOtherResults(youtubeResult.items[0]);
  })
  .catch(error =>
    console.log(error))
}

// CREATE DROPDOWN MENU
function getVariableforAllPoses(newResult){
  for(let i=0; i<newResult.length; i++){
    let allPoses = newResult[i].english_name;
    $('.select-dropdown').append(
      `
      <option class="dropdown-style" id="move-dropdown" value="${allPoses}">
        ${allPoses}
      </option>
      `)
    if(allPoses === newResult[i].english_name){
      let sanskritName = newResult[i].sanskrit_name;
      let poseImage = newResult[i].img_url;
    }
  }
  submitButton(newResult);
}

// CTA BUTTON
function submitButton(newResult){
  $('.dropdown-form').submit(event => {
    event.preventDefault();
    let valueSelected = $('.dropdown-style:selected').val();
    callYoutubeAPI(valueSelected);
    for(let i=0; i<newResult.length; i++){
      if(valueSelected === newResult[i].english_name){
        let objectSelected = newResult[i];
        cssChanges();
        displayResults(objectSelected);
      }
    }
  });
}
//JQUERY CHANGES TO CSS
function cssChanges(){
  $('.light').hide();
  $("#app-explanation").hide();
  $('#intro-background').hide();
  $('body').css('backgroundImage','url(' + './background.jpg' + ')');
  $('body').css({
    'backgroundColor':'rgba(0,0,0,0.4)',
    'backgroundRepeat':'repeat',
    'backgroundSize':'cover',
  });

}


//RESULTS DISPLAYED -YOGA
function displayResults(objectSelected){
  $('.results').empty();
  $('.results').append(`
      <div class='position-rel'>
      <div id="sanskrit-div"><p>${objectSelected.sanskrit_name}</p></div>
      </div>
      <div class='results-inline'>
      <img id="pose-img" src="${objectSelected.img_url}"></img>
      </div>

    `)
}

//MORE RESULTS DISPLAYED -YOUTUBE
function displayOtherResults(video){
  $('.results-inline').append(`
      <iframe width="560" height="315" src="https://www.youtube.com/embed/${video.id.videoId}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    `)
}

//START HERE
function init() {
	listOfAllYogaPoses();
}

$(init); //document on ready

function signIn()
{
  window.open("registration.html","_self")
}
function store(){
  
  
  var name = document.getElementById('name');
  var password = document.getElementById('pwd');
  var lowerCaseLetters = /[a-z]/g;
  var upperCaseLetters = /[A-Z]/g;
  var numbers = /[0-9]/g;

  if(name.value.length == 0){
      alert('Please fill in name');

  }else if(password.value.length == 0){
      alert('Please fill in password');

  }else if(name.value.length == 0 && password.value.length == 0){
      alert('Please fill in name and password');

  }else if(password.value.length > 8){
      alert('Max of 8');

  }else if(!password.value.match(numbers)){
      alert('please add 1 number');

  }else if(!password.value.match(upperCaseLetters)){
      alert('please add 1 uppercase letter');

  }else if(!password.value.match(lowerCaseLetters)){
      alert('please add 1 lowercase letter');

  }else{
      localStorage.setItem(name,password);
      window.open("main.html","_self");
  }
}
function signUp()
{   
    var name=document.getElementById("name").value;
    var password=document.getElementById("pwd").value;
    localStorage.setItem(name,password);
}
function logIn(){
  var storedName = localStorage.getItem('name');
  var storedPw = localStorage.getItem('password');

  var userName = document.getElementById('name1');
  var userPw = document.getElementById('pwd1');
  
  if(userName== storedName && userPw == storedPw){
      window.open("data.html","_self")
  }else{
      alert('Error on login');
  }
}