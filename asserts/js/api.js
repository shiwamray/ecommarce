// common get  featch api
async function get(url) {

    const options = {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    return await fetch(url, options)
        .then((res) => res.json())
        .catch((err) => console.log(err))
};

class Pagination {
    totalItems;
    currentPage;
    pageSize;
    maxPages = 5;
    currentOffset = 0;
    startPage = 0;
    endPage = 5;
    pagesAray = [];

    constructor(totalItems, currentPage, pageSize) {
        this.totalItems = totalItems,
            this.pageSize = pageSize,
            this.totalPages = Math.ceil(totalItems / pageSize),
            this.currentOffset = (currentPage * pageSize - pageSize);


        // ensure current page isn't out of range
        if (currentPage < 1) {
            this.currentPage = 1;
        } else if (currentPage > this.totalPages) {
            this.currentPage = this.totalPages;
        } else {
            this.currentPage = currentPage;
        }

        if (this.totalPages <= this.maxPages) {
            // total pages less than max so show all pages
            this.startPage = 1;
            this.endPage = this.maxPagestotalPages;
        } else {
            // total pages more than max so calculate start and end pages
            let maxPagesBeforeCurrentPage = Math.floor(this.maxPages / 2);
            let maxPagesAfterCurrentPage = Math.ceil(this.maxPages / 2) - 1;
            if (this.currentPage <= maxPagesBeforeCurrentPage) {
                // current page near the start
                this.startPage = 1;
                this.endPage = this.maxPages;
            } else if (this.currentPage + maxPagesAfterCurrentPage >= this.totalPages) {
                // current page near the end
                this.startPage = this.totalPages - this.maxPages + 1;
                this.endPage = this.totalPages;
            } else {
                // current page somewhere in the middle
                this.startPage = this.currentPage - maxPagesBeforeCurrentPage;
                this.endPage = this.currentPage + maxPagesAfterCurrentPage;
            }

            //set pages Array
            for (let i = this.startPage; i <= this.endPage; i++) {
                this.pagesAray.push(i);
            }

        }
    }
};

//store products
let pageNo = 1;
let pageSize = document.getElementById('mySelect').value;
let paginate = new Pagination(193, pageNo, pageSize);
let products;
let paginationDiv;
let loder = document.getElementById('loder');
loder.style.display = 'none';

async function loadPagination(paginate) {
    let productDiv = document.getElementById('products');
    loder.style.display = 'flex';
    loder.scrollIntoView({ behavior: "smooth" });

    const res = await get(`https://api.escuelajs.co/api/v1/products?offset=${paginate.currentOffset}&limit=${paginate.pageSize}`)
    loder.style.display = 'none';
    products = res || [];
    console.log(res);
    let allProducts = '';
    for (let i = 0; i < products.length; i++) {
        allProducts += `<div>
                    <div class="zoom">
                        <img src="${products[i].images[0]}" alt="" width="290">
                    </div>
                    <div>
                        <span>${products[i].category.name}</span>
                        <p>${sliceString(products[i].title, 15)}</p>
                        <h3>${products[i].price} $</h3>
                        <div class="sriri-div d-flex flex-row justify-content">
                            <div class="bg-primary ml-2">

                            </div>
                            <div class="bg-warning sriri-div-active">

                            </div>
                            <div class="mb-5 bg-info">

                            </div>
                        </div>
                    </div>
                    </div>`;
    }
    productDiv.innerHTML = allProducts;
    console.log(paginate);
    //onPage pagination list load
    paginationDiv = document.getElementById('totalNoOfPages');
    let pageArray = '';
    paginate.pagesAray.forEach((i) => pageArray += `<li onclick="pageChange(${i})" class="page-item"><a class="page-link ${ ((i*paginate.pageSize - paginate.pageSize) == paginate.currentOffset) ? 'paginationActive' : ''}">${i}</a></li>`)
    paginationDiv.innerHTML = pageArray;
}
loadPagination(paginate);

function sliceString(str, chLength) {
    return str.substring(0, chLength).concat(' ...');
}


//store category
let categories;
get('https://api.escuelajs.co/api/v1/categories')
    .then((res) => {
        categories = res || [];
        console.log(categories)

        let categoriesDiv = document.getElementById('categories');

        let allCategories = '';

        for (let i = 0; i < categories.length; i++) {
            allCategories += `<P class="pt-4"><input class="mr-2" type="checkbox">${categories[i].name}</p>`
        }
        categoriesDiv.innerHTML = allCategories;
    })

function pagePrev() {
    if (pageNo > 1) {
        //add 1 to page No;
        pageNo -= 1;
        //create paginate object
        paginate = new Pagination(193, pageNo, pageSize);
        //load pagination array
        loadPagination(paginate);
    } else {
        return;
    }
}

function pageNext() {
    if (pageNo < paginate.endPage) {
        //add 1 to page No;
        pageNo += 1;
        //create paginate object
        paginate = new Pagination(193, pageNo, pageSize);
        //load pagination array
        loadPagination(paginate);
    } else {
        return;
    }
}

function pageChange(pageNo) {
    //add 1 to page No;
    pageNo = pageNo;
    //create paginate object
    paginate = new Pagination(193, pageNo, pageSize);
    //load pagination array
    loadPagination(paginate);
}

function loadItems() {
    pageSize = document.getElementById("mySelect").value;
    //create paginate object
    paginate = new Pagination(193, pageNo, pageSize);
    //load pagination array
    loadPagination(paginate);
}

//ternary operator

// () ? '' :''