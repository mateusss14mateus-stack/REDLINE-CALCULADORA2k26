const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const totalSpan = document.getElementById('total');

checkboxes.forEach(cb => {
  cb.addEventListener('change', calcular);
});

function calcular() {
  let total = 0;
  checkboxes.forEach(cb => {
    if (cb.checked) {
      total += Number(cb.value);
    }
  });

  totalSpan.innerText = 'R$ ' + total.toLocaleString('pt-BR');
}
