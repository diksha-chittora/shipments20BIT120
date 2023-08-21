const formList = document.getElementById("formList");
const formEditor = document.getElementById("formEditor");
const createFormButton = document.getElementById("createForm");
const formTitleInput = document.getElementById("formTitle");
const formDescriptionTextarea = document.getElementById("formDescription");
const questionsContainer = document.getElementById("questions");
const addShortAnswerButton = document.getElementById("addShortAnswer");
const addMultipleChoiceButton = document.getElementById("addMultipleChoice");
const addCheckboxesButton = document.getElementById("addCheckboxes");
const saveFormButton = document.getElementById("saveForm");

let forms = [];
let currentForm = null;

createFormButton.addEventListener("click", () => {
  formEditor.classList.remove("hidden");
  formTitleInput.value = "";
  formDescriptionTextarea.value = "";
  currentForm = {
    title: "",
    description: "",
    questions: []
  };
  updateFormEditor();
});

addShortAnswerButton.addEventListener("click", () => {
  currentForm.questions.push({
    type: "short_answer",
    text: "",
    required: false
  });
  updateFormEditor();
});

addMultipleChoiceButton.addEventListener("click", () => {
  currentForm.questions.push({
    type: "multiple_choice",
    text: "",
    options: [],
    required: false
  });
  updateFormEditor();
});

addCheckboxesButton.addEventListener("click", () => {
  currentForm.questions.push({
    type: "checkboxes",
    text: "",
    options: [],
    required: false
  });
  updateFormEditor();
});

saveFormButton.addEventListener("click", () => {
  currentForm.title = formTitleInput.value;
  currentForm.description = formDescriptionTextarea.value;
  forms.push(currentForm);
  formEditor.classList.add("hidden");
  updateFormList();
});

function updateFormList() {
  formList.innerHTML = "";
  forms.forEach((form, index) => {
    const formItem = document.createElement("div");
    formItem.textContent = form.title;
    formItem.addEventListener("click", () => viewForm(index));
    formList.appendChild(formItem);
  });
}

function viewForm(index) {
  const form = forms[index];
  formEditor.classList.remove("hidden");
  currentForm = form;
  updateFormEditor();
}

function updateFormEditor() {
  formTitleInput.value = currentForm.title;
  formDescriptionTextarea.value = currentForm.description;
  questionsContainer.innerHTML = "";

  currentForm.questions.forEach((question, index) => {
    const questionDiv = document.createElement("div");
    questionDiv.className = "question";
    
    const questionText = document.createElement("input");
    questionText.type = "text";
    questionText.placeholder = "Question text";
    questionText.value = question.text;
    questionText.addEventListener("input", (event) => {
      currentForm.questions[index].text = event.target.value;
    });

    const requiredCheckbox = document.createElement("input");
    requiredCheckbox.type = "checkbox";
    requiredCheckbox.checked = question.required;
    requiredCheckbox.addEventListener("change", (event) => {
      currentForm.questions[index].required = event.target.checked;
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      currentForm.questions.splice(index, 1);
      updateFormEditor();
    });

    questionDiv.appendChild(questionText);
    questionDiv.appendChild(document.createTextNode("Required"));
    questionDiv.appendChild(requiredCheckbox);
    questionDiv.appendChild(deleteButton);

    questionsContainer.appendChild(questionDiv);
  });
}
// Add a function to update the form preview
function updateFormPreview() {
    const previewQuestionsContainer = document.getElementById("previewQuestions");
    previewQuestionsContainer.innerHTML = "";
  
    currentForm.questions.forEach((question) => {
      const questionDiv = document.createElement("div");
      questionDiv.textContent = question.text;
  
      previewQuestionsContainer.appendChild(questionDiv);
    });
  }
  
  // Add an event listener to show the form preview
  const previewButton = document.getElementById("previewForm");
  previewButton.addEventListener("click", () => {
    updateFormPreview();
    formEditor.classList.add("hidden");
    formPreview.classList.remove("hidden");
  });
  