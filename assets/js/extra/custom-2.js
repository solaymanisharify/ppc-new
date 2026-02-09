// Amazon start
fetch(
    "https://ecomclips.com/blog/wp-json/wp/v2/posts?categories=12&per_page=3&_embed"
)
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        data.forEach((posts) => {
            var markup5 = `<div class="blog-card">`;
            // Format the date to display only the date (no time)
            const postDate = new Date(posts.date);
            const formattedDate = postDate.toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            if (posts._embedded["wp:featuredmedia"]) {
                markup5 = markup5 + `<a class="thumbnail" href="${posts.link}">
                            <img class="blog-img" src="${posts._embedded["wp:featuredmedia"]["0"].source_url}" alt="">
                        </a>`;
            } else {
                markup5 = markup5 + `<a class="thumbnail" href="${posts.link}">
                            <img class="blog-img" src="http://localhost:8000/ecc-v2-php/blog/wp-content/uploads/2023/08/no_image.png" alt="">
                        </a>`;
            }

            markup5 = markup5 + `<div class="flex-list">
                        <div class="card-meta">
                            <div class="blog-meta">
                                <div class="author-meta">
                                    <div class="title-date">
                                        <p class="blog-title">${posts._embedded.author[0].name}</p>
                                        <p class="blog-date">${formattedDate}</p>
                                    </div>
                                    <div class="author-details">
                                        <p class="post-author">Amazon</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="blog-info">
                            <h5 class="blog-headline">${posts.title.rendered}</h5>
                            <p>${posts.excerpt.rendered}</p>
                            <a class="read-more-btn" href="${posts.link}">Read More <span class="read-more-arrow"><img src="./assets/images/blog/arrow.png"></span></a>
                        </div>
                    </div>

                </div>

 `;

            document
                .querySelector("#blog-cont")
                .insertAdjacentHTML("beforeend", markup5);

            document
                .querySelector("#blog-cont7")
                .insertAdjacentHTML("beforeend", markup5);
        });



    })
    .catch((error) => console.log(error));

// FOR Amazon end
// FOR Shopify START

fetch(
    "https://ecomclips.com/blog/wp-json/wp/v2/posts?categories=73&per_page=3&_embed"
)
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        data.forEach((posts) => {
            var markup5 = `<div class="blog-card">`;
            // Format the date to display only the date (no time)
            const postDate = new Date(posts.date);
            const formattedDate = postDate.toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            if (posts._embedded["wp:featuredmedia"]) {
                markup5 = markup5 + `<a class="thumbnail" href="${posts.link}">
                            <img class="blog-img" src="${posts._embedded["wp:featuredmedia"]["0"].source_url}" alt="">
                        </a>`;
            } else {
                markup5 = markup5 + `<a class="thumbnail" href="${posts.link}">
                            <img class="blog-img" src="https://ecomclips.com/blog/wp-content/uploads/2023/08/no-image.png" alt="">
                        </a>`;
            }

            markup5 = markup5 + `<div class="flex-list">
                        <div class="card-meta">
                            <div class="blog-meta">
                                <div class="author-meta">
                                    <div class="title-date">
                                        <p class="blog-title">${posts._embedded.author[0].name}</p>
                                        <p class="blog-date">${formattedDate}</p>
                                    </div>
                                    <div class="author-details">
                                        <p class="post-author">Shopify</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="blog-info">
                            <h5 class="blog-headline">${posts.title.rendered}</h5>
                            <p>${posts.excerpt.rendered}</p>
                            <a class="read-more-btn" href="${posts.link}">Read More <span class="read-more-arrow"><img src="./assets/images/blog/arrow.png"></span></a>
                        </div>
                    </div>
                </div>`;

            document
                .querySelector("#blog-cont2")
                .insertAdjacentHTML("beforeend", markup5);

            document
                .querySelector("#blog-cont8")
                .insertAdjacentHTML("beforeend", markup5);
        });
    })
    .catch((error) => console.log(error));

// FOR Shopify END
// FOR Channel Advisor START

