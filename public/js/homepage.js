const loadComments = (event) => {
    const elData = parseInt(event.target.closest('.Post').dataset.id);
    try {
        window.location.href=`/posts/${elData}`
    } catch(err) {
        console.error(err);
    }
}

document.querySelectorAll(".Post").forEach(el => { el.addEventListener("click", loadComments); });