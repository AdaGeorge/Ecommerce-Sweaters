//------darkmode--------

const darkMode = document.getElementById("dark-mode-input")

darkMode.addEventListener("click", ()=> {
    document.body.classList.toggle("dark")
})

//---x---darkmode-----x---

//------carrito--------

//--variables
let productsContainer = document.querySelector(".products")
let productsCartContainer = document.getElementById("products-cart-container")
let precioTotal = document.querySelector(".total-cart")

let buyThings = [];
let totalPrice = 0

//---functions

eventlisteners();

function eventlisteners(){
    productsContainer.addEventListener("click", addProduct)

    productsCartContainer.addEventListener("click", deleteProduct)

    productsCartContainer.addEventListener("click", addOneMore)
}

function addProduct(e){
    e.preventDefault()
    if (e.target.classList.contains("btn-buy")){
        const selectProduct = e.target.parentElement.parentElement
        readTheContent(selectProduct)
        console.log(selectProduct)
    }
}

function deleteProduct(e){
    if(e.target.classList.contains("btn-remove")){
        const deleteProduct = e.target.parentElement.parentElement.parentElement.getAttribute("id")

        buyThings.forEach(value => {
            if(value.id == deleteProduct){
                let restprice = parseFloat(value.price) * parseFloat(value.amount);
                totalPrice = totalPrice - restprice
                totalPrice = totalPrice.toFixed(2)
            }
        })
        buyThings = buyThings.filter(product => product.id !== deleteProduct)
    }
    loadHtml()
}

 function addOneMore(e){
     if(e.target.classList.contains("btn-add")){
         const addOneProduct = e.target.parentElement.parentElement.parentElement.getAttribute("id")
         buyThings.map(product => {
             if( addOneProduct === product.id ) {
                 product.amount++;
                 let addprice = parseFloat(product.price);
                totalPrice = parseFloat(totalPrice) + addprice
                totalPrice = totalPrice.toFixed(2)

             } else {
                
             }
         })
         console.log(addOneProduct)
     }
 }

 function readTheContent(product){
     const infoProduct = {
         image: product.querySelector("img").src,
         title: product.querySelector(".title-product").textContent,
         price: product.querySelector("div h4 span").textContent,
         id: product.id,
         amount: 1
     }

     totalPrice = parseFloat(totalPrice) + parseFloat(infoProduct.price)
     totalPrice = totalPrice.toFixed(2)

     const isAlreadyInCart = buyThings.some(product => product.id === infoProduct.id)
     if (isAlreadyInCart){
         buyThings.map(product => {
             if(product.id === infoProduct.id) {
                 product.amount++;
                 return product
             } else {
                 return product
             }
         })
     }else{
         buyThings = [...buyThings, infoProduct]
     }
     loadHtml()
 }

 function loadHtml(){
     clearHtml()
     buyThings.forEach(product => {
         const{image, title, price, id, amount} = product
         const html = document.createElement("div")
         html.innerHTML = `
         <div id= ${id} class="cart-product">
             <img src=${image} alt="foto producto">
             <div class="product-info">
                 <h2>${title}</h2>
                 <p class= "product-price">Price:$${price}</p>
                 <p>Amount: ${amount}</p>
                 <div>
                     <button class="btn-cart btn-remove">-</button>
                     <button class="btn-cart btn-add">+</button>
                 </div>
             </div>
         </div> 
         `

         productsCartContainer.appendChild(html)

        
     })
     precioTotal.innerHTML = totalPrice;
 }

 function clearHtml(){
     productsCartContainer.innerHTML="";
 }

