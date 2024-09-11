
const slider_element = document.getElementById('slider');
const slider_value_element = document.getElementById('slider-value');

slider_value_element.textContent = slider_element?.value;

slider_element?.addEventListener('input', (event) => {
    const value = event.target.value;
    slider_value_element.textContent = value;
    }
);