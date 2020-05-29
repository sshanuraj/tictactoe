import random
from board import Board
from Bot import Bot, XBot, OBot

b = Board()
X = XBot(0.9, 0.95, 0.9, 0.9)
O = OBot(0.9, 0.95, 0.9, 0.9)

x = 0
o = 0

#b.printBoard()
flag = 0
s = 0
c = 100000
draws = 0

while c > 0:
	if c%10000 == 0 and c!=100000:
		X.decay_epsilon()
		O.decay_epsilon()
	flag = 0
	s = 0
	for i in range(9):
		w = 0
		if s%2==0:
			s = s + 1
			X.makeMove(b)
			#b.printBoard()
			w = b.check_win(1)
			if w == 1:
				flag = 1
				X.collectReward(2)
				O.collectReward(1)
				if c%10000 == 0:
					print("X wins.")
				x = x + 1
				break
		else:
			s = s + 1
			O.makeMove(b)
			#b.printBoard()
			w = b.check_win(-1)
			if w == -1:
				flag = 1
				X.collectReward(1)
				O.collectReward(2)
				if c%10000 == 0:
					print("O wins.")
				o = o + 1
				break
	if flag == 0:
		draws = draws + 1
		X.collectReward(1.2)
		O.collectReward(1.4)
		if c%10000 == 0:
			print("Draw.")
	b.reset()
	X.resetState()
	O.resetState()
	c=c-1

print("Scores: X->",x," O->",o, "Draws: ", draws)
X.setEpsilon(0)
flag = 0
s=0
c=1

while c:
	flag = 0
	s=0
	for i in range(9):
			w = 0
			if s%2==0:
				s = s + 1
				X.makeMove(b)
				b.printBoard()
				w = b.check_win(1)
				if w == 1:
					flag = 1
					X.collectReward(1)
					print("X wins.")
					o = o + 1
					break
				
			else:
				s = s + 1
				x = int(input("x coord:"))
				y = int(input("y coord:"))
				b.board[x][y] = -1
				b.printBoard()
				w = b.check_win(-1)
				if w == -1:
					flag = 1
					X.collectReward(1)
					print("O wins.")
					x = x + 1
					break
	if flag == 0:
		draws = draws + 1
		X.collectReward(1.4)
		# O.collectReward(0.5)
		print("Draw.")
	b.reset()
	X.resetState()
	s=0
	c=int(input("another game: 0 or 1?"))
