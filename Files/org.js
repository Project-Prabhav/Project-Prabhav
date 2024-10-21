function switchDepartments() {
    const deptCol = document.querySelector('.dept-col');
    const deptCol2 = document.querySelector('.dept-col-2');
    const dept2 = document.getElementById('department-2');
    const dept3 = document.getElementById('department-3');
    const imageBetween = document.getElementById('image-between');

    const width = window.innerWidth;
    const height = window.innerHeight;
    const mediaQuery = window.matchMedia("(max-width: 1050px)");

    const excludedInterval = (width >= 1000) && (height >= 600 && height <= 720);

    if (mediaQuery.matches && !excludedInterval) {
        // Move department-2, then the image, and finally department-3
        deptCol.insertBefore(dept2, dept3);
        deptCol.insertBefore(imageBetween, dept3);
    } else if ((!mediaQuery.matches && excludedInterval) || (!excludedInterval && !mediaQuery.matches)) {
        // Restore original positions
        deptCol2.insertBefore(dept2, deptCol2.firstChild);
        deptCol.appendChild(dept3);
        deptCol.parentNode.insertBefore(imageBetween, deptCol2);
    }
    const deptColH1s = deptCol.querySelectorAll('h1');
    const deptCol2H1s = deptCol2.querySelectorAll('h1');

    if (excludedInterval) {
        imageBetween.style.width = "32vw";
        imageBetween.style.height = "51vh";
        imageBetween.style.marginTop = "25vh";

        // Set font size to 6vw if in the exclusion interval
        deptColH1s.forEach(h1 => h1.style.fontSize = '2.5vw');
        deptCol2H1s.forEach(h1 => h1.style.fontSize = '2.5vw');
        deptColH1s.forEach(h1 => h1.style.marginTop = '1vh');
        deptCol2H1s.forEach(h1 => h1.style.marginTop = '1vh');
        deptColH1s.forEach(h1 => h1.style.marginLeft = '2vw');
        deptCol2H1s.forEach(h1 => h1.style.marginRight = '0');
        deptCol2H1s.forEach(h1 => h1.style.marginLeft = '1vw');
    } else {
        // Reset font size to default
        imageBetween.style.width = "";
        imageBetween.style.height = "";
        imageBetween.style.marginTop = "";

        deptColH1s.forEach(h1 => {
            h1.style.fontSize = '';
            h1.style.marginTop = '';
            h1.style.marginLeft = '';
        });
        deptCol2H1s.forEach(h1 => {
            h1.style.fontSize = '';
            h1.style.marginTop = '';
            h1.style.marginLeft = '';
            h1.style.marginRight = '';
        });
    }
}

// Trigger the function when the window is resized and when the page is loaded
window.addEventListener('resize', switchDepartments);
document.addEventListener('DOMContentLoaded', switchDepartments);

// Function to reposition triangles dynamically
function repositionTriangles() {
    const deptName2 = document.querySelector('.dept-2-name');
    const deptDetails2 = document.querySelector('.dept-2-details');
    const triangle2 = document.querySelector('.dept-name-tri-2');
    const innerTri2 = document.querySelector('.inner-tri-2');

    const deptName4 = document.querySelector('.dept-4-name');
    const deptDetails4 = document.querySelector('.dept-4-details');
    const triangle4 = document.querySelector('.dept-name-tri-4');
    const innerTri4 = document.querySelector('.inner-tri-4');

    const mediaQuery = window.matchMedia("(max-width: 1050px)");

    const width = window.innerWidth;
    const height = window.innerHeight;

    const excludedInterval = (width >= 1000) && (height >= 600 && height <= 720);

    if (excludedInterval && mediaQuery.matches) {
        if (deptName2.previousSibling !== triangle2) {
            deptName2.parentElement.insertBefore(triangle2, deptName2);
        }

        if (deptDetails2.nextSibling !== innerTri2) {
            deptDetails2.parentElement.insertBefore(innerTri2, deptDetails2.nextSibling);
        }

        if (deptName4.previousSibling !== triangle4) {
            deptName4.parentElement.insertBefore(triangle4, deptName4);
        }

        if (deptDetails4.nextSibling !== innerTri4) {
            deptDetails4.parentElement.insertBefore(innerTri4, deptDetails4.nextSibling);
        }
    } else if (!excludedInterval && mediaQuery.matches) {
        if (deptName2.nextSibling !== triangle2) {
            deptName2.parentElement.insertBefore(triangle2, deptName2.nextSibling);
        }

        if (deptDetails2.previousSibling !== innerTri2) {
            deptDetails2.parentElement.insertBefore(innerTri2, deptDetails2);
        }

        if (deptName4.nextSibling !== triangle4) {
            deptName4.parentElement.insertBefore(triangle4, deptName4.nextSibling);
        }

        if (deptDetails4.previousSibling !== innerTri4) {
            deptDetails4.parentElement.insertBefore(innerTri4, deptDetails4);
        }
    } else {
        if (deptName2.previousSibling !== triangle2) {
            deptName2.parentElement.insertBefore(triangle2, deptName2);
        }

        if (deptDetails2.nextSibling !== innerTri2) {
            deptDetails2.parentElement.insertBefore(innerTri2, deptDetails2.nextSibling);
        }

        if (deptName4.previousSibling !== triangle4) {
            deptName4.parentElement.insertBefore(triangle4, deptName4);
        }

        if (deptDetails4.nextSibling !== innerTri4) {
            deptDetails4.parentElement.insertBefore(innerTri4, deptDetails4.nextSibling);
        }
    }
}

window.addEventListener('resize', repositionTriangles);
window.addEventListener('load', repositionTriangles);
window.addEventListener('resize', () => {
    let windowHeight = window.innerHeight;
    let windowWidth = window.innerWidth;

    const excludedInterval = (windowWidth >= 1020 && windowWidth <= 1100) && (windowHeight >= 600 && windowHeight <= 720);

    console.log("Window height:", windowHeight, "Window width:", windowWidth);
    console.log("Inside exclusion interval:", excludedInterval);
});
