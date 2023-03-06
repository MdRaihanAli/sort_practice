const loadDta = async ()=>{
    let url = `https://openapi.programming-hero.com/api/ai/tools`
     let res = await fetch(url)
    let data = await res.json()
    filter(data.data.tools)
}


let shoted = 'no'

document.getElementById('options').addEventListener('change',(e)=>{
    shoted = e.target.value;
    loadDta()
})

const shortFun =(ha)=>{
    shoted = ha
    loadDta()
}

const filter = (datas)=>{
    if (shoted == 'name') {
        datas.sort((a,b)=>{
            if(a.name < b.name) { return -1; }
            if(a.name > b.name) { return 1; }
            return 0;
        })
    }
    if (shoted == 'date') {
        datas.sort((a,b)=>{
            let dateA = new Date(a.published_in)
            let dateB = new Date (b.published_in)   
            return dateA - dateB
        })
    }
    cardDataShow(datas);
    console.log(datas);    
}




const cardDataShow = (datas) =>{
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML=''
    datas.forEach(data => {
        let div = document.createElement('div');
        div.classList.add('card','w-full', 'bg-base-100', 'shadow-xl');

        div.innerHTML=`
        <figure><img src="${data.image}" alt="Shoes" /></figure>
        <div class="card-body">
            <h2 class="card-title">${data.name}</h2>
            <p>${data.description}</p>
            <div class="card-actions justify-end">
                <button class="btn btn-primary">Buy Now</button>
            </div>
        </div>
        
        `
        cardContainer.appendChild(div)
    });
}







loadDta()