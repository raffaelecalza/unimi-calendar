function urlChangeEvent() {
    var url = document.getElementById('url').value
    var ical = url.replace('index.php', 'export/ec_download_ical_list.php')
    document.getElementById('ical-button').disabled = true
    if(url == "")
        ical = ""
    else if(!url.includes(unimiURL))
        ical = invalidURL
    else
        document.getElementById('ical-button').disabled = false

    document.getElementById('url-ical').value = ical
}

function copyUrlToClipboard() {
    var url = document.getElementById('url-ical').value
    navigator.clipboard.writeText(url).then(function() {
        displayResult(true)
    }, function(err) {
        displayResult(false)
    });
}

function displayResult(success) {
    var text = ""
    if(success)
        text = alertSuccess
    else {
        text = alertError
    }

    document.getElementById('result').innerText = text
    toggleAlertText(true)
}

function toggleAlertText(on) {
    if(on) {
        document.getElementById('result').style['animation'] = 'fadeIn 0.7s';
        document.getElementById('result').style['-webkit-animation'] = 'fadeIn 0.7s';
        document.getElementById('result').style['-moz-animation'] = 'fadeIn 0.7s';
        document.getElementById('result').style['-o-animation'] = 'fadeIn 0.7s';
        document.getElementById('result').style['-ms-animation'] = 'fadeIn 0.7s';
        setTimeout(function() { document.getElementById('result').style.opacity = 1 }, 700)
        setTimeout(function() { toggleAlertText(false)}, 6000)
    }
    else {
        document.getElementById('result').style['animation'] = 'fadeOut 0.7s';
        document.getElementById('result').style['-webkit-animation'] = 'fadeOut 0.7s';
        document.getElementById('result').style['-moz-animation'] = 'fadeOut 0.7s';
        document.getElementById('result').style['-o-animation'] = 'fadeOut 0.7s';
        document.getElementById('result').style['-ms-animation'] = 'fadeOut 0.7s';
        setTimeout(function() { document.getElementById('result').style.opacity = 0 }, 699)
    }
}

if(!navigator.clipboard) {
    document.getElementById('ical-button').disabled = true
    document.getElementById('result').innerText = copyNotSupported
    document.getElementById('result').style.opacity = 1
}

urlChangeEvent()