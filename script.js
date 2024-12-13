$(document).ready(function(){
    $('.action').hide()
    $(".grid-item").click(function(){
        $('.links').empty()
        var day = this.id
        day = day.split("day")[1] - 1
        $('.action').show()
        var action = ACTIONS[day]
        $('.title').text(action.title)
        $('.context').text(action.context)
        var linkHome = $('.links')
        Object.keys(action.links).forEach(element => {
            linkHome.append(`<a class='button' href='${action.links.element}'>${element}</a>`)
        });
        linkHome.append()
        console.log(action)
    });
  });