$(function() {
    // Activate sidenave
    $(".sidenav").sidenav();

    $('.fixed-action-btn').floatingActionButton({
        direction: 'top', // Direction menu comes out
        hoverEnabled: true, // Hover enabled
        toolbarEnabled: true // Toolbar transition enabled
    });
});