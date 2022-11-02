[
This example demonstrates:
	- Creating and connecting rooms
	- Creating doors (between rooms)
	- Making it so certain things can unlock locked things such as doors and containers
	- Overwriting default behavior in order to create dialogue with characters, and transfer items between characters
	- Create numerical variables
	- Making a win condition depend upon player location
	- Making a lose condition based on the value of a variable
	- Having conditional descriptions based on a variable
	- Creating test sequences of input to help speed up testing your game
	
REMEMBER TO PRESS THE "GO!" BUTTON FREQUENTLY!!! YOUR ERRORS/TYPOS WILL PILE UP QUICKLY SO PRETTY MUCH TRY PRESSING THAT BUTTON AND FIXING ERRORS EVERY TIME YOU TRY WRITING SOMETHING!
]

"Game 601 11-2-21" by Mike Treanor

Release along with the "Quixe" interpreter.


The player is in the Classroom.

The timeToEscape is a number variable. The timeToEscape is 20.

Every turn:
	say "There [if timeToEscape is 1]is[else]are[end if] [timeToEscape] minutes to escape!";

Every turn when the player is carrying the golden key:	now the timeToEscape is timeToEscape - 1;
			
Every turn when timeToEscape is less than 0:
	say "You didn't make it to the portal. The curse of the golden key consumes you!";
	end the story;
	
Every turn when the player is in the Amusement Park:
	say "You made it through portal to the Amusement Park, and look! Your friend the Happy Clown has come to join you laptop in hand! THE END.";
	end the story;

[ROOMS AND LAYOUT]

The Living Room is a room. 

The Classroom is a room.

The living room is north of the Classroom.

The Amusement Park is a room.

The Portal is a locked door. The Portal is west of the Classroom and east of the Amusement Park.

[CLASSROOM]

The description of the Classroom is "There are two rows of chairs in the classroom. To the north through the a short hallway is a living room. [if timeToEscape is less than 8]TIME IS RUNNING OUT![end if]"

The table is a fixed in place thing in the Classroom. The table is a supporter. 

The laptop is a thing. "There is a laptop with solitaire on the screen resting on the table. It looks valuable. Surely a gift someone would be happy to receive!". The laptop is on the table.

The treasure chest is a locked container in the Classroom.

The Electro Gadget is a thing. It is inside the treasure chest. It unlocks the portal.

[LIVING ROOM]

The living room is dark.

Every turn when the living room is dark and the player is in the living room:
		say "You see a faint glow coming form a light switch.".

The description of the Living Room is "There is a comfy sofa set in front of the television. To the south is a classroom."

The golden key is a thing. The golden key unlocks the treasure chest. The Happy Clown is holding the golden key.

Before opening the Portal when the portal is locked:
	say "The portal is locked you fool!";
	
[LIVING ROOM - LIGHT SWITCH]
The light switch is a switched off device in the living room. It is fixed in place.

Carry out switching off the light switch: 
	now the living room is dark.

Carry out switching on the light switch: 
	now the living room is lighted.
	
After deciding the scope of the player when the location is the living room:
    place the light switch in scope.
	
Understand "flip [something switched off]" as switching on. Understand "flip [something switched on]" as switching off. Understand "flip [something]" as switching on.

[LIVING ROOM - HAPPY CLOWN]
The Happy Clown is a person in the living room. "There is a Happy Clown standing in the corner of the room staring at you. A golden key is dangling from its brightly colored belt.".

Instead of asking the Happy Clown for the golden key when the happy clown is not carrying the laptop:
		say "The Happy Clown stares at you without blinking. Perhaps a technological gift would encourage them to give you the key...";

Instead of giving the laptop to the Happy Clown:
		say "The Happy Clown reaches out to you screaming while making no noise! You hand the clown the laptop and it tosses the key to you.";
		say "You also suddenly remember the portal in the classroom. Quick! Use the key to unlock the portal and escape!";
		now the timeToEscape is 8;
		now the happy clown is carrying the laptop;
		now the player is carrying the golden key.



[TESTS]
Test win with "take laptop / go north / flip switch / give laptop to happy clown / go south / unlock treasure chest with the golden key / open treasure chest / take Electro Gadget / unlock Portal with Electro Gadget / enter portal /".