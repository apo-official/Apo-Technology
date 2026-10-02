const catalogButton =
    document.getElementById("catalogButton");

const catalogMenu =
    document.getElementById("catalogMenu");

const searchInput =
    document.getElementById("searchInput");

const searchButton =
    document.getElementById("searchButton");

const products =
    document.querySelectorAll(".product");

const cartCount =
    document.getElementById("cartCount");

const favoriteCount =
    document.getElementById("favoriteCount");


let cart = 0;
let favorites = 0;


/* =========================
   CATEGORY MENU
========================= */

if (catalogButton && catalogMenu) {

    catalogButton.addEventListener(
        "click",
        function () {

            catalogMenu.classList.toggle(
                "open"
            );

        }
    );

}


document.addEventListener(
    "click",
    function (event) {

        if (
            catalogMenu &&
            catalogButton &&
            !catalogMenu.contains(event.target) &&
            !catalogButton.contains(event.target)
        ) {

            catalogMenu.classList.remove(
                "open"
            );

        }

    }
);


/* =========================
   CART
========================= */

window.addToCart =
    function (button) {

        cart += 1;

        if (cartCount) {

            cartCount.textContent =
                String(cart);

        }

        const oldText =
            button.textContent;

        button.textContent =
            "ADDED ✓";

        button.style.background =
            "#29a867";

        setTimeout(
            function () {

                button.textContent =
                    oldText;

                button.style.background =
                    "";

            },
            1000
        );

    };


/* =========================
   FAVORITES
========================= */

window.toggleFavorite =
    function (button) {

        const active =
            button.classList.contains(
                "active"
            );

        if (active) {

            button.classList.remove(
                "active"
            );

            button.textContent =
                "♡";

            favorites -= 1;

        } else {

            button.classList.add(
                "active"
            );

            button.textContent =
                "♥";

            favorites += 1;

        }

        if (favorites < 0) {

            favorites = 0;

        }

        if (favoriteCount) {

            favoriteCount.textContent =
                String(favorites);

        }

    };


/* =========================
   PHONE COLORS
========================= */

window.changePhoneColor =
    function (
        imageId,
        imagePath,
        button
    ) {

        const image =
            document.getElementById(
                imageId
            );

        if (!image) {
            return;
        }

        image.style.opacity =
            "0";

        setTimeout(
            function () {

                image.src =
                    imagePath;

                image.style.opacity =
                    "1";

            },
            130
        );


        const colorContainer =
            button.parentElement;

        const buttons =
            colorContainer.querySelectorAll(
                ".color"
            );

        buttons.forEach(
            function (item) {

                item.classList.remove(
                    "active"
                );

            }
        );

        button.classList.add(
            "active"
        );

    };


/* =========================
   SEARCH
========================= */

function searchProducts() {

    if (!searchInput) {
        return;
    }

    const text =
        searchInput.value
            .trim()
            .toLowerCase();


    products.forEach(
        function (product) {

            const name =
                (
                    product.dataset.name
                    || ""
                )
                .toLowerCase();


            if (
                text === ""
                ||
                name.includes(text)
            ) {

                product.style.display =
                    "";

            } else {

                product.style.display =
                    "none";

            }

        }
    );

}


if (searchInput) {

    searchInput.addEventListener(
        "input",
        searchProducts
    );


    searchInput.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Enter"
            ) {

                searchProducts();

            }

        }
    );

}


if (searchButton) {

    searchButton.addEventListener(
        "click",
        searchProducts
    );

}


/* =========================
   HERO BUTTON
========================= */

window.scrollToProducts =
    function () {

        const phones =
            document.getElementById(
                "phones"
            );

        if (phones) {

            phones.scrollIntoView({
                behavior: "smooth"
            });

        }

    };


console.log(
    "APO Technology loaded."
);
