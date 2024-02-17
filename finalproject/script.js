const apiUrl = 'https://jsonplaceholder.typicode.com/posts'; // Example API URL, replace with your own

// Function to fetch data from the API
async function fetchData() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        // Transform the data using map before returning
        const transformedData = data.map(item => ({
            id: item.id,
            title: item.title.toUpperCase(), // Example transformation: Convert title to uppercase
            body: item.body
        }));
        return transformedData;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}


// Function to display data in the DOM
// Function to display data in the DOM as a table
// Function to display data in the DOM as a table with pagination
function displayData(data, page = 1, pageSize = 10) {
    const appDiv = document.getElementById('app');
    appDiv.innerHTML = ''; // Clear previous content

    // Calculate start and end indexes for the current page
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentPageData = data.slice(startIndex, endIndex);

    // Create table element
    const table = document.createElement('table');
    table.classList.add('data-table');



    // Create table header row
    const headerRow = table.insertRow();
    const headers = ['ID', 'Title', 'Description', 'Actions']; // Table column headers
    headers.forEach(headerText => {
        const header = document.createElement('th');
        header.textContent = headerText;
        headerRow.appendChild(header);
    });

    // Create table rows with data for the current page
    currentPageData.forEach(item => {
        const row = table.insertRow();
        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.title}</td>
            <td>${item.body}</td>
            <td>
                <button class="btnedit" onclick="showEditForm(${item.id})">Edit</button>
                <button class="btndelete" onclick="deletePost(${item.id})">Delete</button>
            </td>
        `;
    });

    // Append table to the appDiv
    appDiv.appendChild(table);

    // Create pagination controls
    const totalPages = Math.ceil(data.length / pageSize);
    const paginationDiv = document.createElement('div');
    paginationDiv.classList.add('pagination');

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.addEventListener('click', function() {
            displayData(data, i, pageSize);
        });
        paginationDiv.appendChild(pageButton);
    }

    appDiv.appendChild(paginationDiv);
}



// Function to handle adding a new post
$(document).ready(function () {
    // Handle form submission
    $('#add-post-form').submit(function (e) {
        e.preventDefault(); // Prevent the default form submission

        // Serialize form data
        var formData = $(this).serialize();

        // Make an Ajax request
        $.ajax({
            type: 'POST',
            url: apiUrl, // API endpoint
            data: formData,
            dataType: 'json',
            success: function (response) {
                // Handle success response
                console.log(response);
                // Display success message
                Swal.fire({
                    title: 'Success!',
                    text: 'Post added successfully!',
                    icon: 'success',
                    showConfirmButton: false, // Hide the "OK" button
                    timer: 1500 // Auto close the alert after 1.5 seconds
                });
                // Reset form fields
                $('#titles').val('');
                $('#description').val('');
            },
            error: function (xhr, status, error) {
                // Handle error response
                console.log(xhr.responseJSON);
                // Display error message
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to add post. Please try again later.',
                    icon: 'error',
                    showConfirmButton: false, // Hide the "OK" button
                    timer: 1500 // Auto close the alert after 1.5 seconds
                });
            }
        });
    });
});

//
// Function to handle editing a post
// Function to handle editing a post

// Function to show the edit form and populate it with post data
async function showEditForm(postId) {

    try {
        // Fetch post data from the API based on the provided postId
        const postData = await fetchPostData(postId);

        // Populate edit form fields with retrieved data

        document.getElementById('edit-titles').value = postData.title;
        document.getElementById('edit-description').value = postData.body;
        document.getElementById('edit-post-id').value = postId;
        document.getElementById('edit-post-form').removeAttribute('hidden');

        // Hide the add post form
        document.getElementById('add-post-form').setAttribute('hidden', true);
    } catch (error) {
        console.error('Error showing edit form:', error);
        // Handle error, if necessary
    }
}

// Function to fetch post data by ID
async function fetchPostData(postId) {
    try {
        const response = await fetch(`${apiUrl}/${postId}`);
        const postData = await response.json();
        return postData;
    } catch (error) {
        console.error('Error fetching post data:', error);
    }
}

async function updatePostData(postId, newData) {
    try {
        const response = await fetch(`${apiUrl}/${postId}`, {
            method: 'PUT',
            body: JSON.stringify(newData),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        const updatedPost = await response.json();
        return updatedPost;
    } catch (error) {
        console.error('Error updating post data:', error);
        throw error;
    }
}


// Function to handle form submission for updating a post
async function handleUpdateFormSubmission(event) {
    event.preventDefault(); // Prevent default form submission behavior

    // Get form values
    const title = document.getElementById('edit-titles').value;
    const body = document.getElementById('edit-description').value;
    const postId = document.getElementById('edit-post-id').value; // Assuming you have a hidden input for post ID

    // Construct updated data object
    const updatedData = {
        title: title,
        body: body,
        // Include other fields if necessary
    };

    try {
        // Update post data on the server
        const updatedPost = await updatePostData(postId, updatedData);

        // Optionally, you can handle the updated post data, such as displaying a success message
        console.log('Post updated successfully:', updatedPost);

        Swal.fire({
            title: 'Success!',
            text: 'Post edit successfully!',
            icon: 'success',
            showConfirmButton: false, // Hide the "OK" button
            timer: 1500 // Auto close the alert after 1.5 seconds
        });
    } catch (error) {
        // Handle error, if necessary
        console.error('Error updating post:', error);

        Swal.fire({
            title: 'Error!',
            text: 'Failed to add post. Please try again later.',
            icon: 'error',
            showConfirmButton: false, // Hide the "OK" button
            timer: 1500 // Auto close the alert after 1.5 seconds
        });
    }
}

// Event listener for form submission
document.getElementById('edit-post-form').addEventListener('submit', handleUpdateFormSubmission);




// Function to handle deleting a post


// Function to delete post
async function deletePost(postId) {
    // Ask for confirmation before deleting using SweetAlert
    const confirmDelete = await Swal.fire({
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    });

    // Check if the user confirmed the deletion
    if (confirmDelete.isConfirmed) {
        try {
            // Send DELETE request to delete the post
            const response = await fetch(`${apiUrl}/${postId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                // If post is successfully deleted, fetch updated data and display
                const newData = await fetchData();
                displayData(newData);
                // Show success message using SweetAlert
                Swal.fire({
                    title: 'Deleted!',
                    text: 'Your post has been deleted.',
                    icon: 'success'
                });
            } else {
                console.error('Failed to delete post');
            }
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    }
}


// Function to handle search functionality
// Wait for the DOM content to be fully loaded

// Define the search function

function searchTable() {
    var term, tableRows;
    // Get the search term
    term = document.getElementById("myInput").value.toLowerCase();

    // Get table rows
    tableRows = Array.from(document.querySelectorAll(".data-table tbody tr"));

    // Loop through table rows
    tableRows.forEach(function(row) {
        // Get the row's text content in lowercase
        var rowText = row.textContent.toLowerCase();

        // Check if the row matches the search term
        if (rowText.indexOf(term) > -1) {
            // If it matches, display the row
            row.style.display = "";
        } else {
            // If it doesn't match, hide the row
            row.style.display = "none";
        }
    });
}





// Event listener for the search input field





// Initial function to fetch data and display it
async function init() {
    const data = await fetchData();
    displayData(data);
}

// Call the init function to start the application
init();
