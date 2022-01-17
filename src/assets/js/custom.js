$(window).ready(() => {
    console.log("I am ready")


    setStep = (el, from) => {

        let curstep = $('.step.active').attr('stepid')
        let newStep = ''
        newStep = (from == 'forward') ? parseInt(curstep) + 1 : $(el).parent().attr('stepid') // Decide if event came from "Continue" button or step indicator
        console.log(curstep, newStep)
        if (validator(curstep, newStep)) {
            $('.stepIndicator').removeClass('active')
            if (from == 'forward') { // Form forward moving action from "Continue" button
                $('.stepIndicator[stepid="' + newStep + '"').addClass('active')
            } else { // Form forward moving action from above step indicators
                $(el).parent().addClass('active')
            }
            $('.step').removeClass('active')
            $('.step[stepid=' + newStep + ']').addClass('active')
        } else {
            console.log("Not valid")
        }
    }
    validator = (curstep, newStep) => {
        if (curstep != 5 && newStep < 5) {
            toggleInputsDisabled(false)
        } else if (curstep == 5 && newStep < 5) {
            toggleAllFormSections(false)
            toggleInputsDisabled(false)
            return true
        }
        if (newStep < curstep) { // Going back to any of the previous steps
            return true // If we have any errors on our current step, we can always go back, but not forward
        }
        if (curstep == 1) { // Step 1 validation
            if (!$("section[stepid='1'] input[type='text']").val()) {
                showError(curstep)
                return false
            } else if ($("section[stepid='1'] input:radio:checked").length == 0) {
                return false
            } else { // If no errors found
                return true
            }
        }
        if (curstep == 2) { // Step 2 validation, second step does not need validation as there are only optional checkboxes there
            return true
        }
        if (curstep == 3) { // Step 3 validation
            if ($("section[stepid='3'] select").val()) {
                return true
            }
        }
        if (curstep == 4) { // Step 4 validation
            if ($("section[stepid='3'] textarea").val()) {
                return true
            }
        }
        if (curstep == 4 & newStep == 5) { // User continued to step 5, show all form parts
            toggleInputsDisabled(true)
            toggleAllFormSections(true)
            return true
        }
    }

    toggleInputsDisabled = (onOrOff) => {
        // Toggle Inputs to disabled, so that you could not change any of the information of the confirmation page
        $(".step").find("input:not('.conditions'), select, textarea").each(function () {
            $(this).prop("disabled", onOrOff);
        });
    }

    toggleAllFormSections = (visibility) => {
        if (visibility) {
            $('form .step').css('display', 'block')
        } else {
            $('form .step').css('display', 'none')
        }
    }

    showError = (step) => {
        $('form .step[' + +' ]')
    }
})
