document.addEventListener("DOMContentLoaded", function () {

    const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
    if (addToCartButtons.length > 0) {
        addToCartButtons.forEach(button => {
            button.addEventListener("click", function () {
                const name = this.getAttribute("data-name");
                const price = parseFloat(this.getAttribute("data-price"));
                const img = this.getAttribute("data-img");
                let cart = JSON.parse(localStorage.getItem("mosiqatiCart")) || [];
                cart.push({ name: name, price: price, img: img });
                localStorage.setItem("mosiqatiCart", JSON.stringify(cart));
                alert(`تم إضافة (${name}) إلى سلة الطلبات الخاصة بك!`);
            });
        });
    }

    const tbody = document.getElementById("cart-items-tbody");
    const finalPriceDisplay = document.getElementById("final-price-display");
    const clearCartBtn = document.getElementById("clear-cart-btn");
    const checkoutBtn = document.getElementById("checkout-btn");

    if (tbody) {
        function displayCart() {
            let cart = JSON.parse(localStorage.getItem("mosiqatiCart")) || [];
            tbody.innerHTML = "";
            let total = 0;
            if (cart.length === 0) {
                finalPriceDisplay.textContent = "0 د.أ";
                tbody.innerHTML = `<tr><td colspan="4" style="padding: 30px; color: #7f8c8d; font-weight: bold;">العربة فارغة حاليا!.</td></tr>`;
                return;
            }
            cart.forEach((item, index) => {
                total += item.price;
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td><img src="${item.img}" alt="${item.name}" class="cart-item-img"></td>
                    <td class="product-name">${item.name}</td>
                    <td class="cart-price">${item.price} د.أ</td>
                    <td><button class="delete-item-btn" data-index="${index}">حذف</button></td>
                `;
                tbody.appendChild(row);
            });
            finalPriceDisplay.textContent = total + " د.أ";
        }

        tbody.addEventListener("click", function (event) {
            if (event.target.classList.contains("delete-item-btn")) {
                const index = parseInt(event.target.getAttribute("data-index"));
                let cart = JSON.parse(localStorage.getItem("mosiqatiCart")) || [];
                cart.splice(index, 1);
                localStorage.setItem("mosiqatiCart", JSON.stringify(cart));
                displayCart();
            }
        });

        if (clearCartBtn) {
            clearCartBtn.addEventListener("click", function () {
                if (confirm("هل تريد تفريغ العربة؟")) {
                    localStorage.removeItem("mosiqatiCart");
                    displayCart();
                }
            });
        }

        if (checkoutBtn) {
            checkoutBtn.addEventListener("click", function () {
                let cart = JSON.parse(localStorage.getItem("mosiqatiCart")) || [];
                if (cart.length === 0) {
                    alert("عربتك فارغة! قم بإضافة بعض المنتجات من المتجر أولا.");
                } else {
                    alert("شكرا لتسوقك من متجر موسيقاتي!.");
                    localStorage.removeItem("mosiqatiCart");
                    displayCart();
                }
            });
        }

        displayCart();
    }
});


function toggleTheme() {
    const body = document.body;
    const btn = document.getElementById('theme-btn');
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        btn.textContent = 'الوضع';
        localStorage.setItem('theme', 'dark');
    } else {
        btn.textContent = 'الوضع';
        localStorage.setItem('theme', 'light');
    }
}

(function() {
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        const btn = document.getElementById('theme-btn');
        if (btn) btn.textContent = 'الوضع';
    }
})();


const fontSizes = ['14px', '16px', '18px', '20px'];
let currentFontIndex = parseInt(localStorage.getItem('fontIndex')) || 1;

function changeFontSize() {
    currentFontIndex = (currentFontIndex + 1) % fontSizes.length;
    applyFontSize(currentFontIndex);
    localStorage.setItem('fontIndex', currentFontIndex);
}

function applyFontSize(index) {
    const size = fontSizes[index];
    document.querySelectorAll('body, body *').forEach(el => {
        el.style.fontSize = size;
    });
    setTimeout(function() {
        const header = document.querySelector('.header');
        const headerHeight = header ? header.offsetHeight : 80;
        const mobileMenu = document.getElementById('mobile-menu');
        const sectionsMenu = document.getElementById('sections-menu');
        if (mobileMenu) mobileMenu.style.top = headerHeight + 'px';
        if (sectionsMenu) sectionsMenu.style.top = headerHeight + 'px';
    }, 50);
}

(function() {
    const savedIndex = parseInt(localStorage.getItem('fontIndex'));
    if (!isNaN(savedIndex)) {
        currentFontIndex = savedIndex;
        document.addEventListener('DOMContentLoaded', function() {
            applyFontSize(currentFontIndex);
        });
    }
})();

function toggleMobileMenu() {
    var menu = document.getElementById('mobile-menu');
    if (menu) menu.classList.toggle('open');
}

document.addEventListener('click', function(e) {
    var menu = document.getElementById('mobile-menu');
    var btn = document.getElementById('hamburger-btn');
    if (menu && btn && !menu.contains(e.target) && !btn.contains(e.target)) {
        menu.classList.remove('open');
    }
});


function toggleSectionsMenu() {
    var menu = document.getElementById('sections-menu');
    if (menu) menu.classList.toggle('open');
}

document.addEventListener('click', function(e) {
    var sectionsMenu = document.getElementById('sections-menu');
    var sectionsBtn = document.getElementById('sections-btn');
    if (sectionsMenu && sectionsBtn && !sectionsMenu.contains(e.target) && !sectionsBtn.contains(e.target)) {
        sectionsMenu.classList.remove('open');
    }
});