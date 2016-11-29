// WHEN THE DOC IS LOADED

$(document).ready(function () {
	
	// Variable to check how which question the user is at
	var questionNumber=0;
	// Two variables (stage & stage2), to create a div that leaves the screen and one that enters the screen
	var stage="#game1";
	var stage2
	// Variable to block a user from submitting a question
	var questionLock=false;
	// Keeping track of the score
	var score=0;

	// Array with arrays of question + 3 answers.
	var quizList = [
		["What is not a word Anakin uses to describe sand?",
		"Infuriating",
		"Course",
		"Irritating"
		],
		["A New Hope: What is the first line?",
		"Did you hear that?",
		"They've shut down the main reactor!",
		"I've got a bad feeling about this."
		],
		["The Force Awakens: What language was Snoke's name inspired by?",
		"Dutch",
		"German",
		"French"
		],
		["How is George Lucas said to have given R2-D2 his name?",
		"From a script abbreviation - Reel 2, Dialogue 2",
		"From the number plate from his grandpa's car",
		"It was from his postcode"
		],
		["What was Han's response to Leia's 'I love you' declaration?",
		"I know",
		"Really?",
		"And I love you, sweet princess"
		]
	]

	//Total length of the quiz
	var numberOfQuestions = quizList.length; 
		
	
	// Button to start the quiz
	$('.start').click(function() {
		// if button is clicked hide the startscreen
		$('.startscreen').hide()
		// and display the question
		displayQuestion();
	})

	//DEFINING DISPLAY QUESTION
	function displayQuestion(){

		// Randomise the order of answers each time you play

		// Three times random number between 0-1
		var rnd=Math.random()*3;
		// round it up 
		rnd=Math.ceil(rnd);

		// Create three option variables
		var option1;
		var option2;
		var option3;

		if (rnd==1) {
			option1=quizList[questionNumber][1];
			option2=quizList[questionNumber][2];
			option3=quizList[questionNumber][3];
		}
		if (rnd==2) {
			option2=quizList[questionNumber][1];
			option3=quizList[questionNumber][2];
			option1=quizList[questionNumber][3];
		}
		if (rnd==3) {
			option3=quizList[questionNumber][1];
			option1=quizList[questionNumber][2];
			option2=quizList[questionNumber][3];
		}

		// Append question + three options to div
		$(stage).append('<div class="questionText">'+quizList[questionNumber][0]+'</div><div id="1" class="option">'+option1+'</div><div id="2" class="option">'+option2+'</div><div id="3" class="option">'+option3+'</div>');


		// Setting up timeout functions, where we need a global variable for timeOut to use it with clearTimeout
		var timeOut;

		// This function starts a ticking clock that goes from 0-10
		function ticking() {
			timeOut = setTimeout(function() {
				if (questionLock == false) { // <--- This makes sure that you cant click an answer after time out
					questionLock = true
					$(stage).append("<div class='feedback2'>TIME'S UP!</div>");
					setTimeout(function() {
						changeQuestion()
					},1000);
				}
			},10000);
		};

		// Stops ticking from counting
        function stopticking() {
            clearTimeout(timeOut)
        };

		// Press an option to stop the clock and see if the user is wrong or right
		$('.option').click(function() {
			// This fucnction clears the timeout
			stopticking()
			if(questionLock == false) {
				questionLock = true;	
			  	//correct answer
		  		if(this.id == rnd){
		  		$(stage).append('<div class="feedback1">CORRECT</div>');
		  		score++;
		  		}
		  		//wrong answer	
		  		if(this.id != rnd) {
		  			$(stage).append('<div class="feedback2">WRONG</div>');
		  		}
		  		setTimeout(function() {
		  			changeQuestion()
		  		},1000);
			}
		})

		// As soon as the question is loaded, the clock starts ticking
		ticking()

	}

	//CHANGE QUESTION

	function changeQuestion(){

		// go to next question
		questionNumber++;
		
		// switching divs to remove one and replace it by the other
		if (stage == "#game1") {
			stage2 = "#game1";
			stage = "#game2";
		} else {
			stage2 = "#game2";
			stage = "#game1";
		}
		
		// this makes sure that after the final question, a final slide is being shown
		if (questionNumber < numberOfQuestions) {
			displayQuestion();
		} else {
			displayFinalSlide();
		}
		
		// The css that removes the one div and replaces it by the other
		$(stage2).animate({"right": "+=800px"},"slow", function() {
			$(stage2).css('right','-800px');
			$(stage2).empty();
		});
		$(stage).animate({"right": "+=800px"},"slow", function() {
			questionLock = false;
		});
	} 
	

	//DISPLAY FINAL SLIDE
	
	function displayFinalSlide(){

		$(stage).append("<div class='questionText'>You have finished the quiz!<br><br>You're score is: " + ((score/numberOfQuestions)*100).toFixed(0) + "</div><br><div><button class='start'>Try again!</button></div>");

		// try again button
		$('.start').click(function() {
			console.log("this works")
			questionNumber = 0
			score = 0
			$('.questionText').hide()
			$('.start').hide()
			displayQuestion();
		})
		
	} 

	
	
});





