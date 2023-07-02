let img = [
    {
        url: '../image/slader/sale_60.jpg',
    },
    {
        url: '../image/slader/top_10.jpg',
    },
    {
        url: '../image/slader/check_out.jpg',
    },
];
function initSlader(){
    const image = document.querySelector('.slader-image');
    let dots = document.querySelector('.slader-dots');
    let dots_list = [];
    let new_dots_list;
    let ind = 0;

    initDots();
    Slader(ind);
    function initDots(){
        for (let i = 0; i < img.length; i++){
            dots_list.push(`<div class="alips"  index = ${i}></div>`);
        }
        dots.innerHTML = dots_list.join('');

        new_dots_list = document.querySelectorAll('.alips');
        for (let i = 0; i < new_dots_list.length; i++){
            new_dots_list[i].addEventListener('click', function (){
                new_dots_list[ind].removeAttribute('id');
                ind = dots_list.indexOf(dots_list[i]);
                Slader(ind);
            });
        }
        setInterval(function() {
            new_dots_list[ind].removeAttribute('id');
            if (ind < new_dots_list.length - 1){
                ind++;
            }else {
                ind = 0;
            }
            Slader(ind);
        }, 5000);
    }
    function Slader(ind){
        image.style.backgroundImage = `url(${img[ind].url})`;
        new_dots_list[ind].id = 'dotActive';
    }
}
document.addEventListener('DOMContentLoaded', initSlader);
export {img, initSlader};