function bsEnableFormValidation() {
    'use strict';
    const forms = document.querySelectorAll('.needs-validation');
    Array.from(forms).forEach((form) => {
        form.addEventListener('submit', (event) => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });
}
bsEnableFormValidation();
function bsResetModalFormOnHide() {
    const modal = document.querySelector('.modal');
    const form = document.querySelector('.modal form');
    modal.addEventListener('hidden.bs.modal', () => {
        form.reset();
        form.classList.remove('was-validated');
    });
}
bsResetModalFormOnHide();
//# sourceMappingURL=__bs__.js.map