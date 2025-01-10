var dsaByState = {}
var ydsaByState = {}

$(document).ready(function(){
    // $('.action').append(loadDSA())
    // $('.action').append(loadYDSA())
    // $('.dsa').select2({placeholder: 'Region'})
    // $('.ydsa').select2({placeholder: 'School'})
    // $('.action').hide()
    var today = new Date()
    console.log(today.toUTCString())
    today.setHours(0,0,0,0)
    today.setUTCHours(17, 0, 0, 0)
    console.log(today)
    for (const key in ACTIONS) {
        var date = new Date(ACTIONS[key].date)
        date.setUTCHours(17, 0, 0, 0)
        if (date < today) {
            console.log(date + " already happened")
            $(".calendar").append(`<div class="grid-item revealed clickable" id="day${parseInt(key)+1}"><p>Day ${parseInt(key)+1}<small>${ACTIONS[key].date}</small></p><h2>${ACTIONS[key].title}</h2></div>`)
        } else if (date > today && (date.getDate() != today.getDate())) {
            console.log(date + " in the future")
            $(".calendar").append(`<div class="grid-item future" id="day${parseInt(key)+1}"><p>Day ${parseInt(key)+1}<br><small>${ACTIONS[key].date}</small></p></div>`)
        } else {
            console.log("TODAY!")
            $(".calendar").append(`<div class="grid-item today preclick clickable" id="day${parseInt(key)+1}"><img src="https://wallpapers.com/images/hd/open-wooden-double-doors-3bm2rk2s7eoznz0f.png"/><span><p>Day ${parseInt(key)+1}<br><small>${ACTIONS[key].date}</small></p><h2>${ACTIONS[key].title}</h2></span></div>`)
        }
    }
    $(".clickable").click(function(){
        console.log(this.id)
        if ($(`#${this.id}`).hasClass('preclick')) {
            console.log("preclick")
            $(".today img").css("animation-name", "bg-animate")
            $(".today").removeClass("preclick");
        } else {
            $('.links').empty()
            var day = this.id
            day = day.split("day")[1] - 1
            $('.modal').show()
            var action = ACTIONS[day]
            $('.title').text(action.title)
            $('.context').text(action.context)
            var linkHome = $('.links')
            Object.keys(action.links).forEach(element => {
                linkHome.append(`<button><a class='button' href='${action.links.element}'>${element}</a></button><br>`)
            });
            
            console.log(action)
        }
        
    });

    $("#myModal span").on("click", function () { 
       $("#myModal").hide()
    });

    // $(".preclick").one("click", function() {
    //     console.log("preclick")
    //     $(".today img").css("animation-name", "bg-animate")
    //     $(".today").addClass("clickable");
    //     $(".today").removeClass("preclick");
    // })


    window.onclick = function(event) {
        var modal = document.getElementById("myModal");
        if (event.target == modal) {
            modal.style.display = "none"
        }
    }

    var headerFont = screen.width
    window.onscroll = function() {scrollFunction()};  
    function scrollFunction() {
        if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
            document.getElementById("header").style.fontSize = "30px";
            document.getElementById("header").style.backgroundColor = "#ACADD2";
        } else {
            if (window.matchMedia("(max-width: 600px)").matches) {
                document.getElementById("header").style.fontSize = "64px";
                document.getElementById("header").style.background = "none";
            } else if (window.matchMedia("(max-width: 768px)").matches) {
                document.getElementById("header").style.fontSize = "72px";
                document.getElementById("header").style.backgroundColor = "none";
            } else {
                document.getElementById("header").style.fontSize = "89px";
                document.getElementById("header").style.backgroundColor = "none";
            }
            
        }
    }

    if (window.matchMedia("(max-width: 768px)").matches) {

    }

   

    // $('.revealed').append(`<h2>${this.id}</h2>`)
    // $(".ydsa").change(function() {
        
    // })
  });

function scrollToday() {
    $('html, body').animate({
        scrollTop: $('.today').offset().top - 80
      }, 1000); // Adjust the duration (in milliseconds) as needed
}


function loadDSA() {
    dsaByState = {}
    var toAppend = '<select class="dropdown dsa">'
    toAppend += "<option></option>"
    DSA.forEach(element => {
        var state = element.State
        if (dsaByState[state] == null) {
            dsaByState[state] = [element]
        } else {
            dsaByState[state].push(element)
        }
    });
    for (const key in dsaByState) {
        toAppend += `<optgroup label="${key}">`
        if (Object.prototype.hasOwnProperty.call(dsaByState, key)) {
            const element = dsaByState[key];
            element.forEach((chapter, i) => {
                toAppend += `<option label="dsa-${i}-${key}">`
                toAppend += chapter.Name + " " + chapter.Status
                toAppend += "</option>"
            });

        }
        toAppend += `</optgroup>`
    }
    toAppend += "</select>"
    return toAppend
}

function loadYDSA() {
    ydsaByState = {}
    var toAppend = '<select class="dropdown ydsa">'
    toAppend += "<option></option>"
    YDSA.forEach(element => {
        var state = element.State
        if (ydsaByState[state] == null) {
            ydsaByState[state] = [element]
        } else {
            ydsaByState[state].push(element)
        }
    });

    // Convert to array of key-value pairs
    const entries = Object.entries(ydsaByState);

    // Sort by keys
    entries.sort((a, b) => a[0].localeCompare(b[0]));

    // Convert back to object
    ydsaByState = Object.fromEntries(entries);

    for (const key in ydsaByState) {
        toAppend += `<optgroup label="${key}">`
        if (Object.prototype.hasOwnProperty.call(ydsaByState, key)) {
            const element = ydsaByState[key];
            element.forEach((chapter, i) => {
                toAppend += `<option label="ydsa-${i}-${key}">`
                toAppend += chapter.Name
                toAppend += "</option>"
            });

        }
        toAppend += `</optgroup>`
    }
    toAppend += "</select>"
    return toAppend
}