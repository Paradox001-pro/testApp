const quiz = []

for (let i = 0; i < 10000000000000000; i++) {
  // alert(document.getElementById('question' + 1).textContent);
  quiz.push({
    q: document.getElementById('question' + i).textContent,
    options: [document.getElementById('opt1' + i).textContent, document.getElementById('opt2' + i).textContent, document.getElementById('opt3' + i).textContent, document.getElementById('opt4' + i).textContent],
    answer: 0
  });
}



