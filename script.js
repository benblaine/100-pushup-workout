const steps = [
    { description: 'Explosive pushups: 10 repetitions', type: 'reps' },
    { description: 'Hold pushup position for 30 seconds', type: 'hold', duration: 30 },
    { description: 'Rest for 15 seconds', type: 'rest', duration: 15 },
    { description: 'Normal pushups: 20 repetitions', type: 'reps' },
    { description: 'Hold pushup position for 30 seconds', type: 'hold', duration: 30 },
    { description: 'Rest for 15 seconds', type: 'rest', duration: 15 },
    { description: 'Wide pushups: 15 repetitions', type: 'reps' },
    { description: 'Hold pushup position for 15 seconds', type: 'hold', duration: 15 },
    { description: 'Rest for 15 seconds', type: 'rest', duration: 15 },
    { description: 'Diamond pushups: 15 repetitions', type: 'reps' },
    { description: 'Hold pushup position (up) for 15 seconds', type: 'hold', duration: 15 },
    { description: 'Rest for 30 seconds', type: 'rest', duration: 30 },
    { description: 'Archer pushups: 20 repetitions (10 each side)', type: 'reps' },
    { description: 'Hold pushup position for 10 seconds (5 seconds each side)', type: 'hold', duration: 10 },
    { description: 'Rest for 30 seconds', type: 'rest', duration: 30 },
    { description: 'Leg up pushups: 10 repetitions each side', type: 'reps' },
    { description: 'Hold pushup position for 10 seconds (5 seconds each side)', type: 'hold', duration: 10 }
  ];
  
  let currentStep = 0;
  const stepList = document.getElementById('exercise-steps');
  const doneButton = document.getElementById('done-btn');
  
  function updateStepList() {
    stepList.innerHTML = '';
    steps.forEach((step, index) => {
      const li = document.createElement('li');
      li.textContent = step.description;
      if (index === currentStep) {
        li.classList.add('active');
      }
      stepList.appendChild(li);
    });
    updateButtonState();
  }
  
  function updateButtonState() {
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
    let timer = duration;
    doneButton.textContent = `Hold (${timer}s)`;
    const countdown = setInterval(() => {
      timer--;
      doneButton.textContent = `Hold (${timer}s)`;
      if (timer <= 0) {
        clearInterval(countdown);
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