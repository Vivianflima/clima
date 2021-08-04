document.querySelector(".busca").addEventListener('submit',async (event) =>{
  event.preventDefault();

    let input = document.querySelector('#searchInput').value;

    if(input !== ""){
      clearInfo();
      showWarning("Carregando...");
      //manipulação de API 
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=36027680ca898844a5973e59817d71ab&units=metric&lang=pt_br`;

      let results = await fetch(url);
      let json = await results.json();
        //200 é o código de quando acha uma cidade válida 
      if(json.cod === 200){
          showInfo({
            
            //requisições internas de API
            name: json.name,
            country: json.sys.country,
            temp: json.main.temp,
            sensterm: json.main.feels_like,
            temp_max: json.main.temp_max,
            temp_min: json.main.temp_min,
            tempIcon: json.weather[0].icon,
            icondesc: json.weather[0].description,
            windSpeed: json.wind.speed,
            windAngle: json.wind.deg,
            

          
          });
      } else{
        clearInfo();
        showWarning('Não encontramos esta localização.');
      }
    } else{
      clearInfo();
    }
  
    


//minha key
//appid=36027680ca898844a5973e59817d71ab
});

function showInfo(json){
  showWarning('');

  
  document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
  document.querySelector('.tempInfo').innerHTML = `${json.temp}<sup>ºC</sup>`;
  document.querySelector('.senseInfo').innerHTML = `${json.sensterm}<sup>ºC</sup>`;
  document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed}<span>km/h</span>`;
  document.querySelector('.temp img').setAttribute('src',`http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
  document.querySelector('.tempDesc').innerHTML = `${json.icondesc}`.toUpperCase();
  document.querySelector('.tempMaxInfo').innerHTML = `${json.temp_max}<sup>ºC</sup>`;
  document.querySelector('.tempMinInfo').innerHTML = `${json.temp_min}<sup>ºC</sup>`;
  document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle-90}deg)`;
  document.querySelector('.resultado').style.display = 'block';
  
}

function clearInfo(){
  showWarning("");
  document.querySelector('.resultado').style.display = 'none';
}

function showWarning(msg){
  document.querySelector('.aviso').innerHTML = msg;
}
