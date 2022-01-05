let coinsForGraph = [];
let coins = [];
let tempInisdeModalToggledCoins = [];   
let sixthCoin = [];
let liveReportIsRunning = false;


$(() => {
    //by default, set the home page
    $.ajax({url: 'home/home.html', success: function(result){
        $('#main-container').append(result);
    }});

    //About me routing
    $.ajax({
        url: 'about/about.html'
    })
    .then(html => {
        $('#main-container').append(html)
        $('#aboutMe').hide()
    })

    // live reports
    $.ajax({
        url: 'live-reports/liveReports.html'
    })
    .then(html => {
        $('#main-container').append(html)
        $('#liveReports').hide()
    })

    $('#home-btn').click(function() {
        $('#homeBox').show()
        $('#liveReports').hide()
        $('#aboutMe').hide()
        liveReportIsRunning = false;
        $('#search-form').show()
    })

    $('#live-reports-btn').click(function() {
        $('#homeBox').hide()
        $('#aboutMe').hide()
        $('#liveReports').show()
        liveReportIsRunning = true;
        $('#search-form').hide()
    })

    $('#about-me-btn').click(function() {
        $('#homeBox').hide()
        $('#liveReports').hide()
        $('#aboutMe').show()
        liveReportIsRunning = false;
        $('#search-form').hide()

    })

    $('.nav-item a').click(function() {
        // debugger
        console.log('event.currentTarget', event.currentTarget)
        console.log('event.Target', event.Target)
        $('.active').removeClass('active')
        $(this).parent().addClass('active')
    })
})