// Game function
function game() {
  const player1 = document.getElementById("score1");  
  const player2 = document.getElementById("score2");  
  const restartBtn = document.getElementById("restartBtn");

  let board = ["", "", "", "", "", "", "", "", ""];  // Array to track the board state
  let currentPlayer = "X";  

  const gameBoard = function() {
    const cells = document.querySelectorAll('.cell');
    
    cells.forEach((cell, index) => {
      cell.addEventListener("click", function() {
        if (cell.innerHTML === "") {  
          cell.innerHTML = currentPlayer;  
          board[index] = cell.innerHTML;  

          // Check for a win after each move
          if (winCondition(board)) {
            alert(`${currentPlayer} wins!`);  // Display the winner
            
            // Update the player's score after the win
            if (currentPlayer === "X") {
              let score = parseInt(player1.innerHTML) || 0;  
              player1.innerHTML = ++score;  
            } else {
              let score = parseInt(player2.innerHTML) || 0;  
              player2.innerHTML = ++score;  
            }

            return;  // Stop further moves after a win
          }

          // Switch players after checking for a win
          currentPlayer = currentPlayer === "X" ? "O" : "X";
        }
      });
    });
  };

  gameBoard();  // Initialize the game board and event listeners

  // Function to reset the game
  function resetGame() {
    const cells = document.querySelectorAll('.cell');

    // Clear the content of each cell
    cells.forEach((cell, index) => {
      cell.innerHTML = "";  // Clear the cell
      board[index] = "";    // Reset the board array
    });

    currentPlayer = "X";  // Set the player back to X for a fresh start
    console.log("Game reset. X starts.");
  }

  // Add functionality to the restart button
  restartBtn.addEventListener("click", function() {
    resetGame();  // Reset the game
  });
}

// Call the game function to start
game();

// Win condition function
function winCondition(board) {
  const winPatterns = [
    [0, 1, 2],  // Horizontal 
    [3, 4, 5],  // Horizontal 
    [6, 7, 8],  // Horizontal 
    [0, 3, 6],  // Vertical 
    [1, 4, 7],  // Vertical 
    [2, 5, 8],  // Vertical 
    [0, 4, 8],  // Diagonal 
    [2, 4, 6]   // Diagonal 
  ];

  // Loop through each win pattern
  for (let i = 0; i < winPatterns.length; i++) {
    const [a, b, c] = winPatterns[i];

    // Check if all three positions in the pattern are the same and not empty
    if (board[a] !== "" && board[a] === board[b] && board[a] === board[c]) {
      return true;  // Return true if a win is found
    }
  }

  return false;  // Return false if no win is found
}