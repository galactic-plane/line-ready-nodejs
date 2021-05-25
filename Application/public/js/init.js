$(function () {
  // Init Skybox(s)
  let container = document.getElementById('mainContainer');
  let skybox = new DAT.SkyBox(container);
  skybox.startScene('valley');

  // Init City AutoComplete
  let _cityelem = document.getElementById('city-input');
  options = {
    data: global_cities,
    onAutocomplete: runWeatherModal,
    limit: 10
  };
  let cityAutoCompleteInstance = M.Autocomplete.init(_cityelem, options);

  // Init Modal Bottom
  let _modalweatherelem = document.getElementById('weather-modal');
  let modalweatherinstance = M.Modal.init(_modalweatherelem, null);
  let _modalfishelem = document.getElementById('fish-modal');
  let modalfishinstance = M.Modal.init(_modalfishelem, null);

  // Init Collapsible Bottom
  let _collapsibleelem = document.querySelector('.collapsible');
  let collapsibleinstance = M.Collapsible.init(_collapsibleelem, null);

  // Side Nav Init
  let _sidenaveelem = document.querySelector('.sidenav');
  let sidenaveinstance = M.Sidenav.init(_sidenaveelem, null);

  // Tap Target
  var _tapelem = document.querySelector('.tap-target');
  var tapinstance = M.TapTarget.init(_tapelem, null);

  // Init Action button
  $('.fixed-action-btn').floatingActionButton();

  $('#tapmenu').click(function () {
    tapinstance.open();
  });

  // Init Fish Data
  $.ajax({
    url: '/api/fish',
    contentType: 'application/json',
    dataType: 'json',
    success: function (data) {
      let fishData = {};
      for (let i = 0; i < data.length; i++) {
        let entry = data[i]['Species Name'];
        fishData[entry] = data[i]['Species Illustration Photo'].src;
      }
      // Init Fish AutoComplete
      let _fishelem = document.getElementById('fish-input');
      options = {
        data: fishData,
        onAutocomplete: runfishModal,
      };
      let fishAutoCompleteInstance = M.Autocomplete.init(_fishelem, options);
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
    cache: true,
  });
});
