let currentPage = 1;
let totalPages;



function getUserEmail(page) {
    fetch('https://reqres.in/api/users?page=' + page,
    {
        method:'GET',
    })
    .then(function(some){
        if(some.status !== 200){
            throw some.status;
        }
        return some.json();
    })
    .then(function(jsSome){
        console.log(jsSome);

        const fragment = document.createDocumentFragment();

        jsSome.data.forEach(element=>{
            let li = document.createElement('li');
            li.classList = 'li-content';
            li.textContent = element.email;
            
            let span = document.createElement('span');
            span.textContent = ": "+element.last_name;

            li.appendChild(span);
            fragment.appendChild(li);
        })

        document.getElementById('list').innerHTML = " ";
        document.getElementById('list').appendChild(fragment);
        

        totalPages = jsSome.total_pages;
    })
    .catch(function(errorFunction){
        if(errorFunction == 404){
            let p = document.createElement('p'); 
            p.textContent = 'Page not found';
            document.getElementById('sec-section').appendChild(p);
        }else if(errorFunction == 500){
            let p = document.createElement('p');
            p.textContent = 'server error';
            document.getElementById('sec-section').appendChild(p);
        }else{
            console.log('error');
        }
    });
}



document.getElementById('next').addEventListener('click',function() {
    if(currentPage == totalPages){
        return;
    }
    currentPage +=1;

    getUserEmail(currentPage);
    idUserNameImg(currentPage);
})
document.getElementById('prev').addEventListener('click',function(){
    if(currentPage == 1){
        return;
    }
    currentPage -=1;

    getUserEmail(currentPage);
    idUserNameImg(currentPage);
})
idUserNameImg(currentPage);
getUserEmail(currentPage);


function idUserNameImg(page1) {
    let request = new XMLHttpRequest();
    function renderAll() {

        let outcome = this.responseText;
        let jsOutcome = JSON.parse(outcome);
        console.log(jsOutcome);

      
        const fragment = document.createDocumentFragment();
        jsOutcome.data.forEach(element => {

            let li1 = document.createElement('li');
            let span1 = document.createElement('span');
            let img = document.createElement('img');

            li1.textContent = element.id;
            span1.textContent = element.last_name;
            img.src = element.avatar;

            li1.appendChild(span1);
            li1.appendChild(img);
         
            fragment.appendChild(li1);
            
        });
        document.getElementById('list1').innerHTML = " ";
        document.getElementById('list1').appendChild(fragment);
        
    }
    function errorFunction() {
        let p1 = document.createElement('p');
        p1.textContent = 'server error';
        p1.style.color = 'red';

        document.getElementById('sec-section').appendChild(p1);
    }
    request.addEventListener('error',errorFunction);
    request.addEventListener('load',renderAll);
    request.open('GET','https://reqres.in/api/users?page=' + page1);
    request.send();
}




