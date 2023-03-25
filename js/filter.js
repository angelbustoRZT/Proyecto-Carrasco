$(document).ready(function(){
    $('.box').click(function(){
        const value = $(this).attr('data_filter');
        if (value == 'todos'){
            $('.product_box').show('1000');
        }
        else{
            $('.product_box').not('.'+value).hide('1000');
            $('.product_box').filter('.'+value).show('1000');
        }
    })
})