const addPost = async (event) => {
    event.preventDefault();

    const post_title = await document.querySelector('.New-Post-Title').value
    const post_body = await document.querySelector(`.New-Post-Body`).value;
    try {
        const result = await fetch(`/api/blogPosts/`, {
            method: "POST",
            body: JSON.stringify({
                post_title,
                post_body,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        window.location.reload();
    } catch (err) {
        alert("an error occurred, please try again. \\n" + err);
        console.error(err);
    }
}

const showAddPostForm = (event) => {
    event.preventDefault();

    const showFormButton = document.querySelector('.Show-Add-Post');
    const postForm = document.querySelector('.Add-Post-Form');
    postForm.removeAttribute("hidden");
    showFormButton.setAttribute("hidden", true);
}

document.querySelector('.Show-Add-Post').addEventListener('click', showAddPostForm);
document.querySelector('.Add-Comment-Button').addEventListener('click', addPost);