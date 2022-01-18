$(window).ready(() => {

    $(".tooltip").each(function () { // Init tooltips
        tippy(this, {
            content: $(this).attr('title')
        })
    })

    setStep = (el, from) => {
        let curstep = parseInt($('.step.active').attr('stepid'))
        let newStep = ''

        if (isNaN(curstep)) curstep = 0 // If the current step is intro

        switch (from) { // Decide if event came from "Continue" or "Back" button or step indicator
            case 'forward':
                newStep = curstep + 1
            break;
            case 'back':
                newStep = curstep - 1
            break;
            default:
                newStep = $(el).parent().attr('stepid')
                if (isNaN(curstep)) newStep = 1
            break;
        }
        if (validator(curstep, newStep)) {
            $('.notification.error').hide()
            $('.stepIndicator').removeClass('active')
            if (from == 'forward' || from == 'back') { // Form forward moving action from "Continue" button
                $('.stepIndicator[stepid="' + newStep + '"').addClass('active')
            } else { // Form forward moving action from above step indicators
                $(el).parent().addClass('active')
            }
            $('.step').removeClass('active')
            $('.step[stepid=' + newStep + ']').addClass('active')
            $('.step[stepid=' + newStep + ']').css('display', '')
        }
    }

    validator = (curstep, newStep) => {
        if (curstep == 0 && newStep == 1) { // First step of the form
            $('#intro').hide()
            return true
        }
        if (curstep == 1 && curstep > newStep) {
            location.reload()
        }
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
            if (!$("section[stepid='1'] input[type='text']").val() || $("section[stepid='1'] input:radio:checked").length == 0) {
                showError(curstep)
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
            } else {
                showError(curstep)
                return false
            }
        }
        if (curstep == 4) { // Step 4 validation
            if ($("section[stepid='3'] textarea").val()) {
                return true
            } else {
                showError(curstep)
            }
        }
        if (curstep == 4 & newStep == 5) { // User continued to step 5, show all form parts
            toggleInputsDisabled(true)
            toggleAllFormSections(true)
            return true
        }
        if (curstep == 5 && newStep == 6) {
            if ($("section[stepid='5'] .conditions").is(":checked")) { // Hide all form sections and present finished section 
                setFormFinished()

            } else {
                showError(curstep)
            }
        }
    }

    toggleInputsDisabled = (onOrOff) => {
        // Toggle Inputs to disabled, so that you could not change any of the information of the confirmation page
        $(".step").find("input:not('.conditions'), select, textarea").each(function () {
            $(this).prop("disabled", onOrOff)
        });
    }

    toggleAllFormSections = (visibility) => {
        if (visibility) {
            $('form .step').css('display', 'block')
        } else {
            $('form .step').css('display', 'none')
        }
    }

    hideAllErrors = () => {
        $('.error').hide()
    }

    showError = (step) => {
        $('form .step[stepid=' + step + ' ] .notification.error').show()
    }

    setFormFinished = () => {
        toggleAllFormSections(false)
        $('#success').css('display', 'flex')
        $('.formHeader > *, .formFooter > *').hide()
    }
})
