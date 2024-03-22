const logout = async () => {
    try {
        // const loginCheck = sessionStorage.getItem(logged_in);
        const response = await fetch('/api/users/logout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            alert('successfully logged out');
            document.location.replace('/');
        } else {
            alert(response.statusText);
            }
    } catch(err) {
        console.error(err + "-This was most likely caused by the session expiring")
    }
};

document.querySelector('.logout').addEventListener('click', logout);