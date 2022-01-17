$(window).ready(() => {
    console.log("I am ready")


    setStep = (el, from) => {
        let curstep = $('.step.active').attr('stepId')
        let newStep = $(el).parent().attr('stepId')

        $('.stepIndicator').removeClass('active')
        $(el).parent().addClass('active')
        $('.step').removeClass('active')
        $('.step[stepId=' + stepWanted + ']').addClass('active')
    }
})