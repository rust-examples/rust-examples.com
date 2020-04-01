function loadScript(url, callback)
{
    // Adding the script tag to the head as suggested before
    var head = document.head;
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = callback;
    script.onload = callback;

    // Fire the loading
    head.appendChild(script);
}

var initLightbox = function() {
    lightbox.option({
        'resizeDuration': 1,
        'fadeDuration': 200,
        'imageFadeDuration': 200,
        'wrapAround': true
    });
};

loadScript("https://unpkg.com/lightbox2@2.11.1/dist/js/lightbox.min.js", initLightbox);
