/*  Enable form validation powered by Bootstrap
 *  As officially exampled:
 *  https://getbootstrap.com/docs/5.2/forms/validation/
 */
// Example starter JavaScript for disabling form submissions if there are invalid fields
function bsEnableFormValidation() {
  'use strict';

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation');

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      'submit',
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add('was-validated');
      },
      false
    );
  });
}
bsEnableFormValidation();

/*  Reset modal form on hide
 *  https://getbootstrap.com/docs/5.2/components/modal/#events
 */
function bsResetModalFormOnHide() {
  const modal = document.querySelector('.modal');
  const form = document.querySelector('.modal form');

  modal.addEventListener('hidden.bs.modal', () => {
    form.reset();
    form.classList.remove('was-validated');
  });
}
bsResetModalFormOnHide();
