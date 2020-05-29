import numpy as np 
import random

class Bot:
	def __init__(self, epsilon, alpha, discount_factor, decay):
		self.epsilon = epsilon
		self.alpha = alpha
		self.discount_factor = discount_factor
		self.decay = decay
		self.states = []
		self.state_value_pairs = {}

	def setEpsilon(self, eps):
		self.epsilon = eps

	def check_win(self, s, board):
	    sum1 = 0; sum2 = 0; sum3 = 0
	    for i in range(3):
	        sum1 = sum1 + board[0][i]
	        sum2 = sum2 + board[1][i]
	        sum3 = sum3 + board[2][i]

	    if s == 1:
	        if sum1 == 3 or sum2 == 3 or sum3 == 3:
	            return 1
	    else:
	        if sum1 == -3 or sum2 == -3 or sum3 == -3:
	            return -1

	    sum1 = 0; sum2 = 0; sum3 = 0
	    for i in range(3):
	        sum1 = sum1 + board[i][0]
	        sum2 = sum2 + board[i][1]
	        sum3 = sum3 + board[i][2]

	    if s == 1:
	        if sum1 == 3 or sum2 == 3 or sum3 == 3:
	            return 1
	    else:
	        if sum1 == -3 or sum2 == -3 or sum3 == -3:
	            return -1

	    sum1 = 0; sum2 = 0; sum3 = 0
	    for i in range(3):
	        sum1 = sum1 + board[i][i]
	        sum2 = sum2 + board[2-i][i]

	    if s == 1:
	        if sum1 == 3 or sum2 == 3:
	            return 1
	    else:
	        if sum1 == -3 or sum2 == -3:
	            return -1
	    return 0

	def serialize(self, board):
		x=[]
		for i in range(3):
			for j in range(3):
				x.append(board[i][j])
		return np.array([x])

	def getBoardHash(self, board):
		s = ""
		dic = {0 : " ", 1 : "X", -1 : "O"}
		for i in range(3):
			for j in range(3):
				s = s + dic[board[i][j]]
		return s

	def getPositions(self, b):
		moves = []
		for i in range(9):
			if b.board[i//3][i%3] == 0:
				moves.append([i//3, i%3])
		return moves

	def getPositionRandom(self, b):
		moves = self.getPositions(b)
		r = random.randint(0, len(moves)-1)
		return moves[r][0], moves[r][1]		

	def decay_epsilon(self):
		self.epsilon = self.epsilon * self.decay

	def collectReward(self, reward):
		tot_reward = reward
		for i in range(len(self.states)-1, -1, -1):
			if self.state_value_pairs.get(self.states[i]) is None:
				self.state_value_pairs[self.states[i]] = 1.5

			if i == len(self.states) - 1:
				self.state_value_pairs[self.states[i]] = tot_reward
				continue
			
			self.state_value_pairs[self.states[i]] += ((self.alpha*(tot_reward - self.state_value_pairs[self.states[i]]))*self.discount_factor)
			tot_reward = self.state_value_pairs[self.states[i]]

	def resetState(self):
		self.states = []

class XBot(Bot):
	def __init__(self, epsilon, alpha, discount_factor, decay):
		super().__init__(epsilon, alpha, discount_factor, decay)

	def getPositionMax(self, b):
		moves = self.getPositions(b)
		max_val = -1000
		max_ind = -1
		val = 0
		curr_states = []
		curr_boards = []
		moves_to_play = []

		for i in range(len(moves)):
			next_b = b.board.copy()
			next_b[moves[i][0]][moves[i][1]] = 1
			if self.check_win(1, next_b) == 1:
				return moves[i][0], moves[i][1]
			next_b = self.getBoardHash(next_b)
			curr_states.append(next_b)

		for i in range(len(curr_states)):
			if self.state_value_pairs.get(curr_states[i]) is None:
				val = 1.5
			else:
				val = self.state_value_pairs[curr_states[i]]

			if val > max_val:
				max_val = val
				max_ind = i
				moves_to_play = [max_ind]

			elif val == max_val:
				moves_to_play.append(i)

		if len(moves_to_play) == 1:		
			return moves[max_ind][0], moves[max_ind][1]
		else:
			ind = random.randint(0, len(moves_to_play)-1)
			return moves[ind][0], moves[ind][1]

	def makeMove(self, b):
		x, y = 0, 0
		if random.uniform(0, 1) <= self.epsilon:
			x, y = self.getPositionRandom(b)
		else:
			x, y = self.getPositionMax(b)
		b.board[x][y] = 1
		self.states.append(self.getBoardHash(b.board))


class OBot(Bot):
	def __init__(self, epsilon, alpha, discount_factor, decay):
		super().__init__(epsilon, alpha, discount_factor, decay)
		
	def getPositionMax(self, b):
		moves = self.getPositions(b)
		max_val = -1000
		max_ind = -1
		val = 0
		curr_states = []
		moves_to_play = []

		for i in range(len(moves)):
			next_b = b.board.copy()
			next_b[moves[i][0]][moves[i][1]] = -1
			if self.check_win(-1, next_b) == -1:
				return moves[i][0], moves[i][1]
			next_b = self.getBoardHash(next_b)
			curr_states.append(next_b)

		for i in range(len(curr_states)):
			if self.state_value_pairs.get(curr_states[i]) is None:
				val = 1.5
			else:
				val = self.state_value_pairs[curr_states[i]]

			if val > max_val:
				max_val = val
				max_ind = i
				moves_to_play = []
				moves_to_play.append(max_ind)

			elif val == max_val:
				moves_to_play.append(i)

		if len(moves_to_play) == 1:		
			return moves[max_ind][0], moves[max_ind][1]
		else:
			ind = random.randint(0, len(moves_to_play)-1)
			return moves[ind][0], moves[ind][1]

	def makeMove(self, b):
		x, y = 0, 0
		if random.uniform(0, 1) <= self.epsilon:
			x, y = self.getPositionRandom(b)
		else:
			x, y = self.getPositionMax(b)

		b.board[x][y] = -1
		self.states.append(self.getBoardHash(b.board))