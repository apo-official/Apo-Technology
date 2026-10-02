const categoriesButton =
    document.getElementById(
        "categoriesButton"
    );

const categoryDropdown =
    document.getElementById(
        "categoryDropdown"
    );

const searchInput =
    document.getElementById(
        "searchInput"
    );

const searchButton =
    document.getElementById(
        "searchButton"
    );

const productGrid =
    document.getElementById(
        "productGrid"
    );

const products =
    document.querySelectorAll(
        ".product-card"
    );

const cartCount =
    document.getElementById(
        "cartCount"
    );

const savedCount =
    document.getElementById(
        "savedCount"
    );

const shopNowButton =
    document.getElementById(
        "shopNowButton"
    );


let cartAmount = 0;

let savedAmount = 0;


/* CATEGORY MENU */

if (
    categoriesButton
    &&
    categoryDropdown
) {

    categoriesButton.addEventListener(
        "click",
        function () {

            categoryDropdown.classList.toggle(
                "open"
            );

        }
    );

}


/* CLOSE CATEGORY MENU */

document.addEventListener(
    "click",
    function (event) {

        if (
            !categoryDropdown
            ||
            !categoriesButton
        ) {
            return;
        }

        const clickedDropdown =
            categoryDropdown.contains(
                event.target
            );

        const clickedButton =
            categoriesButton.contains(
                event.target
            );

        if (
            !clickedDropdown
            &&
            !clickedButton
        ) {

            categoryDropdown.classList.remove(
                "open"
            );

        }

    }
);


/* SEARCH */

function runSearch() {

    if (!searchInput) {
        return;
    }

    const searchTerm =
        searchInput.value
            .trim()
            .toLowerCase();


    products.forEach(
        function (product) {

            const name =
                (
                    product.dataset.name
                    ||
                    ""
                ).toLowerCase();


            if (
                searchTerm === ""
                ||
                name.includes(
                    searchTerm
                )
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


if (searchButton) {

    searchButton.addEventListener(
        "click",
        runSearch
    );

}


if (searchInput) {

    searchInput.addEventListener(
        "input",
        runSearch
    );


    searchInput.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Enter"
            ) {

                runSearch();

            }

        }
    );

}


/* CART BUTTONS */

const cartButtons =
    document.querySelectorAll(
        ".cart-button"
    );


cartButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                cartAmount += 1;


                if (cartCount) {

                    cartCount.textContent =
                        String(
                            cartAmount
                        );

                }


                const originalText =
                    button.textContent;


                button.textContent =
                    "ADDED ✓";


                button.style.background =
                    "#6757ff";


                setTimeout(
                    function () {

                        button.textContent =
                            originalText;

                        button.style.background =
                            "";

                    },
                    1000
                );

            }
        );

    }
);


/* SAVE / HEART BUTTONS */

const saveButtons =
    document.querySelectorAll(
        ".save-button"
    );


saveButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                const currentlySaved =
                    button.classList.contains(
                        "saved"
                    );


                if (currentlySaved) {

                    button.classList.remove(
                        "saved"
                    );

                    button.textContent =
                        "♡";

                    savedAmount -= 1;

                    if (
                        savedAmount < 0
                    ) {

                        savedAmount = 0;

                    }

                } else {

                    button.classList.add(
                        "saved"
                    );

                    button.textContent =
                        "♥";

                    savedAmount += 1;

                }


                if (savedCount) {

                    savedCount.textContent =
                        String(
                            savedAmount
                        );

                }

            }
        );

    }
);


/* SHOP NOW */

if (
    shopNowButton
    &&
    productGrid
) {

    shopNowButton.addEventListener(
        "click",
        function () {

            productGrid.scrollIntoView({
                behavior:
                    "smooth",

                block:
                    "start"
            });

        }
    );

}


/* CATEGORY CARDS */

const categoryCards =
    document.querySelectorAll(
        ".category-card"
    );


categoryCards.forEach(
    function (card) {

        card.addEventListener(
            "click",
            function () {

                const searchTerm =
                    card.dataset.search;


                if (
                    !searchTerm
                    ||
                    !searchInput
                ) {

                    return;

                }


                searchInput.value =
                    searchTerm;


                runSearch();


                if (productGrid) {

                    productGrid.scrollIntoView({
                        behavior:
                            "smooth",

                        block:
                            "start"
                    });

                }

            }
        );

    }
);


/* COLOR BUTTONS */

const colorButtons =
    document.querySelectorAll(
        ".color-dot"
    );


colorButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                const container =
                    button.closest(
                        ".color-options"
                    );


                if (!container) {
                    return;
                }


                const buttons =
                    container.querySelectorAll(
                        ".color-dot"
                    );


                buttons.forEach(
                    function (otherButton) {

                        otherButton.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add(
                    "active"
                );

            }
        );

    }
);


console.log(
    "APO Technology loaded successfully."
);


const products = [
    {
        name: "iPhone 17 Pro",
        brand: "Apple",
        category: "Phones",
        price: 3899,
        oldPrice: 4199,
        image: "images/iphone-17-pro.png",
        colors: ["Silver", "Black", "Orange"]
    },

    {
        name: "Samsung Galaxy S26 Ultra",
        brand: "Samsung",
        category: "Phones",
        price: 3699,
        oldPrice: 3999,
        image: "images/galaxy-s26-ultra.png",
        colors: ["Black", "Silver", "Blue"]
    },

    {
        name: "Meta Quest 3",
        brand: "Meta",
        category: "VR",
        price: 1499,
        image: "images/meta-quest-3.png",
        colors: ["White"]
    },

    {
        name: "Lenovo Legion Gaming Laptop",
        brand: "Lenovo",
        category: "Computers",
        price: 4299,
        image: "images/lenovo-legion.png",
        colors: ["Black"]
    },

    {
        name: "PlayStation 5",
        brand: "Sony",
        category: "Gaming",
        price: 1699,
        image: "images/ps5.png",
        colors: ["White"]
    }
];
