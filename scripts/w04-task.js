/* LESSON 3 - Programming Tasks */

/* Profile Object  */

let myProfile = {
    name: "Tro Opong Ebenezer",
    photo: "images/myself.jpg",
    favoriteFoods: ['Pizza', 'Chawama', 'Burgeur King' , 'Spageti'],
    hobbies: ['Dances', 'Coding', 'Research'],
    placesLived: []
};



/* Populate Profile Object with placesLive objects */
myProfile.placesLived.push({
    place: 'Abidjan, Cote D\'Ivoire',
    length: '18 year'
});

// Add additional places
myProfile.placesLived.push({
    place: 'Accra, Ghana',
    length: '2 years'
});

myProfile.placesLived.push({
    place: 'Casablanca, Moroco',
    length: '2 years'
});




/* DOM Manipulation - Output */

/* Name */

document.querySelector('#name').textContent = myProfile.name;





/* Photo with attributes */
document.querySelector('#photo').src = myProfile.photo;



document.querySelector('#photo').alt = myProfile.name;

/* Favorite Foods List*/
myProfile.favoriteFoods.forEach(food => {
    let li = document.createElement('li');
    li.textContent = food;
    document.querySelector('#favorite-foods').appendChild(li);
});


/* Hobbies List */

myProfile.placesLived.forEach(place => {
    let dt = document.createElement('dt');
    dt.textContent = place.place;
    document.querySelector('#places-lived').appendChild(dt);

    let dd = document.createElement('dd');
    dd.textContent = place.length;
    document.querySelector('#places-lived').appendChild(dd);
});

/* Places Lived DataList */


