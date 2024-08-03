const steps = [
  {
    description: 'Explosive pushups: 10 repetitions',
    type: 'reps',
    image: 'images/step1.webp'
  },
  {
    description: 'Hold pushup position for 30 seconds',
    type: 'hold',
    duration: 30,
    image: 'images/hold.webp'
  },
  {
    description: 'Rest for 15 seconds',
    type: 'rest',
    duration: 15,
    image: 'images/rest.webp'
  },
  {
    description: 'Normal pushups: 20 repetitions',
    type: 'reps',
    image: 'images/step2.gif'
  },
  {
    description: 'Hold pushup position for 30 seconds',
    type: 'hold',
    duration: 30,
    image: 'images/hold.webp'
  },
  {
    description: 'Rest for 15 seconds',
    type: 'rest',
    duration: 15,
    image: 'images/rest.webp'
  },
  {
    description: 'Wide pushups: 15 repetitions',
    type: 'reps',
    image: 'images/step3.gif'
  },
  {
    description: 'Hold pushup position for 15 seconds',
    type: 'hold',
    duration: 15,
    image: 'images/hold.webp'
  },
  {
    description: 'Rest for 15 seconds',
    type: 'rest',
    duration: 15,
    image: 'images/rest.webp'
  },
  {
    description: 'Diamond pushups: 15 repetitions',
    type: 'reps',
    image: 'images/step4.gif'
  },
  {
    description: 'Hold pushup position (up) for 15 seconds',
    type: 'hold',
    duration: 15,
    image: 'images/hold.webp'
  },
  {
    description: 'Rest for 30 seconds',
    type: 'rest',
    duration: 30,
    image: 'images/rest.webp'
  },
  {
    description: 'Archer pushups: 20 repetitions (10 each side)',
    type: 'reps',
    image: 'images/step5.gif'
  },
  {
    description: 'Hold pushup position for 10 seconds (5 seconds each side)',
    type: 'hold',
    duration: 10,
    image: 'images/hold.webp'
  },
  {
    description: 'Rest for 30 seconds',
    type: 'rest',
    duration: 30,
    image: 'images/rest.webp'
  },
  {
    description: 'Leg up pushups: 10 repetitions each side',
    type: 'reps',
    image: 'images/step6.gif'
  },
  {
    description: 'Hold pushup position for 10 seconds (5 seconds each side)',
    type: 'hold',
    duration: 10,
    image: 'images/hold.webp'
  }
];


  let countdownRunning = false;
  let countdownInterval;
  let currentStep = 0;
  const stepList = document.getElementById('exercise-steps');
  const doneButton = document.getElementById('done-btn');
  
  const stepImage = document.getElementById('step-image');

  function updateStepList() {
    clearInterval(countdownInterval); // Clear existing countdown interval
    stepList.innerHTML = '';
    steps.forEach((step, index) => {
      const li = document.createElement('li');
      const img = document.createElement('img');
      img.src = step.image;
      img.alt = step.description;
      li.appendChild(img);
      li.textContent = step.description;
      li.addEventListener('click', () => {
        currentStep = index;
        updateStepList();
        updateButtonState(); // Update button state when a step is selected
      });
      if (index === currentStep) {
        li.classList.add('active');
        stepImage.src = step.image;
        stepImage.alt = step.description;
      }
      stepList.appendChild(li);
    });
  }
  
  function updateButtonState() {
    clearInterval(countdownInterval); // Clear existing countdown interval
    const current = steps[currentStep];
    if (current.type === 'reps') {
      doneButton.disabled = false;
      doneButton.textContent = 'Done';
    } else {
      doneButton.disabled = true;
      startCountdown(current.duration);
    }
  }
  
  function startCountdown(duration) {
    if (countdownRunning) {
      clearInterval(countdownInterval);
      countdownRunning = false;
    }
    countdownRunning = true;
    let timer = duration;
    doneButton.textContent = `Hold (${timer}s)`;
    countdownInterval = setInterval(() => {
      timer--;
      doneButton.textContent = `Hold (${timer}s)`;
      if (timer <= 0) {
        clearInterval(countdownInterval);
        countdownRunning = false;
        nextStep();
      }
    }, 1000);
  }
  
  function nextStep() {
    if (currentStep < steps.length - 1) {
      currentStep++;
      updateStepList();
    } else {
      doneButton.disabled = true;
      doneButton.textContent = 'Finished';
    }
  }

  updateStepList();