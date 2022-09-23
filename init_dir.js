let g_files;

var initialize = function() {
    const xhttp = new XMLHttpRequest();
    
    xhttp.onload = function() {
        console.log(this.responseText);
        g_files = JSON.parse(this.responseText);
        let HTML_folder = document.getElementById("clips_folder");


        for (var i = 0; i<=g_files.length-1; i++){
            var opt = document.createElement('option');
            opt.value = g_files[i].name;
            opt.innerHTML = g_files[i].name;
           
            HTML_folder.appendChild(opt);
        }



    }   


    xhttp.open("GET", "files", true);
    xhttp.send();

}

let selectElement = document.querySelector('.folders');
console.log(selectElement);


if (selectElement){

    selectElement.addEventListener('change', (event) => {
    
    //Change to using g_files

    const xhttp = new XMLHttpRequest();
    let folder_div = document.getElementById("folders");
    let filepath = event.target.value;
    let videoOutput = document.getElementById("video_output");

    videoOutput.src = "/video?v1=" + filepath;
    
    

    console.log(filepath);



    // console.log(this.responseText);
    //     let responseJSON = JSON.parse(this.responseText);
    //     if (responseJSON[0].name == filepath){

    //         return
    //     }


    //     let select = document.createElement('select');
    //     let videos = new Array(responseJSON.length-1);

    //     for (var i = 0; i<=responseJSON.length-1; i++){
    //         if (responseJSON[i].type == "folder"){
    //             var opt = document.createElement('option');
    //             opt.value = responseJSON[i].name;
    //             opt.innerHTML = responseJSON[i].name;
    //             select.appendChild(opt);
    //         } else{
    //             videos.push(responseJSON[i].path);
                

    //         }
            
            
    //         // if (responseJSON[i].name === event.target.value){
    //         //     let filepath = responseJSON[i].path;
    //         // }
    //     }
    //     folder_div.appendChild(select);

    xhttp.onload = function(event) {
        console.log(this.responseText);
        let responseJSON = JSON.parse(this.responseText);
        if (responseJSON[0].name == filepath){

            return
        }else{

       


        let select = document.createElement('select');
        let videos = new Array(responseJSON.length-1);

        for (var i = 0; i<=responseJSON.length-1; i++){
            if (responseJSON[i].type == "folder"){
                var opt = document.createElement('option');
                opt.value = responseJSON[i].name;
                opt.innerHTML = responseJSON[i].name;
                select.appendChild(opt);
            } else{
                videos.push(responseJSON[i].path);


            }
            
            
            // if (responseJSON[i].name === event.target.value){
            //     let filepath = responseJSON[i].path;
            // }
        }
        folder_div.appendChild(select);




    } 
}

    xhttp.open("GET", "files?file=" + filepath, true);
    xhttp.send();
});
}


// let selectE = document.querySelector('ML_script');

   