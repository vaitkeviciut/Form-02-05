// SEPTINTA UŽDUOTIS:
// 1. Prie kiekvieno studento pridėti mygtuką, kurį paspaudus leistų redaguoti studento duomenis.
// 2. Redaguojant studentą, submit mygtuko tekstas turėtų pasikeisti į „Save Changes".
// 3. Pakeitus studento duomenis, turi iššokti <span> elementas, kuris informuoja apie studento duomenų redagavimą: „Studento (Vardas Pavardė) duomenys sėkmingai pakeisti". Šis span elementas dingsta po 5 sekundžių. 1. Sukurti Edit mygtuką.
// 2. Prie mygtuko pridėti event listener'į.
// 3. Surinkti studento duomenis ir jais užpildyti formos laukelius.
// 4. Pakeisti formos submit mygtuko tekstą.
// 5. Išsaugoti studento HTML elementą kintamąjame.
// 6. Submit event'o metu patikrinti ar kuriame naują studentą, ar redaguojame jau sukurtą.
// 7. Jeigu studentas redaguojamas, šį naują (redaguotą) HTML elementą panaudoti perrašant seną studento HTML elementą (kuris išsaugotas 5 žingsnyje). 8. Pakeisti formos submit mygtuko tekstą į pradinį ir pakeisti iššokančio pranešimo tekstą.

// AŠTUNTA UŽDUOTIS (local storage):
// 1. Vedamą tekstą į input elementus išsaugoti į localStorage.
// 2. Perkrovus puslapį localStorage esančiomis reikšmėmis užpildyti input elementus.
// 3. Jeigu sukuriamas studentas, tai localStorage esančias reikšmes reikia išvalyti.

// DEŠIMTA UŽDUOTIS:
// 1. Studento kūrimo ir redagavimo metu reikia sukurti visų studentų masyvą (tokiu pačiu formatu kaip ir initialData).
// 2. Šį masyvą pridėti į localStorage.
// 3. Puslapio perkrovimo metu iš localStorage esančio masyvo sukurti studentų sąrašą (pradinių studentų sukūrimo funkcionalumas).

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

// const strStudentData = JSON.stringify(initialData);
// console.log(strStudentData)

// localStorage.setItem('studentData', strStudentData)
// const localStrStudentData = localStorage.getItem('studentData');
// const localObjStudentData = JSON.parse(localStrStudentData);



const studentForm = document.querySelector('#student-form');
const studentList = document.querySelector('#students-list');

let editStudent = null;

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

  let studentInterestElements = event.target.querySelectorAll('[name="interest"]:checked');

  const studentInterests = [...studentInterestElements ].map(interest => interest.value);

  let studentDataObj = {
    name: nameInput.value,
    surname: event.target.surname.value,
    age: event.target.age.value,
    phone: event.target.phone.value,
    email: event.target.email.value,
    itKnowledge: event.target['it-knowledge'].value,
    group: event.target.radio.value,
    interests: studentInterests,
  }

  if (editStudent) {
    let studentMessage = `Student ${firstName} ${surname} is edited`;
    alertMessage(event.target, studentMessage);
  } else {
    let studentMessage = `Student ${firstName} ${surname} is registered`;
    alertMessage(event.target, studentMessage);
  }

  renderStudents(studentDataObj, event.target);

  event.target.reset();

  localStorage.setItem('name', '');
  localStorage.setItem('surname', '');
  localStorage.setItem('age', '');
  localStorage.setItem('phone', '');
  localStorage.setItem('email', '');
  localStorage.setItem('it-knowledge', '');
  localStorage.setItem('radio', '');
  localStorage.setItem('interest', JSON.stringify([]));
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
  const firstName = student.name;
  const surname = student.surname;
  const age = student.age;
  const phone = student.phone;
  const email = student.email;
  const itKnowledge = student.itKnowledge;
  const group = student.group;
  const interests = student.interests;

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

  const removeStudentButton = document.createElement('button');
  removeStudentButton.textContent = 'Delete student';

  removeStudentButton.addEventListener('click', () => {
    studentItem.remove();
    let studentMessage = `Student ${firstName} ${surname} is deleted`;
    alertMessage(form, studentMessage);
  })

  const editStudentButton = document.createElement('button');
  editStudentButton.textContent = 'Edit';

  editStudentButton.addEventListener('click', () => {
    form.name.value = firstName;
    form.surname.value = surname;
    form.age.value = age;
    form.phone.value = phone;
    form.email.value = email;
    form['it-knowledge'].value = itKnowledge;
    form.radio.value = group;

    interests.forEach(interest => {
      form.querySelector(`[name="interest"][value="${interest}"]`).checked = true;
    });

    let saveButton = document.querySelector('.submit-button');
    saveButton.value = 'Save changes';
    
    editStudent = studentItem;
  });

  studentItem.append(title, mainInfo, knowledge, groupTitle, contacts, phoneElement, emailElement, interestsWrapper, personalInfoButton, removeStudentButton, editStudentButton);

  if (editStudent) {
    let saveButton = document.querySelector('.submit-button');
    saveButton.value = 'Register student';
    editStudent.replaceWith(studentItem);
    editStudent = null;
     
  } else {
    studentList.prepend(studentItem);
  }
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


studentForm.addEventListener('input', (event) => {
  if (event.target.name === 'interest') {
    let checkedInterests = studentForm.querySelectorAll('[name="interest"]:checked');

    let checkedInterestValues = [...checkedInterests].map(interest => {
      return interest.value;
    })

    localStorage.setItem('interest', JSON.stringify(checkedInterestValues));
  } else {
    localStorage.setItem(event.target.name, event.target.value);
  }
});

if (localStorage.getItem('name')) {
  studentForm.name.value = localStorage.getItem('name');
}

if (localStorage.getItem('surname')) {
  studentForm.surname.value = localStorage.getItem('surname');
}

if (localStorage.getItem('age')) {
  studentForm.age.value = localStorage.getItem('age');
}

if (localStorage.getItem('phone')) {
  studentForm.phone.value = localStorage.getItem('phone');
}

if (localStorage.getItem('email')) {
  studentForm.email.value = localStorage.getItem('email');
}

if (localStorage.getItem('it-knowledge')) {
  studentForm['it-knowledge'].value = localStorage.getItem('it-knowledge');
}

if (localStorage.getItem('radio')) {
  studentForm.group.value = localStorage.getItem('radio');
}

let localStorageInterests = JSON.parse(localStorage.getItem('interest'));

if (localStorageInterests) {
  localStorageInterests.map(localStorageInterest => {
    studentForm.querySelector('[name="interest"][value="' + localStorageInterest + '"]').checked = true;
  })
}
