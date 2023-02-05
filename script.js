let initialData = [
  {
    name: 'John',
    surname: 'Doe',
    age: 27,
    phone: '+37065555523',
    email: 'johndoe@mail.com',
    itKnowledge: 9,
    group: 'feu 1',
    interests: ['Java', 'PHP', 'C++'],
  },
  {
    name: 'Tom',
    surname: 'Doe',
    age: 25,
    phone: '+37065544523',
    email: 'tomdoe@mail.com',
    itKnowledge: 6,
    group: 'feu 2',
    interests: ['JavaScript'],
  },
  {
    name: 'Angela',
    surname: 'Collins',
    age: 29,
    phone: '+37067744523',
    email: 'angelacollins@mail.com',
    itKnowledge: 5,
    group: 'feu 3',
    interests: ['JavaScript', 'Python', 'Java'],
  },
  {
    name: 'Daniela',
    surname: 'Drew',
    age: 32,
    phone: '+37067654523',
    email: 'danieladrew@mail.com',
    itKnowledge: 10,
    group: 'feu 4',
    interests: ['JavaScript', 'Java', 'C++', 'Swift'],
  },
  {
    name: 'Mika',
    surname: 'Leaf',
    age: 36,
    phone: '+37062214523',
    email: 'mikaleaf@mail.com',
    itKnowledge: 8,
    group: 'feu 5',
    interests: ['PHP', 'Python'],
  },
]

const studentForm = document.querySelector('#student-form');
const studentList = document.querySelector('#students-list');

const studentRange = studentForm.querySelector('#it-knowledge');
const rangeValue = studentForm.querySelector('#value');

studentRange.addEventListener('input', (event) => {
  rangeValue.textContent = event.target.value;
});

studentForm.addEventListener('submit', (event) => {
  event.preventDefault();
  let formIsValid = formValidation(event.target);
  if (!formIsValid) {
    return;
  }

  const nameInput = event.target.name;
  const firstName = nameInput.value;
  const surname = event.target.surname.value;
  const age = event.target.age.value;
  const phone = event.target.phone.value;
  const email = event.target.email.value;
  const itKnowledge = event.target['it-knowledge'].value;
  const group = event.target.radio.value;
  const interests = event.target.querySelectorAll('[name="interest"]:checked');

  const studentItem = document.createElement('div');
  studentItem.classList.add('student-item');
  const title = document.createElement('h3');
  const mainInfo = document.createElement('p');
  const knowledge = document.createElement('p');
  const groupTitle = document.createElement('p');
  const contacts = document.createElement('h4');
  const phoneElement = document.createElement('p');
  const emailElement = document.createElement('p');
  const interestsWrapper = document.createElement('div');
  interestsWrapper.classList.add('interests-wrapper');
  const interestsTitle = document.createElement('h4');
  interestsTitle.classList.add('interests-title');

  title.textContent = 'Student Info';
  mainInfo.textContent = `${firstName} ${surname} is ${age} years old.`;
  contacts.textContent = 'Student contacts:';
  knowledge.textContent = `IT knowledge: ${itKnowledge}`;
  groupTitle.textContent = `Group: ${group.toUpperCase()}gr.`;
  phoneElement.textContent = `Phone: *******`;
  emailElement.textContent = `Email: *******`;
  interestsTitle.textContent = 'No interests :(';

  interestsWrapper.append(interestsTitle);

  if (interests.length > 0) {
    interestsTitle.textContent = 'Student interests:';
    const interestListElement = document.createElement('ul');

    interests.forEach(interest => {
      const interestElement = document.createElement('li');
      let firstLetter = interest.value.charAt(0).toUpperCase();
      let wordEnd = interest.value.slice(1);
      interestElement.textContent = firstLetter + wordEnd;
  
      interestListElement.append(interestElement);
    })
    interestsWrapper.append(interestListElement);
  }

  const personalInfoButton = document.createElement('button');
  personalInfoButton.textContent = 'Show personal info';
  let infoHidden = true;

  personalInfoButton.addEventListener('click', () => {
    if (infoHidden) {
      emailElement.textContent = `Email: ${email}`;
      phoneElement.textContent = `Phone: ${phone}`;
      personalInfoButton.textContent = 'Hide personal info';
    } else {
      emailElement.textContent = `Email: *******`;
      phoneElement.textContent = `Phone: *******`;
      personalInfoButton.textContent = 'Show personal info';
    }
    infoHidden = !infoHidden;
  });

  let removeStudentButton = document.createElement('button');
  removeStudentButton.textContent = 'Delete student';

  removeStudentButton.addEventListener('click', () => {
    studentItem.remove();
    let studentMessage = `Student ${firstName} ${surname} is deleted`;
    alertMessage(event.target, studentMessage);
  })

  studentItem.append(title, mainInfo, knowledge, groupTitle, contacts, phoneElement, emailElement, interestsWrapper, personalInfoButton, removeStudentButton);
  studentList.prepend(studentItem);

  event.target.reset();

  let studentMessage = `Student ${firstName} ${surname} is registered`;
  alertMessage(event.target, studentMessage);

});

function alertMessage(element, message, color = 'black') {
  const previousMessageElement = document.querySelector('.popup-info-message');
  
  if(previousMessageElement) {
    previousMessageElement.remove();
  }

  const confirmation = document.createElement('span');
  confirmation.classList.add('popup-info-message');
  confirmation.textContent = message;
  confirmation.style.color = color;

  element.after(confirmation)

  setTimeout(() => {
      confirmation.remove();
  }, 5000);
}

