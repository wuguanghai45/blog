import fetchJsonp from "fetch-jsonp";

function init() {

  fetchJsonp('https://api.map.baidu.com/location/ip?ak=1po1ho7ONvFXeT86DqETaWKiaGVajhT3&coor=bd09ll')
    .then(function(response) {
      return response.json()
    }).then(function(json) {
      if(json.status === 0) {
        let cityName = json.content.address_detail.city;
        fetch(`http://106.14.124.152:3030/?cityname=${cityName}`, {
          header: {
            "Access-Control-Allow-Origin": "*",
          },
          method: 'GET',
          mode: 'cors',
          cache: 'default'
        }).then(res=> res.text().then(res=> {
          document.getElementById("weatherPre").innerText = res;
        }))
      }
    })

}

export default {
  init: init,
}