fetch(
    "https://ecomclips.com/blog/wp-json/wp/v2/posts?categories=114&per_page=3&_embed"
)
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        data.forEach((posts) => {
            var markup5 = `<div class="blog-card">`;
            // Format the date to display only the date (no time)
            const postDate = new Date(posts.date);
            const formattedDate = postDate.toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            if (posts._embedded["wp:featuredmedia"]) {
                markup5 = markup5 + `<a class="thumbnail" href="${posts.link}">
                            <img class="blog-img" src="${posts._embedded["wp:featuredmedia"]["0"].source_url}" alt="">
                        </a>`;
            } else {
                markup5 = markup5 + `<a class="thumbnail" href="${posts.link}">
                            <img class="blog-img" src="https://ecomclips.com/blog/wp-content/uploads/2023/08/no-image.png" alt="">
                        </a>`;
            }

            markup5 = markup5 + `<div class="flex-list">
                        <div class="card-meta">
                            <div class="blog-meta">
                                <div class="author-meta">
                                    <div class="title-date">
                                        <p class="blog-title">${posts._embedded.author[0].name}</p>
                                        <p class="blog-date">${formattedDate}</p>
                                    </div>
                                    <div class="author-details">
                                        <p class="post-author">Channel Advisor</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="blog-info">
                            <h5 class="blog-headline">${posts.title.rendered}</h5>
                            <p>${posts.excerpt.rendered}</p>
                            <a class="read-more-btn" href="${posts.link}">Read More <span class="read-more-arrow"><img src="./assets/images/blog/arrow.png"></span></a>
                        </div>
                    </div>
                </div>
                `;

            document
                .querySelector("#blog-cont3")
                .insertAdjacentHTML("beforeend", markup5);

            document
                .querySelector("#blog-cont9")
                .insertAdjacentHTML("beforeend", markup5);
        });
    })
    .catch((error) => console.log(error));

// FOR Channel Advisor END
// FOR eBay START

fetch(
    "https://ecomclips.com/blog/wp-json/wp/v2/posts?categories=25&per_page=3&_embed"
)
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        data.forEach((posts) => {
            var markup5 = `<div class="blog-card">`;
            // Format the date to display only the date (no time)
            const postDate = new Date(posts.date);
            const formattedDate = postDate.toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            if (posts._embedded["wp:featuredmedia"]) {
                markup5 = markup5 + `<a class="thumbnail" href="${posts.link}">
                            <img class="blog-img" src="${posts._embedded["wp:featuredmedia"]["0"].source_url}" alt="">
                        </a>`;
            } else {
                markup5 = markup5 + `<a class="thumbnail" href="${posts.link}">
                            <img class="blog-img" src="https://ecomclips.com/blog/wp-content/uploads/2023/08/no-image.png" alt="">
                        </a>`;
            }

            markup5 = markup5 + `<div class="flex-list">
                        <div class="card-meta">
                            <div class="blog-meta">
                                <div class="author-meta">
                                    <div class="title-date">
                                        <p class="blog-title">${posts._embedded.author[0].name}</p>
                                        <p class="blog-date">${formattedDate}</p>
                                    </div>
                                    <div class="author-details">
                                        <p class="post-author">eBay</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="blog-info">
                            <h5 class="blog-headline">${posts.title.rendered}</h5>
                            <p>${posts.excerpt.rendered}</p>
                            <a class="read-more-btn" href="${posts.link}">Read More <span class="read-more-arrow"><img src="./assets/images/blog/arrow.png"></span></a>
                        </div>
                    </div>
                </div>`;

            document
                .querySelector("#blog-cont4")
                .insertAdjacentHTML("beforeend", markup5);

            document
                .querySelector("#blog-cont10")
                .insertAdjacentHTML("beforeend", markup5);
        });
    })
    .catch((error) => console.log(error));

// FOR eBay END
// FOR Ecomdash START


fetch(
    "https://ecomclips.com/blog/wp-json/wp/v2/posts?categories=85&per_page=3&_embed"
)
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        data.forEach((posts) => {
            var markup5 = `<div class="blog-card">`;
            // Format the date to display only the date (no time)
            const postDate = new Date(posts.date);
            const formattedDate = postDate.toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            if (posts._embedded["wp:featuredmedia"]) {
                markup5 = markup5 + `<a class="thumbnail" href="${posts.link}">
                            <img class="blog-img" src="${posts._embedded["wp:featuredmedia"]["0"].source_url}" alt="">
                        </a>`;
            } else {
                markup5 = markup5 + `<a class="thumbnail" href="${posts.link}">
                            <img class="blog-img" src="https://ecomclips.com/blog/wp-content/uploads/2023/08/no-image.png" alt="">
                        </a>`;
            }

            markup5 = markup5 + `<div class="flex-list">
                        <div class="card-meta">
                            <div class="blog-meta">
                                <div class="author-meta">
                                    <div class="title-date">
                                        <p class="blog-title">${posts._embedded.author[0].name}</p>
                                        <p class="blog-date">${formattedDate}</p>
                                    </div>
                                    <div class="author-details">
                                        <p class="post-author">Ecomdash</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="blog-info">
                            <h5 class="blog-headline">${posts.title.rendered}</h5>
                            <p>${posts.excerpt.rendered}</p>
                            <a class="read-more-btn" href="${posts.link}">Read More <span class="read-more-arrow"><img src="./assets/images/blog/arrow.png"></span></a>
                        </div>
                    </div>
                </div>`;

            document
                .querySelector("#blog-cont5")
                .insertAdjacentHTML("beforeend", markup5);

            document
                .querySelector("#blog-cont11")
                .insertAdjacentHTML("beforeend", markup5);
        });
    })
    .catch((error) => console.log(error));

