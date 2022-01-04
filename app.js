let coinsForGraph = []
let sixthCoin;
let coins = [];
let count = 0
let coinsForSearch = []

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
    

    // navbar functionality with simple  jquery 
    // let $homeBox = $('#homeBox')
    // let $liveReportsBox = $('#liveReports')
    // let $aboutMeBox = $('#aboutMe')

    $('#home-btn').click(function() {
        $('#homeBox').show()
        $('#liveReports').remove()
        $('#aboutMe').hide()
    })

    $('#live-reports-btn').click(function() {
        $('#liveReports').empty()

        $.ajax({
                url: 'live-reports/liveReports.html'
            })
            .then(html => {
               
                $('#main-container').append(html)
                $('#homeBox').hide()
                $('#aboutMe').hide()
            })
    })

    $('#about-me-btn').click(function() {
        $('#aboutMe').show()
        $('#homeBox').hide()
        $('#liveReports').empty()
    })

    $('.nav-item a').click(function() {
        // debugger
        console.log('event.currentTarget', event.currentTarget)
        console.log('event.Target', event.Target)
        $('.active').removeClass('active')
        $(this).parent().addClass('active')

    })
})