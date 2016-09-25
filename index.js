$(function(){

    $(".form-searchImage input").keypress(function(e) {
        if(e.which == 13){
            e.preventDefault();
            $(".form-searchImage").submit();
            var searchValue = $(".form-searchImage input").val();
            var API_KEY = "3374682-d1aa875b8db23aaadcf236ea3";
            var min_width = 960;
            var min_height = 600;
            var per_page = 200;
            var thumbnail_image,resized_thumbnail_image;
            var url = "https://pixabay.com/api/?key=" + API_KEY + "&q=" + encodeURIComponent(searchValue) + "&per_page=" + per_page ;/*+ "&min_width=" + min_width;*/
            console.log(url)
            $.getJSON(url,function(data){
                $(".image-list").empty();
                /*console.log(data)*/
                for(var i=0;i<data.hits.length;i++) {
                    thumbnail_image = data.hits[i].webformatURL; // get thumnail url
                    resized_thumbnail_image = thumbnail_image.replace(/_640/g,'_340')
                    var element = "<li style='background-image: url(" + resized_thumbnail_image + ")' </li>" ;
                    $(".image-list").append(element);
                    console.log(element)
                }
            });
        }
    });
});

