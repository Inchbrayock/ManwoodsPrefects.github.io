var currentContent = "dashboard";

function showContent(contentId) {
    document.getElementById(currentContent).style.display = "none";
    document.getElementById(contentId).style.display = "block";
    document.getElementById(currentContent + "-link").className = 'nav-item';
    document.getElementById(contentId + "-link").className = 'nav-item active';
    currentContent = contentId;
}
