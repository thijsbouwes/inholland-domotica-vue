$(function() {
    // Activate sidenave
    $(".button-collapse-sidebar").sideNav();

    // Activate dropdown on hover
    $(".dropdown-button").dropdown({hover: true});

    // Activate modals
    $('.modal').modal();

    // Activate datepickers
    $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15 // Creates a dropdown of 15 years to control year
    });

    // Enable parallax
    $('.parallax').parallax();

    // Activate select
    $('select').material_select();
});