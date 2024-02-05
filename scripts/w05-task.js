/* W05: Programming Tasks */

/* Declare and initialize global variables */
const templesElement = document.getElementById('temples');
let templeList = [];

/* async displayTemples Function */
const displayTemples = (temples) => {
    // Clear the displayed list of temples
    reset();

    temples.forEach((temple) => {
        // Create an HTML <article> element
        const article = document.createElement('article');

        // Create an HTML <h3> element and add the temple's templeName property
        const h3 = document.createElement('h3');
        h3.textContent = temple.templeName;

        // Create an HTML <img> element and add the temple's imageUrl property to the src attribute
        // and the temple's location property to the alt attribute.
        const img = document.createElement('img');
        img.src = temple.imageUrl;
        img.alt = temple.location;

        // Append the <h3> element and the <img> element to the <article> element as children.
        article.appendChild(h3);
        article.appendChild(img);

        // Append the <article> element to the global templesElement variable declared above.
        templesElement.appendChild(article);
    });
};

/* async getTemples Function using fetch()*/

const getTemples = async () => {
    const response = await fetch('https://byui-cse.github.io/cse121b-ww-course/resources/temples.json');
    templeList = await response.json();
    displayTemples(templeList);
};

/* reset Function */
const reset = () => {
    // Clear all <article> elements from the templesElement
    templesElement.innerHTML = '';
};

/* filterTemples Function */

// Function: filterTemples()
const filterTemples = (temples) => {
    // Clear the displayed list of temples
    reset();

    // Obtain the value of the HTML element with the ID of 'filtered' (The pull-down menu)
    const filter = document.getElementById('filtered').value;

    // Use a switch statement that uses the filter value as the selector responding to four (4) cases.
    switch (filter) {
        case 'utah':
            // Filter for temples where the location contains "Utah" as a string.
            displayTemples(temples.filter((temple) => temple.location.includes('Utah')));
            break;
        case 'nonutah':
            // Filter for temples where the location does not contain "Utah" as a string.
            displayTemples(temples.filter((temple) => !temple.location.includes('Utah')));
            break;
        case 'older':
            // Filter for temples where the dedicated date is before 1950.
            displayTemples(temples.filter((temple) => new Date(temple.dedicatedDate) < new Date(1950, 0, 1)));
            break;
        case 'all':
        default:
            // No filter. Just use temples as the argument.
            displayTemples(temples);
            break;
    }
};

// Event Listener: filterTemples Element change
document.getElementById('filtered').addEventListener('change', () => filterTemples(templeList));




getTemples();

/* Event Listener */
