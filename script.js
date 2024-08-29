// script.js
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

document.getElementById('get-location').addEventListener('click', function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(initMap, showError);
    } else {
        document.getElementById('location-info').innerText = "Geolokatsiya xizmati ushbu brauzerda qo'llab-quvvatlanmaydi.";
    }
});

function initMap(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    
    const mapOptions = {
        center: { lat: latitude, lng: longitude },
        zoom: 15,
    };

    const map = new google.maps.Map(document.getElementById('map'), mapOptions);
    new google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map: map,
        title: 'Sizning joylashuvingiz'
    });

    document.getElementById('location-info').innerHTML = `
        Sizning joriy joylashuvingiz:
        <br>Enlik: ${latitude.toFixed(4)}
        <br>Boylik: ${longitude.toFixed(4)}
    `;
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            document.getElementById('location-info').innerText = "Joylashuv olish uchun ruxsat berilmadi.";
            break;
        case error.POSITION_UNAVAILABLE:
            document.getElementById('location-info').innerText = "Joylashuv ma'lumotlari mavjud emas.";
            break;
        case error.TIMEOUT:
            document.getElementById('location-info').innerText = "Joylashuv olish vaqtida xatolik yuz berdi.";
            break;
        case error.UNKNOWN_ERROR:
            document.getElementById('location-info').innerText = "Noma'lum xatolik.";
            break;
    }
}