// FOR Ecomdash END
// FOR LinnWorks START

fetch(
    "https://ecomclips.com/blog/wp-json/wp/v2/posts?categories=6&per_page=3&_embed"
)
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        data.forEach((posts) => {
            var markup5 = `<div class="blog-card">`;
            // Format the date to display only the date (no time)
            const postDate = new Date(posts.date);
            const formattedDate = postDate.toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            if (posts._embedded["wp:featuredmedia"]) {
                markup5 = markup5 + `<a class="thumbnail" href="${posts.link}">
                            <img class="blog-img" src="${posts._embedded["wp:featuredmedia"]["0"].source_url}" alt="">
                        </a>`;
            } else {
                markup5 = markup5 + `<a class="thumbnail" href="${posts.link}">
                            <img class="blog-img" src="https://ecomclips.com/blog/wp-content/uploads/2023/08/no-image.png" alt="">
                        </a>`;
            }

            markup5 = markup5 + `<div class="flex-list">
                        <div class="card-meta">
                            <div class="blog-meta">
                                <div class="author-meta">
                                    <div class="title-date">
                                        <p class="blog-title">${posts._embedded.author[0].name}</p>
                                        <p class="blog-date">${formattedDate}</p>
                                    </div>
                                    <div class="author-details">
                                        <p class="post-author">LinnWorks</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="blog-info">
                            <h5 class="blog-headline">${posts.title.rendered}</h5>
                            <p>${posts.excerpt.rendered}</p>
                            <a class="read-more-btn" href="${posts.link}">Read More <span class="read-more-arrow"><img src="./assets/images/blog/arrow.png"></span></a>
                        </div>
                    </div>
                </div>`;

            document
                .querySelector("#blog-cont6")
                .insertAdjacentHTML("beforeend", markup5);

            document
                .querySelector("#blog-cont12")
                .insertAdjacentHTML("beforeend", markup5);
        });
    })
    .catch((error) => console.log(error));


jQuery("#carouselAward").owlCarousel({
    autoplay: true,
    loop: true,
    margin: 10,
    responsiveClass: true,
    dots: true,
    nav: false,
    responsive: {
        0: {
            items: 1
        },

        600: {
            items: 3
        },

        1024: {
            items: 3
        },

        1366: {
            items: 5
        }
    }
});


jQuery("#carouselTheyTrust").owlCarousel({
    autoplay: true,
    loop: true,
    margin: 20,
    /*
animateOut: 'fadeOut',
animateIn: 'fadeIn',
*/
    responsiveClass: true,
    //   autoWidth: true,
    // autoHeight: true,
    // autoplayTimeout: 2000,
    // smartSpeed: 800,
    dots: false,
    nav: true,
    responsive: {
        0: {
            items: 1
        },

        600: {
            items: 1
        },

        1025: {
            items: 2
        },

        1366: {
            items: 5
        }
    }
});


jQuery("#carouselTheyTrustBlog").owlCarousel({
    autoplay: false,
    loop: true,
    margin: 20,
    responsiveClass: true,
    dots: false,
    nav: true,
    responsive: {
        0: {
            items: 3
        },

        600: {
            items: 3
        },

        1025: {
            items: 3
        }
    }
});
//     // Code for drawer.php
//     var inputDrawer = document.querySelector("#phone-drawer");
//     if (inputDrawer) {
//         window.intlTelInput(inputDrawer, {});
//     }

//     // Code for amazon-marketplace-management-services.php
//     var inputSidemobilef = document.querySelector("#phone-sidemobilef");
//     if (inputSidemobilef) {
//         window.intlTelInput(inputSidemobilef, {});
//     }

//     // Code for careers.php
//     var inputOne = document.querySelector("#phone-one");
//     if (inputOne) {
//         window.intlTelInput(inputOne, {});
//     }
//     var inputTwo = document.querySelector("#phone-two");
//     if (inputTwo) {
//         window.intlTelInput(inputTwo, {});
//     }
//     var inputThree = document.querySelector("#phone-three");
//     if (inputThree) {
//         window.intlTelInput(inputThree, {});
//     }
//     var inputMbc = document.querySelector("#phone-mbc");
//     if (inputMbc) {
//         window.intlTelInput(inputMbc, {});
//     }
//     var inputMbcTwo = document.querySelector("#phone-mbctwo");
//     if (inputMbcTwo) {
//         window.intlTelInput(inputMbcTwo, {});
//     }
//     var inputMbcThree = document.querySelector("#phone-mbcthree");
//     if (inputMbcThree) {
//         window.intlTelInput(inputMbcThree, {});
//     }

//     // Code for index.php
//     var inputPhone = document.querySelector("#phone");
//     if (inputPhone) {
//         window.intlTelInput(inputPhone, {});
//     }
//     var inputMb = document.querySelector("#phone-mb");
//     if (inputMb) {
//         window.intlTelInput(inputMb, {});
//     }
// });






