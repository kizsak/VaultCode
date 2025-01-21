// Ensure the setup object exists
window.setup = window.setup || {};

// Define the avatars and their attributes
setup.avatars = {
  'Arinaya Velin': {
    image: 'https://github.com/kizsak/VaultImages/raw/main/Arinaya.png',
    attributes: { empathy: 2, imagination: 1 },
  },
  'Zhaedrik El-Amar': {
    image: 'https://github.com/kizsak/VaultImages/raw/main/Zhaedrik.png',
    attributes: { exploration: 2, problemSolving: 1 },
  },
  'Zyphira Chen-Dalal': {
    image: 'https://github.com/kizsak/VaultImages/raw/main/Zyphira.png',
    attributes: { problemSolving: 2, exploration: 1 },
  },
  'Mykosai Trenholm': {
    image: 'https://github.com/kizsak/VaultImages/raw/main/Mykosai.png',
    attributes: { strategicThinking: 2, problemSolving: 1 },
  },
  'Kaelitha Jindall': {
    image: 'https://github.com/kizsak/VaultImages/raw/main/Kaelith.png',
    attributes: { empathy: 2, strategicThinking: 1 },
  },
  'Veynari Al-Majeed': {
    image: 'https://github.com/kizsak/VaultImages/raw/main/Veynari.png',
    attributes: { empathy: 2, imagination: 1 },
  },
};

// Initialize player attributes if not already defined
if (typeof State.variables.attributes === 'undefined') {
  State.variables.attributes = {
    empathy: 0,
    imagination: 0,
    exploration: 0,
    problemSolving: 0,
    strategicThinking: 0,
  };
}
if (typeof State.variables.selectedAvatarName === 'undefined') {
  State.variables.selectedAvatarName = 'No avatar selected';
}
if (typeof State.variables.selectedAvatarImage === 'undefined') {
  State.variables.selectedAvatarImage = '';
}

// Function to handle avatar selection
setup.selectAvatar = function (avatarName) {
  console.log(`Avatar selection triggered for: ${avatarName}`);

  const selectedAvatar = setup.avatars[avatarName];

  if (selectedAvatar) {
    console.log("Selected avatar data:", selectedAvatar);

    // Update player attributes
    for (const [attribute, bonus] of Object.entries(selectedAvatar.attributes)) {
      State.variables.attributes[attribute] += bonus;
    }

    // Store the selected avatar's details
    State.variables.selectedAvatarName = avatarName;
    State.variables.selectedAvatarImage = selectedAvatar.image;

    console.log("Updated player data:", {
      name: State.variables.selectedAvatarName,
      image: State.variables.selectedAvatarImage,
      attributes: State.variables.attributes,
    });

    // Generate a detailed alert message
    const attributeDetails = Object.entries(selectedAvatar.attributes)
      .map(([attr, bonus]) => `${bonus} point${bonus > 1 ? 's' : ''} in ${attr}`)
      .join(' and ');

    alert(
      `You've chosen ${avatarName}.\n` +
      `You've gained ${attributeDetails}.\n` +
      `Continue on with the link below.`
    );

    // Update the display immediately
    setup.updateAvatarDisplay();
  } else {
    console.warn(`Avatar "${avatarName}" not found.`);
  }
};

// Function to update the avatar display dynamically
setup.updateAvatarDisplay = function () {
  console.log("Updating the sidebar avatar display...");
  const avatarDisplay = document.getElementById('avatar-display');
  const avatarName = document.getElementById('avatar-name');
  const attributeTable = document.getElementById('attribute-table');

  if (!avatarDisplay || !avatarName || !attributeTable) {
    console.warn('Sidebar elements not found.');
    return; // Exit gracefully if elements are missing
  }

  console.log("Current avatar data:", {
    image: State.variables.selectedAvatarImage,
    name: State.variables.selectedAvatarName,
    attributes: State.variables.attributes,
  });

  // Update avatar image and name
  avatarDisplay.src = State.variables.selectedAvatarImage || '';
  avatarDisplay.alt = State.variables.selectedAvatarName || 'No avatar selected';
  avatarName.textContent = State.variables.selectedAvatarName || 'No avatar selected';

  // Update attributes in the table
  const attributes = State.variables.attributes;
  attributeTable.innerHTML = attributes
    ? Object.entries(attributes)
        .map(
          ([attr, value]) =>
            `<tr><td>${attr.charAt(0).toUpperCase() + attr.slice(1)}</td><td>${value}</td></tr>`
        )
        .join('')
    : '<tr><td colspan="2">No attributes available</td></tr>';
};

