// get ics calendar url from the webapp url
function urlChangeEvent() {
    var urlTxt = document.getElementById('url').value
    try {
        var url = new URL(urlTxt)
        var params = url.searchParams

        // remove useless params
        params.delete('ar_codes_')
        params.delete('ar_select_')
        params.delete('highlighted_date')
        params.delete('periodo_didattico')
        params.delete('list')
        params.delete('col_cells')
        params.delete('empty_box')
        params.delete('only_grid')
        params.delete('week_grid_type')
        params.delete('all_events')
        params.delete('faculty_group')

        var ical = url.toString().replace('index.php', 'export/ec_download_ical_list.php')
    }
    catch(ex) {
        ical = invalidURL
    }

    document.getElementById('ical-button').disabled = true
    
    if(urlTxt == "")
        ical = ""
    else if(!urlTxt.includes(unimiURL))
        ical = invalidURL
    else
        document.getElementById('ical-button').disabled = false

    document.getElementById('url-ical').value = ical
}

// put the ics url in the user clipboard
function copyUrlToClipboard() {
    var url = document.getElementById('url-ical').value
    navigator.clipboard.writeText(url).then(function() {
        displayResult(true)
    }, function(err) {
        displayResult(false)
    });
}

// notify the user the result of the copy function
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

// fade in/fade out result message
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

// check if browser support clipboard APIs
if(!navigator.clipboard) {
    document.getElementById('ical-button').disabled = true
    document.getElementById('result').innerText = copyNotSupported
    document.getElementById('result').style.opacity = 1
}

urlChangeEvent()