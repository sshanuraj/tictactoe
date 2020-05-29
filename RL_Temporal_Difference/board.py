import numpy as np
import random

class Board:
	def __init__(self):
		self.board = np.zeros((3, 3))

	def printBoard(self):
		dic={0:"-", 1:"X", -1:"O"}
		for i in range(3):
			for j in range(3):
				print(dic[self.board[i][j]], end=" ")
			print()
		print()

	def reset(self):
		self.board = np.zeros((3, 3))

	def check_win(self, s):
	    sum1 = 0; sum2 = 0; sum3 = 0
	    for i in range(3):
	        sum1 = sum1 + self.board[0][i]
	        sum2 = sum2 + self.board[1][i]
	        sum3 = sum3 + self.board[2][i]

	    if s == 1:
	        if sum1 == 3 or sum2 == 3 or sum3 == 3:
	            return 1
	    else:
	        if sum1 == -3 or sum2 == -3 or sum3 == -3:
	            return -1

	    sum1 = 0; sum2 = 0; sum3 = 0
	    for i in range(3):
	        sum1 = sum1 + self.board[i][0]
	        sum2 = sum2 + self.board[i][1]
	        sum3 = sum3 + self.board[i][2]

	    if s == 1:
	        if sum1 == 3 or sum2 == 3 or sum3 == 3:
	            return 1
	    else:
	        if sum1 == -3 or sum2 == -3 or sum3 == -3:
	            return -1

	    sum1 = 0; sum2 = 0; sum3 = 0
	    for i in range(3):
	        sum1 = sum1 + self.board[i][i]
	        sum2 = sum2 + self.board[2-i][i]

	    if s == 1:
	        if sum1 == 3 or sum2 == 3:
	            return 1
	    else:
	        if sum1 == -3 or sum2 == -3:
	            return -1
	    return 0
