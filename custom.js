// WHEN THE DOC IS LOADED

$(document).ready(function () {
	
	// Declaring all the nescasary variables here!

	var questionNumber=0;
	var questionBank=[];
	var stage="#game1";
	var stage2={};
	var questionLock=false;
	var numberOfQuestions;
	var score=0;

	var quizlist = [

		{
			question:"What is not a word Anakin uses to describe sand?",
			option1:"Infuriating",
			option2:"Course",
			option3:"Irritating"
		},
		{
			question:"A New Hope: What is the first line?",
			option1:"Did you hear that?",
			option2:"They've shut down the main reactor!",
			option3:"I've got a bad feeling about this."
		},
		{
			question:"The Force Awakens: What language was Snoke's name inspired by?",
			option1:"Dutch",
			option2:"German",
			option3:"French"
		},
		{
			question:"How is George Lucas said to have given R2-D2 his name?",
			option1:"From a script abbreviation - Reel 2, Dialogue 2",
			option2:"From the number plate from his grandpa's car",
			option3:"It was from his postcode"
		},
		{
			question:"What was Han's response to Leia's 'I love you' declaration?",
			option1:"I know",
			option2:"Really?",
			option3:"And I love you, sweet princess"
		}
	]

	for(i=0;i<quizlist.length;i++){ 
		questionBank[i]=[];
		questionBank[i][0]=quizlist[i].question;
		questionBank[i][1]=quizlist[i].option1;
		questionBank[i][2]=quizlist[i].option2;
		questionBank[i][3]=quizlist[i].option3;
	}
	numberOfQuestions=questionBank.length; 

	// End of variable input
		
	// Button to start the quiz

	$('.start').click(function() {
		$('.startscreen').hide()
		displayQuestion();
	})

	//DISPLAY QUESTION
	function displayQuestion(){
		// Randomise the order of answers each time you play
		var rnd=Math.random()*3;
		rnd=Math.ceil(rnd);
		var q1;
		var q2;
		var q3;

		if (rnd==1) {
			q1=questionBank[questionNumber][1];
			q2=questionBank[questionNumber][2];
			q3=questionBank[questionNumber][3];
		}
		if (rnd==2) {
			q2=questionBank[questionNumber][1];
			q3=questionBank[questionNumber][2];
			q1=questionBank[questionNumber][3];
		}
		if (rnd==3) {
			q3=questionBank[questionNumber][1];
			q1=questionBank[questionNumber][2];
			q2=questionBank[questionNumber][3];
		}

		// Setting up timeout functions, where we need a global variable for timeOut to use it with clearTimeout

		var timeOut;

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

        function stopticking() {
            clearTimeout(timeOut)
        };

		$(stage).append('<div class="questionText">'+questionBank[questionNumber][0]+'</div><div id="1" class="option">'+q1+'</div><div id="2" class="option">'+q2+'</div><div id="3" class="option">'+q3+'</div>');

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





