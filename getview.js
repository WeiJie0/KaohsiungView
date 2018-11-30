$(document).ready(function () {
    var api = "https://gentle-lake-49615.herokuapp.com/travel?";
    var filterapi;
    var key;
    var keyapi;
    var select;
    var selectapi;
    var free;
    var freeapi;
    var allday;
    var alldayapi;

    /* 顯示全部景點筆數 */
    $.getJSON(api, function (data) {
        $(".result-count").text(data.length);
    });

    /* 側欄地區選項 */
    var location = [];
    var locationselect;

    $.getJSON(api, function (data) {
        $.each(data, function (e, item) {
            location[e] = item.Zone;
        });
        locationselect = location.filter(function (element, index) {
            return location.indexOf(element) === index;
        })
        locationselect.forEach(function (result) {
            $("#Location").append('<option value="' + result + '">' + result + '</option>')
        })
    });

    /* 載入時顯示的內容 */
    $.getJSON(api, function (data) {
        $(".result-count").text(data.length);
        $.each(data, function (e, item) {
            $(".result").append(
                '<div class="card-body p-0 p-md-3 view" id="' + item.Id + '" data-toggle="modal" data-target="#viewmodal">' +
                '<div class="form-row">' +
                '<div class="col-sm-4 bg-cover view-img" style="background-image: url(' + item.Picture1 + ');"></div>' +
                '<div class="col-sm-8 bg-white p-3">' +
                '<p class="text-info view-title">' + item.Name + '</p>' +
                '<p class="text-truncate py-xl-4 py-0">' + item.Description + '</p>' +
                '<i class="fas fa-map-marker-alt text-secondary mr-2"></i><strong class="mr-3 text-secondary">' + item.Zone + '</strong>' +
                '<span class="badge badge-danger text-white mr-3">' + item.Ticketinfo + '</span>' +
                '<i class="far fa-calendar-alt text-secondary mr-2"></i><small class="text-secondary">' + item.Opentime + '</small>' +
                '</div>' +
                '</div>' +
                '</div>'
            )
        })
    });

    /* 篩選改變時，改變顯示的內容 */
    $('.serchbar, #Location, #Free, #Allday').change(function () {
        key = $('.serchbar').val();
        select = $('#Location').val();
        free = $('#Free').prop("checked");
        allday = $('#Allday').prop("checked");
        $('.result-tag').empty();
        /* 找出篩選條件，加入至API */
        if (key === "") {
            keyapi = "";
        } else {
            keyapi = "&q=" + key;
            $('.result-tag').append(
                '<a href="#" class="btn btn-outline-info tag tag-radius px-4 mr-2">'+key+'</a>'
            )
        }

        if (select === "all") {
            selectapi = "";
        } else {
            selectapi = "&Zone=" + select;
            $('.result-tag').append(
                '<a href="#" class="btn btn-outline-info tag tag-radius px-4 mr-2">'+select+'</a>'
            )
        }

        if (free === true) {
            freeapi = "&Ticketinfo=免費參觀";
            $('.result-tag').append(
                '<a href="#" class="btn btn-outline-info tag tag-radius px-4 mr-2">'+'免費參觀'+'</a>'
            )
        } else {
            freeapi = "";
        }

        if (allday === true) {
            alldayapi = "&Opentime=全天候開放";
            $('.result-tag').append(
                '<a href="#" class="btn btn-outline-info tag tag-radius px-4 mr-2">'+'全天候開放'+'</a>'
            )
        } else {
            alldayapi = "";
        }

        filterapi = api + keyapi + selectapi + freeapi + alldayapi;

        $.getJSON(filterapi, function (resultdata) {
            $(".result-count").text(resultdata.length);
            $(".result").empty();
            $.each(resultdata, function (e, item) {
                $(".result").append(
                    '<div class="card-body p-0 p-md-3 view" id="' + item.Id + '" data-toggle="modal" data-target="#viewmodal">' +
                    '<div class="form-row">' +
                    '<div class="col-sm-4 bg-cover view-img" style="background-image: url(' + item.Picture1 + ');"></div>' +
                    '<div class="col-sm-8 bg-white p-3">' +
                    '<p class="text-info view-title">' + item.Name + '</p>' +
                    '<p class="text-truncate py-xl-4 py-0">' + item.Description + '</p>' +
                    '<i class="fas fa-map-marker-alt text-secondary mr-2"></i><strong class="mr-3 text-secondary">' + item.Zone + '</strong>' +
                    '<span class="badge badge-danger text-white mr-3">' + item.Ticketinfo + '</span>' +
                    '<i class="far fa-calendar-alt text-secondary mr-2"></i><small class="text-secondary">' + item.Opentime + '</small>' +
                    '</div>' +
                    '</div>' +
                    '</div>'
                )
            })
        });
    });

    $('#viewmodal').on('show.bs.modal', function (event) {
        var view = $(event.relatedTarget);
        var modal = $(this);
        var viewid = view.attr('ID');
        var viewapi = api + "Id=" + viewid;

        $.getJSON(viewapi, function (resultdata) {
            $('.modal-body').empty();
            $.each(resultdata, function (e, item) {
                modal.find('.modal-title').text(item.Name);
                $('.modal-body').append(
                    '<div class="container-fluid">' +
                    '<nav class="my-3">' +
                    '<ol class="breadcrumb">' +
                    '<li class="breadcrumb-item"><a href="#">高雄</a></li>' +
                    '<li class="breadcrumb-item active" aria-current="page">' + item.Name + '</li>' +
                    '</ol>' +
                    '</nav>' +
                    '</div>' +
                    '<div class="container">' +
                    '<img class="img-fluid" src="' + item.Picture1 + '">' +
                    '<p class="h3 text-info text-center my-3">' + item.Name + '</p>' +
                    '<i class="fas fa-map-marker-alt text-secondary mr-2"></i><strong class="mr-3 text-secondary">' + item.Zone + '</strong>' +
                    '<span class="badge badge-danger text-white mr-3">' + item.Ticketinfo + '</span>' +
                    '<i class="far fa-calendar-alt text-secondary mr-2"></i><small class="text-secondary">' + item.Opentime + '</small>' +
                    '<p class="py-xl-4 py-0 my-3">' + item.Description + '</p>' +
                    '</div>'
                )
            })
        })
    })

    $('.tag').on('click',function(){
        
        console.log(tag);
    })

})