// Function to handle questionnaire responses
setup.recordQuestionnaireResponse = function (question, variableName, increment) {
  console.log(`Question answered: "${question}" | Variable: ${variableName} | Increment: ${increment}`);
  
  if (State.variables.attributes.hasOwnProperty(variableName)) {
    State.variables.attributes[variableName] += increment;
    console.log(`Updated ${variableName}:`, State.variables.attributes[variableName]);
  } else {
    console.warn(`Variable "${variableName}" not found.`);
  }
};

// Initialize the variables if not already set
if (State.variables.empathy === undefined) {
    State.variables.empathy = 0;
    State.variables.strategicThinking = 0;
    State.variables.imagination = 0;
    State.variables.exploration = 0;
    State.variables.problemSolving = 0;
}

// Function to record survey responses
setup.recordLectureResponse = function (response) {
  // Map responses to variables
  const responseMapping = {
    empathy: "How the lecture encouraged empathy and understanding.",
    imagination: "The creative examples and imaginative ideas.",
    exploration: "Exploring new topics and perspectives.",
    problemSolving: "How it provided solutions to real-world problems.",
    strategicThinking: "The focus on strategic and critical thinking skills.",
  };

  if (responseMapping.hasOwnProperty(response)) {
    // Increment the corresponding variable
    State.variables.attributes[response] = (State.variables.attributes[response] || 0) + 1;
    alert(
      `You've demonstrated your interest in ${response}.\n` +
      `You have gained 1 point in it.`
    );
    console.log(`Updated ${response}:`, State.variables.attributes[response]); // Debugging log
  } else {
    console.warn(`Response "${response}" is not valid.`);
  }
};


// Function to handle book or movie selection
window.handleSelection = function (type, title, impact) {
  // Increment the relevant variable
  let impactText = '';
  if (impact === 'empathy') {
    State.variables.empathy += 1;
    impactText = 'Empathy +1';
  } else if (impact === 'strategicThinking') {
    State.variables.strategicThinking += 1;
    impactText = 'Strategic Thinking +1';
  } else if (impact === 'imagination') {
    State.variables.imagination += 1;
    impactText = 'Imagination +1';
  } else if (impact === 'exploration') {
    State.variables.exploration += 1;
    impactText = 'Exploration +1';
  } else if (impact === 'problemSolving') {
    State.variables.problemSolving += 1;
    impactText = 'Problem-Solving +1';
  }

  // Show an alert with the points gained
  alert(`You selected ${type}: ${title}\nGained: ${impactText}`);

  // Save the selection (optional)
  if (!State.variables.selections) {
    State.variables.selections = [];
  }
  
// Function to open the Logic Matrix Puzzle
setup.openGoogleSheet = function () {
  const sheetURL =
    'https://docs.google.com/spreadsheets/d/1uO3jKd3L6SwAB7bfCYY5FBAZx5QAkS_CV_VjqBIzuDQ/edit?usp=sharing';
  window.open(sheetURL, '_blank'); // Open in a new tab
};

// Add event listener for the "openSheet" button after DOM content is loaded
$(document).on(':passagerender', function () {
  const openSheetButton = document.getElementById('openSheet');
  if (openSheetButton) {
    openSheetButton.addEventListener('click', function () {
      setup.openGoogleSheet();
    });
  }
});
