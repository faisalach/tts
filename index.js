const config   = [
    {  
        no  : 1,
        jawaban : "HTML"
    },
    {
        no  : 2,
        jawaban : "react"
    },
    {  
        no  : 3,
        jawaban : "responsive"
    },
    {
        no  : 4,
        jawaban : "css"
    },
    {
        no  : 5,
        jawaban : "frontend"
    },
    {
        no  : 6,
        jawaban : "javascript"
    },
    {
        no  : 7,
        jawaban : "api"
    },
    {
        no  : 8,
        jawaban : "php"
    },
    {
        no  : 9,
        jawaban : "git"
    },
];
const blocking = (no,type) => {
    reset();
    let elArr  = [];
    if(type == "mendatar"){
        elArr  = mendatar(no);
    }else{
        elArr  = menurun(no);
    }

    elArr.forEach((el) => {
        if(!el.classList.contains("success")){
            el.classList.add("block");
            el.disabled = false;
        }
    });

    inputAnswer(no,elArr);
}

const reset = () => {
    const inputElArr = document.querySelectorAll("input");
    inputElArr.forEach((el) => {
        if(!el.classList.contains("success")){
            el.value = "";
        }
        el.classList.remove("failed");
        el.classList.remove("block");
        el.disabled = true;
    })
}

const mendatar = (no) => {
    const start     = document.querySelector(`[data-no='${no}']`);

    const td        = start.closest("td");
    const td_arr    = td.closest("tr").children;
    const index     = Array.prototype.indexOf.call(td_arr, td);

    const elArr     = [];
    
    for(key in td_arr){
        if(key >= index){
            if(td_arr[key].children.length > 0){
                let input = td_arr[key].getElementsByClassName("input")[0];
                elArr.push(input);
            }else{
                break;
            }
        }
    }
    return elArr;
}

const menurun = (no) => {
    const start     = document.querySelector(`[data-no='${no}']`);

    const td        = start.closest("td");
    const td_arr    = td.closest("tr").children;
    const indexCol  = Array.prototype.indexOf.call(td_arr, td);

    const tr        = start.closest("tr");
    const tr_arr    = td.closest("tbody").children;
    const indexRow  = Array.prototype.indexOf.call(tr_arr, tr);

    const elArr     = [];
    
    for(key in tr_arr){
        if(key >= indexRow){
            if(tr_arr[key].children[indexCol].children.length > 0){
                let input = tr_arr[key].children[indexCol].getElementsByClassName("input")[0];
                elArr.push(input);
            }else{
                break;
            }
        }
    }
    return elArr;
}

const inputAnswer = (no,elArr) => {
    nextBox(0,elArr);
    elArr.forEach((el,k) => {
        el.addEventListener("keydown",(e) => {
            el.value = '';
        })
        el.addEventListener("keyup",(e) => {
            if(el.value.length > 1){
                el.value  = el.value.substr(-1,1);
            }
            if(el.value != ""){
                el.blur();
                nextBox(k,elArr);
            }
            if(el.value == "" && e.keyCode == 8){
                prevBox(k,elArr);
            }
            checkAnswer(no,elArr);
        })
        
    })
}

const nextBox = (k,elArr) => {
    let inc     = 0;
    let next    = true;
    do{
        if(elArr.length > ( k + inc)){
            if(elArr[k+inc].value == ""){
                elArr[k+inc].focus();
                next = false;
            }else{
                inc++;
            }
        }else if(elArr.length - 1 >= k){
            next = false;
        }else{
            inc++;
        }
        
    }while(next);
}

const prevBox = (k,elArr) => {
    let inc     = 1;
    let next    = true;
    do{
        if(0 <= ( k - inc)){
            console.log(inc);
            if(!elArr[k-inc].classList.contains("success")){
                elArr[k-inc].value = "";
                elArr[k-inc].focus();
                next = false;
            }else{
                inc++;
            }
        }else if(0 >= k){
            next = false;
        }else{
            inc++;
        }
        
    }while(next);
}

const checkAnswer = (no,elArr) => {
    const answer_key    = config.filter((key) => key.no == no)[0].jawaban.toLowerCase();
    let answer        = "";
    let isFinish    = 1;

    elArr.forEach((el,k) => {
        answer  += el.value;
        if( el.value == ""){
            isFinish = 0;
        }
    })
    answer  = answer.toLowerCase();
    if(isFinish){
        if(answer_key == answer){
            elArr.forEach((el) => {
                el.classList.add("success");
                el.disabled = true;
            });
            checkAllAnswer();
        }else{
            elArr.forEach((el) => {
                el.classList.add("failed");
            });
        }
    }
}

const checkAllAnswer = () => {
    const inputElArr = document.querySelectorAll("input");
    let finish       = true;
    inputElArr.forEach((el) => {
        if(!el.classList.contains("success")){
            finish = false;
        }
    })

    if(finish){
        setTimeout( () => {
            alert("CONGRATSS!!!") 
        }, 300);
    }
}


window.onload = () => {
    reset();
}