let current_index = 0;
let current_category;

async function fetch_data(category,index){
    try{

        const response = await fetch('data.json');
        const jsondata = await response.json();

        var heading = document.getElementById('html_heading');
        var para = document.getElementById('html_para');
        var video = document.getElementById('youtube_video');
        var mai = document.getElementById('content-container');
        // var caro = document.getElementById('head');
        // caro.style.display = "none";
        mai.style.display = "block";
        current_index = index;
        current_category = category;

        heading.textContent = jsondata[category][index].topic;
        para.textContent = jsondata[category][index].data;
        video.src = jsondata[category][index].link;
    }
    catch (error) {
        console.error('Error:', error);

    }

}
async function prev_option(){
    try {
        const response = await fetch('data.json');
        const jsondata = await response.json();
        const totalitems = jsondata[current_category].length;
        current_index = (current_index + 1) % totalitems;
        await fetch_data(current_category, current_index);
    } catch (error) {
        console.error('Error:', error);
    }
}

async function next_option(){
    try {
        const response = await fetch('data.json');
        const jsondata = await response.json();
        const totalitems = jsondata[current_category].length;
        current_index = (current_index - 1 + totalitems) % totalitems;
        await fetch_data(current_category, current_index);
    } catch (error) {
        console.error('Error:', error);
    }
}