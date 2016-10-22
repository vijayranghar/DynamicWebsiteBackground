
$(function(){
    $(".form-searchImage input").keypress(function(e) {
        if(e.which == 13){
            e.preventDefault();     //prevent form submision reload
            fetch_images();
        }
    });

    /* get selected image url */
    document.getElementById("image-list").addEventListener('click',function(e){
        if(e.target.nodeName== "SPAN")
        {
            var background_url = e.target.previousSibling; // get background url
            var element = document.getElementsByClassName('wrapper');
            console.log(element+">>>")
            localStorage.setItem('background-image',background_url);
            for(var i= 0; i<element.length;i++){
                console.log(element[i].style.backgroundImage="url('"+background_url + "')");
            }

        }
    })
    var wrapper = document.getElementsByClassName('wrapper');

    /* set default background in local storage */
    if((localStorage.getItem("background-image")) == null){
        for(var i=0; i<wrapper.length; i++)
            wrapper[i].style.backgroundImage= "url("+localStorage.getItem('background-image')+ ")";
    }
    else{
        for(var i=0; i<wrapper.length; i++)
            wrapper[i].style.backgroundImage= "url("+localStorage.getItem('background-image')+ ")";
    }
});

/* AJAX fetch images request */
function fetch_images(){
    var searchValue = $(".form-searchImage input").val();
    var API_KEY = "3374682-d1aa875b8db23aaadcf236ea3";
    var per_page = 50;
    var thumbnail_image,resized_thumbnail_image,image_full;
    var url = "https://pixabay.com/api/?key=" + API_KEY + "&q=" + encodeURIComponent(searchValue) + "&per_page=" + per_page ;/*+ "&min_width=" + min_width;*/
   // console.log(url)
    $.getJSON(url,function(data){
        $(".image-list").empty();
        showPopup();
        for(var i=0;i<data.hits.length;i++) {
            //console.log(data);
            thumbnail_image = data.hits[i].webformatURL; // get thumnail url
            resized_thumbnail_image = thumbnail_image.replace(/_640/g, '_340');
            image_full = data.hits[i].webformatURL;
            var element = "<li> " +
                "<a target='_blank' style='background-image: url(" + resized_thumbnail_image + ")' href=" + image_full + "></a>" +
                "<span class='set-background'>Set as background</span> </li>";
            $("#image-list").append(element);
        }
    })

}

/* show popup after search */
function showPopup(){
    document.getElementById("popup").style.display="block";

    //popup close
    var popup = document.getElementById("popup");
    document.getElementById("close").addEventListener('click',function(){
        popup.style.display="none";
    })
    //popup close on escape key pressed
    if(popup.style.display=="block")
    {
        window.onkeydown = function (e) {
            if(e.keyCode == 27){
                popup.style.display="none";
            }
        }
    }
}

