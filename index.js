
$(function(){
    $(".form-searchImage input").keypress(function(e) {
        if(e.which == 13){
            e.preventDefault();     //prevent form submision reload
            fetch_images();
        }
    });
});

function fetch_images(){
    var searchValue = $(".form-searchImage input").val();
    var API_KEY = "3374682-d1aa875b8db23aaadcf236ea3";
    var per_page = 50;
    var thumbnail_image,resized_thumbnail_image,image_full;
    var url = "https://pixabay.com/api/?key=" + API_KEY + "&q=" + encodeURIComponent(searchValue) + "&per_page=" + per_page ;/*+ "&min_width=" + min_width;*/
   // console.log(url)
    $.getJSON(url,function(data){
        $(".image-list").empty();
        document.getElementById("popup").style.display="block"
        for(var i=0;i<data.hits.length;i++) {
            //console.log(data);
            thumbnail_image = data.hits[i].webformatURL; // get thumnail url
            resized_thumbnail_image = thumbnail_image.replace(/_640/g,'_340');
            image_full = data.hits[i].webformatURL;
            var element = "<li> <a target='_blank' style='background-image: url(" + resized_thumbnail_image + ")' href=" + image_full + "></a> </li>" ;
            $(".image-list").append(element);
        }
        callback(data);
    })

}

var callback = function (data) {
    console.log(data);
}
