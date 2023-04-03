let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');


let mood = 'create';
let tmp;

// console.log(title,price,taxes,ads,discount,total,count,category,submit)



// get total
function getTotal() {
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = '#040';
    } else {
        total.innerHTML = '';
        total.style.background = 'rgb(190, 65, 74)';
    }

}

//create product
let dataPro;
if (localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product)
} else {
    dataPro = [];
  
}

//save localstorge

submit.onclick = function () {
    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),

    }
    console.log(newPro);
   
//update data
if(title.value!= '' && price.value!='' && newPro.count < 100)
{
    if(mood === 'create')
    {
    
        //count
        if(newPro.count > 1)
        {
            for(let i = 0; i< newPro.count; i++)
            {
                dataPro.push(newPro);
           } }else{
            
            dataPro.push(newPro);
    
            }
        }
        else{
         dataPro[  tmp  ] = newPro;
         mood = 'create';
         count.style.display = 'block';
        }
    } 
    clearData()
}


    

    //savestorage
    localStorage.setItem('product',        JSON.stringify(dataPro)      )
     console.log(dataPro)
    
   
    clearData()
    
    
  



//clear inputs

function clearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}



//read
function showData()
{
    getTotal()

    let table = '';
    for(let i = 0; i < dataPro.lenght; i++)
    {
        
        table += `
         <tr>

        <td>${i}</td>
        <td>${dataPro.title}</td>
        <td>${dataPro.price}</td>
        <td>${dataPro.taxes}</td>
        <td>${dataPro.ads}</td>
        <td>${dataPro.discount}</td>
        <td>${dataPro.total}</td>
        <td>${dataPro.category}</td>

        <td><button onclick="updateData(${i})" id="update">update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
    </tr>
        `
        
    }

     document.getElementById("tbody").innerHTML = table;

     let btnDelete = document.getElementById('deleteAll');
          if(dataPro.lenght > 0)
     {

        btnDelete.innerHTML = `
        <button onclick="deleteAll()">delete All (${dataPro.lenght})</button>
        
        `
     }else
     {
        btnDelete.innerHTML='';
     }

}







//delete

function  deleteData()
{
    dataPro.splice(i,1);
    localStorage.product = JSON.stringify(dataPro);
    showData()
}


//deleteAll
function deleteAll()
{
    localStorage.clear()
    dataPro.splice(0)
    showData()
}



//update

function updateData(i)
{

    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    
    getTotal()
    count.style.display = 'none';

    category.value = dataPro[i].category;
    submit.innerHTML = 'Update';
    mood = 'update';
    tmp = i;
    scroll(
        {
            top:0,
            behavior:'smooth',
        }
    )
}





//search

let searchMood = 'title';
 function getSearchMood(id)
 {
    let searchs = document.getElementById('search');
    if(id == 'searchTitle')
    {
        searchMood = 'title';
        
    }else
    {
        searchMood = 'category';
        
    }
    searchs.Placeholder = 'Search By '+ searchMood;
    searchs.focus()
    searchs.value = '';
    showData()
    
 } 


function searchData(value)
{
    let table = '';
    for(let i = 0; i < dataPro.lenght; i++)
    {
   if(searchMood == 'title')
   {
    
        if(dataPro[i].title.includes(value.toLowerCase()))
        {
            table += `
            <tr>
   
           <td>${i}</td>
           <td>${dataPro.title}</td>
           <td>${dataPro.price}</td>
           <td>${dataPro.taxes}</td>
           <td>${dataPro.ads}</td>
           <td>${dataPro.discount}</td>
           <td>${dataPro.total}</td>
           <td>${dataPro.category}</td>
   
           <td><button onclick="updateData(${i})" id="update">update</button></td>
           <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
       </tr>
           `
           
        }
    



   }else{
    
        if(dataPro[i].category.includes(value))
        {
            table += `
            <tr>
   
           <td>${i}</td>
           <td>${dataPro.title}</td>
           <td>${dataPro.price}</td>
           <td>${dataPro.taxes}</td>
           <td>${dataPro.ads}</td>
           <td>${dataPro.discount}</td>
           <td>${dataPro.total}</td>
           <td>${dataPro.category}</td>
   
           <td><button onclick="updateData(${i})" id="update">update</button></td>
           <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
       </tr>
           `
           
        }
    

   }
}
   document.getElementById("tbody").innerHTML = table;

}





//clear data




