// adds the link to post page functionality to Blog Posts section
const loadPost = (event) => {
    const elData = parseInt(event.target.closest('.Post').dataset.id);
    try {
        window.location.href = `/posts/${elData}`
    } catch (err) {
        console.error(err);
    }
}
document.querySelectorAll(".Post").forEach(el => { el.addEventListener("click", loadPost); });

// adds the link to post page functionality to Comments section
const loadCommentPost = (event) =>{
    const elData = parseInt(event.target.closest('.ParentPost').dataset.id);
    try {
        window.location.href = `/posts/${elData}`
    } catch (err) {
        console.error(err);
    }
}
document.querySelectorAll(".DashComment").forEach(el => { el.addEventListener("click", loadCommentPost); });

// Hides and shows the relevant forms and buttons when editing a post
const showEditPostForm = async (event, index) => {
    event.preventDefault();

    const hidePost = await event.target.previousElementSibling;
    const postForm = document.querySelectorAll('.Edit-Post-Form')[index];
    const showFormButton = document.querySelectorAll('.EditPost')[index];
    const delButton = document.querySelectorAll('.DeletePost')[index];
    postForm.classList.remove("is-hidden");
    hidePost.classList.add("is-hidden");
    showFormButton.classList.add("is-hidden");
    delButton.classList.add("is-hidden");
}

document.querySelectorAll(".EditPost").forEach((el, index) => { el.addEventListener("click",(e) => showEditPostForm(e, index)); });

// adds the edit post functionality
const editPost = async (event) => {
    event.preventDefault();

    const post_title = await event.target.closest('.Edit-Post-Form').children[1].children[0].value;
    const post_body = await event.target.closest('.Edit-Post-Form').children[3].children[0].value;

    try {
        const result = await fetch(`/api/blogPosts/${await event.target.dataset.id}`, {
            method: "PUT",
            body: JSON.stringify({
                post_title,
                post_body,
                user_id: sessionStorage.user_id,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (result.ok) {
            window.location.reload();
        }
    } catch (err) {
        alert("an error occurred, please try again. \\n" + err);
        console.error(err);
    }
}

document.querySelectorAll(".Edit-Post-Button").forEach((el) => { el.addEventListener("click", editPost); });

const showDeletePostModal = (event) => {
    event.preventDefault();

    const deleteModal = event.target.nextElementSibling;
    deleteModal.showModal();
}

document.querySelectorAll(".DeletePost").forEach((el) => { el.addEventListener("click", showDeletePostModal); });

const cancelPostDelete = (event) =>{
    event.preventDefault();

    const deleteModal = event.target.parentElement;
    deleteModal.close();
}

document.querySelectorAll(".Delete-Post-Cancel").forEach((el) => { el.addEventListener("click", cancelPostDelete); });

const confirmPostDelete = async (event) => {
    event.preventDefault();

    try {
        const result = await fetch(`/api/blogPosts/${await event.target.dataset.id}`, {
            method: "DELETE",
        });
        if(result.ok){
            window.location.reload();
        }
    } catch(err) {
        console.error(err);
    }
}

document.querySelectorAll(".Delete-Post-Confirm").forEach((el) => { el.addEventListener("click", confirmPostDelete); });

const showEditCommentForm = async (event, index) => {
    event.preventDefault();

    const hideComment = await event.target.previousElementSibling;
    const showFormButton = document.querySelectorAll('.EditComment')[index];
    const commentForm = document.querySelectorAll('.Edit-Comment-Form')[index];
    const delButton = document.querySelectorAll('.DeleteComment')[index];
    commentForm.classList.remove("is-hidden");
    hideComment.classList.add("is-hidden");
    showFormButton.classList.add("is-hidden");
    delButton.classList.add("is-hidden");
}

document.querySelectorAll(".EditComment").forEach((el, index) => { el.addEventListener("click", (e) => showEditCommentForm(e, index)); });

// adds the edit post functionality
const editComment = async (event) => {
    event.preventDefault();

    const comment_body = await event.target.closest('.Edit-Comment-Form').children[1].children[0].value;

    try {
        const result = await fetch(`/api/comments/${await event.target.dataset.id}`, {
            method: "PUT",
            body: JSON.stringify({
                comment_body,
                user_id: sessionStorage.user_id,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (result.ok) {
            window.location.reload();
        }
    } catch (err) {
        alert("an error occurred, please try again. \\n" + err);
        console.error(err);
    }
}

document.querySelectorAll(".Edit-Comment-Button").forEach((el) => { el.addEventListener("click", editComment); });

const showDeleteCommentModal = (event) => {
    event.preventDefault();

    const deleteModal = event.target.nextElementSibling;
    deleteModal.showModal();
}

document.querySelectorAll(".DeleteComment").forEach((el) => { el.addEventListener("click", showDeleteCommentModal); });

const cancelCommentDelete = (event) => {
    event.preventDefault();

    const deleteModal = event.target.parentElement;
    deleteModal.close();
}

document.querySelectorAll(".Delete-Comment-Cancel").forEach((el) => { el.addEventListener("click", cancelCommentDelete); });

const confirmCommentDelete = async (event) => {
    event.preventDefault();
    console.log(event.target);

    try {
        const result = await fetch(`/api/comments/${await event.target.dataset.id}`, {
            method: "DELETE",
        });
        if(result.ok){
            window.location.reload();
        }
    } catch (err) {
        console.error(err);
    }
}

document.querySelectorAll(".Delete-Comment-Confirm").forEach((el) => { el.addEventListener("click", confirmCommentDelete); });