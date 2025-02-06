/*// Disable right-click
document.addEventListener('contextmenu', (event) => event.preventDefault());

// Disable F12 and other dev tools shortcuts
document.addEventListener('keydown', (event) => {
  if (event.key === 'F12' || (event.ctrlKey && event.shiftKey && event.key === 'I')) {
    event.preventDefault();
  }
});
*/
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