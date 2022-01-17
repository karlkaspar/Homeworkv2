$(window).ready(() => {
    console.log("I am ready")


    setStep = (el, from) => {
        let currentStep = $('.step.active').attr('stepId')
        let stepWanted = $(el).parent().attr('stepId')
        console.log('stepWanted', stepWanted, 'curStep', currentStep)

        $('.step').removeClass('active')
        $('.step[stepId=' + stepWanted + ']').addClass('active')

    }
})