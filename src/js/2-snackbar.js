
import iziToast from "izitoast";

import "izitoast/dist/css/iziToast.min.css";


    document.querySelector('.form').addEventListener('submit', handleSubmit);

    function handleSubmit(event) {
      event.preventDefault();

      const delay = event.target.elements.delay.value;
      const state = event.target.elements.state.value;

      const promise = new Promise((resolve, reject) => {
        if (state === 'fulfilled') {
          setTimeout(() => resolve(delay), delay);
        } else {
          setTimeout(() => reject(delay), delay);
        }
      });


      promise.then(
        (delay) => {
          iziToast.success({
            title: 'Success',
            message: `✅ Fulfilled promise in ${delay}ms`
          });
        },
        (delay) => {
          iziToast.error({
            title: 'Error',
            message: `❌ Rejected promise in ${delay}ms`
          });
        }
      );
    }
