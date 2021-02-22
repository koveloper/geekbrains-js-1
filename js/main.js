function Magazine() {

    const openContentInModal = function(modalId, modalContentItemsArray) {
        if(!document.querySelector(`#${modalId}`)) {
            let modalWrapper = document.createElement("div");
            modalWrapper.classList.add("uni-modal-wrapper");
            modalWrapper.setAttribute("id", modalId);
            modalWrapper.onclick = () => {
                document.querySelector(`#${modalId}`).style.maxHeight = 0;
                productInModal_ = null;
            }
            let modal = document.createElement("div");
            modal.classList.add("uni-modal");
            modalWrapper.appendChild(modal);
            document.body.appendChild(modalWrapper);
        }
        document.querySelector(`#${modalId}`).querySelector(".uni-modal").textContent = '';
        for(let c of modalContentItemsArray) {
            document.querySelector(`#${modalId}`).querySelector(".uni-modal").append(c);
        }
        setTimeout(() => {
            document.querySelector(`#${modalId}`).style.maxHeight = '100%';
        }, 20);
    }

    let productInModal_ = null;

    const Product = function (id, title, price) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.imageURLs = [];
        let currentImage_ = 0;        
        const defStyles = "display: flex; align-items: center; justify-content: center;";
        const domElement = document.createElement("div");
        domElement.classList.add("product");
        domElement.setAttribute("id", "product-" + id);
        const header = document.createElement("div");
        header.setAttribute("style", defStyles + "padding: 0 8px; color: black");
        header.textContent = title;
        const image = document.createElement("div");
        image.classList.add("product-image");
        const footer = document.createElement("div");
        footer.setAttribute("style", defStyles + "padding: 0 8px; color: lightgray");
        footer.textContent = price + " р.";
        const buy = document.createElement("button");
        buy.setAttribute("style", "width: 100%; margin: 8px 0 0 0;");
        buy.textContent = "Купить";
        buy.classList.add("action-button");
        buy.onclick = () => {
            cart.add(id);
        }
        domElement.appendChild(header);
        domElement.appendChild(image);
        domElement.appendChild(footer);
        domElement.appendChild(buy);
        
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
                img.setAttribute("data-modal-id", this.id);
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
            const images = [];
            currentImage_ = 0;
            for(let i = 0; i < this.imageURLs.length; i++) {
                let imgRow = this.imageURLs[i];
                let img = document.createElement("img");
                img.setAttribute("src", imgRow[0]);
                img.setAttribute("alt", "product image");
                img.setAttribute("width", "128");
                img.onclick = (e) => {
                    this.nextImage(e);
                };
                img.setAttribute("style", `width: ${i == currentImage_ ? "70%" : "0"}; border-radius: 8px; transition: 0.3s`);
                images.push(img);
            }
            productInModal_ = this;
            openContentInModal("product-modal", images);
            
        }
        this.nextImage = function(e) {
            if(e) e.stopPropagation();
            currentImage_ = (currentImage_ + 1) % this.imageURLs.length;
            let images = document.querySelector("#product-modal").querySelectorAll("img");
            for(let i = 0; i < images.length; i++) {
                images[i].style.width = (i == currentImage_) ? "70%" : "0";
            }
        }
        this.previousImage = function(e) {
            if(e) e.stopPropagation();
            currentImage_ = (currentImage_ - 1) < 0 ? (this.imageURLs.length - 1) : (currentImage_ - 1);
            let images = document.querySelector("#product-modal").querySelectorAll("img");
            for(let i = 0; i < images.length; i++) {
                images[i].style.width = (i == currentImage_) ? "70%" : "0";
            }
        }
    }

    const CartItem = function(productId) {
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

    const Cart = function () {
        const items_ = new Map();
        //HTML
        const createDefDom = function() {
            const defStyles = "display: flex; align-items: flex-end; justify-content: flex-end;";
            const domElement = document.createElement("div");
            domElement.classList.add("cart");
            const header = document.createElement("div");
            header.setAttribute("style", defStyles + "padding: 0 8px; color: lightgray");
            header.textContent = "Корзина";
            const count = document.createElement("div");
            count.setAttribute("style", defStyles + "color: gray; font-size: 20px; margin: 8px");
            count.setAttribute("id", "cart-count");
            count.textContent = "пусто";
            const footer = document.createElement("div");
            footer.setAttribute("style", defStyles + "padding: 0 8px; color: gray");
            footer.setAttribute("id", "cart-cost");
            domElement.appendChild(header);
            domElement.appendChild(count);
            domElement.appendChild(footer);
            return domElement;
        }

        const openInModal = function() {
            
            const createDefCostRow = (title, price, quantity, addStyles) => {
                const pEl = document.createElement("div");
                pEl.setAttribute("style", "margin: 0 0 8px 0; min-width: 300px; display: flex; justify-content: flex-start;" + (addStyles ? addStyles : ""));
                const pElTitle = document.createElement("span");                
                pElTitle.textContent = title;
                const pElSum = document.createElement("span");                
                pElSum.setAttribute("style", "margin: 0 0 0 auto");
                pElSum.textContent = price + " р." + (quantity ? (" x " + quantity) : "");
                pEl.appendChild(pElTitle);
                pEl.appendChild(pElSum);
                return pEl;
            }

            const createPage = function(titleText, isLast = false) {
                const page = document.createElement("div");
                page.setAttribute('style', 'overflow: hidden; transition: 0.5s; display: flex; flex-direction: column; jusify-content: center; background: white; padding: 40px; border-radius: 20px; border: 1px solid lightgray');
                page.onclick = (e) => {
                    e.stopPropagation();
                }
                // page.setAttribute('id', '');
                
                const title = document.createElement("h3");
                title.setAttribute("style", "margin: 0 0 20px 0; text-align: center");
                title.textContent = titleText;
                page.appendChild(title);
                
                const pageInner = document.createElement("div");
                pageInner.setAttribute('style', 'width: 100%; display: flex; flex-direction: column; jusify-content: flex-start;');
                page.appendChild(pageInner);

                const next = document.createElement("button");
                next.setAttribute("style", "margin: 20px 0 0 0; border-radius: 4px");
                next.classList.add("action-button");
                next.textContent = isLast ? "Оформить заказ" : "Далее";
                page.appendChild(next);
                return {
                    page,
                    container: pageInner
                };
            }

            const createDefTextArea = function(id) {
                const ta = document.createElement("textarea");
                ta.setAttribute("style", "min-width: 300px; resize: none; outline: none; border: 1px solid lightgray; border-radius: 4px; min-height: 200px");
                ta.setAttribute("id", id);
                return ta;
            }

            ////
            const page1 = createPage("Состав корзины");
            const page2 = createPage("Комментарий к заказу");
            const page3 = createPage("Адрес доставки", true);
            const pages = [page1, page2, page3];
            ////
            items_.forEach((value) => {
                page1.container.appendChild(createDefCostRow(getProduct(value.productId).title, getProduct(value.productId).price, value.getQuantity()));
            });
            page1.container.appendChild(createDefCostRow("ИТОГО", cart.getCost(), 0, "font-weight: 800; border-top: 1px solid lightgray; padding: 10px 0 0 0"));
            ////
            page2.container.appendChild(createDefTextArea("commentary"));
            page3.container.appendChild(createDefTextArea("delivery"));

            let id = 0;
            for(let p of pages) {
                p.page.setAttribute("id", 'del-page-' + id);
                p.page.style.maxWidth = id == 0 ? "100%" : '0';
                p.page.style.opacity = id == 0 ? "1" : '0';
                p.page.style.visibility = id == 0 ? "visible" : 'hidden';
                p.page.style.padding = id == 0 ? "20px" : '0';
                p.page.classList.add("del-page");
                p.page.querySelector("button").setAttribute("id", 'del-page-btn-' + id);
                p.page.querySelector("button").onclick = (e) => {
                    e.stopPropagation();
                    const num = +e.target.id.replace("del-page-btn-", "") + 1;
                    const trg = document.querySelector('#del-page-' + num);
                    for(let d of [...document.querySelectorAll('.del-page')]) {
                        d.style.maxWidth = d == trg ? '100%' : '0';
                        d.style.opacity = d == trg ? '1' : '0';
                        d.style.visibility = d == trg ? 'visible' : 'hidden';
                        d.style.padding = d == trg ? '20px' : '0';
                    }
                    if(num == pages.length) {
                        document.querySelector("#cart-modal").style.maxHeight = 0;
                        items_.clear();
                        cart.add();
                    }
                }
                id++;
            }

            openContentInModal("cart-modal", pages.map((v) => {return v.page}));
        }

        const domElement = createDefDom();
        domElement.onclick = () => {
            openInModal();
        }
        
        this.add = function(productId, count = 1) {
            if(productId && count) {
                if(items_.has(productId)) {
                items_.get(productId).setQuantity(items_.get(productId).getQuantity() + count);
                } else {
                    items_.set(productId, new CartItem(productId).setQuantity(count));
                }                
            }
            document.querySelector("#cart-count").textContent = this.getItemsCount();
            document.querySelector("#cart-cost").textContent = + this.getCost() + " р.";
            domElement.style.maxHeight = this.getItemsCount() ? "100%" : "0";
            domElement.style.maxWidth = this.getItemsCount() ? "100%" : "0";
            domElement.style.opacity = this.getItemsCount() ? "1" : "0";
            domElement.style.visibility = this.getItemsCount() ? "visible" : "hidden";
            domElement.style.transition = this.getItemsCount() ? "0.2s" : "1s";
        }
        this.getItemsCount = function() {
            return [...items_.values()].reduce((acc, el) => {
                return acc + el.getQuantity();
            }, 0);
        };
        this.getCost = function() {
            return [...items_.values()].reduce((acc, el) => {
                let prod;
                for (let p of products_) {
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
    const products_ = [
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

    const getProduct = function(id) {
        for(let p of products_) {
            if(p.getId() == id) {
                return p;
            }
        }
    };

    const cart = new Cart();

    const createUi = function(container) {
        const magWrapper = document.createElement("div");
        magWrapper.setAttribute("style", "padding: 0 20px 20px 20px; background: white; border-radius: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center;");
        const magTitle = document.createElement("h2");
        magTitle.textContent = "Добро пожаловать в наш магазин";
        const products = document.createElement("div");
        products.setAttribute("style", "display: flex; align-items: center; justify-content: center; flex-wrap: wrap");
        for(let p of products_) {
            products.appendChild(p.getDomElement());
        }
        products.onclick = (e) => {
            if(e.target.dataset["modalId"] !== undefined) {           
                products_[e.target.dataset["modalId"] - 1].openInModal();
            }
        }
        container.textContent = '';
        magWrapper.append(magTitle);
        magWrapper.append(products);
        container.append(magWrapper);
        container.append(cart.getDomElement());
        document.addEventListener('keyup', (e) => {
            console.log(e);
            if(!productInModal_) {return;}
            switch(e.key) {
                case "ArrowRight": productInModal_.nextImage(); return;
                case "ArrowLeft": productInModal_.previousImage(); return;
                default: return;
            }            
        });
    }

    return {
        createUi
    }
}

let market = new Magazine();
market.createUi(document.querySelector(".main"));