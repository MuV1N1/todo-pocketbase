export function logoutAccount(element) {

    element.addEventListener("click", (e) => {
        e.preventDefault();
        if(confirm("Are you sure you want to log out?")){
        location.href = "/index.html";
    }else {
        return;
    }
    });

}