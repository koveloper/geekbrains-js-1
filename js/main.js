function task() {
    let products = document.createElement("div");
    products.setAttribute("style", "display: flex; align-items: center; justify-content: center");
    for(let p of market.products) {
        products.appendChild(p.getDomElement());
    }
    document.querySelector("#task-answer").append(products);
    document.querySelector("#task-answer").append(market.cart.getDomElement());
}

function init() {
    for(let p of market.products) {
        p.init();
    }
}

/**
 * COMMON USED OBJECTS
 */
function Magazine() {

    function Product(id, title, price) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.imageURLs = [];
        let currentImage_ = 0;        
        let defStyles = "display: flex; align-items: center; justify-content: center;";
        let domElement = document.createElement("div");
        domElement.classList.add("product");
        domElement.setAttribute("id", "product-" + id);
        let header = document.createElement("div");
        header.setAttribute("style", defStyles + "padding: 0 8px; color: black");
        header.textContent = title;
        let image = document.createElement("div");
        image.classList.add("product-image");
        image.setAttribute("onclick", `market.getProduct(${id}).openInModal()`);
        let footer = document.createElement("div");
        footer.setAttribute("style", defStyles + "padding: 0 8px; color: lightgray");
        footer.textContent = price + " р.";
        let buy = document.createElement("button");
        buy.setAttribute("style", "width: 100%; margin: 8px 0 0 0;");
        buy.textContent = "Купить";
        buy.classList.add("action-button");
        domElement.appendChild(header);
        domElement.appendChild(image);
        domElement.appendChild(footer);
        domElement.appendChild(buy);
        buy.onclick = () => {
            market.cart.add(id);
        }
        this.getDomElement = function() {
            return domElement;
        }
        this.addImage = function(mainImgURL, smallImgURL) {
            if(mainImgURL && smallImgURL) {
                this.imageURLs.push([mainImgURL, smallImgURL]);
            } else if(mainImgURL) {
                this.imageURLs.push([mainImgURL, mainImgURL]);
            } else if(smallImgURL) {
                this.imageURLs.push([smallImgURL, smallImgURL]);
            }
            if(this.imageURLs.length == 1) {
                let img = document.createElement("img");
                img.setAttribute("src", this.imageURLs[0][1]);
                img.setAttribute("alt", "product image");
                img.setAttribute("width", "128");
                img.setAttribute("style", "width: 100%; border-radius: 8px");
                image.append(img);
            }
            return this;
        }
        this.getId = function() {
            return this.id;
        }
        this.openInModal = function() {
            console.log("openInModal " + id);
            if(!document.querySelector("#product-modal")) {
                let modalWrapper = document.createElement("div");
                modalWrapper.classList.add("product-modal-wrapper");
                modalWrapper.setAttribute("id", "product-modal");
                modalWrapper.setAttribute("onclick", `document.querySelector('#product-modal').style.maxHeight = 0`)
                let modal = document.createElement("div");
                modal.classList.add("product-modal");                
                modalWrapper.appendChild(modal);
                document.body.appendChild(modalWrapper);
            }
            let imgDiv = document.querySelector("#product-modal").querySelector(".product-modal");
            imgDiv.textContent = '';
            currentImage_ = 0;
            for(let i = 0; i < this.imageURLs.length; i++) {
                let imgRow = this.imageURLs[i];
                let img = document.createElement("img");
                img.setAttribute("src", imgRow[0]);
                img.setAttribute("alt", "product image");
                img.setAttribute("width", "128");
                img.setAttribute("onclick", `market.getProduct(${id}).toggleImage(event)`);
                img.setAttribute("style", `width: ${i == currentImage_ ? "70%" : "0"}; border-radius: 8px; transition: 0.3s`);
                imgDiv.append(img);
            }
            
            setTimeout(() => {
                document.querySelector("#product-modal").style.maxHeight = '100%';
            }, 20);
        }
        this.toggleImage = function(e) {
            e.stopPropagation();
            currentImage_ = (currentImage_ + 1) % this.imageURLs.length;
            let imgDiv = document.querySelector("#product-modal").querySelector(".product-modal");
            let images = document.querySelector("#product-modal").querySelector(".product-modal").querySelectorAll("img");
            for(let i = 0; i < images.length; i++) {
                images[i].style.width = (i == currentImage_) ? "70%" : "0";
            }
        }
    }

    function CartItem(productId) {
        let quantity_ = 1;
        this.productId = productId;
        this.setQuantity = function(value) {
            quantity_ = value;
            return this;
        }
        this.getQuantity = function() {
            return quantity_;
        }        
    }

    function Cart() {
        let items_ = new Map();
        //HTML
        let defStyles = "display: flex; align-items: center; justify-content: center;";
        let domElement = document.createElement("div");
        domElement.setAttribute("style", "min-width: 200px; border: 1px solid gray; border-radius: 4px; display: flex; flex-direction: column; align-items: center; justify-content: center; margin: 5px;");
        let header = document.createElement("div");
        header.setAttribute("style", defStyles + "padding: 0 8px; color: black");
        header.textContent = "Состояние корзины";
        let count = document.createElement("div");
        count.setAttribute("style", defStyles + "color: gray; font-size: 32px; margin: 20px");
        count.setAttribute("id", "cart-count");
        count.textContent = "пусто";
        let footer = document.createElement("div");
        footer.setAttribute("style", defStyles + "padding: 0 8px; color: lightgray");
        footer.setAttribute("id", "cart-cost");
        domElement.appendChild(header);
        domElement.appendChild(count);
        domElement.appendChild(footer);
        
        this.add = function(productId, count = 1) {
            if(items_.has(productId)) {
                items_.get(productId).setQuantity(items_.get(productId).getQuantity() + count);
            } else {
                items_.set(productId, new CartItem(productId).setQuantity(count));
            }
            document.querySelector("#cart-count").textContent = "товаров: " + this.getItemsCount();
            document.querySelector("#cart-cost").textContent = "общая сумма: " + this.getCost() + " р.";
        }
        this.getItemsCount = function() {
            return [...items_.values()].reduce((acc, el) => {
                return acc + el.getQuantity();
            }, 0);
        };
        this.getCost = function() {
            return [...items_.values()].reduce((acc, el) => {
                let prod;
                for (let p of products) {
                    if(p.id == el.productId) {
                        prod = p;
                        break;
                    }
                }
                return acc + (el.getQuantity() * prod.price);
            }, 0);
        }
        this.getDomElement = function() {
            return domElement;
        }
    }

    let id = 1;
    let products = [
        new Product(id++, "Хлеб", "55", "")
            .addImage("img/bread-0.png", "img/bread-0-min.png")
            .addImage("img/bread-1.png", "img/bread-1-min.png")
            .addImage("img/bread-2.png", "img/bread-2-min.png"),
        new Product(id++, "Масло", "160", "")
            .addImage("img/butter-0.jpg", "img/butter-0-min.png"),
        new Product(id++, "Молоко", "75", "")
            .addImage("img/milk-0.jpg", "img/milk-0-min.png")        
            .addImage("img/milk-1.jpg", "img/milk-1-min.png"),        
        new Product(id++, "Яблочный сок", "120", "")
            .addImage("img/apple-juice-0.jpg", "img/apple-juice-0-min.png")
            .addImage("img/apple-juice-1.jpg", "img/apple-juice-1-min.png"),        
        new Product(id++, "Печенье овсяное", "68", "")
            .addImage("img/snacks-0.jpg", "img/snacks-0-min.png")
            .addImage("img/snacks-1.jpg", "img/snacks-1-min.png"),
    ];

    let cart = new Cart();

    return {
        products,
        getProduct: function(id) {
            for(let p of products) {
                if(p.getId() == id) {
                    return p;
                }
            }
        },
        cart
    }
}

let market = new Magazine();