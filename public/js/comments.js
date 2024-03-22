const addComment = async (event) => {
    event.preventDefault();

    const post_id = await parseInt(document.querySelector('.Single-Post').dataset.id);
    const comment_body = await document.querySelector(`.New-Comment-Body`).value;
    try {
        const result = await fetch(`/api/comments/`, {
            method: "POST",
            body: JSON.stringify({
                comment_body,
                post_id,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        location.reload();
    } catch(err) {
        alert("an error occurred, please try again. \\n" + err);
        console.error(err);
    }
}

const showAddCommentForm = (event) => {
    event.preventDefault();

    const showFormButton = document.querySelector('.Show-Add-Comment');
    const commentForm = document.querySelector('.Add-Comment-Form');
    commentForm.removeAttribute("hidden");
    showFormButton.setAttribute("hidden", true);
}

document.querySelector('.Show-Add-Comment').addEventListener('click', showAddCommentForm);
document.querySelector('.Add-Comment-Button').addEventListener('click', addComment);