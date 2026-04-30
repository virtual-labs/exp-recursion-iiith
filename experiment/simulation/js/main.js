// --- Problems (example, adapt as needed) ---
const problems = [
  {
    id: 1,
    title: "Factorial (Recursive)",
    desc: "Write a recursive function to compute n! (factorial of n).",
    template: [
      "int factorial(int n) {",
      "    if (_____)", // blank 0
      "        return 1;",
      "    else",
      "        return n * _____;", // blank 1
      "}",
      "int main() {",
      "    int n;",
      '    scanf(\"%d\", &n);',
      '    printf("%d\\n", factorial(n));',
      "    return 0;",
      "}",
    ],
    blanks: [
      {
        line: 1,
        answers: ["n == 0", "n==0", "(n == 0)", "(n==0)"],
        placeholder: "base case",
      },
      {
        line: 4,
        answers: [
          "factorial(n - 1)",
          "factorial(n-1)",
          "factorial(n - 1)",
          "factorial(n-1)",
        ],
        placeholder: "recursive call",
      },
    ],
    hints: [
      "What is the base case for factorial?",
      "How do you make the recursive call for n-1?",
      "For n=5, output is 120. For n=0, output is 1.",
    ],
    compilerOutput: "Compiled successfully.",
    runtimeOutput: "For n=5, output is 120. For n=0, output is 1.",
  },
  {
    id: 2,
    title: "Fibonacci (Recursive)",
    desc: "Write a recursive function to compute the nth Fibonacci number.",
    template: [
      "int fibonacci(int n) {",
      "    if (_____)", // blank 0
      "        return 0;",
      "    else if (_____)", // blank 1
      "        return 1;",
      "    else",
      "        return fibonacci(n - 1) + _____;", // blank 2
      "}",
      "int main() {",
      "    int n;",
      '    scanf(\"%d\", &n);',
      '    printf("%d\\n", fibonacci(n));',
      "    return 0;",
      "}",
    ],
    blanks: [
      {
        line: 1,
        answers: ["n == 0", "n==0", "(n == 0)", "(n==0)"],
        placeholder: "base case 0",
      },
      {
        line: 3,
        answers: ["n == 1", "n==1", "(n == 1)", "(n==1)"],
        placeholder: "base case 1",
      },
      {
        line: 6,
        answers: [
          "fibonacci(n - 2)",
          "fibonacci(n-2)",
          "fibonacci(n - 2)",
          "fibonacci(n-2)",
        ],
        placeholder: "recursive call",
      },
    ],
    hints: [
      "What is the base case for n=0?",
      "What is the base case for n=1?",
      "How do you make the recursive call for n-2?",
      "For n=5, output is 5. For n=7, output is 13.",
    ],
    compilerOutput: "Compiled successfully.",
    runtimeOutput: "For n=5, output is 5. For n=7, output is 13.",
  },
  {
    id: 3,
    title: "Sum of Digits (Recursive)",
    desc: "Write a recursive function to compute the sum of digits of a number.",
    template: [
      "int sum_of_digits(int n) {",
      "    if (_____)", // blank 0
      "        return 0;",
      "    else",
      "        return n % 10 + _____;", // blank 1
      "}",
      "int main() {",
      "    int n;",
      '    scanf(\"%d\", &n);',
      '    printf("%d\\n", sum_of_digits(n));',
      "    return 0;",
      "}",
    ],
    blanks: [
      {
        line: 1,
        answers: ["n == 0", "n==0", "(n == 0)", "(n==0)"],
        placeholder: "base case",
      },
      {
        line: 4,
        answers: [
          "sum_of_digits(n / 10)",
          "sum_of_digits(n/10)",
          "sum_of_digits(n / 10)",
          "sum_of_digits(n/10)",
        ],
        placeholder: "recursive call",
      },
    ],
    hints: [
      "What is the base case for sum of digits?",
      "How do you make the recursive call for n/10?",
      "For n=123, output is 6. For n=405, output is 9.",
    ],
    compilerOutput: "Compiled successfully.",
    runtimeOutput: "For n=123, output is 6. For n=405, output is 9.",
  },
];

let currentProblem = null;
let userInputs = [];

function renderProblemOptions() {
  const select = document.getElementById("problem-select");
  select.innerHTML = problems
    .map((p, i) => `<option value="${i}">Problem ${i + 1}</option>`)
    .join("");
}

function renderProblem(idx) {
  currentProblem = problems[idx];
  userInputs = Array(currentProblem.blanks.length).fill("");
  document.getElementById("problem-desc").textContent = currentProblem.desc;
  renderCodeTemplate();
  renderHints();
  document.getElementById("feedback").textContent = "";
  document.getElementById("runtime-output").textContent = "";
  document.getElementById("run-btn").disabled = true;
}

function renderCodeTemplate() {
  const codeDiv = document.getElementById("code-template");
  codeDiv.innerHTML = "";
  currentProblem.template.forEach((line, idx) => {
    let html = line;
    currentProblem.blanks.forEach((blank, bIdx) => {
      if (blank.line === idx) {
        html = html.replace(
          "_____",
          `<input class="blank-input" data-blank="${bIdx}" value="${userInputs[bIdx] || ""}" placeholder="${blank.placeholder}" />`,
        );
      }
    });
    codeDiv.innerHTML += `<div class="template-line">${html}</div>`;
  });
  // Attach input listeners
  codeDiv.querySelectorAll(".blank-input").forEach((input) => {
    input.addEventListener("input", (e) => {
      const bIdx = +e.target.getAttribute("data-blank");
      userInputs[bIdx] = e.target.value;
      document.getElementById("feedback").textContent = "";
      document.getElementById("runtime-output").textContent = "";
      document.getElementById("run-btn").disabled = true;
    });
  });
}

function renderHints() {
  const hintSelect = document.getElementById("hint-level");
  hintSelect.innerHTML = "";
  hintSelect.innerHTML += `<option value="0" disabled selected>Hint 0</option>`;
  for (let i = 1; i <= currentProblem.hints.length; ++i) {
    hintSelect.innerHTML += `<option value="${i}">Hint ${i}</option>`;
  }
  showHints(0);
  hintSelect.onchange = (e) => showHints(+e.target.value);
}

function showHints(level) {
  const hintsDiv = document.getElementById("hints");
  if (level === 0) {
    hintsDiv.innerHTML = "";
    return;
  }
  hintsDiv.innerHTML = `<div class="hint">${currentProblem.hints[level - 1]}</div>`;
}

function checkAnswers() {
  let allCorrect = true;
  let feedback = "";
  currentProblem.blanks.forEach((blank, i) => {
    const userVal = (userInputs[i] || "").trim();
    if (blank.answers.map((a) => a.trim()).includes(userVal)) {
      feedback += `<div class="feedback-correct">Blank ${i + 1}: Correct</div>`;
    } else {
      feedback += `<div class="feedback-incorrect">Blank ${i + 1}: Incorrect</div>`;
      allCorrect = false;
    }
  });
  document.getElementById("feedback").innerHTML = feedback;
  document.getElementById("run-btn").disabled = !allCorrect;
}

function showRuntimeOutput() {
  document.getElementById("runtime-output").innerHTML =
    `<div class="feedback-all-correct">${currentProblem.runtimeOutput}</div>`;
}

document.addEventListener("DOMContentLoaded", () => {
  renderProblemOptions();
  renderProblem(0);
  document.getElementById("problem-select").onchange = (e) =>
    renderProblem(+e.target.value);
  document.getElementById("submit-btn").onclick = checkAnswers;
  document.getElementById("run-btn").onclick = showRuntimeOutput;
});
