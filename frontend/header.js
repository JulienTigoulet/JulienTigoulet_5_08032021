        // création headerContainer
        const header =document.querySelector("header");
        let headerContainer = document.createElement("div");
        headerContainer.classList.add("container-fluid","headerContainer");
        header.appendChild(headerContainer);

        // création de headerRow
        let headerRow = document.createElement("div");
        headerRow.classList.add("row","align-items-end","headerRow");
        headerContainer.appendChild(headerRow);
        // création headerImg
        let headerImg = document.createElement("img");
        headerImg.setAttribute("src","../backend/images/logo.png");
        headerImg.setAttribute("alt", "logo Orinoco");
        headerImg.setAttribute("width",200);
        headerRow.appendChild(headerImg);
        // création navbar
        let nav = document.createElement("nav");
        nav.classList.add("navbar","navbar-expand");
        headerRow.appendChild(nav);

        let ulNav = document.createElement("ul");
        ulNav.classList.add("navbar-nav");
        nav.appendChild(ulNav);

        let liNavActive = document.createElement("li");
        liNavActive.classList.add("nav-item","active");
        ulNav.appendChild(liNavActive);

        let liNav = document.createElement("li");
        liNav.classList.add("nav-item");
        ulNav.appendChild(liNav);

        let aNavActive = document.createElement("a");
        aNavActive.setAttribute("href","index.html");
        liNavActive.appendChild(aNavActive);

        let aNav = document.createElement("a");
        aNav.setAttribute("href","mon_panier.html");
        liNav.appendChild(aNav);

        let btnNavActive = document.createElement("BUTTON");
        btnNavActive.setAttribute("type","button");
        btnNavActive.classList.add("btn","btn-primary","p-2","m-2","nabar-brand");
        btnNavActive.innerHTML= "Articles";
        aNavActive.appendChild(btnNavActive);

        let btnNav = document.createElement("BUTTON");
        btnNav.setAttribute("type","button");
        btnNav.classList.add("btn","btn-primary","p-2","m-2","nabar-brand");
        btnNav.innerHTML= "Panier";
        aNav.appendChild(btnNav);