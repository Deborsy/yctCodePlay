//select all the <details> element with 'faq-item' class

const detailsElements = document.querySelectorAll('.faq-item');

detailsElements.forEach((details) =>{
    details.addEventListener('toggle', ()=>{
        if (details.open) {
            //close all other <details> elements except the one being opened
            detailsElements.forEach((item)=>{
                if (item !== details) {
                    item.removeAttribute('open');
                }
            });
        }
    });
});