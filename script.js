const checkboxes = document.querySelectorAll('input');
const labels = document.querySelectorAll('label');

var size = checkboxes.length;
var edgeTop = 0, diffFromTop = size + 1 ;
var edgeBottom = size + 1, diffFromBottom = size + 1;
var topC = [size + 1], bottomC = [0];


checkboxes.forEach(el => {
    el.addEventListener('click', handleEvent);
});

function handleEvent(e) {
    let el;
    el = e.target;
    
    applyLabelStyle(el);
    if(el.checked) {            
        if(el.value < topC[topC.length - 1]) {
            topC.push(parseInt(el.value));
            console.log(topC);
        }
        if(el.value > bottomC[bottomC.length - 1]){
            bottomC.push(parseInt(el.value));
            console.log(bottomC);
        }    
    
        if(e.shiftKey) {
            [...checkboxes].map(c => {
                if(el.value < bottomC[bottomC.length - 1] && 
                    el.value > topC[topC.length - 1] ) {
                        if (c.value <= el.value &&
                            c.value > topC[topC.length - 1]) {
                                c.checked = true;
                                applyLabelStyle(c);
                        }
                } else if (c.value > topC[topC.length - 1] && 
                    c.value < bottomC[bottomC.length - 1]) {
                        c.checked = true;
                        applyLabelStyle(c);
                }

            });
        }
    } else {
        let lenT = topC.length;
        if(el.value == topC[lenT - 1]) {
            topC.pop();
        }

        let lenB = bottomC.length;
        console.log((el.value == bottomC[lenB - 1]));
        if(el.value == bottomC[lenB - 1]) {
            bottomC.pop();
        }
    }
    
}

function applyLabelStyle(chk) {
    const label = chk.parentNode.parentNode.querySelector(`label:nth-of-type(${chk.value})`);
    if(chk.checked) {
        label.classList.add('line-through');
        label.classList.add('checked');
    } else {
        label.classList.remove('line-through');
        label.classList.remove('checked');
    }    
}