$(document).ready(function(){

	//booloean user can select player
	var canSelectYourCharacter;
	//boolean user can select enemy to fight
	var canChooseOppenent;
	//boolean character is selected
	var characterSelected;
	//boolean opponent can be selected
	var oppenentSelected;
	//store user's chosen character
	var character={};
	//store the chosen/current enemy to fight
	var enemy={};
	//count for how many enemies have been defeated;
	var defendersDefeated;
	//both used to update health of current character and enemy
	var updateHealth;
	var updateHealthEnemy;
	//used to hide enemy when defeated
	var div;

	var obi={
		name: "Obi-Wan Kenobi",
		basepower: 10,
		healthPoints: 120,
		attackPower: 15,
		counterAttackPower: 12
	}

	var luke={
		name: "Luke Skywalker",
		healthPoints: 100,
		attackPower: 20,
		basepower: 20,
		counterAttackPower: 8
	}

	var sidious={
		name: "Darth Sidious",
		healthPoints: 150,
		attackPower: 6,
		basepower: 6,
		counterAttackPower: 15
	}

	var maul={
		name: "Darth Maul",
		healthPoints: 180,
		attackPower: 3,
		basepower:3,
		counterAttackPower: 15
	}

//resets all the way to beginning where player
//can choose a character
function resetGame(obi, luke, sidious, maul){
	canSelectYourCharacter=true;
	canChooseOppenent=false;
	defendersDefeated=0;

	$("#obi").children(".health").html(obi.healthPoints);
	$("#luke").children(".health").html(luke.healthPoints);
	$("#sidious").children(".health").html(sidious.healthPoints);
	$("#maul").children(".health").html(maul.healthPoints);

	$(".reset").hide();
}

//set character
function setCharacter(chosenCharacter){
	character.name= chosenCharacter.name;
	character.healthPoints= chosenCharacter.healthPoints;
	character.attackPower= chosenCharacter.attackPower;
	character.counterAttackPower= chosenCharacter.counterAttackPower;
	character.basepower= chosenCharacter.basepower;
}

//set enemy selected
function setEnemy(chosenEnemy){
	enemy.name=chosenEnemy.name;
	enemy.healthPoints= chosenEnemy.healthPoints;
	enemy.attackPower= chosenEnemy.attackPower;
	enemy.counterAttackPower= chosenEnemy.counterAttackPower;
}

function fight(){
	character.healthPoints = character.healthPoints-enemy.counterAttackPower;
	console.log("character HP:" + character.healthPoints);
 	updateHealth.html(character.healthPoints);

	enemy.healthPoints= enemy.healthPoints - character.attackPower;
	console.log("Enemy HP:" + enemy.healthPoints);

	character.attackPower= character.attackPower + character.basepower;
	console.log("player attack power:" + character.attackPower);
	updateHealthEnemy.html(enemy.healthPoints);

	message(character, enemy);
}

function message(){
	var message= "<h4>You attacked " + enemy.name + " for " + character.attackPower + " damage.</h4>";
	message += "<h4>" + enemy.name + " attacked you back for " + enemy.counterAttackPower + " damage.</h4>";

	$("#message").html(message);

	if(character.healthPoints<=0){
		$("#message").html("<h4> You Lose The Game! Loser:( </h4>");
		$(".reset").show();

	}
	else if(enemy.healthPoints<=0 && defendersDefeated<3){
		$("#message").html("<h4> Enemy Defeated</h4>")
	}
	else if(enemy.healthPoints<=0 && defendersDefeated==3){
		$("#message").html("<h4> You Win The Game! <h4>")
		$(".reset").show();
		$(".fight").hide();

	}
}

resetGame(obi, luke, sidious, maul);

//click to to select player character first
$(".character").on("click", function(){
	if(canSelectYourCharacter && !canChooseOppenent){

		$(this).appendTo("#yourCharacter");
		$(this).addClass("player");
		$(this).removeClass("character");

		//put remaining characters into the enemy section
		$(".remaining").appendTo("#enemiesAvailable");

		if($(this).is($("#obi"))){
			setCharacter(obi);
			console.log(character.name);
			updateHealth=$("#obi").children(".health");
		}
		else if ($(this).is($("#luke"))){
			setCharacter(luke);
			console.log(character.name);
			updateHealth=$("#luke").children(".health");
		}
		else if ($(this).is($("#sidious"))){
			setCharacter(sidious);
			console.log(character.name);
			updateHealth=$("#sidious").children(".health");
		}
		else if ($(this).is($("#maul"))){
			setCharacter(maul);
			console.log(character.name);
			updateHealth=$("#maul").children(".health");
		}

		//player character has been selected
		characterSelected=true;
		//cannot choose your another player character
		canSelectYourCharacter=false;
		//can now choose an opponent
 		canChooseOppenent=true;
	}

	//click to choose oppenent
	$(".character").on("click", function(){
		if(canChooseOppenent && canSelectYourCharacter==false){
			$(this).appendTo("#defender");
			$(this).addClass("enemy");
			$(this).removeClass("character");

			if($(this).is($("#obi"))){
				setEnemy(obi);
				console.log(enemy.name);
				updateHealthEnemy= $("#obi").children(".health");
				div= $("#obi");
			}
			else if ($(this).is($("#luke"))){
				setEnemy(luke);
				console.log(enemy.name);
				updateHealthEnemy= $("#luke").children(".health");
				div= $("#luke");
			}
			else if ($(this).is($("#sidious"))){
				setEnemy(sidious);
				console.log(enemy.name);
				updateHealthEnemy= $("#sidious").children(".health");
				div= $("#sidious");
			}
			else if ($(this).is($("#maul"))){
				setEnemy(maul);
				console.log(enemy.name);
				updateHealthEnemy= $("#maul").children(".health");
				div= $("#maul");
			}

			canChooseOppenent=false;
			oppenentSelected=true;
		}

		if(oppenentSelected==true && characterSelected==true){
			//start the fight and fight button is enabled
			$(".fight").removeAttr("disabled");
		}
	});
});

//can start fighting
	$(".fight").on("click", function(){

		fight(character, enemy);

		if(character.healthPoints<=0){
			// console.log("You lose the game");
			$(".fight").prop("disabled", true);

			message();

			$(".fight").hide();
		}
		else if(enemy.healthPoints<=0){
			$(".fight").prop("disabled", true);
			// console.log("You defeated " + enemy.name);
			defendersDefeated++;

			message();
			canChooseOppenent=true;
			oppenentSelected=false;
			// console.log("Enemies Defeated: " + defendersDefeated);

			//hide the selected div
			div.remove();
		}
	})

	$(".reset").on("click", function(){
			location.reload();
	});
	
});//end document.ready function
