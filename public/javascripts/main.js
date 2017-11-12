(function () {
    //let httpRequest;

    document.getElementById("submit-btn").addEventListener("click", makeRequest);

    function makeRequest() {
        let state = document.getElementById("state").value;
        let city = document.getElementById("city").value;
        let neighborhood = document.getElementById("neighborhood").value;

        alert(state + city + neighborhood);
        //"/users" is the endpoint requests are sent to
        //followed by parameters you want to send to server, pay attention to the format
        $.get("/users", {
            state: state,
            city: city,
            neighborhood: neighborhood
        }, function (data) {
            //data is the response from server
            //it's a list of json
            alert("response from server : " + data);
        });
    }
})();