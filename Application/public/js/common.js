// Get Javascript Objects
function getObjects(obj, key, val) {
  var objects = [];
  for (var i in obj) {
    if (!obj.hasOwnProperty(i)) continue;
    if (typeof obj[i] == 'object') {
      objects = objects.concat(getObjects(obj[i], key, val));
    } else if (i == key && obj[key] == val) {
      objects.push(obj);
    }
  }
  return objects;
}

function getBait(speciesName) {
  var settings = {
    'url': 'https://www.googleapis.com/customsearch/v1?key=' + __googleSearchKey + '&cx=006888572033803590751:h5pqpu2pb88&q=' + speciesName + ' bait',
    'method': 'GET',
    'timeout': 0,
  };

  $.ajax(settings).done(function (response) {
    let nameArray = speciesName.split(' ');
    if (nameArray && nameArray.length > 0) {
      let found = false;
      let link = '';
      let title = '';
      let snippet = '';
      for (var i = 0; i < response.items.length; i++) {
        for (var j = 1; j < nameArray.length; j++) {
          if (response.items[i].title.indexOf(nameArray[j]) !== -1) {
            link = response.items[i].link;
            title = response.items[i].title;
            snippet = response.items[i].snippet;
            found = true;
            break;
          }         
        }
        if (found) {
          $('#BaitInfo').html(
            '<a href="' + link + '" target="_blank">' + title + '</a><br><br>' +
            snippet
          );
          break;
        }
      }
      if (!found) {
        $('#BaitInfo').html(
          '<a href="' + response.items[0].link + '" target="_blank">' + response.items[0].title + '</a><br><br>' +
          response.items[0].snippet
        );
      }
    } else {
      $('#BaitInfo').html(
        '<a href="' + response.items[0].link + '" target="_blank">' + response.items[0].title + '</a><br><br>' +
        response.items[0].snippet
      );
    }
  });
}

function selectFish(speciesName) {
  getBait(speciesName);
  $.ajax({
    url: '/api/fish',
    contentType: 'application/json',
    dataType: 'json',
    success: function (data) {
      let fish = getObjects(data, 'Species Name', speciesName);
      $('#speciesName').html(speciesName);
      $('#AvailabilityInfo').html(fish[0].Availability);
      $('#fishImageContainer').html(
        '<div style="padding:10px;"><img title="' + speciesName + '" src="' + fish[0]['Species Illustration Photo'].src + '" style="width:auto;height:200px;"></div>'
      );
      $('#LocationInfo').html(
        fish[0].Location
      );
      $('#PopulationInfo').html(
        fish[0]['Population Status']
      );
      $('#LearnMoreLink').html(
        '<a href="https://www.fishwatch.gov' + fish[0].Path + '" target="_blank">https://www.fishwatch.gov/' + fish[0].Path + '</a>'
      );
    },
    fail: function (xhr, status, error) {
      if (error) {
        console.log('process error: ' + error.message);
      } else if (xhr && xhr.responseJSON) {
        console.log('process error: ' + xhr.responseJSON.message);
      }
    },
    always: function () {
      console.log('finished');
    },
    cache: true
  });
}

function getForcast(cityId) {
  var settings = {
    'url': 'https://api.openweathermap.org/data/2.5/forecast?id=' + cityId + '&appid=' + __openWeatherMapKey + '&units=imperial',
    'method': 'GET',
    'timeout': 0,
  };

  $.ajax(settings).done(function (response) {

    if (response && response.list.length > 0) {
      var ctx = document.getElementById('myChart').getContext('2d');
      var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
          labels: ['2020-08-01 21:00:00', '2020-08-02 00:00:00', '2020-08-02 06:00:00'],
          datasets: [{
              label: 'Temperature',
              backgroundColor: 'rgb(2,136,209)',
              borderColor: 'rgb(0, 0, 0)',
              data: [response.list[0].main.temp, response.list[1].main.temp, response.list[2].main.temp]
            },
            {
              label: 'Feels Like',
              backgroundColor: 'rgb(244,67,54)',
              borderColor: 'rgb(0, 0, 0)',
              data: [response.list[0].main.feels_like, response.list[1].main.feels_like, response.list[2].main.feels_like]
            }
          ]
        },

        // Configuration options go here
        options: {}
      });
    }
  });
}

function runWeatherModal() {
  let $input = jQuery('#city-input');
  let city = $input.val().split(',')[0].trim();
  let state = $input.val().split(',')[1].trim();
  let cities = getObjects(usCities, 'name', city);
  let cityId = 0;
  if (cities && cities.length > 0) {
    cityId = getObjects(cities, 'state', state)[0].id;
  }
  $.ajax({
      type: 'GET',
      url: 'https://api.openweathermap.org/data/2.5/weather',
      data: {
        'appid': __openWeatherMapKey,
        'units': 'imperial',
        'id': cityId
      },
      cache: false,
      dataType: 'json'
    })
    .done(function (response) {
      getForcast(cityId);
      $('#weatherIcon').html('<img src=http://openweathermap.org/img/wn/' + response.weather[0].icon + '@4x.png>');
      $('#weatherTitle').html(response.weather[0].description.toUpperCase());
      $('#weatherDescription').html(
        '<blockquote>' +
        'Feels Like: ' + response.main.feels_like + '<br>' +
        'Humidity: ' + response.main.humidity + '<br>' +
        'Pressure: ' + response.main.pressure + '<br>' +
        'Wind Speed: ' + response.wind.speed + '<br>' +
        'Temp: ' + response.main.temp + '<br>' +
        'Temp Max: ' + response.main.temp_max + '<br>' +
        'Temp Min: ' + response.main.temp_min + '<br>' +
        '</blockquote>'
      );
      $('#locationName').html(response.name + ', ' + state);
      let _modalweatherelem = document.getElementById('weather-modal');
      let modalweatherinstance = M.Modal.getInstance(_modalweatherelem);
      modalweatherinstance.open();
      let lat = response.coord.lat;
      let lon = response.coord.lon;
      window.setTimeout(function () {
        $('#nullSchool').attr('src', 'https://earth.nullschool.net/#current/wind/surface/level/overlay=precip_3hr/orthographic=' + lon + ',' + lat + ',3000/loc=' + lon + ',' + lat + '');
        $('#weatherInfo').attr('src', 'https://www.weatherwx.com/forecast.php?forecast=hourly&place=' + response.name.toLowerCase() + '&state=' + state.toLowerCase() + '&country=us&config=png&alt=hwitransparentwww&hwvbg=transparent');
      }, 500);
    })
    .fail(function (jqXHR, exception) {
      var msg_err = '';
      if (jqXHR.status === 0) {
        msg_err = 'Not connect. Verify Network.';
      } else if (jqXHR.status == 404) {
        msg_err = 'Requested page not found. [404]';
      } else if (jqXHR.status == 500) {
        msg_err = 'Internal Server Error [500].';
      } else if (exception === 'parsererror') {
        msg_err = 'Requested JSON parse failed.';
      } else if (exception === 'timeout') {
        msg_err = 'Time out error.';
      } else if (exception === 'abort') {
        msg_err = 'Ajax request aborted.';
      } else {
        msg_err = 'Uncaught Error. ' + jqXHR.responseText;
      }
      console.log(msg_err);
    })
    .always(function () {
      console.log('complete');
    });
}

function runfishModal() {
  let $input = jQuery('#fish-input');
  selectFish($input.val());
  let _modalfishelem = document.getElementById('fish-modal');
  let modalfishinstance = M.Modal.getInstance(_modalfishelem);
  modalfishinstance.open();
}