function renderInitialData(students, studentForm) {
  students.forEach(studentData => {
    renderStudents(studentData, studentForm);
  });
}

function renderStudents(student, form) {
  let firstName = student.name;
  let surname = student.surname;
  let age = student.age;
  let phone = student.phone;
  let email = student.email;
  let itKnowledge = student.itKnowledge;
  let group = student.group;
  let interests = student.interests;

  const studentItem = document.createElement('div');
  studentItem.classList.add('student-item');

  const title = document.createElement('h3');
  const mainInfo = document.createElement('p');
  const knowledge = document.createElement('p');
  const groupTitle = document.createElement('p');
  const contacts = document.createElement('h4');
  const phoneElement = document.createElement('p');
  const emailElement = document.createElement('p');
  const interestsWrapper = document.createElement('div');
  interestsWrapper.classList.add('interests-wrapper');
  const interestsTitle = document.createElement('h4');
  interestsTitle.classList.add('interests-title');

  title.textContent = 'Student Info';
  mainInfo.textContent = `${firstName} ${surname} is ${age} years old.`;
  contacts.textContent = 'Student contacts:';
  knowledge.textContent = `IT knowledge: ${itKnowledge}`;
  groupTitle.textContent = `Group: ${group.toUpperCase()}gr.`;
  phoneElement.textContent = `Phone: *******`;
  emailElement.textContent = `Email: *******`;
  interestsTitle.textContent = 'No interests :(';

  interestsWrapper.append(interestsTitle);

  if (interests.length > 0) {
    interestsTitle.textContent = 'Student interests:';
    const interestListElement = document.createElement('ul');

    interests.forEach(interest => {
      const interestElement = document.createElement('li');
      interestElement.textContent = interest;
  
      interestListElement.append(interestElement);
    })
    interestsWrapper.append(interestListElement);
  }

  const personalInfoButton = document.createElement('button');
  personalInfoButton.textContent = 'Show personal info';
  let infoHidden = true;

  personalInfoButton.addEventListener('click', () => {
    if (infoHidden) {
      emailElement.textContent = `Email: ${email}`;
      phoneElement.textContent = `Phone: ${phone}`;
      personalInfoButton.textContent = 'Hide personal info';
    } else {
      emailElement.textContent = `Email: *******`;
      phoneElement.textContent = `Phone: *******`;
      personalInfoButton.textContent = 'Show personal info';
    }
    infoHidden = !infoHidden;
  });

  let removeStudentButton = document.createElement('button');
  removeStudentButton.textContent = 'Delete student';

  removeStudentButton.addEventListener('click', () => {
    studentItem.remove();
    let studentMessage = `Student ${firstName} ${surname} is deleted`;
    alertMessage(form, studentMessage);
  })

  studentItem.append(title, mainInfo, knowledge, groupTitle, contacts, phoneElement, emailElement, interestsWrapper, personalInfoButton, removeStudentButton);
  studentList.prepend(studentItem);
}

function formValidation(form) {
const previousInputErrorMessages = form.querySelectorAll('.input-error-message')
  previousInputErrorMessages.forEach(errorMessage => {
    errorMessage.remove();
  })

  const requiredInputs = form.querySelectorAll('input:required');
  let formIsValid = true;

  requiredInputs.forEach(requiredInput => {
    requiredInput.classList.remove('input-error')

    if (!requiredInput.value) {
      formIsValid = false;
      inputErrorMessage(requiredInput, form, 'Field is required');

    } else if (requiredInput.name === 'name') {
        if (requiredInput.value.length < 3) {
          formIsValid = false;
          inputErrorMessage(requiredInput, form, 'Name has to be from at least 3 symbols.');
        }
      }

      else if (requiredInput.name === 'surname') {
        if (requiredInput.value.length < 3) {
          formIsValid = false;
          inputErrorMessage(requiredInput, form, 'Last name has to be from at least 3 symbols.');
        }
      }

      else if (requiredInput.name === 'age') {
        if (requiredInput.value <= 0) {
          formIsValid = false;
          inputErrorMessage(requiredInput, form, 'Age can not be a negative number');
        } else if (requiredInput.value >= 120) {
          formIsValid = false;
          inputErrorMessage(requiredInput, form, 'Age can not be more than 120 years ');
        }
      }

      else if (requiredInput.name === 'phone') {
        if (requiredInput.value.length < 9 || requiredInput.value.length > 12) {
          formIsValid = false;
          inputErrorMessage(requiredInput, form, 'Phone number is not valid');
        }
      }

      else if (requiredInput.name === 'email') {
        if (requiredInput.value.length < 8) {
          formIsValid = false;
          inputErrorMessage(requiredInput, form, 'Email address is not valid');
        } else if (!requiredInput.value.includes('@')) {
          formIsValid = false;
          inputErrorMessage(requiredInput, form,'Email address must contain the @ symbol');
        }
      }
  });
  return formIsValid;
}

function inputErrorMessage(input, form, errorMessage) {
  let inputErrorMessage = document.createElement('span');
  inputErrorMessage.classList.add('input-error-message');
  inputErrorMessage.textContent = errorMessage;

  input.after(inputErrorMessage);

  input.classList.add('input-error');
  let alertMessageText = `Not all fields are filled.`;
  alertMessage(form, alertMessageText, 'red')

  return false;
}
renderInitialData(initialData, studentForm);



